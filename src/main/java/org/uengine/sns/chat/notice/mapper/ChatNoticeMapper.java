package org.uengine.sns.chat.notice.mapper;

import java.util.List;

import org.uengine.sns.chat.notice.vo.ChatNoticeVo;

/**
 * 
 * ChatNoticeMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/chat/chatnotice/chatnotice.xml
 *
 */
public interface ChatNoticeMapper {

	void insertChatNotice(ChatNoticeVo chatNoticeVo);
	void updateChatNotice(long noticeId);

	List<ChatNoticeVo> selectChatNotice(String userId);

}