package org.uengine.sns.member.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;


@Controller
public class MemberFeedController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MemberFeedController.class);
	
	@Autowired
	FeedService feedService;
	
	@Autowired
	MemberService memberService;
	
	/**
	 * FEED 리스트(멤번)
	 * SearchContextVo에 설정된 파라미터의 key,value 형태로 받아 검색 필터 처리
	 * @param param
	 * @param request
	 * @return List<FeedVo>
	 */
	@RequestMapping(value = "/members/feeds", method = RequestMethod.GET)
	public @ResponseBody List<FeedVo> feedList(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		
		SearchContextVo scv = new SearchContextVo(param);
		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		
		return feedService.getMemberFeedList(HttpUtil.getLocaleString(request), scv, sessionMemberId);
	}

}