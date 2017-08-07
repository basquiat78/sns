package org.uengine.sns.openapi.mapper;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.uengine.sns.openapi.vo.ExternalLinkageFollowingVo;
import org.uengine.sns.openapi.vo.ExternalLinkageMapperVo;

/**
 * 
 * ExternalLinkageMapper
 * <pre>
 * 	<p>외부 링크 연동을 위한 매퍼로</p>
 * 	<p>프로젝트 시점에 커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/openapi/externalLinkageMapping.xml
 *
 */
public interface ExternalLinkageMapper {
	
	void insertExtFollowingBoard(ExternalLinkageFollowingVo elfv);
	
	int deleteExtFollowingBoard(Map<String, Object> h);

	HashMap<String, Object> selectCurrMemberInfo(String s);

	List<ExternalLinkageMapperVo> selectExtMappingList(ExternalLinkageMapperVo elmv);
	List<ExternalLinkageFollowingVo> selectExtFollowingList(ExternalLinkageFollowingVo elfv);

}