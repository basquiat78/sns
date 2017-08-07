package org.uengine.sns.tenant.mapper;

import java.util.List;
import java.util.Map;

import org.uengine.sns.tenant.vo.UserTenantMappingVo;

/**
 * 
 * NoticeMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/tenant/mapping.xml
 *
 */
public interface UserTenantMappingMapper {
	
	List<UserTenantMappingVo> selectMappingByMemberId(Map<String, Object> map);

}