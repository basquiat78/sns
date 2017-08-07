package org.uengine.sns.chat.notice.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.chat.follower.service.ChatFollowerService;
import org.uengine.sns.chat.follower.vo.ChatFollowerVo;
import org.uengine.sns.chat.notice.mapper.ChatNoticeMapper;
import org.uengine.sns.chat.notice.vo.ChatNoticeVo;
import org.uengine.sns.common.code.ChatCodeMaster;
import org.uengine.sns.websocket.service.WsSessionStore;
import org.uengine.sns.websocket.vo.WebSocketVo;

/**
 * 
 * ChatNoticeService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("chatNoticeService")
public class ChatNoticeService {
	
	private static final Logger LOG = LoggerFactory.getLogger(ChatNoticeService.class);

	@Autowired
	ChatFollowerService chatFollowerService;
	
	@Autowired
	ChatNoticeMapper chatNoticeMapper;
	
	/**
	 * ChatNotice 세팅
	 * @param message
	 */
	public void setChatNotice(String message) {
		LOG.info("setChatNotice Info: " + message);
	}
	
	/**
	 * 웹소켓의 세션으로부터 접속된 인원 정보를 가져온다.
	 * @return JSONObject
	 */
	public JSONObject getConnectUserInfo() {
		
		Collection<WebSocketVo> webSocketVoList = WsSessionStore.getWebSocketVoList();
		JSONObject json = new JSONObject();
		json.put("messageType", ChatCodeMaster.MESSAGE_TYPE.NOTICE.name());
		json.put("message", "현재 접속자 수는 " + webSocketVoList.size() + "명 입니다.");
		json.put("connectUsers", WsSessionStore.getConnectUsersInfo());
		
		return json;
	}

	/**
	 * 초대한 사람의 정보를 등록한다.
	 * @param chatNoticeVo
	 * @return List<ChatNoticeVo>
	 */
	public List<ChatNoticeVo> inviteChatFollowers(ChatNoticeVo chatNoticeVo) {
		List<ChatFollowerVo> noticeFollowerList = chatNoticeVo.getNoticeFollowerList();
		List<ChatNoticeVo> resultNoticeVoList = new ArrayList<ChatNoticeVo>();
		
		for(ChatFollowerVo chatFollowerVo : noticeFollowerList) {
			ChatNoticeVo vo = new ChatNoticeVo();
			vo.setItemId(chatNoticeVo.getItemId());
			vo.setItemType(chatNoticeVo.getItemType());
			vo.setItemTitle(chatNoticeVo.getItemTitle());
			vo.setFromFollowerId(chatNoticeVo.getFromFollowerId());
			vo.setFromFollowerName(chatNoticeVo.getFromFollowerName());
			vo.setToFollowerId(chatFollowerVo.getFollowerId());
			vo.setToFollowerName(chatFollowerVo.getFollowerName());
			
			StringBuffer itemContent = new StringBuffer();;
			itemContent.append(chatNoticeVo.getFromFollowerName())
							  .append("님이 [")
							  .append(chatNoticeVo.getItemTitle())
							  .append("]방으로 ")
							  .append(chatFollowerVo.getFollowerName())
							  .append("님을 초대하였습니다.");
			
			vo.setItemContent(itemContent.toString());
			this.insertChatNotice(vo);
			chatFollowerVo.setRoomId(chatNoticeVo.getItemId());
			chatFollowerService.addChatFollower(chatFollowerVo);
			
			resultNoticeVoList.add(vo);
		}
		
		return resultNoticeVoList;
	}
	
	/**
	 * Notice 등록
	 * @param chatNoticeVo
	 */
	public void insertChatNotice(ChatNoticeVo chatNoticeVo) {
		chatNoticeMapper.insertChatNotice(chatNoticeVo);
	}
	
	/**
	 * 노티스 가져오기
	 * @param userId
	 * @return List<ChatNoticeVo>
	 */
	public List<ChatNoticeVo> getChatNotice(String userId) {
		return chatNoticeMapper.selectChatNotice(userId);
	}
	
	/**
	 * 노티스 업데이트
	 * @param noticeId
	 * @return ChatNoticeVo
	 */
	public ChatNoticeVo readChatNotice(long noticeId) {
		chatNoticeMapper.updateChatNotice(noticeId);
		ChatNoticeVo returnVo = new ChatNoticeVo();
		returnVo.setNoticeId(noticeId);
		returnVo.setIsRead(1);
		return returnVo;
	}

}