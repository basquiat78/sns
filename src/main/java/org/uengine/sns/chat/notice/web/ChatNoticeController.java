package org.uengine.sns.chat.notice.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.chat.notice.service.ChatNoticeService;
import org.uengine.sns.chat.notice.vo.ChatNoticeVo;
import org.uengine.sns.common.ExceptionController;

/**
 * 
 * ChatNoticeController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class ChatNoticeController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(ChatNoticeController.class);
	
	@Autowired
	ChatNoticeService chatNoticeService;
	
	/**
	 * 웹소켓 접속자 수
	 * @return String
	 */
	@RequestMapping(value = "/chat/notices/users", produces="text/plain;charset=UTF-8", method = RequestMethod.GET)
	public @ResponseBody String getConnectUserInfo() {
		return chatNoticeService.getConnectUserInfo().toString();
	}
	
	/**
	 * follower 초대
	 * @param chatNoticeVo
	 * @return List<NoticeVo>
	 */
	@RequestMapping(value = "/chat/notices/invite", method = RequestMethod.POST)
	public @ResponseBody List<ChatNoticeVo> inviteChatFollowers(@RequestBody ChatNoticeVo chatNoticeVo) {
		return chatNoticeService.inviteChatFollowers(chatNoticeVo);
	}
	
	/**
	 * notice list 가져오기
	 * @param userId
	 * @return List<ChatNoticeVo>
	 */
	@RequestMapping(value = "/chat/notices/{userId}", method = RequestMethod.GET)
	public @ResponseBody List<ChatNoticeVo> getChatNotice(@PathVariable("userId") String userId) {
		return chatNoticeService.getChatNotice(userId);
	}
	
	/**
	 * read notice check
	 * @param noticeId
	 * @return ChatNoticeVo
	 */
	@RequestMapping(value = "/chat/notices/{noticeId}", method = RequestMethod.PUT)
	public @ResponseBody ChatNoticeVo readNotice(@PathVariable("noticeId") long noticeId) {
		return chatNoticeService.readChatNotice(noticeId);
	}

}