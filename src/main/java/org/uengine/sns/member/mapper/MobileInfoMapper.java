package org.uengine.sns.member.mapper;

import java.util.List;

import org.uengine.sns.member.vo.MobileInfoVo;

/**
 * 
 * MobileInfoMapper
 * <pre>
 * 	<p>프로젝트 시점에서 이 부분은</p>
 *  <p>커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/member/mobileinfo.xml
 *
 */
public interface MobileInfoMapper {

	void insertMobileInfo(MobileInfoVo mobileVo);
	void updateMobileInfo(MobileInfoVo mobileVo);
	void deleteMobileInfo(MobileInfoVo mobileVo);
	
	List<MobileInfoVo> selectMobileInfoById(long memberId);

}