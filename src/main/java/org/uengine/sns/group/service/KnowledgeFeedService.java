package org.uengine.sns.group.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.group.mapper.KnowledgeFeedMapper;
import org.uengine.sns.group.vo.KnowledgeFeedVo;

/**
 * 
 * KnowledgeFeedService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("knowledgeFeedService")
public class KnowledgeFeedService {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(KnowledgeFeedService.class);

	@Autowired
	KnowledgeFeedMapper knowledgeFeedMapper;
	
	@Autowired
	FeedService feedService; 
	
	/**
	 * @param feedId
	 * @return KnowledgeFeedVo
	 */
	public KnowledgeFeedVo getKnowledgeInfoByFeedId(long feedId) {
		Map<String, Long> map = new HashMap<String, Long>();
		map.put("feedId", feedId);
		return knowledgeFeedMapper.selectKnowledgeInfoByFeedId(map);
	}
	
	
	/**
	 * select KnowledgeFeed by groupId
	 * @param groupId
	 * @return List<KnowledgeFeedVo>
	 */
	public List<KnowledgeFeedVo> getKnowledgeFeedById(long groupId) {
		return knowledgeFeedMapper.selectKnowledgeFeedById(groupId);
	}

	/**
	 * @param lang
	 * @param scv
	 * @param sessionMemberId
	 * @return List<FeedVo>
	 */
	public List<FeedVo> getKnowledgeFeedByGroupId(String lang, SearchContextVo scv, long sessionMemberId) {
		scv.menuType(SNSCodeMaster.FEED_SEARCH_TYPE.GROUP_KNOWLEDGE.toString());
		return feedService.getFeedList(lang, scv, sessionMemberId);
	}
	
	/**
	 * insert KnowledgeFeed info
	 * @param knowledgeVo
	 * @return KnowledgeFeedVo
	 */
	public KnowledgeFeedVo insertKnowledgeFeed(KnowledgeFeedVo knowledgeVo) {
		knowledgeFeedMapper.insertKnowledgeFeed(knowledgeVo);
		return knowledgeVo;
	}
	
	/**
	 * update KnowledgeFeed Info
 	 * @param knowledgeVo
	 * @return KnowledgeFeedVo
	 */
	public KnowledgeFeedVo updateKnowledgeFeed(KnowledgeFeedVo knowledgeVo) {
		knowledgeFeedMapper.updateKnowledgeFeed(knowledgeVo);
		return knowledgeVo;
	}
	
	/**
	 * delete KnowledgeFeed Info
	 * @param knowledgeVo
	 * @return KnowledgeFeedVo
	 */
	public KnowledgeFeedVo deleteKnowledgeFeed(KnowledgeFeedVo knowledgeVo) {
		knowledgeFeedMapper.deleteKnowledgeFeed(knowledgeVo);
		return knowledgeVo;
	}

}