package org.uengine.sns.common.batch;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

import javax.activation.DataHandler;

import org.apache.axiom.attachments.ByteArrayDataSource;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.uengine.sns.common.Exception.SNSRunTimeException;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.service.FileService;
import org.uengine.sns.feed.service.FeedFileService;
import org.uengine.sns.feed.vo.FeedFileVo;
import org.uengine.sns.openapi.service.SharePointService;
import org.uengine.sns.openapi.vo.SharePointUploadFileVo;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.FileName;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.FolderID;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.SiteID;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.SnsFeedID;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.SnsGroupID;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.StreamBody;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.SysType;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.UpDocInfo;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.UpResInfo;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.UserID;

/**
 * 
 * SharePointFileUploadJob
 * <pre>
 * 	만일 파일과 관련 Share Point를 사용한다면
 *  관련 파일들을 Share Point로 파일을 이관한다.
 *  회사에 따라 커스터마이징이 요구된다.
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@DisallowConcurrentExecution
public class SharePointFileUploadJob extends QuartzJobBean {

	private static final Logger LOG = LoggerFactory.getLogger(SharePointFileUploadJob.class);
	
	/**
	 * DI
	 */
	FeedFileService feedFileService;
		public void setFeedFileService(FeedFileService feedFileService) {
			this.feedFileService = feedFileService;
		}

	/**
	 * DI
	 */
	FileService fileService;
		public void setFileService(FileService fileService) {this.fileService = fileService;}
	
	/**
	 * DI
	 */
	SharePointService sharePointService;
		public void setSharePointService(SharePointService sharePointService) {
			this.sharePointService = sharePointService;
		}

	/**
	 * @param srcFile
	 * @param tempFile
	 * @throws Exception
	 */
	public void processTargetFile(File srcFile, File tempFile) throws Exception {

		if(tempFile.exists()) {
			throw new SNSRunTimeException("Temp 파일이 존재합니다.");
		}
		
		FileUtils.copyFile(srcFile, tempFile);
	}

	@Override
    protected void executeInternal(JobExecutionContext arg0) throws JobExecutionException {

		JobDataMap jdm = arg0.getTrigger().getJobDataMap();
		long transferCnt = Long.valueOf((String) jdm.get("transferCnt"));
		runSharePointFileUpload(transferCnt);
	}
	
	/**
	 * 여러개의 WAS 가 동작하므로, 멀티프로세스에 의한 업로드가 발생하게 되니, 중복업로드 방지 로직이 필요.
	 * @param transferCnt
	 */
	private void runSharePointFileUpload(long transferCnt) {

		List<FeedFileVo> transferFileList = feedFileService.getTransferSharePointFileList(transferCnt);
		SharePointUploadFileVo sharePointUploadFileVo = null;
		
		FeedFileVo feedFileVo;
		String srcPathStr = null;
		Path tempFilePath = null;
		String tempPathStr = null;
		byte[] byteFileData = null;
		UpDocInfo upDocInfo = null;
		
		String sysType 	 = "01";
		String userId 	 = null;
		String siteId 	 = null;
		String folderId  = null;
		String fileName  = null;
		String fileSaveName = null;
		String snsGrpId  = null;
		String snsFeedId = null;
		UpResInfo resInfo = null;
		
		if(transferFileList != null && transferFileList.size() > 0) {

			File srcFile  = null;
			File tempFile = null;
			
			LOG.info("SharepointFileUploadJob start - count : " + transferFileList.size());
			
			for(FeedFileVo ffv: transferFileList) {
				sharePointUploadFileVo = new SharePointUploadFileVo();
				
				feedFileVo = feedFileService.getFeedFileById(ffv.getFileId());	// 파일 전송여부 확인
				if(feedFileVo.getIsTransfer() != 0) {
					continue;
				}

				userId 	 = ffv.getRegSyncKey();
				siteId 	 = ffv.getGroupVo().getTargetId();
				folderId  = ffv.getGroupVo().getFileRepoId();
				fileName  = ffv.getFileName();
				fileSaveName = ffv.getFileSaveName();
				snsGrpId  = String.valueOf(ffv.getGroupVo().getGroupId());
				snsFeedId = String.valueOf(ffv.getFeedId());

				// 저장 파일명
				srcPathStr = fileService.COMMON_FILE_REPOSITORY_PATH + ffv.getFileUrl() + File.separator + fileSaveName;
				
				// 실제 파일명
				tempPathStr = fileService.COMMON_FILE_PRGSSING_REPOSITORY_PATH + ffv.getFileUrl() + File.separator + fileName;
				
				srcFile = new File(srcPathStr);
				tempFile = new File(tempPathStr);
				
				if(tempFile.exists()) {
					// 업로드 대상파일이 존재하면 다른 프로세스가 처리하는 것으로 판단
					continue;
				}

				try {
					processTargetFile(srcFile, tempFile);
				} catch (SNSRunTimeException e) {
					LOG.info(e.getMessage());
					continue;
				} catch (Exception e) {
					doErrorWork(ffv);
					LOG.info("Temp 파일 생성시 에러.", e.getMessage());
					continue;
				}

				try {
					tempFilePath = Paths.get(tempPathStr);
					// 진행중 상태로 업데이트
					ffv.setIsTransfer(-1);
					feedFileService.updateTransferSuccess(ffv);
					
					byteFileData = null;
					try {
						byteFileData = Files.readAllBytes(tempFilePath);
					} catch (IOException e) {
						
						throw e;
					}

					upDocInfo = new UpDocInfo();
					
					ByteArrayDataSource rawData= new ByteArrayDataSource(byteFileData);
					DataHandler dHandelData= new DataHandler(rawData);
					StreamBody streamBody = new StreamBody();
					streamBody.setStreamBody(dHandelData);
					
					upDocInfo.setFileStream(streamBody);
					
					FileName fileNameClass = new FileName();
					fileNameClass.setFileName(fileName);
					
					FolderID folderIdClass = new FolderID();
					folderIdClass.setFolderID(folderId);
					
					SiteID siteIdClass = new SiteID();
					siteIdClass.setSiteID(siteId);
					
					SnsFeedID snsFeedIDClass = new SnsFeedID();
					snsFeedIDClass.setSnsFeedID(snsFeedId);
					
					SnsGroupID snsGroupIDClass = new SnsGroupID();
					snsGroupIDClass.setSnsGroupID(snsGrpId);
					
					SysType sysTypeClass = new SysType();
					sysTypeClass.setSysType(sysType);
					
					UserID userIDClass = new UserID();
					userIDClass.setUserID(userId);
					
					sharePointUploadFileVo.setUpDocInfoClass(upDocInfo);
					sharePointUploadFileVo.setFileNameClass(fileNameClass);
					sharePointUploadFileVo.setFolderIdClass(folderIdClass);
					sharePointUploadFileVo.setSiteIdClass(siteIdClass);
					sharePointUploadFileVo.setSnsFeedIdClass(snsFeedIDClass);
					sharePointUploadFileVo.setSnsGroupIdClass(snsGroupIDClass);
					sharePointUploadFileVo.setSysTypeClass(sysTypeClass);
					sharePointUploadFileVo.setUserIdClass(userIDClass);
					
					resInfo = sharePointService.processUploadFile(sharePointUploadFileVo);
					if(resInfo != null && !StringUtils.isEmpty(resInfo.getOWAUrl())) {
						ffv.setRepositoryType(SNSCodeMaster.REPOSITORY_TYPE.SHAREPOINT.name());
						ffv.setFileUrl(resInfo.getOWAUrl());
						ffv.setTransferDttm(new Date());
						ffv.setIsTransfer(1);
						
						feedFileService.updateTransferSuccess(ffv);
					} else {
						doErrorWork(ffv);
					}
				} catch (Exception e) {
					LOG.error("", e);

					doErrorWork(ffv);
				} finally {
					try { 
						if(tempFile != null) {
							tempFile.delete(); 
						}
					} catch(Exception e) { 
						LOG.error("", e); 
					}
				}
			}
		}
	}

	/**
	 * 
	 * @param ffv
	 * @return boolean
	 */
	private boolean doErrorWork(FeedFileVo ffv) {
		try {
			feedFileService.updateTransferFail(ffv);
		} catch(Exception e) {
			LOG.error("", e);
		}
		return true;
	}

}