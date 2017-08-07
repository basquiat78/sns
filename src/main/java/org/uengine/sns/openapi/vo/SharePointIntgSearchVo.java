package org.uengine.sns.openapi.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * SharePointIntgSearchVo
 * <pre>
 * 	<p>회사의 그룹웨어에 따라 이 Value Object는 </p>
 *  <p>커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@JsonInclude(Include.NON_NULL)
public class SharePointIntgSearchVo implements Serializable {
	
	private static final long serialVersionUID = -1726820571452989828L;
	
	/** 사용자 아이디 */
	private String userId;
		public String getUserId() { return userId; }
		public void setUserId(String userId) { this.userId = userId; }

	/** 키워드 */
	private String keyword;
		public String getKeyword() { return keyword; }
		public void setKeyword(String keyword) { this.keyword = keyword; }
	
	/** 카테고리: user/feed/file/group */
	private String category;
		public String getCategory() { return category; }
		public void setCategory(String category) { this.category = category; }

	/** 그룹 아이디 */
	private String groupId;
		public String getGroupId() { return groupId; }
		public void setGroupId(String groupId) { this.groupId = groupId; }

	/** type: 0 or 1 (0: Feed 전체검색, 1: 즐겨찾기 검색) */
	private String type;
		public String getType() { return type; }
		public void setType(String type) { this.type = type; }

}