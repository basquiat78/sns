package org.uengine.sns.group.mapper;

import java.util.List;
import java.util.Map;

import org.uengine.sns.group.vo.KnowledgeFeedVo;

/**
 * 
 * KnowledgeFeedMapper
 * @author @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/group/knowledge.xml
 *
 */
public interface KnowledgeFeedMapper {
	
	void insertKnowledgeFeed(KnowledgeFeedVo knowledgeVo);
	void updateKnowledgeFeed(KnowledgeFeedVo knowledgeVo);
	void deleteKnowledgeFeed(KnowledgeFeedVo knowledgeVo);
	
	KnowledgeFeedVo selectKnowledgeInfoByFeedId(Map<String, Long> map);
	
	List<KnowledgeFeedVo> selectKnowledgeFeedById(long groupId);

}