package org.uengine.sns.member.mapper;

import java.util.Map;

/**
 * 
 * UserInfoMapper
 * <pre>
 * 	<p>실제 이 부분은 그룹웨어로부터 정보를 받아야한다.</p>
 *  <p>로컬 테스트용 임시 방편의 그룹웨어 emptable</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/member/userinfo.xml
 *
 */
public interface UserInfoMapper {
	
	void updatePasswordByLoginId(Map<String, Object> map);

}