package org.uengine.sns.tenant.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.tenant.mapper.UserTenantMappingMapper;
import org.uengine.sns.tenant.vo.UserTenantMappingVo;

/**
 * 
 * UserTenantMappingService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("tenantMappingService")
public class UserTenantMappingService {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(UserTenantMappingService.class);

	@Autowired
	UserTenantMappingMapper tenantMappingMapper;

	/**
	 * @param map
	 * @return List<UserTenantMappingVo>
	 */
	public List<UserTenantMappingVo> getUserTenantMappingList(Map<String, Object> map) {
		List<UserTenantMappingVo> arr = tenantMappingMapper.selectMappingByMemberId(map);
		return arr;
	}

}