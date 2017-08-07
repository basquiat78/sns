package org.uengine.sns.chat.common.batch;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import org.json.JSONObject;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.uengine.sns.chat.notice.service.ChatNoticeService;
import org.uengine.sns.common.code.ChatCodeMaster;
import org.uengine.sns.websocket.service.WsSessionStore;
import org.uengine.sns.websocket.vo.WebSocketVo;

/**
 * 
 * NotiWebSocketJob
 * @author uEngine-basquiat (uEngine Solutions)
 * 
 */
@DisallowConcurrentExecution
public class NoticeWebSocketJob extends QuartzJobBean {

	private static final Logger LOG = LoggerFactory.getLogger(NoticeWebSocketJob.class);
	
	ChatNoticeService chatNoticeService;
		public void setChatNoticeService(ChatNoticeService chatNoticeService) { this.chatNoticeService = chatNoticeService; }

	String wsServerUrl;
		public void setWsServerUrl(String wsServerUrl) { this.wsServerUrl = wsServerUrl; }
	
	String wsServerPath;
		public void setWsServerPath(String wsServerPath) { this.wsServerPath = wsServerPath; }

	String contextPath = null;
	String destUri = null;

	/**
	 * @param arg0
	 * @throws JobExecutionException
	 */
	@Override
	protected void executeInternal(JobExecutionContext arg0) throws JobExecutionException {

		contextPath = ContextLoaderListener.getCurrentWebApplicationContext().getServletContext().getContextPath();
		destUri = wsServerUrl + contextPath + wsServerPath;
		LOG.info("Websocket destUri : " + destUri);
		this.sendNotice();
		
	}

	/**
	 * Notice 웹소켓 전송
	 */
	private void sendNotice() {

		Collection<WebSocketVo> webSocketVoList = WsSessionStore.getWebSocketVoList();
		for(WebSocketVo webSocketVo: webSocketVoList) {
			try {
				// 접속자 정보를 만들어서 보내준다.
				JSONObject json = new JSONObject();
				json.put("messageType", ChatCodeMaster.MESSAGE_TYPE.NOTICE.name());
				json.put("message", "현재 접속자 수는 " + webSocketVoList.size() + "명 입니다.");
				json.put("connectUsers", WsSessionStore.getConnectUsersInfo());
				
				List<WebSocketSession> webSocketSessionList = webSocketVo.getWebSocketSessionList();
				for( WebSocketSession webSocketSession :  webSocketSessionList) {
					webSocketSession.sendMessage(new TextMessage(json.toString()));
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}