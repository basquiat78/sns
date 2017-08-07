package org.uengine.sns.feed.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.jetty.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.feed.service.FeedInterfaceService;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.service.FeedToDoService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.vo.NoticeVo;

/**
 * 
 * FeedInterfaceController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class FeedInterfaceController extends ExceptionController {
	
	private static final Logger LOG = LoggerFactory.getLogger(FeedInterfaceController.class);
	
	@Autowired
	FeedService feedService;
	
	@Autowired
	FeedInterfaceService feedInterfaceService;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	FeedToDoService feedTodoService;
	
	/**
	 * FEED 등록(외부연동 - 댓글 등록)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/interface/comments", method=RequestMethod.POST)
	public @ResponseBody FeedVo addFeedComment(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		
		feedVo.setFeedType(SNSCodeMaster.FEED_TYPE.COMMENT.toString());
		feedVo = feedInterfaceService.interfaceFeedInsert(HttpUtil.getLocaleString(request), feedVo);

		request.setAttribute("userId", feedVo.getFeedMemberSyncKey());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name(), feedVo.getRegMemberId());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedVo.getFeedId());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedVo.getFeedTitle());
		
		return feedVo;
	}
	
	/**
	 * FEED 등록(외부연동 - 게시판 피드 등록)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/interface/boards", method=RequestMethod.POST)
	public @ResponseBody FeedVo addFeedBoard(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		
		feedVo.setFeedType(SNSCodeMaster.FEED_TYPE.BOARD.toString());
		request.setAttribute("userId", feedVo.getFeedMemberSyncKey());
		feedVo = feedInterfaceService.interfaceFeedInsert(HttpUtil.getLocaleString(request), feedVo);

		try {
			List<NoticeVo> notiArrList = feedService.getGroupFeedNotiList(feedVo);
			if(notiArrList.size() != 0) {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
			} else {
				if(StringUtil.nonNull(feedVo.getDueDate()).length() > 0) {
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTI_TYPE.name(), SNSCodeMaster.FEED_TYPE.TODO.name());
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_MSG.name(), feedVo.getDueDate());
				}
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedVo.getFeedId());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedVo.getFeedTitle());
			}
		} catch (Exception ex ){
			LOG.error("", ex);
		}
		
		return feedVo;
	}
	
	/**
	 * FEED 등록(외부연동 - 쉐어포인트 피드 등록)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/interface/sharepoint", method=RequestMethod.POST)
	public @ResponseBody FeedVo addFeedSharepoint(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		
		feedVo.setFeedType(SNSCodeMaster.FEED_TYPE.SHAREPOINT.toString());
		feedVo = feedInterfaceService.interfaceFeedInsert(HttpUtil.getLocaleString(request), feedVo);
		request.setAttribute("userId", feedVo.getFeedMemberSyncKey());

		try {
			List<NoticeVo> notiArrList = feedService.getGroupFeedNotiList(feedVo);
			if(notiArrList.size() != 0) {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
			} else {
				if(StringUtil.nonNull(feedVo.getDueDate()).length() > 0) {
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTI_TYPE.name(), SNSCodeMaster.FEED_TYPE.TODO.name());
					request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_MSG.name(), feedVo.getDueDate());
				}
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedVo.getFeedId());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedVo.getFeedTitle());
			}
		} catch (Exception ex ){
			LOG.error("", ex);
		}
		
		return feedVo;
	}
	
	/**
	 * FEED 등록(외부연동 - 전자결재 피드 등록)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/interface/approval", method=RequestMethod.POST)
	public @ResponseBody FeedVo addFeedApproval(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		
		feedVo.setFeedType(SNSCodeMaster.FEED_TYPE.APPROVAL.toString());
		feedVo = feedInterfaceService.interfaceFeedInsert(HttpUtil.getLocaleString(request), feedVo);

		request.setAttribute("userId", feedVo.getFeedMemberSyncKey());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name(), feedVo.getRegMemberId());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedVo.getFeedId());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedVo.getFeedTitle());

		return feedVo;
	}
	
	/**
	 * FEED 외부연동 - 전자결재완료
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/interface/approval/complete", method=RequestMethod.POST)
	public @ResponseBody FeedVo completeFeedApproval(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		
		feedVo.setFeedType(SNSCodeMaster.FEED_TYPE.APPROVAL.toString());
		FeedVo retFeedVo = feedInterfaceService.approvalComplete(HttpUtil.getLocaleString(request), feedVo);
		
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name(), retFeedVo.getRegMemberId());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), retFeedVo.getFeedId());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), retFeedVo.getFeedTitle());
		
		return retFeedVo;
	}

	/**
	 * FEED 외부연동 - 할일등록(Web)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/todo/external", method=RequestMethod.POST)
	public @ResponseBody FeedVo addFeedExternal(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		
		MemberVo member = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), feedVo.getFeedMemberSyncKey());
		feedVo.setRegMemberId(member.getMemberId());;
		
		feedVo.setToDoExternal(true);
		feedVo = feedService.insertFeed(HttpUtil.getLocaleString(request), feedVo);

		request.setAttribute("userId", feedVo.getFeedMemberSyncKey());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name(), feedVo.getRegMemberId());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedVo.getFeedId());
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedVo.getFeedTitle());

		return feedVo;
	}
	
	/**
	 * FEED 외부연동 - 할일수정(Web)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/todo/external", method=RequestMethod.PUT)
	public @ResponseBody FeedVo setFeedExternal(@RequestBody FeedVo feedVo, HttpServletRequest request) {

		MemberVo member = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), feedVo.getFeedMemberSyncKey());
		feedVo.setRegMemberId(member.getMemberId());;
		feedVo.setToDoExternal(true);
		
		FeedVo vo = feedTodoService.setFeedDueDate(HttpUtil.getLocaleString(request), feedVo);
		
		// Noti관련 추가 Start	
		try {
			FeedVo feedDuedateVo = feedService.getFeed(HttpUtil.getLocaleString(request), feedVo.getFeedId(), member.getMemberId());
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedDuedateVo.getFeedId());
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedDuedateVo.getFeedTitle());
			request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_MSG.name(), feedDuedateVo.getDueDate());
		} catch (Exception ex ){
			
		}
		// Noti관련 추가 End
		
		return vo;
	}
	
	/**
	 * FEED 외부연동 - 할일삭제(Web)
	 * @param feedId
	 * @param request
	 */
	@RequestMapping(value = "/feeds/todo/external/{id}", method=RequestMethod.DELETE)
	public @ResponseBody void delFeedExternal(@PathVariable("id") long feedId, HttpServletRequest request) {
		
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
				}
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedVo.getFeedId());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedVo.getFeedTitle());
			}
		} catch (Exception ex ) {
			
		}
		// ADD 2015.10.27 Noti관련 추가 End	
						
		feedService.deleteFeed(HttpUtil.getLocaleString(request), feedId, false);
	}

}