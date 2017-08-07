package org.uengine.sns.feed.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * LinkVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}FEED
 *
 */
@JsonInclude(Include.NON_NULL)
public class LinkVo implements Serializable {
	
	private static final long serialVersionUID = -3282954588492436895L;
	
	/**
	 * 피드 타이틀
	 */
	private String title;
		public String getTitle() { return title; }
		public void setTitle(String title) { this.title = title; }
		
	/**
	 * 링크 URL 정보
	 */
	private String url;
		public String getUrl() { return url; }
		public void setUrl(String url) { this.url = url; }
		
	/**
	 * 원피드의 등록자 이미지 정보
	 */
	private String image;
		public String getImage() { return image; }
		public void setImage(String image) { this.image = image; }
		
	/**
	 * 설명
	 */
	private String description;
		public String getDescription() { return description; }
		public void setDescription(String description) { this.description = description; }

}