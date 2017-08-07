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
import org.uengine.sns.feed.service.FeedPollService;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.feed.vo.PollVo;
import org.uengine.sns.notice.vo.NoticeVo;

/**
 * 
 * FeedPollController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class FeedPollController extends ExceptionController {
	
	private static final Logger LOG = LoggerFactory.getLogger(FeedPollController.class);
	
	@Autowired
	FeedService feedService;
	
	@Autowired
	FeedPollService feedPollService;
	
	/**
	 * insert new Poll Info
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/polls", method = RequestMethod.POST)
	public @ResponseBody FeedVo add(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		
		long feddId = feedVo.getFeedId();
		FeedVo tmpFeedVo = null;
		if(feddId != 0) {
			tmpFeedVo = feedService.getFeed(HttpUtil.getLocaleString(request), feddId, 0);
			PollVo tmpPollVo = new PollVo();
			tmpPollVo.setFeedId(feddId);
			feedPollService.deletePollResultInfo(tmpPollVo);
			feedPollService.deletePollInfo(feedVo);
		}
		
		if(tmpFeedVo != null) {
			feedService.updateFeed(feedVo);
		} else {
			feedVo = feedService.insertFeed(HttpUtil.getLocaleString(request), feedVo);
		}
		
		feedVo = feedPollService.insertPollInfo(feedVo);
		
		// ADD 2015.11.25 Noti관련 추가 Start
		try {
			List<NoticeVo> notiArrList = feedService.getGroupFeedNotiList(feedVo);
			if(notiArrList.size() != 0) {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
			} else {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), feedVo.getFeedId());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), feedVo.getFeedTitle());
			}
		} catch (Exception ex ) {
			LOG.error("", ex);
		}
		// ADD 2015.11.25 Noti관련 추가 End	
		
		return feedVo;
	}
	
	/**
	 * insert new Poll Result Info
	 * @param pollVo
	 * @param List<PollVo>
	 */
	@RequestMapping(value = "/feeds/polls/results", method = RequestMethod.POST)
	public @ResponseBody List<PollVo> addResult(@RequestBody PollVo pollVo) {
		feedPollService.deletePollResultInfo(pollVo);
		return feedPollService.insertPollResultInfo(pollVo);
	}
	
	/**
	 * select Result Poll By Id
	 * @param feedId
	 * @param request
	 * @return List<PollVo>
	 */
	@RequestMapping(value = "/feeds/polls/results/{id}", method = RequestMethod.GET)
	public @ResponseBody List<PollVo> getResultPollById(@PathVariable("id") long feedId, HttpServletRequest request) {
		// ADD 2015.11.25 Noti관련 추가 Start
		try {
			FeedVo delFeedVo = feedService.getFeed(HttpUtil.getLocaleString(request), feedId, 0);
			List<NoticeVo> notiArrList = feedService.getDelGroupFeedNotiList(delFeedVo);
			if(notiArrList.size() != 0) {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.NOTICE_LIST.name(), notiArrList);
			} else {
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_ID.name(), delFeedVo.getFeedId());
				request.setAttribute(SNSCodeMaster.NOTI_ATTR.ITEM_TITLE.name(), delFeedVo.getFeedTitle());
			}
		} catch (Exception ex ) {
			LOG.error("", ex);
		}
		// ADD 2015.11.25 Noti관련 추가 End	
		return feedPollService.selectPollResult(feedId);
	}
	
	/**
	 * @param feedVo
	 */
	@RequestMapping(value = "/feeds/polls/list", method = RequestMethod.POST)
	public void deletePollResultList(@RequestBody FeedVo feedVo) {
		feedPollService.deletePollResultListInfo(feedVo);
	}

}