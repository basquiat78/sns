package org.uengine.sns.feed.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * TagCloudVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}TAG
 *
 */
@JsonInclude(Include.NON_NULL)
public class TagCloudVo implements Serializable {
	
	private static final long serialVersionUID = -2760223169886962538L;
	
	/**
	 * 태그명
	 */
	private String tagName;
		public String getTagName() { return tagName; }
		public void setTagName(String tagName) { this.tagName = tagName; }
	
	/**
	 * 태그 COUNT
	 */
	private long tagCount;
		public long getTagCount() { return tagCount; }
		public void setTagCount(long tagCount) { this.tagCount = tagCount; }
	
	/**
	 * 태그 타입(그룹, 멤버)
	 */
	private String tagType;
		public String getTagType() { return tagType; }
		public void setTagType(String tagType) { this.tagType = tagType; }

}