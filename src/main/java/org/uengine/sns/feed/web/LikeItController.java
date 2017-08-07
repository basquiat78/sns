package org.uengine.sns.feed.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.service.LikeItService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.LikeItVo;
import org.uengine.sns.member.vo.MemberVo;

/**
 * 
 * FollowerController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class LikeItController extends ExceptionController {
	
	private static final Logger LOG = LoggerFactory.getLogger(LikeItController.class);
	
	@Autowired
	FeedService feedService;
	
	@Autowired
	LikeItService likeItService;
	
	/**
	 * 피드별 좋아요 멤버리스트
	 */
	@RequestMapping(value = "/feeds/likeits/{id}", method = RequestMethod.GET)
    public @ResponseBody List<MemberVo> getFeedDetail(@PathVariable("id") long feedId, HttpServletRequest request) {
		return likeItService.getLikeItMemberList(feedId, HttpUtil.getLocaleString(request));
	}
	
	
	/**
	 * 좋아요 등록/해제
	 */
	@RequestMapping(value = "/feeds/likeits", method = RequestMethod.POST)
	public @ResponseBody FeedVo addDel(@RequestBody LikeItVo likeItVo, HttpServletRequest request) {
		
		// ADD 2015.10.23 Noti관련 추가 Start	
		try {
			int cnt = likeItService.getLikeItCount(likeItVo);
			if(cnt == 0) {
				FeedVo feedVo = feedService.getFeed(HttpUtil.getLocaleString(request), likeItVo.getFeedId(), 0);
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedVo.getFeedId());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedVo.getFeedTitle());
			}
		} catch (Exception ex ) {
			LOG.error("", ex);
		}
		// ADD 2015.10.23 Noti관련 추가 End
		
		return likeItService.regLikeIt(HttpUtil.getLocaleString(request), likeItVo);
	}

}