package org.uengine.sns.websocket.service;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.socket.WebSocketSession;
import org.uengine.sns.websocket.vo.WebSocketVo;

/**
 * 
 * WsSessionStore
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class WsSessionStore {
	
	private static final Map<String, WebSocketVo> wsSessionsMap = new ConcurrentHashMap<String, WebSocketVo>();
	
	/**
	 * 웹소켓 세션을 리스트에 저장하고 해당 세션을 유저 키값으로 맵에도 저장한다.
	 * ScheduleJob에서 해당 유저의 세션 정보를 userId로 찾기 위함
	 * @param webSocketVo
	 */
	public static void addSession(WebSocketVo webSocketVo) {
		wsSessionsMap.put(webSocketVo.getUserId(), webSocketVo);
	}

	/**
	 * userId로 저장된 WebSocketVo를 가져온다.
	 * @param userId
	 * @return WebSocketVo
	 */
	public static WebSocketVo getWebSocketVoById(String userId) {
		WebSocketVo webSocketVo = wsSessionsMap.get(userId);
		return webSocketVo;
	}

	/**
	 * 리스트와 맵에 저장된 정보를 삭제한다.
	 * @param session
	 */
	public static void removeSession(WebSocketSession session) {
		
		WebSocketVo webSocketVo =  wsSessionsMap.get(session.getAttributes().get("userId").toString());
		int sessionSize = webSocketVo.removeSession(session);
		// 지운 이후에 세션 사이즈가 0이라면 웹소켓 접속이 전부 disconnect 따라서 map에서 지워버린다.
		if(sessionSize == 0) {
			wsSessionsMap.remove(session.getAttributes().get("userId").toString());
		}
	}

	/**
	 * WebSocketVo List 반환
	 * @return Collection<WebSocketVo>
	 */
	public static Collection<WebSocketVo> getWebSocketVoList() {
		return wsSessionsMap.values();
	}

	/**
	 * wsSessionsMap에 저장된 유저리스트 반환
	 * @return JSONArray
	 */
	public static JSONArray getConnectUsersInfo() {
		
		Collection<WebSocketVo> webSocketVoList = wsSessionsMap.values();
		JSONArray jsonArray = new JSONArray();
		for(WebSocketVo webSocketVo : webSocketVoList) {
			JSONObject json = new JSONObject();
			json.put("userId" , webSocketVo.getMemberVo().getSyncKey());
			json.put("userName" , webSocketVo.getMemberVo().getMemberName());
			jsonArray.put(json);
		}
		
		return jsonArray;
	}

	/**
	 * userId을 제외한 웹소켓 리스트
	 * @param userId
	 * @return List<WebSocketSession>
	 */
	public static List<WebSocketSession> getSessionsExceptionUserId(String userId) {
		
		List<WebSocketSession> webSocketSessionList = null; 
		Collection<WebSocketVo> webSocketList = wsSessionsMap.values();
		
		for(WebSocketVo websocketVo : webSocketList) {
			// 해당 userId는 제외한 리스트를 반환한다.
			if( !userId.equals(websocketVo.getUserId()) ) {
				webSocketSessionList = websocketVo.getWebSocketSessionList();
			}
		}
		
		return webSocketSessionList;
	}

	/**
	 * userId로 해당 세션 정보를 가져온다.
	 * @param userId
	 * @return WebSocketSession
	 */
	public static List<WebSocketSession> getSessionByUserId(String userId) {
		
		WebSocketVo webSocketVo = wsSessionsMap.get(userId);
		
		List<WebSocketSession> webSocketSessionList = null;
		try {
			webSocketSessionList = webSocketVo.getWebSocketSessionList();
		} catch (NullPointerException e) {
			webSocketSessionList = null;
		}

		return webSocketSessionList;
	}

}