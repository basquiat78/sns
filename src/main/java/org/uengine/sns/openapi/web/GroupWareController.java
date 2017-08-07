package org.uengine.sns.openapi.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.federation.service.FederationService;
import org.uengine.sns.openapi.service.GroupWareService;
import org.uengine.sns.openapi.vo.GroupWareApprovalVo;
import org.uengine.sns.openapi.vo.GroupWareContactVo;
import org.uengine.sns.openapi.vo.GroupWareImageViewlVo;

/**
 * 
 * GroupWareController
 * <pre>
 * 	<p>그룹웨어 관련 부분은 </p>
 *  <p>프로젝트 시점에 커스터마이징 영역이다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class GroupWareController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(GroupWareController.class);
	
	@Autowired
	FederationService federationService;
	
	@Autowired
	GroupWareService groupWareService;
	
	/**
	 * 전자결재 승인
	 * @param groupWareApprovalVo
	 * @return Object
	 */
	@RequestMapping(value = "/openapi/groupware/approve", method=RequestMethod.POST)
	public @ResponseBody Object groupWareApproval(@RequestBody GroupWareApprovalVo groupWareApprovalVo) {
		return groupWareService.getGroupWareSubmitApprove(groupWareApprovalVo);
	}
	
	/**
	 * 전자결재 반려 처리
	 * @param groupWareApprovalVo
	 * @return Object
	 */
	@RequestMapping(value = "/openapi/groupware/reject", method=RequestMethod.POST)
	public @ResponseBody Object groupWareReject(@RequestBody GroupWareApprovalVo groupWareApprovalVo) {
		return groupWareService.getGroupWareSubmitReject(groupWareApprovalVo);
	}

	/**
	 * GroupWare 연락처 폴더 조회
	 * @param userId
	 * @return Object
	 * @throws Exception
	 */
	@RequestMapping(value = "/openapi/groupware/contact/folders/{id}", method=RequestMethod.GET)
	public @ResponseBody Object goGroupWareContactFolder(@PathVariable("id") String userId) throws Exception {
		return groupWareService.getGroupWareContactFolder(userId);
	}
	
	/**
	 * GroupWare 연락처 목록 조회
	 * @param groupWareApprovalVo
	 * @return Object
	 * @throws Exception
	 */
	@RequestMapping(value = "/openapi/groupware/contact/list", method=RequestMethod.POST)
	public @ResponseBody Object goGroupWareContactList(@RequestBody GroupWareContactVo groupWareApprovalVo) throws Exception {
		return groupWareService.getGroupWareContactList(groupWareApprovalVo);
	}
	
	/**
	 * GroupWare Lync 연락처 조회
	 * @param userId
	 * @return Object
	 * @throws Exception
	 */
	@RequestMapping(value = "/openapi/groupware/contact/lync/{id}", method=RequestMethod.GET)
	public @ResponseBody Object goEgOfficeContactLync(@PathVariable("id") String userId) throws Exception {
		return groupWareService.getGroupWareContactLyncList(userId);
	}
	
	/**
	 * 이미지 문서 변환 요청
	 * @param groupWareImageViewlVo
	 * @param request
	 * @return Map<String, String>
	 */
	@RequestMapping(value = "/openapi/groupware/convert/images", method=RequestMethod.POST)
	public @ResponseBody Map<String, String> goGroupWareImageView(@RequestBody GroupWareImageViewlVo groupWareImageViewlVo, HttpServletRequest request) {
		groupWareImageViewlVo.setScheme(request.getScheme());
		groupWareImageViewlVo.setPort(request.getServerPort());
		groupWareImageViewlVo.setContextPath(request.getContextPath());
		return groupWareService.getViewUrl((String) request.getAttribute("userId"), Long.parseLong(groupWareImageViewlVo.getFileId()), request.getContextPath());
	}
	
	/** 이미지 문서 변환 요청 상태
	 * @param imgKey
	 * @return
	 */
	@RequestMapping(value = "/openapi/groupware/convert/images/status/{imgKey}", method=RequestMethod.GET)
	public @ResponseBody Map<String, Object> goConvertImageStatus(@PathVariable("imgKey") String imgKey) {
		return groupWareService.getConvertImageStatus(imgKey);
	}

}