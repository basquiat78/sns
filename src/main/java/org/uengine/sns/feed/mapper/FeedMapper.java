package org.uengine.sns.feed.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.vo.CalendarVo;
import org.uengine.sns.feed.vo.FeedFileVo;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.FollowerVo;
import org.uengine.sns.feed.vo.TagVo;
import org.uengine.sns.notice.vo.NoticeVo;

/**
 * 
 * FeedMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/feed/feed.xml
 *
 */
public interface FeedMapper {
	
	void insertFeedHistory(Map<String, Object> map);
	void completeToDoFeed(FeedVo feedVo);
	void incompleteToDoFeed(FeedVo feedVo);
	void setFeedDueDate(FeedVo feedVo);
	void disMountCommentCountParentFeed(long feedId);
	void updateFeedByComment(FeedVo feed);
	void approvalComplete(FeedVo feedVo);
	void updateFeedCmtLstRegDttm(FeedVo feedVo);
	void updateFeed(FeedVo feedVo);
	void updateFeedLikeCntPlus(long feedId);
	void updateFeedLikeCntMinus(long feedId);
	void updateShareCnt(long feedId);
	void updateCommentFeedPerSeq(long pFeedId);
	void updateCommentFeedPerSeqByDelete(Map<String, Object> map);
	void deleteFeed(long feedId);
	
	Long insertFeed(FeedVo feedVo);
	
	FeedVo selectGetFeed(Map<String, Object> map);
	FeedVo selectGetFeedWithInf(Map<String, Object> map);
	
	List<FollowerVo> selectFeedFollowerList(Map<String, Object> map);
	
	List<TagVo> selectFeedTagList(FeedVo oneFeedVo);
	
	List<FeedFileVo> selectFeedFileList(FeedVo oneFeedVo);
	
	List<CalendarVo> selectFeedCalendarList(CalendarVo calendarVo);
	
	List<HashMap<String, Object>> selectFeedForFeedDownload(HashMap<String, Object> h);
	
	List<Long> selectFeedIdList(Map<String, Object> map);
	List<Long> selectGroupFeedIdList(Map<String, Object> map);
	List<Long> selectMemberFeedIdList(SearchContextVo scv);
	List<Long> selectGroupKnwldgeFeedIdList(SearchContextVo scv);
	List<Long> selectBookmarkFeedIdList(SearchContextVo scv);
	List<Long> selectHashTagFeedIdList(SearchContextVo scv);
	List<Long> selectGroupFeedIdListByRegDttm(NoticeVo noticeVo);
	List<Long> selectFeedIdAtMemberFeed(Map<String, Object> map);
	List<Long> selectCommentFeedIdList(long getpFeedId);
	
	List<FeedVo> selectFeedList(Map<String, Object> map);
	List<FeedVo> selectFeedCommentList(Map<String, Object> map);
	List<FeedVo> selectAllSystemFeedList(SearchContextVo scv);
	List<FeedVo> selectCommentListByRegDttm(Map<String, Object> map);
	List<FeedVo> selectFeedCommentListByLimit(Map<String, Object> map);
	List<FeedVo> selectTomorrowToDoFeedList(SearchContextVo scv);
	List<FeedVo> selectToDoFeedList(SearchContextVo scv);
	List<FeedVo> selectGroupToDoFeedList(SearchContextVo scv);
	
}