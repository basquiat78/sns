package org.uengine.sns.openapi.service;

import java.rmi.RemoteException;
import java.util.HashMap;
import java.util.Map;

import org.apache.axis2.AxisFault;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.uengine.sns.common.Exception.SNSRunTimeException;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.util.XmlParsingUtil;
import org.uengine.sns.federation.service.FederationService;
import org.uengine.sns.openapi.vo.SharePointFileVo;
import org.uengine.sns.openapi.vo.SharePointIntgSearchVo;
import org.uengine.sns.openapi.vo.SharePointUploadFileVo;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub;
import org.uengine.sns.webservice.sharepoint.org.tempuri.DocLibStub.UpResInfo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 
 * SharePointService
 * <pre>
 * 	<p>ms sharepoint 연동을 위한 서비스로 </p>
 * 	<p>프로젝트시 커스터마이징이 요구된다.</p>
 * </p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("sharePointService")
public class SharePointService {
	
	private static final Logger LOG = LoggerFactory.getLogger(SharePointService.class);

	@Autowired
	FederationService federationService;
	
	@Value("#{conf['shrpnt.itg.url']}")
	private String shrpItgUrl;
	
	@Value("#{conf['shp.rest.sv001']}")
	private String sv001MySite;
	
	@Value("#{conf['shp.rest.sv002']}")
	private String sv002Folders;
	
	@Value("#{conf['shp.rest.sv003']}")
	private String sv003DocLib;
	
	@Value("#{conf['shp.rest.sv004']}")
	private String sv004DeleteDoc;
	
	@Value("#{conf['shp.rest.sv005']}")
	private String sv005Doclists;
	
	@Value("#{conf['shp.rest.sv020']}")
	private String sv020AuthorizedCafe;
	
	@Value("#{conf['shp.rest.sv021']}")
	private String sv021JoinCafe;
	
	@Value("#{conf['shp.rest.sv022']}")
	private String sv022Secession;
	
	@Value("#{conf['shp.rest.sv023']}")
	private String sv023MyCafe;
	
	@Value("#{conf['shp.rest.sv013']}")
	private String sv013MemSync;
	
	/**
	 * @param pathKey
	 * @return String
	 */
	public String getSharePointUrl(String pathKey) {
    	switch(pathKey){
            case "IF_SV_001":
                return sv001MySite;
            case "IF_SV_002":
            	return sv002Folders;
            case "IF_SV_003":
            	return sv003DocLib;
            case "IF_SV_004":
            	return sv004DeleteDoc;
            case "IF_SV_005":
            	return sv005Doclists;
            case "IF_SV_013":
            	return sv013MemSync;
            case "IF_SV_020":
            	return sv020AuthorizedCafe;
            case "IF_SV_021":
            	return sv021JoinCafe;
            case "IF_SV_022":
            	return sv022Secession;
            case "IF_SV_023":
            	return sv023MyCafe;
            default:
            	return "NO PATH";
    	}
    }
	
	/**
	 * 파일 업로드
	 * @param sharePointFileVo
	 * @return SharepointFileVo
	 */
	public SharePointFileVo getIF_SV_003(SharePointFileVo sharePointFileVo) {
		return null;
	}
	
	/**
	 * sharepoint 연동
	 * @param paramMap
	 * @return String
	 */
	public String getSharePointRestService(Map<String, Object> paramMap) {
		RestTemplate restTemplate = new RestTemplate();	
		String pathKey = (String)paramMap.get("pathKey");
		String shpPntUrl = getSharePointUrl(pathKey);
		LOG.info("shpPntUrl :" + shpPntUrl);
		ResponseEntity<String> responseEntity = restTemplate.postForEntity(shpPntUrl, paramMap, String.class);
		LOG.info("rest status :" + responseEntity.getStatusCode());
		return responseEntity.getBody();
	}
	
	/**
	 * sharepoint upload File 연동
	 * @param sharePointUploadFileVo
	 * @return UpResInfo
	 */
	public UpResInfo processUploadFile(SharePointUploadFileVo sharePointUploadFileVo) {
		DocLibStub proxy = null;
		UpResInfo upResInfo = null;
		try {
			proxy = new DocLibStub(sv003DocLib);
			upResInfo = proxy.uploadFile(sharePointUploadFileVo.getUpDocInfoClass(),sharePointUploadFileVo.getFileNameClass(),sharePointUploadFileVo.getFolderIdClass(), 
					sharePointUploadFileVo.getSiteIdClass(), sharePointUploadFileVo.getSnsFeedIdClass(),sharePointUploadFileVo.getSnsGroupIdClass(), sharePointUploadFileVo.getSysTypeClass(), sharePointUploadFileVo.getUserIdClass());
		} catch (AxisFault e1) {
			LOG.error("", e1);
			throw new SNSRunTimeException("쉐어포인트 파일업로드시 웹서비스 오류가 발생했습니다.", e1);
		} catch (RemoteException e) {
			LOG.error("", e);
			throw new SNSRunTimeException("쉐어포인트 파일업로드시 오류가 발생했습니다.", e);
		} catch (Exception e) {
			LOG.error("", e);
			throw new SNSRunTimeException("쉐어포인트 파일업로드시 오류가 발생했습니다.", e);
		} finally {
			try { if(proxy != null) proxy.cleanup(); } catch (Exception e) { LOG.error("", e); }
		}
		
		return upResInfo;
	}
	
