package org.uengine.sns.feed.web;

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
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * FeedGroupwareController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class FeedGroupwareController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(FeedGroupwareController.class);

	@Autowired
	FeedService feedService;
	
	@Autowired
	MemberService memberService;
	
	/**
	 * FEED 전자결재 목록 가져오기
	 * @param param
	 * @param request
	 * @return List<FeedVo>
	 */
	@RequestMapping(value = "/feeds/approval", method=RequestMethod.GET)
	public @ResponseBody List<FeedVo> getApprovalList(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		SearchContextVo scv = new SearchContextVo(param);
		scv.feedType(SNSCodeMaster.FEED_TYPE.APPROVAL.toString());

		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		
		List<FeedVo> feedList = feedService.getFeedList(HttpUtil.getLocaleString(request), scv, sessionMemberId);

		for(FeedVo feedVo : feedList) {
			// 전자결재인 경우 타이틀을 보여주지 않음.
			if(SNSCodeMaster.FEED_TYPE.APPROVAL.name().equals(feedVo.getFeedType())) {
				feedVo.setFeedTitle("");
			}
		}
		
		return feedList;
	}
	
	/**
	 * 게시판 목록 가져오기
	 * @param param
	 * @param request
	 * @return List<FeedVo>
	 */
	@RequestMapping(value = "/feeds/boards", method=RequestMethod.GET)
	public @ResponseBody List<FeedVo> addFeedShare(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		SearchContextVo scv = new SearchContextVo(param);
		scv.feedType(SNSCodeMaster.FEED_TYPE.BOARD.toString());

		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		
		return feedService.getFeedList(HttpUtil.getLocaleString(request), scv, sessionMemberId);
	}

}