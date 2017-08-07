package org.uengine.sns.openapi.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.uengine.sns.openapi.vo.PushVo;

/**
 * 
 * PushService
 * <pre>
 * 	<p>모바일 연동을 위한 서비스로 </p>
 * 	<p>프로젝트시 커스터마이징이 요구된다.</p>
 * <p>msgType<br/>
 *		100:공지
 *		101:타인에의한그룹가입
 *		102:그룹에서 타인에 의해 탈퇴
 *		103:할일 일정 도래
 *		104:결재피드 등록
 *		105:내 피드에 댓글 등록
 * </p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("pushService")
public class PushService {
	
	private static final Logger LOG = LoggerFactory.getLogger(PushService.class);
	
	@Value("#{conf['mobile.pns.server.url']}")
	String pnsServerUrl;

	@Value("#{conf['mobile.pns.auth.key']}")
	String pnsAuthKey;

	/**
	 * 그룹웨어 사용자 아이디 목록 (구분자 : 파이프(|))
	 * 한글,영어,중국어 (구분자 : 파이프(|))
	 * @param targetIds
	 * @param msgType
	 * @param contents
	 * @return PushVo
	 */
	public PushVo pushPnsMessage(String targetIds, String msgType, String contents) {
		return pushPnsMessage(targetIds, msgType, contents, "");
	}
	
	/**
	 * 그룹웨어 사용자 아이디 목록 (구분자 : 파이프(|))
	 * 한글,영어,중국어 (구분자 : 파이프(|))
	 * 알림이 그룹이면 groupId, 피드면 feedId
	 * @param targetIds
	 * @param msgType
	 * @param contents
	 * @param appUri
	 * @return PushVo
	 */
	public PushVo pushPnsMessage(String targetIds, String msgType, String contents, String appUri) {
		
		PushVo pushVo = new PushVo();
		pushVo.setMemberId("uengine");
		pushVo.setTargetIds(targetIds);
		pushVo.setContents(contents);
		pushVo.setAlert(contents);
		pushVo.setMsgType(msgType);
		pushVo.setMsgLevel("2");
		pushVo.setPopupType("1");
		pushVo.setForce("N");
		pushVo.setAppUri(appUri);
		return pushPnsMessage(pushVo);
	}
	
	/**
	 * 커스터마이징 영역
	 * @param pushVo
	 * @return PushVo
	 */
	public PushVo pushPnsMessage(PushVo pushVo) {
		
		// 모바일 푸시 서비스
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.set("aKey", pnsAuthKey);
		
		MultiValueMap<String, Object> param = new LinkedMultiValueMap<String, Object>();
		
		param.add("memberId", pushVo.getMemberId());
		param.add("targetIds", pushVo.getTargetIds());
		param.add("msgLevel", pushVo.getMsgLevel());
		param.add("alert", pushVo.getAlert());
		param.add("data.msgType", pushVo.getMsgType());
		param.add("data.popupType", pushVo.getPopupType());
		param.add("data.force", pushVo.getForce());
		param.add("data.content", pushVo.getContents());
		param.add("data.appUri", pushVo.getAppUri());
		
		PushVo retVo = null;
		try {
			HttpEntity<?> httpEntity = new HttpEntity<Object>(param, requestHeaders);
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<PushVo> responseEntity = restTemplate.exchange(pnsServerUrl, HttpMethod.POST, httpEntity, PushVo.class);
			retVo = responseEntity.getBody();
		} catch(Exception e) {
			LOG.error("", e);
		} finally {
			// 커스터마이징 영역
			retVo = pushVo;
		}
		
		return retVo;
		
	}

}