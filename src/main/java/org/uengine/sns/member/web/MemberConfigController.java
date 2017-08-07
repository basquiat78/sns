package org.uengine.sns.member.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.uengine.sns.common.ExceptionController;

/**
 * 
 * MemberConfigController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class MemberConfigController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MemberConfigController.class);
	
	/**
	 * 기본설정
	 * @param memberId
	 * @return String
	 */
	@RequestMapping(value = "/members/cfgs/{id}", method = RequestMethod.GET)
    public String memberConfig(@PathVariable("id") long memberId) {
		return "sns/config/MemberConfig";
	}

}