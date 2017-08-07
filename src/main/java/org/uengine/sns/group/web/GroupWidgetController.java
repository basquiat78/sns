package org.uengine.sns.group.web;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import org.uengine.sns.common.code.SNSCodeMaster;
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
 * GroupWidgetController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class GroupWidgetController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(GroupWidgetController.class);
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	RecentService recentService;
	
	@Autowired
	FeedService feedService;
	
	@Autowired
	TagService tagService;
	
	/**
	 * search widget Group
	 * @param param
	 * @return List<GroupVo>
	 */
	@RequestMapping(value = "/widgets/groups", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> memberGroupList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return groupService.getGroupList(scv);
	} 
	
	/**
	 * 추천 그룹 리스트
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "/widgets/recgroups", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> recGroupList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return groupService.getGroupList(scv);
	} 
	
	/**
	 * 신규 그룹 리스트
	 * @param param
	 * @return List<GroupVo>
	 */
	@RequestMapping(value = "/widgets/newgroups", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> newGroupList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		scv.regDttm(new Date());
		return groupService.getGroupList(scv);
	}
	
	/**
	 * selected type group list by condtions
	 * @param param
	 * @return List<GroupVo>
	 */
	@RequestMapping(value = "/widgets/groups/conditions", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> groupListByCondition(@RequestParam Map<Object, Object> param) {
		
		SearchContextVo scv = new SearchContextVo(param);
		scv.regDttm(new Date());
		
		if(param.get("cType").equals("recommend")) {
			return groupService.getGroupListRecommend(scv);
		} else {
			return groupService.getGroupListNew(scv);
		}
	}
	
	/**
	 * 그룹 멤버 리스트
	 * @param param
	 * @param request
	 * @return List<MemberVo>
	 */
	@RequestMapping(value = "/widgets/groups/members", method = RequestMethod.GET)
	public @ResponseBody List<MemberVo> groupMemberList(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		SearchContextVo scv = new SearchContextVo(param);
		return memberService.getGroupMemberList(HttpUtil.getLocaleString(request), scv.getGroupId(), scv.getCType());
	} 
	
	/**
	 * 그룹 최근활동
	 */
	@RequestMapping(value = "/widgets/groups/activity/{groupId}", method = RequestMethod.GET)
	public @ResponseBody List<NoticeVo> notiGroupRecentList(@PathVariable("groupId") long groupId) {
		return recentService.selectGroupRecentActivityList(groupId);
	}
	
	/**
	 * 할일 목록(자기 FEED기준으로 dueDate가 현재 날자 기준으로 가장 근접한 FEED 리스트 5건정도)
	 * @param param
	 * @return List<FeedVo>
	 */
	@RequestMapping(value = "/widgets/groups/todo", method = RequestMethod.GET)
	public @ResponseBody List<FeedVo> memberTodoList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		scv.menuType(SNSCodeMaster.ITEM_TYPE.GROUP.name());
		return feedService.getTodoFeedList(scv);
	}
	
	/**
	 * 태그 클라우드(태그 클라우드 테이블에서 데이터 취득 - 개인 전체 기준)
	 * @param param
	 * @return List<TagCloudVo>
	 */
	@RequestMapping(value = "/widgets/groups/tagclouds", method = RequestMethod.GET)
	public @ResponseBody List<TagCloudVo> memberTagCloudList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return tagService.getTagCloudList(scv);
	}

}