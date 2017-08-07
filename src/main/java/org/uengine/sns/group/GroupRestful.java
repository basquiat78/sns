package org.uengine.sns.group;

public class GroupRestful {
	
	/**************************     Group URL        ***********************************/
	/** Group 정보 */
	public static final String BASE_GROUP 						= "/groups";
	public static final String BASE_GROUP_SEARCH 				= "/groups/search";
	/** 나의 Group 정보*/
	public static final String BASE_GROUP_MYLIST 				= "/groups/mylist";
	/** Group 리스트 정보 */
	public static final String BASE_GROUP_LIST 					= "/groups/lists";
	/** Group 이미지 */
	public static final String GROUP_PIC 						= "/groups/imgs";
	/** Group 임시 이미지 */
	public static final String GROUP_PIC_TEMP 					= "/groups/imgs/temp";
	/** Group 이름 체크 */
	public static final String BASE_GROUP_NAME 					= "/groups/name";
	/** Group 리스트 정보 (그룹웨어 userid) */
	public static final String GROUP_LIST_SYNCKEY 				= "/groups/synckey";
	
	
	/**************************     KnowledgeFeed URL        ***********************************/
	/** Group Knowldge 정보 */
	public static final String BASE_KNWLDG_URL 					= "/groups/knwldgs";
	
	
	/**************************     GroupFollower URL        ***********************************/
	/** Group Follower 정보 */
	public static final String BASE_GFOLLOWER_URL 		 		= "/groups/followers";
	/** 재가입 */
	public static final String BASE_GFOLLOWER_URL_REJOIN		= "/groups/followers/rejoin";
	/** Group Follower 정보 - 모든상태조회 */
	public static final String BASE_GFOLLOWER_URL_FOR_GROUPINFO = "/groups/allfollowers";
	/** My Group 에서 접근 일시 수정  */
	public static final String BASE_GFOLLOWER_ACCESS	 		= "/groups/followers/access";
	/** with list */
	public static final String BASE_GFOLLOWER_URL_WITHLIST		= "/groups/followers/withlist";
	/** 그룹 팔로워 federation */
	public static final String GFOLLOWER_FEDERATION_URL 		= "/groups/followers/federation";
	/** Group Follower 탈퇴 */
	public static final String GFOLLOWER_BYSELF_URL 	 		= "/groups/followers/byself";
	/** Group Follower 관리자에 의한 제거 */
	public static final String GFOLLOWER_BYMNG_URL 	 			= "/groups/followers/bymng";
	/** Group Follower 관리자에 의한 이메일초대 */
	public static final String GFOLLOWER_INVITE_WITHEMAIL		= "/groups/followers/withemail";
	/** Group Follower feed 다운로드 */
	public static final String GFOLLOWER_FEED_DOWNLOAD 	 		= "/groups/followers/feeddownload";
	
	
	/**************************     GroupFeed URL        ***********************************/
	/** 그룹 Feed */
	public static final String BASE_GROUP_FEED 					= "/groups/feeds";
	
	
	/**************************     GroupWidget URL        ***********************************/
	/** 멤버 widget */
	public static final String BASE_GROUP_WIDGET 				= "/widgets";
	/** 그룹 widget - 자기 그룹 */
	public static final String GROUP_WIDGET_GROUP 				= "/widgets/groups" ;
	/** 그룹 widget - 추천그룹 */
	public static final String GROUP_WIDGET_RECGROUP 			= "/widgets/recgroups" ;
	/** 그룹 widget - 신규그룹 */
	public static final String GROUP_WIDGET_NEWGROUP 			= "/widgets/newgroups" ;
	/** 그룹 widget - 신규그룹 */
	public static final String GROUP_WIDGET_LIST2 				= "/widgets/groups/conditions" ;
	/** 그룹 widget - 그룹 멤버 */
	public static final String GROUP_WIDGET_MEMBER 				= "/widgets/groups/members";
	/** 그룹 widget - 그룹 멤버 승인/거부 */
	public static final String GROUP_WIDGET_MEMBER_OK 			= "/widgets/groups/members/ok";
	/** 그룹 widget - 최근 할동 */
	public static final String GROUP_WIDGET_ACTIVITY 			= "/widgets/groups/activity" ;
	/** 그룹 widget - 할일 목록(자기 FEED기준으로 dueDate가 현재 날자 기준으로 가장 근접한 FEED 리스트 5건정도) */
	public static final String GROUP_WIDGET_TODO 				= "/widgets/groups/todo" ;
	/** 그룹 widget - 태그 클라우드 */
	public static final String GROUP_WIDGET_TAGCLOUD 			= "/widgets/groups/tagclouds" ;

}