package org.uengine.sns.feed.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.feed.mapper.FeedMapper;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.FollowerVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * FeedTodoService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("feedTodoService")
public class FeedToDoService {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(FeedToDoService.class);

	@Autowired
	FeedMapper feedMapper;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	FeedService feedService;

	@Autowired
	FeedInterfaceService feedInterfaceService;
	
	/**
	 * 할일 - 완료처리
	 * @param lang
	 * @param feedVo
	 * @return FeedVo
	 */
	public FeedVo completeToDoFeed(String lang, FeedVo feedVo) {
		
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		feedVo.setEndDate(sdf.format(now).toString().replaceAll("-", ""));
		feedMapper.completeToDoFeed(feedVo);
		
		FeedVo newCommentFeedVo = new FeedVo();
		newCommentFeedVo.setFeedType(SNSCodeMaster.FEED_TYPE.COMMENT.toString());
		newCommentFeedVo.setRegMemberId(feedVo.getRegMemberId());
		newCommentFeedVo.setpFeedId(feedVo.getFeedId());
		newCommentFeedVo.setFeedTitle("일정을 완료처리 했습니다.");
		newCommentFeedVo.setCmtLstSecFeedId(feedVo.getCmtLstSecFeedId());
		
		feedService.insertFeed(lang, newCommentFeedVo);
		
		FeedVo fv = feedService.getOneFeed(lang, feedVo.getFeedId(), 0);
		
		fv.setCommentFeedList( feedService.getFeedCommentList(lang, feedVo.getFeedId(), 1, feedVo.getCmtLstSecFeedId(), feedVo.getRegMemberId()) );
		feedVo.setDueDate(fv.getDueDate());
		feedInterfaceService.generateUpdateExternalTodoFeed(lang, feedVo);
		
		return fv;
		
	}
	
	/**
	 * 할일 - 미완료처리
	 * @param lang
	 * @param feedVo
	 * @return FeedVo
	 */
	public FeedVo incompleteToDoFeed(String lang, FeedVo feedVo) {
		feedVo.setEndDate("");
		feedMapper.incompleteToDoFeed(feedVo);
		
		FeedVo newCommentFeedVo = new FeedVo();
		newCommentFeedVo.setFeedType(SNSCodeMaster.FEED_TYPE.COMMENT.toString());
		newCommentFeedVo.setRegMemberId(feedVo.getRegMemberId());
		newCommentFeedVo.setpFeedId(feedVo.getFeedId());
		newCommentFeedVo.setFeedTitle("완료된 일정을 미완료 처리 했습니다.");
		newCommentFeedVo.setCmtLstSecFeedId(feedVo.getCmtLstSecFeedId());
		
		feedService.insertFeed(lang, newCommentFeedVo);
		
		FeedVo fv = feedService.getOneFeed(lang, feedVo.getFeedId(), 0);

		fv.setCommentFeedList( feedService.getFeedCommentList(lang, feedVo.getFeedId(), 1, feedVo.getCmtLstSecFeedId(), feedVo.getRegMemberId()) );
		feedVo.setDueDate(fv.getDueDate());
		feedInterfaceService.generateUpdateExternalTodoFeed(lang, feedVo);
		
		return fv;
		
	}
	
	/**
	 * 할일 - 만기일자 변경
	 */
	public FeedVo setFeedDueDate(String lang, FeedVo feedVo) {
		
		FeedVo olfFv = feedService.getOneFeed(lang, feedVo.getFeedId(), 0);
		
		boolean newOrExits = false;
		String oldDueDate = olfFv.getDueDate()==null?"": olfFv.getDueDate().substring(0,4) + "-" + olfFv.getDueDate().substring(4,6) + "-"+ olfFv.getDueDate().substring(6,8);
		if(!"".equals(oldDueDate)) newOrExits = true;
		String newDuedate = feedVo.getDueDate().substring(0,4) + "-" + feedVo.getDueDate().substring(4,6) + "-"+ feedVo.getDueDate().substring(6,8);
		feedMapper.setFeedDueDate(feedVo);
		
		String commentFeedTitle = "새 일정을 추가했습니다.";
		if(newOrExits) {
			commentFeedTitle = "완료예정일 " + oldDueDate + "에서 " + newDuedate + "로 변경되었습니다.";
		}
		
		FeedVo newCommentFeedVo = new FeedVo();
		newCommentFeedVo.setFeedType(SNSCodeMaster.FEED_TYPE.COMMENT.toString());
		newCommentFeedVo.setRegMemberId(feedVo.getRegMemberId());
		newCommentFeedVo.setpFeedId(feedVo.getFeedId());
		newCommentFeedVo.setFeedTitle(commentFeedTitle);
		newCommentFeedVo.setpMemberId(feedVo.getRegMemberId());
		newCommentFeedVo.setCmtLstSecFeedId(feedVo.getCmtLstSecFeedId());
		
		feedService.insertFeed(lang, newCommentFeedVo);
		
		FeedVo fv = feedService.getOneFeed(lang, feedVo.getFeedId(), 0);
		
		String dueDate = feedVo.getDueDate() == null ? "" : feedVo.getDueDate().replace("-", "");
		if(dueDate.length() >= 8 && feedVo.isToDoExternal() == false) {
			try {
				
				long regMemberId = fv.getRegMemberId();
				if(regMemberId == 0) {
					throw new SNSServiceException("등록할 멤버 정보가 없습니다.");
				}
				
				/** 1. 멤버 정보 검색 */
				MemberVo memberVo = memberService.getMemberById(lang, regMemberId);
				
				List<FollowerVo> feedFollowerList = feedService.selectFeedFollowerList(lang, feedVo.getFeedId());
				
				if(feedFollowerList != null) {
					for(FollowerVo f : feedFollowerList) {
						if(f.getFollowerType().equals("GROUP")) {
							feedVo.setSnsGroupId(f.getFollowerId());
						}
					}
				}

				feedVo.setMemberVo(memberVo);
				feedVo.setFeedTitle(fv.getFeedTitle());
				
				feedInterfaceService.generateUpdateExternalTodoFeed(lang, feedVo);
				fv.setCommentFeedList( feedService.getFeedCommentList(lang, feedVo.getFeedId(), 1, feedVo.getCmtLstSecFeedId(), feedVo.getRegMemberId()) );
				
			} catch (Exception e) {
				// 그룹웨어 할일 등록 시 에러
				e.printStackTrace();
			}
		}
		
		return fv;
	}

}