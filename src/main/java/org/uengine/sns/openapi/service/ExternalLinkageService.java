package org.uengine.sns.openapi.service;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.openapi.mapper.ExternalLinkageMapper;
import org.uengine.sns.openapi.vo.ExternalLinkageFollowingVo;
import org.uengine.sns.openapi.vo.ExternalLinkageMapperVo;

/**
 * 
 * ExternalLinkageService
 * <pre>
 * 	<p>외부 링크 연동을 위한 서비스로</p>
 * 	<p>프로젝트 시점에 커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("extlinkageservice")
public class ExternalLinkageService {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(ExternalLinkageService.class);
	
	@Autowired
	ExternalLinkageMapper externalLinkageMapper;
	
	/**
	 * @param elmv
	 * @return List<ExternalLinkageMapperVo>
	 */
	public List<ExternalLinkageMapperVo> selectExtMappingList(ExternalLinkageMapperVo elmv) {
		return externalLinkageMapper.selectExtMappingList(elmv);
	}
	
	/**
	 * @param elfv
	 * @return List<ExternalLinkageMapperVo>
	 */
	public List<ExternalLinkageFollowingVo> selectExtFollowingList(ExternalLinkageFollowingVo elfv) {
		return externalLinkageMapper.selectExtFollowingList(elfv);
	}
	
	/**
	 * @param s
	 * @return HashMap<String, Object>
	 */
	public HashMap<String, Object> selectCurrMemberInfo(String s) {
		return externalLinkageMapper.selectCurrMemberInfo(s);
	}
	
	/**
	 * @param elfv
	 * @return ExternalLinkageFollowingVo
	 */
	public ExternalLinkageFollowingVo insertExtFollowingBoard(ExternalLinkageFollowingVo elfv) {
		externalLinkageMapper.insertExtFollowingBoard(elfv);
		return elfv;
	}
	
	/**
	 * @param h
	 * @return int
	 */
	public int deleteExtFollowingBoard(Map<String, Object> h) {
		return externalLinkageMapper.deleteExtFollowingBoard(h);
	}

}