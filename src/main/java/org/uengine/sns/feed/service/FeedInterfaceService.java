package org.uengine.sns.feed.service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.feed.mapper.FeedInterfaceMapper;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.FollowerVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * FeedFileService
 * <pre>피드 관련 외부 연동 서비스</pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("feedInterfaceService")
public class FeedInterfaceService {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(FeedInterfaceService.class);

	@Autowired
	FeedService feedService;

	@Autowired
	MemberService memberService;

	@Autowired
	FeedInterfaceMapper feedInterfaceMapper;
	
	/**
	 * 외부연동 - 피드 등록
	 * @param lang
	 * @param feedVo
	 * @return FeedVo
	 */
	public FeedVo interfaceFeedInsert(String lang, FeedVo feedVo) {
		// 피드 컨텐츠가 존재하지 않으면 인터페이스 link 를 확인하여 강제 입력
		if(StringUtils.isEmpty(feedVo.getFeedContents())) {
			if(!StringUtils.isEmpty(feedVo.getInfLink())) {
				// content 에 링크 정보 삽입
				JSONObject jsonContent = new JSONObject();
				// 결재인 경우 모바일 결재 경로가 infLink 로 들어온다.
				if(SNSCodeMaster.FEED_TYPE.APPROVAL.name().equals(feedVo.getFeedType())) {
					jsonContent.put("title", "Mobile Link");
				} else {
					jsonContent.put("title", "원문보기 (Original Link)");
					
				}
				
				jsonContent.put("url", feedVo.getInfLink());
				jsonContent.put("image", "");
				jsonContent.put("description", "");
				
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("LINK", jsonContent);
				
				feedVo.setFeedContents(jsonObj.toString());
			}
		}
		
		/** 1. 외부에서 넘어온 유저 아이디를 취득해 SNS 멤버 테이블에서 memberId를 취득한다. */
		String syncKey = feedVo.getFeedMemberSyncKey();
		if(syncKey == null || "".equals(syncKey)) {
			throw new SNSServiceException("유저 아이디가 존재하지 않습니다. feedMemberSyncKey : " + syncKey);
		}
		
		MemberVo memberVo = memberService.getMemberBySynckey(lang, syncKey);
		if(memberVo == null) {
			throw new SNSServiceException("SNS에 해당 유저 정보가 존재하지 않습니다. (" + syncKey + ")");
		}

		/** 2. 피드 VO에 멤버 ID를 작성자 ID에 세팅한다. */
		feedVo.setRegMemberId(memberVo.getMemberId());
		
		/** 3. 피드 VO에서 팔로워 리스트 취득 */
		List<FollowerVo> feedFollowerList = feedVo.getFeedFollowerList();
		
		/** 4. 팔로워 리스트에서 그룹웨어 유저아이디로 SNS 멤버 ID를 취득해 followerVo에 멤버 ID를 세팅한다. */
		if(feedFollowerList != null) {
			for(FollowerVo fv: feedFollowerList) {
				// 5.1 팔로워 유저아이디가 있는지 체크
				String followerSyncKey = fv.getFollowerMemberSyncKey();
				if(followerSyncKey == null || "".equals(followerSyncKey)) {
					throw new SNSServiceException("팔로워 아이디가 존재하지 않습니다. (null) ");
				}
				
				// 5.2 SNS에 해당 팔로워가 멤버 정보로 있는지 체크
				MemberVo followerMemberVo = memberService.getMemberBySynckey(lang, followerSyncKey);
				if(followerMemberVo == null) {
					throw new SNSServiceException("SNS에 해당 팔로워 정보가 존재하지 않습니다. (" + followerSyncKey + ")");
				}
				
				// 5.3 팔로워 VO에 데이터 세팅
				fv.setFollowerId(followerMemberVo.getMemberId());
				fv.setFollowerType(SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString());
			}
			feedVo.setFeedFollowerList(feedFollowerList);
		}
		
		/** 6. 피드 등록 */
		return feedService.insertFeed(lang, feedVo);
		
	}

