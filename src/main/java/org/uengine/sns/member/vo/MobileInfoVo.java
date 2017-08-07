package org.uengine.sns.member.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * MobileInfoVo
 * <pre>
 * 	<p>모바일 정보 적용은</p>
 * 	<p>프로젝트 시점에서 커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}MOBILEINFO
 *
 */
@JsonInclude(Include.NON_NULL)
public class MobileInfoVo implements Serializable {

	private static final long serialVersionUID = -966980131983161394L;
	
	/**
	 * 사용자 아이디
	 */
	private long memberId;
		public long getMemberId() { return memberId; }
		public void setMemberId(long memberId) { this.memberId = memberId; }

	/**
	 * 사용자 고유키
	 */
	private String jId;	
		public String getjId() { return jId; }
		public void setjId(String jId) { this.jId = jId; }
		
	/**
	 * 푸시 토큰값
	 */
	private String pnsToken;	
		public String getPnsToken() { return pnsToken; }
		public void setPnsToken(String pnsToken) { this.pnsToken = pnsToken; }
		
	/**
	 * 단말 키 정보
	 */
	private String deviceId;
		public String getDeviceId() { return deviceId; }
		public void setDeviceId(String deviceId) { this.deviceId = deviceId; }
		
	/**
	 * 단말 종류
	 */
	private String platformCode;
		public String getPlatformCode() { return platformCode; }
		public void setPlatformCode(String platformCode) { this.platformCode = platformCode; }
		
	/**
	 * 단말 버전
	 */
	private String platformVer;
		public String getPlatformVer() { return platformVer; }
		public void setPlatformVer(String platformVer) { this.platformVer = platformVer; }
		
	/**
	 * 단말 해상도
	 */
	private String deviceType;
		public String getDeviceType() { return deviceType; }
		public void setDeviceType(String deviceType) { this.deviceType = deviceType; }
		
	/**
	 * 단말 도델명
	 */
	private String deviceModel;
		public String getDeviceModel() { return deviceModel; }
		public void setDeviceModel(String deviceModel) { this.deviceModel = deviceModel; }
		
	/**
	 * 단말 언어셋
	 */
	private String langSet;
		public String getLangSet() { return langSet; }
		public void setLangSet(String langSet) { this.langSet = langSet; }

}