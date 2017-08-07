package org.uengine.sns.openapi.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * GroupWareContactUserVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 그룹웨어 관련 테이블
 *
 */
@JsonInclude(Include.NON_NULL)
public class GroupWareContactUserVo implements Serializable {
	
	private static final long serialVersionUID = -492140201726277729L;
	
	/**
	 * emailAddress1
	 */
	private String emailAddress1;
		public String getEmailAddress1() { return emailAddress1; }
		public void setEmailAddress1(String emailAddress1) { this.emailAddress1 = emailAddress1; }
		
	/**
	 * imAddress1
	 */
	private String imAddress1;
		public String getImAddress1() { return imAddress1; }
		public void setImAddress1(String imAddress1) { this.imAddress1 = imAddress1; }
		
	/**
	 * displayName
	 */
	private String displayName;
		public String getDisplayName() { return displayName; }
		public void setDisplayName(String displayName) { this.displayName = displayName; }
		
	/**
	 * department
	 */
	private String department;
		public String getDepartment() { return department; }
		public void setDepartment(String department) { this.department = department; }

	/**
	 * @return String
	 */
	public String getEmail() {
		if(imAddress1 == null || imAddress1.equals("")) {
			return emailAddress1;
		}
		return imAddress1;
	}
	
	@Override
	public String toString() {
		return "GroupWareContactUserVo [emailAddress1=" + emailAddress1
				+ ", imAddress1=" + imAddress1 + ", displayName=" + displayName
				+ ", department=" + department + "]";
	}

}