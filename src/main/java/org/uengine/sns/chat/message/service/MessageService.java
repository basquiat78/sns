package org.uengine.sns.chat.message.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.chat.message.mapper.MessageMapper;
import org.uengine.sns.chat.message.vo.MessageReadVo;
import org.uengine.sns.chat.message.vo.MessageVo;

/**
 * 
 * MessageService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("messageService")
public class MessageService {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MessageService.class);

	@Autowired
	MessageMapper messageMapper;

	/**
	 * 메세지 등록
	 * @param messageVo
	 * @return MessageVo
	 */
	public MessageVo sendMessage(MessageVo messageVo) {
		messageMapper.insertMessage(messageVo);
		// 해당 룸에 마지막 메세지를 갱신한다.
		updateLastMessage(messageVo);
		Date now = new Date();
		messageVo.setRegDttm(now);
		return messageVo;
	}

	/**
	 * 룸의 마지막 메세지를 업데이트 한다.
	 * @param messageVo
	 */
	public void updateLastMessage(MessageVo messageVo) {
		messageMapper.updateLastMessage(messageVo);
	}

	/**
	 * 채팅방 아이디에 해당하는 모든 메세지
	 * @param roomId
	 * @return ArrayList<MessageVo>
	 */
	public List<MessageVo> getMessageByRoomId(String roomId, String userId) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("roomId", roomId);
		map.put("userId", userId);
		return messageMapper.selectMessageByRoomId(map);
	}

	/**
	 * 메세지 읽음 여부 삽입
	 * @param messageReadVo
	 */
	public MessageReadVo insertMessageRead(MessageReadVo messageReadVo) {
		messageMapper.insertMessageRead(messageReadVo);
		return messageReadVo;
	}

	/**
	 * 메세지 읽음 여부 셀렉트
	 * @param messageReadVo
	 * @return
	 */
	public MessageReadVo selectMessageRead(MessageReadVo messageReadVo) {
		return messageMapper.selectMessageRead(messageReadVo);
	}

	/**
	 * 메세지 읽음 여부 갱신
	 * @param messageReadVo
	 */
	public MessageReadVo updateMessageRead(MessageReadVo messageReadVo) {
		messageMapper.updateMessageRead(messageReadVo);
		return messageReadVo;
	}

	/**
	 * 메세지 읽음 여부 삭제
	 * @param messageReadVo
	 */
	public MessageReadVo deleteMessageRead(MessageReadVo messageReadVo) {
		messageMapper.deleteMessageRead(messageReadVo);
		return messageReadVo;
	}

	/**
	 * 방에 읽지 않은 유저 카운트
	 * @param roomId
	 * @return
	 */
	public int getUnreadMessageCount(long roomId) {
		return messageMapper.selectUnreadMessageCount(roomId);
	}

}