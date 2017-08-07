package org.uengine.sns.openapi.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * GroupWareMailVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 그룹웨어 관련 테이블
 *
 */
@JsonInclude(Include.NON_NULL)
public class GroupWareMailVo implements Serializable {
	
	private static final long serialVersionUID = 8306702360280308925L;
	
	/**
	* 메일 본문
	*/	
	private String mailBody;
		public String getMailBody() { return mailBody; }
		public void setMailBody(String mailBody) { this.mailBody = mailBody; }
		
	/**
	* 회수할 메일 고유키
	*/	
	private String mailKey;
		public String getMailKey() { return mailKey; }
		public void setMailKey(String mailKey) { this.mailKey = mailKey; }
		
	/**
	* 회수할 메일 고유키 값 배열
	*/		
	private String[] mailKeyArr;
		public String[] getMailKeyArr() { return mailKeyArr; }
		public void setMailKeyArr(String[] mailKeyArr) { this.mailKeyArr = mailKeyArr; }

	/**
	* 회수할 수신자 메일주소 배열
	*/		
	private String[] receiverForCancel;
		public String[] getReceiverForCancel() { return receiverForCancel; }
		public void setReceiverForCancel(String[] receiverForCancel) { this.receiverForCancel = receiverForCancel; }
	
	/**
	* 발송자 정보(매알주소, 비밀번호)
	*/
	private Object wsResource;
		public Object getWsResource() { return wsResource; }
		public void setWsResource(Object wsResource) { this.wsResource = wsResource; }
	
	/**
	* 메일발송 필수 정보
	*/
	private Object wsMailInfo;
		public Object getWsMailInfo() { return wsMailInfo; }
		public void setWsMailInfo(Object wsMailInfo) { this.wsMailInfo = wsMailInfo; }
	
	/**
	* 수신자정보 배열 (최대 100명 이하)
	*/	
	private Object[] wsRecipientArr;
		public Object[] getWsRecipientArr() { return wsRecipientArr; }
		public void setWsRecipientArr(Object[] wsRecipientArr) { this.wsRecipientArr = wsRecipientArr; }
		
	/**
	* 첨부파일 정보 배열
	*/	
	private Object[] wsAttachFileArr;
		public Object[] getWsAttachFileArr() { return wsAttachFileArr; }
		public void setWsAttachFileArr(Object[] wsAttachFileArr) { this.wsAttachFileArr = wsAttachFileArr; }
		
	/**
	* 메일정보상태
	*/	
	private Object[] wsMailStatusArr;
		public Object[] getWsMailStatusArr() { return wsMailStatusArr; }
		public void setWsMailStatusArr(Object[] wsMailStatusArr) { this.wsMailStatusArr = wsMailStatusArr; }

}