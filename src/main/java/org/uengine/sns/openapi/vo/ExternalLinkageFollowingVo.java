package org.uengine.sns.openapi.vo;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.Map;
import java.util.Map.Entry;

import org.uengine.sns.common.Exception.SNSRunTimeException;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * ExternalLinkageFollowingVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 외부연동 관련 테이블
 *
 */
@JsonInclude(Include.NON_NULL)
public class ExternalLinkageFollowingVo implements Serializable {
	
	private static final long serialVersionUID = -1923955085050161852L;
	
	private String SNS_ERROR_MSG;
	
	/**
	 * Constructor
	 */
	public ExternalLinkageFollowingVo() {
	}
	
	/**
	 * followId
	 */
	private long followerId;
		public long getFollowerId() { return followerId; }
		public void setFollowerId(long followerId) { this.followerId = followerId; }
	
	/**
	 * userId
	 */
	private String userId;
		public String getUserId() { return userId; }
		public void userId(Object userId) { this.userId = (String) userId; }

	/**
	 * boardId
	 */
	private int boardId;
		public int getBoardId() { return boardId; }
		public void setBoardId(int boardId) { this.boardId = boardId; }
	
	/**
	 * regDate
	 */
	private Date regDate;
		public Date getRegDate() { return regDate; }
		public void setRegDate(Date regDate) { this.regDate = regDate; }

	/**
	 * boardMode
	 */		
	private String boardMode;
		public String getBoardMode() { return boardMode; }
		public void setBoardMode(String boardMode) { this.boardMode = boardMode; }
		
	/**
	 * boardName
	 */			
	private String boardName;
		public String getBoardName() { return boardName; }
		public void setBoardName(String boardName) { this.boardName = boardName; }
	
	/**
	 * tempStr
	 */			
	private String tempStr;
		public String getTempStr() { return tempStr; }
		public void tempStr(Object tempStr) { this.tempStr = tempStr.toString(); }
	
	/**
	 * @param sc
	 */
	public ExternalLinkageFollowingVo(Map<Object, Object> sc) {
		for(Entry<Object, Object> entry : sc.entrySet()) {
		    try {
				Method m = ExternalLinkageFollowingVo.class.getMethod(entry.getKey().toString(), Object.class);
				m.invoke(this, entry.getValue());
				
				if(SNS_ERROR_MSG != null ) {
					throw new SNSRunTimeException(SNS_ERROR_MSG);
				}
			} catch (SNSRunTimeException e) {
				throw e;
			} catch (NoSuchMethodException e) {
				throw new SNSRunTimeException("세팅할 " + entry.getKey().toString() + " 가 존재하지 않습니다.");
			} catch (IllegalAccessException | SecurityException e) {
				throw new SNSRunTimeException("해당 url 호출에 문제가 발생하였습니다. method(get/post)를 확인해 주세요.");
			} catch (IllegalArgumentException | InvocationTargetException e) {
				throw new SNSRunTimeException(entry.getKey() + "의 변수 " + entry.getValue() + "(변수 타입, 값)를 확인하세요.");
			} 
		}
	}

}