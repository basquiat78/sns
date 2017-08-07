package org.uengine.sns.tenant.mapper;

import java.util.List;

import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.tenant.vo.TenantVo;

/**
 * 
 * TenantMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/tenant/tenant.xml
 *
 */
public interface TenantMapper {

	void insertTenant(TenantVo tenantVo);
	void updateTenant(TenantVo tenantVo);
	
	long deleteTenant(long tenantId);
	
	TenantVo selectTenantById(long tenantId);
	TenantVo selectTenantByCompanyId(String companyId);
	TenantVo selectTenantByUserId(String userId);

	List<TenantVo> selectTenantList(SearchContextVo scv);

}