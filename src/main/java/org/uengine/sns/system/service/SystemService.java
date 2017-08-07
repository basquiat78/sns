package org.uengine.sns.system.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.recent.service.RecentService;
import org.uengine.sns.system.mapper.SystemMapper;
import org.uengine.sns.system.vo.SystemVo;

/**
 * 
 * SystemService
 * <pre>
 * 	 <p>GroupWare로부터 제공받는 api로 </p>
 *   <p>커스터마이징 되어야 하는 영역</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("systemService")
public class SystemService {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(RecentService.class);

	@Autowired
	SystemMapper systemMapper;
	
	@Autowired
	FeedService feedService;
	
	/**
	 * 커스터마이징 영역
	 * @param lang
	 * @param systemVo
	 * @return List<FeedVo>
	 */
	public List<FeedVo> getSystemFeedList(String lang, SystemVo systemVo) {
		List<Long> feedIdList = systemMapper.selectSystemFeedList(systemVo);
		return feedService.getFeedMetaData(lang, 0, feedIdList, null);
	}
	
	/**
	 * 커스터마이징 영역
	 * @param systemVo
	 * @return List<GroupVo>
	 */
	public List<GroupVo> getSystemGroupList(SystemVo systemVo) {
		systemVo.setGroupName(StringUtils.replaceEach(systemVo.getGroupName(), new String[]{"%", "_"}, new String[]{"|%", "|_"}));
		return systemMapper.selectSystemGroupList(systemVo);
	}

	/**
	 * 커스터마이징 영역
	 * @return List<SystemVo
	 */
	public List<SystemVo> getCompanyList() {
		return systemMapper.selectSystemCompanyList();	
	}

}