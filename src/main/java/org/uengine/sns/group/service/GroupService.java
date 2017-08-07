package org.uengine.sns.group.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.code.ActType;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.service.FileService;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FollowerService;
import org.uengine.sns.feed.vo.FollowerVo;
import org.uengine.sns.group.mapper.GroupMapper;
import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.service.NoticeService;
import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.openapi.service.SharePointService;

/**
 * 
 * GroupService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("groupService")
public class GroupService {
	
	private static final Logger LOG = LoggerFactory.getLogger(GroupService.class);

	@Autowired
	GroupMapper groupMapper;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	GroupFollowerService groupFollowerService;
	
	@Autowired
	FileService fileService;
	
	@Autowired
	FollowerService followerService;
	
	@Autowired
	NoticeService noticeService;
	
	@Autowired
	SharePointService sharepointService;
	
	/**
	 * select all groupList
	 * @return List<GroupVo>
	 */
	public List<GroupVo> getGroupList() {
		return groupMapper.selectGroupList();
	}
	
	/**
	 *  GroupList Cnt
	 * @param scv
	 * @return int
	 */
	public int getGroupListCnt(SearchContextVo scv) {
		return groupMapper.selectGroupListByconditionCnt(scv);
	}
	
	/**
	 * Widget getGroupList 
	 * @param scv
	 * @return List<GroupVo>
	 */
	public List<GroupVo> getGroupList(SearchContextVo scv) {
		return groupMapper.selectGroupListBycondition(scv);
	}
	
	/**
	 * @param scv
	 * @return List<GroupVo>
	 */
	public List<GroupVo> getGroupSearchList(SearchContextVo scv) {
		scv.groupName(StringUtils.replaceEach(scv.getGroupName(), new String[]{"%", "_"}, new String[]{"|%", "|_"}));
		return groupMapper.selectGroupListBySearchcondition(scv);
	}
	
	/**
	 * get GroupList New
	 * @param scv
	 * @return List<GroupVo>
	 */
	public List<GroupVo> getGroupListNew(SearchContextVo scv) {
		return groupMapper.selectGroupListByNewCondition(scv);
	}
	
	/**
	 * get GroupList Recommend
	 * @param scv
	 * @return List<GroupVo>
	 */
	public List<GroupVo> getGroupListRecommend(SearchContextVo scv) {
		return groupMapper.selectGroupListByRecommend(scv);
	}
	
	/**
	 * select group by groupId
	 * @param groupId
	 * @return GroupVo
	 */
	public GroupVo getGroupById(long groupId) {
		return groupMapper.selectGroupById(groupId);
	}
	
	/**
	 * @param userId
	 * @return List<GroupVo>
	 */
	public List<GroupVo> getGroupBySynckey(String userId) {
		return groupMapper.selectGroupBySynckey(userId);
	}
	
	
	/**
	 * select group by groupId
	 * @param groupId
	 * @return groupVo
	 */
	public GroupVo getGroupByGroupName(SearchContextVo scv) {
		return groupMapper.selectGroupByGroupName(scv);
	}
	
	/**
	 * @param groupVo
	 */
	public void insertGroup(GroupVo groupVo) {

		/** 1.저장하는 멤버의 정보를 취득하여 회사 tenantId를 그룹 Vo에 세팅한다. */
		long memberId = groupVo.getRegMemberId();
		if(memberId > 0) {
			MemberVo memberVo = memberService.getMemberById("ko", memberId);
			groupVo.setTenantId(memberVo.getTenantId());
			groupVo.setMemberSyncKey(memberVo.getSyncKey());
		} else {
			if(groupVo.getMemberSyncKey() == null) {
				throw new SNSServiceException("그룹 생성자의 사용자 아이디가 존재하지 않습니다.");
			}
			
			MemberVo memberVo = memberService.getMemberBySynckey("ko", groupVo.getMemberSyncKey());

			if(memberVo == null) {
				throw new SNSServiceException("그룹 생성자의 정보가 존재하지 않습니다. (" + groupVo.getMemberSyncKey() + ")");
			}
			
			groupVo.setTenantId(memberVo.getTenantId());
			groupVo.setRegMemberId(memberVo.getMemberId());
		}
		
		/** 2. tmp 폴더에 있는 이미지를 실제 폴더에 저장하고 경로를 그룹 Vo에 세팅한다. */
		String groupImgUrl = "";
		if(groupVo.getFeedFileVo() != null) {
			groupImgUrl = fileService.copyToFile(groupVo.getFeedFileVo());
		}
		groupVo.setGroupImgUrl(groupImgUrl);

		/** 3. 등록일 세팅 및 그룹 메타 정보 등록 */
		Date now = new Date();
		groupVo.setRegDttm(now);
		groupMapper.insertGroup(groupVo);
	}
	
	/**
	 * save group info
	 * @param groupVo
	 * @return GroupVo
	 */
	public GroupVo saveGroup(GroupVo groupVo) {
		
		insertGroup(groupVo);
		
		/** 4. 그룹 팔로워 저장 */
		List<GroupFollowerVo> gflist = groupVo.getGroupFollowerList();
		if(gflist != null) {
			for(GroupFollowerVo gfvo : gflist) {
				gfvo.setGroupId(groupVo.getGroupId());
				gfvo.setJoinStatus(SNSCodeMaster.GROUP_JOIN_STATUS.COMPLETE.name());
				groupFollowerService.insertGroupFollower(gfvo);
			}
		}
		
		if(groupVo.getMakeFeedId() > 0L ) {
			
			// 생성된 그룹를 피드의 팔로워로 등록한다.
			FollowerVo fv = new FollowerVo();
			fv.setFollowerId(groupVo.getGroupId());
			fv.setFollowerName(groupVo.getGroupName());
			fv.setFollowerType(SNSCodeMaster.ITEM_TYPE.GROUP.toString());
			fv.setItemId(groupVo.getMakeFeedId());
			fv.setItemType(SNSCodeMaster.ITEM_TYPE.FEED.toString());
			fv.setRegMemberId(groupVo.getRegMemberId());
			
			followerService.insertFollower(fv);
		}
		
		return groupVo;
	}
	
	/**
	 * update group Info
	 * @param groupVo
	 * @return GroupVo
	 */
	public GroupVo updateGroup(GroupVo groupVo) {
		
		String groupNameInput = groupVo.getGroupName();
		Map<Object, Object> param = new HashMap<Object, Object>();
		param.put("groupName", groupNameInput);
		SearchContextVo scv = new SearchContextVo(param);
		GroupVo grv = this.getGroupByGroupName(scv);
		GroupVo currGrv = this.getGroupById(groupVo.getGroupId());
		
		// 이미 존재하는 그룹명이 아니라면 해당 그룹명으로 수정 가능
		if(grv == null || currGrv.getGroupName().equals(groupNameInput)) {
			String groupImgUrl = "";
			if(groupVo.getFeedFileVo() != null) {
				groupImgUrl = fileService.copyToFile(groupVo.getFeedFileVo());
			}
			
			groupVo.setGroupImgUrl(groupImgUrl);
			
			if(groupVo.getFileRepoId().equals("")) {
				groupVo.setTargetId("");
				groupVo.setTargetType("");
			}
			
			groupMapper.updateGroup(groupVo);
			
			List<GroupFollowerVo> gflist = groupVo.getGroupFollowerList();
			if(gflist != null) {
				for(GroupFollowerVo gfvo : gflist) {
					groupFollowerService.insertGroupFollower(gfvo);
				}
				
				// 그룹 구성원 변경시
				// ADD j.h kim 2015.11.12 Sharepoint group user 연동 Start	
				for(GroupFollowerVo gfv: gflist) {
					GroupVo shpGrpInfoVo = getGroupById(groupVo.getGroupId());
					String targetType = shpGrpInfoVo.getTargetType() == null ? ""  : shpGrpInfoVo.getTargetType();
					if(targetType.toUpperCase().equals(SNSCodeMaster.REPOSITORY_TYPE.SHAREPOINT.name())) {
						Map<String, Object> paramMap = new HashMap<String, Object>();
						String siteId = shpGrpInfoVo.getTargetId();
						// 사용자 구분, A:관리자/M:멤버
						String userType = (gfv.getIsGroupMng() == null || gfv.getIsGroupMng().intValue() == 0) ? "M" : "A";
						String syncType = "I";
						String[] userIds = {String.valueOf(gfv.getMemberId())};
						paramMap.put("pathKey", "IF_SV_013");
						paramMap.put("SiteID", siteId);
						paramMap.put("UserType", userType);
						paramMap.put("SyncType", syncType);
						paramMap.put("UserIDs", userIds);
						
						String respStr = sharepointService.getSharePointRestService(paramMap);
						LOG.info("sharepoint rest ret :" + respStr);
					}
				}
				// ADD j.h kim 2015.11.12 Sharepoint group user 연동 End	
			}
		} else {
			groupVo.setGroupId(0L);
		}
		
		return groupVo;
	}
	
	/**
	 * delete group Info
	 * @param groupId
	 * @return GroupVo
	 */
	public GroupVo deleteGroup(long groupId) {
		/** 1. 그룹 정보 삭제 */
		groupMapper.deleteGroup(groupId);
		
		/** 2. 그룹 팔로워 삭제  */
		groupFollowerService.deleteGroupFollowerByGroupId(groupId);
		return groupMapper.selectGroupById(groupId);
	}
	
	/**
	 * delete group list Info
	 * @param map
	 * @return Map<String, Object>
	 */
	public Map<String, Object> deleteGroupList(Map<String, Object> map) {
		groupMapper.deleteGroupList(map);
		return map;
	}

	/**
	 * set group noti info
	 * @param groupVo
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getGroupFollowListNotiInfo(GroupVo groupVo) {
		
		List<GroupFollowerVo> groupFolloweList = groupVo.getGroupFollowerList();
		List<NoticeVo> notiArrList = new ArrayList<NoticeVo>();
		for(GroupFollowerVo grpVo : groupFolloweList) {
			GroupVo apiIntcGrpVo = getGroupById(groupVo.getGroupId());
			NoticeVo noticeVo = new NoticeVo();
			noticeVo.setItemId(apiIntcGrpVo.getGroupId());
			noticeVo.setItemTitle(apiIntcGrpVo.getGroupName());
			noticeVo.setFromMemberId(grpVo.getMemberId());
			
			if(groupVo.getRegMemberId() == grpVo.getMemberId()) {
				noticeVo.setIsRead(1);
			}
			notiArrList.add(noticeVo);
		}
		
		return notiArrList;
	}

	/**
	 * set group noti info
	 * @param groupVo
	 * @param memberVo
	 * @param fromMemberId
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getGroupNotiInfo(GroupVo groupVo, MemberVo memberVo, long fromMemberId) {
		
		String fromMemberName =  memberVo.getMemberName() + " " + StringUtils.defaultString(memberVo.getMemberPositionName());
		List<NoticeVo> noticeArrList = new ArrayList<NoticeVo>();
		GroupVo apiIntcGrpVo = getGroupById(groupVo.getGroupId());
		NoticeVo noticeVo = new NoticeVo();
		noticeVo.setItemType(SNSCodeMaster.ITEM_TYPE.GROUP.name());
		noticeVo.setItemId(apiIntcGrpVo.getGroupId());
		noticeVo.setItemTitle(apiIntcGrpVo.getGroupName());
		noticeVo.setFromMemberId(fromMemberId);
		noticeVo.setFromMemberName(fromMemberName);
		noticeVo.setToMemberId(memberVo.getMemberId());
		
		ActType actType = ActType.GROUP_FOLLOWER_FORCEDEL;
		String mobileMsgType = "102";
		noticeVo.setNoticeMemberId(memberVo.getMemberId());
		noticeVo.setActType(actType.name());
		noticeService.insertNoticeByMemberId(noticeVo, actType, mobileMsgType, true);
		
		noticeArrList.add(noticeVo);
		return noticeArrList;
	}

}