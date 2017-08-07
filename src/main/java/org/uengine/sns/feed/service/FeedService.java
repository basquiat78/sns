package org.uengine.sns.feed.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.jetty.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.federation.service.FederationService;
import org.uengine.sns.feed.FeedRestful;
import org.uengine.sns.feed.mapper.FeedMapper;
import org.uengine.sns.feed.mapper.PollMapper;
import org.uengine.sns.feed.vo.CalendarVo;
import org.uengine.sns.feed.vo.FeedFileVo;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.FollowerVo;
import org.uengine.sns.feed.vo.LikeItVo;
import org.uengine.sns.feed.vo.LinkVo;
import org.uengine.sns.feed.vo.TagVo;
import org.uengine.sns.group.service.GroupFollowerService;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.service.KnowledgeFeedService;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.MemberRestful;
import org.uengine.sns.member.service.BookmarkService;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.tenant.mapper.UserTenantMappingMapper;
import org.uengine.sns.tenant.vo.TenantVo;
import org.uengine.sns.tenant.vo.UserTenantMappingVo;

import net.sf.json.JSONObject;

/**
 * 
 * FeedService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("feedService")
public class FeedService {
	
	private static final Logger LOG = LoggerFactory.getLogger(FeedService.class);
	
	@Autowired
	FeedMapper feedMapper;
	
	@Autowired
	LikeItService likeItService;
	
	@Autowired
	FollowerService followerService;

	@Autowired
	TagService tagService;

	@Autowired
	FeedFileService feedFileService;
	
	@Autowired
	FederationService federationService;
	
	@Autowired
	MemberService memberService;

	@Autowired
	BookmarkService bookmarkService;
	
	@Autowired
	PollMapper pollMapper;
	
	@Autowired
	UserTenantMappingMapper userTenantMappingMapper;
	
	@Autowired
	KnowledgeFeedService knowledgeFeedService;
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	GroupFollowerService groupFollowerService;
	
	@Autowired
	FeedInterfaceService feedInterfaceService;
	
	/**
	 * domainPath
	 */
	private String domainPath = "";
		public String getDomainPath() { return domainPath; }
		public void setDomainPath(String domainPath) { this.domainPath = domainPath; }

	/**
	 * @param feedType
	 * @param feedId
	 * @param sessionMemberId
	 * @return boolean
	 */
	public boolean isReadAuthFeed(String feedType, long feedId, long sessionMemberId) {
		boolean isView = false;
		if(SNSCodeMaster.FEED_TYPE.BOARD.name().equals(feedType)
				|| SNSCodeMaster.FEED_TYPE.SHAREPOINT.name().equals(feedType)) {
			isView = true;
		} else {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("feedId",   feedId);
			map.put("memberId", sessionMemberId);
			List<Long>  list = feedMapper.selectFeedIdAtMemberFeed(map);
			if(list != null && list.size() > 0) {
				isView = true;
			}
		}
		return isView;
	}

	/**
	 * feedId 가 0이면 최신 7건의 피드 아이디 목록을 얻는다.
	 * feedId 가 0이 아니면 feedId 기준의 최신 7건의 피드 아이디 목록을 얻는다.
	 * SNSCodeMaster.FEED_SEARCH_TYPE.MEMBER 이면 개인, 그렇지않으면 전체
	 * @param searchType
	 * @param sessionMemberId
	 * @param targetMemberId
	 * @param feedId
	 * @return List<Long>
	 */
	public List<Long> selectFeedIdList(String searchType, long sessionMemberId, long targetMemberId, long feedId) {
		return selectFeedIdList(searchType, sessionMemberId, targetMemberId, feedId, null, null, null, 0, null, null);
	}
	
	/**
	 * @param searchType
	 * @param sessionMemberId
	 * @param targetMemberId
	 * @param feedId
	 * @param feedType
	 * @param dueDate
	 * @param selectType
	 * @param rowNumToShow
	 * @param fromDate
	 * @param toDate
	 * @return List<Long>
	 */
	public List<Long> selectFeedIdList(String searchType, long sessionMemberId, long targetMemberId
			, long feedId, String feedType, String dueDate, String selectType, int rowNumToShow
			, String fromDate, String toDate) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("searchType", searchType);
		map.put("sessionMemberId", sessionMemberId);
		map.put("targetMemberId", targetMemberId);
		map.put("feedId", feedId);
		map.put("feedType", feedType);
		map.put("dueDate", dueDate);
		map.put("selectType", selectType);
		map.put("rowNumToShow", rowNumToShow);
		if(fromDate != null && !"".equals(fromDate)) {
			map.put("fromDate", fromDate);
		}
		
		if(toDate != null && !"".equals(toDate)) {
			map.put("toDate", toDate);
		}
		return feedMapper.selectFeedIdList(map);
	}

	/**
	 * 피드 리스트(그룹, 멤버, 그룹지식, 즐겨찾기)
	 * @param lang
	 * @param scv
	 * @param sessionMemberId
	 * @return List<FeedVo>
	 */
	public List<FeedVo> getFeedList(String lang, SearchContextVo scv, long sessionMemberId) {
		
		String feedType= "";
		/** 1. 조건에 맞는 피드 아이디 취득 */
		List<Long> feedIdList = null;
		if(scv.getMenuType() == null || "".equals(scv.getMenuType())) {
			scv.sessionMemberId(sessionMemberId);
			feedIdList = selectFeedIdList(scv.getMenuType(), sessionMemberId, scv.getMemberId(), scv.getFeedId(), scv.getFeedType(), scv.getDueDate(), scv.getSelectType(), scv.getRowNumToShow(), scv.getFromDate(), scv.getToDate());

		} else if(SNSCodeMaster.FEED_SEARCH_TYPE.MEMBER.toString().equals(scv.getMenuType())) {
			scv.sessionMemberId(sessionMemberId);
			feedIdList = selectFeedIdList(scv.getMenuType(), sessionMemberId, scv.getMemberId(), scv.getFeedId(), scv.getFeedType(), scv.getDueDate(), scv.getSelectType(), scv.getRowNumToShow(), scv.getFromDate(), scv.getToDate());
		
		} else if(SNSCodeMaster.FEED_SEARCH_TYPE.GROUP.toString().equals(scv.getMenuType())) {
			feedIdList = getGroupFeedIdList(scv.getMenuType(), scv.getGroupId(), scv.getFeedId(), scv.getFeedType(), scv.getDueDate(), scv.getSelectType(), scv.getRowNumToShow(), scv.getFromDate(), scv.getToDate());
			
		} else if(SNSCodeMaster.FEED_SEARCH_TYPE.GROUP_KNOWLEDGE.toString().equals(scv.getMenuType())) {
			feedIdList = feedMapper.selectGroupKnwldgeFeedIdList(scv);
			
		} else if(SNSCodeMaster.FEED_SEARCH_TYPE.BOOKMARK.toString().equals(scv.getMenuType())) {
			feedType = SNSCodeMaster.FEED_SEARCH_TYPE.BOOKMARK.toString();
			feedIdList = feedMapper.selectBookmarkFeedIdList(scv);
		
		} else if(SNSCodeMaster.FEED_SEARCH_TYPE.HASHTAG.toString().equals(scv.getMenuType())) {
			scv.sessionMemberId(sessionMemberId);
			feedType = SNSCodeMaster.FEED_SEARCH_TYPE.HASHTAG.toString();
			feedIdList = feedMapper.selectHashTagFeedIdList(scv);
			
		}  
		
		return getFeedMetaData(lang, sessionMemberId, feedIdList, feedType);
	}
	
	/**
	 * @param searchType
	 * @param groupId
	 * @param feedId
	 * @param feedType
	 * @param dueDate
	 * @param selectType
	 * @param rowNumToShow
	 * @param fromDate
	 * @param toDate
	 * @return List<Long>
	 */
	public List<Long> getGroupFeedIdList(String searchType, long groupId
			, long feedId, String feedType, String dueDate, String selectType, int rowNumToShow
			, String fromDate, String toDate) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("searchType", searchType);
		map.put("groupId", groupId);
		map.put("feedId", feedId);
		map.put("feedType", feedType);
		map.put("dueDate", dueDate);
		map.put("selectType", selectType);
		map.put("rowNumToShow", rowNumToShow);
		if(fromDate != null && !"".equals(fromDate)) {
			map.put("fromDate", fromDate);
		}
		
		if(toDate != null && !"".equals(toDate)) {
			map.put("toDate", toDate);
		}
		
		return feedMapper.selectGroupFeedIdList(map);
	}
	
	/**
	 * @param lang
	 * @param sessionMemberId
	 * @param feedIdList
	 * @param feedType
	 * @return List<FeedVo>
	 */
	public List<FeedVo> getFeedMetaData(String lang, long sessionMemberId, List<Long> feedIdList, String feedType){
		// 1.1 조건에 해당하는 원피드 ID가 없으면 수가 0이면 바로 반환
		if(feedIdList == null || feedIdList.size() == 0) {
			return new ArrayList<FeedVo>();
		}
		
		/** 2. 피드 아이디를 조건으로 피드 객체 리스트 취득*/
		List<FeedVo> feedList = getFeedList(lang, feedIdList, sessionMemberId); 
		
		/** 3. 원피드 리스트 수가 0이면 바로 반환 */
		if(feedList == null || feedList.size() == 0) {
			return feedList;
		}
		
		/** 4. 원 피드정보 Loop */
		for(FeedVo oneFeedVo: feedList) {
			// 4.1 최신 댓글 2건 취득 타입:1
			oneFeedVo.setCmtCmpntType(1);
			
			// 4.2 피드의 테넌트 정보 취득
			TenantVo tenantVo = oneFeedVo.getTenantVo();

			// 4.3 외부 서버의 피드 정보 취득
			if(tenantVo != null && tenantVo.getIsNetwork() == 1) {
				try {
					federationService.requestTenantByGet(tenantVo, FeedRestful.BASE_FEED + "/" + oneFeedVo.getTenantFeedId(), null);
				} catch(Exception e) {
					LOG.error(e.getMessage());
				}
				
			} else {	// 4.4 내부 서버의 피드 정보 취득
				oneFeedVo.setSessionMemberId(sessionMemberId);
				getFeedOtherInfo(lang, oneFeedVo, feedType, sessionMemberId);
			}
		}
		
		return feedList;
	}
	
	/**
	 * @param lang
	 * @param memberId
	 * @param feedIdList
	 * @param feedTypeList
	 * @return Map<Object, Object>
	 */
	public Map<Object, Object> getFeedMetaDataForWebsocket(String lang, long memberId, List<Long> feedIdList, List<Map<Long, String>> feedTypeList) {
		
		Map<Object, Object> map = new HashMap<Object, Object>();
		
		// 1.1 조건에 해당하는 원피드 ID가 없으면 수가 0이면 바로 반환
		if(feedIdList == null || feedIdList.size() == 0) {
			map.put("feedList", new ArrayList<FeedVo>());
			map.put("noticeCnt", 0);
			return map;
		}
		
		/** 2. 피드 아이디를 조건으로 피드 객체 리스트 취득*/
		List<FeedVo> feedList = getFeedList(lang, feedIdList, memberId);
		
		/** 3. 원피드 리스트 수가 0이면 바로 반환 */
		if(feedList == null || feedList.size() == 0) {
			map.put("feedList", new ArrayList<FeedVo>());
			map.put("noticeCnt", 0);
			return map;
		}
		
		/** 4. 원 피드정보 Loop */
		for(FeedVo oneFeedVo: feedList) {
			// 4.1 최신 댓글 2건 취득 타입:1
			oneFeedVo.setCmtCmpntType(1);
			
			// 4.2 피드의 테넌트 정보 취득
			TenantVo tenantVo = oneFeedVo.getTenantVo();

			// 4.3 외부 서버의 피드 정보 취득
			if (tenantVo != null && tenantVo.getIsNetwork() == 1) {
				try {
					federationService.requestTenantByGet(tenantVo, FeedRestful.BASE_FEED + "/" + oneFeedVo.getTenantFeedId(), null);
				} catch(Exception e) {
					LOG.error(e.getMessage());
				}
				
			} else {	// 4.4 내부 서버의 피드 정보 취득
				oneFeedVo.setSessionMemberId(memberId);
				getFeedOtherInfo(lang, oneFeedVo, "", memberId);
			}
		}
		
		map.put("feedList", feedList);
		map.put("noticeCnt", feedIdList.size());
		map.put("feedTypeList", feedTypeList);
		return map;
	}
	
	/**
	 * 원피드 정보만 취득
	 * @param lang
	 * @param feedIdList
	 * @param sessionMemberId
	 * @return List<FeedVo>
	 */
	public List<FeedVo> getFeedList(String lang, List<Long> feedIdList, long sessionMemberId) {

		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("list", feedIdList);
		map.put("sessionMemberId", sessionMemberId);
		List<FeedVo> feedList = feedMapper.selectFeedList(map);
		
		return feedList;
	}

	/**
	 * 원피드의 메타 정보들(댓글, 팔로워, 태그) 셋
	 * @param lang
	 * @param oneFeedVo
	 * @param feedType
	 * @param sessionMemberId
	 * @return FeedVo
	 */
	private	FeedVo getFeedOtherInfo(String lang, FeedVo oneFeedVo, String feedType, long sessionMemberId) {
		return getFeedOtherInfo(lang, oneFeedVo, feedType, sessionMemberId, -1);
	}

	/**
	 * @param lang
	 * @param feedId
	 * @param sessionMemberId
	 * @param limit
	 * @return FeedVo
	 */
	public FeedVo getFeedCommentListByLimit(String lang, long feedId, long sessionMemberId, int limit) {
		FeedVo feedVo = getOneFeed(lang, feedId, sessionMemberId);
		return getFeedOtherInfo(lang, feedVo, "LIMIT_COMMENT", sessionMemberId, limit);
	}
	
	/**
	 * @param lang
	 * @param oneFeedVo
	 * @param feedType
	 * @param sessionMemberId
	 * @param limit
	 * @return FeedVo
	 */
	private	FeedVo getFeedOtherInfo(String lang, FeedVo oneFeedVo, String feedType, long sessionMemberId, int limit) {

		if(oneFeedVo.getCmtCnt() > 0) {
			if("LIMIT_COMMENT".equals(feedType)) {	// 댓글 건수를 제한하는 신규 로직
				oneFeedVo.setCommentFeedList(selectFeedCommentListByLimit(lang, oneFeedVo.getFeedId(), sessionMemberId, limit));
			} else {	// 기존 로직
				/** 원피드의 댓글 리스트*/
				oneFeedVo.setCommentFeedList( getFeedCommentList(lang, oneFeedVo.getFeedId(),  oneFeedVo.getCmtCmpntType(), oneFeedVo.getCmtLstSecFeedId(), sessionMemberId) );
			}
		}
		
		/** 원피드의 팔로워 리스트*/
		if(oneFeedVo.getFollowerCnt() > 0) {
			oneFeedVo.setFeedFollowerList( selectFeedFollowerList(lang, oneFeedVo.getFeedId()) );
		} else {
			oneFeedVo.setFeedFollowerList(new ArrayList<FollowerVo>());
		}
		
		/** 원피드의 파일 리스트*/
		if(oneFeedVo.getFileCnt() > 0) {
			oneFeedVo.setFileList((ArrayList<FeedFileVo>)feedMapper.selectFeedFileList(oneFeedVo));
		} else {
			oneFeedVo.setFileList(new ArrayList<FeedFileVo>());
		}
		
		/** 원피드의 태그 리스트*/
		if(oneFeedVo.getTagCnt() > 0) {
			oneFeedVo.setFeedTagList((ArrayList<TagVo>)feedMapper.selectFeedTagList(oneFeedVo));
		} else {
			oneFeedVo.setFeedTagList(new ArrayList<TagVo>());
		}
		
		/** 원피드의 설문 정보 리스트 가져오기*/
		if(oneFeedVo.getFeedType().equals(SNSCodeMaster.FEED_TYPE.POLL.toString())) {
			oneFeedVo.setFeedPollList(pollMapper.selectPollFeedInfo(oneFeedVo.getFeedId()));
			oneFeedVo.setResultFeedPollList(pollMapper.selectPollResultList(oneFeedVo.getFeedId()));
		}
		/** 원피드의 즐겨찾기 리스트*/
		oneFeedVo.setBookmarkList(bookmarkService.getBookmarkListByFeed(oneFeedVo.getFeedId()));
		
		/** 자신의 피드 리스트에서 해당 글을 쓴 유저의 정보를 가져오기 위한 등록자의 정보를 가져온다. */
		MemberVo regMemberVo = oneFeedVo.getMemberVo();
		
		if(regMemberVo == null) {
			regMemberVo = new MemberVo();
			regMemberVo.setMemberId(0);
			regMemberVo.setIsDeleted(1);
			regMemberVo.setMemberName("deleted user");
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("memberId", regMemberVo.getMemberId());
		List<UserTenantMappingVo> userTenantMappingList = userTenantMappingMapper.selectMappingByMemberId(map);
		regMemberVo.setTenantMappingList(userTenantMappingList);
		
		oneFeedVo.setMemberVo(regMemberVo);
		
		/**
		 * 피드를 가져올때 로그인한 유저의 아이디와 feedId를 자신이 좋아요를 눌렀는지 체크한다.
		 * 있다면 int cnt 1를 반환하며 feedVo의 likeItByMe에 세팅한다.
		 * 피드 목록에서 이 부분이 1이라면 자신이 좋아요를 누른 피드
		 */
		if(oneFeedVo.getLikeItCnt() > 0) {
			LikeItVo likeItByMeVo = new LikeItVo();
			likeItByMeVo.setFeedId(oneFeedVo.getFeedId());
			likeItByMeVo.setRegMemberId(oneFeedVo.getSessionMemberId());
			oneFeedVo.setLikeItByMe(likeItService.getLikeIt(likeItByMeVo));
		}
		
		/**
		 * 피드를 가져올때 해당 피드가 지식 등록된 피드라면 그 정보를 가져온다.
		 * 이 정보는 하나의 KnowledgeVo 객체를 가질 수 있다.
		 */
		if(oneFeedVo.getKnwldgCnt() > 0) {
			oneFeedVo.setKldgVo(knowledgeFeedService.getKnowledgeInfoByFeedId(oneFeedVo.getFeedId()));
		}
		
		return oneFeedVo;
	}
	
	/**
	 * 피드 리스트(멤버)
	 * @param lang
	 * @param scv
	 * @param sessionMemberId
	 * @return List<FeedVo>
	 */
	public List<FeedVo> getMemberFeedList(String lang, SearchContextVo scv, long sessionMemberId) {
		scv.menuType(SNSCodeMaster.FEED_SEARCH_TYPE.MEMBER.toString());
		return getFeedList(lang, scv, sessionMemberId);
	}
	
	/**
	 * 피드 리스트(그룹)
	 * @param lang
	 * @param scv
	 * @param sessionMemberId
	 * @return List<FeedVo>
	 */
	public List<FeedVo> getGroupFeedList(String lang, SearchContextVo scv, long sessionMemberId) {
		scv.menuType(SNSCodeMaster.FEED_SEARCH_TYPE.GROUP.toString());
		return getFeedList(lang, scv, sessionMemberId);
	}
	
	/**
	 * 피드 리스트(내일 할 일)
	 * @param scv
	 * @return List<FeedVo>
	 */
	public List<FeedVo> selectTomorrowToDoFeedList(SearchContextVo scv) {
		return feedMapper.selectTomorrowToDoFeedList(scv);
	}
	
	/**
	 * 피드 상세 - 피드 관련 정보들 전체 취득
	 * @param lang
	 * @param feedId
	 * @param sessionMemberId
	 * @return FeedVo
	 */
	public FeedVo getFeed(String lang, long feedId, long sessionMemberId) {
		FeedVo feedVo = getOneFeed(lang, feedId, sessionMemberId);
		if(feedVo != null) {
			// 최신 댓글 2건 가져오기 타입:1
			feedVo.setCmtCmpntType(1);
			// 원피드의 메타 정보 셋:태그, 파일, 팔로우
			getFeedOtherInfo(lang, feedVo, null, sessionMemberId);
		}
		
		return feedVo;
	}
	
	/**
	 * 피드 상세 정보만 가져오기
	 * @param lang
	 * @param feedId
	 * @param sessionMemberId
	 * @return FeedVo
	 */
	public FeedVo getOneFeed(String lang, long feedId, long sessionMemberId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("feedId", feedId);
		map.put("sessionMemberId", sessionMemberId);
		return feedMapper.selectGetFeed(map);
	}
	
	/**
	 * inf id로 피드 상세 정보만 가져오기
	 * @param lang
	 * @param infId
	 * @return FeedVo
	 */
	public FeedVo getOneFeedWithInf(String lang, String infId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("infId", infId);
		return feedMapper.selectGetFeedWithInf(map);
	}
	
	/**
	 * @param lang
	 * @param feedVo
	 * @param domainPath
	 * @return FeedVo
	 */
	public FeedVo shareFeed(String lang, FeedVo feedVo, String domainPath) {
		// 공유하는 피드의 카운트 업데이트
		this.domainPath = domainPath;
		FeedVo fv = insertFeed(lang, feedVo);
		feedMapper.updateShareCnt(fv.getpFeedId());
		return fv;
	}
	
	/**
	 * 피드 등록
	 * @param lang
	 * @param feedVo
	 * @return FeedVo
	 */
	public FeedVo insertFeed(String lang, FeedVo feedVo) {
		
		long regMemberId = feedVo.getRegMemberId();
		if(regMemberId == 0) {
			throw new SNSServiceException("등록할 멤버 정보가 없습니다.");
		}
		
		/** 1. 멤버 정보 검색 */
		MemberVo memberVo = memberService.getMemberById(lang, regMemberId);
		feedVo.setMemberVo(memberVo);
		
		/** 2. 피드 등록*/
		// 2.1 생성할 피드 정보에 멤버의 테넌트 정보 셋
		feedVo.setTenantId(Long.toString(memberVo.getTenantId())==null ? 0:memberVo.getTenantId());
		
		// 2.3 공유 피드시에 원천 데이터 정보를 Json 형태로 바꿔 공유 피드의 컨텐츠에 저장
		if(SNSCodeMaster.FEED_TYPE.SHARE.toString().equals(feedVo.getFeedType())) {
			// 2.3.1 원천 데이터 정보를 취득
			FeedVo shareFeedVo = getOneFeed(lang, feedVo.getpFeedId(), feedVo.getRegMemberId());
			
			// 2.3.2 컨텐츠에 저장할 메타 정보 set
			LinkVo lv = new LinkVo();
			lv.setTitle(shareFeedVo.getFeedTitle());
			lv.setUrl(this.domainPath + FeedRestful.BASE_FEED + "/" + shareFeedVo.getFeedId());
			lv.setImage(this.domainPath + MemberRestful.MEMBER_PIC + "?memberId=" + shareFeedVo.getRegMemberId());
			lv.setDescription("");
			
			// 2.3.3 Json 형태로 바꿔 피드의 컨텐츠 영역에 저장(에러나도 빈 컨텐츠로 저장되게 처리)
			try {
				JSONObject jo = JSONObject.fromObject(lv);
				feedVo.setFeedContents("{\"LINK\":" + jo.toString() + "}");
			} catch (Exception e) {
				LOG.warn("Feed Contents Json parsing error.", e);
			}
		}

		// 댓글 여부
		boolean isComment = SNSCodeMaster.FEED_TYPE.COMMENT.name().equals(feedVo.getFeedType());
		
		// 댓글이 아니면 0, 댓글을 새로 쓰면 순번을 1로 셋팅한다.
		feedVo.setFeedPerSeq(isComment ? 1 : 0);
		
		if(isComment) {	// 댓글이면 현재 댓글의 피드당순번 컬럼을 모두 +1 해준다.
			feedMapper.updateCommentFeedPerSeq(feedVo.getpFeedId());
		}

		// 2.2 현재 등록일시 셋
		Date currDate = new Date();
		feedVo.setRegDttm(currDate);
		if(!isComment) {
			feedVo.setCmtLstRegDttm(currDate);	// 댓글이 아니면
		}
		
		// 2.3 피드 등록
		feedMapper.insertFeed(feedVo);
		// 2.4 첨부 파일은 피드 타입 상관없이 해당 피드에 귀속 */
		feedFileService.insertFeedFile(feedVo.getFileList(), feedVo.getFeedId(), feedVo.getMemberVo().getCompanyId());
		
		
		/** 3. 피드 등록 이후 처리 - 댓글*/
		if(isComment) {
			
			/** 3.1. 부모 피드 아이디가 존재하지 않으면 에러처리 */
			if(feedVo.getpFeedId() == 0) {
				throw new SNSServiceException("원 피드 아이디가 존재하지 않습니다.");
			}
			
			/** 3.2. 원피드의 첫번째, 두번째 댓글 아이디 업데이트  */
			// 3.2.1 피드 타입이 댓글일 경우 원피드의 첫번재 댓글 아이디, 두번째 댓글 아이디 정보를 업데이트 해준다.
			FeedVo pFeed = getOneFeed(lang, feedVo.getpFeedId(), feedVo.getRegMemberId());
			
			// 3.2.2 원피드의 전체 댓글 피드 아이디 취득 후 마지막 2번째 댓글의 feedId 정보 세팅
			List<Long> cmtFeedId = feedMapper.selectCommentFeedIdList(feedVo.getpFeedId());
			if(cmtFeedId != null && cmtFeedId.size() > 1) {
				for(int i=cmtFeedId.size()-2; i<cmtFeedId.size()-1; i++) {
					//최신 바로 이전 댓글 아이디
					pFeed.setCmtLstSecFeedId(cmtFeedId.get(i));
				}
			} else if(cmtFeedId != null && cmtFeedId.size() == 1) {
				pFeed.setCmtLstSecFeedId(cmtFeedId.get(0));
			}
			
			// 3.2.3 최종 댓글 등록일시
			pFeed.setCmtLstRegDttm(currDate);
			// 3.2.4 댓글 카운트
			pFeed.setCmtCnt(cmtFeedId.size());
			// 3.2.5 업데이트
			feedMapper.updateFeedByComment(pFeed);
			
			/** 3.3 생성된 피드 아이디로 팔로워 생성(댓글은 부모 피드 아이디로 등록) */
			followerService.insertFollower(feedVo, pFeed.getFeedId());
			
			/** 3.4.화면에 보여지는 뎃글중 첫번째 댓글의 아이디를 가져와 그것을 기준으로 이후 댓글들을 다 가지고 온다. */
			// 3.4.1 검색에 사용할 임시 FeedVo 객체
			FeedVo tmpFeedVo = new FeedVo();
			// 3.4.2 원피드 아이디 셋
			tmpFeedVo.setFeedId(pFeed.getFeedId());
			// 3.4.3 추가된 이후 댓글 타입
			//tmpFeedVo.setCmtCmpntType(1);
			tmpFeedVo.setCmtCmpntType(2);
			// 3.4.4 업데이트 이전의 두번째 피드 아이디 세팅 - 화면에서 취득
			tmpFeedVo.setCmtLstSecFeedId(feedVo.getCmtLstSecFeedId());
			// 3.4.5 댓글 취득
			pFeed.setCommentFeedList( getFeedCommentList(lang, tmpFeedVo.getFeedId(), tmpFeedVo.getCmtCmpntType(), tmpFeedVo.getCmtLstSecFeedId(), feedVo.getRegMemberId()) );
			// 3.4.6 팔로우 리스트 취득
			pFeed.setFeedFollowerList(feedVo.getFeedFollowerList());
			
			/** 3.5.태그 등록(댓글은 부모 피드 아이디로 등록) */
			if(isComment) { 
				tagService.insertTag(feedVo, feedVo.getpFeedId());	
			} else {
				tagService.insertTag(feedVo, pFeed.getFeedId());
			}
			
			pFeed.setFeedTagList(feedVo.getFeedTagList());
			
			return pFeed;
			
		/** 3. 나머지 피드 처리 */	
		} else {
			
			/** 3.1.생성된 피드 아이디로 팔로워 생성(댓글은 부모 피드 아이디로 등록) */
			followerService.insertFollower(feedVo, feedVo.getFeedId());
			
			/** 3.2.태그 등록(댓글은 부모 피드 아이디로 등록) */
			tagService.insertTag(feedVo, feedVo.getFeedId());
			
		}

		if(!isComment) {
			// ADD 2015.10.02 할일 등록 처리 j.h kim Start
			String dueDate = feedVo.getDueDate() == null ? "" : feedVo.getDueDate().replace("-", "");
			if (dueDate.length() >= 8 && feedVo.isToDoExternal() == false) { // 우리쪽에서
				feedInterfaceService.generateInsertExternalTodoFeed(lang, feedVo);
			}
			// ADD 2015.10.02 할일 등록 처리 j.h kim End
		}
		
		return feedVo;

	}
	
	/**
	 * 피드 등록 (federation)
	 * @param lang
	 * @param feedVo
	 * @param followerVo
	 * @return FeedVo
	 */
	public FeedVo insertFederationFeed(String lang, FeedVo feedVo, FollowerVo followerVo) {
		/** 1. 이미 피드가 등록되어 있는지 확인하기위해 피드아이디로 검색 */
		feedVo.setTenantFeedId(feedVo.getFeedId());
		FeedVo tmpFeedVo = getOneFeed(lang, feedVo.getTenantFeedId(), feedVo.getRegMemberId());
		
		// 1.1 피드가 없으면 새로운 피드 등록
		if(tmpFeedVo == null){
			// 1.1.1 현재 등록일시 셋
			Date currDate = new Date();
			feedVo.setRegDttm(currDate);
			feedVo.setCmtLstRegDttm(currDate);
			// 1.1.2 피드 등록
			feedMapper.insertFeed(feedVo);
			
		// 1.2 피드가 이미 존재하면 가져온 피드아이디를 federation으로 넘어온 feedVo 객체의 feedId값에 넣어준다.	
		}else {
			feedVo.setFeedId(tmpFeedVo.getFeedId());
		}

		/** 2. 팔로워 등록 */
		followerVo.setItemId(feedVo.getFeedId());
		followerService.insertFollower(followerVo);
		
		return feedVo;
	}
	
	/**
	 * 이전 댓글 리스트
	 * @param lang
	 * @param feedId
	 * @param sessionMemberId
	 * @return FeedVo
	 */
	public FeedVo getBeforeCommentList(String lang, long feedId, long sessionMemberId) {
		FeedVo oneFeedVo = getOneFeed(lang, feedId, sessionMemberId);
		if(oneFeedVo != null) {
			// 해당 피드의 댓글 리스트 취득 
			oneFeedVo.setCommentFeedList( getFeedCommentList(lang, feedId, 3, oneFeedVo.getCmtLstSecFeedId(), sessionMemberId) );
		}

		return oneFeedVo;
	}
	
	/**
	 * @param lang
	 * @param feedId
	 * @param sessionMemberId
	 * @param limit
	 * @return List<FeedVo>
	 */
	public List<FeedVo> selectFeedCommentListByLimit(String lang, long feedId, long sessionMemberId, int limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("feedId", feedId);
		map.put("limit", limit);
		List<FeedVo> commentList = feedMapper.selectFeedCommentListByLimit(map);
		for(FeedVo comment : commentList) {
			if(comment.getLikeItCnt() > 0) {
				comment.setBookmarkList(bookmarkService.getBookmarkListByFeed(comment.getFeedId()));
			}
			
			if(comment.getFileCnt() > 0) {
				comment.setFileList((ArrayList<FeedFileVo>)feedMapper.selectFeedFileList(comment));
			}

			if(comment.getLikeItCnt() > 0) {
				LikeItVo likeItByMeVo = new LikeItVo();
				likeItByMeVo.setFeedId(comment.getFeedId());
				likeItByMeVo.setRegMemberId(sessionMemberId);
				comment.setLikeItByMe(likeItService.getLikeIt(likeItByMeVo));
			}
		}

		return commentList;
	}
	
	public List<FeedVo> getFeedCommentList(String lang, long feedId, int cmtCmpntType, long cmtLstSecFeedId, long sessionMemberId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("feedId", feedId);
		map.put("cmtCmpntType", cmtCmpntType);
		map.put("cmtLstSecFeedId", cmtLstSecFeedId);
		
		List<FeedVo> commentList = feedMapper.selectFeedCommentList(map);
		for(FeedVo comment : commentList) {
			if(comment.getLikeItCnt() > 0) {
				comment.setBookmarkList(bookmarkService.getBookmarkListByFeed(comment.getFeedId()));
			}
			
			if(comment.getFileCnt() > 0) {
				comment.setFileList((ArrayList<FeedFileVo>)feedMapper.selectFeedFileList(comment));
			}

			if(comment.getLikeItCnt() > 0) {
				LikeItVo likeItByMeVo = new LikeItVo();
				likeItByMeVo.setFeedId(comment.getFeedId());
				likeItByMeVo.setRegMemberId(sessionMemberId);
				comment.setLikeItByMe(likeItService.getLikeIt(likeItByMeVo));
			}
		}
		
		return commentList;
	}
	
	/**
	 * @param lang
	 * @param feedId
	 * @param regDttm
	 * @param sessionMemberId
	 * @return FeedVo
	 */
	public FeedVo getCommentListByRegDttm(String lang, long feedId, long regDttm, long sessionMemberId) {
		
		FeedVo oneFeedVo = getOneFeed(lang, feedId, sessionMemberId);
		
		Date date = new Date(regDttm);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("pFeedId", feedId);
		map.put("regDttm", date);
		oneFeedVo.setCommentFeedList((ArrayList<FeedVo>)feedMapper.selectCommentListByRegDttm(map));
		
		return oneFeedVo;
	}
	
	/**
	 * 댓글 개수 가져오기
	 * @param pfeedId
	 * @return int
	 */
	public int getCommentFeedCnt(long pfeedId) {
		return feedMapper.selectCommentFeedIdList(pfeedId).size();
	}
	
	/**
	 * 
	 * @param lang
	 * @param feedId
	 * @return List<FollowerVo>
	 */
	public List<FollowerVo> selectFeedFollowerList(String lang, long feedId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lang", lang);
		map.put("feedId", feedId);
		
		return feedMapper.selectFeedFollowerList(map);
	}

	/**
	 * 피드 수정
	 * @param feedVo
	 */
	public void updateFeed(FeedVo feedVo) {
		this.updateFeedTitle(feedVo);
		followerService.insertFollower(feedVo, feedVo.getFeedId());
		tagService.insertTag(feedVo, feedVo.getFeedId());
	}
	
	/**
	 * 댓글 수정
	 * @param feedVo
	 */
	public void updateCommentFeed(FeedVo feedVo) {
		this.updateFeedTitle(feedVo);
		followerService.insertFollower(feedVo, feedVo.getpFeedId());
		tagService.insertTag(feedVo, feedVo.getpFeedId());
	}
	
	/**
	 * 피드 타이틀 수정
	 * @param feedVo
	 */
	public void updateFeedTitle(FeedVo feedVo) {
		
		// 이력정보 먼저 저장함.
		insertFeedHistory(feedVo.getFeedId(), feedVo.getRegMemberId());
		feedMapper.updateFeed(feedVo);
	}

	/**
	 * 피드 CmtLstRegDttm 업데이트
	 * @param feedVo
	 */
	public void updateFeedCmtLstRegDttm(FeedVo feedVo) {
		feedMapper.updateFeedCmtLstRegDttm(feedVo);
	}
	
	/**
	 * @param feedId
	 * @param modifyMemberId
	 */
	public void insertFeedHistory(long feedId, long modifyMemberId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("feedId", feedId);
		map.put("modifyMemberId", modifyMemberId);
		feedMapper.insertFeedHistory(map);
	}
	
	/**
	 * 피드 삭제 (외부용)
	 * @param lang
	 * @param feedId
	 * @param b
	 */
	public void deleteFeed(String lang, long feedId, boolean b) {
		if(b) {
			feedInterfaceService.generateDeleteExternalTodoFeed(lang, feedId);
		}
		
		feedMapper.deleteFeed(feedId);
	}

	/**
	 * 피드 삭제
	 * @param lang
	 * @param feedId
	 */
	public void deleteFeed(String lang, long feedId) {
		deleteFeed(lang, feedId, true);
	}

	/**
	 * 피드 댓글 삭제
	 * @param feedVo
	 */
	public void deleteCommentFeed(FeedVo feedVo) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pFeedId", feedVo.getpFeedId());
		map.put("feedId", feedVo.getFeedId());
		feedMapper.updateCommentFeedPerSeqByDelete(map);
		
		feedMapper.deleteFeed(feedVo.getFeedId());
		feedMapper.disMountCommentCountParentFeed(feedVo.getpFeedId());
	}
	
	/**
	 * 피드 좋아요 +1 카운트
	 * @param feedId
	 */
	public void updateFeedLikeCntPlus(long feedId) {
		feedMapper.updateFeedLikeCntPlus(feedId);
	}
	
	/**
	 * 피드 좋아요 -1 카운트
	 * @param feedId
	 */
	public void updateFeedLikeCntMinus(long feedId) {
		feedMapper.updateFeedLikeCntMinus(feedId);
	}
	
	/**
	 * 위젯용 리스트(5건)
	 * @param scv
	 * @return List<FeedVo>
	 */
	public List<FeedVo> getTodoFeedList(SearchContextVo scv) {
		if("GROUP".equals(scv.getMenuType())) {
			return feedMapper.selectGroupToDoFeedList(scv);
		} else {
			return feedMapper.selectToDoFeedList(scv);
		}
	}
	
	/**
	 * 시스템 피드- 전체
	 * @param scv
	 * @return List<FeedVo>
	 */
	public List<FeedVo> selectAllSystemFeedList(SearchContextVo scv) {
		return feedMapper.selectAllSystemFeedList(scv);
	}
	
	/**
	 * 칼렌다 목록
	 * @param calendarVo
	 * @return List<CalendarVo>
	 */
	public List<CalendarVo> selectFeedCalendarList(CalendarVo calendarVo) {
		return feedMapper.selectFeedCalendarList(calendarVo);
	}

	/**
	 * 결재 완료처리
	 * @param feedVo
	 */
	public void approvalComplete(FeedVo feedVo) {
		feedMapper.approvalComplete(feedVo);
	}
	
	/**
	 * group feed noti list
	 * @param feedVo
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getGroupFeedNotiList(FeedVo feedVo) {
		List<NoticeVo> notiArrList = new ArrayList<NoticeVo>();
		List<FollowerVo> feedFolloweList = feedVo.getFeedFollowerList();
		String dueDate = null;
		for(FollowerVo fv : feedFolloweList) {
			if(SNSCodeMaster.FOLLOWER_TYPE.GROUP.toString().equals(fv.getFollowerType())) {
				GroupVo apiIntcGrpVo = groupService.getGroupById(fv.getFollowerId());
				dueDate = feedVo.getDueDate();
				NoticeVo noticeVo = new NoticeVo();
				noticeVo.setItemId(apiIntcGrpVo.getGroupId());
				noticeVo.setItemTitle(feedVo.getFeedTitle());
				noticeVo.setItemMsg(dueDate);
				noticeVo.setFromMemberId(feedVo.getRegMemberId());
				noticeVo.setGroupFeedYn("Y");
				noticeVo.setGroupName(apiIntcGrpVo.getGroupName());
				if (StringUtil.nonNull(dueDate).length() > 0) {
					noticeVo.setToDoYn("Y");
				}
				
				List<FollowerVo> noticeMemberList = new ArrayList<FollowerVo>();
				for ( FollowerVo followerVo: feedVo.getFeedFollowerList()) {
					if (SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString().equals(followerVo.getFollowerType())) {
						noticeMemberList.add(followerVo);
					}
				}
				noticeVo.setNoticeFeedId(feedVo.getFeedId());
				noticeVo.setNoticeMemberList(noticeMemberList);
				notiArrList.add(noticeVo);
			}
		}
		
		return notiArrList;
	}
	
	/**
	 * del group feed noti list
	 * @param feedVo
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getDelGroupFeedNotiList(FeedVo feedVo) {
		List<NoticeVo> notiArrList = new ArrayList<NoticeVo>();
		List<FollowerVo> list = followerService.getFeedFollower(feedVo.getFeedId());
		String dueDate = null;
		for(FollowerVo fv : list) {
			if(StringUtil.nonNull(fv.getFollowerType()).toUpperCase().equals(SNSCodeMaster.FOLLOWER_TYPE.GROUP.name())) {
				GroupVo apiIntcGrpVo = groupService.getGroupById(fv.getFollowerId());
				dueDate = feedVo.getDueDate();
				NoticeVo noticeVo = new NoticeVo();
				noticeVo.setItemId(apiIntcGrpVo.getGroupId());
				noticeVo.setItemTitle(feedVo.getFeedTitle());
				noticeVo.setItemMsg(dueDate);
				noticeVo.setFromMemberId(feedVo.getRegMemberId());
				noticeVo.setGroupFeedYn("Y");
				if (dueDate != null && dueDate.length() > 0) {
					noticeVo.setToDoYn("Y");
				}  else if(SNSCodeMaster.FEED_TYPE.POLL.name().equals(feedVo.getFeedType())) {
					noticeVo.setPollYn("Y");
				}
				noticeVo.setNoticeFeedId(feedVo.getFeedId());
				notiArrList.add(noticeVo);
			}
		}
		
		return notiArrList;
	}
	
	/**
	 * download Group Feed
	 * @param h
	 * @return List<HashMap<String, Object>>
	 */
	public List<HashMap<String, Object>> selectFeedForFeedDownload(HashMap<String, Object> h) {
		List<HashMap<String, Object>> feeddownloadlist = feedMapper.selectFeedForFeedDownload(h);
		return feeddownloadlist;
	}

}