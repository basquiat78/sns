package org.uengine.sns.feed.mapper;

import java.util.Map;

import org.uengine.sns.feed.vo.FeedVo;

/**
 *
 * FeedInterfaceMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/openapi/feedInterface.xml
 *
 */
public interface FeedInterfaceMapper {
	
	long insertExternalToDoFeed(FeedVo feedVo);
	
	void insertExternalToDoPerson(Map<String, Object> map);

}