package org.uengine.sns.common.util;

import java.io.File;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;

/**
 * 
 * FileUtil
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class FileUtil {
	
	public static final String rootImgUrl = "";
	int sizeLimit = 5 * 1024 * 1024 ; // 5메가까지 제한 넘어서면 예외발생
	
	/**
	 * @param request
	 */
	public void fileupload(HttpServletRequest request) {
	}

	/**
	 * @return String
	 */
	public static String makeFileDir() {
		
		Calendar now = Calendar.getInstance();
		int year = now.get(Calendar.YEAR);
		int month = now.get(Calendar.MONTH) + 1;
		int day = now.get(Calendar.DATE);
		
		return year + File.separator + month + File.separator + day;
		
	}

	/**
	 * @param request
	 * @return String
	 */
	public static String getBrowser(HttpServletRequest request) {
		
		String header = request.getHeader("User-Agent");
		
		if(header.contains("Mozilla") && header.indexOf("Chrome") == -1) {
			return "MSIE";
		} else if(header.indexOf("Chrome") > 0) {
			return "Chrome";
		} else if(header.contains("Safari")) {
			return "Safari";
		} else if(header.contains("AppleWebKit")) {
			return "AppleWebKit";
		}
		
		return "Firefox";

	}
	
	/**
	 * 암호화 여부 체크
	 * 커스터마이징 영역
	 * @param f 파일
	 * @return
	 */
	public static boolean isEncryptFile(File f) {
		//TODO : 커스터마이징 영역
	    return true;
	}

}