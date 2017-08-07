package org.uengine.sns.feed.vo;

import java.io.Serializable;
import java.util.Date;

import org.uengine.sns.group.vo.GroupVo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * FeedFileVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}ATTACHFILE
 *
 */
@JsonInclude(Include.NON_NULL)
public class FeedFileVo implements Serializable {
	
	private static final long serialVersionUID = -3222232452355286433L;
	
	/**
	 * 파일 ID
	 */
	private long fileId;
		public long getFileId() { return fileId; }
		public void setFileId(long fileId) { this.fileId = fileId; }
	
	/**
	 * 원본 파일명
	 */
	private String fileName;
		public String getFileName() { return fileName; }
		public void setFileName(String fileName) { this.fileName = fileName; }
		
	/**
	 * 임시 유니크 파일명
	 */
	private String tempFileName;
		public String getTempFileName() { return tempFileName; }
		public void setTempFileName(String tempFileName) { this.tempFileName = tempFileName; }
		
	/**
	 * 저장된 파일명
	 */
	private String fileSaveName;
		public String getFileSaveName() { return fileSaveName; }
		public void setFileSaveName(String fileSaveName) { this.fileSaveName = fileSaveName; }

	/**
	 * 파일 컨텐츠 타입
	 */
	private String fileContentType;
		public String getFileContentType() { return fileContentType; }
		public void setFileContentType(String fileContentType) { this.fileContentType = fileContentType; }
		
	/**
	 * 썸네일 파일명
	 */
	private String thunmbFileName;
		public String getThunmbFileName() { return thunmbFileName; }
		public void setThunmbFileName(String thunmbFileName) { this.thunmbFileName = thunmbFileName; }
		
	/**
	 * 모바일 썸네일 파일명
	 */
	private String mblThumbFileName;
		public String getMblThumbFileName() { return mblThumbFileName; }
		public void setMblThumbFileName(String mblThumbFileName) { this.mblThumbFileName = mblThumbFileName; }

	/**
	 * 파일 확장자
	 */
	private String fileExt;
		public String getFileExt() { return fileExt; }
		public void setFileExt(String fileExt) { this.fileExt = fileExt; }
		
	/**
	 * 파일 저장소(로컬, 쉐어포인트)
	 */
	private String repositoryType;
		public String getRepositoryType() { return repositoryType; }
		public void setRepositoryType(String repositoryType) { this.repositoryType = repositoryType; }

	/**
	 * 피드 ID
	 */
	private long feedId;
		public long getFeedId() { return feedId; }
		public void setFeedId(long feedId) { this.feedId = feedId; }
		
	/**
	 * 파일 URL
	 */
	private String fileUrl;
		public String getFileUrl() { return fileUrl; }
		public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
	
	/**
	 * 파일 전환 유무
	 */
	private Integer isTransfer;
		public Integer getIsTransfer() { return isTransfer; }
		public void setIsTransfer(Integer isTransfer) { this.isTransfer = isTransfer; }
		
	/**
	 * 파일 재시도 횟수
	 */
	private Integer transferCnt;
		public Integer getTransferCnt() { return transferCnt; }
		public void setTransferCnt(Integer transferCnt) { this.transferCnt = transferCnt; }
	
	/**
	 * 파일 등록자 아이디
	 */
	private long regMemberId;
		public long getRegMemberId() { return regMemberId; }
		public void setRegMemberId(long regMemberId) { this.regMemberId = regMemberId; }
	
	/**
	 * 파일 등록자 이름
	 */
	private String regMemberName;
		public String getRegMemberName() { return regMemberName; }
		public void setRegMemberName(String regMemberName) { this.regMemberName = regMemberName; }
		
	/**
	 * 파일 등록자 직책
	 */
	private String regMemberPositionName;	
		public String getRegMemberPositionName() { return regMemberPositionName; }
		public void setRegMemberPositionName(String regMemberPositionName) { this.regMemberPositionName = regMemberPositionName; }
	
	/**
	 * 파일 등록일시
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void setRegDttm(Date regDttm) { this.regDttm = regDttm; }	

	/**
	 * 그룹 정보
	 */
	private GroupVo groupVo;
		public GroupVo getGroupVo() { return groupVo; }
		public void setGroupVo(GroupVo groupVo) { this.groupVo = groupVo; }
	
	/**
	 * regSynckey
	 */
	private String regSyncKey;
		public String getRegSyncKey() { return regSyncKey; }
		public void setRegSyncKey(String regSyncKey) { this.regSyncKey = regSyncKey; }
	
	/**
	 * 파일 전환일
	 */
	private Date transferDttm;
		public Date getTransferDttm() { return transferDttm; }
		public void setTransferDttm(Date transferDttm) { this.transferDttm = transferDttm; }

}