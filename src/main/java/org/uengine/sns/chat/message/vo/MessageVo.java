package org.uengine.sns.chat.message.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.uengine.sns.chat.follower.vo.ChatFollowerVo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * MessageVo
 * @author uEngine-basquiat (uEngine Solutions)
 *  Mapping Table : ${default.table.prefix}CHAT_MESSAGE
 *
 */
@JsonInclude(Include.NON_NULL)
public class MessageVo implements Serializable {

	private static final long serialVersionUID = -3116995617452158520L;
	
	/**
	 * message id
	 */
	private long messageId;
		public long getMessageId() { return messageId; }
		public void setMessageId(long messageId) { this.messageId = messageId; }
	
	/** 
	 * Chatting Room Id
	 */
	private long roomId;
		public long getRoomId() { return roomId; }
		public void setRoomId(long roomId) { this.roomId = roomId; }

	/**
	 * user Id	
	 */
	private String userId;
		public String getUserId() { return userId; }
		public void setUserId(String userId) { this.userId = userId; }
		
	/**
	 * user name	
	 */
	private String userName;
		public String getUserName() { return userName; }
		public void setUserName(String userName) { this.userName = userName; }
		
	/**
	 * message	
	 */
	private String message;
		public String getMessage() { return message; }
		public void setMessage(String message) { this.message = message; }
	
	/**
	 * message type
	 */
	private String messageType;
		public String getMessageType() { return messageType; }
		public void setMessageType(String messageType) { this.messageType = messageType; }
		
	/**
	 * whisper id	
	 */
	private String whisperId;
		public String getWhisperId() { return whisperId; }
		public void setWhisperId(String whisperId) { this.whisperId = whisperId; }
	
	/**
	 * whisper name
	 */
	private String whisperName;
		public String getWhisperName() { return whisperName; }
		public void setWhisperName(String whisperName) { this.whisperName = whisperName; }

	/** 
	 * Room Follower
	 */
	private List<ChatFollowerVo> followerList;	
		public List<ChatFollowerVo> getFollowerList() { return followerList; }
		public void setFollowerList(List<ChatFollowerVo> followerList) { this.followerList = followerList; }
			
	/**
	 * reg date
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void setRegDttm(Date regDttm) { this.regDttm = regDttm; }

}