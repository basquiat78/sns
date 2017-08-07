package org.uengine.sns.group.mapper;

import java.util.List;
import java.util.Map;

import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.group.vo.GroupFollowerVo;

/**
 * 
 * GroupFollowerMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/group/groupfollower.xml
 *
 */
public interface GroupFollowerMapper {
	
	void insertGroupFollower(GroupFollowerVo groupFollowerVo);
	void updateGroupFollower(GroupFollowerVo groupFollowerVo);
	void updateGroupAccessDttm(GroupFollowerVo groupFollowerVo);
	void updateGroupRegDttmWithJoinStatus(GroupFollowerVo groupFollowerVo);
	void deleteGroupFollower(GroupFollowerVo groupFollowerVo);
	void deleteGroupFollowerByGroupId(long groupId);
	
	int insertGroupFollowerWithMemberList(Map<String, Object> map);

	GroupFollowerVo selectGroupFollower(Map<String, Object> map);

	List<GroupFollowerVo> selectGroupFollowerListByCondition(SearchContextVo scv);
	List<GroupFollowerVo> selectGroupFollowerById(Map<String, Object> map);
	List<GroupFollowerVo> selectGroupFollowerByIdForGroupInfo(Map<String, Object> map);

}