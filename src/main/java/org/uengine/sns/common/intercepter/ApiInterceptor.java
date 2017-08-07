package org.uengine.sns.common.intercepter;

import java.util.ArrayList;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.uengine.sns.common.Exception.UnauthorizedException;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.intercepter.service.AuthenticationService;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.service.NoticeService;
import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.tenant.service.TenantService;
import org.uengine.sns.tenant.vo.TenantVo;

/**
 * 
 * ApiInterceptor
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class ApiInterceptor extends HandlerInterceptorAdapter {
	
	private static final Logger LOG = LoggerFactory.getLogger(ApiInterceptor.class);
	
	@Autowired
	AuthenticationService authenticationService;

	@Autowired
	MemberService memberService;
	
	@Autowired
	TenantService tenantService; 
	
	@Autowired
	NoticeService noticeService;

	@Value("#{conf['operation.mode']}")
	public String opMode;
	
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
		boolean b = false;
		
		HttpSession session = request.getSession(false);
		if(session == null) {
			b = false;
		} else {
			if(session.getAttribute(AuthInterceptor.GROUPWARE_SESSION_USERID) != null) {
				b = true;
				request.setAttribute("userId", session.getAttribute(AuthInterceptor.GROUPWARE_SESSION_USERID));
				LOG.debug("그룹웨어 세션 인증 : " + b);
			} else if(session.getAttribute("memberId") != null) {
				MemberVo memberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), (Long) session.getAttribute("memberId"));
				if(memberVo != null && memberVo.getSyncKey() != null) {
					b = true;
					request.setAttribute("userId", memberVo.getSyncKey());
					LOG.debug("SNS 웹세션 인증 : " + b);
				}
			} else {
				b = false;
			}
		}

		// 모바일 사용자 확인
		if(!b) {
			b = isMemberBySloOfMobile(request);
			LOG.debug("모바일 인증 : " + b);
		}

		// ip 인증
		if(!b) {
			b = isIpAuth(request);
			LOG.debug("IP 인증 : " + b);
		}
		
		// slo 사용자 확인
		if(!b) {
			b = isMemberBySlo(request);
			LOG.debug("SLO 인증 : " + b);
		}
	
		// Federation 사용자 확인
		if(!b) {
			b = isMemberByUserIdOfFederation(request);
			LOG.debug("Federation 인증 : " + b);
		}
		
		// session check
		if(!b) {
			String clientIp = HttpUtil.getClientIp(request);
			LOG.warn("Client Ip : " + clientIp);;
			
			String pathValue = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
			LOG.warn("Path : " + pathValue);
			throw new UnauthorizedException("This Session is not exist.");
		}
		
		return true;
	}
	
	/**
	 * 모바일 사용자 확인
	 * @param request
	 * @return boolean
	 */
	private boolean isMemberBySloOfMobile(HttpServletRequest request) {
		
		String otaId = request.getHeader(AuthInterceptor.MOBILE_AUTH_ID);
		if(otaId == null) {
			return false;
		}
		
		String userId = null;
		if("dev".equals(opMode)) {
			// 모바일 개발시 ota 인증을 통하지 않고, 인증하는 otaId
			switch (otaId) {
			case "eaab5fcd0619fcd3eabbd8937336ce09f9b0d2da69cc08d9f6919af805875d59":
				userId = "15063041";	// 류태희
				break;
			case "1b3ef4189e77125b2b1065c05060d0581fa63baa75542e105c59236eec5b4d7f":
				userId = "15072802";	// 이상천
				break;
			default:
				userId = null;
				break;
			}
		}
		
		if(userId == null) {
			userId = authenticationService.authenticateByMobile(otaId);
		}
		
		if(userId == null) {
			String pathValue = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
			LOG.warn("Path : " + pathValue);		// print : /main/2
			
			throw new UnauthorizedException("Mobile's Session is not exist.");
		}
		
		request.setAttribute("userId", userId);
		
		return !StringUtils.isEmpty(userId);
	}

	/**
	 * SLO 사용자 확인
	 * @param request
	 * @return boolean
	 */
	private boolean isMemberBySlo(HttpServletRequest request) {
		
		String otaId = request.getHeader(AuthInterceptor.AUTH_ID);
		if(otaId == null) {
			return false;
		}
		
		String userId = authenticationService.authenticateBySlo(otaId);
		if(userId == null) {
			String pathValue = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
			LOG.warn("Path : " + pathValue);
			throw new UnauthorizedException("SLO's Session is not exist.");
		}

		request.setAttribute("userId", userId);
		
		return !StringUtils.isEmpty(userId);
	}
	
	/**
	 * Federation 사용자 확인
	 * @param request
	 * @param boolean
	 */
	@SuppressWarnings("unused")
	private boolean isMemberByUserIdOfFederation(HttpServletRequest request) {
		
		String clientIp = HttpUtil.getClientIp(request);
		// Federation IP 와 auth key 인증으로 처리해야 함.
		String authId = request.getHeader(AuthInterceptor.FEDERATION_AUTH_ID);
		
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
		
	/**
	 * @param request
	 */
	@SuppressWarnings("unchecked")
	private void processNoticeInfo(HttpServletRequest request) {
		try {
			
			String toMemberSynckey = (String) request.getAttribute("userId");
			
			MemberVo toMemberVo = memberService.getMemberBySynckey("ko", toMemberSynckey);
			String toMemberName =  toMemberVo.getMemberName() + " " + StringUtils.defaultString(toMemberVo.getMemberPositionName());
			
			String method = request.getMethod();
			Locale locale = RequestContextUtils.getLocale(request);
			String pathUri = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);
			LOG.debug("pathUri :" + pathUri);	
			
			ArrayList<NoticeVo> notiList = (request.getAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name()) != null ?  (ArrayList<NoticeVo>)request.getAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name()) : null);
			long   fromMemberId = -999;
			String fromMemberName = null;
			
			if (notiList != null) {
				MemberVo fromMemberVo = null;
				NoticeVo noticeVo = null;
				for (int idx=0; idx < notiList.size(); idx++) {
					noticeVo = notiList.get(idx);
					fromMemberVo = memberService.getMemberById("ko", noticeVo.getFromMemberId());
					if (noticeVo.getFromMemberName() == null) {
						fromMemberName =  fromMemberVo.getMemberName() + " " + StringUtils.defaultString(fromMemberVo.getMemberPositionName());
						noticeVo.setFromMemberName(fromMemberName);
					}
					noticeVo.setLocale(locale);
					noticeVo.setToMemberName(toMemberName);
					
					noticeService.excuteNoticeInfo(noticeVo, pathUri, method);
				}
			} else {
				String noTiType = (String) (request.getAttribute(SNSCodeMaster.NOTI_ATTR.NOTI_TYPE.name()) == null ? "" :  request.getAttribute(SNSCodeMaster.NOTI_ATTR.NOTI_TYPE.name()));
				String userId = (String) request.getAttribute("userId");
				MemberVo fromMemberVo = null;
				if(!StringUtils.isEmpty(userId)) {
					fromMemberVo = memberService.getMemberBySynckey("ko", userId);
				} else {
					HttpSession session = request.getSession(false);
					long memberId = (long) (session != null && request.getAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name()) == null ? session.getAttribute("memberId") :  request.getAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name()));
					fromMemberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), memberId);
				}
				
				fromMemberId = fromMemberVo.getMemberId();
				fromMemberName = fromMemberVo.getMemberName() + " " + StringUtils.defaultString(fromMemberVo.getMemberPositionName());
				
				// 알림 필수
				long itemId       = request.getAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name()) == null ? 0L : (long) request.getAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name());
				// 알림 옵션 1
				String itemTitle  = (String) request.getAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name());
				// 알림 옵션 2
				String itemMsg  = (String) request.getAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_MSG.name());
		
				NoticeVo noticeVo = new NoticeVo();
				noticeVo.setItemId(itemId);
				noticeVo.setItemTitle(itemTitle);
				noticeVo.setItemMsg(itemMsg);
				noticeVo.setFromMemberId(fromMemberId);
				noticeVo.setFromMemberName(fromMemberName);
				noticeVo.setLocale(locale);
				noticeVo.setToMemberName(toMemberName);
				
				if ("TODO".equals(noTiType.toUpperCase())) {
					noticeVo.setToDoYn("Y");
				} else if ("POLL".equals(noTiType.toUpperCase())) {
					noticeVo.setPollYn("Y");
				}
				
				if (itemId != 0) {
					noticeService.excuteNoticeInfo(noticeVo, pathUri, method);
				}
			}
			
		} catch(Exception e) {
			LOG.warn("알림 데이터 생성시 오류 : " + e.getMessage());
		}
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		
		String method = request.getMethod();
		
		String openapiStr = "/sns/openapi";
		String pathValue = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
		if(pathValue.startsWith(openapiStr)) {
			return;
		}
		
		if(method.equals(RequestMethod.POST.name()) || method.equals(RequestMethod.PUT.name()) || method.equals(RequestMethod.DELETE.name())) {
			HttpSession session = request.getSession(false);
			if(request.getAttribute("userId") == null && (session != null && session.getAttribute("memberId") == null) ) {
				return ;
			}
			
			processNoticeInfo(request);
			
		}
		LOG.debug(pathValue);
	}

}