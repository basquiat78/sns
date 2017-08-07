package org.uengine.sns.feed.vo;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.uengine.sns.group.vo.KnowledgeFeedVo;
import org.uengine.sns.member.vo.BookmarkVo;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.tenant.vo.TenantVo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * FeedVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}FEED
 *
 */
@JsonInclude(Include.NON_NULL)
public class FeedVo implements Serializable {
	
	private static final long serialVersionUID = -3589352387613187420L;
	
	/**
	 * Feed Id	
	 */
	private long feedId;
		public long getFeedId() { return feedId; }
		public void setFeedId(long feedId) { this.feedId = feedId; }
	
	/**
	 * 피드 타입(일반글, 댓글, 공지사항, 할일, 공유, 결재)
	 */
	private String feedType;
		public String getFeedType() { return feedType; }
		public void setFeedType(String feedType) { this.feedType = feedType; }

	/**
	 * 피드 제목
	 */
	private String feedTitle;
		public String getFeedTitle() { return feedTitle; }
		public void setFeedTitle(String feedTitle) { this.feedTitle = feedTitle; }
		
	/**
	 * 피드 컨텐트 타입(comment, link, file, memo)
	 */
	private String contentsType;
		public String getContentsType() { return contentsType; }
		public void setContentsType(String contentsType) { this.contentsType = contentsType; }
		
	/**
	 * 결재 상태(null, ready, complete)
	 */
	private String approvalStatus;
		public String getApprovalStatus() { return approvalStatus; }
		public void setApprovalStatus(String approvalStatus) { this.approvalStatus = approvalStatus; }
	
	/**
	 * 결재 의견 - 댓글 피드로 등록시 피드 타이틀로 사용할 정보
	 */
	private String approvalComment;
		public String getApprovalComment() { return approvalComment; }
		public void setApprovalComment(String approvalComment) {
			this.approvalComment = approvalComment; 
			setFeedTitle(approvalComment);
		}

	/**
	 * 작성자 ID
	 */	
	private long regMemberId;
		public long getRegMemberId() { return regMemberId; }
		public void setRegMemberId(long regMemberId) { this.regMemberId = regMemberId; }

	/**
	 * 등록일시
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void setRegDttm(Date regDttm) { this.regDttm = regDttm; }
		
	/**
	 * 부모 피드 아이디
	 */
	private long pFeedId;
		public long getpFeedId() { return pFeedId; }
		public void setpFeedId(long pFeedId) { this.pFeedId = pFeedId; }
	
	/**
	 * 댓글 타겟 멤버
	 */
	private long pMemberId;
		public long getpMemberId() { return pMemberId; }
		public void setpMemberId(long pMemberId) { this.pMemberId = pMemberId; }

	/**
	 * 댓글 타겟 멤버 이름
	 */
	private String pMemberName;
		public String getpMemberName() { return pMemberName; }
		public void setpMemberName(String pMemberName) { this.pMemberName = pMemberName; }

	/**
	 * 댓글 최종 첫번째 피드 아이디
	 */
	private long cmtLstFstFeedId;
		public long getCmtLstFstFeedId() { return cmtLstFstFeedId; }
		public void setCmtLstFstFeedId(long cmtLstFstFeedId) { this.cmtLstFstFeedId = cmtLstFstFeedId; }
		
	/**
	 * 댓글 최종 두번째 피드 아이디
	 */
	private long cmtLstSecFeedId;
		public long getCmtLstSecFeedId() { return cmtLstSecFeedId; }
		public void setCmtLstSecFeedId(long cmtLstSecFeedId) { this.cmtLstSecFeedId = cmtLstSecFeedId; }
		
	/**
	 * 댓글 컴포넌트(이전 댓글, 이후 댓글)
	 */
	private int cmtCmpntType;
		public int getCmtCmpntType() { return cmtCmpntType; }
		public void setCmtCmpntType(int cmtCmpntType) { this.cmtCmpntType = cmtCmpntType; }

