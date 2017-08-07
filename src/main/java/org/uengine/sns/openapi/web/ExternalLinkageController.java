package org.uengine.sns.openapi.web;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.openapi.OpenAPIRestful;
import org.uengine.sns.openapi.service.ExternalLinkageService;
import org.uengine.sns.openapi.vo.ExternalLinkageFollowingVo;
import org.uengine.sns.openapi.vo.ExternalLinkageMapperVo;

/**
 * 
 * ExternalLinkageController
 * <pre>커스터마이징 영역<pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class ExternalLinkageController extends OpenAPIRestful {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(ExternalLinkageController.class);
	
	@Autowired
	ExternalLinkageService externalLinkageService;
	
	/**
	 * @param param
	 * @return List<ExternalLinkageMapperVo>
	 */
	@RequestMapping(value = "/openapi/extlinkage/mappinglist", method = RequestMethod.GET)
	public @ResponseBody List<ExternalLinkageMapperVo> selectExtMappingList(@RequestParam Map<Object, Object> param) {
		ExternalLinkageMapperVo elmv = new ExternalLinkageMapperVo(param);
		return externalLinkageService.selectExtMappingList(elmv);
	}
	
	/**
	 * @param param
	 * @return List<ExternalLinkageMapperVo>
	 */
	@RequestMapping(value = "/openapi/extlinkage/followinglist", method = RequestMethod.GET)
	public @ResponseBody List<ExternalLinkageFollowingVo> selectExtFollowingList(@RequestParam Map<Object, Object> param) {
		ExternalLinkageFollowingVo elfv = new ExternalLinkageFollowingVo(param);
		return externalLinkageService.selectExtFollowingList(elfv);
	}
	
	/**
	 * @param param elfv
	 * @return ExternalLinkageFollowingVo
	 */	
	@RequestMapping(value = "/openapi/extlinkage/followinglist", method = RequestMethod.POST)
	public @ResponseBody ExternalLinkageFollowingVo add(@RequestBody ExternalLinkageFollowingVo elfv) {
		return externalLinkageService.insertExtFollowingBoard(elfv);
	}
	 
	/**
	 * @param param
	 * @return int
	 */
	@RequestMapping(value = "/openapi/extlinkage/followinglist", method = RequestMethod.DELETE)
	public @ResponseBody int del(@RequestBody Map<String, Object> param) {
		return externalLinkageService.deleteExtFollowingBoard(param);
	}
	
	/**
	 * @param param
	 * @return HashMap<String, Object>
	 */	
	@RequestMapping(value = "/openapi/extlinkage/memberinfo", method = RequestMethod.GET)
	public @ResponseBody HashMap<String, Object> selectCurrMemberInfo(@RequestParam Map<Object, Object> param) {
		String s = param.get("memberId").toString();
		return externalLinkageService.selectCurrMemberInfo(s);
	}

}