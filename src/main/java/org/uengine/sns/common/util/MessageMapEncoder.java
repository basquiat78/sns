package org.uengine.sns.common.util;

import java.io.IOException;
import java.util.Map;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import org.codehaus.jackson.map.ObjectMapper;

/**
 * 
 * MessageMapEncoder
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@SuppressWarnings("rawtypes")
public class MessageMapEncoder implements Encoder.Text<Map> {
 
    @Override
    public String encode(Map map) throws EncodeException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(map);
        } catch (IOException e) {
            System.out.print("Problem with Encoder: " + e.getMessage());
            return "-";
        }
    }
 
    @Override
    public void init(EndpointConfig config) {
        System.out.println("MessageMapEncoder - init method called");
    }
 
    @Override
    public void destroy() {
        System.out.println("MessageMapEncoder - destroy method called");
    }

}