package org.uengine.sns.common.intercepter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * EmbeddedInterceptor
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class EmbeddedInterceptor extends HandlerInterceptorAdapter {

	@Autowired
	MemberService memberService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession(false);
		if(session == null) {
			return false;
		}
		
		if(session.getAttribute("memberId") != null) {
			return true;
		}
		
		String groupwareUserId = (String) session.getAttribute(AuthInterceptor.GROUPWARE_SESSION_USERID);
		if(groupwareUserId == null) {
			return false;
		}
		
		MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), groupwareUserId);
		if(memberVo == null) {
			return false;
		}

		session.setAttribute("memberId", memberVo.getMemberId());
		session.setAttribute("memberName", memberVo.getMemberName());
		session.setAttribute("userId", memberVo.getSyncKey());
		
		request.setAttribute("Member", memberVo);
		
		return true;
	}

}