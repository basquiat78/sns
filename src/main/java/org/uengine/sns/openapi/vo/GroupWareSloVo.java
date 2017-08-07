package org.uengine.sns.openapi.vo;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * GroupWareSloVo
 * <pre>
 * 	<p>회사의 그룹웨어에 따라 이 Value Object는 </p>
 *  <p>커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 그룹웨어 관련 테이블
 *
 */
@JsonInclude(Include.NON_NULL)
public class GroupWareSloVo implements Serializable {

	private static final long serialVersionUID = 6075672289554949111L;
	
	/**
	 * 그룹웨어 userId
	 */
	private String userId;
		public String getUserId() { return userId; }
		public void setUserId(String userId) { this.userId = userId; }

	/**
	 * 그룹웨어 loginDate	
	 */
	private Date loginDate;
		public Date getLoginDate() { return loginDate; }
		public void setLoginDate(Date loginDate) { this.loginDate = loginDate; }

}