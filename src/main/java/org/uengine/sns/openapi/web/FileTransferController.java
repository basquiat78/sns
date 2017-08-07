package org.uengine.sns.openapi.web;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;

/**
 * 
 * FileTransferController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class FileTransferController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(FileTransferController.class);
	
	/**
	 * DRM 복호화 인터페이스
	 * @param param
	 * @return Object
	 */
	@RequestMapping(value = "/openapi/transfer/drm", method=RequestMethod.POST)
	public @ResponseBody Object transferDrmDecrypt(@RequestParam Map<Object, Object> param) {
		return null;
	}
	
	/**
	 * 문서변환 인터페이스 
	 * @param param
	 * @return Object
	 */
	@RequestMapping(value = "/openapi/transfer/file", method=RequestMethod.POST)
	public @ResponseBody Object transferFile(@RequestParam Map<Object, Object> param) {
		return null;
	}

}