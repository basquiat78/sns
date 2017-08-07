package org.uengine.sns.openapi.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * GroupWareImageViewlVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 그룹웨어 관련 테이블
 *
 */
@JsonInclude(Include.NON_NULL)
public class GroupWareImageViewlVo implements Serializable {
	
	private static final long serialVersionUID = -2136930932063482541L;
	
	/**
	* 파일ID
	*/	
	private String fileId;
		public String getFileId() { return fileId; }
		public void setFileId(String fileId) { this.fileId = fileId; }
	
	/**
	* 원본 문서 위치
	*/	
	private String reqPath;
		public String getReqPath() { return reqPath; }
		public void setReqPath(String reqPath) { this.reqPath = reqPath; }

	/**
	* scheme
	*/	
	private String scheme;
		public String getScheme() { return scheme; }
		public void setScheme(String scheme) { this.scheme = scheme; }
		
	/**
	* contextPath
	*/	
	private String contextPath;
		public String getContextPath() { return contextPath; }
		public void setContextPath(String contextPath) { this.contextPath = contextPath; }

	/**
	* port
	*/	
	private int port;
		public int getPort() { return port; }
		public void setPort(int port) { this.port = port; }

}