package org.uengine.sns.chat.room.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.chat.room.service.RoomService;
import org.uengine.sns.chat.room.vo.RoomVo;
import org.uengine.sns.common.ExceptionController;

/**
 * 
 * RoomController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class RoomController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(RoomController.class);
	
	@Autowired
	RoomService roomService;
	
	/**
	 * 채팅방 생성
	 * @param roomVo
	 * @return RoomVo
	 */
	@RequestMapping(value = "/chat/rooms", method = RequestMethod.POST)
	public @ResponseBody RoomVo createRoom(@RequestBody RoomVo roomVo) {
		return roomService.createRoom(roomVo);
	}
	
	/**
	 * 채팅방 생성
	 * @param roomVo
	 * @return RoomVo
	 */
	@RequestMapping(value = "/chat/rooms/follower", method = RequestMethod.POST)
	public @ResponseBody List<RoomVo> createRoomByFollower(@RequestBody RoomVo roomVo) {
		return roomService.createRoomByFollower(roomVo);
	}
	
	/**
	 * 사용자가 포함된 모든 채팅방
	 * @param userId
	 * @return ArrayList<RoomVo>
	 */
	@RequestMapping(value = "/chat/rooms/users/{userId}", method = RequestMethod.GET)
	public @ResponseBody List<RoomVo> getAllRoomById(@PathVariable("userId") String userId) {
		return roomService.getAllRoomById(userId);
	}
	
	/**
	 * 사용자에 의해 개설된 방
	 * @param userId
	 * @return ArrayList<RoomVo>
	 */
	@RequestMapping(value = "/chat/rooms/establishers/{establisherId}", method = RequestMethod.GET)
	public @ResponseBody List<RoomVo> getRoomByEstablisherId(@PathVariable("establisherId") String establisherId) {
		return roomService.getRoomByEstablisherId(establisherId);
	}
	
	/**
	 * RoomId에 해당하는 Room Data
	 * @param roomId
	 * @param userId
	 * @return RoomVo
	 */
	@RequestMapping(value = "/chat/rooms/{roomId}/users/{userId}", method = RequestMethod.GET)
	public @ResponseBody RoomVo getRoomById(@PathVariable("roomId") String roomId, @PathVariable("userId") String userId) {
		return roomService.getRoomById(roomId, userId);
	}
	
	/**
	 * roomflag에 해당하는 룸 리스트
	 * @param userId
	 * @param roomFlag
	 * @return
	 */
	@RequestMapping(value = "/chat/users/{userId}/flag/{roomFlag}", method = RequestMethod.GET)
	public @ResponseBody List<RoomVo> getRoomByFlag(@PathVariable("userId") String userId, @PathVariable("roomFlag") String roomFlag) {
		return roomService.selectRoomByFlag(userId, roomFlag);
	}
	
	/**
	 * 협상 관련 결과에 따른 룸의 스테이터스 업데이트
	 * @param messageReadVo
	 * @return
	 */
	@RequestMapping(value = "/chat/rooms/status", method = RequestMethod.PUT)
	public @ResponseBody RoomVo updateMessageRead(@RequestBody RoomVo roomVo) {
		return roomService.updateRoomStatus(roomVo);
	}
	
}