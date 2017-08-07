package org.uengine.sns.common.util.service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.member.mapper.MemberMapper;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * InviteGeneraterService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("inviteGeneraterService")
public class InviteGeneraterService {
	
	@Autowired
	MemberMapper memberMapper;
	
	/**
	 * insert inviteMemberVo info
	 * @param inviteMemberVo
	 * @return MemberVo
	 */
	public MemberVo inviteGenerate(MemberVo inviteMemberVo) {
		
		/**
		 * 해당 이메일로 존재 유무를 체크한다.
		 * 그룹웨어와의 연동은 협의에 의해 api를 제공받아야 한다.
		 */
		String inviteEmail = inviteMemberVo.getEmailAddr();
		
		Map<Object, Object> m = new HashMap<Object, Object>();
		m.put("emailAddr", inviteEmail);
		SearchContextVo scv = new SearchContextVo(m);
		
		List<MemberVo> memberList = memberMapper.selectMemberList(scv);
		
		int checked = memberList.size();
		/**
		 * 그룹웨어에서 이메일주소를 체크하는걸로 바꾼다.
		 * 체크이후 존재한다면 null을 리턴한다.
		 * 이 부분은 해당 컨트롤/해당 서비스와 관련해서 리턴하는 값을 달라질 수있다. 
		 */
		if(checked > 0) {
			return memberList.get(0);
		}
		
		/**
		 * 위에서 만일 존재하지 않는 외부 이메일이라면 
		 * 유니크한 초대 인증 키를 생성한다. 
		 */
		String inviteAuthKey = UUID.randomUUID().toString();
		
		/**
		 * 넘겨받은 이메일로 기본적인 멤버의 정보를 설정하고 인서트한 이후
		 * 넘겨받은 memberVo를 리턴한다.
		 */
		inviteMemberVo.setMemberName(inviteEmail.split("[@._]")[0]);
		inviteMemberVo.setInviteAuthKey(inviteAuthKey);
		inviteMemberVo.setAuthHost(SNSCodeMaster.AUTH_HOST_TYPE.EXTERNAL.toString());
		
		Calendar calendar = Calendar.getInstance();
		Date date = new Date();
		calendar.setTime(date);
		String imsikey = calendar.getTimeInMillis() + "";
		inviteMemberVo.setSyncKey(imsikey);
		
		memberMapper.insertMember(inviteMemberVo);
		
		/**
		* 인서트 하고 리턴받은 객체를 통해 외부 초대 발송 이메일을 보내는 로직이 추후 붙어야 한다.
		* 그 이후 해당 메소드가 반환하는 객체가 외부 초대 객체인지 Result에 의한 성공/실패에 대한 반환값을 보내야 할지는 외부 발송 이메일 관련 로직이 붙은 이후로..
		*/
		
		return inviteMemberVo;
		
	}

}