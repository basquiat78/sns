package org.uengine.sns.member;

public class MemberRestful {
	
	/**************************     Member URL        ***********************************/
	/** Member 정보 */
	public static final String BASE_MEMBER 						= "/members";
	/** Member 정보 */
	public static final String BASE_MEMBER_BY_EMAIL 			= "/members/email";
	/** 멘션 정보 */
	public static final String BASE_MENTIONS 					= "/members/mentions";
	/** Member 이미지 */
	public static final String MEMBER_PIC 						= "/members/imgs";
	/** Member synckey */
	public static final String MEMBER_SYNCKEY					= "/members/synckey";
	/** Member 정보 */
	public static final String BASE_MEMBER_WITHOUT_GROUPMEMBER	= "/members/withoutgroup";
	
	
	/**************************     Bookmark URL        ***********************************/
	/** 즐겨찾기 정보 */
	public static final String BASE_BOOKMARK 					= "/members/bookmarks";
	
	
	/**************************     MemberFeed URL        ***********************************/
	/** 멤버 Feed */
	public static final String BASE_MEMBER_FEED 				= "/members/feeds";
	
	
	/**************************     MemberWidget URL        ***********************************/
	/** 멤버 widget */
	public static final String BASE_MEMBER_WIDGET 				= "/members/widgets";
	/** 멤버 widget - 자기 그룹 */
	public static final String MEMBER_WIDGET_GROUP 				= "/members/widgets/groups" ;
	/** 멤버 widget - 추천그룹 */
	public static final String MEMBER_WIDGET_RECGROUP 			= "/members/widgets/recgroups" ;
	/** 멤버 widget - 신규그룹 */
	public static final String MEMBER_WIDGET_NEWGROUP 			= "/members/widgets/newgroups" ;
	/** 멤버 widget - 연락처(인터페이스: Lync, outlook) */
	public static final String MEMBER_WIDGET_ADDRESS 			= "/members/widgets/addresses" ;
	/** 멤버 widget - 최근 할동 */
	public static final String MEMBER_WIDGET_ACTIVITY 			= "/members/widgets/rctacts" ;
	/** 최근 활동 reqeust */
	public static final String MEMBER_WIDGET_ACTIVITY_REQUST	= "/members/widgets/rctacts/request";
	/** 멤버 widget - 할일 목록(자기 FEED기준으로 dueDate가 현재 날자 기준으로 가장 근접한 FEED 리스트 5건정도) */
	public static final String MEMBER_WIDGET_TODO 				= "/members/widgets/feeds/todo" ;
	/** 멤버 widget - 태그 클라우드 */
	public static final String MEMBER_WIDGET_TAGCLOUD 			= "/members/widgets/tagclouds" ;
	
	
	/**************************     MobileInfo URL        ***********************************/
	/** 모바일 정보 */
	public static final String BASE_MOBILEINFO 					= "/members/mobileinfos";

	
	/**************************     MemberMng URL        ***********************************/
	/** 멤버 설정 기본 URL */
	public static final String BASE_MEMBER_CONFIG 				= "/members/cfgs";
	/** 멤버 설정 기본설정 URL */
	public static final String MEMBER_BASE_CONFIG 				= "/members/cfgs/base";
	/** 멤버 가입그룹관리 URL */
	public static final String MEMBER_GROUP_CONFIG 				= "/members/cfgs/groups";
	/** 멤버 가입그룹관리 URL */
	public static final String MEMBER_INTERFACE_CONFIG 			= "/members/cfgs/interface";

}