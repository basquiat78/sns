package org.uengine.sns.feed.vo;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * TagVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}TAG
 *
 */
@JsonInclude(Include.NON_NULL)
public class TagVo implements Serializable {
	
	private static final long serialVersionUID = -6061291231312261577L;
	
	/**
	 * 피드 아이디
	 */
	private long feedId;
		public long getFeedId() { return feedId; }
		public void setFeedId(long feedId) { this.feedId = feedId; }
		
	/**
	 * 태그명
	 */
	private String tagName;
		public String getTagName() { return tagName; }
		public void setTagName(String tagName) { this.tagName = tagName; }
	
	/**
	 * 등록자 아이디
	 */
	private long regMemberId;
		public long getRegMemberId() { return regMemberId; }
		public void setRegMemberId(long regMemberId) { this.regMemberId = regMemberId; }
	
	/**
	 * 등록일
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void setRegDttm(Date regDttm) { this.regDttm = regDttm; }

}