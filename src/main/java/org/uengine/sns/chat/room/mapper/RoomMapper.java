package org.uengine.sns.chat.room.mapper;

import java.util.List;
import java.util.Map;

import org.uengine.sns.chat.room.vo.RoomVo;

/**
 * 
 * RoomMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/chat/sroom/room.xml
 *
 */
public interface RoomMapper {

	void insertRoom(RoomVo roomVo);
	void updateRoomStatus(RoomVo roomVo);
	
	RoomVo selectRoomById(Map<String, String> map);
	
	List<RoomVo> selectAllRoomById(String userId);
	List<RoomVo> selectRoomByFlag(Map<String, String> map);
	List<RoomVo> selectRoomByEstablisherId(String establisherId);
	
}