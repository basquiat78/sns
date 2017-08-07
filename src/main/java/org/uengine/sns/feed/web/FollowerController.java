package org.uengine.sns.feed.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FollowerService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.FollowerInfoVo;
import org.uengine.sns.feed.vo.FollowerVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.vo.NoticeVo;

/**
 * 
 * FollowerController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class FollowerController extends ExceptionController {
	
	private static final Logger LOG = LoggerFactory.getLogger(FollowerController.class);
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	FollowerService followerService;
	
	/**
	 * FOLLOWER 리스트
	 * SearchContextVo에 설정된 파라미터의 key,value 형태로 받아 검색 필터 처리
	 * @param param
	 * @return List<FollowerVo>
	 */
	@RequestMapping(value = "/feeds/followers", method = RequestMethod.GET)
	public @ResponseBody List<FollowerVo> followerList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return followerService.getFollowerList(scv);
	}
	
	/**
	 * TOOLTIP FOLLOWER GROUP 정보
	 * @param followerId
	 * @return FollowerInfoVo
	 */
	@RequestMapping(value = "/feeds/followers/groups/{id}", method = RequestMethod.GET)
	public @ResponseBody FollowerInfoVo followerInofGroup(@PathVariable("id") long followerId) {
		return followerService.getFollowerInfoGroup(followerId);
	}
	
	/**
	 * TOOLTIP FOLLOWER MEMBER 정보
	 * @param followerId
	 * @param request
	 * @return FollowerInfoVo
	 */
	@RequestMapping(value = "/feeds/followers/members/{id}", method = RequestMethod.GET)
	public @ResponseBody FollowerInfoVo followerInofMember(@PathVariable("id") long followerId, HttpServletRequest request) {
		return followerService.getFollowerInfoMember(HttpUtil.getLocaleString(request), followerId);
	}
	
	/**
	 * FEED FOLLOWER 리스트
	 * @param feedId
	 * @return List<FollowerVo>
	 */
	@RequestMapping(value = "/feeds/followers/{id}", method = RequestMethod.GET)
	public @ResponseBody List<FollowerVo> feedFollower(@PathVariable("id") long feedId) {
		return followerService.getFeedFollower(feedId);
	}
	
	/**
	 * FOLLOWER 등록
	 * @param feedVo
	 * @param request
	 * @return List<FollowerVo>
	 */
	@RequestMapping(value = "/feeds/followers", method=RequestMethod.POST)
	public @ResponseBody List<FollowerVo> addFollower(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		// ADD 2015.10.23 Noti관련 추가 Start
		List<NoticeVo> notiArrList = new ArrayList<NoticeVo>();
		try {
			long followerId = -9;
			long regMemberId = -9;
			MemberVo member = null;
			for(FollowerVo followerVo : feedVo.getFeedFollowerList()) {
				followerId = followerVo.getFollowerId();
				regMemberId = followerVo.getRegMemberId();
				member = memberService.getMemberById(HttpUtil.getLocaleString(request), regMemberId);
				NoticeVo noticeVo = new NoticeVo();
				noticeVo.setItemId(feedVo.getFeedId());
				noticeVo.setItemTitle(member.getMemberName());;
				noticeVo.setFromMemberId(followerId);
				
				if(followerId == regMemberId) {
					noticeVo.setIsRead(1);
				}
				
				notiArrList.add(noticeVo);
			}
		} catch (Exception ex) {
			LOG.error("", ex);
		}
		
		request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
		// ADD 2015.10.23 Noti관련 추가 End
		return followerService.insertFeedFollower(HttpUtil.getLocaleString(request), feedVo.getFeedId(), feedVo.getFeedFollowerList());
	}
	
	/**
	 * FOLLOWER 삭제
	 * @param feedVo
	 * @return List<FollowerVo>
	 */
	@RequestMapping(value = "/feeds/followers", method = RequestMethod.DELETE)
	public @ResponseBody List<FollowerVo> delFollower(@RequestBody FeedVo feedVo) {
		return followerService.deleteFollower(feedVo.getFeedFollowerList());
	}
	
	/**
	 * FOLLOWER 등록- federation
	 * @param followerVo
	 * @return FollowerVo
	 */
	@RequestMapping(value = "/feeds/followers/federation", method = RequestMethod.POST)
	public @ResponseBody FollowerVo addFederationFollower(@RequestBody FollowerVo followerVo) {
		return followerService.insertFederationFollower(followerVo);
	}
	
	/**
	 * FOLLOWER 삭제- federation
	 * @param followerVo
	 * @return FollowerVo
	 */
	@RequestMapping(value = "/feeds/followers/federation", method = RequestMethod.DELETE)
	public @ResponseBody FollowerVo delFederationFollower(@RequestBody FollowerVo followerVo) {
		return followerService.deleteFollower(followerVo);
	}
	
	/**
	 * FOLLOWER 리스트
	 * Autocomplete를 위한 컨트롤러
	 * 이것은 그룹 정보와 멤버 정보를 FollowerVo에 담아서 던져준다.
	 * @param term
	 * @param request
	 * @return List<FollowerVo>
	 */
	@RequestMapping(value = "/feeds/followers/autofollowers/{term}", method = RequestMethod.GET)
	public @ResponseBody List<FollowerVo> autoCompleteFollowerList(@PathVariable("term") String term, HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");
		return followerService.getAutoCompleteFollowerList(HttpUtil.getLocaleString(request), term, userId);
	}

	/**
	 * 회사 전체 FOLLOWER 리스트
	 * Autocomplete를 위한 컨트롤러
	 * 이것은 그룹 정보와 멤버 정보를 FollowerVo에 담아서 던져준다.
	 * @param term
	 * @param request
	 * @return List<FollowerVo>
	 */
	@RequestMapping(value = "/feeds/followers/autofollowers/all/{term}", method = RequestMethod.GET)
	public @ResponseBody List<FollowerVo> autoCompleteFollowerListByAll(@PathVariable("term") String term, HttpServletRequest request) {
		return followerService.getAutoCompleteFollowerListByAll(HttpUtil.getLocaleString(request), term);
	}

}