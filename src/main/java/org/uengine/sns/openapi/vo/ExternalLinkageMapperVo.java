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
 * ExternalLinkageMapperVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 외부연동 관련 테이블
 *
 */
@JsonInclude(Include.NON_NULL)
public class ExternalLinkageMapperVo implements Serializable {
	
	private static final long serialVersionUID = 42577519914691108L;
	
	private String SNS_ERROR_MSG;
	
	/**
	 * Constructor
	 */
	public ExternalLinkageMapperVo() {
	}

	/**
	 * boardId
	 */
	private int boardId;
		public int getBoardId() { return boardId; }
		public void setBoardId(int boardId) { this.boardId = boardId; }
		
	/**
	 * boardDesc
	 */
	private String boardDesc;
		public String getBoardDesc() { return boardDesc; }
		public void setBoardDesc(String boardDesc) { this.boardDesc = boardDesc; }
		
	/**
	 * boardName
	 */
	private String boardName;
		public String getBoardName() { return boardName; }
		public void setBoardName(String boardName) { this.boardName = boardName; }
	
	/**
	 * publicYn
	 */
	private int publicYn;
		public int getPublicYn() { return publicYn; }
		public void setPublicYn(int publicYn) { this.publicYn = publicYn; }
		
	/**
	 * depth
	 */
	private int depth;
		public int getDepth() { return depth; }
		public void setDepth(int depth) { this.depth = depth; }
		
	/**
	 * companyId
	 */
	private String companyId;
		public String getCompanyId() { return companyId; }
		public void companyId(Object companyId) { this.companyId = (String) companyId; }
		
	/**
	 * useLinkYn
	 */
	private int useLinkYn;
		public int getUseLinkYn() { return useLinkYn; }
		public void setUseLinkYn(int useLinkYn) { this.useLinkYn = useLinkYn; }
		
	/**
	 * linkUrl
	 */
	private String linkUrl;
		public String getLinkUrl() { return linkUrl; }
		public void setLinkUrl(String linkUrl) { this.linkUrl = linkUrl; }
		
	/**
	 * folderYn
	 */
	private int folderYn;
		public int getFolderYn() { return folderYn; }
		public void setFolderYn(int folderYn) { this.folderYn = folderYn; }
		
	/**
	 * boardType
	 */
	private int boardType;
		public int getBoardType() { return boardType; }
		public void setBoardType(int boardType) { this.boardType = boardType; }
		
	/**
	 * anonymousYn
	 */
	private int anonymousYn;
		public int getAnonymousYn() { return anonymousYn; }
		public void setAnonymousYn(int anonymousYn) { this.anonymousYn = anonymousYn; }
		
	/**
	 * lastArticleDate
	 */
	private Date lastArticleDate;
		public Date getLastArticleDate() { return lastArticleDate; }
		public void setLastArticleDate(Date lastArticleDate) { this.lastArticleDate = lastArticleDate; }
		
	/**
	 * childCnt
	 */
	private int childCnt;
		public int getChildCnt() { return childCnt; }
		public void setChildCnt(int childCnt) { this.childCnt = childCnt; }
		
	/**
	 * useRssYn
	 */
	private int useRssYn;
		public int getUseRssYn() { return useRssYn; }
		public void setUseRssYn(int useRssYn) { this.useRssYn = useRssYn; }
		
	/**
	 * followerId
	 */
	private int followerId;
		public int getFollowerId() { return followerId; }
		public void setFollowerId(int followerId) { this.followerId = followerId; }
	
	/**
	 * deleteYn
	 */
	private int deleteYn;
		public int getDeleteYn() { return deleteYn; }
		public void setDeleteYn(int deleteYn) { this.deleteYn = deleteYn; }
		
	/**
	 * userId
	 */
	private String userId;
		public String getUserId() { return userId; }
		public void userId(Object userId) { this.userId = (String)userId; }
	
	/**
	 * parentId
	 */
	private long parentId;
		public long getParentId() { return parentId; }
		public void parentId(Object parentId) { this.parentId = Long.parseLong(parentId.toString()); }
	
	/**
	 * tempStr
	 */
	private String tempStr;
		public String getTempStr() { return tempStr; }
		public void tempStr(Object tempStr) { 
			this.tempStr = tempStr.toString(); 
		}

	/**
	 * @param sc
	 */
	public ExternalLinkageMapperVo(Map<Object, Object> sc) {
		for(Entry<Object, Object> entry : sc.entrySet()) {
		    try {
				Method m = ExternalLinkageMapperVo.class.getMethod(entry.getKey().toString(), Object.class);
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
