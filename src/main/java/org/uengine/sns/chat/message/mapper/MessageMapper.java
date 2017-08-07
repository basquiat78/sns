package org.uengine.sns.chat.message.mapper;

import java.util.List;
import java.util.Map;

import org.uengine.sns.chat.message.vo.MessageReadVo;
import org.uengine.sns.chat.message.vo.MessageVo;

/**
 * MessageMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/chat/message/message.xml
 *
 */
public interface MessageMapper {

	void insertMessage(MessageVo messageVo);
	void insertMessageRead(MessageReadVo messageReadVo);
	void updateMessageRead(MessageReadVo messageReadVo);
	void updateLastMessage(MessageVo messageVo);
	void deleteMessageRead(MessageReadVo messageReadVo);

	int selectUnreadMessageCount(long roomId);

	MessageReadVo selectMessageRead(MessageReadVo messageReadVo);

	List<MessageVo> selectMessageByRoomId(Map<String, String> map);

}