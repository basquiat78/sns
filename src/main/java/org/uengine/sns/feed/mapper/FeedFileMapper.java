package org.uengine.sns.feed.mapper;

import java.util.List;
import java.util.Map;

import org.uengine.sns.feed.vo.FeedFileVo;

/**
 * 
 * FeedFileMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/feed/feedfile.xml
 *
 */
public interface FeedFileMapper {

	void insertFeedFile(FeedFileVo feedFileVo);
	void updateTransferSuccess(FeedFileVo feedFileVo);
	void updateTransferFail(FeedFileVo feedFileVo);

	FeedFileVo selectFeedFileById(long fileid);
	
	List<FeedFileVo> selectFeedFileListByMe(Map<String, Object> map);
	List<FeedFileVo> selectFeedFileListByGroup(Map<String, Object> map);
	List<FeedFileVo> selectTransferSharePointFileList(long transferCnt);

}