package org.uengine.sns.member.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.member.mapper.MemberMapper;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.member.vo.MentionsVo;
import org.uengine.sns.tenant.mapper.UserTenantMappingMapper;
import org.uengine.sns.tenant.vo.UserTenantMappingVo;

/**
 * 
 * MemberService
 * <pre>
 * 	<p>그룹웨어에 대한 정보 부분은<p>
 * 	<p>커스터마이징이 요구된다.<p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("memberService")
public class MemberService {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MemberService.class);

	private static String SUBEMAIL = "@xxx.xx.xx";
	
	@Autowired
	MemberMapper memberMapper;
	
	@Autowired
	UserInfoService userInfoService;
	
	@Autowired
	UserTenantMappingMapper userTenantMappingMapper;
	
	/**
	 * select memberlist by searchKey
	 * @param scv
	 * @return List<MemberVo>
	 */
	public List<MemberVo> getMemberList(SearchContextVo scv) {
		return memberMapper.selectMemberList(scv);
	}
	
	/**
	 * select all memberList without already member
	 * @param scv
	 * @return List<MemberVo>
	 */
	public List<MemberVo> selectMemberListWithoutGroupMember(SearchContextVo scv) {
		return memberMapper.selectMemberListWithoutGroupMember(scv);
	}
	
	/**
	 * select all memberMentionInfoList
	 * @param lang
	 * @param term
	 * @param userId
	 * @return List<MentionsVo>
	 */
	public List<MentionsVo> getMentionInfoList(String lang, String term, String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("term", term);
		map.put("userId", userId);
		return memberMapper.selectMentionInfoList(map);
	}
	
	/**
	 * select member by memberId
	 * @param lang
	 * @param memberId
	 * @return memberVo
	 */
	public MemberVo getMemberById(String lang, long memberId) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("memberId", memberId);
		MemberVo memberVo =  memberMapper.selectMemberById(map);
		return memberVo;
	}
	
	/**
	 * @param lang
	 * @param loginId
	 * @param password
	 * @return MemberVo
	 */
	public MemberVo getCheckLoginMember(String lang, String loginId, String password) {
		MemberVo member = getMemberByLoginId(lang, loginId);
		
		if(member == null || member.getMemberId() < 1) {
			throw new SNSServiceException("로그인 정보가 존재하지 않습니다.");
		}
		
		String encryptPassword = userInfoService.encryptPasswordByLoginId(lang, loginId, password);
		if(!member.getLoginPassword().equals(encryptPassword)) {
			throw new SNSServiceException("잘못된 로그인 정보입니다.");
		}
		
		return member;
	}

	/**
	 * @param lang
	 * @param loginId
	 * @return MemberVo
	 */
	public MemberVo getMemberByLoginId(String lang, String loginId) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("loginId", loginId);
		MemberVo memberVo =  memberMapper.selectMemberByLoginId(map);
		return memberVo;
	}

	/**
	 * @param lang
	 * @param syncKey
	 * @return MemberVo
	 */
	public MemberVo getGroupWareMemberById(String lang, String syncKey) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("syncKey", syncKey);
		return memberMapper.selectGroupWareMemberBySynckey(map);
	}

	/**
	 * @param lang
	 * @param memberId
	 * @return MemberVo
	 */
	public MemberVo getMemberAllById(String lang, long memberId) {

		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("memberId", memberId);
		MemberVo memberVo =  memberMapper.selectMemberById(map);
		List<UserTenantMappingVo> userTenantMappingList = userTenantMappingMapper.selectMappingByMemberId(map);
		memberVo.setTenantMappingList(userTenantMappingList);
		return memberVo;
		
	}

	/**
	 * @param lang
	 * @param memberId
	 * @return MemberVo
	 */
	public MemberVo getMemberById(String lang, String memberId) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("memberId", Long.parseLong(memberId));
		return memberMapper.selectMemberById(map);
	}

	/**
	 * @param lang
	 * @param email
	 * @return MemberVo
	 */
	public MemberVo getMemberByEmail(String lang, String email) {
		email = email + SUBEMAIL;
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("email", email);
		return memberMapper.selectMemberByEmail(map);
	}
	
	/**
	 * 동기화 키를 사용한 멤버 정보 검색
	 * @param lang
	 * @param syncKey
	 * @return MemberVo
	 */
	public MemberVo getMemberBySynckey(String lang, String syncKey) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("syncKey", syncKey);
		return memberMapper.selectMemberBySynckey(map);
	}
	
	/**
	 * 그룹 멤버 리스트
	 * @param lang
	 * @param groupId
	 * @param cType
	 * @return List<MemberVo>
	 */
	public List<MemberVo> getGroupMemberList(String lang, long groupId, String cType) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("groupId", groupId);
		map.put("cType", cType);
		return memberMapper.selectGroupMember(map);
	}
	
	/**
	 * insert member info
	 * @param memberVo
	 * @return MemberVo
	 */
	public MemberVo insertMember(MemberVo memberVo) {
		Date now = new Date();
		memberVo.setLstSyncDttm(now);
		memberMapper.insertMember(memberVo);
		return memberVo;
	}
	
	/**
	 * update member Info
	 * @param memberVo
	 * @return MemberVo
	 */
	public MemberVo updateMember(MemberVo memberVo) {
		Date now = new Date();
		memberVo.setLstSyncDttm(now);
		memberMapper.updateMember(memberVo);
		return memberVo;
	}
	
	/**
	 * delete member Info
	 * @param memberId
	 */
	public void deleteMember(long memberId) {
		memberMapper.deleteMember(memberId);
	}
	
	/**
	 * @param memberId
	 * @return String
	 */
	public String getViewRoleByMemberId(long memberId) {
		return memberMapper.selectViewRoleByMemberId(memberId);
	}

}