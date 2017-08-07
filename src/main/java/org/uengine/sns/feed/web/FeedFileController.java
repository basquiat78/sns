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
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FeedFileService;
import org.uengine.sns.feed.vo.FeedFileVo;
import org.uengine.sns.group.service.GroupFollowerService;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * FeedFileController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class FeedFileController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(FeedFileController.class);
	
	@Autowired
	FeedFileService feedFileService;
	
	@Autowired
	MemberService memberService;

	@Autowired
	GroupService groupService;
	
	@Autowired
	GroupFollowerService groupFollowerService;
	
	/**
	 * 개인 피드 파일 리스트
	 * @param param
	 * @param request
	 * @return List<FeedFileVo>
	 */
	@RequestMapping(value = "/feeds/files/person", method = RequestMethod.GET)
	public @ResponseBody List<FeedFileVo> feedFileListByMe(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		SearchContextVo scv = new SearchContextVo(param);
		long extMemberId = 0;
		extMemberId = param.get("extMemberId") != null ? scv.getExtMemberId() : 0;
		return feedFileService.getFeedFileListByMe(HttpUtil.getLocaleString(request), scv.getMemberId(), scv.getFileId(), extMemberId);
	}
	
	/**
	 * 그룹 피드 파일 리스트
	 * @param param
	 * @param request
	 * @return List<FeedFileVo>
	 */
	@RequestMapping(value = "/feeds/files/group", method = RequestMethod.GET)
	public @ResponseBody List<FeedFileVo> feedFileListByGroup(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
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
		if(mv.getIsSysAdmin() == 1) {
			isSysMgr = true;
		}
		
		if(!isGroupMember && gv.getIsPublic() == 0 && !isSysMgr) {
			return null;
		}
		
		return feedFileService.getFeedFileListByGroup(HttpUtil.getLocaleString(request), scv.getGroupId(), scv.getFileId());
	}

}