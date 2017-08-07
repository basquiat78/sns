package org.uengine.sns.openapi.service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.lang3.time.StopWatch;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.uengine.sns.common.Exception.SNSFileNotFoundException;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.util.DesUtil;
import org.uengine.sns.common.util.FileUtil;
import org.uengine.sns.feed.service.FeedFileService;
import org.uengine.sns.feed.vo.FeedFileVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.openapi.vo.GroupWareApprovalVo;
import org.uengine.sns.openapi.vo.GroupWareContactFormVo;
import org.uengine.sns.openapi.vo.GroupWareContactVo;
import org.uengine.sns.openapi.vo.GroupWareMailVo;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

/**
 * 
 * GroupWareService
 * <pre>
 * 	<p>회사 그룹웨어의 따라 이 서비스는</p> 
 *  <p>커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("groupWareService")
public class GroupWareService {
	
	private static final Logger LOG = LoggerFactory.getLogger(GroupWareService.class);

	public static String fileDownDecryptKey = "6789012345abcd";
	
	@Value("#{conf['groupware.slo.encrypt.seed']}")
	public String sloEncryptSeed;

	@Value("#{conf['groupware.slo.encrypt.type']}")
	public String sloEncryptType;

	@Value("#{conf['groupware.slo.endpoint.url']}")
	public String sloEndpointUrl;

	@Value("#{conf['groupware.approve.endpoint.url']}")
	public String approveEndpointUrl;

	@Value("#{conf['groupware.mail.endpoint.url']}")
	public String mailEndpointUrl;

	@Value("#{conf['groupware.img.view.url']}")
	public String imgViewUrl;
	
	@Value("#{conf['groupware.img.view.url.proxy']}")
	public String imgViewUrlProxy;
	
	@Value("#{conf['groupware.img.view.force']}")
	public String force;
	
	@Value("#{conf['groupware.img.view.sync']}")
	public String sync;
	
	@Value("#{conf['groupware.img.view.cvtOption']}")
	public String cvtOption;
	
	@Value("#{conf['groupware.rest.contact.folder']}")
	public String ctfdFolder;
	
	@Value("#{conf['groupware.rest.contact.list']}")
	public String ctltList;
	
	@Value("#{conf['groupware.rest.lync.contact.list']}")
	public String ctlncList;

	@Value("#{conf['groupware.rest.gnb.url']}")
	public String gnbUrl;

	@Value("#{conf['groupware.drm.decrypt.server.url']}")
	public String decryptServerUrl;
	
	@Value("#{conf['common.file.repository.path']}")
	public String COMMON_FILE_REPOSITORY_PATH;
	
	@Value("#{conf['home.domain']}")
	public String homeDomain;

	@Autowired
	FeedFileService feedFileService;
	
	@Autowired
	MemberService memberService;
	
	/**
	 * GroupWare OTA키 발급
	 * 커스터마이징 영역
	 * @param id
	 * @return String
	 */
	public String getGroupWareCreateOTA(String id) {
		String otaId = "";
		try {
			//TODO : 커스터마이징 groupware로부터 api를 받는다.
			otaId = "";
		} catch (Exception e) {
			LOG.error("", e);
			throw new SNSServiceException(e.getMessage());
		}
		
		return otaId;
	}
	
	/**
	 * GroupWare 사용자 아이디 취득
	 * 커스터마이징 영역
	 * @param otaId
	 * @return String
	 */
	public String getGroupWareUserIdByOtaId(String otaId) {
		String id = "";
		try {
			//TODO : 커스터마이징 groupware로부터 api를 받는다.
			id = "";
		} catch (Exception e) {
			LOG.error("", e);
			throw new SNSServiceException(e.getMessage());
		}
		
		return id;
	}
	
	/**
	 * GroupWare 메일 발송
	 * 커스터마이징 영역
	 * @param groupWareMailVo
	 * @return Map<String, Object>
	 */
	public Map<String, Object> sendGroupWareMail(GroupWareMailVo groupWareMailVo) {
		Map<String, Object> retMap = new HashMap<String, Object>();
		String retStr = "";
		try {
			//TODO : 커스터마이징 groupware로부터 api를 받는다.
			retStr = "";
			LOG.info("\n\nmail send result :" + retStr);
		} catch (Exception e) {
			LOG.error("", e);
			throw new SNSServiceException(e.getMessage());
		}
		retMap.put("result", retStr);
		return retMap;
	}
	
	/**
	 * GroupWare 메일 발송 취소
	 * 커스터마이징 영역
	 * @param groupWareMailVo
	 * @return Map<String, Object>
	 */
	public Map<String, Object> cancelGroupWareMail(GroupWareMailVo groupWareMailVo) {
		Map<String, Object> retMap = new HashMap<String, Object>();
		String retStr = "";
		try {
			//TODO : 커스터마이징 groupware로부터 api를 받는다.
			retStr = "";
			LOG.info("\n\nmail cancel result :" + retStr);
		} catch (Exception e) {
			LOG.error("", e);
			throw new SNSServiceException(e.getMessage());
		}
		retMap.put("result", retStr);
		return retMap;
	}
	
	/**
	 * GroupWare 메일 상태 확인
	 * 커스터마이징 영역
	 * @param groupWareMailVo
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getGroupWareMailStatus(GroupWareMailVo groupWareMailVo) {
		Map<String, Object> retMap = new HashMap<String, Object>();
		Object[] wsMailStatus = null;
		try {
			//TODO : 커스터마이징 groupware로부터 api를 받는다.
			wsMailStatus = null;
		} catch (Exception e) {
			LOG.error("", e);
			throw new SNSServiceException(e.getMessage());
		}
		retMap.put("result", wsMailStatus);
		return retMap;
	}

	/**
	 * GroupWare 전자결제 승인
	 * 커스터마이징 영역
	 * @param groupWareApprovalVo
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getGroupWareSubmitApprove(GroupWareApprovalVo groupWareApprovalVo) {
		Map<String, Object> retMap = new HashMap<String, Object>();
		String ret = "";
		try {
			//TODO : 커스터마이징 groupware로부터 api를 받는다.
			ret = "";
		} catch (Exception e) {
			LOG.error("결재 승인 요청 오류", e);
			throw new SNSServiceException("결재 승인 요청 오류.");
		}
		retMap.put("result", ret);
		return retMap;
	}
	
	/**
	 * GroupWare 전자결제 반려
	 * 커스터마이징 영역
	 * @param groupWareApprovalVo
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getGroupWareSubmitReject(GroupWareApprovalVo groupWareApprovalVo) {
		Map<String, Object> retMap = new HashMap<String, Object>();
		String ret = "";
		try {
			//TODO : 커스터마이징 groupware로부터 api를 받는다.
			ret = "";
		} catch (Exception e) {
			LOG.error("결재 승인 요청 오류", e);
			throw new SNSServiceException("결재 승인 요청 오류.");
		}
		retMap.put("result", ret);
		return retMap;
	}
	
	/**
	 * GroupWare 연락처 폴더 조회
	 * 커스터마이징 영역
	 * @param userId
	 * @return String
	 */
	public String getGroupWareContactFolder(String userId) {
		RestTemplate restTemplate = new RestTemplate();
		String url = ctfdFolder + "?userId=" + userId;
		String retBody = null;
		try {
			ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
			retBody = responseEntity.getBody();
		} catch(Exception e) {
			retBody = null;
		}
		return retBody;
	}
	
	/**
	 * GroupWare 연락처 목록 조회
	 * 커스터마이징 영역
	 * @param groupWareContactVo
	 * @return GroupWareContactFormVo
	 */
	public GroupWareContactFormVo getGroupWareContactList(GroupWareContactVo groupWareContactVo) {
		String url = ctltList + "?userId=" + groupWareContactVo.getUserId() + "&folderId=" + groupWareContactVo.getFolderId();
		if(groupWareContactVo.getHexId() != null) {
			url += "&hexId=" + groupWareContactVo.getHexId();
		}
		
		if(groupWareContactVo.getPageSize() != null) {
			url += "&pageSize=" + groupWareContactVo.getPageSize();
		}
		
		GroupWareContactFormVo retVo = null;
		try {
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<GroupWareContactFormVo> responseEntity = restTemplate.getForEntity(url, GroupWareContactFormVo.class);
			retVo = responseEntity.getBody();
		} catch(Exception e) {
			LOG.error("", e);
			retVo = null;
		}
		return retVo;
	}
	
	/**
	 * GroupWare Lync 연락처 조회
	 * 커스터마이징 영역
	 * @param groupWareContactVo
	 * @return GroupWareContactFormVo
	 */
	public GroupWareContactFormVo getGroupWareContactLyncList(String userId) {
		String url = ctlncList + "?userId=" + userId;
		GroupWareContactFormVo retVo = null;
		try {
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<GroupWareContactFormVo> responseEntity = restTemplate.getForEntity(url, GroupWareContactFormVo.class);
			retVo = responseEntity.getBody();
		} catch(Exception e) {
			LOG.error("", e);
			retVo = null;
		}
		return retVo;
	}
	
	/**
	 * 커스터마이징 영역
	 * @param userId
	 * @param companyId
	 * @param filePath
	 * @return String
	 */
	@SuppressWarnings("unchecked")
	public String getDecryptFilePath(String userId, String companyId, String filePath) {
		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		try {
			params.add("path", URLEncoder.encode(filePath, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			LOG.error(e.getMessage());
		}
		params.add("module", "bbs");
		params.add("userId", userId);
		params.add("companyId", companyId);
		
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> responseEntity = restTemplate.postForEntity(decryptServerUrl, params, String.class);
		if(responseEntity.getStatusCode() == HttpStatus.OK) {
			String responseBody =  responseEntity.getBody();
			HashMap<String, Object> jsonObject = null;
			try {
				jsonObject = new ObjectMapper().readValue(responseBody, HashMap.class);
			} catch (IOException e) {
				throw new SNSServiceException("파일 복호화시에 오류가 발생했습니다. (" + responseBody + ")");
			}
			
			if("00".equals((String) jsonObject.get("result"))) {
				return (String) jsonObject.get("filePath");
			} else if("01".equals((String) jsonObject.get("result"))) {
				throw new SNSServiceException("읽기 권한이 없습니다.");
			} else if("99".equals((String) jsonObject.get("result"))) {
				throw new SNSServiceException("파일 복호화시에 오류가 발생했습니다. (code : " +jsonObject.get("result")+ ")");
			} else {
				throw new SNSServiceException("파일 복호화시에 오류가 발생했습니다. (unknowned code : " +jsonObject.get("result")+ ")");
			}
		} else {
			throw new SNSServiceException("파일 복호화시에 오류가 발생했습니다. (" + responseEntity.getStatusCode() + ")");
		}
	}
	
	/**
	 * 커스터마이징 영역
	 * 파일변환 처리 확장자
	 * @param ext
	 * @param isEncrypt
	 * @return boolean
	 */
	public boolean isConvertExt(String ext, boolean isEncrypt) {
		String extension = ext.toLowerCase();
		if( extension.equals("doc")
				|| extension.equals("docx")
				|| extension.equals("xls")
				|| extension.equals("xlsx")
				|| extension.equals("ppt")
				|| extension.equals("pptx")
				|| extension.equals("pdf")
				|| extension.equals("hwp")
				|| extension.equals("dnc") ) {
			return true;
		} else if( extension.equals("gif")
				|| extension.equals("png")
				|| extension.equals("jpg")
				|| extension.equals("jpeg")
				|| extension.equals("bmp") ) {
			return false;
		} else if ( extension.equals("txt")
				|| extension.equals("log") ) {
			return false;
		} else if( extension.equals("htm")
				|| extension.equals("html") ) {
			return false;
		} else {
			if(isEncrypt) {
				throw new SNSServiceException("지원하지 않는 파일입니다.");
			}
			return false;
		}
	}
	
	/**
	 * 커스터마이징 영역
	 * @param sessionUserId
	 * @param fileId
	 * @param contextPath
	 * @return Map<String, String>
	 */
	public Map<String, String> getViewUrl(String sessionUserId, long fileId, String contextPath) {
		FeedFileVo fileVo = feedFileService.getFeedFileById(fileId);
		String filePath = COMMON_FILE_REPOSITORY_PATH + fileVo.getFileUrl() + File.separator + fileVo.getFileSaveName();
		File saveFile = new File(filePath);
		
		if(!saveFile.exists()) {
			throw new SNSFileNotFoundException("SNS 저장소에 존재하지 않는 파일입니다.");
		}
		
		Map<String, String> retMap = new HashMap<String, String>();
		
		// 파일 암호화 여부 체크
		boolean isEncrypt = FileUtil.isEncryptFile(saveFile);
		String decryptServerPath = null;
		if(isEncrypt) {
			MemberVo member = memberService.getMemberBySynckey("ko", sessionUserId);
			// 파일 복호화
			decryptServerPath = getDecryptFilePath(sessionUserId, member.getCompanyId(), filePath);
		}

		// 파일 확장자 체크
		boolean isConvert = isConvertExt(fileVo.getFileExt(), isEncrypt);
		boolean isApplySize = false;

		if(saveFile.length() < (10 * 1024 * 1024)) { // 10MB 보다 작으면
			isApplySize = true;
		}
		
		if(isApplySize && isConvert && isEncrypt) {	// 10MB 이내이고, 변환가능한 확장자이고, 암호화인 파일
			File decryptFile = new File(decryptServerPath);
			
			if(!decryptFile.exists()) {
				throw new SNSServiceException("복호화 파일이 존재하지 않습니다.");
			}
			
			// 복호화한 파일의 경로를 암호화하여 변환 서버로 요청한다.
			String encryptFilePath = DesUtil.encrypt(GroupWareService.fileDownDecryptKey, decryptServerPath);
			retMap = convertImageView(contextPath, "/internal/sns/common/other/files/" + encryptFilePath);
			retMap.put("convertYn", "Y");
			
		} else if(isApplySize && isConvert && !isEncrypt) {	// 10MB 이내이고, 변환가능한 확장자이고, 평문인 파일
			// 평문 파일로 변환 요청
			retMap = convertImageView(contextPath, "/internal/sns/common/files/" + String.valueOf(fileId));
			retMap.put("convertYn", "Y");
		} else {	// 10MB 이상이거나, 변환 불가능한 확장자이고 평문인 파일
			retMap.put("convertYn", "N");
			retMap.put("imgKey", "");
			retMap.put("htmlUrl", "http://" + homeDomain + contextPath + "/common/files/"+fileId);
		}
		
		return retMap;
	}
	
	/**
	 * 이미지 문서 변환 요청
	 * 커스터마이징 영역
	 * @param contextPath
	 * @param apiUrl
	 * @return Map<String, String>
	 */
	@SuppressWarnings("unchecked")
	public Map<String, String> convertImageView(String contextPath, String apiUrl) {
		String imgKey = new StringBuffer("GROUPWARE").append(System.nanoTime()).append(new Random().nextInt(999)).toString();
		String reqPath = "http://" + homeDomain + contextPath + apiUrl;
		LOG.info("\n\nimgViewUrl :" + imgViewUrl);
		LOG.info("imgKey :" + imgKey);
		LOG.info("reqPath :" + reqPath);
		
		StringBuffer strBuff = new StringBuffer();
        strBuff.append(" { ");
        strBuff.append(" 	\"req_path\": \"" + reqPath + "\", ");
        strBuff.append(" 	\"ckey\": \"" + imgKey + "\", ");
        strBuff.append(" 	\"force\": \"" + force + "\", ");
        strBuff.append(" 	\"sync\": \"" + sync + "\", ");
        strBuff.append(" 	\"cvt_opt\": \"" + cvtOption + "\" ");
        strBuff.append(" } ");
        
        LOG.info("req json str :" + strBuff.toString());
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String, String> paramMap;
		try {
			paramMap = mapper.readValue(strBuff.toString(), HashMap.class);
		} catch (IOException e) {
			throw new SNSServiceException("", e);
		}
		
		// 문서변환서버로 요청
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> responseEntity = restTemplate.postForEntity(imgViewUrl, paramMap, String.class);
	    String responseBody =  responseEntity.getBody();
	    LOG.info("rest status :" + responseEntity.getStatusCode());
	    LOG.info(responseBody);
	    
		Map<String, String> retMap = new HashMap<String, String>();
		
		HashMap<String, Object> jsonObject = null;
		try {
			jsonObject = new ObjectMapper().readValue(responseBody, HashMap.class);
		} catch (IOException e) {
			throw new SNSServiceException("파일 변환시 오류가 발생했습니다. (" + jsonObject + ")");
		}
		
		if(jsonObject.get("status") != null && jsonObject.get("status").toString().equals("2")) {
			
			Map<String, Object> statusMap = null;
			int status = -1;
			int to_html = -1;
			int num_img_pages = -1;
			int n = 0;
			while(true) {
				LOG.debug("DOC convert try count : " + (++n));
				statusMap = getConvertImageStatus(imgKey);
				
				status = (Integer) statusMap.get("status");
				to_html = (Integer) statusMap.get("to_html");
				num_img_pages = (Integer) statusMap.get("num_img_pages");
				
				if(num_img_pages > 3
						|| to_html == 2
						|| status == 2) {
					break;
				}

				try {
					Thread.sleep(500);
				} catch (InterruptedException e) {
					throw new SNSServiceException("Thread sleep error.");
				}
				
			}
			
			retMap.put("imgKey", imgKey);
			retMap.put("htmlUrl", new StringBuffer(imgViewUrlProxy).append(imgKey).append("/html/").append(imgKey).append(".mobile.xhtml").toString() );
		} else {
			throw new SNSServiceException("파일 변환시 오류가 발생했습니다.");
		}
		
		return retMap;
	}
	
	/**
	 * 이미지 문서 변환 요청 상태
	 * 커스터마이징 영역
	 * @param imgKey
	 * @return Map<String, Object>
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> getConvertImageStatus(String imgKey) {

		String reqUrl = new StringBuffer(imgViewUrl).append(imgKey).toString();
		LOG.info("\n\nreqUrl :" + reqUrl);
		LOG.info("imgKey :" + imgKey);
		
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(reqUrl, String.class);
		String responseBody =  responseEntity.getBody();
		LOG.info("rest status :" + responseEntity.getStatusCode());
		LOG.info("ret body :" + responseBody);

		Map<String, Object> jsonObject = null;
		try {
			jsonObject = new ObjectMapper().readValue(responseBody, HashMap.class);
		} catch (IOException e) {
			throw new SNSServiceException("파일 변환상태 요청시 오류가 발생했습니다. (" + responseBody + ")");
		}
		
		if(jsonObject.get("status") != null) {
			int status = (Integer) jsonObject.get("status");
			if(status == 0 || status == 1 || status == 2) {	// 정상
				return jsonObject;
			} else if(status == 3) {
				throw new SNSServiceException("파일 변환상태 요청 결과 [실패]가 발생했습니다.");
			} else if(status == 4) {
				throw new SNSServiceException("파일 변환상태 요청 결과 [취소]가 발생했습니다.");
			} else {
				throw new SNSServiceException("파일 변환상태 요청 결과 [알수없는상태]가 발생했습니다.");
			}
		} else {
			throw new SNSServiceException("파일 변환상태 요청시 오류가 발생했습니다.");
		}
	}
	
	/**
	 * 커스터마이징 영역
	 * @param userId
	 * @param secure
	 * @return String
	 */
	public String getCommonGnbData(String userId, boolean secure) {
		
		String ret = "";
		boolean b = false;
		String gnbUrls = gnbUrl+"&userId="+userId+"&isHttps="+String.valueOf(secure);
		StopWatch stopWatch = new StopWatch();
		
		for(int i=0; i<3; i++) {
			try {
				stopWatch.reset();
				stopWatch.start();
				
				RestTemplate restTemplate = new RestTemplate();
				ResponseEntity<String> responseEntity = restTemplate.getForEntity(gnbUrls, String.class);
				String responseBody =  responseEntity.getBody();
				
				stopWatch.stop();

				LOG.info("EagleOffice neo GNB Try url : " + gnbUrls);
				LOG.info("EagleOffice neo GNB Loading >>>>> Retry [" +(i+1)+ "] " + stopWatch.getTime() + " ms");

			    DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
			    DocumentBuilder documentBuilder = null;
				Document xmlDoc = null;
				
				documentBuilder = documentBuilderFactory.newDocumentBuilder();
				xmlDoc = documentBuilder.parse(new InputSource(new ByteArrayInputStream(responseBody.getBytes("utf-8"))));

				XPathFactory xPathfactory = XPathFactory.newInstance();
				XPath xpath = xPathfactory.newXPath();
				XPathExpression expr = xpath.compile("/responseData/gnb");
				
				NodeList nodeList = (NodeList) expr.evaluate(xmlDoc, XPathConstants.NODESET);
				ret = nodeList.item(0).getTextContent();
				b = true;
			} catch(Exception e) {
				b = false;
				LOG.error("EagleOffice neo GNB ("+(i+1)+")", e);
				ret = e.getMessage();
				try { Thread.sleep(100); } catch (InterruptedException e1) {}
			}
			
			if(b) {
				break;
			}
		}
		
		return ret;
	}

}