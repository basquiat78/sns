package org.uengine.sns.feed.mapper;

import java.util.List;
import java.util.Map;

import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.vo.FollowerInfoVo;
import org.uengine.sns.feed.vo.FollowerVo;

/**
 * 
 * FollowerMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/feed/follower.xml
 *
 */
public interface FollowerMapper {

	void insertFollower(FollowerVo followerVo);
	void deleteFollower(FollowerVo followerVo);
	
	FollowerInfoVo selectFollowerInfoMember(long followerId);
	FollowerInfoVo selectFollowerInfoGroup(long followerId);
	
	List<FollowerVo> selectFollowerList(SearchContextVo scv);
	List<FollowerVo> selectFeedFollower(long feedId);
	List<FollowerVo> selectGroupListForAuto(Map<String, Object> map);
	List<FollowerVo> selectMemberListForAuto(Map<String, Object> map);
	List<FollowerVo> selectMemberListForAutoByAll(Map<String, Object> map);
	List<FollowerVo> selectFollowerDataList(Map<String, String> paramMap);

}