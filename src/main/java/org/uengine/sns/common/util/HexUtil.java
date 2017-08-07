package org.uengine.sns.common.util;

/**
 * 
 * HexUtil
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class HexUtil {

	/**
	 * @param bytes
	 * @return String
	 */
	public static String toHexString(byte[] bytes) {
		if(bytes == null) {
			return null;
		}
		
		StringBuffer result = new StringBuffer();
		for(byte b : bytes) {
			result.append(Integer.toString((b & 0xF0) >> 4, 16));
			result.append(Integer.toString(b & 0x0F, 16));
		}
		return result.toString();
	}

	/**
	 * @param digits
	 * @return byte[]
	 * @throws IllegalArgumentException
	 * @throws NumberFormatException
	 */
	public static byte[] toBytesFromHexString(String digits) throws IllegalArgumentException, NumberFormatException {
		
		if(digits == null) {
			return null;
		}
		
    	int length = digits.length();
    	if(length % 2 == 1) {
    		throw new IllegalArgumentException("Invalid string: \"" + digits + "\"");
    	}
    	
    	length = length / 2;
    	byte[] bytes = new byte[length];
    	for(int i = 0; i < length; i++) {
    		int index = i * 2;
    		bytes[i] = (byte)(Short.parseShort(digits.substring(index, index+2), 16));
    	}
    	
    	return bytes;
	}

}