	/**
	 * 댓글 최종 등록일시
	 */
	private Date cmtLstRegDttm;
		public Date getCmtLstRegDttm() { return cmtLstRegDttm; }
		public void setCmtLstRegDttm(Date cmtLstRegDttm) { this.cmtLstRegDttm = cmtLstRegDttm; }
		
	/**
	 * 피드 컨텐츠
	 */
	private String feedContents;
		public String getFeedContents() { return feedContents; }
		public void setFeedContents(String feedContents) { this.feedContents = feedContents; }
		
	/**
	 * 게시일자
	 */
	private String noticeStartDate;
		public String getNoticeStartDate() { return noticeStartDate; }
		public void setNoticeStartDate(String noticeStartDate) { this.noticeStartDate = noticeStartDate; }
	
	/**
	 * 만기일자
	 */
	private String dueDate;
		public String getDueDate() { return dueDate; }
		public void setDueDate(String dueDate) { this.dueDate = dueDate; }
	
	/**
	 * 완료일자
	 */
	private String endDate;
		public String getEndDate() { return endDate; }
		public void setEndDate(String endDate) { this.endDate = endDate; }
		
	/**
	 * 완료처리자 ID
	 */
	private long compMemberId;
		public long getCompMemberId() { return compMemberId; }
		public void setCompMemberId(long compMemberId) { this.compMemberId = compMemberId; }

	/**
	 * 좋아요 카운트
	 */
	private int	likeItCnt;
		public int getLikeItCnt() { return likeItCnt; }
		public void setLikeItCnt(int likeItCnt) { this.likeItCnt = likeItCnt; }
		
	/**
	 * 좋아요 상태(자신)
	 */
	private int	likeIt;
		public int getLikeIt() { return likeIt; }
		public void setLikeIt(int likeIt) { this.likeIt = likeIt; }

	/**
	 * 공개 여부
	 */
	private int isPublic;
		public int getIsPublic() { return isPublic; }
		public void setIsPublic(int isPublic) { this.isPublic = isPublic; }
	
	/**
	 * 자신이 누른 좋아요 유무 체크
	 */
	private int	likeItByMe;
		public int getLikeItByMe() { return likeItByMe;	}
		public void setLikeItByMe(int likeItByMe) {	this.likeItByMe = likeItByMe; }

	/** 
	 * 해당 피드의 지식선택 카운트 
	 */
	private int knwldgCnt;
		public int getKnwldgCnt() { return knwldgCnt; }
		public void setKnwldgCnt(int knwldgCnt) { this.knwldgCnt = knwldgCnt; }
	
	/**
	 * 해당 피드의 지식 등록 여부 
	 */
	private KnowledgeFeedVo	kldgVo;
		public KnowledgeFeedVo getKldgVo() { return kldgVo;	}
		public void setKldgVo(KnowledgeFeedVo kldgVo) {	this.kldgVo = kldgVo; }

	/**
	 * file count
	 */
	private int fileCnt;
		public int getFileCnt() { return fileCnt; }
		public void setFileCnt(int fileCnt) {this.fileCnt = fileCnt; }
	
	/**
	 * 피드 삭제 여부
	 */
	private int	isDeleted;
		public int getIsDeleted() { return isDeleted; }
		public void setIsDeleted(int isDeleted) { this.isDeleted = isDeleted; }
	
	/**
	 *  댓글 리스트
	 */
	private List<FeedVo> commentFeedList;
		public List<FeedVo> getCommentFeedList() { return commentFeedList; }
		public void setCommentFeedList(List<FeedVo> commentFeedList) { this.commentFeedList = commentFeedList; }

	/**
	 * 팔로워 수
	 */
	private int followerCnt;
		public int getFollowerCnt() { return followerCnt; }
		public void setFollowerCnt(int followerCnt) { this.followerCnt = followerCnt; }
		
