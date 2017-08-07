package org.uengine.sns.common.util.web;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.util.service.OpenGraphService;
import org.uengine.sns.common.util.vo.OpenGraphVo;
 
/**
 * 
 * OpenGraphController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class OpenGraphController extends ExceptionController {
	
	@Autowired
	OpenGraphService openGraphService;
	
	/**
	 * @param url
	 * @return Map<String, OpenGraphVo>
	 * @throws IOException
	 * @throws Exception
	 */
	@RequestMapping(value = "/opengraph")
	public @ResponseBody Map<String, OpenGraphVo> getUrlMetaData(@RequestParam("url") String url) throws IOException, Exception {
		return openGraphService.getUrlMetaDatas(url);
	}

}