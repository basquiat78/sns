package org.uengine.sns.feed.mapper;

import java.util.List;
import java.util.Map;

import org.uengine.sns.feed.vo.LikeItVo;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * LikeItMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/feed/likeit.xml
 *
 */
public interface LikeItMapper {

	void insertLikeIt(LikeItVo likeItVo);
	void updateFeedLikeCnt(LikeItVo likeItVo);
	void deleteLikeIt(LikeItVo likeItVo);
	
	int selectLikeIt(LikeItVo likeItVo);

	List<MemberVo> selectLikeItMemberList(Map<String, Object> map);

}