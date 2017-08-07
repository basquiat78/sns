package org.uengine.sns.recent.mapper;

import java.util.List;

import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.recent.vo.RecentVo;

/**
 * 
 * RecentMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/recent/recent.xml
 *
 */
public interface RecentMapper {

	void insertRecent(RecentVo recentVo);
	void updateRecent(RecentVo recentVo);
	void deleteRecent(long regMemberId);
	void deleteRecentActBatch(String s);
	
	List<RecentVo> selectRecentList(long regMemberId);
	
	List<NoticeVo> selectRecentActivityListByMember(long memberId);
	List<NoticeVo> selectRecentActivityListBySynckey(String userId);
	List<NoticeVo> selectRecentActivityListByGroup(long groupId);
	List<NoticeVo> selectGroupRecentActivityList(long groupId);
	
}
