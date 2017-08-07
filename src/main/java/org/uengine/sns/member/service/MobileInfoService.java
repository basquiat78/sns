package org.uengine.sns.member.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.member.mapper.MobileInfoMapper;
import org.uengine.sns.member.vo.MobileInfoVo;

/**
 * 
 * MobileInfoService
 * <pre>
 * 	<p>프로젝트 시점에는 </p>
 * 	<p>커스터마이징이 요구된다.<p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("mobileInfoService")
public class MobileInfoService {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MobileInfoService.class);

	@Autowired
	MobileInfoMapper mobileInfoMapper;
	
	/**
	 * select mobileInfo by memberId
	 * @param memberId
	 * @return List<MobileInfoVo>
	 */
	public List<MobileInfoVo> getMobileInfoVoById(long memberId) {
		return mobileInfoMapper.selectMobileInfoById(memberId);
	}
	
	/**
	 * insert mobileInfo info
	 * @param mobileVo
	 * @return MobileInfoVo
	 */
	public MobileInfoVo insertMobileInfo(MobileInfoVo mobileVo) {
		mobileInfoMapper.insertMobileInfo(mobileVo);
		return mobileVo;
	}
	
	/**
	 * update mobileInfo Info
	 * @param mobileVo
	 * @return MobileInfoVo
	 */
	public MobileInfoVo updateMobileInfo(MobileInfoVo mobileVo) {
		mobileInfoMapper.updateMobileInfo(mobileVo);
		return mobileVo;
	}
	
	/**
	 * delete member Info
	 * @param mobileVo
	 * @return MobileInfoVo
	 */
	public MobileInfoVo deleteMobileInfo(MobileInfoVo mobileVo) {
		mobileInfoMapper.deleteMobileInfo(mobileVo);
		return mobileVo;
	}

}