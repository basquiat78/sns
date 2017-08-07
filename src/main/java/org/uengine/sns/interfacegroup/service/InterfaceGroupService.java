package org.uengine.sns.interfacegroup.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.group.service.GroupFollowerService;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.interfacegroup.mapper.InterfaceGroupMapper;
import org.uengine.sns.interfacegroup.vo.InterfaceGroupFollowerVo;
import org.uengine.sns.interfacegroup.vo.InterfaceGroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * InterfaceGroupService
 * <pre>
 * 	interfaceGroup에 대한 서비스를 담당한다.
 * 	이 서비스틑 그룹웨어와 sns의 그룹 인터페이스를 위해서 
 *  이 부분은 해당 회사의 조직에 맞게 커스터마이징 되어야 한다.
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("interfaceGroupService")
public class InterfaceGroupService {
	
	private static final Logger LOG = LoggerFactory.getLogger(InterfaceGroupService.class);

	@Autowired
	MemberService memberService;
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	GroupFollowerService groupFollowerService;
	
	@Autowired
	InterfaceGroupMapper interfaceGroupMapper;
	
	/**
	 * 그룹웨어 그룹 포팅
	 */
	public void pottingInterfaceGroupToSNSGroup(String companyId) {
		
		/*
		 * 임직원그룹 포팅
		 */
		pottingEmployeeGroupToSNSGroup(companyId);
		
		/*
		 * 전문가그룹 포팅
		 */
		pottingExpertGroupToSNSGroup();

	}

	/**
	 * 임직원 그룹 포팅
	 * @param companyId
	 */
	public void pottingEmployeeGroupToSNSGroup(String companyId) {
		LOG.debug("임직원 그룹 생성");
		
		List<InterfaceGroupVo> employeeGroupList = getEmployeeGroupList(companyId);
		for(InterfaceGroupVo interfaceGroup : employeeGroupList) {
			// 그룹아이디가 null 이면 그룹 등록
			if(StringUtils.isEmpty(interfaceGroup.getSnsGroupId())) {
				GroupVo groupVo = new GroupVo();
				groupVo.setGroupType(SNSCodeMaster.GROUP_TYPE.EMPLOYEE.name());
				groupVo.setGroupName(interfaceGroup.getContentsName());
				groupVo.setMemberSyncKey(interfaceGroup.getRegUserId());
				groupVo.setIsHide(1);
				groupVo.setIsPublic(1);
				groupVo.setIsAutoJoin(1);
				
				groupService.insertGroup(groupVo);
				
				interfaceGroup.setSnsGroupId(groupVo.getGroupId()+"");
				updateEmployeeGroup(interfaceGroup);
			} else {
				// 그룹아이디가 null 이 아니면 멤버정보를 모두 삭제
				groupFollowerService.deleteGroupFollowerByGroupId(Long.parseLong(interfaceGroup.getSnsGroupId()));
			}
			
			// 등록자 이외의 해당 임직원그룹의 속한 멤버를 그룹 팔로워 리스트에 추가한다.
			List<InterfaceGroupFollowerVo> egfList = getEmployeeGroupFollowerList(Long.parseLong(interfaceGroup.getContentsId()));
			
			if(egfList != null) {
				for(InterfaceGroupFollowerVo ffVo : egfList) {
					GroupFollowerVo gfVo = new GroupFollowerVo();
					
					MemberVo gfMemberVo = memberService.getMemberBySynckey("ko", ffVo.getUserId());
					gfVo.setGroupId(Long.parseLong(interfaceGroup.getSnsGroupId()));
					gfVo.setMemberId(gfMemberVo.getMemberId());
					gfVo.setNewFeedCnt(0);
					gfVo.setIsGroupMng(0);
					gfVo.setJoinStatus(SNSCodeMaster.GROUP_JOIN_STATUS.COMPLETE.name());
					
					groupFollowerService.insertGroupFollower(gfVo);
				}
				
			}
		}
	}

	/**
	 * companyId에 해당하는 임직원 그룹 리스트 가져오기
	 * @param companyId
	 * @return List<InterfaceGroupVo>
	 */
	public List<InterfaceGroupVo> getEmployeeGroupList(String companyId) {
		return interfaceGroupMapper.selectEmployeeGroupList(companyId);
	}
	
	/**
	 * 콘텐츠아이디에 해당하는 임직원 그룹의 멤버 리스트 가져오기
	 * @param contentsId
	 * @return List<InterfaceGroupFollowerVo>
	 */
	public List<InterfaceGroupFollowerVo> getEmployeeGroupFollowerList(long contentsId) {
		return interfaceGroupMapper.selectEmployeeGroupFollowerList(contentsId);
	}
	
