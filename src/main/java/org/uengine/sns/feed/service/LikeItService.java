package org.uengine.sns.feed.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.feed.mapper.LikeItMapper;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.LikeItVo;
import org.uengine.sns.member.service.MemberService;
import org.uengine.sns.member.vo.MemberVo;
import org.uengine.sns.notice.service.NoticeService;
import org.uengine.sns.noticeconfig.service.NoticeConfigService;

/**
 * 
 * LikeItService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("likeItService")
public class LikeItService {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MemberService.class);

	@Autowired
	LikeItMapper likeItMapper;
	
	@Autowired
	FeedService feedService;
	
	@Autowired
	FollowerService followerService;
	
	@Autowired
	NoticeService noticeService;
	
	@Autowired
	NoticeConfigService noticeConfigService;
	
	/**
	 * @param likeItVo
	 * @return int
	 */
	public int getLikeIt(LikeItVo likeItVo) {
		return likeItMapper.selectLikeIt(likeItVo);
	}
	
	/**
	 * 멤버별 즐겨찾기 리스트
	 * @param feedId
	 * @param lang
	 * @return List<MemberVo>
	 */
	public List<MemberVo> getLikeItMemberList(long feedId, String lang) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("feedId", feedId);
		map.put("lang", lang);
		return likeItMapper.selectLikeItMemberList(map);
	}
	
	/**
	 * 좋아요 등록/해제
	 * @param lang
	 * @param likeItVo
	 * @return FeedVo
	 */
	public FeedVo regLikeIt(String lang, LikeItVo likeItVo) {
		int cnt = likeItMapper.selectLikeIt(likeItVo);
		boolean likeItByMe = false;
		FeedVo fv = feedService.getFeed(lang, likeItVo.getFeedId(), likeItVo.getRegMemberId());
		
		if(cnt > 0) {
			likeItMapper.deleteLikeIt(likeItVo);
		} else {
			likeItVo.setRegDttm(new Date());
			likeItMapper.insertLikeIt(likeItVo);
			
			if(fv.getFeedId() == likeItVo.getFeedId()) {
				likeItByMe = true;
			}
			
		}
		
		likeItMapper.updateFeedLikeCnt(likeItVo);
		
		FeedVo feedVo = feedService.getFeed(lang, likeItVo.getFeedId(), likeItVo.getRegMemberId());
		if(likeItByMe) {
			
			feedVo.setLikeItByMe(1);
			// feedVo에서 pFeedId가 0보다 크다면 해당 pFeedId의 cmtLstRegDttm을 업데이트하고 0이라면 feedId의 cmtLstRegDttm을 업데이트 한다.
			Date currDate = new Date();
			if(feedVo.getpFeedId() > 0) {
				long pFeedId = feedVo.getpFeedId();
				feedVo.setFeedId(pFeedId);
			}
			
			feedVo.setCmtLstRegDttm(currDate);
			
		} else {
			feedVo.setLikeItByMe(0);
		}
		
		return feedVo;
		
	}
	
	/**
	 * 좋아요 등록/해제 카춘트
	 * @param likeItVo
	 * @return int
	 */
	public int getLikeItCount(LikeItVo likeItVo){
		return likeItMapper.selectLikeIt(likeItVo);
	}

}