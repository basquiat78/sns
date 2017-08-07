package org.uengine.sns.feed.mapper;

import java.util.List;

import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.vo.TagCloudVo;
import org.uengine.sns.feed.vo.TagVo;

/**
 * 
 * TagMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/feed/tag.xml
 *
 */
public interface TagMapper {

	void insertTag(TagVo tagVo);
	void deleteTag(TagVo tagVo);
	
	List<TagVo> selectTagList(SearchContextVo scv);
	
	List<TagCloudVo> selectTagCloudList(SearchContextVo scv);
	List<TagCloudVo> selectTagCountList();
	List<TagCloudVo> selectTagCountListByMemberId(long targetMemberId);

}