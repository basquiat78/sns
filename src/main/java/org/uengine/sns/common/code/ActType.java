package org.uengine.sns.common.code;

/**
 * 
 * ActType
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public enum ActType {

	GROUP_REG("noti.group.reg"),
	GROUP_DEL("noti.group.del"), 
	GROUP_FOLLOWER_REG("noti.group.user.add"), 
	GROUP_FOLLOWER_DEL("noti.group.user.del"),   
	GROUP_FOLLOWER_FORCEDEL("noti.group.user.forcedel"),  
	GROUP_KNWLDG_REG("noti.knwldg.reg"),
	GROUP_KNWLDG_DEL("noti."),
	GROUP_ADMIN_REG("noti."), 
	GROUP_USER_REG("noti."), 
	GROUP_ADMIN_MEM_REG("noti."), 
	GROUP_ADMIN_NEW_MEM_REG("noti."), 
	GROUP_ADMIN_APPROVAL_Y("noti."), 
	GROUP_ADMIN_APPROVAL_N("noti."),  
	GROUP_ADMIN_MEM_DEL("noti."),
	GROUP_ADMIN_NOTI_REG("noti."), 
	GROUP_FEED_REG("noti.group.feed.new"), 
	GROUP_POLL_REG("noti.group.poll.reg"), 
	GROUP_TODO_REG("noti.group.todo.reg"), 
	POLL_REG("noti.poll.reg"),
	POLL_DEL("noti.poll.del"), 
	FEED_REG("noti.feed.reg"),
	FEED_DEL("noti.feed.del"), 
	FEED_COMMENT_REG("noti.comment.reg"), 
	FEED_FOLLOWER_REG("noti.feed.follow"),
	FEED_FOLLOWERED_REG("noti.feed.followed"),
	TODO_REG("noti.todo.reg"),
	TODO_FOLLOW_REG("noti."), 
	TODO_CNCL("noti."), 
	TODO_COMPLETE("noti.todo.complete"), 
	TODO_DEL("noti.todo.del"),
	TODO_CHANGE("noti.todo.change"), 
	TODO_FLLOWER_END_DAY_ONE("noti."), 
	OFW_FEED_REG("noti."), 
	OFW_FOLLOWER_FEED_REG("noti."),
	OFW_LIKEIT_REG("noti.feed.likeit"),  
	OFW_LIKEIT_DEL("noti."), 
	OFW_TAG_REG("noti."), 
	OFW_TAG_DEL("noti."), 
	OFW_FOLLOWER_REG("noti."), 
	SYSTEM_ALL_NOTI_REG("noti."), 
	SNS_ALL_NOTI_REG("noti."), 
	BOARD_FEED_REG("noti."), 
	APPROVAL_REG("noti.approval.reg"), 
	APPROVAL_Y("noti."), 
	APPROVAL_N("noti."),
	NOTICE_REG("noti.notice.reg"),
	TOMORROW_TODO("noti.todo.tomorrowtodo")
	;

	/**
	 * Constructor
	 * @param messageCode
	 */
	ActType(String messageCode) {
		this.messageCode = messageCode;
	}
	
	private String messageCode;
		public String getMessageCode() { return messageCode; }

}