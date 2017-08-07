package org.uengine.sns.notice.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.uengine.sns.feed.vo.FollowerVo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * NoticeVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}NOTI
 *
 */
@JsonInclude(Include.NON_NULL)
public class NoticeVo implements Serializable {

	private static final long serialVersionUID = -521404702370635082L;
	
	/**
	 * 알림 아이디
	 */
	private long noticeId;
		public long getNoticeId() { return noticeId; }
		public void setNoticeId(long noticeId) { this.noticeId = noticeId; }
		
	/**
	 * 아이템 타입
	 */
	private String itemType;
		public String getItemType() { return itemType; }
		public void setItemType(String itemType) { this.itemType = itemType; }

	/**
	 * 아이템 아이디
	 */
	private long itemId;
		public long getItemId() { return itemId; }
		public void setItemId(long itemId) { this.itemId = itemId; }
		
	/**
	 * 아이템 제목
	 */
	private String itemTitle;
		public String getItemTitle() { return itemTitle; }
		public void setItemTitle(String itemTitle) { this.itemTitle = itemTitle; }

	/**
	 * 아이템 메시지 (how, to 등등)
	 */
	private String itemMsg;
		public String getItemMsg() { return itemMsg; }
		public void setItemMsg(String itemMsg) { this.itemMsg = itemMsg; }
		
	/**
	 * 팔로워 아이디
	 */
	private long followerId;
		public long getFollowerId() { return followerId; }
		public void setFollowerId(long followerId) { this.followerId = followerId; }
		
	/**
	 * 팔로워 타입
	 */
	private String followerType;
		public String getFollowerType() { return followerType; }
		public void setFollowerType(String followerType) { this.followerType = followerType; }
		
	/**
	 * 알림 내용
	 */
	private String noticeContent;
		public String getNoticeContent() { return noticeContent; }
		public void setNoticeContent(String noticeContent) { this.noticeContent = noticeContent; }

	/**
	 * 알림 내용 (한국어)
	 */
	private String noticeContentKo;
		public String getNoticeContentKo() { return noticeContentKo; }
		public void setNoticeContentKo(String noticeContentKo) { this.noticeContentKo = noticeContentKo; }

	/**
	 * 알림 내용 (영어)
	 */
	private String noticeContentEn;
		public String getNoticeContentEn() { return noticeContentEn; }
		public void setNoticeContentEn(String noticeContentEn) { this.noticeContentEn = noticeContentEn; }
	
	/**
	 * 알림 내용 (중국어)
	 */
	private String noticeContentZh;
		public String getNoticeContentZh() { return noticeContentZh; }
		public void setNoticeContentZh(String noticeContentZh) { this.noticeContentZh = noticeContentZh; }
		
	/**
	 * 활동 타입
	 */
	private String actType;
		public String getActType() { return actType; }
		public void setActType(String actType) { this.actType = actType; }
		
	/**
	 * 등록일시
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void setRegDttm(Date regDttm) { this.regDttm = regDttm; }

	/**
	 * 읽음여부
	 */
	private Integer isRead;
		public Integer getIsRead() { return isRead; }
		public void setIsRead(Integer isRead) { this.isRead = isRead; }
	
	/**
	 * 알림 수신 사용자
	 */
	private long toMemberId;
		public long getToMemberId() { return toMemberId; }
		public void setToMemberId(long toMemberId) { this.toMemberId = toMemberId; }
		
	/**
	 * 수신자명
	 */
	private String toMemberName;
		public String getToMemberName() { return toMemberName; }
		public void setToMemberName(String toMemberName) { this.toMemberName = toMemberName; }

	/**
	 * 알림 발생 사용자
	 */
	private long fromMemberId;
		public long getFromMemberId() { return fromMemberId; }
		public void setFromMemberId(long fromMemberId) { this.fromMemberId = fromMemberId; }
		
	/**
	 * 알림 발생 사용자명
	 */
	private String fromMemberName;
		public String getFromMemberName() { return fromMemberName; }
		public void setFromMemberName(String fromMemberName) { this.fromMemberName = fromMemberName; }

	/**
	 * 읽지 않은 알림 카운트
	 */
	private int noticeCnt;
		public int getNoticeCnt() { return noticeCnt; }
		public void setNoticeCnt(int noticeCnt) { this.noticeCnt = noticeCnt; }

	/**
	 * 그룹웨어 유저아이디
	 */
	private String syncKey;
		public String getSyncKey() { return syncKey; }
		public void setSyncKey(String syncKey) { this.syncKey = syncKey; }
		
	/**
	 * group feed 여부	
	 */
	private String groupFeedYn = "N";
		public String getGroupFeedYn() { return groupFeedYn; }
		public void setGroupFeedYn(String groupFeedYn) { this.groupFeedYn = groupFeedYn; }

	/**
	 * noticeContentZh
	 */
	private String groupName;
		public String getGroupName() { return groupName; }
		public void setGroupName(String groupName) { this.groupName = groupName; }
		
	/**
	 * locale
	 */
	private Locale locale;
		public Locale getLocale() { return locale; }
		public void setLocale(Locale locale) { this.locale = locale; }

	/**
	 * 할일 여부
	 */
	private String toDoYn = "N";
		public String getToDoYn() { return toDoYn; }
		public void setToDoYn(String toDoYn) { this.toDoYn = toDoYn; }
	
	/**
	 * 알림 대상 아이디
	 */
	private long noticeMemberId = -999;
		public long getNoticeMemberId() { return noticeMemberId; }
		public void setNoticeMemberId(long noticeMemberId) { this.noticeMemberId = noticeMemberId; }

	/**
	 * 알림대상 리스트
	 */
	private List<FollowerVo> noticeMemberList;
		public List<FollowerVo> getNoticeMemberList() { return noticeMemberList; }
		public void setNoticeMemberList(List<FollowerVo> noticeMemberList) { this.noticeMemberList = noticeMemberList; }

	/**
	 * 자신 노티 포함여부
	 */
	private String noticeInSelfYn = "N";
		public String getNoticeInSelfYn() { return noticeInSelfYn; }
		public void setNoticeInSelfYn(String noticeInSelfYn) { this.noticeInSelfYn = noticeInSelfYn; }
		
	/**
	 * 전체 알림 카운트
	 */
	private int totalNoticeCnt;
		public int getTotalNoticeCnt() { return totalNoticeCnt; }
		public void setTotalNoticeCnt(int totalNoticeCnt) { this.totalNoticeCnt = totalNoticeCnt; }
	
	/**
	 * noti date string
	 */
	private String noticeDateStr;
		public String getNoticeDateStr() { return noticeDateStr; }
		public void setNoticeDateStr(String noticeDateStr) { this.noticeDateStr = noticeDateStr; }
		
	/**
	 * 알림 아이디
	 */
	private long noticeFeedId;
		public long getNoticeFeedId() { return noticeFeedId; }
		public void setNoticeFeedId(long noticeFeedId) { this.noticeFeedId = noticeFeedId; }

	/**
	 * 할일 여부
	 */
	private String pollYn = "N";
		public String getPollYn() { return pollYn; }
		public void setPollYn(String pollYn) { this.pollYn = pollYn; }
		
	@Override
	public String toString() {
	    return "NoticeVo [itemId=" + itemId + ", itemType=" + itemType + ", itemTitle=" + itemTitle + ", actType=" + actType + "]";
	}

}