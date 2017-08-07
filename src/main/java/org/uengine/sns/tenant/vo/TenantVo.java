package org.uengine.sns.tenant.vo;

import java.io.Serializable;
import java.util.List;

import org.uengine.sns.group.vo.GroupVo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * TenantVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}TENANT 
 *
 */
@JsonInclude(Include.NON_NULL)
public class TenantVo implements Serializable {
	
	private static final long serialVersionUID = 6165280292648896977L;
	
	/**
	 * 테넌트 아이디
	 */
	private long tenantId;
		public long getTenantId() { return tenantId; }
		public void setTenantId(long tenantId) { this.tenantId = tenantId; }
		
	/**
	 * 테넌트 이름
	 */
	private String tenantName;
		public String getTenantName() { return tenantName; }
		public void setTenantName(String tenantName) { this.tenantName = tenantName; }
		
	/**
	 * 테넌트 도메인
	 */
	private String tenantDomain;
		public String getTenantDomain() { return tenantDomain; }
		public void setTenantDomain(String tenantDomain) { this.tenantDomain = tenantDomain; }

	/**
	 * 해당 테넌트 설명
	 */
	private String description;
		public String getDescription() { return description; }
		public void setDescription(String description) { this.description = description; }
		
	/**
	 * 로고 경로
	 */
	private String logoUrl;
		public String getLogoUrl() { return logoUrl; }
		public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
	
	/**
	 * 모바일 Push 서버 도메인
	 */
	private String mobileDomain;
		public String getMobileDomain() { return mobileDomain; }
		public void setMobileDomain(String mobileDomain) { this.mobileDomain = mobileDomain; }
		
	/**
	 * 외부 네트워크 여부
	 */
	private int isNetwork;
		public int getIsNetwork() { return isNetwork; }
		public void setIsNetwork(int isNetwork) { this.isNetwork = isNetwork; }

	/**
	 * 왜부 네트워크 API URL
	 */
	private String networkApiUrl;
		public String getNetworkApiUrl() { return networkApiUrl; }
		public void setNetworkApiUrl(String networkApiUrl) { this.networkApiUrl = networkApiUrl; }
			
	/**
	 * 왜부 네트워크 인증 IP
	 */
	private String networkAuthIp;	
		public String getNetworkAuthIp() { return networkAuthIp; }
		public void setNetworkAuthIp(String networkAuthIp) { this.networkAuthIp = networkAuthIp; }
		
	/**
	 * 왜부 네트워크 인증 토큰
	 */
	private String networkAuthToken;
		public String getNetworkAuthToken() { return networkAuthToken; }
		public void setNetworkAuthToken(String networkAuthToken) { this.networkAuthToken = networkAuthToken; }

	/**
	 * 계열사 아이디(TODO: 테이블 새로 적용하면 지워져야함 - 관련 쿼리 등 사용하는 곳 전부 수정 필요)
	 */
	private String companyId;	
		public String getCompanyId() { return companyId; }
		public void setCompanyId(String companyId) { this.companyId = companyId; }
	
	/**
	 * 계열사 아이디
	 */
	private String tenantSyncKey;
		public String getTenantSyncKey() {return tenantSyncKey;}
		public void setTenantSyncKey(String tenantSyncKey) {this.tenantSyncKey = tenantSyncKey;}

	/**
	 * 사용자 테넌트 매핑 정보 리스트
	 */
	private List<UserTenantMappingVo> utmvo;
		public List<UserTenantMappingVo> getUtmvo() { return utmvo; }
		public void setUtmvo(List<UserTenantMappingVo> utmvo) { this.utmvo = utmvo; }
		
	/**
	 * 그룹 정보 리스트
	 */	
	private List<GroupVo> gvo;
		public List<GroupVo> getGvo() { return gvo; }
		public void setGvo(List<GroupVo> gvo) { this.gvo = gvo; }

}