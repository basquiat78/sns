package org.uengine.sns.noticeconfig.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.member.mapper.MemberMapper;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.noticeconfig.mapper.NoticeConfigMapper;
import org.uengine.sns.noticeconfig.vo.NoticeConfigVo;

/**
 * 
 * NoticeConfigService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("noticeConfigService")
public class NoticeConfigService {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(NoticeConfigService.class);
	
	@Autowired
	NoticeConfigMapper noticeConfigMapper;
	
	@Autowired
	MemberMapper memberMapper;
	
	/**
	 * select notice config info by memberId
	 * @param memberId
	 * @return NoticeConfigVo
	 */
	public NoticeConfigVo getNoticeConfigByMemberId(long memberId) {
		return noticeConfigMapper.selectNoticeConfigByMemberId(memberId);
	}
	
	/**
	 * 피드의 팔로워된 팔로워 리스트들의 멤버 알림 설정 정보 취득
	 * @param noticeVo
	 * @return List<NoticeConfigVo>
	 */
	public List<NoticeConfigVo> getNoticeConfigByFeedFollower(NoticeVo noticeVo) {
		return noticeConfigMapper.selectNoticeConfigByFeedFollower(noticeVo);
	}
	
	/**
	 * @param noticeVo
	 * @return List<NoticeConfigVo>
	 */
	public List<NoticeConfigVo> getNoticeConfigByGroupFollower(NoticeVo noticeVo) {
		return noticeConfigMapper.selectNoticeConfigByGroupFollower(noticeVo);
	}
	
	/**
	 * 알림 설정 정보 취득
	 * @param noticeVo
	 * @return List<NoticeConfigVo>
	 */
	public List<NoticeConfigVo> getNoticeConfigByMemberVo(NoticeVo noticeVo) {
		return noticeConfigMapper.selectNoticeConfigByMemberVo(noticeVo);
	}
	
	
	/**
	 * insert notice config info
	 * @param noticeConfigVo
	 * @return NoticeConfigVo
	 */
	public NoticeConfigVo insertNoticeConfig(NoticeConfigVo noticeConfigVo) {
		MemberVo mv = new MemberVo();
		mv.setMemberId(noticeConfigVo.getMemberId());
		mv.setIsEnter(noticeConfigVo.getIsEnter());
		memberMapper.updateMember(mv);
		noticeConfigMapper.insertNoticeConfig(noticeConfigVo);
		return noticeConfigVo;
	}
	
	/**
	 * delete notice config Info
	 * @param memberId
	 */
	public void deleteNoticeConfig(long memberId) {
		noticeConfigMapper.deleteNoticeConfig(memberId);
	}

}