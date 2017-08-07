package org.uengine.sns.feed.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.util.FileUtil;
import org.uengine.sns.feed.mapper.FeedFileMapper;
import org.uengine.sns.feed.vo.FeedFileVo;

/**
 * 
 * FeedFileService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("feedFileService")
public class FeedFileService {

	private static final Logger LOG = LoggerFactory.getLogger(FeedFileService.class);

	@Value("#{conf['common.file.repository.path']}")
	public String COMMON_FILE_REPOSITORY_PATH;
	
	@Value("#{conf['common.file.tmp.path']}")
	public String COMMON_FILE_TMP_PATH;
	
	@Autowired
	private FeedFileMapper feedFileMapper;
	
	/**
	 * 피드 첨부 파일 추가
	 * @param feedFileList
	 * @param feedId
	 * @param companyId
	 * @return List<FeedFileVo>
	 */
	public List<FeedFileVo> insertFeedFile(List<FeedFileVo> feedFileList, Long feedId, String companyId) {
		
		if(feedId == null) {
			throw new SNSServiceException("FEED_ID IS NULL");
		}
		
		if(feedFileList == null) return null;
		
		List<FeedFileVo> returnList = new ArrayList<FeedFileVo>();
		
		for(FeedFileVo ffVo : feedFileList){
			ffVo.setFeedId(feedId);
			
			String realRepostoryDir = COMMON_FILE_REPOSITORY_PATH + companyId 
					+ File.separator + "sns"+ File.separator +"attaches" + File.separator
					+ FileUtil.makeFileDir() + File.separator + feedId;
			
			File realDir = new File(realRepostoryDir);
			 
	        if(!realDir.exists()) { //폴더 없으면 폴더 생성
	        	realDir.mkdirs();
	        }
	        
	        UUID uuid = UUID.randomUUID();
			
	        if(ffVo.getTempFileName() != null) {	// 파일이 로컬인경우	j.h kim 2015.10.13 ADD
	        	
		        File srcFile  = new File(COMMON_FILE_TMP_PATH+ ffVo.getFileUrl());
		        File destFile = new File(realRepostoryDir+ File.separator + uuid + "." + ffVo.getFileExt());
		        
		        try {
					FileUtils.copyFile(srcFile, destFile);
					ffVo.setFileUrl(companyId + File.separator + "sns"+ File.separator +"attaches" + File.separator + FileUtil.makeFileDir() + File.separator + feedId);
					ffVo.setFileSaveName(uuid.toString() + "." + ffVo.getFileExt());
		        	feedFileMapper.insertFeedFile(ffVo);
					returnList.add(ffVo);
				} catch (IOException e) {
					LOG.error("", e);
					throw new SNSServiceException("파일 등록시 오류가 발생했습니다.");
				}
	        } else {
	        	feedFileMapper.insertFeedFile(ffVo);
				returnList.add(ffVo);
	        }
		}
		
		return returnList;
	}

	/**
	 * 단일 첨부 파일
	 * @param fileId
	 * @return FeedFileVo
	 */
	public FeedFileVo getFeedFileById(long fileId) {
		return feedFileMapper.selectFeedFileById(fileId);
	}

	/**
	 * 개인 첨부파일 리스트
	 * @param lang
	 * @param memberId
	 * @param fileId
	 * @param extMemberId
	 * @return List<FeedFileVo>
	 */
	public List<FeedFileVo> getFeedFileListByMe(String lang, long memberId, long fileId, long extMemberId) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("memberId", memberId);
		map.put("fileId", fileId);
		if(extMemberId == 0) {
			map.put("extMemberId", memberId);
		} else {
			map.put("extMemberId", extMemberId);
		}
		return feedFileMapper.selectFeedFileListByMe(map);
		
	}
	
	/**
	 * 그룹별 첨부파일 리스트
	 * @param lang
	 * @param groupId
	 * @param fileId
	 * @return List<FeedFileVo>
	 */
	public List<FeedFileVo> getFeedFileListByGroup(String lang, long groupId, long fileId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("groupId", groupId);
		map.put("fileId", fileId);
		return feedFileMapper.selectFeedFileListByGroup(map);
	}
	
	/**
	 * 쉐어포인트로 전환할 파일 리스트 취득
	 * @param transferCnt
	 * @return List<FeedFileVo>
	 */
	public List<FeedFileVo> getTransferSharePointFileList(long transferCnt) {
		return feedFileMapper.selectTransferSharePointFileList(transferCnt);
	}
	
	/**
	 * 쉐어포인트 파일 전환 성공
	 * @param feedFileVo
	 */
	public void updateTransferSuccess(FeedFileVo feedFileVo) {
		feedFileMapper.updateTransferSuccess(feedFileVo);
	}
	
	/**
	 * 쉐어포인트 파일 전환 실패
	 * @param feedFileVo
	 */
	public void updateTransferFail(FeedFileVo feedFileVo) {
		feedFileMapper.updateTransferFail(feedFileVo);
	}

}