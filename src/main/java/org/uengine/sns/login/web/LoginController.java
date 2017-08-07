package org.uengine.sns.login.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.intercepter.AuthInterceptor;
import org.uengine.sns.common.intercepter.service.AuthenticationService;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * MainController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class LoginController extends ExceptionController {

	private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	AuthenticationService authenticationService;

	@Autowired
	MemberService memberService;
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(HttpSession session) {
		if(session != null) {
			session.invalidate();
		}
		return "login";
	}

	/**
	 * @param request
	 * @param session
	 * @param memberId
	 * @return String
	 */
	@RequestMapping(value = "/init", method = RequestMethod.POST)
	public String init(HttpServletRequest request, HttpSession session, @RequestParam(required=true) String memberId) {

		MemberVo member = memberService.getMemberById(HttpUtil.getLocaleString(request), Long.parseLong(memberId));

		if(member == null || member.getMemberId() == 0L) {
			return "redirect:"+request.getContextPath()+"/login.do";
		}
		
		session.setAttribute("memberId", Long.parseLong(memberId));		
		session.setAttribute("memberName", member.getMemberName());
		session.setAttribute("userId", member.getSyncKey());

		// 그룹웨어와 동일한 세션
		session.setAttribute(AuthInterceptor.GROUPWARE_SESSION_USERID, member.getSyncKey());
		session.setAttribute(AuthInterceptor.GROUPWARE_SESSION_LOCALE, "ko");
		
		LOG.debug("init end =========================================================== ");
		
		return "redirect:/main/"+memberId;
	}

	/**
	 * @param session
	 * @param request
	 * @param loginId
	 * @param loginPassword
	 * @return String
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String snsLogin(HttpSession session, HttpServletRequest request
			, @RequestParam(required=true) String loginId
			, @RequestParam(required=true) String loginPassword) {
		
		MemberVo member = memberService.getCheckLoginMember(HttpUtil.getLocaleString(request), loginId, loginPassword);

		if(member == null || member.getMemberId() == 0L) {
			return "redirect:"+request.getContextPath()+"/login.do";
		}

		session.setAttribute("memberId", member.getMemberId());
		session.setAttribute("memberName", member.getMemberName());
		session.setAttribute("userId", member.getSyncKey());

		return "redirect:/main/"+member.getMemberId();
	}
	
	/**
	 * @param session
	 * @param request
	 * @return Map<String, Object>
	 */
	@RequestMapping(value = "/sloLogin", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> sloLogin(HttpSession session, HttpServletRequest request) {

		Map<String, Object> retObj = new HashMap<String, Object>();
		
		String otaId = request.getParameter("SLO_P_OTA");
		if(otaId == null) {
			retObj.put("result", "OtaId is null.");
			return retObj;
		}
		
		String userId = authenticationService.authenticateBySlo(otaId);
		if(StringUtils.isEmpty(userId)) {
			retObj.put("result", "User Id is null.");
			return retObj;
		}
		
		MemberVo member = memberService.getMemberBySynckey("ko", userId);
		if(member == null || member.getMemberId() < 1L) {
			retObj.put("result", "SNS Member is null.");
			return retObj;
		}

		session.setAttribute("memberId", member.getMemberId());		
		session.setAttribute("memberName", member.getMemberName());
		session.setAttribute("userId", member.getSyncKey());

		// 그룹웨어와 동일한 세션
		session.setAttribute(AuthInterceptor.GROUPWARE_SESSION_USERID, member.getSyncKey());
		session.setAttribute(AuthInterceptor.GROUPWARE_SESSION_LOCALE, "ko");

		retObj.put("result", "Y");
		return retObj;
		
	}
	
	/**
	 * 테스트용
	 * @param request
	 * @param member
	 * @return String
	 */
	@RequestMapping(value = "/testurl", method = RequestMethod.GET)
	public String dummy(HttpServletRequest request, @ModelAttribute("Member") MemberVo member) {
		return "sns/main/dummy";
	}

	/**
	 * @param MemeberVo
	 * @return MemeberVo
	 */
	@RequestMapping(value = "/logins", method = RequestMethod.POST)
	public @ResponseBody MemberVo logins(@RequestBody MemberVo memberVo) {
		MemberVo loginMember = 	memberService.getCheckLoginMember("ko", memberVo.getLoginId(), memberVo.getLoginPassword());
		loginMember.setLoginPassword("");
		return loginMember;
	}
}