	/**
	 * 통합검색 조회
	 * @param sharePointIntgSearchVo
	 * @return String
	 */
	public String getIntegrationSearchList(SharePointIntgSearchVo sharePointIntgSearchVo) {
		RestTemplate restTemplate = new RestTemplate();	  
		String keyword = sharePointIntgSearchVo.getKeyword();
		LOG.info("\n\nshare point integration url:" + shrpItgUrl);
		LOG.info("userid:" + sharePointIntgSearchVo.getUserId());
		LOG.info("groupid:" + sharePointIntgSearchVo.getGroupId());
		LOG.info("keyword:" + keyword);
		LOG.info("category:" + sharePointIntgSearchVo.getCategory());
		LOG.info("type:" + sharePointIntgSearchVo.getType());
		
		String respXmlStr = null;
		if(keyword != null && keyword.equals("") == false ) {
			ResponseEntity<String> response = null;
			try {
				response = restTemplate.postForEntity(shrpItgUrl, sharePointIntgSearchVo, String.class);
				LOG.info("status code:" + response.getStatusCode());
			    respXmlStr = response.getBody();
				LOG.info("\n\nrespXmlStr :" + respXmlStr);
			} catch (Exception ex) {
				LOG.error("", ex);
				throw new SNSServiceException("통합검색 서비스에서 오류가 발생했습니다.", ex);
			}
		}
		
		String parseXmlStr = "[]";
		if(respXmlStr != null) {
			Map<String, String> xmlParamMap = new HashMap<String, String>();
			xmlParamMap.put("xmlStr", respXmlStr);
			xmlParamMap.put("findDomPaths", "d:query/d:PrimaryQueryResult/d:RelevantResults/d:Table/d:Rows");
			xmlParamMap.put("findParentNodeName", "d:Cells");
			xmlParamMap.put("findNodeName", "d:element");
			xmlParamMap.put("findTotalRowsName", "d:TotalRows");
			parseXmlStr = new XmlParsingUtil().getParsingXml(xmlParamMap);
		}
		LOG.info("\n\nparseXmlStr ==> json:\n" + parseXmlStr);
		return parseXmlStr;
	}
	
	/**
	 * sharepoint site정보 취득
	 * @param paramMap
	 * @return String
	 */
	public String getSharePointSiteInfo(Map<String, String> paramMap) {
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> responseEntity = null;
		String shpPntUrl = null;
		String jsonSiteStr = null;
		String path = paramMap.get("path") == null ? "ALL" : paramMap.get("path").toUpperCase();
		boolean isFolderHideCheckbox = (path.equals("FOLDER") || path.equals("ALL")) ? false : true;

		JSONArray jsonFolderArr = new JSONArray();
		String retStr = null;
		
		shpPntUrl = getSharePointUrl("IF_SV_001");
		LOG.info("shpPntUrl :" + shpPntUrl);
		responseEntity = restTemplate.postForEntity(shpPntUrl, paramMap, String.class);
		LOG.info("rest status :" + responseEntity.getStatusCode());
		jsonSiteStr = responseEntity.getBody();
		JSONArray tmpJsonArr = JSONArray.fromObject(jsonSiteStr)  == null ? new JSONArray() : JSONArray.fromObject(jsonSiteStr);
		
		String siteId = null;
		String siteName = null;
		String closeYn = null;
		String folderId = null;
		for(int idx = 0; idx < tmpJsonArr.size(); idx++) {
			JSONObject jsonObj = (JSONObject)tmpJsonArr.get(idx);
			siteId = jsonObj.get("siteId") == null ? "" : jsonObj.get("siteId").toString();
			siteName = jsonObj.get("siteName_KR") == null ? "" : jsonObj.get("siteName_KR").toString();
			closeYn = jsonObj.get("closeYN") == null ? "" : jsonObj.get("closeYN").toString();
			folderId = jsonObj.get("folderId") == null ? "" : jsonObj.get("FolderId").toString();
			
			jsonObj.put("key", siteId);
			jsonObj.put("title", siteName);
			jsonObj.put("isFolder", true);
			
			if(folderId.equals("")) {
				jsonObj.put("hideCheckbox", true);
			} else {
				jsonObj.put("hideCheckbox", isFolderHideCheckbox);
			}
			
			if(closeYn.equals("N")) {
				jsonObj.put("isLazy", true);
			}
			
			jsonFolderArr.add(jsonObj);
	    }
		
		retStr = jsonFolderArr.toString();
		
		LOG.info("retStr :" + retStr);
		return retStr;
	}
	
