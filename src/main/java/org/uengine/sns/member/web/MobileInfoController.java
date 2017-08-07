package org.uengine.sns.member.web;

import java.util.List;

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
import org.uengine.sns.member.service.MobileInfoService;
import org.uengine.sns.member.vo.MobileInfoVo;

/**
 * 
 * "/members/mobileinfos"
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class MobileInfoController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MobileInfoController.class);
	
	@Autowired
	MobileInfoService mobileInfoService;
	
	/**
	 * select MobileInfoVo by regMemberId
	 * @param memberId
	 * @return List<MobileInfoVo>
	 */
	@RequestMapping(value = "/members/mobileinfos/{id}", method = RequestMethod.GET)
    public @ResponseBody List<MobileInfoVo> findById(@PathVariable("id") long memberId) {
		return mobileInfoService.getMobileInfoVoById(memberId);
	}
	
	/**
	 * insert new MobileInfo Info
	 * @param mobileInfoVo
	 * @return MobileInfoVo
	 */
	@RequestMapping(value = "/members/mobileinfos", method = RequestMethod.POST)
	public @ResponseBody MobileInfoVo add(@RequestBody MobileInfoVo mobileInfoVo) {
		return mobileInfoService.insertMobileInfo(mobileInfoVo);
	}
	
	/**
	 * update MobileInfo Info
	 * @param mobileInfoVo
	 * @return MobileInfoVo
	 */
	@RequestMapping(value = "/members/mobileinfos", method = RequestMethod.PUT)
	public @ResponseBody MobileInfoVo upd(@RequestBody MobileInfoVo mobileInfoVo) {
		return mobileInfoService.updateMobileInfo(mobileInfoVo);
	}
	
	/**
	 * delete MobileInfo Info
	 * @param mobileInfoVo
	 * @return MobileInfoVo
	 */
	@RequestMapping(value = "/members/mobileinfos", method = RequestMethod.DELETE)
	public @ResponseBody MobileInfoVo delete(@RequestBody MobileInfoVo mobileInfoVo) {
		return mobileInfoService.deleteMobileInfo(mobileInfoVo);
	}

}