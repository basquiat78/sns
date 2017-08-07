package org.uengine.sns.tenant.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.tenant.mapper.TenantMapper;
import org.uengine.sns.tenant.vo.TenantVo;

/**
 * 
 * TenantService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("tenantService")
public class TenantService {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(TenantService.class);

	@Autowired
	TenantMapper tenantMapper;
	
	/**
	 * 검색조건에 의한 테넌트 리스트 취득
	 * @param scv
	 * @return List<TenantVo>
	 */
	public List<TenantVo> getTenantList(SearchContextVo scv) {
		return tenantMapper.selectTenantList(scv);
	}
	
	/**
	 * 테넌트 ID에 의한 테넌트 정보 취득
	 * @param tenantId
	 * @return TenantVo
	 */
	public TenantVo getTenantById(long tenantId) {
		return tenantMapper.selectTenantById(tenantId);
	}
	
	/**
	 * 테넌트 등록
	 * @param tenantVo
	 * @return TenantVo
	 */
	public TenantVo insertTenant(TenantVo tenantVo) {
		tenantMapper.insertTenant(tenantVo);
		return tenantVo;
	}
	
	/**
	 * 테넌트 수정
	 * @param tenantVo
	 * @return TenantVo
	 */
	public TenantVo updateTenant(TenantVo tenantVo) {
		tenantMapper.updateTenant(tenantVo);
		return tenantVo;
	}
	
	/**
	 * 테넌트 삭제
	 * @param tenantId
	 * @return long
	 */
	public long deleteTenant(long tenantId) {
		return tenantMapper.deleteTenant(tenantId);
	}

	/**
	 * 그룹웨어 회사아이디를 통한 테넌트 정보 취득
	 * @param companyId
	 * @return TenantVo
	 */
	public TenantVo getTenantByCompanyId(String companyId) {
		return tenantMapper.selectTenantByCompanyId(companyId);
	}

	/**
	 * 그룹웨어 사용자아이디(userId)를 통한 테넌트 정보 취득
	 * @param userId
	 * @return TenantVo
	 */
	public TenantVo getTenantByUserId(String userId) {
		return tenantMapper.selectTenantByUserId(userId);
	}

}