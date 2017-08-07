package org.uengine.sns.feed.web;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.uengine.sns.common.ExceptionController;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.HttpUtil;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.FeedVo;

/**
 * 
 * FeedShareController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class FeedShareController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(FeedShareController.class);
	
	@Autowired
	FeedService feedService;
	
	/**
	 * FEED 등록(공유)
	 * @param feedVo
	 * @param request
	 * @return FeedVo
	 */
	@RequestMapping(value = "/feeds/share", method=RequestMethod.POST)
	public @ResponseBody FeedVo addFeedShare(@RequestBody FeedVo feedVo, HttpServletRequest request) {
		feedVo.setFeedType(SNSCodeMaster.FEED_TYPE.SHARE.toString());
		return feedService.shareFeed(HttpUtil.getLocaleString(request), feedVo, request.getContextPath());
	}

}