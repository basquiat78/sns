package org.uengine.sns.recent.service;

import java.util.List;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.notice.mapper.NoticeMapper;
import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.recent.mapper.RecentMapper;
import org.uengine.sns.recent.vo.RecentVo;

/**
 * 
 * RecentService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("recentService")
public class RecentService {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(RecentService.class);

	@Autowired
	RecentMapper recentMapper;
	
	@Autowired
	NoticeMapper noticeMapper;
	
	@Autowired
	MemberService memberService;
	
	/**
	 * select all RecentList
	 * @param regMemberId
	 * @return List<RecentVo>
	 */
	public List<RecentVo> getRecentList(long regMemberId) {
		return recentMapper.selectRecentList(regMemberId);
	}
	
	/**
	 * insert Recent info
	 * @param recentVo
	 */
	public void insertRecent(RecentVo recentVo) {
		recentMapper.insertRecent(recentVo);
	}
	
	/**
	 * update Recent Info
	 * @param recentVo
	 */
	public void updateRecent(RecentVo recentVo) {
		Date now = new Date();
		recentVo.setUpdateDate(now);
		recentMapper.updateRecent(recentVo);
	}
	
	/**
	 * delete Recent Info
	 * @param regMemberId
	 */
	public void deleteRecent(long regMemberId) {
		recentMapper.deleteRecent(regMemberId);
	}
	
	/**
	 * delete Recent Act using Batch
	 * @param seq
	 */
	public void deleteRecentActBatch(String seq) {
		recentMapper.deleteRecentActBatch(seq);
	}
	
	/**
	 * 멤버 위젯에서 사용하는 개인 최신 현황
	 * @param memberId
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getMemberRecentActivityList(long memberId) {
		return recentMapper.selectRecentActivityListByMember(memberId);
	} 
	
	/**
	 * 그룹 위젯에서 사용할 그룹 최신 현황
	 * @param groupId
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getGroupRecentActivityList(long groupId) {
		return recentMapper.selectRecentActivityListByGroup(groupId);
	}
	
	/**
	 * 그룹 위젯에서 사용할 그룹 최신 현황(개선)
	 * @param groupId
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> selectGroupRecentActivityList(long groupId) {
		return recentMapper.selectGroupRecentActivityList(groupId);
	}

}