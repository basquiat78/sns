package org.uengine.sns.feed.web;

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
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.service.FeedToDoService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.group.service.GroupFollowerService;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.vo.NoticeVo;

/**
 * 
 * FeedTodoController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class FeedToDoController extends ExceptionController {

	private static final Logger LOG = LoggerFactory.getLogger(FeedToDoController.class);
	
	@Autowired
	MemberService memberService;

	@Autowired
	FeedService feedService;
	
	@Autowired
	FeedToDoService feedTodoService;
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	GroupFollowerService groupFollowerService;
	
	/**
	 * 할일 FEED 취득(위젯용)
	 * @param param
	 * @param request
	 * @return List<FeedVo>
	 */
	@RequestMapping(value = "/feeds/todo", method=RequestMethod.GET)
	public @ResponseBody List<FeedVo> getWidgetFeedTodo(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		
		SearchContextVo scv = new SearchContextVo(param);

		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long)session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		
		scv.sessionMemberId(sessionMemberId);
		
		if("GROUP".equals(scv.getMenuType())) {
			
			long groupId = scv.getGroupId();
			GroupVo gv = groupService.getGroupById(groupId);
			boolean isGroupMember = false;
			boolean isSysMgr = false;
			List<GroupFollowerVo> gflist = groupFollowerService.getGroupFollowerById(HttpUtil.getLocaleString(request), groupId);
			for(int i=0; i < gflist.size(); i++) {
				if(gflist.get(i).getMemberId() == sessionMemberId) {
					isGroupMember = true;
					break;
				}
			}
			
			MemberVo mv = memberService.getMemberById("ko", sessionMemberId);
			if(mv.getIsSysAdmin() == 1) isSysMgr = true;
			
			if(!isGroupMember && gv.getIsPublic() == 0 && !isSysMgr) {
				return null;
			}
			
		}
		
		return feedService.getTodoFeedList(scv);
	}
	
	/**
	 * FEED 등록(할일)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/todo", method=RequestMethod.POST)
	public @ResponseBody FeedVo addFeedTodo(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		
		feedVo.setFeedType(SNSCodeMaster.FEED_TYPE.TODO.toString());
		FeedVo retFeedVo = feedService.insertFeed(HttpUtil.getLocaleString(request), feedVo);
		// ADD 2015.11.26 Noti관련 추가 Start
		try {
			List<NoticeVo> notiArrList = feedService.getGroupFeedNotiList(retFeedVo);
			if(notiArrList.size() != 0) {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
			} else {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTI_TYPE.name(), "TODO");
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_MSG.name(), retFeedVo.getDueDate());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), retFeedVo.getFeedId());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), retFeedVo.getFeedTitle());
			}
		} catch (Exception ex ) {
			LOG.error("", ex);
		}
		// ADD 2015.10.26 Noti관련 추가 End	
		
		return retFeedVo;
	}
	
	/**
	 * 할일 완료처리
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/todo/complete", method = RequestMethod.PUT)
	public @ResponseBody FeedVo completeToDo(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		
		FeedVo vo = feedTodoService.completeToDoFeed(HttpUtil.getLocaleString(request), feedVo);
		
		try {
			FeedVo feedDuedateVo = feedService.getFeed(HttpUtil.getLocaleString(request), feedVo.getFeedId(), 0);
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedDuedateVo.getFeedId());
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedDuedateVo.getFeedTitle());
		} catch (Exception ex ) {
			LOG.error("", ex);
		}
		
		return vo;
	}
	
	/**
	 * 할일 미완료처리
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/todo/incomplete", method = RequestMethod.PUT)
	public @ResponseBody FeedVo incompleteTodo(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		return feedTodoService.incompleteToDoFeed(HttpUtil.getLocaleString(request), feedVo);
	}
	
	/**
	 * 만기일자 변경
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/todo/duedate", method = RequestMethod.PUT)
	public @ResponseBody FeedVo setFeedDuedate(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		FeedVo vo = feedTodoService.setFeedDueDate(HttpUtil.getLocaleString(request), feedVo);
		// ADD 2015.10.27 Noti관련 추가 Start	
		try {
			FeedVo feedDuedateVo = feedService.getFeed(HttpUtil.getLocaleString(request), feedVo.getFeedId(), 0);
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedDuedateVo.getFeedId());
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedDuedateVo.getFeedTitle());
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_MSG.name(), feedDuedateVo.getDueDate());
		} catch (Exception ex ){
			LOG.error("", ex);
		}
		// ADD 2015.10.27 Noti관련 추가 End	
		return vo;
	}

}