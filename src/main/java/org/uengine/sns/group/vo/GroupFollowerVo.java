package org.uengine.sns.group.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.tenant.vo.UserTenantMappingVo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * GroupFollowerVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}GRPFWL
 *
 */
@JsonInclude(Include.NON_NULL)
public class GroupFollowerVo implements Serializable {
	
	private static final long serialVersionUID = 1128216511208476590L;
	
	/**
	 * 그룹 아이디
	 */
	private long groupId;
		public long getGroupId() { return groupId; }
		public void setGroupId(long groupId) { this.groupId = groupId; }
		
	/**
	 * SNS 멤버의 USER ID
	 */
	private String syncKey;
		public String getSyncKey() { return syncKey; }
		public void setSyncKey(String syncKey) { this.syncKey = syncKey; }
		
	/**
	 * 사용자 아이디
	 */
	private long memberId;
		public long getMemberId() { return memberId; }
		public void setMemberId(long memberId) { this.memberId = memberId; }

	/**
	 * 사용자 이름
	 */
	private String memberName;
		public String getMemberName() { return memberName; }
		public void setMemberName(String memberName) { this.memberName = memberName; }

	/**
	 * 새글 건수
	 */
	private Integer newFeedCnt;
		public Integer getNewFeedCnt() { return newFeedCnt; }
		public void setNewFeedCnt(Integer newFeedCnt) { this.newFeedCnt = newFeedCnt; }
		
	/**
	 * 그룹 관리자 여부
	 */
	private Integer isGroupMng;
		public Integer getIsGroupMng() { return isGroupMng; }
		public void setIsGroupMng(Integer isGroupMng) { this.isGroupMng = isGroupMng; }
		
	/**
	 * 초대 여부
	 */
	private Integer isInvite;
		public Integer getIsInvite() { return isInvite; }
		public void setIsInvite(Integer isInvite) { this.isInvite = isInvite; }
		
	/**
	 * 초대자 아이디
	 */
	private long invitorId;
		public long getInvitorId() { return invitorId; }
		public void setInvitorId(long invitorId) { this.invitorId = invitorId; }
		
	/**
	 * 가입상태
	 */
	private String joinStatus;
		public String getJoinStatus() { return joinStatus; }
		public void setJoinStatus(String joinStatus) { this.joinStatus = joinStatus; }

	/**
	 * 그룹 최근 접근 일시
	 */
	private Date lstAccessDttm;
		public Date getLstAccessDttm() { return lstAccessDttm; }
		public void setLstAccessDttm(Date lstAccessDttm) { this.lstAccessDttm = lstAccessDttm; }
	
	/**
	 * memberList
	 */
	private List<MemberVo> memberList;
		public List<MemberVo> getMemberList() { return memberList; }
		public void setMemberList(List<MemberVo> memberList) { this.memberList = memberList; }
	
	/**
	 * 멤버에 해당하는 사용자 테넌트 매핑 정보 리스트	
	 */
	private List<UserTenantMappingVo> tenantMappingList;
		public List<UserTenantMappingVo> getTenantMappingList() { return tenantMappingList; }
		public void setTenantMappingList(List<UserTenantMappingVo> tenantMappingList) { this.tenantMappingList = tenantMappingList; }

}