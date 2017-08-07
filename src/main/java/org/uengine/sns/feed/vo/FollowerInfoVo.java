package org.uengine.sns.feed.vo;

import java.io.Serializable;
import java.util.List;

import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.tenant.vo.UserTenantMappingVo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * FollowerInfoVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}FOLLOWER
 *
 */
@JsonInclude(Include.NON_NULL)
public class FollowerInfoVo implements Serializable {
	
	private static final long serialVersionUID = 6614219619935456809L;
	
	/**
	 * 팔로워 아이디
	 */
	private long followerId;
		public long getFollowerId() { return followerId; }
		public void setFollowerId(long followerId) { this.followerId = followerId; }
		
	/**
	 * 팔로워 이름
	 */
	private String followerName;
		public String getFollowerName() { return followerName; }
		public void setFollowerName(String followerName) { this.followerName = followerName; }
		
	/**
	 * 팔로워 이름
	 */	
	private String followerType;
		public String getFollowerType() { return followerType; }
		public void setFollowerType(String followerType) { this.followerType = followerType; }

	/**
	 * 그룹/멤버의 사진
	 */
	private String followerPicUrl;
		public String getFollowerPicUrl() {	return followerPicUrl; }
		public void setFollowerPicUrl(String followerPicUrl) { this.followerPicUrl = followerPicUrl; }

	/**
	 * 멤버의 경우 썸네일 정보
	 */
	private String followerThumbUrl;	
		public String getFollowerThumbUrl() { return followerThumbUrl; }
		public void setFollowerThumbUrl(String followerThumbUrl) { this.followerThumbUrl = followerThumbUrl; }
		
	/**
	 * 팔로워 타입이 그룹이라면 그룹 설명
	 */
	private String description;
		public String getDescription() { return description; }
		public void setDescription(String description) { this.description = description; }
	
	/**
	 * 팔로워 타입이 그룹이라면 그룹에 속한 구성원 리스트
	 */
	private List<MemberVo> groupFollowerList;
		public List<MemberVo> getGroupFollowerList() { return groupFollowerList; }
		public void setGroupFollowerList(List<MemberVo> groupFollowerList) { this.groupFollowerList = groupFollowerList; }

	/**
	 * 팔로워가 멤버라면 해당 멤버가 속한 그룹 리스트
	 */
	private List<GroupVo> groupList;
		public List<GroupVo> getGroupList() { return groupList; }
		public void setGroupList(List<GroupVo> groupList) { this.groupList = groupList; }

	/**
	 * 팔로워 타입이 멤버라면 해당 맴버의 테넌트 매핑 정보
	 */
	private List<UserTenantMappingVo> followerMappingInfo;
		public List<UserTenantMappingVo> getFollowerMappingInfo() { return followerMappingInfo; }
		public void setFollowerMappingInfo(List<UserTenantMappingVo> followerMappingInfo) {this.followerMappingInfo = followerMappingInfo;}

}