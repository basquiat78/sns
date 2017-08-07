package org.uengine.sns.group.web;

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
import org.uengine.sns.group.service.GroupFollowerService;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.service.KnowledgeFeedService;
import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.group.vo.KnowledgeFeedVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * KnowledgeFeedController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class KnowledgeFeedController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(KnowledgeFeedController.class);
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	KnowledgeFeedService knowledgeFeedService;
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	GroupFollowerService groupFollowerService;
	
	/**
	 * knowledge feed by searchKey
	 * @param param
	 * @param request
	 * @return List<FeedVo>
	 */
	@RequestMapping(value = "/groups/knwldgs", method = RequestMethod.GET)
    public @ResponseBody List<FeedVo> findById(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		
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
		
		return knowledgeFeedService.getKnowledgeFeedByGroupId(HttpUtil.getLocaleString(request), scv, sessionMemberId);
	}
	
	/**
	 * insert new KnowledgeFeed Info
	 * @param knowledgeVo
	 * @param KnowledgeFeedVo
	 */
	@RequestMapping(value = "/groups/knwldgs", method = RequestMethod.POST)
	public @ResponseBody KnowledgeFeedVo add(@RequestBody KnowledgeFeedVo knowledgeVo) {
		return knowledgeFeedService.insertKnowledgeFeed(knowledgeVo);
	}
	
	/**
	 * update KnowledgeFeed Info
	 * @param knowledgeVo
	 * @param KnowledgeFeedVo
	 */
	@RequestMapping(value = "/groups/knwldgs", method = RequestMethod.PUT)
	public @ResponseBody KnowledgeFeedVo upd(@RequestBody KnowledgeFeedVo knowledgeVo) {
		return knowledgeFeedService.updateKnowledgeFeed(knowledgeVo);
	}
	
	/**
	 * delete KnowledgeFeed Info
	 * @param KnowledgeVo
	 * @param KnowledgeFeedVo
	 */
	@RequestMapping(value = "/groups/knwldgs", method = RequestMethod.DELETE)
	public @ResponseBody KnowledgeFeedVo delete(@RequestBody KnowledgeFeedVo knowledgeVo) {
		return knowledgeFeedService.deleteKnowledgeFeed(knowledgeVo);
	}

}