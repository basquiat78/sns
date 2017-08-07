package org.uengine.sns.openapi.mapper;

import org.uengine.sns.openapi.vo.GroupWareSloVo;

/**
 * 
 * GroupWareMapper
 * <pre>
 * 	<p>회사의 그룹웨어에 따라 이 매퍼는</p>
 *  <p>커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/openapi/groupware.xml
 *
 */
public interface GroupWareMapper {
	
	void updateUserLoginDate(String userId);

	String selectSloSeedByOtaId(String otaId);

	GroupWareSloVo selectSloInfoByDecryptOtaId(String decryptOtaId);

}