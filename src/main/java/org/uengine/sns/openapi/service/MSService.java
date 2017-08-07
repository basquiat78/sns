package org.uengine.sns.openapi.service;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.federation.service.FederationService;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * MSService
 * <pre>
 * 	<p>MS와 관련된 연동시</p>
 * 	<p>커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("msService")
public class MSService {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MSService.class);
	
	@Autowired
	FederationService federationService;
	
	@Autowired
	MemberService memberService;
	
	private final int dummyjsonsize = 3;
	
	/**
	 * @param restUrl
	 * @param param
	 * @return String
	 */
	public String getMS_Outlook_ADDRESS(String restUrl, MultiValueMap<String, Object> param) {
		
		System.out.println(param);
		String[] str = {"25","blackbean18","-ysukim","0307hy","11061401a"};
		Map<Object, Object> sc = new HashMap<Object, Object>();
		sc.put("syncKeyList", str);
		SearchContextVo scv = new SearchContextVo(sc);
		List<MemberVo> mlist = memberService.getMemberList(scv);
		JSONArray ja2 = new JSONArray(mlist);
		
		return ja2.toString();
	}
	
	/**
	 * @param restUrl
	 * @return String
	 */
	public String getMS_LYNC_ADDRESS(String restUrl) {
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(restUrl, String.class);
		String jo = responseEntity.getBody();
		
		JSONObject jsonObj = new JSONObject(jo);
		JSONArray dummy_ja = (JSONArray) jsonObj.get("contactList");
		
		/*
		 * select with original data
		 */
		if(dummy_ja.length() == 0) {
			for(int i=0; i<= dummyjsonsize; i++) {
				JSONObject dj = new JSONObject();
				dj.put("userimg", "img" + i);
				dj.put("teamname", "teamname" + i);
				dj.put("username", "username" + i);
				dj.put("useremail", "useremail" + i);
				dummy_ja.put(dj);
			}
		}
		
		JSONArray ja = new JSONArray();
		for(int i=0; i<dummy_ja.length(); i++) {
			MemberVo memberVo = new MemberVo();
			memberVo.setMemberPicUrl(dummy_ja.getJSONObject(i).get("userimg").toString());
			memberVo.setCompanyId(dummy_ja.getJSONObject(i).get("teamname").toString());
			memberVo.setMemberName(dummy_ja.getJSONObject(i).get("username").toString());
			memberVo.setEmailAddr(dummy_ja.getJSONObject(i).get("useremail").toString());
			JSONObject jsonObject = new JSONObject(memberVo);
			ja.put(jsonObject);
		}
		
		/*
		 * select with syncKey
		 */
		String[] str = {"kmj0429","15063045","4","5","6","7"};
		Map<Object, Object> sc = new HashMap<Object, Object>();
		sc.put("syncKeyList", str);
		SearchContextVo scv = new SearchContextVo(sc);
		List<MemberVo> memberList = memberService.getMemberList(scv);
		JSONArray ja2 = new JSONArray(memberList);
		
		return ja2.toString();
	}

}