	/**
	 * sharepoint 폴더정보 취득
	 * @param paramMap
	 * @return String
	 */
	public String getSharePointFolderInfo(Map<String, String> paramMap) {
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> responseEntity = null;
		String shpPntUrl = null;
		String path = paramMap.get("path") == null ? "ALL" : paramMap.get("path").toUpperCase();
		String jsonFolderStr = null;
		String jsonDocStr = null;
		
		boolean isFolderHideCheckbox = (path.equals("FOLDER") || path.equals("ALL")) ? false : true;
		boolean isFileHideCheckBox = (path.equals("FILE") || path.equals("ALL")) ? false : true;

		// 폴더인 경우만 체크박스 사용유무 사용
		if("FOLDER".equals(path)) {
			String checkUseYn = paramMap.get("checkUseYn") == null ? "Y" : paramMap.get("checkUseYn").toUpperCase();
			isFolderHideCheckbox = (checkUseYn.equals("Y") == false) ? true : false;
		}
		
		JSONArray jsonFolderArr = new JSONArray();
		JSONArray jsonDocArr = new JSONArray();
		String retStr = null;
		
		shpPntUrl = getSharePointUrl("IF_SV_002");
		LOG.info("shpPntUrl :" + shpPntUrl);
		responseEntity = restTemplate.postForEntity(shpPntUrl, paramMap, String.class);
		LOG.info("rest status :" + responseEntity.getStatusCode());
		jsonFolderStr = responseEntity.getBody();
		JSONArray tmpJsonArr = JSONArray.fromObject(jsonFolderStr)  == null ? new JSONArray() : JSONArray.fromObject(jsonFolderStr);
		
		String folderId = null;
		boolean hasSubFolders = false;
		String folderName = null;
		for(int idx = 0; idx < tmpJsonArr.size(); idx++) {
			JSONObject jsonObj = (JSONObject)tmpJsonArr.get(idx);
			folderId = jsonObj.get("folderId") == null ? "" : jsonObj.get("folderId").toString();
			jsonObj.put("key", folderId);
			
			folderName = jsonObj.get("folderName") == null ? "" : jsonObj.get("folderName").toString();
			hasSubFolders = jsonObj.get("hasSubFolders") == null ? false : ((Boolean)jsonObj.get("hasSubFolders")).booleanValue();
			
			jsonObj.put("title", folderName);
			jsonObj.put("isFolder", true);
			jsonObj.put("hideCheckbox", isFolderHideCheckbox);
			if(hasSubFolders) {
				jsonObj.put("isLazy", true);
			}
			
			jsonFolderArr.add(jsonObj);
	    }
		
		retStr = jsonFolderArr.toString();
		
		if(path.equals("FILE") || path.equals("ALL")) {
			shpPntUrl = getSharePointUrl("IF_SV_005");
			LOG.info("shpPntUrl :" + shpPntUrl);
			responseEntity = restTemplate.postForEntity(shpPntUrl, paramMap, String.class);
			LOG.info("rest status :" + responseEntity.getStatusCode());
			jsonDocStr = responseEntity.getBody();
			JSONObject jsonDocObj = JSONObject.fromObject(jsonDocStr);
			
			tmpJsonArr = JSONArray.fromObject(jsonDocObj.get("fileInfo").equals("null") ? "[]" : jsonDocObj.get("fileInfo").toString());
			String docName = null;
			String docId = null;
			for(int idx = 0; idx < tmpJsonArr.size(); idx++) {
				JSONObject jsonObj = (JSONObject)tmpJsonArr.get(idx);
				docId = jsonObj.get("docId") == null ? "" : jsonObj.get("docId").toString();
				jsonObj.put("key", docId);
				
				docName = jsonObj.get("docName") == null ? "" : jsonObj.get("docName").toString();
				jsonObj.put("title", docName);
				jsonObj.put("isFolder", false);
				jsonObj.put("hideCheckbox", isFileHideCheckBox);
				jsonDocArr.add(jsonObj);
		    }
			
			retStr = jsonDocArr.toString();
		}
		
		if(path.equals("FILE") || path.equals("ALL")) {
			for(int idx = 0; idx < jsonDocArr.size(); idx++) {
				jsonFolderArr.add(jsonDocArr.get(idx));
		    }
			retStr = jsonFolderArr.toString();
		}
		
		LOG.info("retStr :" + retStr);
		return retStr;
	}

}