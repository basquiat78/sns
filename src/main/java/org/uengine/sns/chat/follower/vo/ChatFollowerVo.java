package org.uengine.sns.chat.follower.vo;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * ChatFollowerVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}CHAT_FOLLOWER
 *
 */
@JsonInclude(Include.NON_NULL)
public class ChatFollowerVo implements Serializable {

	private static final long serialVersionUID = -1404547195510455121L;
	
	/** 
	 * Chatting Room Id
	 */
	private long roomId;
		public long getRoomId() { return roomId; }
		public void setRoomId(long roomId) { this.roomId = roomId; }
		
	/**
	 * Follower Id	
	 */
	private String followerId;
		public String getFollowerId() { return followerId; }
		public void setFollowerId(String followerId) { this.followerId = followerId; }
		
	/**
	 * Follwer Name	
	 */
	private String followerName;
		public String getFollowerName() { return followerName; }
		public void setFollowerName(String followerName) { this.followerName = followerName; }
	
	/**
	 * reg date
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void setRegDttm(Date regDttm) { this.regDttm = regDttm; }	

}