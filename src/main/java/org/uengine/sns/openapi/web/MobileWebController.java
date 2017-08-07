package org.uengine.sns.openapi.web;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.openapi.service.PushService;
import org.uengine.sns.openapi.vo.PushVo;

/**
 * 
 * MobileWebController
 * <pre>
 * 	<p>모바일 관련 부분은 </p>
 *  <p>프로젝트 시점에 커스터마이징 영역이다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class MobileWebController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MobileWebController.class);
	
	@Autowired
	PushService pushService;
	
	/**
	 * PNS 푸시 인터페이스 
	 * @param param
	 * @param pushVo
	 * @return Object
	 */
	@RequestMapping(value = "/openapi/pnspush", method=RequestMethod.POST)
	public @ResponseBody Object PNS_PUSH_INTERFACE(@RequestParam Map<Object, Object> param, PushVo pushVo) {
		return null;
	}

}