package org.uengine.sns.common.util.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.uengine.sns.common.util.vo.LocaleVo;

/**
 * 
 * LocaleService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("localeService")
public class LocaleService {
	
	/**
	 * @param localeVo
	 * @param request
	 * @param response
	 * @return LocaleVo
	 */
	public LocaleVo preHandle(LocaleVo localeVo, HttpServletRequest request, HttpServletResponse response) {

		String newLocale = localeVo.getLang();
		if(newLocale != null) {
			LocaleResolver localeResolver = RequestContextUtils.getLocaleResolver(request);
			if(localeResolver == null) {
				throw new IllegalStateException("No LocaleResolver found: not in a DispatcherServlet request?");
			}
			localeResolver.setLocale(request, response, StringUtils.parseLocaleString(newLocale));
		}
		return localeVo;
	}

}