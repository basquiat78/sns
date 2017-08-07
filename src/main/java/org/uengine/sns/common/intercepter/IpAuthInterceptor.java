package org.uengine.sns.common.intercepter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.uengine.sns.common.Exception.UnauthorizedException;
import org.uengine.sns.common.intercepter.service.AuthenticationService;
import org.uengine.sns.common.util.HttpUtil;

/**
 * 
 * IpAuthInterceptor
 * <p>사용자정보 없이 서버간 아이피 인증이 필요한 경우 사용</p>
 * <p> - 현재 기준(2015.10.01) 사용예 : 문서변환기서버에서 sns 서버로 문서 요청</p>
 * @author uEngine-basquiat (uEngine Solutions)
 * 
 */
public class IpAuthInterceptor extends HandlerInterceptorAdapter {
	
	@Autowired
	AuthenticationService authenticationService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String clientIp = HttpUtil.getClientIp(request);
		
		boolean b = authenticationService.validateAccessIpByRange(clientIp);
		if(!b) {
			b = authenticationService.validateAccessIp(clientIp);
		}
		
		if(!b) {
			throw new UnauthorizedException("Access denied.");
		}
		
		return true;
	}

}