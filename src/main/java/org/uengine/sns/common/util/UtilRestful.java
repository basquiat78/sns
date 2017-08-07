package org.uengine.sns.common.util;

import org.uengine.sns.common.ExceptionController;

/**
 * 
 * UtilRestful
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class UtilRestful extends ExceptionController {
	
	/** formupload */
	public final String FILE_UPLOAD_FORM = "/common/util/formupload";
	
	/** ajaxupload */
	public final String FILE_UPLOAD_AJAX = "/common/util/ajaxupload";
	
	/** ajaximgupload */
	public final String IMGFILE_UPLOAD_AJAX = "/common/util/ajaximgupload";
	
	/** delete2 */
	public final String DELETE_FEED_BY_IDS = "/websocket/api1/delete2/{id}";
	
	/** common file upload */
	public final String FILE_COMMON_UPLOAD = "/common/upload/file";
	
	/** common file info */
	public final String FILE_COMMON_INFO = "/common/files/info";
	
	/** common file by id */
	public final String FILE_COMMON_BY_ID = "/common/files/{fileId}";

	/** internal file by id */
	public final String FILE_INTERNAL_BY_ID = "/internal/common/files/{fileId}";
	
	/** internal file by name */
	public final String FILE_INTERNAL_BY_STR = "/internal/common/other/files/{fileStr}";

}