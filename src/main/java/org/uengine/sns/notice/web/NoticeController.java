package org.uengine.sns.notice.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
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
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.notice.service.NoticeService;
import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.noticeconfig.web.NoticeConfigController;

/**
 * 
 * NoticeController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class NoticeController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(NoticeConfigController.class);
	
	@Autowired
	NoticeService noticeService;
	
	/**
	 * GNB에서 사용하는 개인 최신 현황
	 * @param userId
	 * @return List<NoticeVo>
	 */
	@RequestMapping(value = "/notices/members/synckey/{userId:.+}", method = RequestMethod.GET)
	public @ResponseBody List<NoticeVo> noticeSynckeyMemberList(@PathVariable("userId") String userId) {
		return noticeService.getMemberSynckeyRecentActList(userId);
	}
	
	/**
	 * select Notice List by searchKey
	 * @param userId
	 * @return List<NoticeVo>
	 */
	@RequestMapping(value = "/notices", method = RequestMethod.GET)
	public @ResponseBody List<NoticeVo> findAll(@RequestParam Map<Object, Object> param) {
		SearchContextVo scv = new SearchContextVo(param);
		return noticeService.getNoticeList(scv);
	}
	
	/**
	 * 멤버별 알림 리스트
	 * @param memberId
	 * @return List<NoticeVo>
	 */
	@RequestMapping(value = "/notices/{id}", method = RequestMethod.GET)
    public @ResponseBody List<NoticeVo> findById(@PathVariable("id") long memberId) {
		return noticeService.getNoticeById(memberId);
	}
	
	/**
	 * @param userId
	 * @return List<NoticeVo>
	 */
	@RequestMapping(value = "/notices/synckey/{userId:.+}", method = RequestMethod.GET)
    public @ResponseBody List<NoticeVo> findBySynckey(@PathVariable("userId") String userId) {
		return noticeService.getNoticeBySynckey(userId);
	}
	
	/**
	 * 읽지 않은 알림 카운트
	 * @param memberId
	 * @return NoticeVo
	 */
	@RequestMapping(value = "/notices/cnt/{id}", method = RequestMethod.GET)
    public @ResponseBody NoticeVo noticeCnt(@PathVariable("id") long memberId) {
		return noticeService.getNoticeCntById(memberId);
	}

	/**
	 * 읽지 않은 알림 모두 읽음 처리
	 * @param memberId
	 * @return int
	 */
	@RequestMapping(value = "/notices/cnt/{id}", method = RequestMethod.PUT)
    public @ResponseBody int initNoticeCnt(@PathVariable("id") long memberId) {
		noticeService.updateNoticeRead(1, memberId);
		return 1;
	}

	/**
	 * 읽지 않은 알림 모두 읽음 처리
	 * @param userId
	 * @return int
	 */
	@RequestMapping(value = "/notices/cnt/synckey/{userId:.+}", method = RequestMethod.PUT)
    public @ResponseBody int initNoticeCntByUserId(@PathVariable("userId") String userId) {
		noticeService.updateNoticeRead(1, userId);
		return 1;
	}
	
	/**
	 * 화면 로딩시 등록된 timestamp를 기준으로 새로 등록된 피드 정보를 가져온다.
	 * @param regDttm
	 * @param request
	 * @return Map<Object, Object>
	 */
	@RequestMapping(value = "/notices/regdttm/{regDttm}", method = RequestMethod.GET)
    public @ResponseBody Map<Object, Object> noticeByRegDttm(@PathVariable("regDttm") long regDttm, HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		long memberId = (Long) session.getAttribute("memberId");
		return noticeService.getNoticeByRegDttm(HttpUtil.getLocaleString(request), memberId, regDttm);
	}
	
	/**
	 * 읽지 않은 알림 카운트 (그룹웨어 user_id) with request
	 * @param request
	 * @return NoticeVo
	 */
	@RequestMapping(value = "/notices/cnt/requestuserid" , method = RequestMethod.GET)
    public @ResponseBody NoticeVo noticeCntByRequestuserId(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		long memberId = (Long) session.getAttribute("memberId");
		return noticeService.getNoticeCntById(memberId);
	}

	/**
	 * 읽지 않은 알림 카운트 (그룹웨어 user_id)
	 * @param userId
	 * @return NoticeVo
	 */
	@RequestMapping(value = "/notices/cnt/synckey/{userId:.+}", method = RequestMethod.GET)
    public @ResponseBody NoticeVo noticeCntByuserId(@PathVariable("userId") String userId) {
		return noticeService.getNoticeCntByUserId(userId);
	}
	
	/**
	 * @param noticeVo
	 * @return NoticeVo
	 */
	@RequestMapping(value = "/notices", method = RequestMethod.POST)
	public @ResponseBody NoticeVo addNotice(@RequestBody NoticeVo noticeVo) {
		return noticeService.insertNotice(noticeVo);
	}
	
	/**
	 * 알림 삭제
	 * @param noticeId
	 */
	@RequestMapping(value = "/notices/{id}", method = RequestMethod.DELETE)
	public void deleteNotice(@PathVariable("id") long noticeId) {
		noticeService.deleteNotice(noticeId);
	}
	
	
	/**
	 * 전체 알람 목록취득
	 * @param param
	 * @return List<NoticeVo>
	 */
	@RequestMapping(value = "/notices/toatal", method = RequestMethod.GET)
	public @ResponseBody List<NoticeVo> goTotalNoticeListBySynckey(@RequestParam Map<Object, Object> param) {
		
		NoticeVo noticeVo = new NoticeVo();
		
		try {
		    BeanUtils.populate(noticeVo, param);
		} 
		catch (Throwable e) {
			throw new NotAcceptableException(e.getMessage());
		}
		
		return noticeService.getTotalNoticeListBySynckey(noticeVo);
	}
	
	/**
	 * 전체 알람 목록취득
	 * @param noticeVo
	 * @return List<NoticeVo>
	 */
	@RequestMapping(value = "/notices/toatal", method = RequestMethod.POST)
	public @ResponseBody List<NoticeVo> goTotalNoticeListBySynckeyPOST(@RequestBody NoticeVo noticeVo) {
		return noticeService.getTotalNoticeListBySynckey(noticeVo);
	}
	
	/**
	 * noti user 알람 카운트
	 * @param userId
	 * @return int
	 */
	@RequestMapping(value = "/notices/users/alarms/count/{userId:.+}", method = RequestMethod.GET)
	public @ResponseBody int goNoticeUserByDateCount(@PathVariable("userId") String userId) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String noticeDateStr = sdf.format(new Date(System.currentTimeMillis() - (30 * 1000)));
		NoticeVo noticeVo = new NoticeVo();
		noticeVo.setNoticeDateStr(noticeDateStr);
		noticeVo.setSyncKey(userId);
		return noticeService.getNoticeUsersByDateCount(noticeVo);
	}

}