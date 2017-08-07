package org.uengine.sns.chat.common.util;

import org.json.JSONObject;
import org.uengine.sns.chat.follower.vo.ChatFollowerVo;
import org.uengine.sns.chat.notice.vo.ChatNoticeVo;
import org.uengine.sns.chat.room.vo.RoomVo;
import org.uengine.sns.common.code.ChatCodeMaster;

/**
 * 
 * ChatMessageUtil
 * @author uEngine-basquiat (uEngine Solutions)
 * 
 */
public class ChatMessageUtil {

	/**
	 * 초대 메세지 생성
	 * @param noticeVo
	 * @return String
	 */
	public static String makeInviteNoticeMessage(ChatNoticeVo noticeVo) {
		JSONObject json = new JSONObject();
		json.put("messageType", noticeVo.getItemType());
		json.put("noticeId", noticeVo.getNoticeId());
		json.put("roomId", noticeVo.getItemId());
		json.put("message", noticeVo.getItemContent());
		return json.toString();
	}
	
	/**
	 * make status message
	 * @param roomVo
	 * @return String
	 */
	public static String makeStatusNoticeMessage(RoomVo roomVo) {
		JSONObject json = new JSONObject();
		json.put("roomId", roomVo.getRoomId());
		json.put("messageType", ChatCodeMaster.MESSAGE_TYPE.STATUS.name());
		json.put("status", roomVo.getStatus());
		String message = "";
		if(roomVo.getStatus().equals(ChatCodeMaster.ROOM_STATUS.STOP.name())) {
			message = "협상결렬 되었습니다.";
		} else if(roomVo.getStatus().equals(ChatCodeMaster.ROOM_STATUS.SUCCESS.name())) {
			message = "협상종료 되었습니다.";
		}
		json.put("message", message);
		return json.toString();
	}
	
	/**
	 * reload 메세지 생성
	 * @param ChatFollowerVo
	 * @return String
	 */
	public static String makeReloadMessage(ChatFollowerVo followerVo) {
		JSONObject json = new JSONObject();
		json.put("messageType", ChatCodeMaster.MESSAGE_TYPE.RELOAD.name());
		json.put("roomId", followerVo.getRoomId());
		json.put("followerId", followerVo.getFollowerId());
		json.put("follwerName", followerVo.getFollowerName());
		return json.toString();
	}

}