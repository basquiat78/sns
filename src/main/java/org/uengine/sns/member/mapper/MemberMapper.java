package org.uengine.sns.member.mapper;

import java.util.List;
import java.util.Map;

import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.vo.FollowerVo;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.member.vo.MentionsVo;

/**
 * 
 * MemberMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/member/member.xml
 *
 */
public interface MemberMapper {

	void insertMember(MemberVo memberVo);
	void updateMember(MemberVo memberVo);
	void deleteMember(long memberId);
	
	int checkMemberByEmail(String emailAddr);

	String selectViewRoleByMemberId(long memberId);

	MemberVo selectMemberById(Map<String, Object> map);
	MemberVo selectMemberBySynckey(Map<String, Object> map);
	MemberVo selectGroupWareMemberBySynckey(Map<String, Object> map);
	MemberVo selectMemberByEmail(Map<String, Object> map);
	MemberVo selectMemberByLoginId(Map<String, Object> map);
	
	List<MemberVo> selectGroupMember(Map<String, Object> map);
	List<MemberVo> selectLoginMemberList();
	List<MemberVo> selectMemberList(SearchContextVo scv);
	List<MemberVo> selectMemberListWithoutGroupMember(SearchContextVo scv);

	List<MentionsVo> selectMentionInfoList(Map<String, Object> map);
	
	List<FollowerVo> selectMemberListForAuto();

}