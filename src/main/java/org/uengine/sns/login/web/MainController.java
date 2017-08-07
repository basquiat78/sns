package org.uengine.sns.login.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.openapi.service.GroupWareService;

/**
 * 
 * MainController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class MainController extends ExceptionController {

	private static final Logger LOG = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	FeedService feedService;
	
	@Autowired
	GroupWareService groupWareService;
	
	/**
	 * memberId 로 개인 홈 화면 진입
	 * @param request
	 * @param targetMemberId
	 * @return String
	 */
	@RequestMapping(value = "/main/{targetMemberId}", method = RequestMethod.GET)
	public String main(HttpServletRequest request, @PathVariable(value="targetMemberId") String targetMemberId) {
		
		targetMemberId = targetMemberId.equals("") || targetMemberId.equals("undefined") ? "2" : targetMemberId;
		
		// 메인 화면 로직
		request.setAttribute("targetMemberId", targetMemberId);
		String gnbStr = "";
		
		// GNB 영역 html 코드
		request.setAttribute("gnbStr", gnbStr);
		
		MemberVo targetMemVo = memberService.getMemberById(HttpUtil.getLocaleString(request), Long.valueOf(targetMemberId));
		String snsMainType = request.getParameter("snsMainType") == null ? "snsMain" : request.getParameter("snsMainType");
		String targetSyncKey = targetMemVo.getSyncKey() == null ? "" : targetMemVo.getSyncKey();
		request.setAttribute("targetSyncKey", targetSyncKey);
		request.setAttribute("snsMainType", snsMainType);
		request.setAttribute("Member", targetMemVo);

		LOG.debug("main end =========================================================== ");
		
		return "sns/main/MemberWidget";
	}
	
	/**
	 * chat창 진입 화면 1
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = "/chat", method = RequestMethod.GET)
	public String chat(HttpServletRequest request) {
		
		HttpSession session = request.getSession(false);
		
		long memberId = (long) session.getAttribute("memberId");
		
		MemberVo memberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), memberId);
		
		request.setAttribute("memberId", memberVo.getMemberId());
		request.setAttribute("userId", memberVo.getSyncKey());
		request.setAttribute("userName", memberVo.getMemberName());
		
		return "sns/chat/main";
		
	}
	
	/**
	 * chat창 진입 화면 2
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = "/chat1", method = RequestMethod.POST)
	public String chat1(HttpServletRequest request) {
		
		HttpSession session = request.getSession(false);
		
		long memberId = (long) session.getAttribute("memberId");
		
		MemberVo memberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), memberId);
		
		request.setAttribute("memberId", memberVo.getMemberId());
		request.setAttribute("userId", memberVo.getSyncKey());
		request.setAttribute("userName", memberVo.getMemberName());
		
		return "sns/chat/main1";
		
	}
	
	/**
	 * chat창 진입 화면 2
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = "/chat2", method = RequestMethod.POST)
	public String chat2(HttpServletRequest request) {
		
		HttpSession session = request.getSession(false);
		
		long memberId = (long) session.getAttribute("memberId");
		
		MemberVo memberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), memberId);
		
		String roomId = "";
		String roomFlag = "";
		
		if(!StringUtils.isEmpty(request.getParameter("roomId"))) {
			roomId = request.getParameter("roomId");
		}
		
		if(!StringUtils.isEmpty(request.getParameter("roomFlag"))) {
			roomFlag = request.getParameter("roomFlag");
		}
		
		request.setAttribute("memberId", memberVo.getMemberId());
		request.setAttribute("userId", memberVo.getSyncKey());
		request.setAttribute("userName", memberVo.getMemberName());
		request.setAttribute("userType", request.getParameter("userType"));
		request.setAttribute("roomId", roomId);
		request.setAttribute("roomFlag", roomFlag);
		return "sns/chat/main1";
		
	}
	
	/**
	 * chat창 진입 화면 3
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = "/chat3", method = RequestMethod.GET)
	public String chat3(HttpServletRequest request) {
		
		HttpSession session = request.getSession(false);
		
		long memberId = (long) session.getAttribute("memberId");
		
		MemberVo memberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), memberId);
		
		request.setAttribute("memberId", memberVo.getMemberId());
		request.setAttribute("userId", memberVo.getSyncKey());
		request.setAttribute("userName", memberVo.getMemberName());
		
		return "sns/chat/init";
		
	}
	
	/**
	 * groupId 로 그룹  홈 화면 진입
	 * @param request
	 * @param groupId
	 * @return String
	 */
	@RequestMapping(value = "/group/{groupId}", method = RequestMethod.GET)
	public String group(HttpServletRequest request, @PathVariable(value="groupId") long groupId) {

		/**
		 * 로그인 계정 기준 정보
		 */
		GroupVo groupVo = groupService.getGroupById(groupId);
		MemberVo memberVo = (MemberVo) request.getAttribute("Member");
		request.setAttribute("targetMemberName", memberVo.getMemberName());
		request.setAttribute("targetMemberId",  memberVo.getMemberId());
		request.setAttribute("group", groupVo);

		// GNB 영역 html 코드
		String gnbStr = groupWareService.getCommonGnbData(memberVo.getSyncKey(), request.isSecure());
		request.setAttribute("gnbStr", gnbStr);
		
		return "sns/main/GroupWidget";
		
	}
	
	/**
	 * feedId 로 피드 상세 화면 진입
	 * @param request
	 * @param feedId
	 * @return String
	 */
	@RequestMapping(value = "/feeddetail/{feedId}", method = RequestMethod.GET)
	public String feedDetail(HttpServletRequest request, @PathVariable(value="feedId") long feedId) {

		/**
		 * 로그인 계정 기준 정보
		 */
		MemberVo memberVo = (MemberVo) request.getAttribute("Member");
		if(memberVo != null) {
			request.setAttribute("targetMemberName", memberVo.getMemberName());
			request.setAttribute("targetMemberId",  memberVo.getMemberId());
		}
		
		request.setAttribute("detailFeedId", feedId);

		return "sns/main/FeedDetailWidget";
		
	}
	
	/**
	 * 그룹웨어 userId 로 개인 홈 화면 진입
	 * @param request
	 * @param userId
	 * @return String
	 */
	@RequestMapping(value = "/home/{userId:.+}", method = RequestMethod.GET)
	public String mainByUserId(HttpServletRequest request, @PathVariable(value="userId") String userId) {
		
		MemberVo memberVo = (MemberVo) request.getAttribute("Member");
		
		// 로그인 세션과 같은 경우는 세션 멤버 사용
		if(memberVo == null) {
			memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
		}
		
		request.setAttribute("targetMemberId", String.valueOf(memberVo.getMemberId()));

		// GNB 영역 html 코드
		String gnbStr = groupWareService.getCommonGnbData(memberVo.getSyncKey(), request.isSecure());
		request.setAttribute("gnbStr", gnbStr);
		
		return "sns/main/MemberWidget";
	}

	/**
	 * 알림 목록 화면으로 진입
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = "/main/totalNoti")
	public String goTotalNoti(HttpServletRequest request) {
		
		HttpSession session = request.getSession(false);
		long memberId = (long) (session != null && request.getAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name()) == null 
				? session.getAttribute("memberId") :  request.getAttribute(SNSCodeMaster.NOTI_ATTR.FROM_MEMBER_ID.name()));
		MemberVo targetMemVo = memberService.getMemberById(HttpUtil.getLocaleString(request), Long.valueOf(memberId));
		String targetSyncKey = targetMemVo.getSyncKey() == null ? "" : targetMemVo.getSyncKey();

		// GNB 영역 html 코드
		String gnbStr = groupWareService.getCommonGnbData(targetSyncKey, request.isSecure());
		request.setAttribute("gnbStr", gnbStr);
		
		request.setAttribute("targetMemberId", memberId);
		request.setAttribute("targetSyncKey", targetSyncKey);
		request.setAttribute("snsMainType", "totalNoti");

		LOG.debug("goTotalNoti end =========================================================== ");
		return "sns/main/MemberWidget";
	}
	
	/**
	 * feedId 로 임베디드 코멘트 진입
	 * @param request
	 * @param feedId
	 * @return String
	 */
	@RequestMapping(value = "/embeddedComments/{feedId}", method = RequestMethod.GET)
	public String embeddedComment(HttpServletRequest request, @PathVariable(value="feedId") String feedId) {
		
		long memberId = feedService.getOneFeed(HttpUtil.getLocaleString(request), Long.parseLong(feedId), 0).getRegMemberId();
		request.setAttribute("targetMemberId", memberId);
		request.setAttribute("feedId", feedId);
		return "sns/embeded/EmbededFeedComment";
	}
	
	/**
	 * 연동 아이디로 임베디드 코멘트 진입
	 * @param request
	 * @param infId
	 * @return
	 */
	@RequestMapping(value = "/embeddedComments/infid/{infId}", method = RequestMethod.GET)
	public String embeddedCommentWithInfId(HttpServletRequest request, @PathVariable(value="infId") String infId) {
		
		FeedVo fv = feedService.getOneFeedWithInf(HttpUtil.getLocaleString(request), infId);
		long memberId = feedService.getOneFeed(HttpUtil.getLocaleString(request), fv.getFeedId(), 0).getRegMemberId();
		request.setAttribute("targetMemberId", memberId);
		request.setAttribute("feedId", fv.getFeedId());
		return "sns/embeded/EmbededFeedComment";
	}

	/**
	 * userId 로 embedded 개인 홈 피드 목록 진입
	 * @param request
	 * @param userId
	 * @return String
	 */
	@RequestMapping(value = "/embeddedMain/{userId:.+}", method = RequestMethod.GET)
	public String embeddedMain(HttpServletRequest request, @PathVariable(value="userId") String userId) {
		
		// 그룹웨어 아이디로 SNS 메인페이지 접근
		MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
		request.setAttribute("targetMemberId", String.valueOf(memberVo.getMemberId()));
		return "sns/embeded/EmbededMain";
	}
	
	/**
	 * userId 로 embedded 피드 쓰기
	 * @param request
	 * @param userId
	 * @return
	 */
	@RequestMapping(value = "/embeddedFeedApp/{userId:.+}", method = RequestMethod.GET)
	public String embeddedFeedApp(HttpServletRequest request, @PathVariable(value="userId") String userId) {
		
		// 그룹웨어 아이디로 SNS 메인페이지 접근
		MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
		
		request.setAttribute("targetMemberId", String.valueOf(memberVo.getMemberId()));
		request.setAttribute("targetMemberName", String.valueOf(memberVo.getMemberName()));
		request.setAttribute("feedtitle", request.getParameter("feedtitle"));
		request.setAttribute("groupId", request.getParameter("groupId") != null ? request.getParameter("groupId") : "");
		request.setAttribute("windowTitle", request.getParameter("windowTitle") != null ? request.getParameter("windowTitle") : "SNS 공유");
		return "sns/embeded/EmbededFeedApp";
	}

	/**
	 * groupId 로 embedded 그룹 진입
	 * @param request
	 * @param groupId
	 * @return String
	 */
	@RequestMapping(value = "/embeddedGroup/{groupId}", method = RequestMethod.GET)
	public String embeddedGroup(HttpServletRequest request, @PathVariable(value="groupId") String groupId) {
		
		// 그룹웨어 groupId 로 embedded 그룹 홈 피드 목록
		long memberId = (Long) request.getSession(false).getAttribute("memberId");
		
		request.setAttribute("targetMemberId", memberId);
		request.setAttribute("groupId", groupId);
		return "sns/embeded/EmbededGroup";
	}

}