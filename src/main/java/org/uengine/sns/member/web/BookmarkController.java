package org.uengine.sns.member.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.member.service.BookmarkService;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.BookmarkVo;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * BookmarkController
 * @author basquiat
 *
 */
@Controller
public class BookmarkController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(BookmarkController.class);
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	BookmarkService bookmarkService;

	/**
	 * @param param
	 * @param request
	 * @return List<FeedVo>
	 */
	@RequestMapping(value = "/members/bookmarks", method = RequestMethod.GET)
    public @ResponseBody List<FeedVo> getBookmarkList(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		
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
		
		return bookmarkService.getBookmarkList(HttpUtil.getLocaleString(request), scv, sessionMemberId);
	}
	
	/**
	 * 즐겨찾기 등록
	 * @param bookmarkVo
	 * @return BookmarkVo
	 */
	@RequestMapping(value = "/members/bookmarks", method = RequestMethod.POST)
	public @ResponseBody BookmarkVo addBookmark(@RequestBody BookmarkVo bookmarkVo) {
		return bookmarkService.insertBookmark(bookmarkVo);
	}
	
	/**
	 * 즐겨찾기 삭제
	 * @param bookmarkVo
	 * @return BookmarkVo
	 */
	@RequestMapping(value = "/members/bookmarks", method = RequestMethod.DELETE)
	public @ResponseBody BookmarkVo del(@RequestBody BookmarkVo bookmarkVo) {
		return bookmarkService.deleteBookmark(bookmarkVo);
	}

}