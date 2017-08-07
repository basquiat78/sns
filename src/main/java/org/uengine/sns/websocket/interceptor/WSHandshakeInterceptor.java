package org.uengine.sns.websocket.interceptor;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

/**
 * 
 * WSHandshakeInterceptor
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class WSHandshakeInterceptor extends HttpSessionHandshakeInterceptor {

	/**
	 * HttpSessionHandshakeInterceptor의 beforeHandshake를 통해서 넘어온 파라미터를 attribute에 세팅한다.
	 * 이유는 알 수 없지만 ServerHttpRequest으로부터 가져온 HttepServletRequest에 HttpSession이 null인 이유를
	 * 파악해야 할듯 싶다.
	 */
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, 
												ServerHttpResponse response, 
												WebSocketHandler wsHandler, 
												Map<String, Object> attributes) throws Exception {
		
			ServletServerHttpRequest ssreq = (ServletServerHttpRequest)request;
			HttpServletRequest req = ssreq.getServletRequest();
			attributes.put("userId", req.getParameter("userId"));
			return super.beforeHandshake(request, response, wsHandler, attributes);
	}

}