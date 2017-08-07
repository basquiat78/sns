package org.uengine.sns.federation.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.uengine.sns.common.Exception.SNSRunTimeException;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.intercepter.AuthInterceptor;
import org.uengine.sns.tenant.service.TenantService;
import org.uengine.sns.tenant.vo.TenantVo;

/**
 * 
 * FederationService
 * <pre>
 * 	<p>federation Service는 </p>
 *  <p>커스터마이징이 요구되는 서비스이다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("federationService")
public class FederationService {
	
	private static final Logger LOG = LoggerFactory.getLogger(FederationService.class);

	@Autowired
	TenantService tenantService;
	
	/**
	 * @param tenantId
	 * @param restUrl
	 * @param param
	 * @return Object
	 */
	public Object requestTenantByGet(long tenantId, String restUrl, MultiValueMap<String, Object> param) {
		return requestTenant(tenantId, restUrl, HttpMethod.GET, param);
	}

	/**
	 * @param tenantVo
	 * @param restUrl
	 * @param param
	 * @return Object
	 */
	public Object requestTenantByGet(TenantVo tenantVo, String restUrl, MultiValueMap<String, Object> param) {
		return requestTenant(tenantVo, restUrl, HttpMethod.GET, param);
	}

	/**
	 * @param tenantId
	 * @param restUrl
	 * @param param
	 * @return Object
	 */
	public Object requestTenantByPost(long tenantId, String restUrl, MultiValueMap<String, Object> param) {
		return requestTenant(tenantId, restUrl, HttpMethod.POST, param);
	}

	/**
	 * @param tenantVo
	 * @param restUrl
	 * @param param
	 * @return Object
	 */
	public Object requestTenantByPost(TenantVo tenantVo, String restUrl, MultiValueMap<String, Object> param) {
		return requestTenant(tenantVo, restUrl, HttpMethod.POST, param);
	}

	/**
	 * @param tenantId
	 * @param restUrl
	 * @param param
	 * @return Object
	 */
	public Object requestTenantByPut(long tenantId, String restUrl, MultiValueMap<String, Object> param) {
		return requestTenant(tenantId, restUrl, HttpMethod.PUT, param);
	}

	/**
	 * @param tenantVo
	 * @param restUrl
	 * @param param
	 * @return Object
	 */
	public Object requestTenantByPut(TenantVo tenantVo, String restUrl, MultiValueMap<String, Object> param) {
		return requestTenant(tenantVo, restUrl, HttpMethod.PUT, param);
	}

	/**
	 * @param tenantId
	 * @param restUrl
	 * @param param
	 * @return Object
	 */
	public Object requestTenantByDelete(long tenantId, String restUrl, MultiValueMap<String, Object> param) {
		return requestTenant(tenantId, restUrl, HttpMethod.DELETE, param);
	}

	/**
	 * @param tenantVo
	 * @param restUrl
	 * @param param
	 * @return Object
	 */
	public Object requestTenantByDelete(TenantVo tenantVo, String restUrl, MultiValueMap<String, Object> param) {
		return requestTenant(tenantVo, restUrl, HttpMethod.DELETE, param);
	}
	
	/**
	 * @param tenantId
	 * @param restUrl
	 * @param httpMethod
	 * @param param
	 * @return Object
	 */
	private Object requestTenant(long tenantId, String restUrl, HttpMethod httpMethod, MultiValueMap<String, Object> param) {
		TenantVo tenantVo = tenantService.getTenantById(tenantId);
		return requestTenant(tenantVo, restUrl, httpMethod, param);
	}
	
	/**
	 * @param tenantVo
	 * @param restUrl
	 * @param httpMethod
	 * @param param
	 * @return Object
	 */
	@SuppressWarnings("rawtypes")
	private Object requestTenant(TenantVo tenantVo, String restUrl, HttpMethod httpMethod, MultiValueMap<String, Object> param) {
		if(tenantVo == null || tenantVo.getTenantId() < 1) {
			throw new SNSServiceException("테넌트의 정보가 존재하지 않습니다.");
		}
		if(tenantVo.getNetworkAuthIp() == null || "".equals(tenantVo.getNetworkAuthIp())) {
			throw new SNSServiceException("테넌트의 IP정보가 존재하지 않습니다.");
		}
		
		int isNetwork = tenantVo.getIsNetwork();
		if(isNetwork != 1) {
			throw new SNSServiceException("테넌트가 외부 네트워크에 존재하는 회사가 아닙니다.");
		}

		String networkApiUrl = tenantVo.getNetworkApiUrl();
		String networkAuthToken = tenantVo.getNetworkAuthToken();
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set(AuthInterceptor.FEDERATION_AUTH_ID, networkAuthToken);
		
		HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<MultiValueMap<String, Object>>(param, headers);
		
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<MultiValueMap> responseEntity = null;
		
		try {
			responseEntity = restTemplate.exchange(networkApiUrl + restUrl, httpMethod, entity, MultiValueMap.class, param);
		} catch(Exception e) {
			LOG.error("테넌트 서버 접속시 에러가 발생했습니다.", e);
			throw new SNSRunTimeException("테넌트 서버 접속시 에러가 발생했습니다.");
		}
		
		if(responseEntity.getStatusCode() != HttpStatus.OK) {
			LOG.error("테넌트 서버에서 에러가 발생했습니다. (" + responseEntity.getStatusCode() + ")\n" + responseEntity.getBody());
			throw new SNSRunTimeException("테넌트 서버에서 에러가 발생했습니다.");
		}
		
		return responseEntity.getBody();
	}

}