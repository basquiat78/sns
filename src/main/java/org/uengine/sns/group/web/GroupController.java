package org.uengine.sns.group.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.Exception.NotAcceptableException;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.service.FileService;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.group.service.GroupFollowerService;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * GroupController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class GroupController extends ExceptionController {
	
	private static final Logger LOG = LoggerFactory.getLogger(GroupController.class);
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	GroupFollowerService groupFollowerService;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	MessageSource messageSource;
	
	@Autowired
	FileService fileService;
	
	/**
	 * select All Group List
	 * @param param
	 * @return List<GroupVo>
	 */
	@RequestMapping(value = "/groups", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> findAll(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return groupService.getGroupList(scv);
	}
	
	/**
	 * @param param
	 * @return List<GroupVo>
	 */
	@RequestMapping(value = "/groups/search", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> findAllForSearch(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return groupService.getGroupSearchList(scv);
	}
	
	/**
	 * @param param
	 * @return List<GroupVo>
	 */
	@RequestMapping(value = "/groups/mylist", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> findMyGroup(@RequestParam Map<Object, Object> param) {
		
		SearchContextVo scv = new SearchContextVo(param);
		
		List<GroupVo> alist = groupService.getGroupList(scv);
		List<GroupVo> blist = new ArrayList<GroupVo>();
		
		if(param.containsKey("memberId")) {
			for(GroupVo gv : alist) {
				
				Map<Object, Object> m = new HashMap<Object, Object>();
				m.put("groupId", gv.getGroupId() + "");
				SearchContextVo scv2 = new SearchContextVo(m);
				
				List<GroupFollowerVo> groupFollowerList = groupFollowerService.getGroupFollowerList(scv2);
				gv.setGroupFollowerList(groupFollowerList);
				blist.add(gv);
			}
			
			return blist;
		}
		return groupService.getGroupList(scv);
	}
	
	/**
	 * select Group by groupId
	 * @param groupId
	 * @param request
	 * @return groupVo
	 */
	@RequestMapping(value = "/groups/{id}", method = RequestMethod.GET)
    public @ResponseBody GroupVo findById(@PathVariable("id") long groupId, HttpServletRequest request) {
		
		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		
		GroupVo gv = groupService.getGroupById(groupId);
		
		if(gv == null || gv.getIsDeleted() == 1) {
			String msg2 =  messageSource.getMessage("group.exception.THISGROUPISCORRUPTED", null, HttpUtil.getLocale(request));
			throw new NotAcceptableException(msg2);
		}

		boolean isGroupMember = false;
		boolean isSysMgr = false;
		List<GroupFollowerVo> gflist = groupFollowerService.getGroupFollowerById(HttpUtil.getLocaleString(request), groupId);
		for(int i=0; i < gflist.size(); i++) {
			if(gflist.get(i).getMemberId() == sessionMemberId) {
				isGroupMember = true;
				break;
			}
		}
		
		MemberVo mv = memberService.getMemberById("ko", sessionMemberId);
		if(mv.getIsSysAdmin() == 1) {
			isSysMgr = true;
		}
		
		if(!isGroupMember && gv.getIsPublic() == 0 && !isSysMgr) {
			String msg1 =  messageSource.getMessage("group.exception.GROUPACCESSISNOTALLOWED", null, HttpUtil.getLocale(request));
			LOG.info("비공개 그룹 접근자 : " + mv.getMemberName() + ", " + mv.getMemberId() + ", " + mv.getSyncKey());
			throw new NotAcceptableException(msg1);
		}
		
		return gv;
	}
	
	/**
	 * @param userId
	 * @return List<GroupVo>
	 */
	@RequestMapping(value = "/groups/synckey/{id:.+}", method = RequestMethod.GET)
    public @ResponseBody List<GroupVo> findBySynckey(@PathVariable("id") String userId) {
		return groupService.getGroupBySynckey(userId);
	}
	
	/**
	 * 그룹명 검색
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "/groups/name", method = RequestMethod.GET)
    public @ResponseBody GroupVo findByGroupName(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		if(scv.getGroupName() == null || "".equals(scv.getGroupName().trim())) {
			return new GroupVo();
		}
		
		GroupVo grv = groupService.getGroupByGroupName(scv);
		
		if(grv == null) {
			return new GroupVo();
		} else {
			return grv;
		}
		
	}
	
	/**
	 * insert new Group Info
	 * @param groupVo
	 * @param request
	 * @return GroupVo
	 */
	@RequestMapping(value = "/groups", method = RequestMethod.POST)
	public @ResponseBody GroupVo addGroup(@RequestBody GroupVo groupVo, HttpServletRequest request) {
		GroupVo grpVo = groupService.saveGroup(groupVo);
		// ADD 2015.10.28 Noti관련 추가 Start
		try {
			GroupVo apiIntcGrpVo = groupService.getGroupById(grpVo.getGroupId());
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), apiIntcGrpVo.getGroupId());
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), apiIntcGrpVo.getGroupName());
		} catch (Exception ex ) {
			LOG.error("", ex);
		}
		// ADD 2015.10.28 Noti관련 추가 End	
		
		return grpVo;
	}
	
	/**
	 * update Group Info
	 * @param groupVo
	 * @return GroupVo
	 */
	@RequestMapping(value = "/groups", method = RequestMethod.PUT)
	public @ResponseBody GroupVo updateGroup(@RequestBody GroupVo groupVo) {
		return groupService.updateGroup(groupVo);
	}
	
	
	/**
	 * delete group
	 * @param groupId
	 * @return GroupVo
	 */
	@RequestMapping(value = "/groups/{id}", method = RequestMethod.DELETE)
	public @ResponseBody GroupVo deleteGroup(@PathVariable("id") long groupId) {
		return groupService.deleteGroup(groupId);
	}
	
	/**
	 * delete Group List Info
	 * @param map
	 * @return Map<String, Object>
	 */
	@RequestMapping(value = "/groups/lists", method = RequestMethod.PUT)
	public @ResponseBody Map<String, Object> deleteGroupList(@RequestBody Map<String, Object> map) {
		return groupService.deleteGroupList(map);
	}
	
	
	/**
	 * 그룹 사진 가져오기
	 * 커스터마이징 대상
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/groups/imgs", method = RequestMethod.GET)
	public void groupImg(HttpServletRequest request, HttpServletResponse response) {
		String  groupId 	= request.getParameter("groupId");
		GroupVo groupVo 	= groupService.getGroupById(Long.valueOf(groupId));
		String  groupPicUrl = groupVo.getGroupImgUrl();
		fileService.imgSrcToResponse(request, response, groupPicUrl, fileService.COMMON_FILE_REPOSITORY_PATH, "pic_group.jpg", fileService.WEB_FILE_REPOSITORY_PATH);
	}
	
	/**
	 * 임시 저장 그룹 이미지 정보 가져오기
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/groups/imgs/temp", method = RequestMethod.GET)
	public void groupTempImg(HttpServletRequest request, HttpServletResponse response){
		String  groupTempPicUrl = request.getParameter("groupTempPicUrl");
		fileService.imgSrcToResponse(request, response, groupTempPicUrl, fileService.COMMON_FILE_TMP_PATH, "pic_group.jpg", fileService.WEB_FILE_REPOSITORY_PATH);
	}

}