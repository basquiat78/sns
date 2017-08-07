package org.uengine.sns.common.util;

import java.util.HashMap;
import java.util.Map;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

/**
 * 
 * MessageMapDecoder
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@SuppressWarnings("rawtypes")
public class MessageMapDecoder implements Decoder.Text<Map> {
 
	@Override
    public Map decode(String json) throws DecodeException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(json, new TypeReference<HashMap<String, String>>() {});
        } catch (Exception e) {
            System.out.print("Problem with Decoder: " + e.getMessage());
            return new HashMap();
        }
    }
 
    @Override
    public boolean willDecode(String jsonMessage) {
        try {
            return true;
        } catch (Exception e) {
            return false;
        }
    }
 
    @Override
    public void init(EndpointConfig config) {
        System.out.println("MessageMapDecoder -init method called");
    }
 
    @Override
    public void destroy() {
        System.out.println("MessageMapDecoder - destroy method called");
    }

}