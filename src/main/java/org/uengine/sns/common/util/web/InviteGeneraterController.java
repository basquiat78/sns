package org.uengine.sns.common.util.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.util.service.InviteGeneraterService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * InviteGeneraterController
 * <pre>
 * 외부사용자 초대 관련 컨트롤러
 * 해당 컨트롤러는 외부 사용자 이메일 요청시 입력 받은 이메일에 대한 INVITE_AUTH_KEY를 생성하고
 * AUTH_HOST 정보를 MemberVo에 세팅해서 TB_SW_MEMBER테이블에 인서트 한 이후
 * memberId와 이메일, 생성된 INVITE_AUTH_KEY로 초대장 메일을 보내기 위한 요청을 받는 컨트롤러이다.
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * 
 */
@Controller
public class InviteGeneraterController extends ExceptionController {
	
	@Autowired
	InviteGeneraterService inviteGeneraterService;
	
	@RequestMapping(value = "/invite", method = RequestMethod.GET)
	public @ResponseBody MemberVo inviteGenerate(@RequestBody MemberVo inviteMemberVo) {
		return inviteGeneraterService.inviteGenerate(inviteMemberVo);
	}

}