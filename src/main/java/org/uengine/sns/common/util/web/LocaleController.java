package org.uengine.sns.common.util.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.util.service.LocaleService;
import org.uengine.sns.common.util.vo.LocaleVo;

/**
 * 
 * LocaleController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class LocaleController extends ExceptionController {
	
	@Autowired
	private LocaleService localeService;
	
	/**
	 * @param localeVo
	 * @param map
	 * @param request
	 * @param response
	 * @return LocaleVo
	 */
	@RequestMapping(value = "/common/changelocale", method = RequestMethod.PUT)
    public @ResponseBody LocaleVo changeLocale(@RequestBody LocaleVo localeVo, ModelMap map
    		, HttpServletRequest request, HttpServletResponse response) {

		return localeService.preHandle(localeVo, request, response);
	}

}