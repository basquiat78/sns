package org.uengine.sns.openapi.web;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.federation.service.FederationService;
import org.uengine.sns.openapi.service.MSService;

/**
 * 
 * MSController
 * <pre>
 * 	<p>MS 관련 부분은 </p>
 *  <p>프로젝트 시점에 커스터마이징 영역이다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class MSController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MSController.class);
	
	/** 아웃룩 연락처 연동 URL - TODO 제대로 된 URL 정보 필요 */
	public final String MS_OUTLOOK_ADDRESS_001 		= "https://127.0.0.1:8080";
	/** 링크 연락처 연동 URL  - TODO 제대로 된 URL 정보 필요 */
	public final String MS_LYNC_ADDRESS_001 		= "https://127.0.0.1:8080";
	public final String MS_LYNC_ADDRESS_002 		= "https://127.0.0.1:8080";
	
	@Autowired
	FederationService federationService;
	
	@Autowired
	MSService msservice;
	
	/**
	 * 아웃룩 연락처 연동
	 * @param param
	 * @return Object
	 */
	@RequestMapping(value = "/openapi/outlook/address", method=RequestMethod.GET)
	public @ResponseBody Object MS_OUTLOOK_ADDRESS(@RequestParam Map<Object, Object> param) {
		MultiValueMap<String, Object> mParam = new LinkedMultiValueMap<String, Object>(); 
		mParam.add("UserID"  , param.get("UserID"));
		return msservice.getMS_Outlook_ADDRESS(MS_OUTLOOK_ADDRESS_001, mParam);
	}
	
	/**
	 * 링크 연락처 연동
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "/openapi/lync/address", method=RequestMethod.GET)
	public @ResponseBody Object MS_LYNC_ADDRESS(@RequestParam Map<Object, Object> param) {
		return msservice.getMS_LYNC_ADDRESS(MS_LYNC_ADDRESS_002 + "?userId=" + (String)param.get("userId"));
	}

}