	/**
	 * 포팅이 끝나고 해당 임직원 그룹 테이블의 snsGroupId를 생성된 그룹 아이디로 업데이트한다.
	 * @param group
	 */
	public void updateEmployeeGroup(InterfaceGroupVo group) {
		interfaceGroupMapper.updateEmployeeGroup(group);
	}
	
	
	/**
	 * 전문가 그룹 포팅
	 */
	public void pottingExpertGroupToSNSGroup() {
		LOG.debug("전문가 그룹 생성");
		
		List<InterfaceGroupVo> expertGroupList = getExpertGroupList();
		for(InterfaceGroupVo interfaceGroup : expertGroupList) {
			// 그룹아이디가 null 이면 그룹 등록
			if(StringUtils.isEmpty(interfaceGroup.getSnsGroupId())) {
				GroupVo groupVo = new GroupVo();
				groupVo.setGroupType(SNSCodeMaster.GROUP_TYPE.EXPERT.name());
				groupVo.setGroupName(interfaceGroup.getContentsName());
				groupVo.setMemberSyncKey(interfaceGroup.getRegUserId());
				groupVo.setIsHide(1);
				groupVo.setIsPublic(1);
				groupVo.setIsAutoJoin(1);
				
				groupService.insertGroup(groupVo);
				
				interfaceGroup.setSnsGroupId(groupVo.getGroupId()+"");
				updateExpertGroup(interfaceGroup);
			} else {
				// 그룹아이디가 null 이 아니면 멤버정보를 모두 삭제
				groupFollowerService.deleteGroupFollowerByGroupId(Long.parseLong(interfaceGroup.getSnsGroupId()));
			}
			
			// 등록자 이외의 해당 임직원그룹의 속한 멤버를 그룹 팔로워 리스트에 추가한다.
			List<InterfaceGroupFollowerVo> egfList = null;
			if("3".equals(interfaceGroup.getContentsId()) ) {
				egfList= getExpertGroupFollowerListByCodetype3();
			} else if("6".equals(interfaceGroup.getContentsId()) ) {
				egfList= getExpertGroupFollowerListByCodetype6();
			} else if("9".equals(interfaceGroup.getContentsId()) ) {
				egfList= getExpertGroupFollowerListByCodetype9();
			} else if("15".equals(interfaceGroup.getContentsId()) ) {
				egfList= getExpertGroupFollowerListByCodetype15();
			} else if("19".equals(interfaceGroup.getContentsId()) ) {
				egfList= getExpertGroupFollowerListByCodetype19();
			} else if("21".equals(interfaceGroup.getContentsId()) ) {
				egfList= getExpertGroupFollowerListByCodetype21();
			}
			
			if(egfList != null) {
				for(InterfaceGroupFollowerVo ffVo : egfList) {
					GroupFollowerVo gfVo = new GroupFollowerVo();
					
					MemberVo gfMemberVo = memberService.getMemberBySynckey("ko",ffVo.getUserId());
					gfVo.setGroupId(Long.parseLong(interfaceGroup.getSnsGroupId()));
					gfVo.setMemberId(gfMemberVo.getMemberId());
					gfVo.setNewFeedCnt(0);
					gfVo.setIsGroupMng(0);
					gfVo.setJoinStatus(SNSCodeMaster.GROUP_JOIN_STATUS.COMPLETE.name());
					
					groupFollowerService.insertGroupFollower(gfVo);
				}
				
			}
		}
	}
	
	/**
	 * companyId 해당하는 전문가 그룹 리스트 가져오기
	 * @return List<InterfaceGroupVo>
	 */
	public List<InterfaceGroupVo> getExpertGroupList() {
		return interfaceGroupMapper.selectExpertGroupList();
	}
	
	/**
	 * 전문가/직무별 그룹의 멤버 리스트 가져오기
	 * @return List<InterfaceGroupFollowerVo>
	 */
	public List<InterfaceGroupFollowerVo> getExpertGroupFollowerListByCodetype3() {
		return interfaceGroupMapper.selectExpertGroupFollowerListByCodetype3();
	}

	/**
	 * 전문가/업무스킬별 그룹의 멤버 리스트 가져오기
	 * @return List<InterfaceGroupFollowerVo>
	 */
	public List<InterfaceGroupFollowerVo> getExpertGroupFollowerListByCodetype6() {
		return interfaceGroupMapper.selectExpertGroupFollowerListByCodetype6();
	}

	/**
	 * 전문가/프로젝트유형별 그룹의 멤버 리스트 가져오기
	 * @return List<InterfaceGroupFollowerVo>
	 */
	public List<InterfaceGroupFollowerVo> getExpertGroupFollowerListByCodetype9() {
		return interfaceGroupMapper.selectExpertGroupFollowerListByCodetype9();
	}

	/**
	 * 전문가/주제별 그룹의 멤버 리스트 가져오기
	 * @return List<InterfaceGroupFollowerVo>
	 */
	public List<InterfaceGroupFollowerVo> getExpertGroupFollowerListByCodetype15() {
		return interfaceGroupMapper.selectExpertGroupFollowerListByCodetype15();
	}

	/**
	 * 전문가/지역-해외 그룹의 멤버 리스트 가져오기
	 * @return List<InterfaceGroupFollowerVo>
	 */
	public List<InterfaceGroupFollowerVo> getExpertGroupFollowerListByCodetype19() {
		return interfaceGroupMapper.selectExpertGroupFollowerListByCodetype19();
	}

	/**
	 * 전문가/지역-국내 그룹의 멤버 리스트 가져오기
	 * @return List<InterfaceGroupFollowerVo>
	 */
	public List<InterfaceGroupFollowerVo> getExpertGroupFollowerListByCodetype21() {
		return interfaceGroupMapper.selectExpertGroupFollowerListByCodetype21();
	}
	
	/**
	 * 포팅이 끝나고 해당 전문가 그룹 콘텐츠 테이블의 snsGroupId를 생성된 그룹 아이디로 업데이트한다.
	 * @param group
	 */
	public void updateExpertGroup(InterfaceGroupVo group) {
		interfaceGroupMapper.updateExpertGroup(group);
	}

}