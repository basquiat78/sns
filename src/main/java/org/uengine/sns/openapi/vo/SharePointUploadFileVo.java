package org.uengine.sns.openapi.vo;

import java.io.Serializable;

import javax.activation.DataHandler;

import org.apache.axiom.attachments.ByteArrayDataSource;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.FileName;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.FolderID;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.SiteID;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.SnsFeedID;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.SnsGroupID;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.StreamBody;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.SysType;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.UpDocInfo;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.UserID;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * SharePointUploadFileVo
 * <pre>
 * 	<p>회사의 그룹웨어에 따라 이 Value Object는 </p>
 *  <p>커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@JsonInclude(Include.NON_NULL)
public class SharePointUploadFileVo implements Serializable {
	
	private static final long serialVersionUID = -6479906020485198696L;
	
	/**
	 * sysType
	 */
	String sysType;
		public String getSysType() { return sysType; }
		public void setSysType(String sysType) { 
			this.sysType = sysType; 
			SysType sysTypeClass = new SysType();
			sysTypeClass.setSysType(sysType);
			setSysTypeClass(sysTypeClass);
		}
	
	/**
	 * userId
	 */
	String userId;
		public String getUserId() { return userId; }
		public void setUserId(String userId) { 
			this.userId = userId; 
			UserID userIdClass = new UserID();
			userIdClass.setUserID(userId);
			setUserIdClass(userIdClass);
		}
	
	/**
	 * siteId
	 */
	String siteId;
		public String getSiteId() { return siteId; }
		public void setSiteId(String siteId) { 
			this.siteId = siteId;
			SiteID siteIdClass = new SiteID();
			siteIdClass.setSiteID(siteId);
			setSiteIdClass(siteIdClass);
		}
	
	/**
	 * folderId
	 */
	String folderId;
		public String getFolderId() { return folderId;}
		public void setFolderId(String folderId) { 
			this.folderId = folderId; 
			FolderID folderIdClass = new FolderID();
			folderIdClass.setFolderID(folderId);
			setFolderIdClass(folderIdClass);
		}
	
	/**
	 * fileName
	 */
	String fileName;
		public String getFileName() { return fileName; }
		public void setFileName(String fileName) { 
			this.fileName = fileName; 
			FileName fileNameClass = new FileName();
			fileNameClass.setFileName(fileName);
			setFileNameClass(fileNameClass);
		}
		
	/**
	 * snsGrpId
	 */
	String snsGrpId;
		public String getSnsGrpId() { return snsGrpId; }
		public void setSnsGrpId(String snsGrpId) { 
			this.snsGrpId = snsGrpId;
			SnsGroupID snsGroupIDClass = new SnsGroupID();
			snsGroupIDClass.setSnsGroupID(snsGrpId);
			setSnsGroupIdClass(snsGroupIDClass);
		}
	
	/**
	 * snsFeedId
	 */
	String snsFeedId;
		public String getSnsFeedId() { return snsFeedId; }
		public void setSnsFeedId(String snsFeedId) { 
			this.snsFeedId = snsFeedId;
			SnsFeedID snsFeedIDClass = new SnsFeedID();
			snsFeedIDClass.setSnsFeedID(snsFeedId);
			setSnsFeedIdClass(snsFeedIDClass);
		}
		
	/**
	 * byteFileData
	 */
	byte[] byteFileData;
		public byte[] getByteFileData() { return byteFileData; }
		public void setByteFileData(byte[] byteFileData) { 
			this.byteFileData = byteFileData;
			ByteArrayDataSource rawData= new ByteArrayDataSource(byteFileData);
			DataHandler dHandelData= new DataHandler(rawData);
			StreamBody streamBody = new StreamBody();
			streamBody.setStreamBody(dHandelData);
			UpDocInfo upDocInfo = new UpDocInfo();
			upDocInfo.setFileStream(streamBody);
			setUpDocInfoClass(upDocInfo);
		}
		
	/**
	 * fileNameClass
	 */
	FileName fileNameClass;
		public FileName getFileNameClass() { return fileNameClass; }
		public void setFileNameClass(FileName fileNameClass) { this.fileNameClass = fileNameClass; }
		
	/**
	 * folderIdClass
	 */
	FolderID folderIdClass;
		public FolderID getFolderIdClass() { return folderIdClass; }
		public void setFolderIdClass(FolderID folderIdClass) { this.folderIdClass = folderIdClass; }
		
	/**
	 * siteIdClass
	 */	
	SiteID siteIdClass;
		public SiteID getSiteIdClass() { return siteIdClass; }
		public void setSiteIdClass(SiteID siteIdClass) { this.siteIdClass = siteIdClass; }
		
	/**
	 * snsFeedIdClass
	 */	
	SnsFeedID snsFeedIdClass;
		public SnsFeedID getSnsFeedIdClass() { return snsFeedIdClass; }
		public void setSnsFeedIdClass(SnsFeedID snsFeedIdClass) { this.snsFeedIdClass = snsFeedIdClass; }
		
	/**
	 * snsGroupIdClass
	 */
	SnsGroupID snsGroupIdClass;
		public SnsGroupID getSnsGroupIdClass() { return snsGroupIdClass; }
		public void setSnsGroupIdClass(SnsGroupID snsGroupIdClass) { this.snsGroupIdClass = snsGroupIdClass; }
		
	/**
	 * sysTypeClass
	 */
	SysType sysTypeClass;
		public SysType getSysTypeClass() { return sysTypeClass; }
		public void setSysTypeClass(SysType sysTypeClass) { this.sysTypeClass = sysTypeClass; }
		
	/**
	 * userIdClass
	 */
	UserID userIdClass;
		public UserID getUserIdClass() { return userIdClass; }
		public void setUserIdClass(UserID userIdClass) { this.userIdClass = userIdClass; }
		
	/**
	 * upDocInfoClass
	 */
	UpDocInfo upDocInfoClass;
		public UpDocInfo getUpDocInfoClass() { return upDocInfoClass; }
		public void setUpDocInfoClass(UpDocInfo upDocInfoClass) { this.upDocInfoClass = upDocInfoClass; }

}