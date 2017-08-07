package org.uengine.sns.feed.vo;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * FollowerVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}FOLLOWER
 *
 */
@JsonInclude(Include.NON_NULL)
public class FollowerVo implements Serializable {
	
	private static final long serialVersionUID = 7035698958538076935L;
	
	/**
	 * syncKey
	 */
	private String syncKey;
		public String getSyncKey() { return syncKey; }
		public void setSyncKey(String syncKey) { this.syncKey = syncKey; }

	/** 
	 * 아이템 아이디(Feed id, Member id, Group Id) 
	 */
	private long itemId;
		public long getItemId() { return itemId; }
		public void setItemId(long itemId) { this.itemId = itemId; }
		
	/** 
	 * feed, member, group 
	 */
	private String itemType;
		public String getItemType() { return itemType; }
		public void setItemType(String itemType) { this.itemType = itemType; }
		
	/** 
	 * 팔로워 아이디(Member id, Group id) 
	 */
	private long followerId;
		public long getFollowerId() { return followerId; }
		public void setFollowerId(long followerId) { this.followerId = followerId; }
	
	/** 
	 * member, group 
	 */
	private String followerType;
		public String getFollowerType() { return followerType; }
		public void setFollowerType(String followerType) { this.followerType = followerType; }
		
	/** 
	 * member name, group name 
	 */
	private String followerName;
		public String getFollowerName() { return followerName; }
		public void setFollowerName(String followerName) { this.followerName = followerName; }
	
	/** 
	 * member name, group name 
	 */
	private String followerPosition;
		public String getFollowerPosition() { return followerPosition; }
		public void setFollowerPosition(String followerPosition) { this.followerPosition = followerPosition; }

	/** 
	 * 팔로워 추가시 멤버의 경우 이메일 체크를 위한 변수 
	 */
	private String followerEmail;
		public String getFollowerEmail() { return followerEmail; }
		public void setFollowerEmail(String followerEmail) { this.followerEmail = followerEmail; }

	/** 
	 * member thumb img url, group img url
	 */
	private String followerImgUrl;
		public String getFollowerImgUrl() { return followerImgUrl; }
		public void setFollowerImgUrl(String followerImgUrl) { this.followerImgUrl = followerImgUrl; }
		
	/**
	 * follower Description;
	 */
	private String followerDescription;
		public String getFollowerDescription() { return followerDescription; }
		public void setFollowerDescription(String followerDescription) { this.followerDescription = followerDescription; }

	/** 
	 * 등록일 
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void setRegDttm(Date regDttm) { this.regDttm = regDttm; }
		
	/**
	 * 읽음 여부
	 */
	private int isRead;
		public int getIsRead() { return isRead; }
		public void setIsRead(int isRead) { this.isRead = isRead; }
	
	/**
	 * 등록자 아이디
	 */
	private long regMemberId;
		public long getRegMemberId() { return regMemberId; }
		public void setRegMemberId(long regMemberId) { this.regMemberId = regMemberId; }
		
	/**
	 * 동기화 키
	 */	
	private String followerMemberSyncKey;
		public String getFollowerMemberSyncKey() { return followerMemberSyncKey; }
		public void setFollowerMemberSyncKey(String followerMemberSyncKey) { this.followerMemberSyncKey = followerMemberSyncKey; }
	
	/**
	 * 공개여부
	 */
	private int isPublic;
		public int getIsPublic() { return isPublic; }
		public void setIsPublic(int isPublic) { this.isPublic = isPublic; }

}