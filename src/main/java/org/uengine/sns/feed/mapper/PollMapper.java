package org.uengine.sns.feed.mapper;

import java.util.List;

import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.PollVo;

/**
 * 
 * PollMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/feed/poll.xml
 *
 */
public interface PollMapper {

	void insertPollFeedInfo(FeedVo feedVo);
	void insertPollInfo(PollVo pollVo);
	void insertPollResultInfo(PollVo pollVo);
	void updatePollFeedInfo(FeedVo feedVo);
	void updatePollInfo(PollVo pollVo);
	void deletePollFeedInfo(FeedVo feedVo);
	void deletePollInfo(FeedVo feedVo);
	void deletePollResultInfo(PollVo pollVo);
	void deletePollResultListInfo(FeedVo feedVo);

	PollVo selectPollByFeedId(long feedId);
	
	FeedVo selectPollList(SearchContextVo scv);
	FeedVo selectAllSystemFeedList(SearchContextVo scv);

	List<PollVo> selectPollResultList(long feedId);
	List<PollVo> selectPollFeedInfo(long feedId);

}