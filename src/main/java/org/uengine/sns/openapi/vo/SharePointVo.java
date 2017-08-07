package org.uengine.sns.openapi.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * SharePointVo
 * <pre>
 * 	<p>회사의 그룹웨어에 따라 이 Value Object는 </p>
 *  <p>커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@JsonInclude(Include.NON_NULL)
public class SharePointVo implements Serializable {

	private static final long serialVersionUID = -3821060189518512038L;
	
	/**
	 * result
	 */
	private String result;
		public String getResult() { return result; }
		public void setResult(String result) { this.result = result; }
	
	/**
	 * message
	 */
	private String message;
		public String getMessage() { return message; }
		public void setMessage(String message) { this.message = message; }
	
	/**
	 * userId
	 */
	private String userId;
		public String getUserId() { return userId; }
		public void setUserId(String userId) { this.userId = userId; }

	/************************************* 대상 문서함 관련 *********************************************/
	/**
	 * siteId
	 */
	private String siteId;
		public String getSiteId() { return siteId; }
		public void setSiteId(String siteId) { this.siteId = siteId; }

	/**
	 * folderId
	 */
	private String folderId;
		public String getFolderId() { return folderId; }
		public void setFolderId(String folderId) { this.folderId = folderId; }
	
	/**
	 * siteUrl
	 */
	private String siteUrl;
		public String getSiteUrl() { return siteUrl; }
		public void setSiteUrl(String siteUrl) { this.siteUrl = siteUrl; }
		
	/**
	 * siteName
	 */
	private String siteName;
		public String getSiteName() { return siteName; }
		public void setSiteName(String siteName) { this.siteName = siteName;}

	/**
	 * siteName_KR
	 */
	private String siteName_KR;
		public String getSiteName_KR() { return siteName_KR; }
		public void setSiteName_KR(String siteName_KR) { this.siteName_KR = siteName_KR; }
	
	/**
	 * siteName_EN
	 */
	private String siteName_EN;
		public String getSiteName_EN() { return siteName_EN; }
		public void setSiteName_EN(String siteName_EN) { this.siteName_EN = siteName_EN; }
	
	/**
	 * 사이트타입 (T:팀, G:일반, C:동호회)
	 */
	private String siteType;
		public String getSiteType() { return siteType; }
		public void setSiteType(String siteType) { this.siteType = siteType; }
	
	/** 공개여부 */
	private String publicYN;
		public String getPublicYN() { return publicYN; }
		public void setPublicYN(String publicYN) { this.publicYN = publicYN; }
	
	/** 종료여부 */
	private String closeYN;
		public String getCloseYN() { return closeYN; }
		public void setCloseYN(String closeYN) { this.closeYN = closeYN; }
		
	/** 공식 동호회 여부 */
	private String authorizedYN;
		public String getAuthorizedYN() { return authorizedYN; }
		public void setAuthorizedYN(String authorizedYN) { this.authorizedYN = authorizedYN; }
		
	/** 동호회 멤버 여부 */
	private String memberYN;
		public String getMemberYN() { return memberYN; }
		public void setMemberYN(String memberYN) { this.memberYN = memberYN; }

	/** 운영회장 사용자아이디 */
	private String presidentUserId;
		public String getPresidentUserId() { return presidentUserId; }
		public void setPresidentUserId(String presidentUserId) { this.presidentUserId = presidentUserId; }
	
	/** 운영회장명 */
	private String presidentUserName;
		public String getPresidentUserName() { return presidentUserName; }
		public void setPresidentUserName(String presidentUserName) { this.presidentUserName = presidentUserName; }

	/** 회원수*/
	private int memberCount;
		public int getMemberCount() { return memberCount; }
		public void setMemberCount(int memberCount) { this.memberCount = memberCount; }
		
	/** 개설일(YYYY-MM-DD) */
	private String createDate;
		public String getCreateDate() { return createDate; }
		public void setCreateDate(String createDate) { this.createDate = createDate; }
		
	/** 폐쇄일(YYYY-MM-DD) */
	private String closeDate;
		public String getCloseDate() { return closeDate; }
		public void setCloseDate(String closeDate) { this.closeDate = closeDate; }
		
	/** 회사코드 */
	private String companyId;
		public String getCompanyId() { return companyId; }
		public void setCompanyId(String companyId) { this.companyId = companyId; }
	
	/************************************* 대상 문서함 폴더 관련 *********************************************/
	/** 폴더명 */
	private String folderName;
		public String getFolderName() { return folderName; }
		public void setFolderName(String folderName) { this.folderName = folderName; }
	
	/** 하위폴더 유무 */
	private String hasSubFolders;
		public String getHasSubFolders() { return hasSubFolders; }
		public void setHasSubFolders(String hasSubFolders) { this.hasSubFolders = hasSubFolders; }

	/************************************* 파일 관련 *********************************************/
	/**
	 * 쉐어포인트 파일 객체
	 */
	private SharePointFileVo fileInfo;
		public SharePointFileVo getFileInfo() {return fileInfo;}
		public void setFileInfo(SharePointFileVo fileInfo) { this.fileInfo = fileInfo; }

}