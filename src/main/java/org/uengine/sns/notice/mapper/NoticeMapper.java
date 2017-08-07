package org.uengine.sns.notice.mapper;

import java.util.List;

import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.notice.vo.NoticeVo;

/**
 * 
 * NoticeMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/notice/notice.xml
 *
 */
public interface NoticeMapper {

	void insertNotice(NoticeVo noticeVo);
	void updateNotice(NoticeVo noticeVo);
	void updateNoticeRead(NoticeVo noticeVo);
	void deleteNotice(long notiId);
	
	int selectNoticeUserByDateCount(NoticeVo noticeVo);
	
	NoticeVo selectNoticeCntById(long memberId);
	NoticeVo selectNoticeCntByUserId(String userId);
	
	List<Long> selectNoticeMembersByDate(String dateStr);
	
	List<String> selectNoticeUsersByDate(String dateStr);
	
	List<NoticeVo> selectRecentActListBySynckey(String userId);
	List<NoticeVo> selectWidgetNoticeList(SearchContextVo scv);
	List<NoticeVo> selectNoticeList(SearchContextVo scv);
	List<NoticeVo> selectNoticeById(long memberId);
	List<NoticeVo> selectNoticeBySynckey(String userId);
	List<NoticeVo> selectNoticeByRegDttm(NoticeVo noticeVo);
	List<NoticeVo> selectTotalNoticeListBySynckey(NoticeVo noticeVo);

}