	/**
	 * 외부연동 - 결재완료
	 * @param lang
	 * @param feedVo
	 * @return FeedVo
	 */
	public FeedVo approvalComplete(String lang, FeedVo feedVo) {

		// 결재 완료시 feedId 가 결재 피드 아이디
		if(feedVo.getFeedId() <= 0) {
			throw new SNSServiceException("결재 피드 아이디가 존재하지 않습니다. (" + feedVo.getFeedId() + ")");
		}
		
		FeedVo orginFeed = feedService.getOneFeed(lang, feedVo.getFeedId(), 0);
		if(orginFeed == null || orginFeed.getFeedId() <= 0) {
			throw new SNSServiceException("결재 피드가 존재하지 않습니다. (" + feedVo.getFeedId() + ")");
		}
		
		/** 1. 결재완료처리 */
		feedService.approvalComplete(feedVo);

		List<FollowerVo> feedFollowerList = new ArrayList<FollowerVo>();
		
		/** 2. 결재의견 부분이 null이거나 없으면 기본 문자로 세팅한다. */
		String approvalStatus = feedVo.getApprovalStatus();
		String approvalComment = feedVo.getApprovalComment();

		if(SNSCodeMaster.APPROVAL_STATUS.APPROVAL.toString().equals(approvalStatus)
				|| SNSCodeMaster.APPROVAL_STATUS.REJECT.toString().equals(approvalStatus)) {

			if(StringUtils.isBlank(approvalComment)) {
				if(SNSCodeMaster.APPROVAL_STATUS.APPROVAL.toString().equals(approvalStatus)) {
					feedVo.setFeedTitle("결재를 승인하였습니다.");
				} else if(SNSCodeMaster.APPROVAL_STATUS.REJECT.toString().equals(approvalStatus)) {
					feedVo.setFeedTitle("결재를 반려하였습니다.");
				}
			} else {
				feedVo.setFeedTitle(approvalComment);
				
				// 코멘트가 있는 경우 상신자를 팔로우 시킨다.
				FeedVo orgFeedVo = feedService.getOneFeed(lang, feedVo.getFeedId(), 0);
				FollowerVo flvo = new FollowerVo();
				flvo.setFollowerId(orgFeedVo.getRegMemberId());
				flvo.setFollowerType(SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString());

				feedFollowerList.add(flvo);
			}
		} else {
			throw new SNSServiceException("approvaStatus의 값이 다음의 값과 같지 않습니다.(APPROVAL, REJECT)");
		}
		
		/** 3. 피드타입은 댓글로 등록 */
		feedVo.setFeedType(SNSCodeMaster.FEED_TYPE.COMMENT.toString());
		
		// 3.1 외부연동으로 인한 원 피드 아이디가 새로 만들 코멘트의 부모 아이디가 된다.
		feedVo.setpFeedId(feedVo.getFeedId());
		
		/** 4. 외부에서 넘어온 유저 아이디를 취득해 SNS 멤버 테이블에서 memberId를 취득한다. */
		String syncKey = feedVo.getFeedMemberSyncKey();
		if(StringUtils.isNotBlank(syncKey)) {
			MemberVo regMemberVo = memberService.getMemberBySynckey(lang, syncKey);
			if(regMemberVo == null) {
				throw new SNSServiceException("SNS에 해당 유저 정보가 존재하지 않습니다. (" + syncKey + ")");
			}
			
			/** 5. 피드 VO에 멤버 ID를 작성자 ID에 세팅한다. */
			feedVo.setRegMemberId(regMemberVo.getMemberId());
			
			/** 6. 다음 결재자 팔로워로 추가 */
			if(regMemberVo != null) {
				FollowerVo flvo = new FollowerVo();
				flvo.setFollowerId(regMemberVo.getMemberId());
				flvo.setFollowerType(SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString());
				feedFollowerList.add(flvo);
				
			}
		} else {
			throw new SNSServiceException("등록자 정보가 존재하지 않습니다. (" + syncKey + ") - feedMemberSyncKey 값이 필요합니다.");
		}

		if(feedFollowerList.size() > 0) {
			feedVo.setFeedFollowerList(feedFollowerList);
		}
		
		/** 7. 결재의견 등록 */
		generateInsertFeedComment(lang, feedVo);
		
		return orginFeed;
		
	}
	
