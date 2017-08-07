package org.uengine.sns.member.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * BookmarkVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}BOOKMARK
 *
 */
@JsonInclude(Include.NON_NULL)
public class BookmarkVo implements Serializable {

	private static final long serialVersionUID = 5623186755876811108L;
	
	/**
	 * 사용자 아이디
	 */
	private long memberId;
		public long getMemberId() { return memberId; }
		public void setMemberId(long memberId) { this.memberId = memberId; }
		
	/**
	 * 피드 아이디
	 */
	private long feedId;
		public long getFeedId() { return feedId; }
		public void setFeedId(long feedId) { this.feedId = feedId; }

}