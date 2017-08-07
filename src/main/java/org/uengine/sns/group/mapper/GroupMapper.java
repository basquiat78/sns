package org.uengine.sns.group.mapper;

import java.util.List;
import java.util.Map;

import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.group.vo.GroupVo;

/**
 * 
 * GroupMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/group/group.xml
 *
 */
public interface GroupMapper {
	
	void insertGroup(GroupVo groupVo);
	void updateGroup(GroupVo groupVo);
	void deleteGroup(long groupId);
	void deleteGroupList(Map<String, Object> map);
	
	int selectGroupListByconditionCnt(SearchContextVo scv);
	
	GroupVo selectGroupById(long groupId);
	GroupVo selectGroupByGroupName(SearchContextVo scv);
	
	List<GroupVo> selectGroupList();
	List<GroupVo> selectGroupListBySearchcondition(SearchContextVo scv);
	List<GroupVo> selectGroupListBycondition(SearchContextVo scv);
	List<GroupVo> selectGroupListByNewCondition(SearchContextVo scv);
	List<GroupVo> selectGroupListByRecommend(SearchContextVo scv);
	List<GroupVo> selectGroupBySynckey(String userId);

}