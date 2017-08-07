package org.uengine.sns.chat.room.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.uengine.sns.chat.follower.vo.ChatFollowerVo;
import org.uengine.sns.chat.message.vo.MessageReadVo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * RoomVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}CHAT_ROOM
 *
 */
@JsonInclude(Include.NON_NULL)
public class RoomVo implements Serializable {
			
	private static final long serialVersionUID = -4622810513391110315L;
	
	/** 
	 * Chat Room Id
	 */
	private long roomId;
		public long getRoomId() { return roomId; }
		public void setRoomId(long roomId) { this.roomId = roomId; }

	/**
	 * Room Title	
	 */
	private String roomTitle;
		public String getRoomTitle() { return roomTitle; }
		public void setRoomTitle(String roomTitle) { this.roomTitle = roomTitle; }

	/** 
	 * Room Establisher ID
	 */
	private String establisherId;
		public String getEstablisherId() { return establisherId; }
		public void setEstablisherId(String establisherId) { this.establisherId = establisherId; }

	/** 
	 * Room Establisher Name
	 */
	private String establisherName;
		public String getEstablisherName() { return establisherName; }
		public void setEstablisherName(String establisherName) { this.establisherName = establisherName; }
	
	/**
	 * room flag	
	 */
	private String roomFlag;
		public String getRoomFlag() { return roomFlag; }
		public void setRoomFlag(String roomFlag) { this.roomFlag = roomFlag; }

	/**
	 * status	
	 */
	private String status;
		public String getStatus() { return status; }
		public void setStatus(String status) { this.status = status; }

	/** 
	 * Room Follower
	 */
	private List<ChatFollowerVo> followerList;	
		public List<ChatFollowerVo> getFollowerList() { return followerList; }
		public void setFollowerList(List<ChatFollowerVo> followerList) { this.followerList = followerList; }

	/**
	 * messageReadVo
	 */
	private MessageReadVo messageReadVo;
		public MessageReadVo getMessageReadVo() { return messageReadVo; }
		public void setMessageReadVo(MessageReadVo messageReadVo) { this.messageReadVo = messageReadVo; }

	/**
	 * Room Establish Date
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void setRegDttm(Date regDttm) { this.regDttm = regDttm; }
		
	/**
	 * 마지막 메세지 내용
	 */
	private String lastMessage;
		public String getLastMessage() { return lastMessage; }
		public void setLastMessage(String lastMessage) { this.lastMessage = lastMessage; }

	/**
	 * 마지막 메세지 날짜
	 */
	private Date lastDttm;
		public Date getLastDttm() { return lastDttm; }
		public void setLastDttm(Date lastDttm) { this.lastDttm = lastDttm; }
		
}