package org.uengine.sns.chat.common.batch;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.StatusCode;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * NotiWebSocketMsg
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@WebSocket
public class NoticeWebSocketMsg {

	private static final Logger LOG = LoggerFactory.getLogger(NoticeWebSocketMsg.class);
	
    private final CountDownLatch closeLatch;

    private Session session;
    private JSONObject jsonObj;
 
    /**
     * Constructor
     * @param jsonObj
     */
    public NoticeWebSocketMsg(JSONObject jsonObj) {
    	this.jsonObj = jsonObj;
        this.closeLatch = new CountDownLatch(1);
    }
 
    /**
     * @param session
     */
    @OnWebSocketConnect
    public void onConnect(Session session) {
        this.session = session;
        try {
        	session.getRemote().sendString(jsonObj.toString());
        } catch (Exception e) {
            LOG.error("", e);
        }
    }
 
    /**
     * @param msg
     */
    @OnWebSocketMessage
    public void onMessage(String msg) {
    	LOG.info(msg);
    }

    /**
     * @param statusCode
     * @param reason
     */
    @OnWebSocketClose
    public void onClose(int statusCode, String reason) {
        this.session = null;
        this.closeLatch.countDown();
    }

    /**
     * @param duration
     * @param unit
     * @return boolean
     * @throws InterruptedException
     */
    public boolean awaitClose(int duration, TimeUnit unit) throws InterruptedException {
        return this.closeLatch.await(duration, unit);
    }
    
    /**
     * webSocketSession close 
     */
    public void close() {
    	if(session != null) {
    		session.close(StatusCode.NORMAL, "onClose - I'm done");
    	}
    }

}