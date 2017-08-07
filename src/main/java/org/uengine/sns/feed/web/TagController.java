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
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.TagService;
import org.uengine.sns.feed.vo.TagCloudVo;
import org.uengine.sns.feed.vo.TagVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * TagController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class TagController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(TagController.class);
	
	@Autowired
	TagService tagService;
	
	@Autowired
	MemberService memberService;
	
	/**
	 * TAG 리스트
	 * SearchContextVo에 설정된 파라미터의 key,value 형태로 받아 검색 필터 처리
	 * @param param
	 * @return List<TagVo>
	 */
	@RequestMapping(value = "/feeds/tags", method = RequestMethod.GET)
	public @ResponseBody List<TagVo> tagList(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return tagService.getTagList(scv);
	}
	
	/**
	 * TAG 등록
	 * @param tagVo
	 * @return TagVo
	 */
	@RequestMapping(value = "/feeds/tags", method=RequestMethod.POST)
	public @ResponseBody TagVo addTag(@RequestBody TagVo tagVo) {
		return tagService.insertTagByOne(tagVo);
	}
	
	/**
	 * TAG cnt
	 * @param request
	 * @return List<TagCloudVo>
	 */
	@RequestMapping(value = "/feeds/tags/cnt", method = RequestMethod.GET)
	public @ResponseBody List<TagCloudVo> tagCountList(HttpServletRequest request) {
		
		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		
		return tagService.selectTagCountListByMemberId(sessionMemberId);
	}

	/**
	 * TAG 삭제
	 * @param tagVo
	 * @return TagVo
	 */
	@RequestMapping(value = "/feeds/tags", method = RequestMethod.DELETE)
	public @ResponseBody TagVo delTag(@RequestBody TagVo tagVo) {
		return tagService.deleteTag(tagVo);
	}

}