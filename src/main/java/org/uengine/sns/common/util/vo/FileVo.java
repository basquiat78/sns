package org.uengine.sns.common.util.vo;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

/**
 * 
 * FileVo
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class FileVo implements Serializable {
	
	private static final long serialVersionUID = -1575000844085521471L;

	/**
	 * file
	 */
	MultipartFile file;
		public MultipartFile getFile() { return file; }
		public void setFile(MultipartFile file) { this.file = file; }

}