package org.uengine.sns.notice.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMethod;
import org.uengine.sns.common.code.ActType;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.FeedRestful;
import org.uengine.sns.feed.mapper.FeedMapper;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.service.FollowerService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.FollowerVo;
import org.uengine.sns.group.GroupRestful;
import org.uengine.sns.group.service.GroupFollowerService;
import org.uengine.sns.group.service.GroupService;
import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.mapper.NoticeMapper;
import org.uengine.sns.notice.vo.NoticeVo;
import org.uengine.sns.noticeconfig.service.NoticeConfigService;
import org.uengine.sns.noticeconfig.vo.NoticeConfigVo;
import org.uengine.sns.openapi.service.PushService;

/**
 * 
 * NoticeService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("noticeService")
public class NoticeService {
	
	private static final Logger LOG = LoggerFactory.getLogger(NoticeService.class);

	@Autowired
	NoticeMapper noticeMapper;

	@Autowired
	FeedService feedService;
	
	@Autowired
	FeedMapper feedMapper;
	
	@Autowired
	NoticeConfigService noticeConfigService;

	@Autowired
	PushService pushService;

	@Autowired
	MessageSource messageSource;
	
	@Autowired
	MemberService memberService;

	@Autowired
	FollowerService followerService;

	@Autowired
	GroupService groupService;
	
	@Autowired
	GroupFollowerService groupFollowerService;
	
	/**
	 * select all noticeList
	 * @param scv
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getNoticeList(SearchContextVo scv) {
		return noticeMapper.selectNoticeList(scv);
	}
	
	/**
	 * widget용 알림 카운트(5건)
	 * @param scv
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getWidgetNoticeList(SearchContextVo scv) {
		return noticeMapper.selectWidgetNoticeList(scv);
	}

	/**
	 * dateStr 보다 크거나 같은 시간에 알림이 있는 사용자 목록
	 * yyyyMMddHHmmss 형태의 날짜 포맷 반환
	 * @param dateStr
	 * @return List<Long>
	 */
	public List<Long> getNoticeMembersByDate(String dateStr) {
		return noticeMapper.selectNoticeMembersByDate(dateStr);
	}

	/**
	 * dateStr 보다 크거나 같은 시간에 알림이 있는 사용자 목록
	 * yyyyMMddHHmmss 형태의 날짜 포맷
	 * @param dateStr
	 * @return List<String>
	 */
	public List<String> getNoticeUsersByDate(String dateStr) {
		return noticeMapper.selectNoticeUsersByDate(dateStr);
	}
	
	/**
	 * select noticeList by memberId
	 * @param memberId
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getNoticeById(long memberId) {
		return noticeMapper.selectNoticeById(memberId);
	}
	
	/**
	 * select total noticeList By Synckey
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getTotalNoticeListBySynckey(NoticeVo noticeVo) {
		return noticeMapper.selectTotalNoticeListBySynckey(noticeVo);
	}
	
	/**
	 * noti user 알람 카운트
	 * @param noticeVo
	 * @return int
	 */
	public int getNoticeUsersByDateCount(NoticeVo noticeVo) {
		return noticeMapper.selectNoticeUserByDateCount(noticeVo);
	}
	
	/**
	 * 그룹웨어 유저아이디로 알림 목록 검색
	 * @param userId
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getNoticeBySynckey(String userId) {
		return noticeMapper.selectNoticeBySynckey(userId);
	}
	
	/**
	 * @param lang
	 * @param memberId
	 * @param regDttm
	 * @return Map<Object, Object>
	 */
	public Map<Object, Object> getNoticeByRegDttm(String lang, long memberId, long regDttm) {
		
		NoticeVo noticeVo = new NoticeVo();
		noticeVo.setToMemberId(memberId);
		noticeVo.setFromMemberId(memberId);
		Date date = new Date();
		date.setTime(regDttm);
		noticeVo.setRegDttm(date);
		List<NoticeVo> noticeList = noticeMapper.selectNoticeByRegDttm(noticeVo);
		List<Map<Long, String>> feedTypeList = new ArrayList<Map<Long, String>>();
		
		List<Long> feedIdList = new ArrayList<Long>();
		for(NoticeVo notice : noticeList) {
			
			if(notice.getItemType().equals(SNSCodeMaster.ITEM_TYPE.GROUP.toString())) {
				notice.setRegDttm(date);
				List<Long> groupFeedIdList = feedMapper.selectGroupFeedIdListByRegDttm(notice);
				for(long groupFeedId : groupFeedIdList) {
					feedIdList.add(groupFeedId);
					Map<Long, String> typeMap = new HashMap<Long, String>();
					typeMap.put(groupFeedId, notice.getActType());
					feedTypeList.add(typeMap);
				}
			} else {
				feedIdList.add(notice.getItemId());
				Map<Long, String> typeMap = new HashMap<Long, String>();
				typeMap.put(notice.getItemId(), notice.getActType());
				feedTypeList.add(typeMap);
			}
			
		}

		return feedService.getFeedMetaDataForWebsocket(lang, memberId, feedIdList, feedTypeList);

	}
	
	/**
	 * GNB에서 사용하는 개인 최신 현황
	 * @param userId
	 * @return List<NoticeVo>
	 */
	public List<NoticeVo> getMemberSynckeyRecentActList(String userId) {
		return noticeMapper.selectRecentActListBySynckey(userId);
	}

	/**
	 * @param isRead
	 * @param userId
	 */
	public void updateNoticeRead(int isRead, String userId) {
		MemberVo memberVo = memberService.getMemberBySynckey("ko", userId);
		updateNoticeRead(isRead, memberVo.getMemberId());
	}
	
	/**
	 * isRead 1 이면 읽음 처리
	 * @param isRead
	 * @param toMemberId
	 */
	public void updateNoticeRead(int isRead, long toMemberId) {
		NoticeVo noticeVo = new NoticeVo();
		noticeVo.setIsRead(isRead);
		noticeVo.setToMemberId(toMemberId);
		noticeMapper.updateNoticeRead(noticeVo);
	}
	
	/**
	 * insert notice info
	 * @param noticeVo
	 * @return NoticeVo
	 */
	public NoticeVo insertNotice(NoticeVo noticeVo) {
		Date now = new Date();
		noticeVo.setRegDttm(now);
		noticeMapper.insertNotice(noticeVo);
		return noticeVo;
	}
	
	/**
	 * @param noticeVo
	 * @param actType
	 * @param mobileMsgType
	 * @param isMemberRemove
	 * @return NoticeVo
	 */
	public NoticeVo insertNoticeByMemberId(NoticeVo noticeVo, ActType actType, String mobileMsgType, boolean isMemberRemove) {
		List<NoticeConfigVo> notiConfigList = noticeConfigService.getNoticeConfigByMemberVo(noticeVo);
		if(isMemberRemove) {
			noticeVo.setFollowerType("TEMP_FTYPE_REMOVE_MEMBER");
		}
		return insertNoticeByNotiConfig(noticeVo, actType, notiConfigList, mobileMsgType);
	}
	
	/**
	 * @param noticeVo
	 * @param actType
	 * @param mobileMsgType
	 * @return NoticeVo
	 */
	public NoticeVo insertNoticeByFeedId(NoticeVo noticeVo, ActType actType, String mobileMsgType) {
		List<NoticeConfigVo> notiConfigList = noticeConfigService.getNoticeConfigByFeedFollower(noticeVo);
		noticeVo.setFollowerType("");
		return insertNoticeByNotiConfig(noticeVo, actType, notiConfigList, mobileMsgType);
	}

	/**
	 * @param noticeVo
	 * @param actType
	 * @param mobileMsgType
	 * @return NoticeVo
	 */
	public NoticeVo insertNoticeByGroupId(NoticeVo noticeVo, ActType actType, String mobileMsgType) {
		List<NoticeConfigVo> notiConfigList = noticeConfigService.getNoticeConfigByGroupFollower(noticeVo);
		noticeVo.setFollowerType("");
		return insertNoticeByNotiConfig(noticeVo, actType, notiConfigList, mobileMsgType);
	}
	
	/**
	 * @param noticeVo
	 * @param actType
	 * @param notiConfigList
	 * @param mobileMsgType
	 * @return NoticeVo
	 */
	private NoticeVo insertNoticeByNotiConfig(NoticeVo noticeVo, ActType actType, List<NoticeConfigVo> notiConfigList, String mobileMsgType) {
		
		Date now = new Date();
		noticeVo.setRegDttm(now);
		
		String notiMemIds = "";
		if(notiConfigList != null) {
			String mobileTargetIds = "";
			String itemTitle = StringUtils.left(StringUtils.defaultString(noticeVo.getItemTitle()), 20);
			
			LOG.debug("그룹이름 : " + noticeVo.getGroupName());

			Object [] msgArgs = null;
			
			if(actType == ActType.GROUP_FOLLOWER_REG) {
				// 그룹원 등록인 경우 메시지
				msgArgs = new String[] {noticeVo.getToMemberName(), noticeVo.getFromMemberName(), noticeVo.getGroupName()};
			} else {
				if(noticeVo.getItemMsg() == null || noticeVo.getItemMsg().trim().equals("")) {
					msgArgs = new String[] {noticeVo.getFromMemberName(), itemTitle, noticeVo.getGroupName()};
				} else {
					msgArgs = new String[] {noticeVo.getFromMemberName(), itemTitle, noticeVo.getItemMsg(), noticeVo.getGroupName()};
				}
			}
			
			String msgKr = messageSource.getMessage(actType.getMessageCode(), msgArgs, Locale.KOREAN);
			String msgEn = messageSource.getMessage(actType.getMessageCode(), msgArgs, Locale.ENGLISH);
			String msgZh = messageSource.getMessage(actType.getMessageCode(), msgArgs, Locale.CHINESE);
			
			noticeVo.setNoticeContent(msgKr);
			noticeVo.setNoticeContentKo(msgKr);
			noticeVo.setNoticeContentEn(msgEn);
			noticeVo.setNoticeContentZh(msgZh);

			String mobileContents  = msgKr + "|" + msgEn + "|" + msgZh;
			String apiNotiExcYn = null;
			
			for(int i=0; i< notiConfigList.size(); i++) {
				NoticeConfigVo ncVo = notiConfigList.get(i);
				apiNotiExcYn = ncVo.getApiNoticeExcYn();	
				
				if(i == 0 && noticeVo.getItemType().equals("GROUP") &&
						!noticeVo.getFollowerType().equals("TEMP_FTYPE_REMOVE_MEMBER")) {
					noticeVo.setFollowerId(noticeVo.getItemId());
					noticeVo.setFollowerType(noticeVo.getItemType());
				} else {
					noticeVo.setFollowerId(0);
					noticeVo.setFollowerType("");
				}
				
				noticeVo.setIsRead(0);
				noticeVo.setToMemberId(ncVo.getMemberId());
				noticeVo.setItemTitle(itemTitle);
				
				notiMemIds += "|" + noticeVo.getToMemberId();
				// toMember 과 fromMember 이 같으면 읽음처리하여 등록함.
				if(noticeVo.getToMemberId() == noticeVo.getFromMemberId()) {
					noticeVo.setIsRead(1);
				} else {
					if ("Y".equals(apiNotiExcYn) && mobileTargetIds.indexOf(ncVo.getSyncKey() + "|") < 0) {
						mobileTargetIds += (ncVo.getSyncKey() + "|");
					}
				}
				
				try {
					if ("N".equals(apiNotiExcYn)) {
						noticeVo.setIsRead(1);
					}
					// 알림 데이터 생성
					noticeMapper.insertNotice(noticeVo);
					
				} catch(Exception e) {
					LOG.error("", e);
				}
			}
			
			LOG.info("\n\n\n************************************ j.h kim noticeVo:" + noticeVo.toString());
			LOG.info("mobileMsgType :" + mobileMsgType);
			LOG.info("push bef mobileTargetIds :" + mobileTargetIds);
			
			boolean isPushActType = true;
			if(noticeVo.getActType().equals(ActType.FEED_DEL.toString()) 
					|| noticeVo.getActType().equals(ActType.TODO_DEL.toString()) 
					|| noticeVo.getActType().equals(ActType.POLL_DEL.toString())) {
				isPushActType = false;
			}
			
			
			String appUri = String.valueOf(noticeVo.getItemId());
			if("Y".equals(noticeVo.getGroupFeedYn())) {	
				if(noticeVo.getActType().equals(ActType.GROUP_FEED_REG.toString()) 
						|| noticeVo.getActType().equals(ActType.GROUP_POLL_REG.toString())
						|| noticeVo.getActType().equals(ActType.GROUP_TODO_REG.toString())) {
					appUri = String.valueOf(noticeVo.getNoticeFeedId());
					Map<String, String> paramMap = new HashMap<String, String>();
					paramMap.put("itemId", String.valueOf(noticeVo.getNoticeFeedId()));
					paramMap.put("itemType",SNSCodeMaster.ITEM_TYPE.FEED.toString());
					paramMap.put("followerType",SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString());
					
					List<FollowerVo> followerList = followerService.getFollowerDataList(paramMap);
					noticeVo.setNoticeMemberList(followerList);
					noticeVo.setItemType(SNSCodeMaster.ITEM_TYPE.FEED.toString());
					noticeVo.setItemId(noticeVo.getNoticeFeedId());
					
					if(followerList.size() > 0) {
						List<NoticeConfigVo> notiMemConfigList = noticeConfigService.getNoticeConfigByMemberVo(noticeVo);
						for(NoticeConfigVo ncVo : notiMemConfigList) {
							apiNotiExcYn = ncVo.getApiNoticeExcYn();	
							noticeVo.setToMemberId(ncVo.getMemberId());
							// toMember 과 fromMember 이 같으면 읽음처리하여 등록함.
							if(noticeVo.getToMemberId() != noticeVo.getFromMemberId()) {
								if("Y".equals(apiNotiExcYn) && mobileTargetIds.indexOf(ncVo.getSyncKey() + "|") < 0) {
									mobileTargetIds += (ncVo.getSyncKey() + "|");
								}
								
								if(notiMemIds.indexOf("|" + ncVo.getMemberId() + "|") < 0) {
									if("N".equals(apiNotiExcYn)) {
										noticeVo.setIsRead(1);
									}
									// 알림 데이터 생성
									noticeMapper.insertNotice(noticeVo);
								}
							} else {
								if(notiMemIds.indexOf("|" + ncVo.getMemberId() + "|") < 0) {
									if(noticeVo.getToMemberId() ==   ncVo.getMemberId()) {
										noticeVo.setIsRead(1);
									}
									// 알림 데이터 생성
									noticeMapper.insertNotice(noticeVo);
								}
							}
						}
					}
				}
			}
			
			if(isPushActType) {
				if(mobileMsgType != null && mobileTargetIds.length() > 0) {
					LOG.info("\n\n\n########################### check mobileTargetIds :" + mobileTargetIds);
					// 모바일 push 데이터 생성
					pushService.pushPnsMessage(mobileTargetIds, mobileMsgType, mobileContents, appUri);
				}
			}
			LOG.info("\n\n\n************************************");
		}
		return noticeVo;
	}
	
	/**
	 * update notice Info
	 * @param noticeVo
	 * @return NoticeVo
	 */
	public NoticeVo updateNotice(NoticeVo noticeVo) {
		noticeMapper.updateNotice(noticeVo);
		return noticeVo;
	}
	
	/**
	 * delete notice Info
	 * @param noticeId
	 */
	public void deleteNotice(long noticeId){
		noticeMapper.deleteNotice(noticeId);
	}

	/**
	 * @param memberId
	 * @return NoticeVo
	 */
	public NoticeVo getNoticeCntById(long memberId) {
		return noticeMapper.selectNoticeCntById(memberId);
	}

	/**
	 * @param userId
	 * @return NoticeVo
	 */
	public NoticeVo getNoticeCntByUserId(String userId) {
		MemberVo mv = memberService.getMemberBySynckey("ko", userId);
		return getNoticeCntById(mv.getMemberId());
	}
	
	/**
	 * 알림실행
	 * @param noticeVo
	 * @param pathPattern
	 * @param method
	 */
	public void excuteNoticeInfo(NoticeVo noticeVo, String pathUri, String method) {
		
		ActType actType = null;
		String mobileMsgType = null;
		
		// 피드 관련 알림
		if("Y".equals(noticeVo.getGroupFeedYn())) {
			noticeVo.setItemType(SNSCodeMaster.ITEM_TYPE.GROUP.name());
			if(method.equals(RequestMethod.POST.name())) {
				
				switch(pathUri) {
				case FeedRestful.BASE_POLL:
					actType = ActType.GROUP_POLL_REG;
					mobileMsgType = "106";
					break;
				case FeedRestful.FEED_TYPE_GENERAL:
				case FeedRestful.BASE_FEED:
				case FeedRestful.FEED_INTERFACE_BOARD:
				case FeedRestful.FEED_INTERFACE_SHAREPOINT:
					if("Y".equals(noticeVo.getToDoYn())) {
						actType = ActType.GROUP_TODO_REG;
					} else if ("Y".equals(noticeVo.getPollYn())) {
						actType = ActType.GROUP_POLL_REG;
					} else {
						actType = ActType.GROUP_FEED_REG;
					}
					mobileMsgType = "106";
					break;
				case FeedRestful.FEED_TYPE_TODO:
					actType = ActType.GROUP_TODO_REG;
					mobileMsgType = "106";
					break;
				default:
					break;
				}
			} else if(method.equals(RequestMethod.DELETE.name())) {
				switch(pathUri) {
				case FeedRestful.BASE_POLL_RESULT  + "/{id}":
					actType = ActType.POLL_DEL;
					mobileMsgType = "106";
					break;
				case FeedRestful.BASE_FEED  + "/{id}":
					if("Y".equals(noticeVo.getToDoYn())) {
						actType = ActType.TODO_DEL;
					} else if ("Y".equals(noticeVo.getPollYn())) {
						actType = ActType.POLL_DEL;
					} else {
						actType = ActType.FEED_DEL;
					}
					mobileMsgType = "106";
					break;
				default:
					break;
				}
				
			}
			
		// 피드 관련 알림
		} else if(pathUri.startsWith(FeedRestful.BASE_FEED)) {
			noticeVo.setItemType(SNSCodeMaster.ITEM_TYPE.FEED.name());
			
			if(method.equals(RequestMethod.POST.name())) {
				
				switch(pathUri) {
				case FeedRestful.BASE_POLL:
					actType = ActType.POLL_REG;
					mobileMsgType = "106";
					break;
				case FeedRestful.FEED_TYPE_TODO:
					actType = ActType.TODO_REG;
					mobileMsgType = "106";
					break;
				case FeedRestful.BASE_FEED:
				case FeedRestful.FEED_INTERFACE_BOARD:
				case FeedRestful.FEED_INTERFACE_SHAREPOINT:
				case FeedRestful.BASE_FEED_TODO_EXTERNAL:
					if("Y".equals(noticeVo.getToDoYn())) {
						actType = ActType.TODO_REG;
					} else if ("Y".equals(noticeVo.getPollYn())) {
						actType = ActType.POLL_REG;
					} else {
						actType = ActType.FEED_REG;
					}
					mobileMsgType = "106";
					break;
					
				case FeedRestful.FEED_TYPE_GENERAL:
					actType = ActType.FEED_REG;
					mobileMsgType = "106";
					break;
				case FeedRestful.BASE_FOLLOWER:		// 팔로워 등록
					actType = ActType.FEED_FOLLOWER_REG;
					mobileMsgType = "106";
					break;
				case FeedRestful.FEED_TYPE_SHARE:
					actType = ActType.FEED_FOLLOWERED_REG;
					mobileMsgType = "106";
					break;
				case FeedRestful.FEED_TYPE_NOTICE:
					actType = ActType.NOTICE_REG;
					mobileMsgType = "100";
					break;
				case FeedRestful.FEED_INTERFACE_APPROVAL:
					actType = ActType.APPROVAL_REG;
					mobileMsgType = "104";
					break;
				case FeedRestful.BASE_LIKEIT:
					actType = ActType.OFW_LIKEIT_REG;
//					mobileMsgType = "";
					break;
				case FeedRestful.FEED_TYPE_COMMENT:
				case FeedRestful.FEED_INTERFACE_APPROVAL_COMPLETE:	// 전자결재 승인/반려시 댓글
					actType = ActType.FEED_COMMENT_REG;
					mobileMsgType = "105";
					break;

				default:
					break;
				}
				
			} else if(method.equals(RequestMethod.PUT.name())) {

				switch(pathUri) {
				case FeedRestful.TODO_COMPLETE:
					actType = ActType.TODO_COMPLETE;
					break;
				case FeedRestful.SET_DUEDATE:
					actType = ActType.TODO_CHANGE;
					break;

				default:
					break;
				}
				
			} else if(method.equals(RequestMethod.DELETE.name())) {

				switch(pathUri) {
				case FeedRestful.BASE_POLL_RESULT  + "/{id}":
					actType = ActType.POLL_DEL;
					mobileMsgType = "106";
					break;
				case FeedRestful.BASE_FEED + "/{id}":
					if("Y".equals(noticeVo.getToDoYn())) {
						actType = ActType.TODO_DEL;
					} else if ("Y".equals(noticeVo.getPollYn())) {
						actType = ActType.POLL_DEL;
					} else {
						actType = ActType.FEED_DEL;
					}
					mobileMsgType = "106";
					break;

				default:
					break;
				}
				
			}
			
		} else if(pathUri.startsWith(GroupRestful.BASE_GROUP)) {		// 그룹 관련 알림
			noticeVo.setItemType(SNSCodeMaster.ITEM_TYPE.GROUP.name());
			
			GroupVo groupVo = groupService.getGroupById(noticeVo.getItemId());
			noticeVo.setGroupName(groupVo.getGroupName());
			
			if(method.equals(RequestMethod.POST.name())) {
				
				switch(pathUri) {
				case GroupRestful.BASE_GROUP:
					actType = ActType.GROUP_REG;
					mobileMsgType = "101";
					break;
				case GroupRestful.GFOLLOWER_INVITE_WITHEMAIL:		// ADD 2015.10.22 j.h kim 그룹 사용자 추가시
				case GroupRestful.BASE_GFOLLOWER_URL_WITHLIST:		// ADD 2015.10.22 j.h kim 그룹 사용자 추가시
					actType = ActType.GROUP_FOLLOWER_REG;
					mobileMsgType = "101";
					break;
				case GroupRestful.BASE_GFOLLOWER_URL:
					actType = ActType.GROUP_FOLLOWER_REG;
					mobileMsgType = "101";
					break;

				default:
					break;
				}
				
			} else if(method.equals(RequestMethod.PUT.name())) {
				// 없음
			} else if(method.equals(RequestMethod.DELETE.name())) {

				switch(pathUri) {
				case GroupRestful.BASE_GROUP:
					actType = ActType.GROUP_DEL;
					break;
				case GroupRestful.BASE_GFOLLOWER_URL:
				case GroupRestful.GFOLLOWER_BYSELF_URL:		// 그룹 탈퇴
					actType = ActType.GROUP_FOLLOWER_DEL;
					break;
				case GroupRestful.GFOLLOWER_BYMNG_URL:		// 그룹 강퇴
					actType = ActType.GROUP_FOLLOWER_FORCEDEL;
					mobileMsgType = "102";
					break;

				default:
					break;
				}
				
			}
		}
		
		if(actType != null) {
			noticeVo.setActType(actType.name());
			try {
				if("Y".equals(noticeVo.getGroupFeedYn()) || pathUri.startsWith(GroupRestful.BASE_GROUP)) {	
					insertNoticeByGroupId(noticeVo, actType, mobileMsgType);
				} else {
					insertNoticeByFeedId(noticeVo, actType, mobileMsgType);
				}
				
			} catch(Exception e) {	// 에러 무시
				LOG.error("", e);
			}
		}
	}
	
	/**
	 * insert Tomorrow Todo
	 */
	public void insertTomorrowTodo() {
		Map<Object, Object> m = new HashMap<Object, Object>();
		SearchContextVo scv = new SearchContextVo(m);
		List<FeedVo> selectTomorrowTodoFeedList = feedService.selectTomorrowToDoFeedList(scv);
		for(FeedVo fv : selectTomorrowTodoFeedList) {
			insertTomorrowTodo(fv);
		}
	}
	
	/**
	 * @param fv
	 */
	private void insertTomorrowTodo(FeedVo fv) {
		
		List<FollowerVo> getFollowerList = followerService.getFeedFollower(fv.getFeedId());
		
		String feedId = fv.getFeedId() + "";

		String itemTitle = StringUtils.left(fv.getFeedTitle() , 20);
		Object [] msgArgs = { itemTitle };
		String msgKr = messageSource.getMessage(ActType.TOMORROW_TODO.getMessageCode(), msgArgs, Locale.KOREAN);
		String msgEn = messageSource.getMessage(ActType.TOMORROW_TODO.getMessageCode(), msgArgs, Locale.ENGLISH);
		String msgZh = messageSource.getMessage(ActType.TOMORROW_TODO.getMessageCode(), msgArgs, Locale.CHINESE);

		String contents = msgKr + "|" + msgEn + "|" + msgZh;

		String targetIds = "";
		for(FollowerVo followerVo : getFollowerList) {
			if(followerVo.getFollowerType().equals("GROUP")) {
				
				List<GroupFollowerVo> selectGroupFollowerListByCondition = groupFollowerService.getGroupFollowerById("ko", followerVo.getFollowerId());
				
				for(GroupFollowerVo gfv : selectGroupFollowerListByCondition) {
					
					NoticeConfigVo nv = noticeConfigService.getNoticeConfigByMemberId(gfv.getMemberId());
					if(nv.getIsToDoComing() == 1) {
						NoticeVo noticeVo = new NoticeVo();
						noticeVo.setItemType("GROUP");
						noticeVo.setItemId(gfv.getGroupId());
						
						MemberVo mv = memberService.getMemberById("ko", gfv.getMemberId());
						String syncKey = mv.getSyncKey();
						if(targetIds.indexOf(syncKey + "|") < 0) {
							targetIds += syncKey + "|";
						}
						
						noticeVo.setNoticeContent(msgKr);
						noticeVo.setActType(ActType.TOMORROW_TODO.toString());
						noticeVo.setIsRead(0);
						noticeVo.setToMemberId(gfv.getMemberId());
						noticeVo.setFromMemberId(fv.getRegMemberId());
						noticeVo.setNoticeContentKo(msgKr);
						noticeVo.setNoticeContentEn(msgEn);
						noticeVo.setNoticeContentZh(msgZh);
						
						insertNotice(noticeVo);
					}
				}
				
				targetIds = targetIds.substring(0,targetIds.length()-1);
				
			} else {
				
				NoticeConfigVo nv = noticeConfigService.getNoticeConfigByMemberId(followerVo.getFollowerId());
				if(nv.getIsToDoComing() == 1) {
					NoticeVo noticeVo = new NoticeVo();
					noticeVo.setItemType(SNSCodeMaster.ITEM_TYPE.FEED.name());
					noticeVo.setItemId(fv.getFeedId());
					
					long followerId = followerVo.getFollowerId();

					MemberVo mv = memberService.getMemberById("ko", followerId);
					String syncKey = mv.getSyncKey();
					if(targetIds.indexOf(syncKey + "|") < 0) {
						targetIds += syncKey + "|";
					}
					
					noticeVo.setNoticeContent(msgKr);
					noticeVo.setActType(ActType.TOMORROW_TODO.toString());
					noticeVo.setIsRead(0);
					noticeVo.setToMemberId(followerVo.getFollowerId());
					noticeVo.setFromMemberId(fv.getRegMemberId());
					noticeVo.setNoticeContentKo(msgKr);
					noticeVo.setNoticeContentEn(msgEn);
					noticeVo.setNoticeContentZh(msgZh);
					
					insertNotice(noticeVo);
				}
			}
		}
		
		pushService.pushPnsMessage(targetIds, "103", contents, feedId);
		
	}

}