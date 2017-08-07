package org.uengine.sns.openapi.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * PushVo
 * <pre>
 * 	<p>모바일 연동을 위한 서비스로 </p>
 * 	<p>프로젝트시 커스터마이징이 요구된다.</p>
 * <p>msgType<br/>
 *		100:공지
 *		101:타인에의한그룹가입
 *		102:그룹에서 타인에 의해 탈퇴
 *		103:할일 일정 도래
 *		104:결재피드 등록
 *		105:내 피드에 댓글 등록
 * </p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@JsonInclude(Include.NON_NULL)
public class PushVo implements Serializable {

	private static final long serialVersionUID = 5667644888324264262L;

	/**
	 * memberId
	 */
	private String memberId = "uengine";
		public String getMemberId() { return memberId; }
		public void setMemberId(String memberId) { this.memberId = memberId; }

	/**
	 * targetIds
	 */		
	private String targetIds;
		public String getTargetIds() { return targetIds; }
		public void setTargetIds(String targetIds) { this.targetIds = targetIds; }

	/**
	 * msgLevel
	 */
	private String msgLevel;
		public String getMsgLevel() { return msgLevel; }
		public void setMsgLevel(String msgLevel) { this.msgLevel = msgLevel; }

	/**
	 * alert
	 */
	private String alert;
		public String getAlert() { return alert; }
		public void setAlert(String alert) { this.alert = alert; }

	/**
	 * contents
	 */
	private String contents;
		public String getContents() { return contents; }
		public void setContents(String contents) { this.contents = contents; }

	/**
	 * msgType
	 */
	private String msgType;
		public String getMsgType() { return msgType; }
		public void setMsgType(String msgType) { this.msgType = msgType; }

	/**
	 * popupType
	 */
	private String popupType;
		public String getPopupType() { return popupType; }
		public void setPopupType(String popupType) { this.popupType = popupType; }

	/**
	 * force
	 */
	private String force;
		public String getForce() { return force; }
		public void setForce(String force) { this.force = force; }

	/**
	 * appUri
	 */
	private String appUri;
		public String getAppUri() { return appUri; }
		public void setAppUri(String appUri) { this.appUri = appUri; }
	
	/**
	 * responseCode
	 */
	private String responseCode;
		public String getResponseCode() { return responseCode; }
		public void setResponseCode(String responseCode) { this.responseCode = responseCode; }
		
	/**
	 * responseMsg
	 */
	private String responseMsg;
		public String getResponseMsg() { return responseMsg; }
		public void setResponseMsg(String responseMsg) { this.responseMsg = responseMsg; }

}