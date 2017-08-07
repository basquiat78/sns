package org.uengine.sns.group.web;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.group.service.GroupFollowerService;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * GroupController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class GroupFeedController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(GroupFeedController.class);
	
	/** group feed download buffer size */
	private static final int BUFFER_SIZE = 4096;
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	GroupFollowerService groupFollowerService;
	
	@Autowired
	FeedService feedService;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	MessageSource messageSource;
	
	/**
	 * FEED 리스트(그룹)
	 * SearchContextVo에 설정된 파라미터의 key,value 형태로 받아 검색 필터 처리
	 * @param param
	 * @param request
	 * @return List<FeedVo>
	 */
	@RequestMapping(value = "/groups/feeds", method = RequestMethod.GET)
	public @ResponseBody List<FeedVo> feedList(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		
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
		
		return feedService.getGroupFeedList(HttpUtil.getLocaleString(request), scv, sessionMemberId);
	}
	
	/**
	 * 그룹 팔로워 리스트 다운로드
	 * @param request
	 * @param response
	 * @param param
	 * @param locale
	 * @throws IOException
	 */
	@RequestMapping(value = "/groups/followers/feeddownload", method = RequestMethod.GET)
	public void doDownload(HttpServletRequest request
			, HttpServletResponse response
			, @RequestParam Map<Object, Object> param
			, Locale locale) throws IOException {
		
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
		
		String mimeType = "application/octet-stream";
		String headerKey = "Content-Disposition";
		String headerValue = String.format("attachment; filename=\"%s\"", "x.html");
		
		response.setContentType(mimeType);
		response.setCharacterEncoding("UTF-8");
		response.setHeader(headerKey, headerValue);
		
		List<FeedVo> feedlist = feedService.getGroupFeedList(HttpUtil.getLocaleString(request), scv, sessionMemberId);
		String feedDownload_title = messageSource.getMessage("feed.download.TITLE", null, locale);
		String feedDownload_writer = messageSource.getMessage("feed.download.WRITER", null, locale);
		String feedDownload_writedate = messageSource.getMessage("feed.download.WRITEDATE", null, locale);
		String feedDownload_nofeedmsg = messageSource.getMessage("feed.download.NOFEEDMSG", null, locale);
		
		String s = "";
		s += "<!DOCTYPE html><html><head><meta charset=\"UTF-8\" /><title></title>";
		s += "<style>body {padding : 20px;} table {border-top:1px solid #000; border-right:1px solid #000; width:800px; margin:20px auto;}";
		s += "table tr td, table tr th {border-bottom : 1px solid #000; border-left:1px solid #000; padding:5px;}";
		s += "table thead th {background-color:#FE630F; color:#FFF; }";
		s += "</style>";
		s += "</head><body><div><table cellpadding='0' cellspacing='0'>"
				+ "<thead>"
				+ "<tr><th>"+ feedDownload_title +"</th><th>"+ feedDownload_writer +"</th><th>"+ feedDownload_writedate +"</th></tr>"
				+ "</thead>"
				+ "<tbody>";
		
		if(feedlist != null && feedlist.size() != 0) {
			for(int i=0; i<feedlist.size(); i++) {
				s += "<tr><td>"+ feedlist.get(i).getFeedTitle() +"</td>";
				s += "<td>"+ feedlist.get(i).getMemberVo().getMemberName() +"</td>";
				s += "<td>"+ feedlist.get(i).getRegDttm() +"</td>";
				s += "</tr>";
			}
		} else {
			s += "<tr><td colspan='3'>"+ feedDownload_nofeedmsg +"</td></tr>";
		}
		
		s += "</tbody></table>";
		s += "</div></body></html>";
		InputStream inputStream = new ByteArrayInputStream(s.getBytes("UTF-8"));
		ServletOutputStream outStream = response.getOutputStream();
		
		byte[] buffer = new byte[BUFFER_SIZE];
		int bytesRead = -1;
		
		while((bytesRead = inputStream.read(buffer)) != -1) {
			outStream.write(buffer, 0, bytesRead);
		}
		
		inputStream.close();
		outStream.close();
	}

}