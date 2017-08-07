package org.uengine.sns.common;

import java.nio.charset.Charset;

import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.AbstractJsonpResponseBodyAdvice;

/**
 * 
 * JsonpAdvice
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@ControllerAdvice
public class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {

	/**
	 * Constructor
	 */
	public JsonpAdvice() {
        super("callback");
    }
	
	@Override
	protected MediaType getContentType(MediaType contentType, ServerHttpRequest request, ServerHttpResponse response) {
		return new MediaType("application", "javascript", Charset.forName("UTF-8"));
	}

}