package org.uengine.sns.common.util.vo;

import java.io.Serializable;

/**
 * 
 * OpenGraphVo
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class OpenGraphVo implements Serializable {
	
	private static final long serialVersionUID = -5691806702144859988L;
	
	/**
	 * 사이트  타이틀
	 */
	private String title;
		public String getTitle() { return title; }
		public void setTitle(String title) { this.title = title; }
		
	/**
	 * 사이트  url
	 */
	private String url;
		public String getUrl() { return url; }
		public void setUrl(String url) { this.url = url; }
		
	/**
	 * 사이트 메인 이미지
	 */
	private String image;
		public String getImage() { return image; }
		public void setImage(String image) { this.image = image; }
	
	/**
	 * 사이트 설명
	 */
	private String description;
		public String getDescription() { return description; }
		public void setDescription(String description) { this.description = description; }
		
}