package org.uengine.sns.noticeconfig.mapper;

import java.util.List;

import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.noticeconfig.vo.NoticeConfigVo;

/**
 * 
 * NoticeConfigMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/noticeconfig/noticeconfig.xml
 *
 */
public interface NoticeConfigMapper {

	void insertNoticeConfig(NoticeConfigVo noticeConfigVo);
	void deleteNoticeConfig(long noticeConfigId);

	NoticeConfigVo selectNoticeConfigByMemberId(long memId);
	
	List<NoticeConfigVo> selectNoticeConfigByFeedFollower(NoticeVo noticeVo);
	List<NoticeConfigVo> selectNoticeConfigByGroupFollower(NoticeVo noticeVo);
	List<NoticeConfigVo> selectNoticeConfigByMemberVo(NoticeVo noticeVo);
	
}