	/**
	 * 댓글 등록시 트랜잭션 분리를 위한 메소드
	 * @param lang
	 * @param feedVo
	 * @return FeedVo
	 */
	public FeedVo generateInsertFeedComment(String lang, FeedVo feedVo) {
		return feedService.insertFeed(lang, feedVo);
	}
	
	/**
	 * @param lang
	 * @param feedVo
	 */
	public void generateInsertExternalTodoFeed(String lang, FeedVo feedVo) {

		// ADD 2015.10.02 할일 등록 처리 j.h kim Start
		String dueDate = feedVo.getDueDate() == null ? "" : feedVo.getDueDate().replace("-", "");
		if (dueDate.length() >= 8 && feedVo.isToDoExternal() == false) { // 우리쪽에서
			if(feedVo.getFeedFollowerList() != null) {
				for(FollowerVo fv : feedVo.getFeedFollowerList()) {
					if(fv.getFollowerType().equals("GROUP")) {
						feedVo.setSnsGroupId(fv.getFollowerId());
						break;
					}
				}
			}
			
			feedVo.setCrudType('C');
			insertExternalTodoFeed(feedVo);

			feedVo.setFeedFollowerList( feedService.selectFeedFollowerList(lang, feedVo.getFeedId()) );
			
			for(FollowerVo followerVo : feedVo.getFeedFollowerList()) {
				if(SNSCodeMaster.FOLLOWER_TYPE.MEMBER.name().equals(followerVo.getFollowerType())) {
					insertExternalTodoPerson(feedVo.getExtTaskId(), followerVo.getFollowerMemberSyncKey(), followerVo.getFollowerName());
				}
			}
		}
		// ADD 2015.10.02 할일 등록 처리 j.h kim End
	}

	/**
	 * 외부연동 todo 갱신
	 * @param lang
	 * @param feedVo
	 */
	public void generateUpdateExternalTodoFeed(String lang, FeedVo feedVo) {
		feedVo.setCrudType('U');
		
		insertExternalTodoFeed(feedVo);

		feedVo.setFeedFollowerList( feedService.selectFeedFollowerList(lang, feedVo.getFeedId()) );
		
		for(FollowerVo followerVo : feedVo.getFeedFollowerList()) {
			if(SNSCodeMaster.FOLLOWER_TYPE.MEMBER.name().equals(followerVo.getFollowerType())) {
				insertExternalTodoPerson(feedVo.getExtTaskId(), followerVo.getFollowerMemberSyncKey(), followerVo.getFollowerName());
			}
		}
	}
	
	/**
	 * 외부연동 todo 삭제
	 * @param lang
	 * @param feedId
	 */
	public void generateDeleteExternalTodoFeed(String lang, long feedId) {
		FeedVo feedVo = feedService.getOneFeed(lang, feedId, 0);
		if(feedVo.getFeedType().equals("GENERAL") && feedVo.getDueDate() != null && !feedVo.getDueDate().equals("")) {
			feedVo.setCrudType('D');
			insertExternalTodoFeed(feedVo);
		}

		feedVo.setFeedFollowerList( feedService.selectFeedFollowerList(lang, feedId) );

		for(FollowerVo followerVo : feedVo.getFeedFollowerList()) {
			if(SNSCodeMaster.FOLLOWER_TYPE.MEMBER.name().equals(followerVo.getFollowerType())) {
				insertExternalTodoPerson(feedVo.getExtTaskId(), followerVo.getFollowerMemberSyncKey(), followerVo.getFollowerName());
			}
		}
	}
	
	/**
	 * 외부연동 todo feed 생성
	 * @param feedVo
	 */
	public void insertExternalTodoFeed(FeedVo feedVo) {
		if(feedVo.getMemberVo() == null) {
			feedVo.setMemberVo(memberService.getMemberById("ko", feedVo.getRegMemberId()));
		}
		feedVo.setDueDate(feedVo.getDueDate().replaceAll("[^0-9]", ""));
		
	}
	
	/**
	 * 외부연동 todo (개인)
	 * @param extTaskId
	 * @param syncKey
	 * @param followerName
	 */
	public void insertExternalTodoPerson(long extTaskId, String syncKey, String followerName) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("extTaskId", extTaskId);
		map.put("syncKey", syncKey);
		map.put("followerName", followerName);
		
		feedInterfaceMapper.insertExternalToDoPerson(map);
	}

}