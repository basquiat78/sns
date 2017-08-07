package org.uengine.sns.common.util;

import java.security.Key;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * DesUtil
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class DesUtil {
	
	private static final Logger LOG = LoggerFactory.getLogger(DesUtil.class);
	
    /**
     * 24바이트인 경우 TripleDES 아니면 DES
     * @param keyStr
     * @return Key
     */
    private static Key getKey(String keyStr) {
        return (keyStr.length() == 24) ? getKey24(keyStr) : getKey16(keyStr);     
    }
    
    /**
     * Cipher의 instance 생성시 사용될 값
     * @param keyStr
     * @return String
     */
    private static String getAlgorithm(String keyStr) {
        return (keyStr.length() == 24) ? "DESede/ECB/PKCS5Padding" : "DES/ECB/PKCS5Padding";
    }
    
    /**
     * 지정된 비밀키를 가지고 오는 메서드(DES) 
     * require Key Size : 16bytes
     * @param keyValue
     * @return Key
     */
    private static Key getKey16(String keyValue) {

        SecretKeyFactory keyFactory;
        
		try {
			keyFactory = SecretKeyFactory.getInstance("DES");
	        DESKeySpec desKeySpec = new DESKeySpec( keyValue.getBytes() );
	        return keyFactory.generateSecret( desKeySpec );
		} catch (Exception e) {
			LOG.error("", e);
			return null;
		}
    }
    
    /**
     * 지정된 비밀키를 가지고 오는 메서드(TripleDES) 
     * require Key Size : 24bytes
     * @param keyValue
     * @return Key
     */
    private static Key getKey24(String keyValue) {

        SecretKeyFactory keyFactory;
        
		try {
			keyFactory = SecretKeyFactory.getInstance("DESede");
	        DESKeySpec desKeySpec = new DESKeySpec( keyValue.getBytes() );
	        return keyFactory.generateSecret( desKeySpec );
		} catch (Exception e) {
			LOG.error("", e);
			return null;
		}
    }
    
    /**
     * 문자열 대칭 암호화
     * 암호화된 Hex 문자열 반화
     * @param keyStr
     * @param input
     * @return String
     */
    public static String encrypt(String keyStr, String input) {

        if(input == null || input.length() == 0) {
        	return "";
        }
        String str = null;
        Cipher cipher;
		try {
			cipher = Cipher.getInstance( getAlgorithm(keyStr) );

	        cipher.init( Cipher.ENCRYPT_MODE, getKey(keyStr) );
	        
	        byte [] inputBytes = input.getBytes("UTF-8");
	        byte [] outputBytes = cipher.doFinal( inputBytes );
	        
	        str = HexUtil.toHexString( outputBytes );
		} catch (Exception e) {
			LOG.error("", e);
		}
        
        return str;
    }
    
    /**
     * 복호화된 문자열 반환
     * @param keyStr
     * @param input
     * @return String
     */
    public static String decrypt(String keyStr, String input) {

        if(input == null || input.length() == 0) {
        	return "";
        }
        String str = null;
        Cipher cipher;
		try {
			cipher = Cipher.getInstance( getAlgorithm(keyStr) );
	        cipher.init( Cipher.DECRYPT_MODE, getKey(keyStr) );
	        
	        byte [] inputBytes = HexUtil.toBytesFromHexString( input );
	        byte [] outputBytes = cipher.doFinal( inputBytes );

	        str = new String( outputBytes, "UTF-8" );
		} catch (Exception e) {
			LOG.error("", e);
		}
        return str;
    }

}