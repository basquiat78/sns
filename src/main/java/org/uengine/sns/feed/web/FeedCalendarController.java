package org.uengine.sns.feed.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.CalendarVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * FeedCalendarController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class FeedCalendarController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(FeedCalendarController.class);
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	FeedService feedService;
	
	/**
	 * 피드- 칼렌다 페이지
	 * @param request
	 * @param response
	 * @return String
	 */
	@RequestMapping(value = "/feeds/calendar", method = RequestMethod.GET)
    public String goCalendar(HttpServletRequest request, HttpServletResponse response) {
		return "/sns/main/center/feed/FeedCalendar";
	}

	/**
	 * 피드- 칼렌다 리스트
	 * @param paramMap
	 * @param request
	 * @return List<CalendarVo>
	 */
	@RequestMapping(value = "/feeds/calendar/list")
	public @ResponseBody List<CalendarVo> goCalendarList(@RequestParam Map<String, String> paramMap, HttpServletRequest request) {
		
		String startDay = request.getParameter("start") == null ? "" : request.getParameter("start");
		String endDay = request.getParameter("end") == null ? "" : request.getParameter("end");
		String memberId = request.getParameter("memberId") == null ? "" : request.getParameter("memberId");
		String type = request.getParameter("type") == null ? SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString() : request.getParameter("type");
		int subTtlLimit = request.getParameter("subTtlLimit") == null ? 6 : Integer.parseInt(request.getParameter("subTtlLimit"));
		String processingColor = request.getParameter("processingColor") == null ? "" : request.getParameter("processingColor");
		String notCompleteColor = request.getParameter("notCompleteColor") == null ? "" : request.getParameter("notCompleteColor");
		String completeColor = request.getParameter("completeColor") == null ? "" : request.getParameter("completeColor");

		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		
		CalendarVo calendarVo = new CalendarVo();
		calendarVo.setStartDay(startDay.replace("-", ""));
		calendarVo.setEndDay(endDay.replace("-", ""));
		calendarVo.setMemberId(memberId);
		calendarVo.setSessionMemberId(sessionMemberId);
		calendarVo.setType(type);
		calendarVo.setSubTtlLimit(subTtlLimit);
		calendarVo.setProcessingColor(processingColor);
		calendarVo.setNotCompleteColor(notCompleteColor);
		calendarVo.setCompleteColor(completeColor);
		
		return feedService.selectFeedCalendarList(calendarVo);
	}

}