package org.uengine.sns.websocket.vo;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * WebSocketVo
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class WebSocketVo {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(WebSocketVo.class);

	/**
	 * Constructor
	 * @param session
	 */
	public WebSocketVo(WebSocketSession session) {
		this.userId = session.getAttributes().get("userId").toString();
		this.webSocketSessionList.add(session);
	}
	
	/**
	 * userId
	 */
	private String userId;
		public String getUserId() { return userId; }

	/**
	 * webSocketSessionList
	 */
	private List<WebSocketSession> webSocketSessionList = new ArrayList<WebSocketSession>();
		public List<WebSocketSession> getWebSocketSessionList() { return webSocketSessionList; }
	
	/**
	 * memberVo
	 */
	private MemberVo memberVo;
		public MemberVo getMemberVo() { return memberVo; }

	/**
	 * remove WebSocketSession
	 * @param session
	 * @return int
	 */
	public int removeSession(WebSocketSession session) {
		webSocketSessionList.remove(session);
		return webSocketSessionList.size();
	}

	/**
	 * add WebSocketSession
	 * @param session
	 * @return int
	 */
	public int addSession(WebSocketSession session) {
		webSocketSessionList.add(session);
		return webSocketSessionList.size();
	}

	/**
	 * 해당 아이디에 해당하는 멤버의 정보를 세팅한다
	 * @param memberService
	 */
	public void fillWebSocketVo(MemberService memberService) {
		this.memberVo = memberService.getMemberBySynckey("ko", userId);
	}

}