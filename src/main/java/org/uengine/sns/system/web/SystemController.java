package org.uengine.sns.system.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
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
import org.uengine.sns.common.Exception.NotAcceptableException;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.system.service.SystemService;
import org.uengine.sns.system.vo.SystemVo;
import org.uengine.sns.tenant.service.TenantService;
import org.uengine.sns.tenant.vo.TenantVo;

/**
 * SystemController
 * <pre>
 * 	 <p>GroupWare로부터 제공받는 api로 </p>
 *   <p>커스터마이징 되어야 하는 영역</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class SystemController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(SystemController.class);
	
	@Autowired
	SystemService systemService;
	
	@Autowired
	TenantService tenantService;
	
	/**
	 * insert new Recent Info
	 * 커스터마이징 영역
	 * @param param
	 * @param request
	 * @return List<FeedVo>
	 */
	@RequestMapping(value = "/system/feeds", method = RequestMethod.GET)
	public @ResponseBody List<FeedVo> systemFeedList(@RequestParam Map<Object, Object> param, HttpServletRequest request) {
		
		SystemVo systemVo = new SystemVo();
		try {
		    BeanUtils.populate(systemVo, param);
		} 
		catch (Throwable e) {
			throw new NotAcceptableException(e.getMessage());
		}
		return systemService.getSystemFeedList(HttpUtil.getLocaleString(request), systemVo);
	}
	
	/**
	 * 커스터마이징 영역
	 * @param param
	 * @return List<GroupVo>
	 */
	@RequestMapping(value = "/system/groups", method = RequestMethod.GET)
	public @ResponseBody List<GroupVo> systemGroupList(@RequestParam Map<Object, Object> param) {
		
		SystemVo systemVo = new SystemVo();
		try {
		    BeanUtils.populate(systemVo, param);
		} 
		catch (Throwable e) {
			throw new NotAcceptableException(e.getMessage());
		}
		
		return systemService.getSystemGroupList(systemVo);
	}
	
	/**
	 * 커스터마이징 영역
	 * @return List<TenantVo>
	 */
	@RequestMapping(value = "/system/tenants", method = RequestMethod.GET)
	public @ResponseBody List<TenantVo> systemTenantList() {
		return tenantService.getTenantList(null);
	}
	
	/**
	 * 커스터마이징 영역
	 * @param tenantId
	 * @return TenantVo
	 */
	@RequestMapping(value = "/system/tenants/{id}", method = RequestMethod.GET)
	public @ResponseBody TenantVo systemTenant(@PathVariable("id") long tenantId) {
		return tenantService.getTenantById(tenantId);
	}
	
	/**
	 * 커스터마이징 영역
	 * @param TenantVo
	 * @return TenantVo
	 */
	@RequestMapping(value = "/system/tenants", method = RequestMethod.POST)
	public @ResponseBody TenantVo systemAddTenant(@RequestBody TenantVo TenantVo) {
		return tenantService.insertTenant(TenantVo);
	}
	
	/**
	 * 커스터마이징 영역
	 * @param TenantVo
	 * @return TenantVo
	 */
	@RequestMapping(value = "/system/tenants", method = RequestMethod.PUT)
	public @ResponseBody TenantVo systemUpdTenant(@RequestBody TenantVo TenantVo) {
		return tenantService.updateTenant(TenantVo);
	}
	
	/**
	 * 커스터마이징 영역
	 * @param TenantVo
	 * @return long
	 */
	@RequestMapping(value = "/system/tenants", method = RequestMethod.DELETE)
	public @ResponseBody long systemDelTenant(@RequestBody TenantVo TenantVo) {
		return tenantService.deleteTenant(TenantVo.getTenantId());
	}
	
	/**
	 * 커스터마이징 영역
	 * @return List<SystemVo>
	 */
	@RequestMapping(value = "/system/companies", method = RequestMethod.GET)
	public @ResponseBody List<SystemVo> systemCompanyList() {
		return systemService.getCompanyList();
	}

}