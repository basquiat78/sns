package org.uengine.sns.recent.web;

import java.util.List;

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
import org.uengine.sns.recent.service.RecentService;
import org.uengine.sns.recent.vo.RecentVo;

/**
 * 
 * RecentController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class RecentController extends ExceptionController {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(RecentController.class);
	
	@Autowired
	public RecentService recentService;
	
	/**
	 * select All Recent List
	 * @param regMemberId
	 * @return List<RecentVo>
	 */
	@RequestMapping(value = "/recents/{id}", method = RequestMethod.GET)
	public @ResponseBody List<RecentVo> findAll(@PathVariable("id") long regMemberId) {
		return recentService.getRecentList(regMemberId);
	}
	
	/**
	 * insert new Recent Info
	 * @param recentVo
	 */
	@RequestMapping(value = "/recents", method = RequestMethod.POST)
	public void addRecent(@RequestBody RecentVo recentVo) {
		recentService.insertRecent(recentVo);
	}
	
	/**
	 * update Recent Info
	 * @param regMemberId
	 * @param recentVo
	 */
	@RequestMapping(value = "/recents", method = RequestMethod.PUT)
	public void updateRecent(@PathVariable("id") long regMemberId, @RequestBody RecentVo recentVo) {
		// @RequestBody로 넘어온 RecentVo객체의 memberId null체크 및 @PathVariable로 넘어온 파라미터와의 값 비교
		recentService.updateRecent(recentVo);
	}
	
	/**
	 * delete Recent Info
	 * @param regMemberId
	 */
	@RequestMapping(value = "/recents/{id}", method = RequestMethod.DELETE)
	public void deleteRecent(@PathVariable("id") long regMemberId) {
		recentService.deleteRecent(regMemberId);
	}

}