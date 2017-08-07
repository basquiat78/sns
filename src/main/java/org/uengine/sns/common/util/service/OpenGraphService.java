package org.uengine.sns.common.util.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.uengine.sns.common.util.OpenGraph;
import org.uengine.sns.common.util.vo.OpenGraphVo;

/**
 * 
 * OpenGraphService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("openGraphService")
public class OpenGraphService {
	
	/**
	 * 해당 url을 통해 url이 가지고 있는 정보들을 OpenGraphVo에 담는다.
	 * @param url
	 * @return OpenGraphVo
	 * @throws Exception 
	 * @throws IOException 
	 */
	public Map<String, OpenGraphVo> getUrlMetaDatas(String url) throws IOException, Exception {
		
		OpenGraph openGraph = new OpenGraph(url, true);
		OpenGraphVo openGraphVo = openGraph.getOg();
		
		Map<String, OpenGraphVo> ogMap = new HashMap<String, OpenGraphVo>();
		ogMap.put("LINK", openGraphVo);
		
		return ogMap;
	}

}