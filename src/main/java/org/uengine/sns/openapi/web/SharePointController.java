package org.uengine.sns.openapi.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.Exception.NotAcceptableException;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.federation.service.FederationService;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.openapi.service.SharePointService;
import org.uengine.sns.openapi.vo.SharePointIntgSearchVo;
import org.uengine.sns.openapi.vo.SharePointUploadFileVo;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.UpResInfo;

/**
 * 
 * SharePointController
 * <pre>
 * 	<p>쉐어포인트 관련 부분은 </p>
 *  <p>프로젝트 시점에 커스터마이징 영역이다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class SharePointController extends ExceptionController {
	
	private static final Logger LOG = LoggerFactory.getLogger(SharePointController.class);
		
	@Autowired
	SharePointService sharePointService;
	
	@Autowired
	FederationService federationService;

	@Autowired
	FeedService feedService;
	
	@Autowired
	MemberService memberService;
	
	/**
	 * sharepoint 연동
	 * 커스터마이징 영역
	 * @param response
	 * @param paramMap
	 * @param pathKey
	 */
	@RequestMapping(value = "/openapi/sharepoint/{pathKey}", method = RequestMethod.POST)
	public void getSharePointRestService(HttpServletResponse response, @RequestBody Map<String, Object> paramMap, @PathVariable("pathKey") String pathKey) {
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/plain");
		LOG.info("\n\n##############################  SharePointController Parameter Start"  + "##############################");
		LOG.info("pathKey : " + pathKey);
		for (String key : paramMap.keySet()) {
			LOG.info(key + " :" + paramMap.get(key));
	    }
		LOG.info("\n##############################  SharePointController End"  + "##############################\n");
		
		paramMap.put("pathKey", pathKey.toUpperCase());
		String responseBody = sharePointService.getSharePointRestService(paramMap);
	    LOG.info("responseBody :" + responseBody);
		
		PrintWriter writer = null;
		try {
			writer = response.getWriter();
			writer.write(responseBody);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(writer != null) {
			 writer.close();
			}
		}
	}
	
	/**
	 * sharepoint upload File 연동
	 * 커스터마이징 영역
	 * @param sharePointUploadFileVo
	 * @return 커스터마이징 영역
	 */
	@RequestMapping(value = "/openapi/sharepoint/upload/file", method = RequestMethod.POST)
	public @ResponseBody UpResInfo processUploadFile(SharePointUploadFileVo sharePointUploadFileVo) {
		return sharePointService.processUploadFile(sharePointUploadFileVo);
	}
	
	/**
	 * 그룹웨어 통합검색 조회
	 * 커스터마이징 영역
	 * @param sharePointIntgSearchVo
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = "/openapi/sharepoint/integration/search", method=RequestMethod.POST)
	public @ResponseBody String goGroupWareIntegrationSearch(@RequestBody SharePointIntgSearchVo sharePointIntgSearchVo) throws Exception {
		return sharePointService.getIntegrationSearchList(sharePointIntgSearchVo);
	}
	
	/**
	 * 그룹웨어 통합검색 조회
	 * 커스터마이징 영역
	 * @param request
	 * @param param
	 * @return List<FeedVo>
	 * @throws Exception
	 */
	@RequestMapping(value = "/openapi/sharepoint/integration/search", method=RequestMethod.GET)
	public @ResponseBody List<FeedVo> goEgOfficeIntegrationSearchGET(HttpServletRequest request, @RequestParam Map<Object, Object> param) throws Exception {
		
		HttpSession session = request.getSession(false);
		long sessionMemberId = 0;
		if(session != null && session.getAttribute("memberId") != null) {
			sessionMemberId = (Long) session.getAttribute("memberId");
		} else {
			String userId = (String) request.getAttribute("userId");
			MemberVo memberVo = memberService.getMemberBySynckey(HttpUtil.getLocaleString(request), userId);
			sessionMemberId = memberVo.getMemberId();
		}
		
		SharePointIntgSearchVo sharepointIntgSearchVo = new SharePointIntgSearchVo();
		try {
		    BeanUtils.populate(sharepointIntgSearchVo, param);
		} catch (Throwable e) {
			throw new NotAcceptableException(e.getMessage());
		}
		
		String xmlStr = sharePointService.getIntegrationSearchList(sharepointIntgSearchVo);
		JSONArray jarr = new JSONArray(xmlStr);
		List<Long> feedIdList = new ArrayList<Long>();
		if(jarr != null) { 
			int len = jarr.length();
			for(int i=0;i<len;i++){
				feedIdList.add(jarr.getJSONObject(i).getLong("SNSPkId"));
			}
		}
		
		List<FeedVo> feedMetadata = feedService.getFeedMetaData(HttpUtil.getLocaleString(request), sessionMemberId, feedIdList, "");
		return feedMetadata;
	}
	
	/**
	 * sharepoint 연동
	 * 커스터마이징 영역
	 * @param response
	 * @param paramMap
	 */
	@RequestMapping(value = "/openapi/sharepoint/site/info")
	public void getSharepointSiteInfo(HttpServletResponse response, @RequestParam Map<String, String> paramMap) {
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/plain");
		LOG.info("\n\n##############################  SharepointController Parameter Start"  + "##############################");
		for(String key : paramMap.keySet()) {
			LOG.info(key + " :" + paramMap.get(key));
	    }
		LOG.info("\n##############################  SharepointController End"  + "##############################\n");
		
		String responseBody = sharePointService.getSharePointSiteInfo(paramMap);
		LOG.info("responseBody :" + responseBody);
		
		PrintWriter writer = null;
		try {
			writer = response.getWriter();
			writer.write(responseBody);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(writer != null) {
				writer.close();
			}
		}
	}
	
	/**
	 * sharepoint 연동
	 * 커스터마이징 영역
	 * @param response
	 * @param paramMap
	 * @param path
	 */
	@RequestMapping(value = "/openapi/sharepoint/folder/info/{path}")
	public void getSharepointFoloderInfo(HttpServletResponse response, @RequestParam Map<String, String> paramMap, @PathVariable("path") String path) {
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/plain");
		
		LOG.info("\n\n##############################  SharepointController Parameter Start"  + "##############################");
		for(String key : paramMap.keySet()) {
			LOG.info(key + " :" + paramMap.get(key));
	    }
		
		LOG.info("\n##############################  SharepointController End"  + "##############################\n");
		LOG.info(path + " :" + path);
		
		paramMap.put("path", path.toUpperCase());
		String responseBody = sharePointService.getSharePointFolderInfo(paramMap);
		LOG.info("responseBody :" + responseBody);
		
		PrintWriter writer = null;
		try {
			writer = response.getWriter();
			writer.write(responseBody);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(writer != null) {
				writer.close();
			}
		}
	}
}
