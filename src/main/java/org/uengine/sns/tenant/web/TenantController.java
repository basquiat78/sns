package org.uengine.sns.tenant.web;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.tenant.service.TenantService;
import org.uengine.sns.tenant.vo.TenantVo;

/**
 * 
 * TenantController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class TenantController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(TenantController.class);
	
	@Autowired
	TenantService tenantService;
	
	/**
	 * 검색 조건에 의한 테넌트 리스트 취득
	 * @param param
	 * @return List<TenantVo>
	 */
	@RequestMapping(value = "/tenants", method = RequestMethod.GET)
	public @ResponseBody List<TenantVo> findAll(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return tenantService.getTenantList(scv);
	}
	
	/**
	 * 테넌트 등록
	 * @param tenantVo
	 * @return TenantVo
	 */
	@RequestMapping(value = "/tenants", method = RequestMethod.POST)
	public @ResponseBody TenantVo addTenant(@RequestBody TenantVo tenantVo) {
		return tenantService.insertTenant(tenantVo);
	}
	
	/**
	 * 테넌트 수정
	 * @param tenantVo
	 * @return TenantVo
	 */
	@RequestMapping(value = "/tenants", method = RequestMethod.PUT)
	public @ResponseBody TenantVo updateTenant(@RequestBody TenantVo tenantVo) {
		return tenantService.updateTenant(tenantVo);
	}
	
	/**
	 * 테넌트 ID에 의한 테넌트 정보 취득
	 * @param tenantId
	 * @return TenantVo
	 */
	@RequestMapping(value = "/tenants/{id}", method = RequestMethod.GET)
	public @ResponseBody TenantVo findById(@PathVariable("id") long tenantId) {
		return tenantService.getTenantById(tenantId);
	}
	
	/**
	 * 테넌트 삭제
	 * @param tenantId
	 */
	@RequestMapping(value = "/tenants/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") long tenantId) {
		tenantService.deleteTenant(tenantId);
	}

}