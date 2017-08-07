package org.uengine.sns.common.util;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.uengine.sns.common.intercepter.AuthInterceptor;

/**
 * 
 * HttpUtil
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class HttpUtil {
	
	private static final Logger LOG = LoggerFactory.getLogger(HttpUtil.class);

	/**
	 * 서버에 접속한 클라이언트 아이피를 얻는다.
	 * @param request
	 * @return String
	 */
	public static String getClientIp(HttpServletRequest request) {
		String clientIp = request.getHeader("X-Forwarded-For");
		if( clientIp == null || clientIp.trim().length() <= 0 || clientIp.equalsIgnoreCase("unknown") ) {
			clientIp = request.getHeader("Proxy-Client-IP");			
		}
		if( clientIp == null || clientIp.trim().length() <= 0 || clientIp.equalsIgnoreCase("unknown") ) {
			clientIp = request.getHeader("WL-Proxy-Client-IP");			
		}
		if( clientIp == null || clientIp.trim().length() <= 0 || clientIp.equalsIgnoreCase("unknown") ) {
			clientIp = request.getHeader("HTTP_CLIENT_IP");			
		}
		if( clientIp == null || clientIp.trim().length() <= 0 || clientIp.equalsIgnoreCase("unknown") ) {
			clientIp = request.getHeader("HTTP_X_FORWARDED_FOR");			
		}
		if( clientIp == null || clientIp.trim().length() <= 0 || clientIp.equalsIgnoreCase("unknown") ) {
			clientIp = request.getRemoteAddr();			
		}
		
		return clientIp;
	}
	
	/**
	 * @param request
	 * @return String
	 */
	public static String getLocaleString(HttpServletRequest request) {
		return getLocale(request).getLanguage();
	}

	/**
	 * @param request
	 * @return Locale
	 */
	public static Locale getLocale(HttpServletRequest request) {
		if(request.getSession(false) == null) {
			return RequestContextUtils.getLocale(request);
		}

		String groupwareLocaleStr = "ko";
		try {
			groupwareLocaleStr = (String) request.getSession(false).getAttribute(AuthInterceptor.GROUPWARE_SESSION_LOCALE);
			if(groupwareLocaleStr != null) {
				return new Locale(groupwareLocaleStr);
			}
			return new Locale("ko");
			
		} catch(Exception e) {
			LOG.warn("Locale error : " + groupwareLocaleStr);
			return RequestContextUtils.getLocale(request);
		}
	}

}