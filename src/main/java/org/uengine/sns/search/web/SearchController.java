package org.uengine.sns.search.web;

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
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.search.service.SearchService;
import org.uengine.sns.search.vo.SearchVo;

/**
 * SearchController
 * <pre>
 * 	 <p>GroupWare로부터 제공받는 api로 </p>
 *   <p>커스터마이징 되어야 하는 영역</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class SearchController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(SearchController.class);
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	SearchService searchService;
	
	/**
	 * 본문, 해시태그 등 통합 검색을 통해 피드 목록을 리턴
	 * 커스터마이징 영역
	 * @param request
	 * @param keyword
	 * @param category
	 * @param groupId
	 * @param type
	 * @return List<FeedVo>
	 */
	@RequestMapping(value = "/search/feeds", method = RequestMethod.GET)
	public @ResponseBody List<FeedVo> feedsSearch (
			HttpServletRequest request,
			@RequestParam(required=false) String keyword,
			@RequestParam(required=true) String category,
			@RequestParam(required=false) String groupId,
			@RequestParam(required=false) String type) {
		
		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		String userId = (String) request.getAttribute("userId");
		return searchService.getFeedsSearchBySharePoint(HttpUtil.getLocaleString(request), sessionMemberId, keyword, category, type, userId, groupId);
	}
	
	/**
	 * 사용자이름 통합 검색
	 * 커스터마이징 영역
	 * @param param
	 * @return List<SearchVo>
	 */
	@RequestMapping(value = "/search/names", method = RequestMethod.GET)
	public @ResponseBody List<SearchVo> namesSearch(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return searchService.getNamesSearch(scv);
	}
	
	/**
	 * 파일명 통합 검색
	 * 커스터마이징 영역
	 * @param param
	 * @return List<SearchVo>
	 */
	@RequestMapping(value = "/search/filenames", method = RequestMethod.GET)
	public @ResponseBody List<SearchVo> filenamesSearch(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return searchService.getFileNamesSearch(scv);
	}

}