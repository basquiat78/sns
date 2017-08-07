package org.uengine.sns.group.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.uengine.sns.feed.vo.FeedFileVo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * GroupVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}GROUP
 *
 */
@JsonInclude(Include.NON_NULL)
public class GroupVo implements Serializable {

	private static final long serialVersionUID = -2050864236953242383L;
	
	/**
	 * 그룹 아이디
	 */
	private long groupId;
		public long getGroupId() { return groupId; }
		public void setGroupId(long groupId) { this.groupId = groupId; }
	
	/**
	 * 그룹 이름
	 */
	private String groupName;
		public String getGroupName() { return groupName; }
		public void setGroupName(String groupName) { this.groupName = groupName; }
		
	/**
	 * 그룹 이미지
	 */
	private String groupImgUrl;	
		public String getGroupImgUrl() { return groupImgUrl; }
		public void setGroupImgUrl(String groupImgUrl) { this.groupImgUrl = groupImgUrl; }
	
	/**
	 * 그룹 타입(내부, 외부)
	 */
	private String groupType = "0";
		public String getGroupType() { return groupType; }
		public void setGroupType(String groupType) { this.groupType = groupType; }

	/**
	 * 상위 그룹 아이디
	 */	
	private long pGroupId;
		public long getpGroupId() { return pGroupId; }
		public void setpGroupId(long pGroupId) { this.pGroupId = pGroupId; }

	/**
	 * 설명
	 */
	private String description;
		public String getDescription() { return description == null ? "" : description; }
		public void setDescription(String description) { this.description = description; }
	
	/**
	 * 해당 그룹을 만든 피드 아이디
	 */
	private long makeFeedId;
		public long getMakeFeedId() { return makeFeedId; }
		public void setMakeFeedId(long makeFeedId) { this.makeFeedId = makeFeedId; }

	/**
	 * 공개 여부
	 */
	private int isPublic = 0;
		public int getIsPublic() { return isPublic; }
		public void setIsPublic(int isPublic) { this.isPublic = isPublic; }

	/**
	 * 자동가입 여부
	 */
	private int isAutoJoin = 0;
		public int getIsAutoJoin() { return isAutoJoin; }
		public void setIsAutoJoin(int isAutoJoin) { this.isAutoJoin = isAutoJoin; }
		
	/**
	 * 삭제 여부
	 */
	private int isDeleted = 0;
		public int getIsDeleted() { return isDeleted; }
		public void setIsDeleted(int isDeleted) { this.isDeleted = isDeleted; }

	/**
	 * 외부타겟 아이디
	 */
	private String targetId;	
		public String getTargetId() { return targetId; }
		public void setTargetId(String targetId) { this.targetId = targetId; }
	
	/**
	 * 외부타겟 타입
	 */
	private String targetType;
		public String getTargetType() { return targetType; }
		public void setTargetType(String targetType) { this.targetType = targetType; }
		
	/**
	 * 테넌트 아이디
	 */
	private long tenantId;
		public long getTenantId() { return tenantId; }
		public void setTenantId(long tenantId) { this.tenantId = tenantId; }
		
	/**
	 * 테넌트 그룹 아이디
	 */
	private long tenantGroupId;
		public long getTenantGroupId() { return tenantGroupId; }
		public void setTenantGroupId(long tenantGroupId) { this.tenantGroupId = tenantGroupId; }

	/**
	 * 등록일시
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void setRegDttm(Date regDttm) { this.regDttm = regDttm; }
	
	/**
	 * 등록자 ID
	 */
	private long regMemberId;
		public long getRegMemberId() { return regMemberId; }
		public void setRegMemberId(long regMemberId) { this.regMemberId = regMemberId; }
		
	/**
	 * 등록자 NAME
	 */
	private String	regMemberName;
		public String getRegMemberName() { return regMemberName; }
		public void setRegMemberName(String regMemberName) { this.regMemberName = regMemberName; }
		
	/**
	 * 숨김 여부
	 */
	private int isHide = 0;
		public int getIsHide() { return isHide; }
		public void setIsHide(int isHide) { this.isHide = isHide; }
		
	/**
	 * 그룹내 인원수
	 */
	private int memberCnt;
		public int getMemberCnt() { return memberCnt; }
		public void setMemberCnt(int memberCnt) { this.memberCnt = memberCnt; }

	/**
	 * 지식피드 리스트
	 */
	private List<KnowledgeFeedVo> knwldgList;
		public List<KnowledgeFeedVo> getKnwldgList() { return knwldgList; }
		public void setKnwldgList(List<KnowledgeFeedVo> knwldgList) { this.knwldgList = knwldgList; }

	/**
	 * 그룹 팔로워 정보 리스트
	 */
	private List<GroupFollowerVo> groupFollowerList;
		public List<GroupFollowerVo> getGroupFollowerList() { return groupFollowerList; }
		public void setGroupFollowerList(List<GroupFollowerVo> groupFollowerList) { this.groupFollowerList = groupFollowerList; }
	
	/**
	 * 그룹 파일 정보(저장시 사용)
	 */
	private FeedFileVo feedFileVo;
		public FeedFileVo getFeedFileVo() { return feedFileVo; }
		public void setFeedFileVo(FeedFileVo feedFileVo) { this.feedFileVo = feedFileVo; }
		
	/**
	 * SNS 멤버의 USER ID
	 */
	private String syncKey;
		public String getSyncKey() { return syncKey; }
		public void setSyncKey(String syncKey) { this.syncKey = syncKey; }
		
	/**
	 * 동기화 키(그룹웨어 유저 아이디)
	 */
	private String memberSyncKey;
		public String getMemberSyncKey() { return memberSyncKey; }
		public void setMemberSyncKey(String memberSyncKey) { this.memberSyncKey = memberSyncKey; }
	
	/**
	 * 그룹웨어 부서 아이디
	 */
	private String partSyncKey;
		public String getPartSyncKey() { return partSyncKey; }
		public void setPartSyncKey(String partSyncKey) { this.partSyncKey = partSyncKey; }
		
	/**
	 * 쉐어포인트 저장 폴더
	 */
	private String fileRepoId;
		public String getFileRepoId() { return fileRepoId; }
		public void setFileRepoId(String fileRepoId) { this.fileRepoId = fileRepoId; }

	/**
	 * isMember
	 */
	private String isMember;
		public String getIsMember() { return isMember; }
		public void setIsMember(String isMember) { this.isMember = isMember; }	

}