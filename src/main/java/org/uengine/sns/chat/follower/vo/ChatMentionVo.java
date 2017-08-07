package org.uengine.sns.chat.follower.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * ChatMentionVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}MEMBER
 * 
 */
@JsonInclude(Include.NON_NULL)
public class ChatMentionVo implements Serializable {

	private static final long serialVersionUID = 6981996736709233042L;
	
	/**
	 * Mention Id	
	 */
	private String mentionId;
		public String getMentionId() { return mentionId; }
		public void setMentionId(String mentionId) { this.mentionId = mentionId; }
		
	/**
	 * Mention Name	
	 */
	private String mentionName;
		public String getMentionName() { return mentionName; }
		public void setMentionName(String mentionName) { this.mentionName = mentionName; }

}