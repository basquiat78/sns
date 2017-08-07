package org.uengine.sns.feed.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.federation.service.FederationService;
import org.uengine.sns.feed.FeedRestful;
import org.uengine.sns.feed.mapper.FollowerMapper;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.FollowerInfoVo;
import org.uengine.sns.feed.vo.FollowerVo;
import org.uengine.sns.group.service.GroupFollowerService;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.tenant.mapper.UserTenantMappingMapper;
import org.uengine.sns.tenant.service.TenantService;
import org.uengine.sns.tenant.vo.TenantVo;
import org.uengine.sns.tenant.vo.UserTenantMappingVo;

/**
 * 
 * FollowerService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("followerService")
public class FollowerService {
	
	private static final Logger LOG = LoggerFactory.getLogger(FollowerService.class);

	@Autowired
	FollowerMapper followerMapper;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	TenantService tenantService; 
	
	@Autowired
	FederationService federationService;
	
	@Autowired
	GroupFollowerService groupFollowerService;
	
	@Autowired
	UserTenantMappingMapper userTenantMappingMapper;

	/**
	 * FOLLOWER 리스트
	 * @param scv
	 * @return List<FollowerVo>
	 */
	public List<FollowerVo> getFollowerList(SearchContextVo scv) {
		List<FollowerVo> list = followerMapper.selectFollowerList(scv);
		return list;
	}
	
	/**
	 * @param pramMap
	 * @return List<FollowerVo>
	 */
	public List<FollowerVo> getFollowerDataList(Map<String, String> pramMap) {
		List<FollowerVo> list = followerMapper.selectFollowerDataList(pramMap);
		return list;
	}
	
	/**
	 * @param feedId
	 * @return List<FollowerVo>
	 */
	public List<FollowerVo> getFeedFollower(long feedId) {
		List<FollowerVo> list = followerMapper.selectFeedFollower(feedId);
		return list;
	}

	/**
	 * 팔로워 목록에서 그룹인 경우 MemberId 목록으로, 멤버인 경우 MemberId 로 이어붙인다.
	 * true 면 중복을 제거한 목록을 제공하고, 그렇지 않으면 전체 목록을 제공한다.
	 * @param feedId
	 * @param isRemoveDup
	 * @return List<String>
	 */
	public List<String> getFeedFollowerMemberIdList(String lang, long feedId, boolean isRemoveDup) {
		List<FollowerVo> followersList = followerMapper.selectFeedFollower(feedId);

		List<String> list = new ArrayList<String>();
		for(FollowerVo follower : followersList) {
			if(SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString().equals(follower.getFollowerType())) {
				list.add(String.valueOf(follower.getFollowerId()));
				
			} else if(SNSCodeMaster.FOLLOWER_TYPE.GROUP.toString().equals(follower.getFollowerType())) {
				List<GroupFollowerVo> memberList = groupFollowerService.getGroupFollowerById(lang, follower.getFollowerId());
				for(GroupFollowerVo memberVo : memberList) {
					String memberId = String.valueOf(memberVo.getMemberId());
					if(isRemoveDup) {
						if(list.contains(memberId)) {
							continue;
						}
					}
					list.add(memberId);
				}
				
			} else {
				LOG.warn("[" + follower.getFollowerType() + "] is not FollowerType.");
			}
		}
		
		return list;
	}

	/**
	 * FOLLOWER 등록 (ArrayList)
	 * @param feedVo
	 * @param feedId
	 * @return List<FollowerVo>
	 */
	public List<FollowerVo> insertFollower(FeedVo feedVo, Long feedId) {
		
		List<FollowerVo> feedFolloweList = feedVo.getFeedFollowerList();
		
		/** 1.Validation 체크 */
		// 1.1 feedId가 없으면 에러
		if(feedId == null) {
			throw new SNSServiceException("FEED_ID IS NULL");
		}
		
		TenantVo tenantVo = null;
		
		/** 2. 팔로워 등록 */
		if(feedFolloweList != null) {
			for(FollowerVo fv : feedFolloweList) {
				// 2.1 등록할 팔로워가 멤버
				if(SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString().equals(fv.getFollowerType())) {
					// 2.1.1 멤버 정보 취득
					MemberVo memberVo = memberService.getMemberById("ko", fv.getFollowerId());

					// 2.1.2 유저아이디로 검색
					if(memberVo == null && fv.getSyncKey() == null) {
						throw new SNSServiceException("사용자 아이디가 존재하지 않습니다. (syncKey is null.)");
					}
					
					if(memberVo == null) {
						memberVo = memberService.getMemberBySynckey("ko", fv.getSyncKey());
					}
					
					// 2.1.2 멤버 정보가 없으면 federation 사용자라 판단하고 그룹웨어에서 멤버 정보 취득 후 멤버 등록
					if(memberVo == null) {
						// 2.1.2.1 그룹웨어에서 멤버 정보 취득
						memberVo = memberService.getGroupWareMemberById("ko", fv.getSyncKey());
						// 2.1.2.2 그룹웨어에도 멤버 정보가 없으면 에러 발생
						if(memberVo == null) {
							throw new SNSServiceException("그룹웨어에도 멤버 정보가 존재하지 않습니다. 멤버 동기화키 : " + fv.getSyncKey());
						}
						// 2.1.2.3 테넌트가 존재하지 않으면 에러 발생
						if(memberVo.getTenantId() == 0) {
							throw new SNSServiceException("멤버의 회사 정보가 테넌트 테이블에 존재하지 않습니다. 회사아이디 : " + memberVo.getCompanyId());
						}
						// 2.1.2.4 그룹웨어에서 취득한 멤버 정보에서 회사 아이디로 테넌트 정보 취득
						tenantVo = tenantService.getTenantById(memberVo.getTenantId());
						// 2.1.2.5 등록할 멤버 정보에 테넌트 아이디 셋
						memberVo.setTenantId(tenantVo.getTenantId());
						// 2.1.2.5 멤버 등록
						memberService.insertMember(memberVo);
						
					} else {
						// 2.1.3.1 그룹웨어에서 취득한 멤버 정보에서 회사 아이디로 테넌트 정보 취득
						tenantVo = tenantService.getTenantById(memberVo.getTenantId());
						// 2.1.3.2 테넌트가 존재하지 않으면 에러 발생
						if(tenantVo == null) {
							throw new SNSServiceException("멤버의 회사 정보가 존재하지 않습니다. 테넌트아이디 : " + memberVo.getTenantId());
						}
					}
					
					// 2.1.4 팔로워 ID 셋
					fv.setFollowerId(memberVo.getMemberId());
					// 2.1.5 이미지 셋
					fv.setFollowerImgUrl(memberVo.getMemberThumbUrl()==null?"":memberVo.getMemberThumbUrl());
					// 2.1.6 팔로워 명 셋
					fv.setFollowerName(memberVo.getMemberName());
					
				// 2.2 등록할 팔로워가 그룹
				} else if (SNSCodeMaster.FOLLOWER_TYPE.GROUP.toString().equals(fv.getFollowerType())) {
					
					// 2.2.1 그룹 정보 취득
					GroupVo groupVo = groupService.getGroupById(fv.getFollowerId());
					// 2.2.2 그룹 정보가 없으면 에러발생 -- 그룹 정보는 그룹웨어에서 가져올 방법이 없음(SNS도 그룹을 생성할수 있기에)
					if(groupVo == null) {
						throw new SNSServiceException("그룹 정보가 존재하지 않습니다."); 
					}
					// 2.2.3 팔로워 ID 셋
					fv.setFollowerId(groupVo.getGroupId());
					// 2.2.4 이미지 셋
					fv.setFollowerImgUrl(groupVo.getGroupImgUrl()==null?"":groupVo.getGroupImgUrl());
					// 2.2.5 팔로워 명 셋
					fv.setFollowerName(groupVo.getGroupName());
					// 공개/비공개 그룹여부
					fv.setIsPublic(groupVo.getIsPublic());
					
					// 2.2.4 테넌트 정보 취득
					tenantVo = tenantService.getTenantById(groupVo.getTenantId());
				}
				
				// 2.3 팔로워 객체에 피드 아이디, 타입 셋
				fv.setItemId(feedId);
				fv.setItemType(SNSCodeMaster.ITEM_TYPE.FEED.toString());
				fv.setRegMemberId(feedVo.getRegMemberId());
				
				// 2.4 팔로워 등록
				insertFollower(fv);
				
				// 2.5 federation 로직 호출
				if(tenantVo != null && tenantVo.getIsNetwork() == 1) {
					
					MultiValueMap<String, Object> param = new LinkedMultiValueMap<String, Object>(); 
					param.add("feedVo", feedVo);
					param.add("followerVo", fv);

					try {
						federationService.requestTenantByPost(tenantVo, FeedRestful.FEED_FEDERATION, param);
					} catch(Exception e) {
						LOG.error(e.getMessage());
					}
					
				}
			}
		}
		
		return feedFolloweList;
		
	}
	
	/**
	 * Federation용 피드 팔로워 등록
	 * @param followerVo
	 * @return FollowerVo
	 */
	public FollowerVo insertFederationFollower(FollowerVo followerVo) {
		// 1. 팔로워 타입에 따른 처리
		if(SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString().equals(followerVo.getFollowerType())) {
			MemberVo memberVo = memberService.getMemberBySynckey("ko", followerVo.getSyncKey());
			if(memberVo == null || memberVo.getMemberId() == 0) {
				throw new SNSServiceException("멤버 정보가 존재하지 않습니다. 유저아이디 : " + followerVo.getSyncKey());
			}
			
			followerVo.setFollowerId(memberVo.getMemberId());
			
		} else if(SNSCodeMaster.FOLLOWER_TYPE.GROUP.toString().equals(followerVo.getFollowerType())) {
			GroupVo groupVo = groupService.getGroupById(followerVo.getFollowerId());
			if(groupVo == null) {
				throw new SNSServiceException("피드를 등록할 그룹 정보가 존재하지 않습니다. 그룹아이디 : " + followerVo.getFollowerId());
			}
			
			followerVo.setFollowerId(groupVo.getGroupId());
		}
		
		// 2. 팔로워 등록
		insertFollower(followerVo);
		
		return followerVo;
	}
	
	/**
	 * FOLLOWER 등록 (배열)
	 * @param lang
	 * @param feedId
	 * @param feedFollowerList
	 * @return List<FollowerVo>
	 */
	public List<FollowerVo> insertFeedFollower(String lang, long feedId, List<FollowerVo> feedFollowerList) {
		if(feedFollowerList == null) {
			throw new SNSServiceException("FOLLOWER IS NULL");
		}
		
		for(FollowerVo followerVo : feedFollowerList) {
			followerVo.setItemId(feedId);
			followerVo.setItemType(SNSCodeMaster.ITEM_TYPE.FEED.name());
			insertFollower(followerVo);
		}
		
		return feedFollowerList;
		
	}
	
	/**
	 * FOLLOWER 등록(공통)
	 * @param fv
	 * @return FollowerVo
	 */
	public FollowerVo insertFollower(FollowerVo fv) {
		if(fv.getItemType() == null || "".equals(fv.getItemType())) {
			throw new SNSServiceException("ITEM_TYPE VALUE IS NULL");
		}
		
		if(fv.getFollowerType() == null || "".equals(fv.getFollowerType())) {
			throw new SNSServiceException("FOLLOWER_TYPE VALUE IS NULL");
		}
		
		Date now = new Date();
		fv.setRegDttm(now);
		try {
			followerMapper.insertFollower(fv);
		} catch (DuplicateKeyException e) {
			//ignore
		} catch (Exception e) {
			LOG.error("팔로워 추가 에러", e);
			throw new SNSServiceException("팔로워 추가 에러", e);
		}
		
		return fv;
	}
	
	/**
	 * FOLLOWER 삭제
	 * @param feedFolloweList
	 * @return List<FollowerVo>
	 */
	public List<FollowerVo> deleteFollower(List<FollowerVo> feedFolloweList) {
		TenantVo tenantVo = null;
		long tenantId = 0;
		
		for(FollowerVo followerVo : feedFolloweList) {
			if( SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString().equals(followerVo.getFollowerType()) ) {
				MemberVo memberVo = memberService.getMemberById("ko", followerVo.getFollowerId());
				tenantId = memberVo.getTenantId();
			} else if(SNSCodeMaster.FOLLOWER_TYPE.GROUP.toString().equals(followerVo.getFollowerType())) {
				GroupVo groupVo = groupService.getGroupById(followerVo.getFollowerId());
				tenantId = groupVo.getTenantId();
			}
			
			tenantVo = tenantService.getTenantById(tenantId);
			if(tenantVo == null) {
				throw new SNSServiceException("테넌트 정보가 없습니다. 테넌트 아이디 : " + tenantId);
			}
			
			deleteFollower(followerVo);
			
			// 2.5 federation 로직 호출
			if(tenantVo.getIsNetwork() == 1) {
				MultiValueMap<String, Object> param = new LinkedMultiValueMap<String, Object>(); 
				param.add("itemId", followerVo.getItemId());
				param.add("itemType", followerVo.getItemType());
				param.add("followerType", followerVo.getFollowerType());
				param.add("followerId", followerVo.getFollowerId());
				
				// REST URL 호출
				try {
					federationService.requestTenantByPost(tenantVo, FeedRestful.FOLLOWER_FEDERATION, param);
				} catch(Exception e) {
					LOG.error(e.getMessage());
				}
			}
		}
		
		return feedFolloweList;
		
	}
	
	/**
	 * @param followerVo
	 * @return FollowerVo
	 */
	public FollowerVo deleteFollower(FollowerVo followerVo) {
		followerMapper.deleteFollower(followerVo);
		return followerVo;
	}
	
	/**
	 * 멤버와 그룹 정보 가져온다.
	 * 속한 회사의 사람만 검색한다.
	 * @param term
	 * @param userId
	 * @return List<FollowerVo>
	 */
	public List<FollowerVo> getAutoCompleteFollowerList(String lang, String term, String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("term", term);
		map.put("userId", userId);
		
		List<FollowerVo> allList = new ArrayList<FollowerVo>();

		map.put("term", StringUtils.replaceEach(term, new String[]{"%", "_"}, new String[]{"|%", "|_"}));
		
		List<FollowerVo> groupList = followerMapper.selectGroupListForAuto(map);
		/*
		 * 팔로우 검색시 그룹과 멤버의 라인을 구분하기 위한 객체 추가
		 */
		FollowerVo seperateLine = new FollowerVo();
		seperateLine.setFollowerType("line");
		seperateLine.setFollowerId(0);
		seperateLine.setFollowerName("line");
		groupList.add(seperateLine);

		map.put("term", term);
		List<FollowerVo> memberList = followerMapper.selectMemberListForAuto(map);
		
		allList.addAll(groupList);
		allList.addAll(memberList);
		
		return allList;
		
	}

	/**
	 * @param lang
	 * @param term
	 * @return List<FollowerVo>
	 */
	public List<FollowerVo> getAutoCompleteFollowerListByAll(String lang, String term){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("term", term);
		return followerMapper.selectMemberListForAutoByAll(map);
	}
	
	/**
	 * 멤버의 정보와 멤버가 속한 그룹 리스트를 가져와서 세팅한다.
	 * @param lang
	 * @param followerId
	 * @return FollowerInfoVo
	 */
	public FollowerInfoVo getFollowerInfoMember(String lang, long followerId) {
		
		FollowerInfoVo followerInfoVo = followerMapper.selectFollowerInfoMember(followerId);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("memberId", followerId);
		List<UserTenantMappingVo> usetTenantMappingList = userTenantMappingMapper.selectMappingByMemberId(map);
		followerInfoVo.setFollowerMappingInfo(usetTenantMappingList);
		
		return followerInfoVo;
		
	}

	/**
	 * 그룹 정보를 가져온다.
	 * @param followerId
	 * @return FollowerInfoVo
	 */
	public FollowerInfoVo getFollowerInfoGroup(long followerId) {
		FollowerInfoVo followerInfoVo = followerMapper.selectFollowerInfoGroup(followerId);
		return followerInfoVo;
	}

}