package org.uengine.sns.openapi.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * GroupWareContactVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 그룹웨어 관련 테이블
 *
 */
@JsonInclude(Include.NON_NULL)
public class GroupWareContactVo implements Serializable {
	
	private static final long serialVersionUID = -6456726716943652331L;
	
	/**
	 * 사용자 아이디
	 */
	private String userId;
		public String getUserId() { return userId; }
		public void setUserId(String userId) { this.userId = userId; }
		
	/**
	 * 폴더 아이디 
	 */
	private String folderId;
		public String getFolderId() { return folderId; }
		public void setFolderId(String folderId) { this.folderId = folderId; }
		
	/**
	 * hexId
	 */
	private String hexId;
		public String getHexId() { return hexId; }
		public void setHexId(String hexId) { this.hexId = hexId; }

	/**
	 * pageSize
	 */
	private String pageSize;
		public String getPageSize() { return pageSize; }
		public void setPageSize(String pageSize) { this.pageSize = pageSize; }

}