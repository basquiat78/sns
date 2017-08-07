package org.uengine.sns.common.code;

/**
 * 
 * SNSCodeMaster
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class SNSCodeMaster {

	public static enum FEED_TYPE {GENERAL,NOTICE,TODO,SHARE,APPROVAL,COMMENT,POLL,BOARD,SHAREPOINT};
	
	public static enum FEED_CONTENT_TYPE {COMMENT, LINK, FILE, MEMO};
	
	public static enum ITEM_TYPE {GROUP, FEED};
	
	public static enum APPROVAL_STATUS {APPROVAL, REJECT};
	
	public static enum FOLLOWER_TYPE {GROUP, MEMBER, OTHER_MEMBER};
	
	public static enum FEED_SEARCH_TYPE {GROUP, MEMBER, GROUP_KNOWLEDGE, BOOKMARK, HASHTAG};
	
	public static enum REPOSITORY_TYPE {LOCAL, SHAREPOINT};
	
	public static enum NOTI_ATTR {ITEM_ID, ITEM_TITLE, ITEM_MSG, NOTI_TYPE, FROM_MEMBER_ID, NOTICE_LIST};
	
	public static enum GROUP_JOIN_STATUS {COMPLETE, REJECT};
	
	public final static String GROUP_TYPE_INNER = "0";
	
	public final static String GROUP_TYPE_OUTER = "1";
	
	public static enum GROUP_TYPE {EMPLOYEE, EXPERT};
	
	/**
	 * 인증받은 호스트 AUTH_HOST TYPE
	 * LOCAL/EXTERNAL/FEDERATION
	 */
	public static enum AUTH_HOST_TYPE {LOCAL, EXTERNAL, FEDERATION};
	
	public static enum WEBSOCKET_KEY {MODE, ITEM_TYPE, ITEM_ID};

	public static enum WEBSOCKET_MODE {NEWUSER, RELOAD};

	public static enum WEBSOCKET_TYPE {USER, ALL};

}