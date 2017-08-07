package org.uengine.sns.feed.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.mapper.PollMapper;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.PollVo;

/**
 * 
 * FeedPollService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("feedPollService")
public class FeedPollService {

	@Autowired
	PollMapper pollMapper;

	/**
	 * select poll list
	 * @param scv
	 * @return FeedVo
	 */
    public FeedVo selectPollList(SearchContextVo scv) {
        return pollMapper.selectPollList(scv);
    }
    
	/**
	 * select poll result list
	 * @param feedId
	 * @return List<PollVo>
	 */
    public List<PollVo> selectPollResultList(long feedId) {
        return pollMapper.selectPollResultList(feedId);
        
    }

	/**
	 * insert poll info
	 * @param feedVo
	 * @return FeedVo
	 */
    public FeedVo insertPollInfo(FeedVo feedVo) {
		
		List<PollVo> feedPollList = feedVo.getFeedPollList();
		for(PollVo pollVo : feedPollList) {
			pollVo.setFeedId(feedVo.getFeedId());
			pollMapper.insertPollInfo(pollVo);
		}
		
		return feedVo;
    }
    
	/**
	 * insert poll result info
	 * @param pollVo
	 * @return List<PollVo>
	 */
	public List<PollVo> insertPollResultInfo(PollVo pollVo) {
		pollMapper.insertPollResultInfo(pollVo);
		return pollMapper.selectPollResultList(pollVo.getFeedId());
    }
	
	/**
	 * insert poll result info
	 * @param pollVo
	 * @return List<PollVo>
	 */
	public List<PollVo> selectPollResult(long feedId) {
		return pollMapper.selectPollResultList(feedId);
    }
	
	/**
	 * delete poll Info
	 * @param feedVo
	 */
	public void deletePollInfo(FeedVo feedVo) {
		pollMapper.deletePollInfo(feedVo);
	}
	
	/**
	 * delete Poll ResultInfo
	 * @param pollVo
	 */
	public void deletePollResultInfo(PollVo pollVo) {
		pollMapper.deletePollResultInfo(pollVo);
	}
	
	/**
	 * delete poll list Info
	 * @param feedVo
	 */
	public void deletePollResultListInfo(FeedVo feedVo) {
		pollMapper.deletePollResultListInfo(feedVo);
	}

}