	/**
	 * 팔로워 리스트
	 */
	private List<FollowerVo> feedFollowerList;
		public List<FollowerVo> getFeedFollowerList() { return feedFollowerList; }
		public void setFeedFollowerList(List<FollowerVo> feedFollowerList) { this.feedFollowerList = feedFollowerList; }

	/**
	 * 태그 수
	 */
	private int tagCnt;
		public int getTagCnt() { return tagCnt; }
		public void setTagCnt(int tagCnt) { this.tagCnt = tagCnt; }
	
	/**
	 * 태그 리스트
	 */
	private List<TagVo> feedTagList;
		public List<TagVo> getFeedTagList() { return feedTagList; }
		public void setFeedTagList(List<TagVo> feedTagList) {this.feedTagList = feedTagList;}
		
	/**
	 * 좋아요 리스트
	 */	
	private List<LikeItVo> likeItList;
		public List<LikeItVo> getLikeItList() { return likeItList; }
		public void setLikeItList(List<LikeItVo> likeItList) { this.likeItList = likeItList; }

	/**
	 * 첨부파일 리스트
	 */
	private List<FeedFileVo> fileList;
		public List<FeedFileVo> getFileList() { return fileList; }
		public void setFileList(List<FeedFileVo> fileList) { this.fileList = fileList; }

	/**
	 * 피드에 소속된 즐겨찾기 정보 리스트
	 */
	private List<BookmarkVo> bookmarkList;
		public List<BookmarkVo> getBookmarkList() { return bookmarkList; }
		public void setBookmarkList(List<BookmarkVo> bookmarkList) { this.bookmarkList = bookmarkList; }

	/**
	 * 피드를 등록한 멤버 정보
	 */
	private MemberVo memberVo;
		public MemberVo getMemberVo() { return memberVo; }
		public void setMemberVo(MemberVo memberVo) { this.memberVo = memberVo; }
	
	/**
	 * 댓글 카운트
	 */
	private int	cmtCnt;
		public int getCmtCnt() { return cmtCnt; }
		public void setCmtCnt(int cmtCnt) { this.cmtCnt = cmtCnt; }

	/**
	 * 공유 카운트
	 */
	private int	shareCnt;
		public int getShareCnt() { return shareCnt; }
		public void setShareCnt(int shareCnt) { this.shareCnt = shareCnt; }
		
	/**
	 * 설문 리스트
	 */
	private List<PollVo> feedPollList;
		public List<PollVo> getFeedPollList() { return feedPollList; }
		public void setFeedPollList(List<PollVo> feedPollList) { this.feedPollList = feedPollList; }
	
	/**
	 * 설문 결과 리스트
	 */
	private List<PollVo> resultFeedPollList;
		public List<PollVo> getResultFeedPollList() { return resultFeedPollList; }
		public void setResultFeedPollList(List<PollVo> resultFeedPollList) { this.resultFeedPollList = resultFeedPollList;	}

	/**
	 * 테넌트 ID
	 */
	private long tenantId;
		public long getTenantId() { return tenantId; }
		public void setTenantId(long tenantId) { this.tenantId = tenantId; }

	/**
	 * 테넌트 피드 ID
	 */
	private long tenantFeedId;
		public long getTenantFeedId() { return tenantFeedId; }
		public void setTenantFeedId(long tenantFeedId) { this.tenantFeedId = tenantFeedId; }
	
	/**
	 * 테넌트 VO
	 */
	private TenantVo tenantVo;
		public TenantVo getTenantVo() { return tenantVo; }
		public void setTenantVo(TenantVo tenantVo) { this.tenantVo = tenantVo; }
	
	/**
	 * Todo Type  1:내할일 0:받은할일
	 */
	private int toDoType;
		public int getToDoType() { return toDoType; }
		public void setToDoType(int toDoType) { this.toDoType = toDoType; }
	
