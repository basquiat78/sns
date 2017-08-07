package org.uengine.sns.chat.follower.mapper;

import java.util.List;

import org.uengine.sns.chat.follower.vo.ChatFollowerVo;
import org.uengine.sns.chat.follower.vo.ChatMentionVo;

/**
 * 
 * ChatFollowerMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/chat/chatfollower/chatfollower.xml
 * 
 */
public interface ChatFollowerMapper {

	void insertChatFollower(ChatFollowerVo chatFollowerVo);
	
	List<ChatMentionVo> selectChatMentionFollowerList(String term);

}