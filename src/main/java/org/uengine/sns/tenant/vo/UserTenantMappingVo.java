package org.uengine.sns.tenant.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * UserTenantMappingVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}TENANT 
 *
 */
@JsonInclude(Include.NON_NULL)
public class UserTenantMappingVo implements Serializable {
	
	private static final long serialVersionUID = 9044942731394424262L;
	
	/**
	 * 매핑 아이디
	 */
	private long mappingId;
		public long getMappingId() { return mappingId; }
		public void setMappingId(long mappingId) { this.mappingId = mappingId; }
	
	/**
	 * 부서명
	 */
	private String partName;
		public String getPartName() { return partName; }
		public void setPartName(String partName) { this.partName = partName; }
		
	/**
	 * 직위
	 */
	private String positionName;
		public String getPositionName() { return positionName; }
		public void setPositionName(String positionName) { this.positionName = positionName; }
		
	/**
	 * 직책
	 */
	private String dutyName;
		public String getDutyName() { return dutyName; }
		public void setDutyName(String dutyName) { this.dutyName = dutyName; }
		
	/**
	 * 본직 여부
	 */
	private Integer isSelfPart;
		public Integer getIsSelfPart() { return isSelfPart; }
		public void setIsSelfPart(Integer isSelfPart) { this.isSelfPart = isSelfPart; }

	/**
	 * 매핑 순번
	 */
	private long mappingSeq;
		public long getMappingSeq() { return mappingSeq; }
		public void setMappingSeq(long mappingSeq) { this.mappingSeq = mappingSeq; }
		
	/**
	 * 사용자 아이디
	 */
	private long memberId;
		public long getMemberId() {	return memberId; }
		public void setMemberId(long memberId) { this.memberId = memberId; }
		
	/**
	 * 사용자 아이디
	 */
	private String syncKey;
		public String getSyncKey() { return syncKey; }
		public void setSyncKey(String syncKey) { this.syncKey = syncKey; }

	/**
	 * 테넌트 아이디
	 */
	private long tenantId;
		public long getTenantId() { return tenantId; }
		public void setTenantId(long tenantId) { this.tenantId = tenantId; }

}