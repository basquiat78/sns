package org.uengine.sns.feed;

/**
 * 
 * FeedRestful
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class FeedRestful {
	
	/**************************     FEED URL        ***********************************/
	/** 기본 FEED URL */
	public static final String BASE_FEED 							= "/feeds";
	/** feed by id */
	public static final String MULTI_FEEDS 							= "/feeds/{id}";
	/** FEED 등록(일반) */
	public static final String FEED_TYPE_GENERAL 					= "/feeds/general";
	/** FEED 등록(공지사항) */
	public static final String FEED_TYPE_NOTICE 					= "/feeds/notice";
	/** FEED 등록(할일) */
	public static final String FEED_TYPE_TODO 						= "/feeds/todo";
	/** FEED 결재 목록 */
	public static final String FEED_TYPE_APPROVAL 					= "/feeds/approval";
	/** BOARD 목록*/
	public static final String FEED_TYPE_BOARD 						= "/feeds/boards";
	/** FEED 등록(공유) */
	public static final String FEED_TYPE_SHARE 						= "/feeds/share";
	/** FEED 등록(댓글) */
	public static final String FEED_TYPE_COMMENT 					= "/feeds/comments";
	/** FEED 원 글과 댓글을 함께 조회(댓글 갯수를 조정할 수 있다.) */
	public static final String FEED_AND_COMMENT 					= "/feeds/withcomments";
	/** FEED 이전 댓글 리스트 */
	public static final String FEED_BEFORE_COMMENT 					= "/feeds/bfcmts";
	/** FEED regDttm을 중심으로 코멘트 가져오기*/
	public static final String FEED_COMMENT_BY_REGDTTM 				= "/feeds/regdttm";
	/** FEED Federation */
	public static final String FEED_FEDERATION 						= "/feeds/federation";
	/** FEED 시스템 피드- 전체 리스트 */
	public static final String BASE_FEED_SYSTEM 					= "/feeds/system";
	/** FEED 피드- 칼렌다 리스트 */
	public static final String BASE_FEED_CALENDAR 					= "/feeds/calendar";
	/** FEED 피드- 칼렌다 리스트 */
	public static final String BASE_FEED_CALENDAR_LIST 				= "/feeds/calendar/list";
	
	/**************************     FEED INTERFACE URL        ***********************************/
	/** FEED 등록(BASE 외부연동) */
	public static final String FEED_TYPE_INTERFACE 					= "/feeds/interface";
	/** FEED 등록(외부연동 - 댓글 등록) */
	public static final String FEED_INTERFACE_COMMENT 				= "/feeds/interface/comments";
	/** FEED 등록(외부연동 - 전자결재) */
	public static final String FEED_INTERFACE_APPROVAL 				= "/feeds/interface/approval";
	/** FEED 등록(외부연동 - 전자결재완료) */
	public static final String FEED_INTERFACE_APPROVAL_COMPLETE 	= "/feeds/interface/approval/complete";
	/** FEED 등록(외부연동 - 게시판) */
	public static final String FEED_INTERFACE_BOARD 				= "/feeds/interface/boards";
	/** FEED 등록(외부연동 - 쉐어포인트) */
	public static final String FEED_INTERFACE_SHAREPOINT 			= "/feeds/interface/sharepoint";
	/** FEED 피드- 외부 할일 등록 */
	public static final String BASE_FEED_TODO_EXTERNAL 				= "/feeds/todo/external";
	
	
	/**************************     FOLLOWER URL        ***********************************/
	/** 기본 FOLLOWER URL */
	public static final String BASE_FOLLOWER 						= "/feeds/followers";
	/** RESTFUL FOLLOWER URL*/
	public static final String FOLLOWER_FEDERATION 					= "/feeds/followers/federation";
	
	
	/**************************     Mentions URL        ***********************************/
	/** autocomplete를 위한 URL */
	public static final String BASE_AUTO_FOLLOWER 					= "/feeds/followers/autofollowers";
	public static final String BASE_AUTO_FOLLOWER_ALL 				= "/feeds/followers/autofollowers/all";
	
	
	/**************************     LIKEIT URL        ***********************************/
	/** 기본 LIKEIT URL */
	public static final String BASE_LIKEIT 							= "/feeds/likeits";
	
	
	/**************************     TAG URL        ***********************************/
	/** 기본 LIKEIT URL */
	public static final String BASE_TAG 							= "/feeds/tags";
	/** 기본 LIKEIT URL */
	public static final String TAG_COUNT 							= "/feeds/tags/cnt";
	
	
	/**************************     TO_DO URL        ***********************************/
	/** 할일 FEED 완료처리 URL */
	public static final String TODO_COMPLETE 						= "/feeds/todo/complete";
	/** 할일 FEED 미완료처리 URL */
	public static final String TODO_INCOMPLETE 						= "/feeds/todo/incomplete";
	/** 할일 FEED 만기일자 변경 URL */
	public static final String SET_DUEDATE 							= "/feeds/todo/duedate";
	

	/**************************     Poll URL        ***********************************/
	/** 설문 URL */
	public static final String BASE_POLL 							= "/feeds/polls";
	/** 설문 결과 URL */
	public static final String BASE_POLL_RESULT 					= "/feeds/polls/results";
	public static final String POLL_LIST 							= "/feeds/polls/list";
	

	/**************************     Feed File URL        ***********************************/
	/** 피드 파일 URL */
	public static final String BASE_PERSON_FILE 					= "/feeds/files/person";
	/** 피드 파일 URL */
	public static final String BASE_GROUP_FILE 						= "/feeds/files/group";
	/** 피드 다운로드 URL **/
	public static final String FEED_DOWNLOAD_URL 					= "/feeds/feeddownload";

}