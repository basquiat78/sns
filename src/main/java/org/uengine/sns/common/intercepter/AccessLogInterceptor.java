package org.uengine.sns.common.intercepter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.uengine.sns.common.intercepter.service.AuthenticationService;
import org.uengine.sns.common.util.HttpUtil;

/**
 * 
 * AccessLogInterceptor
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class AccessLogInterceptor extends HandlerInterceptorAdapter {

	private static final Logger logger = (Logger) LogManager.getLogger();

	@Autowired
	AuthenticationService authenticationService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		try {
			boolean b = request.isSecure();	// https 여부
			String externalAccess = request.getHeader("ExternalWebServer");
			
			// 외부 접속이면서 https 가 아니면 https 로 리다이렉션한다.
			if("true".equals(externalAccess) && !b) {
				String httpsUrl = "https"+request.getRequestURL().substring(4);
				if(request.getQueryString() != null) {
					httpsUrl += "?" + request.getQueryString();
				}
				response.sendRedirect(httpsUrl);
			}
			
			HttpSession session = request.getSession(false);

			String pathValue = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
			String method = request.getMethod();
			String queryString = request.getQueryString();
			queryString = StringUtils.isEmpty(queryString) ? "" : "?"+queryString;
			String userId = null;
			if(session != null && session.getAttribute(AuthInterceptor.GROUPWARE_SESSION_USERID) != null) {
				
				userId = (String) session.getAttribute(AuthInterceptor.GROUPWARE_SESSION_USERID);
				
			} else {
				String otaId = request.getHeader(AuthInterceptor.MOBILE_AUTH_ID);
				userId = authenticationService.authenticateByMobile(otaId);
				if(userId == null) {
					userId = "unknowned";
				}
			}

			logger.info(HttpUtil.getClientIp(request) + "\t" + userId + "\t" + method + "\t" + pathValue + queryString);
			
			// Locale 설정
			LocaleResolver localeResolver = RequestContextUtils.getLocaleResolver(request);
			if (localeResolver == null) {
				throw new IllegalStateException("No LocaleResolver found: not in a DispatcherServlet request?");
			}
			
			if(request.getParameter("lang") != null) {
				localeResolver.setLocale(request, response, StringUtils.parseLocaleString(request.getParameter("lang")));
			} else {
				localeResolver.setLocale(request, response, HttpUtil.getLocale(request));
			}
		} catch(Exception e) {
			// ignored
		}
		
		return true;
	}

}