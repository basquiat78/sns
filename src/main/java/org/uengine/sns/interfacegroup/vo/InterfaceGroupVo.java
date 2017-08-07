package org.uengine.sns.interfacegroup.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * InterfaceGroupVo
 * <pre>
 *  이 부분은 해당 회사의 조직에 맞게 커스터마이징 되어야 한다.
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 그룹웨어 EMPTABLE
 *
 */
@JsonInclude(Include.NON_NULL)
public class InterfaceGroupVo implements Serializable {

	private static final long serialVersionUID = 221717140296265434L;
	
	/**
	 * 그룹 코드 타입
	 */
	private String contentsType;
		public String getContentsType() { return contentsType; }
		public void setContentsType(String contentsType) { this.contentsType = contentsType; }
	
	/**
	 * 그룹 콘텐츠 아이디
	 */
	private String contentsId;
		public String getContentsId() { return contentsId; }
		public void setContentsId(String contentsId) { this.contentsId = contentsId; }
	
	/**
	 * 그룹 콘텐츠 명	
	 */
	private String contentsName;
		public String getContentsName() { return contentsName; }
		public void setContentsName(String contentsName) { this.contentsName = contentsName; }

	/**
	 * 그룹 등록자 아이디	
	 */
    private String regUserId;
		public String getRegUserId() { return regUserId; }
		public void setRegUserId(String regUserId) { this.regUserId = regUserId; }
		
	/**
	 * sns groupId	
	 */
	private String snsGroupId;
		public String getSnsGroupId() { return snsGroupId; }
		public void setSnsGroupId(String snsGroupId) { this.snsGroupId = snsGroupId; }

}