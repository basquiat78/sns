package org.uengine.sns.chat.follower.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.chat.follower.mapper.ChatFollowerMapper;
import org.uengine.sns.chat.follower.vo.ChatFollowerVo;
import org.uengine.sns.chat.follower.vo.ChatMentionVo;

/**
 * 
 * ChatFollowerService
 * @author uEngine-basquiat (uEngine Solutions)
 * 
 */
@Service("chatFollowerService")
public class ChatFollowerService {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(ChatFollowerService.class);

	@Autowired
	ChatFollowerMapper chatFollowerMapper;

	/**
	 * 멤버 등록
	 * @param chatFollowerVo
	 * @return ChatFollowerVo
	 */
	public ChatFollowerVo addChatFollower(ChatFollowerVo chatFollowerVo) {
		chatFollowerMapper.insertChatFollower(chatFollowerVo);
		return chatFollowerVo;
	}
	
	/**
	 * 멘션 정보를 가져온다
	 * @param term
	 * @return List<MentionVo>
	 */
	public List<ChatMentionVo> getMentionFollowerList(String term) {
		System.out.println("selectChatMention");
		return chatFollowerMapper.selectChatMentionFollowerList(term);
	}

}