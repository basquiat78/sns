package org.uengine.sns.chat.room.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.uengine.sns.chat.common.util.ChatMessageUtil;
import org.uengine.sns.chat.follower.service.ChatFollowerService;
import org.uengine.sns.chat.follower.vo.ChatFollowerVo;
import org.uengine.sns.chat.message.service.MessageService;
import org.uengine.sns.chat.notice.service.ChatNoticeService;
import org.uengine.sns.chat.notice.vo.ChatNoticeVo;
import org.uengine.sns.chat.room.mapper.RoomMapper;
import org.uengine.sns.chat.room.vo.RoomVo;
import org.uengine.sns.common.code.ChatCodeMaster;
import org.uengine.sns.websocket.service.WsSessionStore;

/**
 * 
 * Room Service
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("roomService")
public class RoomService {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(RoomService.class);

	@Autowired
	RoomMapper roomMapper;
	
	@Autowired
	MessageService messageService;
	
	@Autowired
	ChatFollowerService chatFollowerService;
	
	@Autowired
	ChatNoticeService chatNoticeService;
	
	/**
	 * 채팅방 생성
	 * @param roomVo
	 * @return RoomVo
	 * @throws IOException 
	 */
	public RoomVo createRoom(RoomVo roomVo) {
		
		Date now = new Date();
		roomVo.setRegDttm(now);
		
		roomMapper.insertRoom(roomVo);
		
		List<ChatFollowerVo> followerList = roomVo.getFollowerList();
		for(ChatFollowerVo chatFollower : followerList) {
			chatFollower.setRegDttm(now);
			chatFollower.setRoomId(roomVo.getRoomId());
			chatFollowerService.addChatFollower(chatFollower);
		}
		
		// 웹소켓 브로드 캐스팅 
		for(ChatFollowerVo chatFollower : followerList) {
			// 방을 생성한 사람을 제외한 나머지 팔로워에게 노티 알람
			if(	!roomVo.getEstablisherId().equals(chatFollower.getFollowerId()) ) {
				this.inviteToFollower(chatFollower, roomVo);
			}
		}
		
		return roomVo;
	}
	
	/**
	 * 채팅방 생성
	 * @param roomVo
	 * @return ArrayList<RoomVo>
	 * @throws IOException 
	 */
	public List<RoomVo> createRoomByFollower(RoomVo roomVo) {
		
		Date now = new Date();
		roomVo.setRegDttm(now);
		List<RoomVo> roomList = new ArrayList<RoomVo>();
		
		// 룸 생성시 개설자를 위한 고유 ROOM_FLAG을 생성한다.
		String roomFlag = UUID.randomUUID().toString();
		
		List<ChatFollowerVo> followerList = roomVo.getFollowerList();
		for(ChatFollowerVo chatFollower : followerList) {
			
			RoomVo vo = new RoomVo();
			vo.setRoomTitle(roomVo.getRoomTitle());
			vo.setEstablisherId(roomVo.getEstablisherId());
			vo.setEstablisherName(roomVo.getEstablisherName());
			vo.setRoomFlag(roomFlag);
			
			// 협상자 정보 인서트
			roomMapper.insertRoom(vo);
			chatFollower.setRegDttm(now);
			chatFollower.setRoomId(vo.getRoomId());
			chatFollowerService.addChatFollower(chatFollower);
			
			// 거래자 정보 인서트
			ChatFollowerVo establisherVo = new ChatFollowerVo();
			establisherVo.setFollowerId(roomVo.getEstablisherId());
			establisherVo.setFollowerName(roomVo.getEstablisherName());
			establisherVo.setRegDttm(now);
			establisherVo.setRoomId(vo.getRoomId());
			chatFollowerService.addChatFollower(establisherVo);
			this.inviteToFollower(chatFollower, vo);
			roomList.add(vo);
		}
		
		return roomList;
	}
	
	/**
	 * 사용자가 포함된 모든 채팅방 조회
	 * @param userId
	 * @return ArrayList<RoomVo>
	 */
	public List<RoomVo> getAllRoomById(String userId) {
		return roomMapper.selectAllRoomById(userId);
	}
	
	/**
	 * roomFlag에 해당하는 채팅방 조회
	 * @param userId
	 * @param roomFlag
	 * @return RoomVo
	 */
	public List<RoomVo> selectRoomByFlag(String userId, String roomFlag) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userId", userId);
		map.put("roomFlag", roomFlag);
		return roomMapper.selectRoomByFlag(map);
	}
	
	/**
	 * 사용자에 의해 개설된 방
	 * @param userId
	 * @return RoomVo
	 */
	public List<RoomVo> getRoomByEstablisherId(String establisherId) {
		return roomMapper.selectRoomByEstablisherId(establisherId);
	}
	
	/**
	 * roomId에 해당하는 Room Data
	 * @param roomId
	 * @return RoomVo
	 */
	public RoomVo getRoomById(String roomId, String userId) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("roomId", roomId);
		map.put("userId", userId);
		return roomMapper.selectRoomById(map);
	}
	
	/**
	 * room status 갱신
	 * @param roomVo
	 * @return RoomVo
	 */
	public RoomVo updateRoomStatus(RoomVo roomVo) {
		roomMapper.updateRoomStatus(roomVo);
		
		List<ChatFollowerVo> followerList = roomVo.getFollowerList();
		// room status를 갱신 이후 룸에 해당하는 팔로워에게 웹소켓
		for(ChatFollowerVo chatFollower : followerList) {
			this.statusNoticeToFollower(chatFollower, roomVo);
		}
		
		return roomVo;
	}
	
	/**
	 * 방 생성시 참여한 사람의 정보가 넘어온다면 해당 유저에게 노티 알람을 줘야한다.
	 * @param followerVo
	 * @param roomVo
	 * @throws IOException 
	 */
	private void inviteToFollower(ChatFollowerVo chatFollowerVo, RoomVo roomVo) {
		
		/**
		 * 노티 정보 저장
		 */
		ChatNoticeVo vo = new ChatNoticeVo();
		vo.setItemId(roomVo.getRoomId());
		vo.setItemType(ChatCodeMaster.MESSAGE_TYPE.INVITE.name());
		vo.setItemTitle(roomVo.getRoomTitle());
		vo.setFromFollowerId(roomVo.getEstablisherId());
		vo.setFromFollowerName(roomVo.getEstablisherName());
		vo.setToFollowerId(chatFollowerVo.getFollowerId());
		vo.setToFollowerName(chatFollowerVo.getFollowerName());
		
		StringBuffer itemContent = new StringBuffer();;
		itemContent.append(roomVo.getEstablisherName())
						  .append("님이 [")
						  .append(roomVo.getRoomTitle())
						  .append("]방으로 ")
						  .append(chatFollowerVo.getFollowerName())
						  .append("님을 초대하였습니다.");
		
		vo.setItemContent(itemContent.toString());
		chatNoticeService.insertChatNotice(vo);
		
		/**
		 * 웹소켓으로 캐스팅
		 */
		List<WebSocketSession> storeSessionList = WsSessionStore.getSessionByUserId(chatFollowerVo.getFollowerId());
		if(storeSessionList != null) {
			String noticeContent = ChatMessageUtil.makeInviteNoticeMessage(vo);
			try {
				for(WebSocketSession webSocketSession :  storeSessionList) {
					webSocketSession.sendMessage(new TextMessage(noticeContent));
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
	}
	
	/**
	 * 
	 * @param chatFollowerVo
	 * @param roomVo
	 */
	private void statusNoticeToFollower(ChatFollowerVo chatFollowerVo, RoomVo roomVo) {
		/**
		 * 웹소켓으로 캐스팅
		 */
		List<WebSocketSession> storeSessionList = WsSessionStore.getSessionByUserId(chatFollowerVo.getFollowerId());
		if(storeSessionList != null) {
			String noticeStatusContent = ChatMessageUtil.makeStatusNoticeMessage(roomVo);
			try {
				for(WebSocketSession webSocketSession :  storeSessionList) {
					webSocketSession.sendMessage(new TextMessage(noticeStatusContent));
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
	}
	
}