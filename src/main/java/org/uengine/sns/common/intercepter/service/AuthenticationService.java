package org.uengine.sns.common.intercepter.service;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.uengine.sns.openapi.service.GroupWareService;

/**
 * 
 * AuthenticationService
 * <pre>
 * 	<p>인증 서버는 해당 그룹웨어에 따라</p>
 *  <p>커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("authenticationService")
public class AuthenticationService {

	private static final Logger LOG = LoggerFactory.getLogger(AuthenticationService.class);
	
	@Value("#{conf['allow.ip.ranges'].split(';')}")
	public List<String> allowIpRangeList;
	
	@Value("#{conf['allow.ip.list'].split(';')}")
	public List<String> allowIpList;
	
	@Autowired 
	GroupWareService groupWareService;
	
	/**
	 * @param otaId
	 * @return String
	 */
	public String authenticateByMobile(String otaId) {
		
		if(StringUtils.isEmpty(otaId)) {
			return null;
		}
		return null;
	}
	
	/**
	 * 커스터마이징 영역
	 * @param otaId
	 * @return String
	 */
	public String authenticateBySlo(String otaId) {
		if(StringUtils.isEmpty(otaId)) {
			return null;
		}
		
		String userId = groupWareService.getGroupWareUserIdByOtaId(otaId);
		if(StringUtils.isEmpty(userId)) {
			return null;
		}
		
		return userId;
	}
	
	/**
	 * @param clientIp
	 * @return boolean
	 */
	public boolean validateAccessIp(String clientIp) {
		if(allowIpList == null || allowIpList.size() == 0) {
			return false;
		}
		
		InetAddress clientAddr;
		try {
			clientAddr = InetAddress.getByName(clientIp);
		} catch(Exception e) {
			clientAddr = null;
			LOG.error("접속한 IP가 유효하지 않습니다.", e);
			return false;
		}
		
		// IPv6 localhost
		InetAddress v6local;
		try {
			v6local = InetAddress.getByName("::1");
		} catch(Exception e) {
			v6local = null;
		}
		
		if(clientAddr.equals(v6local)) {
			return true;
		}
		
		boolean b = allowIpList.contains(clientIp);
		return b;
	}

	/**
	 * @param clientIp
	 * @return boolean
	 */
	public boolean validateAccessIpByRange(String clientIp) {
		boolean b = false;
		if(allowIpRangeList == null || allowIpRangeList.size() == 0) {
			return false;
		}
		
		for(String ipRangeByCclass : allowIpRangeList) {
			if(StringUtils.isEmpty(ipRangeByCclass.trim())) continue;
			
			b = validateAccessIpByRange(ipRangeByCclass, clientIp);
			if(b) break;
		}
		
		return b;
	}
	
	/**
	 * IP 대역 C 클래스 (예 : 127.12.12)
	 * @param ipRangeByCclass
	 * @param clientIp
	 * @return boolean
	 */
	private boolean validateAccessIpByRange(String ipRangeByCclass, String clientIp) {
		String ipStart = ipRangeByCclass + ".1";
		String ipEnd   = ipRangeByCclass + ".255";
		return validateAccessIpByRange(ipStart, ipEnd, clientIp);
	}
	
	/**
	 * @param ipStart
	 * @param ipEnd
	 * @param clientIp
	 * @return boolean
	 */
	private boolean validateAccessIpByRange(String ipStart, String ipEnd, String clientIp) {
		try {
			long ipLo = ipToLong(InetAddress.getByName(ipStart));
			long ipHi = ipToLong(InetAddress.getByName(ipEnd));
			long ipToTest = ipToLong(InetAddress.getByName(clientIp));
			return (ipToTest >= ipLo && ipToTest <= ipHi);
		} catch (UnknownHostException e) {
			LOG.error("IP가 유효하지 않습니다.", e);
			return false;
		}
	}

	/**
	 * @param ip
	 * @return long
	 */
	private long ipToLong(InetAddress ip) {
		byte[] octets = ip.getAddress();
		long result = 0;
		for(byte octet : octets) {
			result <<= 8;
			result |= octet & 0xff;
		}
		return result;
	}

}