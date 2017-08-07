package org.uengine.sns.openapi.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * GroupWareApprovalVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 그룹웨어 관련 테이블
 *
 */
@JsonInclude(Include.NON_NULL)
public class GroupWareApprovalVo implements Serializable {
	
	private static final long serialVersionUID = -3049932680388888882L;
	
	/**
	* 그룹웨어 user 아이디
	*/	
	String userId;
		public String getUserId() { return userId; }
		public void setUserId(String userId) { this.userId = userId; }

	/**
	* 전자결재 연동 아이디
	*/	
	String taskId;
		public String getTaskId() { return taskId; }
		public void setTaskId(String taskId) { this.taskId = taskId; }

	/**
	* 코멘트
	*/	
	String comment;
		public String getComment() { return comment; }
		public void setComment(String comment) { this.comment = comment; }
	
	/**
	 * 전자결재 비밀번호
	 */
	String password;
		public String getPassword() { return password; }
		public void setPassword(String password) { this.password = password; }

}