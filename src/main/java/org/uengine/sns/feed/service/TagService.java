package org.uengine.sns.feed.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.mapper.TagMapper;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.TagCloudVo;
import org.uengine.sns.feed.vo.TagVo;

/**
 * 
 * TagService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("tagService")
public class TagService {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(FollowerService.class);
	
	@Autowired
	TagMapper tagMapper;
	
	/**
	 * TAG 리스트
	 * @param scv
	 * @return List<TagVo>
	 */
	public List<TagVo> getTagList(SearchContextVo scv) {
		return tagMapper.selectTagList(scv);
	}
	
	/**
	 * @return List<TagCloudVo>
	 */
	public List<TagCloudVo> getTagCountList() {
		return tagMapper.selectTagCountList();
	}

	/**
	 * @param targetMemberId
	 * @return List<TagCloudVo>
	 */
	public List<TagCloudVo> selectTagCountListByMemberId(long targetMemberId) {
		return tagMapper.selectTagCountListByMemberId(targetMemberId);
	}
	
	/**
	 * @param scv
	 * @return List<TagCloudVo>
	 */
	public List<TagCloudVo> getTagCloudList(SearchContextVo scv) {
		return tagMapper.selectTagCloudList(scv);
	}
	
	/**
	 * TAG 등록(ArrayList)
	 * @param feedVo
	 * @param feedId
	 * @return List<TagVo>
	 */
	public List<TagVo> insertTag(FeedVo feedVo, Long feedId) {
		if(feedId == null) {
			new SNSServiceException("FEED_ID IS NULL");
		}
		
		List<TagVo> tagList = feedVo.getFeedTagList();
		
		if(tagList == null) {
			return null;
		}
		
		for(TagVo tv : tagList) {
			tv.setFeedId(feedId);
			tv.setRegMemberId(feedVo.getRegMemberId());
			insertTag(tv);
		}
		
		return tagList;
	}
	
	/**
	 * @param tagVo
	 * @return TagVo
	 */
	public TagVo insertTagByOne(TagVo tagVo) {
		insertTag(tagVo);
		return tagVo;
	}
	
	/**
	 * Tag 등록(공통)
	 * @param tagVo
	 * @return TagVo
	 */
	private TagVo insertTag(TagVo tagVo) {
		try {
			tagMapper.insertTag(tagVo);
		} catch(DuplicateKeyException e) {
			e.printStackTrace();
		}
		return tagVo;
	}
	
	/**
	 * 삭제
	 * @param tagVo
	 * @return TagVo
	 */
	public TagVo deleteTag(TagVo tagVo) {
		tagMapper.deleteTag(tagVo);
		return tagVo;
	}

}