package org.uengine.sns.chat.follower.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.chat.follower.service.ChatFollowerService;
import org.uengine.sns.chat.follower.vo.ChatMentionVo;
import org.uengine.sns.common.ExceptionController;

/**
 * 
 * ChatFollowerController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class ChatFollowerController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(ChatFollowerController.class);
	
	@Autowired
	ChatFollowerService chatFollowerService;
	
	/**
	 * 멘션 정보
	 * @param term
	 * @return ArrayList<MentionVo>
	 */
	@RequestMapping(value = "/chat/followers/mentions/{term}", method = RequestMethod.GET)
	public @ResponseBody List<ChatMentionVo> autoCompleteFollowerList(@PathVariable("term") String term) {
		return chatFollowerService.getMentionFollowerList(term);
	}

}