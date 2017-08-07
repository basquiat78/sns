package org.uengine.sns.noticeconfig.web;

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
import org.uengine.sns.common.Exception.SNSRunTimeException;
import org.uengine.sns.noticeconfig.service.NoticeConfigService;
import org.uengine.sns.noticeconfig.vo.NoticeConfigVo;

/**
 * 
 * NoticeConfigController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class NoticeConfigController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(NoticeConfigController.class);
	
	@Autowired
	NoticeConfigService noticeConfigService;
	
	/**
	 * 멤버별 알림설정 정보 취득
	 * @param memberId
	 * @return NoticeConfigVo
	 */
	@RequestMapping(value = "/notices/config/{id}", method = RequestMethod.GET)
	public @ResponseBody NoticeConfigVo get(@PathVariable("id") long memberId) {
		return noticeConfigService.getNoticeConfigByMemberId(memberId);
	}
	
	/**
	 * 알림설정 저장
	 * @param noticeConfigVo
	 * @return NoticeConfigVo
	 */
	@RequestMapping(value = "/notices/config", method = RequestMethod.POST)
	public @ResponseBody NoticeConfigVo addNoticeConfig(@RequestBody NoticeConfigVo noticeConfigVo) {
		if(noticeConfigVo == null || noticeConfigVo.getMemberId() == 0) {
			throw new SNSRunTimeException("저장할 멤버 정보가 없습니다.");
		}
		noticeConfigService.deleteNoticeConfig(noticeConfigVo.getMemberId());
		return noticeConfigService.insertNoticeConfig(noticeConfigVo);
	}

}