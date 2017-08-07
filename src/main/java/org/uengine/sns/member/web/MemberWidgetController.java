package org.uengine.sns.member.web;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.service.TagService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.TagCloudVo;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.recent.service.RecentService;

/**
 * 
 * MemberWidgetController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class MemberWidgetController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MemberWidgetController.class);
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	RecentService recentService;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	TagService tagService;
	
	@Autowired
	FeedService feedService;
	
	/**
	 * search widgets groups by searchKey
	 * @param param
	 * @return List<GroupVo>
	 */
	@RequestMapping(value = "/members/widgets/groups", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> memberGroupList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return groupService.getGroupList(scv);
	}
	
	/**
	 * 추천 그룹 리스트
	 * @param param
	 * @return List<GroupVo>
	 */
	@RequestMapping(value = "/members/widgets/recgroups", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> recGroupList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return groupService.getGroupList(scv);
	}
	
	/**
	 * 신규 그룹 리스트
	 * @param param
	 * @return List<GroupVo>
	 */
	@RequestMapping(value = "/members/widgets/newgroups", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> newGroupList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		scv.regDttm(new Date());
		return groupService.getGroupList(scv);
	} 
	
	/**
	 * 연락처(인터페이스: Lync, outlook)
	 * 아웃룩 또는 메신저 연동시 사용
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "/members/widgets/addresses", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> infAddress(@RequestParam Map<Object, Object> param) {
		/**
		 * 커스터마이징 영역
		 */
		return null;
	} 
	
	/**
	 * 최근활동
	 * @param memberId
	 * @return List<NoticeVo>
	 */
	@RequestMapping(value = "/members/widgets/rctacts/{id}", method = RequestMethod.GET)
	public @ResponseBody List<NoticeVo> noticeMemberList(@PathVariable("id") long memberId) {
		return recentService.getMemberRecentActivityList(memberId);
	} 
	
	/**
	 * 최근활동 with request
	 * @param request
	 * @return List<NoticeVo>
	 */
	@RequestMapping(value = "/members/widgets/rctacts/request" , method = RequestMethod.GET)
	public @ResponseBody List<NoticeVo> noticeMemberListRequest(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		long memberId = (Long) session.getAttribute("memberId");
		return recentService.getMemberRecentActivityList(memberId);
	}

	/**
	 * 할일 목록(자기 FEED기준으로 dueDate가 현재 날자 기준으로 가장 근접한 FEED 리스트 5건정도)
	 * @param param
	 * @param request
	 * @return List<FeedVo>
	 */
	@RequestMapping(value="/members/widgets/feeds/todo", method=RequestMethod.GET)
	public @ResponseBody List<FeedVo> getWidgetFeedTodo(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		
		SearchContextVo scv = new SearchContextVo(param);
		scv.menuType("MEMBER");

		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		scv.sessionMemberId(sessionMemberId);
		
		return feedService.getTodoFeedList(scv);
	}
	
	/**
	 * 태그 클라우드(태그 클라우드 테이블에서 데이터 취득 - 개인 전체 기준)
	 * @param param
	 * @return List<TagCloudVo>
	 */
	@RequestMapping(value = "/members/widgets/tagclouds", method = RequestMethod.GET)
	public @ResponseBody List<TagCloudVo> memberTagCloudList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return tagService.getTagCloudList(scv);
	}

}