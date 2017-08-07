package org.uengine.sns.member.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
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
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.service.FileService;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.member.vo.MentionsVo;


@Controller
public class MemberController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	FileService fileService;
	
	/**
	 * select All Member List by searchKey
	 * @param param
	 * @return List<MemberVo>
	 */
	@RequestMapping(value = "/members", method = RequestMethod.GET)
	public @ResponseBody List<MemberVo> findAll(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return memberService.getMemberList(scv);
	}
	
	/**
	 * elect Member by email
	 * @param email
	 * @param request
	 * @return MemberVo
	 */
	@RequestMapping(value = "/members/email/{email}", method = RequestMethod.GET)
	public @ResponseBody MemberVo findByEmail(@PathVariable("email") String email, HttpServletRequest request) {
		return memberService.getMemberByEmail(HttpUtil.getLocaleString(request), email);
	}
	
	/**
	 * @param param
	 * @return List<MemberVo>
	 */
	@RequestMapping(value = "/members/withoutgroup", method = RequestMethod.GET)
	public @ResponseBody List<MemberVo> selectMemberListWithoutGroupMember(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return memberService.selectMemberListWithoutGroupMember(scv);
	}

	/**
	 * select MemberMentions List
	 * @param term
	 * @param request
	 * @return List<MentionsVo>
	 */
	@RequestMapping(value = "/members/mentions/{term}", method = RequestMethod.GET)
	public @ResponseBody List<MentionsVo> findMention(@PathVariable("term") String term, HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");
		return memberService.getMentionInfoList(HttpUtil.getLocaleString(request), term, userId);
	}
	
	/**
	 * select MemberVO by memberId
	 * @param memberId
	 * @param request
	 * @return memberVo
	 */
	@RequestMapping(value = "/members/{id}", method = RequestMethod.GET)
    public @ResponseBody MemberVo findById(@PathVariable("id") long memberId, HttpServletRequest request) {
		return memberService.getMemberAllById(HttpUtil.getLocaleString(request), memberId);
	}
	
	/**
	 * @param syncKey
	 * @param request
	 * @return MemberVo
	 */
	@RequestMapping(value = "/members/synckey/{syncKey:.+}", method = RequestMethod.GET)
    public @ResponseBody MemberVo findBySynckey(@PathVariable("syncKey") String syncKey, HttpServletRequest request) {
		return memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), syncKey);
	}
	
	/**
	 * insert new Member Info
	 * @param memberVo
	 * @return MemberVo
	 */
	@RequestMapping(value = "/members", method = RequestMethod.POST)
	public @ResponseBody MemberVo add(@RequestBody MemberVo memberVo) {
		return memberService.insertMember(memberVo);
	}
	
	/**
	 * update Member Info
	 * @param memberVo
	 * @return MemberVo
	 */
	@RequestMapping(value = "/members", method = RequestMethod.PUT)
	public @ResponseBody MemberVo upd(@RequestBody MemberVo memberVo) {
		return memberService.updateMember(memberVo);
	}
	
	/**
	 * delete Member Info
	 * @param memberId
	 * @return String
	 */
	@RequestMapping(value = "/members/{id}", method = RequestMethod.DELETE)
	public @ResponseBody String delete(@PathVariable("id") long memberId) {
		memberService.deleteMember(memberId);
		return "delete";
	}
	
	/**
	 * 멤버 사진 response 에 생성하기
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/members/imgs", method = RequestMethod.GET)
	public void viewMemberImage(HttpServletRequest request, HttpServletResponse response) {
		
		String memberId = StringUtils.defaultIfBlank(request.getParameter("memberId"), "0");
		MemberVo memberVo = null;
		String   memberThumbUrl = null;
		if(!memberId.equals("0")) {
			memberVo = memberService.getMemberById(HttpUtil.getLocaleString(request), Long.valueOf(memberId));
			if(memberVo != null) {
				memberThumbUrl = memberVo.getMemberThumbUrl();
			}
		}
		
		fileService.imgSrcToResponse(request, response, memberThumbUrl, fileService.MEMBER_IMG_PATH, "pic_big.jpg", fileService.WEB_FILE_REPOSITORY_PATH);
		
	}

	/**
	 * @param memberId
	 * @return Map<String, String>
	 */
	@RequestMapping(value = "/members/role/view/{memberId}", method = RequestMethod.GET)
	public @ResponseBody Map<String, String> findAll(@PathVariable("memberId") long memberId) {
		String viewRole = memberService.getViewRoleByMemberId(memberId);
		if(viewRole == null) {
			viewRole = "0";
		}
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("viewRole", viewRole);
		
		return map;
	}

}