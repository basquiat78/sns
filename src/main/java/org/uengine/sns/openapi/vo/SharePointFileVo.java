package org.uengine.sns.openapi.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * SharePointFileVo
 * <pre>
 * 	<p>회사의 그룹웨어에 따라 이 Value Object는 </p>
 *  <p>커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@JsonInclude(Include.NON_NULL)
public class SharePointFileVo implements Serializable {
	
	private static final long serialVersionUID = -4346894796413085275L;
	
	/** 유저 ID */
	private String userId;
		public String getUserId() { return userId; }
		public void setUserId(String userId) { this.userId = userId; }
	
	/** 사이트 ID */
	private String siteId;
		public String getSiteId() { return siteId; }
		public void setSiteId(String siteId) { this.siteId = siteId; }
		
	/** 문서 ID */
	private String docId;
		public String getDocId() { return docId; }
		public void setDocId(String docId) { this.docId = docId; }
		
	/** 문서명 */
	private String docName;
		public String getDocName() { return docName; }
		public void setDocName(String docName) { this.docName = docName; }

	
	/** 문서 링크 URL */
	private String linkUrl;
		public String getLinkUrl() { return linkUrl; }
		public void setLinkUrl(String linkUrl) { this.linkUrl = linkUrl; }
	
	/** 작성자 아이디 */
	private String creatorId;
		public String getCreatorId() { return creatorId; }
		public void setCreatorId(String creatorId) { this.creatorId = creatorId; }
		
	/** 작성일 */
	private String createDttm;
		public String getCreateDttm() { return createDttm; }
		public void setCreateDttm(String createDttm) { this.createDttm = createDttm; }
		
	/** 수정자 아이디*/
	private String editorId;
		public String getEditorId() { return editorId; }
		public void setEditorId(String editorId) { this.editorId = editorId; }
		
	/** 수정일 */	
	private String editDttm;
		public String getEditDttm() { return editDttm; }
		public void setEditDttm(String editDttm) { this.editDttm = editDttm; }

	/** 결과 코드*/
	private String result;
		public String getResult() { return result; }
		public void setResult(String result) { this.result = result; }
	
	/** 결과 메시지 */
	private String message;
		public String getMessage() { return message; }
		public void setMessage(String message) { this.message = message; }

}