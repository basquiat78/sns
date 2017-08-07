package org.uengine.sns.member.service;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.member.mapper.UserInfoMapper;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * UserinfoService
 * <pre>
 * 	<p>로컬 테스트용 임시 그룹웨어 emptable</p>
 * 	<p>프로젝트 시점에는 커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("userinfoService")
public class UserInfoService {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(UserInfoService.class);
	
	@Resource(name="passwordEncoder")
	private ShaPasswordEncoder passwordEncoder;
	
	@Autowired
	UserInfoMapper userInfoMapper;
	
	@Autowired
	MemberService memberService;

	/**
	 * @param lang
	 * @param loginId
	 * @param newPassword
	 */
	public void modifyLoginPasswordByLoginId(String lang, String loginId, String newPassword) {
		String encryptPassword = encryptPasswordByLoginId(lang, loginId, newPassword);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("loginId", loginId);
		map.put("loginPassword", encryptPassword);
		userInfoMapper.updatePasswordByLoginId(map);
	}

	/**
	 * @param password
	 * @param userId
	 * @return String
	 */
	public String encryptPassword1(String password, String userId) {
		return passwordEncoder.encodePassword(password, userId);
	}
	
	/**
	 * @param lang
	 * @param memberId
	 * @param password
	 * @return String
	 */
	public String encryptPassword(String lang, long memberId, String password) {
		MemberVo member = memberService.getMemberById(lang, memberId);

		if(member == null || member.getMemberId() < 1) {
			throw new SNSServiceException("사용자 정보가 존재하지 않습니다.");
		}
		
		return passwordEncoder.encodePassword(password, member.getEncryptSalt());
	}

	/**
	 * @param lang
	 * @param loginId
	 * @param password
	 * @return String
	 */
	public String encryptPasswordByLoginId(String lang, String loginId, String password) {
		MemberVo member = memberService.getMemberByLoginId(lang, loginId);

		if(member == null || member.getMemberId() < 1) {
			throw new SNSServiceException("사용자 정보가 존재하지 않습니다.");
		}
		
		return passwordEncoder.encodePassword(password, member.getEncryptSalt());
	}

}