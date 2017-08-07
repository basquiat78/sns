package org.uengine.sns.notice;

/**
 * 
 * NoticeRestful
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class NoticeRestful {
	
	/**************************     Notice ULR        ***********************************/
	/** Notice 정보 */
	public static final String BASE_NOTI   					= "/notices";
	/** 그룹웨어 유저아이디에 의한 알림 목록 */
	public static final String NOTI_BYUSERID 				= "/notices/synckey";
	/** Notice 건수 */
	public static final String NOTICNT_CNT 					= "/notices/cnt";
	/** Notice 건수 */
	public static final String NOTICNT_CNT_USERID 			= "/notices/cnt/synckey";
	public static final String NOTICNT_CNT_USERID_REQUEST	= "/notices/cnt/requestuserid";
	public static final String NOTI_BY_REGDTTM 				= "/notices/regdttm";
	/** GNB 용 NOTICE 조회 */
	public static final String MEMBER_NOTI_LIST 			= "/notices/members/synckey";
	/** 전체 알림 목록 */
	public static final String NOTI_TOTAL_BYUSERID 			= "/notices/toatal";
	/** user noti alarm count */
	public static final String NOTI_USER_ALARM_CNT 			= "/notices/users/alarms/count";

}