package org.uengine.sns.group.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.Exception.SNSRunTimeException;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.group.service.GroupFollowerService;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.openapi.service.SharePointService;

/**
 * 
 * GroupFollowerController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class GroupFollowerController extends ExceptionController {
	
	private static final Logger LOG = LoggerFactory.getLogger(GroupFollowerController.class);
	
	@Autowired
	GroupFollowerService groupFollowerService;
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	SharePointService sharePointService;
	
	/**
	 * 조건에 의한 GroupFollower 리스트 정보 가져오기
	 * @param param
	 * @return List<GroupFollowerVo>
	 */
	@RequestMapping(value = "/groups/followers", method = RequestMethod.GET)
	public @ResponseBody List<GroupFollowerVo> groupFollowerListByConditions(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return groupFollowerService.getGroupFollowerList(scv);
	}
	
	/**
	 * select GroupFollower by groupId
	 * @param groupId
	 * @param request
	 * @return List<GroupFollowerVo>
	 */
	@RequestMapping(value = "/groups/followers/{id}", method = RequestMethod.GET)
    public @ResponseBody List<GroupFollowerVo> findById(@PathVariable("id") long groupId, HttpServletRequest request) {
		return groupFollowerService.getGroupFollowerById(HttpUtil.getLocaleString(request), groupId);
	}
	
	/**
	 * select GroupFollower by groupId
	 * @param groupId
	 * @param request
	 * @return List<GroupFollowerVo>
	 */
	@RequestMapping(value = "/groups/allfollowers/{id}", method = RequestMethod.GET)
    public @ResponseBody List<GroupFollowerVo> findByIdAllStatus(@PathVariable("id") long groupId, HttpServletRequest request) {
		return groupFollowerService.selectGroupFollowerByIdForGroupInfo(HttpUtil.getLocaleString(request), groupId);
	}
	
	/**
	 * 그룹 멤버 팔로우
	 * @param groupVo
	 * @return GroupFollowerVo
	 */
	@RequestMapping(value = "/groups/followers", method = RequestMethod.POST)
	public @ResponseBody GroupFollowerVo add(@RequestBody GroupVo groupVo) {
		return groupFollowerService.insertGroupFollower(groupVo);
	}
	
	/**
	 * 그룹 멤버 팔로우 with member list
	 * @param groupVo
	 * @param request
	 * @return int
	 */
	@RequestMapping(value = "/groups/followers/withlist", method = RequestMethod.POST)
	public @ResponseBody int addGroupMember(@RequestBody GroupVo groupVo, HttpServletRequest request) {
		
		List<GroupFollowerVo> gfvlist = new ArrayList<GroupFollowerVo>();
		HashMap<String, Object> h = new HashMap<String, Object>();
		
		List<NoticeVo> notiArrList = new ArrayList<NoticeVo>();
		for(int i=0; i<groupVo.getGroupFollowerList().size(); i++) {
			GroupFollowerVo gfv = groupVo.getGroupFollowerList().get(i);
			if(gfv.getMemberId() != 0) {
				gfvlist.add(gfv);
			}
			
			// ADD 2015.10.22 Noti관련 추가 Start
			try {
				String userId = (String) request.getAttribute("userId");
				MemberVo memberVo = null;
				if(!StringUtils.isEmpty(userId)) {
					memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
				} else {
					HttpSession session = request.getSession(false);
					long memberId = (long) (session != null && request.getAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name()) == null 
							? session.getAttribute("memberId") :  request.getAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name()));
					memberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), memberId);
				}
				
				long fromMemberId = memberVo.getMemberId();
				
				GroupVo apiIntcGrpVo = groupService.getGroupById(gfv.getGroupId());
				MemberVo toMemberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), gfv.getMemberId());
				NoticeVo noticeVo = new NoticeVo();
				noticeVo.setItemType(SNSCodeMaster.ITEM_TYPE.GROUP.name());
				noticeVo.setItemId(apiIntcGrpVo.getGroupId());
				noticeVo.setItemTitle(apiIntcGrpVo.getGroupName());
				noticeVo.setFromMemberId(fromMemberId);
				noticeVo.setFromMemberName(toMemberVo.getMemberName());
				noticeVo.setToMemberId(toMemberVo.getMemberId());
				
				// ADD j.h kim 2015.11.12 Sharepoint group user 연동 Start		
				String targetType = apiIntcGrpVo.getTargetType() == null ? ""  : apiIntcGrpVo.getTargetType();
				if(targetType.toUpperCase().equals(SNSCodeMaster.REPOSITORY_TYPE.SHAREPOINT.name())) {
					Map<String, Object> paramMap = new HashMap<String, Object>();
					String siteId = apiIntcGrpVo.getTargetId();
					String userType = (gfv.getIsGroupMng() == null || gfv.getIsGroupMng().intValue() == 0) ? "M" : "A";	// 사용자 구분, A:관리자/M:멤버
					String syncType = "I";
					String[] userIds = {String.valueOf(gfv.getMemberId())};
					paramMap.put("pathKey", "IF_SV_013");
					paramMap.put("SiteID", siteId);
					paramMap.put("UserType", userType);
					paramMap.put("SyncType", syncType);
					paramMap.put("UserIDs", userIds);
					
					String respStr = sharePointService.getSharePointRestService(paramMap);
					LOG.info("sharepoint rest ret :" + respStr);
				}
				// ADD j.h kim 2015.11.12 Sharepoint group user 연동 End	
				notiArrList.add(noticeVo);
				
			} catch (Exception ex ) {
				LOG.error("", ex);
			}
			// ADD 2015.10.22 Noti관련 추가 End		
		}
		
		h.put("mrows", gfvlist);
		
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
		return (gfvlist.size() > 0) ? groupFollowerService.insertGroupFollowerWithMemberList(h) : 0;
	}
	
	/**
	 * 그룹 멤버 팔로우 - federation
	 * @param groupVo
	 * @return GroupFollowerVo
	 */
	@RequestMapping(value = "/groups/followers/federation", method = RequestMethod.POST)
	public @ResponseBody GroupFollowerVo addFederation(@RequestBody GroupVo groupVo) {
		return groupFollowerService.insertFederationGroupFollower(groupVo);
	}
	
	/**
	 * update GroupFollower Info
	 * @param groupFollowerVo
	 * @param map
	 */
	@RequestMapping(value = "/groups/followers", method = RequestMethod.PUT)
	public @ResponseBody GroupFollowerVo upd(@RequestBody GroupFollowerVo groupFollowerVo, ModelMap map) {
		return groupFollowerService.updateGroupFollower(groupFollowerVo);
	}

	/**
	 * @param groupFollowerVo
	 * @param map
	 * @return GroupFollowerVo
	 */
	@RequestMapping(value = "/groups/followers/rejoin", method = RequestMethod.PUT)
	public @ResponseBody GroupFollowerVo updstatus(@RequestBody GroupFollowerVo groupFollowerVo, ModelMap map) {
		return groupFollowerService.updateGroupFollowerRejoin(groupFollowerVo);
	}
	
	/**
	 * 그룹 탈퇴
	 * @param groupVo
	 * @param request
	 * @return GroupFollowerVo
	 */
	@RequestMapping(value = "/groups/followers/byself", method = RequestMethod.DELETE)
	public @ResponseBody GroupFollowerVo delGroupFollowerBySelf(@RequestBody GroupVo groupVo, HttpServletRequest request) {
		
		// ADD 2015.10.22 Noti관련 추가 Start
		try {
			MemberVo memberVo = null;
			long memberId = -999;
			GroupVo apiIntcGrpVo = groupService.getGroupById(groupVo.getGroupId());
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), apiIntcGrpVo.getGroupId());
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), apiIntcGrpVo.getGroupName());
			String syncKey = groupVo.getSyncKey();
			if(syncKey == null || "".equals(syncKey)) {
				memberId = groupVo.getRegMemberId();
				if(memberId == 0) {
					new SNSRunTimeException("멤버 정보가 존재하지 않습니다. ");
				}
				
				memberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), memberId); 
			} else {
				memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), syncKey); 
			}
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name(), memberVo.getMemberId());
		} catch (Exception ex ){
			LOG.error("", ex);
		}
		// ADD 2015.10.22 Noti관련 추가 End		
		return groupFollowerService.deleteGroupFollower(groupVo, "bySelf");
	}
	
	/**
	 * 그룹 멤버 제거 - 관리자
	 * @param groupVo
	 * @param request
	 * @return GroupFollowerVo
	 */
	@RequestMapping(value = "/groups/followers/bymng", method = RequestMethod.DELETE)
	public @ResponseBody GroupFollowerVo delGroupFollowerByMng(@RequestBody GroupVo groupVo, HttpServletRequest request) {
		// ADD 2015.10.28 Noti관련 추가 Start
		try {
			MemberVo memberVo = null;
			long memberId = -999;
			String syncKey = groupVo.getSyncKey();
			if(syncKey == null || "".equals(syncKey)) {
				memberId = groupVo.getRegMemberId();
				if(memberId == 0) {
					new SNSRunTimeException("멤버 정보가 존재하지 않습니다. ");
				}
				memberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), memberId); 
			} else {
				memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), syncKey); 
			}

			String userId = (String) request.getAttribute("userId");
			MemberVo fromMemberVo = null;
			long fromMemberId = -9;
			if(!StringUtils.isEmpty(userId)) {
				fromMemberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			} else {
				HttpSession session = request.getSession(false);
				fromMemberId = (long) (session != null && request.getAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name()) == null ? 
						session.getAttribute("memberId") :  request.getAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name()));
				fromMemberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), memberId);
			}
			
			fromMemberId = fromMemberVo.getMemberId();
			List<NoticeVo> notiArrList = groupService.getGroupNotiInfo(groupVo, memberVo , fromMemberId);
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
			
		} catch (Exception ex ) {
			LOG.error("", ex);
		}
		// ADD 2015.10.28 Noti관련 추가 End			
		return groupFollowerService.deleteGroupFollower(groupVo, "byMng");
	}

	/**
	 * 그룹 멤버 제거 - Federation
	 * @param groupFollowerVo
	 * @return GroupFollowerVo
	 */
	@RequestMapping(value = "/groups/followers/federation", method = RequestMethod.DELETE)
	public @ResponseBody GroupFollowerVo delFederationGroupFollower(@RequestBody GroupFollowerVo groupFollowerVo) {
		return groupFollowerService.deleteGroupFollower(groupFollowerVo);
	}
	
	/**
	 * 그룹 멤버 승인거부
	 * @param param
	 * @param request
	 * @return List<MemberVo>
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/widgets/groups/members/ok", method = RequestMethod.POST)
	public @ResponseBody List<MemberVo> approverefuse(@RequestBody Map<Object, Object> param, HttpServletRequest request) {

		List<String> clist = (ArrayList<String>) param.get("checkedlist");
		
		for(int i=0; i<clist.size(); i++) {
			GroupFollowerVo gfv = new GroupFollowerVo();
			gfv.setMemberId(Long.parseLong(clist.get(i), 10));
			gfv.setGroupId(Long.valueOf(param.get("groupId").toString()));
			gfv.setJoinStatus(param.get("joinStatus").toString());
			groupFollowerService.updateGroupFollower(gfv);
		}
		
		param.remove("checkedlist");
		param.remove("joinStatus");
		
		String groupId = param.get("groupId").toString();
		param.put("groupId", groupId);
		return memberService.getGroupMemberList(HttpUtil.getLocaleString(request), Long.parseLong(groupId), "standby");
	}

	/**
	 * 그룹 멤버 이메일로 초대
	 * @param param
	 * @param request
	 * @return int
	 */
	@RequestMapping(value = "/groups/followers/withemail", method = RequestMethod.POST)
	public @ResponseBody int inviteMemberWithEmail(@RequestBody Map<Object, Object> param, HttpServletRequest request) {
		@SuppressWarnings("unchecked")
		List<HashMap<String, Object>> emaillist = (ArrayList<HashMap<String, Object>>) param.get("groupemaillist");
		String groupId = param.get("groupId") == null ? "" : param.get("groupId").toString();
		String invitorId = param.get("invitorId") == null ? "" : param.get("invitorId").toString();

		// 2015.10.22 현재 안되서 확인 필요
		//// ADD 2015.10.22 Noti관련 추가 Start		
		//		if (groupId.equals("") == false) {
		//			try {
		//				GroupVo apiIntcGrpVo = groupService.getGroupById(Long.parseLong(groupId));
		//				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), apiIntcGrpVo.getGroupId());
		//				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), apiIntcGrpVo.getGroupName());
		//			} catch (Exception ex ){
		//				LOG.error("", ex);
		//			}
		//		}
		//// ADD 2015.10.22 Noti관련 추가 End	
		
		return groupFollowerService.inviteMemberWithEmail(emaillist, groupId, invitorId);
	}
	
	/**
	 * 그룹 접근 일시 수정(groupId)
	 * @param groupFollowerVo
	 * @param request
	 * @return int
	 */
	@RequestMapping(value = "/groups/followers/access", method = RequestMethod.PUT)
	public @ResponseBody int updateGroupAccessDttm(@RequestBody GroupFollowerVo groupFollowerVo, HttpServletRequest request) {
		
		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		
		groupFollowerVo.setMemberId(sessionMemberId);
		groupFollowerService.updateGroupAccessDttm(groupFollowerVo);
		return 1;
	}

}