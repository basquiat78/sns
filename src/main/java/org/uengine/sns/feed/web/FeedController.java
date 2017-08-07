package org.uengine.sns.feed.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;
import org.eclipse.jetty.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.Exception.NotAcceptableException;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.service.FollowerService;
import org.uengine.sns.feed.service.LikeItService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.FollowerVo;
import org.uengine.sns.feed.vo.LikeItVo;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.tenant.service.UserTenantMappingService;
import org.uengine.sns.tenant.vo.UserTenantMappingVo;

/**
 * 
 * FeedController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class FeedController extends ExceptionController {
	
	private static final Logger LOG = LoggerFactory.getLogger(FeedController.class);
	
	@Autowired
	MessageSource messageSource;
	
	@Autowired
	FeedService feedService;
	
	@Autowired
	LikeItService likeItService;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	UserTenantMappingService tenantMappingService;
	
	@Autowired
	FollowerService followerService;
	
	@Autowired
	GroupService groupService;
	
	/**
	 * FEED 리스트(그룹, 멤버)
	 * SearchContextVo에 설정된 파라미터의 key,value 형태로 받아 검색 필터 처리 
	 * @param param
	 * @param request
	 * @return List<FeedVo>
	 */
	@RequestMapping(value = "/feeds", method = RequestMethod.GET)
	public @ResponseBody List<FeedVo> feedList(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		SearchContextVo scv = new SearchContextVo(param);

		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
			if(scv.getMemberId() == 0) {
				scv.memberId(sessionMemberId);
			}
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
			if(scv.getMemberId() == 0) {
				scv.memberId(memberVo.getMemberId());
			}
		}
		
		List<FeedVo> feedList = feedService.getFeedList(HttpUtil.getLocaleString(request), scv, sessionMemberId);
		
		for(FeedVo feedVo : feedList) {
			// 전자결재인 경우 타이틀을 보여주지 않음.
			if(SNSCodeMaster.FEED_TYPE.APPROVAL.name().equals(feedVo.getFeedType())) feedVo.setFeedTitle("");
		}
		
		return feedList;
	}
	
	/**
	 * FEED 상세
	 * @param feedId
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/{id}", method = RequestMethod.GET)
    public @ResponseBody FeedVo getFeedDetail(@PathVariable("id") long feedId, HttpServletRequest request) {

		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}

		FeedVo feedVo = feedService.getFeed(HttpUtil.getLocaleString(request), feedId, sessionMemberId);
		
		if(feedVo == null || feedVo.getIsDeleted() == 1) {
			
			String msg2 =  messageSource.getMessage("feed.exception.FEEDISNOMOREEXIST", null, HttpUtil.getLocale(request));
			
			throw new NotAcceptableException(msg2);
		}
		
		boolean isView = feedService.isReadAuthFeed(feedVo.getFeedType(), feedId, sessionMemberId);
		boolean isSysMgr = false;
		MemberVo mv = memberService.getMemberById("ko", sessionMemberId);
		if(mv.getIsSysAdmin() == 1) {
			isSysMgr = true;
		}
		
		if(!isView && !isSysMgr) {
			String msg1 =  messageSource.getMessage("feed.exception.FEEDACCESSISNOTALLOWED", null, HttpUtil.getLocale(request));
			throw new NotAcceptableException(msg1);
		}
		
		LikeItVo likeItVo = new LikeItVo();
		likeItVo.setFeedId(feedId);
		likeItVo.setRegMemberId(sessionMemberId);
		int likeItByMe = likeItService.getLikeIt(likeItVo);
		feedVo.setLikeItByMe(likeItByMe);

		// 전자결재인 경우 타이틀을 보여주지 않음.
		if(SNSCodeMaster.FEED_TYPE.APPROVAL.name().equals(feedVo.getFeedType())) {
			feedVo.setFeedTitle("");
		}
		
		return feedVo;
	}

	/**
	 * 웹소켓으로 댓글을 새로 보여줄 시 화면에 적용된 날짜를 기준으로 댓글 목록을 가져온다.
	 * @param param
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/regdttm", method = RequestMethod.GET)
	public @ResponseBody FeedVo getCommentListByRegdttm(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		long feedId = Long.parseLong(param.get("feedId").toString());
		long regDttm = Long.parseLong(param.get("regDttm").toString());
		return feedService.getCommentListByRegDttm(HttpUtil.getLocaleString(request), feedId, regDttm, 0);
	}
	
	
	/**
	 * 이전 댓글 리스트
	 * @param feedId
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/bfcmts", method = RequestMethod.GET)
    public @ResponseBody FeedVo getBeforeFeedComment(@PathVariable("id") long feedId, HttpServletRequest request) {
		return feedService.getBeforeCommentList(HttpUtil.getLocaleString(request), feedId, 0);
	}
	
	
	/**
	 * FEED 등록(Web)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds", method=RequestMethod.POST)
	public @ResponseBody FeedVo addFeed(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		FeedVo vo = feedService.insertFeed(HttpUtil.getLocaleString(request), feedVo);
		// ADD 2015.10.23 Noti관련 추가 Start
		try {
			List<NoticeVo> notiArrList = feedService.getGroupFeedNotiList(vo);
			if(notiArrList.size() != 0) {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
			} else {
				if(StringUtil.nonNull(vo.getDueDate()).length() > 0) {
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTI_TYPE.name(), SNSCodeMaster.FEED_TYPE.TODO.name());
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_MSG.name(), vo.getDueDate());
				}
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), vo.getFeedId());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), vo.getFeedTitle());
			}
		} catch (Exception ex ){
			LOG.error("", ex);
		}
		// ADD 2015.10.23 Noti관련 추가 End	
		MemberVo regMemberVo = vo.getMemberVo();
		Map<String, Object> map = new HashMap<String, Object>();
		String lang = HttpUtil.getLocaleString(request);
		map.put("lang", lang);
		map.put("memberId", regMemberVo.getMemberId());
		List<UserTenantMappingVo> userTenantMappingList = tenantMappingService.getUserTenantMappingList(map);
		regMemberVo.setTenantMappingList(userTenantMappingList);
		feedVo.setMemberVo(regMemberVo);
		
		return feedVo;
	}
	
	/**
	 * FEED 등록(일반글)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value= "/feeds/general" , method=RequestMethod.POST)
	public @ResponseBody FeedVo addFeedGeneral(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		feedVo.setFeedType(SNSCodeMaster.FEED_TYPE.GENERAL.toString());
		FeedVo vo = feedService.insertFeed(HttpUtil.getLocaleString(request), feedVo);
		
		// ADD 2015.10.23 Noti관련 추가 Start
		try {
			List<NoticeVo> notiArrList = feedService.getGroupFeedNotiList(vo);
			if (notiArrList.size() != 0) {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
			} else {
				if (StringUtil.nonNull(vo.getDueDate()).length() > 0) {
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTI_TYPE.name(), SNSCodeMaster.FEED_TYPE.TODO.name());
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_MSG.name(), vo.getDueDate());
				}
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), vo.getFeedId());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), vo.getFeedTitle());
			}
		} catch (Exception ex ){
			LOG.error("", ex);
		}
		// ADD 2015.10.23 Noti관련 추가 End	
		
		return feedVo;
	}
	
	
	/**
	 * FEED 등록(공지사항)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/notice", method=RequestMethod.POST)
	public @ResponseBody FeedVo addFeedNotice(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		feedVo.setFeedType(SNSCodeMaster.FEED_TYPE.NOTICE.toString());
		FeedVo vo = feedService.insertFeed(HttpUtil.getLocaleString(request), feedVo);
		
		// ADD 2015.10.23 Noti관련 추가 Start
		try {
			List<NoticeVo> notiArrList = feedService.getGroupFeedNotiList(vo);
			if (notiArrList.size() != 0) {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
			} else {
				if (StringUtil.nonNull(vo.getDueDate()).length() > 0) {
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTI_TYPE.name(), SNSCodeMaster.FEED_TYPE.TODO.name());
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_MSG.name(), vo.getDueDate());
				}
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), vo.getFeedId());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), vo.getFeedTitle());
			}
		} catch (Exception ex ){
			LOG.error("", ex);
		}
		// ADD 2015.10.23 Noti관련 추가 End	
		
		return feedVo;
	}
	
	/**
	 * FEED 등록(댓글)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value="feeds/comments", method=RequestMethod.POST)
	public @ResponseBody FeedVo addFeedComment(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		feedVo.setFeedType(SNSCodeMaster.FEED_TYPE.COMMENT.toString());
		
		if(feedVo.getFromServer() != null && feedVo.getFromServer().equals("y")) {
			long pFeedId = feedVo.getpFeedId();
			int feedCommentCnt = feedService.getCommentFeedCnt(pFeedId);
			if(feedCommentCnt == 0) {
				FeedVo pfeedVo = feedService.getFeed(HttpUtil.getLocaleString(request), pFeedId, 0);
				
				FollowerVo fv = new FollowerVo();
				fv.setItemId(pFeedId);
				fv.setFollowerId(pfeedVo.getRegMemberId());
				fv.setItemType(SNSCodeMaster.ITEM_TYPE.FEED.name());
				fv.setFollowerType(SNSCodeMaster.FOLLOWER_TYPE.MEMBER.name());
				fv.setRegMemberId(pfeedVo.getRegMemberId());
				fv.setFollowerName(pfeedVo.getpMemberName());
				followerService.insertFollower(fv);
			}
		}
		
		FeedVo vo = feedService.insertFeed(HttpUtil.getLocaleString(request), feedVo);
		
		if (feedVo.isNoticeExc()) {
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), vo.getFeedId());
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), vo.getFeedTitle());
		}
		
		return vo;
	}
	

	/**
	 * FEED 수정
	 * @param feedVo
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds", method=RequestMethod.PUT)
	public @ResponseBody FeedVo upddateFeed(@RequestBody FeedVo feedVo) {
		feedService.updateFeed(feedVo);
		return feedVo;
	}
	
	/**
	 * FEED 댓글 수정
	 * @param feedVo
	 * @return FeedVo
	 */
	@RequestMapping(value = "feeds/comments", method=RequestMethod.PUT)
	public @ResponseBody FeedVo upddateCommentFeed(@RequestBody FeedVo feedVo) {
		feedService.updateCommentFeed(feedVo);
		return feedVo;
	}
	
	/**
	 * FEED 삭제
	 * @param feedId
	 * @param request
	 */
	@RequestMapping(value = "/feeds/{id}", method = RequestMethod.DELETE)
    public @ResponseBody void delete(@PathVariable("id") long feedId, HttpServletRequest request) {

		FeedVo feedVo = feedService.getOneFeed(HttpUtil.getLocaleString(request), feedId, 0);
		
		// ADD 2015.10.27 Noti관련 추가 Start
		try {
			FeedVo delFeedVo = feedService.getFeed(HttpUtil.getLocaleString(request), feedId, 0);
			List<NoticeVo> notiArrList = feedService.getDelGroupFeedNotiList(delFeedVo);
			if(notiArrList.size() != 0) {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
			} else {
				if(StringUtil.nonNull(feedVo.getDueDate()).length() > 0) {
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTI_TYPE.name(), SNSCodeMaster.FEED_TYPE.TODO.name());
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_MSG.name(), feedVo.getDueDate());
				} else if(SNSCodeMaster.FEED_TYPE.POLL.name().equals(feedVo.getFeedType())) {
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTI_TYPE.name(), SNSCodeMaster.FEED_TYPE.POLL.name());
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_MSG.name(), feedVo.getDueDate());
				}
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedVo.getFeedId());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedVo.getFeedTitle());
			}
		} catch (Exception ex ) {
			LOG.error("", ex);
		}
		// ADD 2015.10.27 Noti관련 추가 End	
				
		feedService.deleteFeed(HttpUtil.getLocaleString(request), feedId);
	}

	/**
	 * Comment FEED 삭제
	 * @param feedVo
	 * @param request
	 */
	@RequestMapping(value = "/feeds", method = RequestMethod.DELETE)
    public @ResponseBody void deleteComment(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		feedService.deleteCommentFeed(feedVo);
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedVo.getFeedId());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedVo.getFeedTitle());
		
	}
	
	/**
	 * @param feedIds
	 * @param map
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/feeds/{id}", method = RequestMethod.POST)
    public @ResponseBody void deleteIds(@PathVariable("id") long[] feedIds, ModelMap map
    		,HttpServletRequest request, HttpServletResponse response) {
		System.out.println(feedIds);
	}
	
	/**
	 * Federation Meta FEED 등록
	 * @param map
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/federation", method = RequestMethod.POST)
	public @ResponseBody FeedVo insertFederationFeed(ModelMap map, HttpServletRequest request) {
		FeedVo feedVo = null;
		FollowerVo followerVo = null; 
		try {
			feedVo = new ObjectMapper().readValue(request.getParameter("feedVo"), FeedVo.class);
			followerVo = new ObjectMapper().readValue(request.getParameter("followerVo"), FollowerVo.class);
		} catch (IOException e) {
			new org.uengine.sns.common.Exception.SNSRunTimeException("");
		}
		return feedService.insertFederationFeed(HttpUtil.getLocaleString(request), feedVo, followerVo);
	}
	
 	/**
 	 시스템 피드- 전체 리스트
	 * SearchContextVo에 설정된 파라미터의 key,value 형태로 받아 검색 필터 처리
 	 * @param param
 	 * @return List<FeedVo>
 	 */
	@RequestMapping(value = "/feeds/system", method = RequestMethod.GET)
	public @ResponseBody List<FeedVo> allFeedList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return feedService.selectAllSystemFeedList(scv);
	}

	/**
	 * 피드와 댓글 목록을 한번에 얻는다.
	 * @param feedId
	 * @param limit
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/withcomments/{feedId}", method = RequestMethod.GET)
	public @ResponseBody FeedVo getFeedAndCommentListByLimit(
			@PathVariable("feedId") long feedId
			, @RequestParam(value="limit", required = false, defaultValue="10") int limit
			, HttpServletRequest request) {

		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		
		FeedVo feedVo = feedService.getFeedCommentListByLimit(HttpUtil.getLocaleString(request), feedId, sessionMemberId, limit);
		boolean isView = feedService.isReadAuthFeed(feedVo.getFeedType(), feedId, sessionMemberId);
		if(!isView) {
			String msg1 =  messageSource.getMessage("feed.exception.FEEDACCESSISNOTALLOWED", null, HttpUtil.getLocale(request));
			throw new NotAcceptableException(msg1);
		}
		
		if(feedVo.getIsDeleted() == 1) {
			String msg2 =  messageSource.getMessage("feed.exception.FEEDISNOMOREEXIST", null, HttpUtil.getLocale(request));
			throw new NotAcceptableException(msg2);
		}
		
		LikeItVo likeItVo = new LikeItVo();
		likeItVo.setFeedId(feedId);
		likeItVo.setRegMemberId(sessionMemberId);
		int likeItByMe = likeItService.getLikeIt(likeItVo);
		feedVo.setLikeItByMe(likeItByMe);

		// 전자결재인 경우 타이틀을 보여주지 않음.
		if(SNSCodeMaster.FEED_TYPE.APPROVAL.name().equals(feedVo.getFeedType())) {
			feedVo.setFeedTitle("");
		}
		
		return feedVo;
	}
	
	/**
	 * 그룹피드 전체를 불러온다.
	 * @param model
	 * @param groupId
	 * @param cType
	 * @param startDate
	 * @param endDate
	 * @return ModelAndView
	 * @throws Exception
	 */
	@RequestMapping(value = "/feeds/feeddownload", method = RequestMethod.GET)
	public ModelAndView downloadfeed(ModelMap model
			, @RequestParam(value="groupId",required=true) long groupId
			, @RequestParam(value="cType",required=false) int cType
			, @RequestParam(value="startDate",required=false) String startDate
			, @RequestParam(value="endDate",required=false) String endDate
			) throws Exception {
		HashMap<String, Object> h = new HashMap<String, Object>();
		h.put("groupId", groupId);
		h.put("cType", cType);
		h.put("startDate", startDate);
		h.put("endDate", endDate);
		List<HashMap<String, Object>> feeddownloadlist = feedService.selectFeedForFeedDownload(h);
		
		GroupVo gv = groupService.getGroupById(groupId);
		
		model.addAttribute("feeddownloadlist", feeddownloadlist);
		model.addAttribute("groupName", gv.getGroupName());
		return new ModelAndView("sns/feed/view/FeedDownloadView", model);
	}

}