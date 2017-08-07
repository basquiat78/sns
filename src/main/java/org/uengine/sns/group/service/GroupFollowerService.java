package org.uengine.sns.group.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.service.InviteGeneraterService;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.federation.service.FederationService;
import org.uengine.sns.group.GroupRestful;
import org.uengine.sns.group.mapper.GroupFollowerMapper;
import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.openapi.service.SharePointService;
import org.uengine.sns.tenant.service.TenantService;
import org.uengine.sns.tenant.vo.TenantVo;

/**
 * 
 * GroupFollowerService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("groupFollowerService")
public class GroupFollowerService {
	
	private static final Logger LOG = LoggerFactory.getLogger(GroupFollowerService.class);

	@Autowired
	GroupFollowerMapper groupFollowerMapper;
	
	@Autowired
	TenantService tenantService; 
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	FederationService federationService;
	
	@Autowired
	InviteGeneraterService inviteGeneraterService;
	
	@Autowired
	SharePointService sharePointService;
	
	/**
	 * select groupFollower by SearchContextVo
	 * @param scv
	 * @return List<GroupFollowerVo>
	 */
	public List<GroupFollowerVo> getGroupFollowerList(SearchContextVo scv) {
		return groupFollowerMapper.selectGroupFollowerListByCondition(scv);
	}
	
	/**
	 * select groupFollower by lang, groupId
	 * @param lang
	 * @param groupId
	 * @return List<GroupFollowerVo>
	 */
	public List<GroupFollowerVo> getGroupFollowerById(String lang, long groupId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("groupId", groupId);
		return groupFollowerMapper.selectGroupFollowerById(map);
	}
	
	/**
	 * 그룹정보용
	 * select groupFollower by lang, groupId
	 * @param lang
	 * @param groupId
	 * @return List<GroupFollowerVo>
	 */
	public List<GroupFollowerVo> selectGroupFollowerByIdForGroupInfo(String lang, long groupId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("groupId", groupId);
		return groupFollowerMapper.selectGroupFollowerByIdForGroupInfo(map);
	}
	
	/**
	 * select groupFollower by groupId, memberId
	 * @param groupId
	 * @param memberId
	 * @return GroupFollowerVo
	 */
	public GroupFollowerVo getGroupFollower(long groupId, long memberId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("groupId", groupId);
		map.put("memberId", memberId);
		return groupFollowerMapper.selectGroupFollower(map);
	}
	
	
	/**
	 * insert groupFollower info
	 * @param groupFollowerVo
	 * @return GroupFollowerVo
	 */
	public GroupFollowerVo insertGroupFollower(GroupFollowerVo groupFollowerVo) {
		
		if(groupFollowerVo.getMemberId() == 0) {
			if(groupFollowerVo.getSyncKey() == null) {
				LOG.warn("멤버 아이디 또는 유저 아이디가 NULL(널) 입니다.");
				return null;
			}
			
			MemberVo memberVo = memberService.getMemberBySynckey("ko", groupFollowerVo.getSyncKey());

			if(memberVo == null) {
				LOG.warn("해당 멤버 정보가 존재하지 않습니다. (" + groupFollowerVo.getSyncKey() + ")");
				return null;
			}
			
			groupFollowerVo.setMemberId(memberVo.getMemberId());
		}
		
		GroupFollowerVo gfVo = getGroupFollower(groupFollowerVo.getGroupId(), groupFollowerVo.getMemberId());
		if(gfVo != null && gfVo.getMemberId() > 0) {
			if(SNSCodeMaster.GROUP_JOIN_STATUS.COMPLETE.name().equals(gfVo.getJoinStatus())) {
				throw new SNSServiceException("이미 가입되어 있습니다.");
			} else if(SNSCodeMaster.GROUP_JOIN_STATUS.REJECT.name().equals(gfVo.getJoinStatus())) {
				// 거절인 경우는 데이터를 삭제하여 이후 등록 로직을 진행한다.
				deleteGroupFollower(groupFollowerVo);
			} else {
				throw new SNSServiceException("가입신청 중 입니다.");
			}
		}
		
		groupFollowerMapper.insertGroupFollower(groupFollowerVo);
		return groupFollowerVo;
	}
	
	/**
	 * insert groupFollower info with member list
	 * @param h
	 * @return int
	 */
	public int insertGroupFollowerWithMemberList(HashMap<String, Object> h) {
		return groupFollowerMapper.insertGroupFollowerWithMemberList(h);
	}
	
	/**
	 * 그룹 멤버 이메일초대
	 * @param l
	 * @param groupId
	 * @param invitorId
	 * @return int
	 */
	public int inviteMemberWithEmail(List<HashMap<String, Object>> l, String groupId, String invitorId) {
		int cnt = 0;
		for(int i=0; i<l.size(); i++) {
			MemberVo mv = new MemberVo();
			
			mv.setEmailAddr(l.get(i).get("email").toString());
			MemberVo mv2 = inviteGeneraterService.inviteGenerate(mv);
							
				GroupFollowerVo gfv = new GroupFollowerVo();
				gfv.setGroupId(Long.parseLong(groupId));
				gfv.setMemberId(mv2.getMemberId());
				
				GroupFollowerVo gfv2 = getGroupFollower(gfv.getGroupId(), gfv.getMemberId());
				if(gfv2 == null) {
					gfv.setInvitorId(Long.parseLong(invitorId));
					gfv.setJoinStatus("COMPLETE");
					groupFollowerMapper.insertGroupFollower(gfv);
					
					LOG.info(l.get(i).get("email") + " 으로 발송완료 " + groupId + " " + invitorId);
					cnt+= 1;
				}
		}
		return cnt;
	}
	
	/**
	 * 그룹 멤버 팔로우 - federation
	 * @param groupVo
	 * @return GroupFollowerVo
	 */
	public GroupFollowerVo insertFederationGroupFollower(GroupVo groupVo) {
		
		String syncKey = groupVo.getSyncKey();
		
		/** 1. 동기화키로 멤버 정보 검색 */
		MemberVo memberVo = memberService.getMemberBySynckey("ko", syncKey);
		
		// 3.1 멤버 정보가 federation tenant서버에 존재하지 않으면 에러 발생
		if(memberVo == null) {
			long memberId = groupVo.getRegMemberId();
			memberVo = memberService.getMemberById("ko", memberId);
			
			if(memberVo == null) {
				throw new SNSServiceException("해당 계열사에 멤버 정보가 존재하지 않습니다.");
			}
		}
		
		// 3.2 테넌트 서버에 그룹이 존재하는지 체크
		GroupVo tmpGroupVo = groupService.getGroupById(groupVo.getTenantGroupId());
		
		// 3.3 테넌트 서버에 그룹이 없으면 원서버의 그룹메타정보를 테넌트 서버에 등록
		if(tmpGroupVo == null) {
			groupService.saveGroup(groupVo);
		} else {
			groupVo = tmpGroupVo;
		}
		
		/** 4. 멤버 아이디로 해당 그룹의 팔로우로 등록 */
		GroupFollowerVo gfv = new GroupFollowerVo();
		gfv.setGroupId(groupVo.getGroupId());
		gfv.setMemberId(memberVo.getMemberId());
		gfv.setInvitorId(1);
		gfv.setJoinStatus(groupVo.getIsAutoJoin() == 0 ? null : SNSCodeMaster.GROUP_JOIN_STATUS.COMPLETE.name());
		groupFollowerMapper.insertGroupFollower(gfv);
		return gfv;
		
	}
	
	/**
	 * 그룹 멤버 팔로우 생성
	 * @param groupVo
	 * @return GroupFollowerVo
	 */
	public GroupFollowerVo insertGroupFollower(GroupVo groupVo) {
		
		String syncKey = groupVo.getSyncKey();
		
		/** 1. 멤버 정보 검색 */
		MemberVo memberVo = null;
		if(syncKey != null && !"".equals(syncKey)) {
			memberVo = memberService.getMemberBySynckey("ko", syncKey);
		} else {
			memberVo = memberService.getMemberById("ko", groupVo.getRegMemberId());
		}
		
		TenantVo tenantVo = null;
		/** 2. Federation이 아닌 자신의 서버에 직접 호출된 상태*/
		// 2.1 멤버 정보가 없으면 타 계열사 멤버라 가정하고 자신의 서버에 멤버 등록
		if(memberVo == null) {
			// 2.1.1 그룹웨어 조직정보 연동해  멤버 메타 정보와 계열사 ID 취득
			memberVo = memberService.getMemberBySynckey("ko", syncKey);
			// 2.1.2 멤버가 그룹웨어 있는지 체크
			if(memberVo == null) {
				new SNSServiceException("그룹웨어에도 멤버 정보가 존재하지 않습니다.");
			}
			// 2.1.3 취득된 멤버 정보에서 회사아이디로 해당 테넌트 아이디 취득
			tenantVo = tenantService.getTenantByCompanyId(memberVo.getCompanyId());
			// 2.1.4 테넌트 정보가 없으면 에러 
			if(tenantVo == null) {
				new SNSServiceException("계열사 정보가 없습니다.");
			}
			// 2.1.5 멤버 정보에 테넌트 아이디 셋
			memberVo.setTenantId(tenantVo.getTenantId());
			// 2.1.6 멤버 등록
			memberService.insertMember(memberVo);
		} else {
			tenantVo = tenantService.getTenantById(memberVo.getTenantId());
		}
		
		/** 2. 멤버 아이디로 해당 그룹의 팔로우로 등록 */
		GroupFollowerVo gfv = new GroupFollowerVo();
		
		GroupVo gv = groupService.getGroupById(groupVo.getGroupId());
		gfv.setGroupId(gv.getGroupId());
		gfv.setMemberId(memberVo.getMemberId());
		gfv.setInvitorId(0);
		gfv.setJoinStatus(gv.getIsAutoJoin() == 0 ? null : SNSCodeMaster.GROUP_JOIN_STATUS.COMPLETE.name());
		gfv.setIsGroupMng(0);
		groupFollowerMapper.insertGroupFollower(gfv);
		
		/** 3. 테넌트 정보 확인 및 federation */
		// 3.1 멤버 정보에서 취득한 테넌트 아이디로 테넌트 테이블을 검색하여 타 계열사인지 아닌지를 판단
		if(tenantVo.getIsNetwork() == 1) {
			groupVo = groupService.getGroupById(groupVo.getGroupId());
			
			MultiValueMap<String, Object> param = new LinkedMultiValueMap<String, Object>(); 
			param.add("federation", "1");
			param.add("syncKey", syncKey);
			param.add("tenantGroupId", groupVo.getGroupId());
			param.add("groupName", groupVo.getGroupName());
			
			// REST URL 호출
			// 에러 처리에 대한부분 추가 처리 필요
			try {
				federationService.requestTenantByPost(tenantVo, GroupRestful.GFOLLOWER_FEDERATION_URL, param);
			} catch(Exception e) {
				LOG.error(e.getMessage());
			}
		}
		
		return gfv;
		
	}
	
	/**
	 * update groupFollower Info
	 * @param groupFollowerVo
	 * @return GroupFollowerVo
	 */
	public GroupFollowerVo updateGroupFollower(GroupFollowerVo groupFollowerVo) {
		
		String syncKey = groupFollowerVo.getSyncKey();
		/** 1. 멤버 정보 검색 */
		MemberVo memberVo = null;
		if(syncKey != null && !"".equals(syncKey)) {
			memberVo = memberService.getMemberBySynckey("ko", syncKey);
			groupFollowerVo.setMemberId(memberVo.getMemberId());
		}
		
		groupFollowerMapper.updateGroupFollower(groupFollowerVo);
		
		// ADD j.h kim 2015.11.12 Sharepoint group user 연동 Start		
		GroupVo shpGrpInfoVo = groupService.getGroupById(groupFollowerVo.getGroupId());
		String targetType = shpGrpInfoVo.getTargetType() == null ? ""  : shpGrpInfoVo.getTargetType();
		if(targetType.toUpperCase().equals(SNSCodeMaster.REPOSITORY_TYPE.SHAREPOINT.name())) {
			Map<String, Object> paramMap = new HashMap<String, Object>();
			String siteId = shpGrpInfoVo.getTargetId();
			// 사용자 구분, A:관리자/M:멤버
			String userType = (groupFollowerVo.getIsGroupMng() == null || groupFollowerVo.getIsGroupMng().intValue() == 0) ? "M" : "A";
			String syncType = "I";
			String[] userIds = {String.valueOf(groupFollowerVo.getMemberId())};
			paramMap.put("pathKey", "IF_SV_013");
			paramMap.put("SiteID", siteId);
			paramMap.put("UserType", userType);
			paramMap.put("SyncType", syncType);
			paramMap.put("UserIDs", userIds);
			
			String respStr = sharePointService.getSharePointRestService(paramMap);
			LOG.info("sharepoint rest ret :" + respStr);
		}
		// ADD j.h kim 2015.11.12 Sharepoint group user 연동 End		
		return groupFollowerVo;
	}
	
	/**
	 * 재가입시 업데이트
	 * @param groupFollowerVo
	 * @return GroupFollowerVo
	 */
	public GroupFollowerVo updateGroupFollowerRejoin(GroupFollowerVo groupFollowerVo) {
		GroupFollowerVo gfv = updateGroupFollower(groupFollowerVo);
		groupFollowerMapper.updateGroupAccessDttm(gfv);
		gfv.setJoinStatus("");
		groupFollowerMapper.updateGroupRegDttmWithJoinStatus(gfv);
		return gfv;
	}
	
	/**
	 * delete group follower
	 * @param groupFollowerVo
	 * @return GroupFollowerVo
	 */
	public GroupFollowerVo deleteGroupFollower(GroupFollowerVo groupFollowerVo) {
		/** 1. 자신의 서버에서 그룹 팔로우 제거 */
		groupFollowerMapper.deleteGroupFollower(groupFollowerVo);
		return groupFollowerVo;
	}
	
	/**
	 * @param groupId
	 */
	public void deleteGroupFollowerByGroupId(long groupId) {
		groupFollowerMapper.deleteGroupFollowerByGroupId(groupId);
	}
	
	/**
	 * 그룹 팔로우 제거 - bySelf, byMng
	 * @param groupVo
	 * @param byType
	 * @return GroupFollowerVo
	 */
	public GroupFollowerVo deleteGroupFollower(GroupVo groupVo, String byType) {
		
		String syncKey = groupVo.getSyncKey();
		long memberId = 0;
		MemberVo memberVo = null;
		
		/** 1. 삭제할 멤버 정보 취득 */
		if(syncKey == null || "".equals(syncKey)) {
			memberId = groupVo.getRegMemberId();
			if(memberId == 0) {
				new SNSServiceException("멤버 정보가 존재하지 않습니다. ");
			}
			memberVo = memberService.getMemberById("ko", memberId); 
		} else {
			memberVo = memberService.getMemberBySynckey("ko", syncKey); 
		}

		// ADD j.h kim 2015.11.12 Sharepoint group user 연동 Start	
		GroupVo shpGrpInfoVo = groupService.getGroupById(groupVo.getGroupId());
		String targetType = shpGrpInfoVo.getTargetType() == null ? ""  : shpGrpInfoVo.getTargetType();
		GroupFollowerVo delFlwVo = getGroupFollower(shpGrpInfoVo.getGroupId(), memberVo.getMemberId());
		if(targetType.toUpperCase().equals(SNSCodeMaster.REPOSITORY_TYPE.SHAREPOINT.name())) {
			Map<String, Object> paramMap = new HashMap<String, Object>();
			String siteId = shpGrpInfoVo.getTargetId();
			// 사용자 구분, A:관리자/M:멤버
			String userType = (delFlwVo.getIsGroupMng() == null || delFlwVo.getIsGroupMng().intValue() == 0) ? "M" : "A";
			String syncType = "D";
			String[] userIds = {String.valueOf(delFlwVo.getMemberId())};
			paramMap.put("pathKey", "IF_SV_013");
			paramMap.put("SiteID", siteId);
			paramMap.put("UserType", userType);
			paramMap.put("SyncType", syncType);
			paramMap.put("UserIDs", userIds);
			
			String respStr = sharePointService.getSharePointRestService(paramMap);
			LOG.info("sharepoint rest ret :" + respStr);
		}
		// ADD j.h kim 2015.11.12 SharePoint group user 연동 End
		
		// 1.1 그룹정보취득
		groupVo = groupService.getGroupById(groupVo.getGroupId());
		// 1.2 그룹 정보가 없으면 에러 발생
		if(groupVo == null) {
			new SNSServiceException("그룹 정보가 존재하지 않습니다.");
		}
		
		/** 2. 제거할 GroupFolloweVo 객체 생성 및 멤버아이디 그룹아이디 셋 */
		GroupFollowerVo groupFollowerVo = new GroupFollowerVo();
		groupFollowerVo.setMemberId(memberVo.getMemberId());
		groupFollowerVo.setGroupId(groupVo.getGroupId());
		
		/** 3. 자신의 서버에서 그룹 팔로우 제거 */
		groupFollowerMapper.deleteGroupFollower(groupFollowerVo);
		
		/** 4. Federation이 아닌 자신의 서버에 직접 호출된 상태*/
		long tenantId = 0;
		// 4.1 탈퇴면 자기서버의 그룹정보에서 테넌트 아이디 취득
		if("bySelf".equals(byType)) {
			tenantId = groupVo.getTenantId();
		// 4.2 관리자에 의한 팔로우 제거면 제거한 멤버 정보에서 테넌트 아이디 취득
		} else if("byMng".equals(byType)) {
			tenantId = memberVo.getTenantId();
		}
		
		// 4.3 테넌트 아이디로 테넌트 정보 취득
		TenantVo tenantVo = tenantService.getTenantById(tenantId);
		// 4.4 테넌트 정보가 없으면 에러 발생
		if(tenantVo == null) {
			new SNSServiceException("테넌트 정보가 존재하지 않습니다.");
		}
		
		// 4.5 외부 그룹이면 상대 서버에서 그룹 팔로우 제거해야함 */
		if(tenantVo.getIsNetwork() == 1) {
			MultiValueMap<String, Object> param = new LinkedMultiValueMap<String, Object>();
			param.add("federation", "1");
			param.add("syncKey", syncKey);
			param.add("groupId", groupVo.getTenantGroupId());
			
			// REST URL 호출
			try {
				federationService.requestTenantByPost(tenantVo, GroupRestful.BASE_GFOLLOWER_URL, param);
			} catch(Exception e) {
				LOG.error(e.getMessage());
			}
		}
		
		return groupFollowerVo;
	}

	/**
	 * @param groupFollowerVo
	 */
	public void updateGroupAccessDttm(GroupFollowerVo groupFollowerVo) {
		groupFollowerMapper.updateGroupAccessDttm(groupFollowerVo);
	}

}