	/**
	 * 연동 아이디(결재: 결재taskId, 게시판: 게시물 ID, 쉐어포인트: 쉐어포인트 ID)
	 */
	private String infId;
		public String getInfId() { return infId; }
		public void setInfId(String infId) { this.infId = infId; }

	/**
	 * 연동 링크(쉐어포인트, 결재, 게시판)
	 */
	private String infLink;
		public String getInfLink() { return infLink; }
		public void setInfLink(String infLink) { this.infLink = infLink; }
		
	/**
	 * 동기화 키
	 */	
	private String feedMemberSyncKey;
		public String getFeedMemberSyncKey() { return feedMemberSyncKey; }
		public void setFeedMemberSyncKey(String feedMemberSyncKey) { this.feedMemberSyncKey = feedMemberSyncKey; }	
		
	/**
	 * 세션 멤버 아이디
	 */	
	private long sessionMemberId;
		public long getSessionMemberId() { return sessionMemberId; }
		public void setSessionMemberId(long sessionMemberId) { this.sessionMemberId = sessionMemberId; }
	
	/** 현재 세션 멤버 아이디의 팔로우 여부 */
	private int isFollow;
		public int getIsFollow() { return isFollow; }
		public void setIsFollow(int isFollow) { this.isFollow = isFollow; }

	/**
	 * 현재 세션 멤버 아이디의 팔로우 여부 true/false반환
	 * @return String
	 */
	public String getIsFollowStr() {
		String isFollowStr = "false";
		if(this.isFollow == 1) {
			isFollowStr = "true";
		}
		return isFollowStr;
	}
		
	/**
	 * delay
	 */
	private int isDelay;
		public int getIsDelay() {
			if(getDueDate() == null || "".equals(getDueDate())){
				isDelay = 0;
			} else {
				SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
				try {
					Date beginDate = formatter.parse(getDueDate());
					Date compareDate = new Date();
					String strCompareDate = formatter.format(compareDate);
					Date toDate = formatter.parse(strCompareDate);
					
					long diff = toDate.getTime() - beginDate.getTime();
					if(diff > 0)
						isDelay = 1;
					else
						isDelay = 0;
					
				} catch (ParseException e) {
					isDelay = 0;
					e.printStackTrace();
				}
			}
			
			return isDelay;
		}
	
	/**
	 * 할일 외부에서 API 호출여부
	 */	
	private boolean isToDoExternal = false;
		public boolean isToDoExternal() { return isToDoExternal; }
		public void setToDoExternal(boolean isToDoExternal) { this.isToDoExternal = isToDoExternal; }
		
	/**
	 * 할일 외부테이블 taskId
	 */
	private long extTaskId;
		public long getExtTaskId() { return extTaskId; }
		public void setExtTaskId(long extTaskId) { this.extTaskId = extTaskId; }
		
	/**
	 * 할일 외부테이블 taskId
	 */
	private long snsGroupId;
		public long getSnsGroupId() { return snsGroupId; }
		public void setSnsGroupId(long snsGroupId) { this.snsGroupId = snsGroupId; }
	
	/**
	 * 할일 외부테이블 crudType
	 */
	private char crudType;	
		public char getCrudType() { return crudType; }
		public void setCrudType(char crudType) { this.crudType = crudType; }

	/**
	 * embeddedComment 에서 등록여부
	 */
	private String fromServer;
		public String getFromServer() { return fromServer; }
		public void setFromServer(String fromServer) { this.fromServer = fromServer; }

	/**
	 * feedPerSequence	
	 */
	public int feedPerSeq;
		public int getFeedPerSeq() { return feedPerSeq; }
		public void setFeedPerSeq(int feedPerSeq) { this.feedPerSeq = feedPerSeq; }
	
	/**
	 * 알림 noti 실행여부
	 */
	private boolean isNoticeExc = true;
		public boolean isNoticeExc() { return isNoticeExc; }
		public void setNoticeExc(boolean isNoticeExc) { this.isNoticeExc = isNoticeExc; }

}