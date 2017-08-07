package org.uengine.sns.noticeconfig.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * NoticeConfigVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}NOTICONFIG
 *
 */
@JsonInclude(Include.NON_NULL)
public class NoticeConfigVo implements Serializable {

	private static final long serialVersionUID = -949616835111502840L;
	
	/**
	* memberId
	*/
	private long memberId;
	    public long getMemberId() { return memberId; }
	    public void setMemberId(long memberId) { this.memberId = memberId; }
	    
	/**
	* memberName
	*/
	private String memberName;
	    public String getMemberName() { return memberName; }
	    public void setMemberName(String memberName) { this.memberName = memberName; }

	/**
	* syncKey
	*/
	private String syncKey;
	    public String getSyncKey() { return syncKey; }
	    public void setSyncKey(String syncKey) { this.syncKey = syncKey; }

	/**
	* 타인에 의한 그룹의 가입/탈퇴 수신여부
	*/
	private int isGroupAct;
	    public int getIsGroupAct() { return isGroupAct; }
	    public void setIsGroupAct(int isGroupAct) { this.isGroupAct = isGroupAct; }
	
	/**
	* 주제 추가/삭제에 대한 알림 여부
	*/
	private int isGroupNewFeed;
	    public int getIsGroupNewFeed() { return isGroupNewFeed; }
	    public void setIsGroupNewFeed(int isGroupNewFeed) { this.isGroupNewFeed = isGroupNewFeed; }
	
	/**
	* 내 피드에 타인이 팔로우
	*/
	private int isFeedFollow;
	    public int getIsFeedFollow() { return isFeedFollow; }
	    public void setIsFeedFollow(int isFeedFollow) { this.isFeedFollow = isFeedFollow; }
	
	/**
	* 인스턴스에 대한 댓글을 단 경우
	*/
	private int isFeedComment;
	    public int getIsFeedComment() { return isFeedComment; }
	    public void setIsFeedComment(int isFeedComment) { this.isFeedComment = isFeedComment; }
	
	/**
	* 인스턴스에 대한 좋아요 단 경우
	*/
	private int isFeedLikeIt;
	    public int getIsFeedLikeIt() { return isFeedLikeIt; }
	    public void setIsFeedLikeIt(int isFeedLikeIt) { this.isFeedLikeIt = isFeedLikeIt; }
	
	/**
	* 북마크한 항목에 대한 댓글 알림 여부
	*/
	private int isBookmarkComment;
	    public int getIsBookmarkComment() { return isBookmarkComment; }
	    public void setIsBookmarkComment(int isBookmarkComment) { this.isBookmarkComment = isBookmarkComment; }
	
	/**
	* 타인에 의해 피드에 팔로우된 경우
	*/
	private int isFeedFollowed;
	    public int getIsFeedFollowed() { return isFeedFollowed; }
	    public void setIsFeedFollowed(int isFeedFollowed) { this.isFeedFollowed = isFeedFollowed; }
	
	/**
	* 일정 도래 알림
	*/
	private int isToDoComing;
	    public int getIsToDoComing() { return isToDoComing; }
	    public void setIsToDoComing(int isToDoComing) { this.isToDoComing = isToDoComing; }
	
	/**
	* 전자결제 피드 알림
	*/
	private int isApproval;
	    public int getIsApproval() { return isApproval; }
	    public void setIsApproval(int isApproval) { this.isApproval = isApproval; }
	    
	/**
	 * 팔로워 타입
	 */
	private String followerType;
		public String getFollowerType() { return followerType; }
		public void setFollowerType(String followerType) { this.followerType = followerType; }
		
	/**
	 * 엔터 여부	
	 */
	private int isEnter;
		public int getIsEnter() { return isEnter; }
		public void setIsEnter(int isEnter) { this.isEnter = isEnter; }
	
	/**
	* api 일정 실행여부
	*/
	private String apiNoticeExcYn = "Y";
		public String getApiNoticeExcYn() { return apiNoticeExcYn; }
		public void setApiNoticeExcYn(String apiNoticeExcYn) { this.apiNoticeExcYn = apiNoticeExcYn; }

}