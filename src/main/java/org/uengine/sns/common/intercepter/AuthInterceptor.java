package org.uengine.sns.common.intercepter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.uengine.sns.common.intercepter.service.AuthenticationService;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.service.NoticeService;
import org.uengine.sns.tenant.service.TenantService;
import org.uengine.sns.tenant.vo.TenantVo;

/**
 * 
 * AuthInterceptor
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class AuthInterceptor extends HandlerInterceptorAdapter {
	
	private static final Logger LOG = LoggerFactory.getLogger(AuthInterceptor.class);

	public static final String FEDERATION_AUTH_ID  			= "FEDERATION_AUTH_ID";
	
	public static final String AUTH_ID        				= "AUTH_ID";
	public static final String MOBILE_AUTH_ID 				= "MOBILE_AUTH_ID";
	
	public static final String GROUPWARE_SESSION_USERID 	= "ncpUserId";
	public static final String GROUPWARE_SESSION_LOCALE 	= "ncpLocale";
	public static final String GROUPWARE_SESSION_TIMEDIFF	= "ncpTimeDiff";
	
	@Autowired
	AuthenticationService authenticationService;

	@Autowired
	MemberService memberService;
	
	@Autowired
	TenantService tenantService; 
	
	@Autowired
	NoticeService noticeService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		LOG.debug("Path : " + request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE));
		
		/* 인증 순서
		 * 1. SNS 웹 세션 확인
		 * 2. 그룹웨어 웹 세션 확인
		 * 3. 모바일 인증 확인
		 * 4. 일반적인 SLO 인증 확인 (쉐어포인트 등)
		 * 5. Federation 인증 확인
		 */
		
		MemberVo memberVo = getMemberByMemberId(request);
		
		if(memberVo == null) {
			memberVo = getMemberByUserId(request);
			LOG.debug("그룹웨어 세션 인증 : " + (memberVo != null));
			
			if(memberVo == null) {
				boolean b = false;

				// ip 인증
				if(!b) {
					b = isIpAuth(request);
					LOG.debug("IP 인증 : " + b);
				}
				
				// SLO 사용자 확인
				if(!b) {
					b = isMemberBySlo(request);
					LOG.debug("SLO 인증 : " + b);
				}
			
				// Federation 사용자 확인
				if(!b) {
					b = isMemberByUserIdOfFederation(request);
					LOG.debug("Federation 인증 : " + b);
				}

				if(!b) {
					response.sendRedirect(request.getContextPath() + "/");
					return false;
				} 
			} else {
				response.sendRedirect(request.getContextPath() + "/");
				return false;
			}
		} else {
			LOG.debug("SNS 웹 세션 인증 ");
		}

		if(memberVo != null && memberVo.getMemberId() > 0L) {
			request.setAttribute("Member", memberVo);
			request.setAttribute("userId", memberVo.getSyncKey());
		}
		
		return true;
	}
	
	/**
	 * SNS 세션 확인
	 * @param request
	 * @return MemberVo
	 */
	private MemberVo getMemberByMemberId(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if(session == null || session.getAttribute("memberId") == null) {
			return null;
		}
		
		return memberService.getMemberById(HttpUtil.getLocaleString(request), (Long) session.getAttribute("memberId"));
	}

	/**
	 * 그룹웨어 세션 확인
	 * @param request
	 * @return MemberVo
	 */
	private MemberVo getMemberByUserId(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if(session == null) {
			return null;
		}
		
		LOG.debug("GROUPWARE_SESSION_USERID : " + session.getAttribute(GROUPWARE_SESSION_USERID));
		if(session.getAttribute(GROUPWARE_SESSION_USERID) == null) {
			return null;
		}
		
		MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), (String) session.getAttribute(GROUPWARE_SESSION_USERID));
		if(memberVo == null || memberVo.getMemberName() == null) {
			return null;
		}
		if(session.getAttribute("memberId") == null) {
			
			// NOTE 세션 setting
			session.setAttribute("memberId", memberVo.getMemberId());
			session.setAttribute("memberName", memberVo.getMemberName());
			session.setAttribute("userId", memberVo.getSyncKey());
			
		}
		
		return memberVo;
	}

	/**
	 * 모바일 사용자 확인
	 * @param request
	 * @return boolean
	 */
	@SuppressWarnings("unused")
	private boolean isMemberBySloOfMobile(HttpServletRequest request) {
		
		String otaId = request.getHeader(MOBILE_AUTH_ID);
		if(otaId == null) {
			return false;
		}
		
		String userId = authenticationService.authenticateByMobile(otaId);
		if(userId == null) {
			return false;
		}
		
		MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
		
		request.setAttribute("userId", userId);
		request.setAttribute("Member", memberVo);
		
		return !StringUtils.isEmpty(userId);
	}

	/**
	 * SLO 사용자 확인
	 * @param request
	 * @return boolean
	 */
	private boolean isMemberBySlo(HttpServletRequest request) {
		
		String otaId = request.getHeader(AUTH_ID);
		if(otaId == null) {
			return false;
		}
		
		String userId = authenticationService.authenticateBySlo(otaId);
		if(userId == null) {
			return false;
		}
		
		MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);

		request.setAttribute("userId", userId);
		request.setAttribute("Member", memberVo);
		
		return !StringUtils.isEmpty(userId);
	}
	
	/**
	 * Federation 사용자 확인
	 * @param request
	 * @return boolean
	 */
	private boolean isMemberByUserIdOfFederation(HttpServletRequest request) {
		String clientIp = HttpUtil.getClientIp(request);
		// Federation IP 와 auth key 인증으로 처리해야 함.
		String userId = request.getParameter("federation_user_id");
		if(StringUtils.isEmpty(userId)) {
			return false;
		}
		TenantVo tenantVo = tenantService.getTenantByUserId(userId);
		if(tenantVo == null || !clientIp.equals(tenantVo.getNetworkAuthIp())) { 
			return false;
		}
		
		return true;
	}
	
	/**
	 * @param request
	 * @return boolean
	 */
	private boolean isIpAuth(HttpServletRequest request) {
		String clientIp = HttpUtil.getClientIp(request);
		
		boolean b = authenticationService.validateAccessIpByRange(clientIp);
		if(!b) {
			b = authenticationService.validateAccessIp(clientIp);
		}
		
		return b;
	}

}