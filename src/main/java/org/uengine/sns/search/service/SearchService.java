package org.uengine.sns.search.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.openapi.service.SharePointService;
import org.uengine.sns.openapi.vo.SharePointIntgSearchVo;
import org.uengine.sns.search.vo.SearchVo;

/**
 * 
 * SearchService
 * <pre>
 * 	 <p>GroupWare로부터 제공받는 api로 </p>
 *   <p>커스터마이징 되어야 하는 영역</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("searchService")
public class SearchService {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(SearchService.class);
	
	@Autowired 
	FeedService feedService;
	
	@Autowired 
	SharePointService sharePointService;
	
	/**
	 * 커스터마이징 영역
	 * @param lang
	 * @param sessionMemberId
	 * @param keyword
	 * @param category
	 * @param type
	 * @param userId
	 * @param groupId
	 * @return List<FeedVo>
	 */
	public List<FeedVo> getFeedsSearchBySharePoint(String lang, long sessionMemberId, String keyword, String category, String type, String userId, String groupId) {
		
		SharePointIntgSearchVo sharePointIntgSearchVo = new SharePointIntgSearchVo();
		sharePointIntgSearchVo.setCategory(category);
		sharePointIntgSearchVo.setType(type);
		sharePointIntgSearchVo.setKeyword(keyword);
		sharePointIntgSearchVo.setUserId(userId);
		sharePointIntgSearchVo.setGroupId(groupId);
		
		String xmlStr = sharePointService.getIntegrationSearchList(sharePointIntgSearchVo);
		JSONArray jarr = new JSONArray(xmlStr);
		List<Long> feedIdList = new ArrayList<Long>();
		if(jarr != null) { 
			int len = jarr.length();
			for(int i=0;i<len;i++) {
				feedIdList.add(jarr.getJSONObject(i).getLong("SNSPkId"));
			}
		}
		
		List<FeedVo> feedMeatdata = feedService.getFeedMetaData(lang, sessionMemberId, feedIdList, "");
		return feedMeatdata;
	}
	
	/**
	 * 커스터마이징 영역
	 * @param scv
	 * @return List<SearchVo>
	 */
	public List<SearchVo> getFeedsSearch(SearchContextVo scv) {
		return null;
	}
	
	/**
	 * 사용자이름 통합 검색
	 * 커스터마이징 영역
	 * @param scv
	 * @return List<SearchVo>
	 */
	public List<SearchVo> getNamesSearch(SearchContextVo scv) {
		return null;
	}
	
	/**
	 * 그룹명 통합 검색
	 * 커스터마이징 영역
	 * @param scv
	 * @return List<SearchVo>
	 */
	public List<SearchVo> getGroupNameSearch(SearchContextVo scv) {
		return null;
	}
	
	/**
	 * 해시태그 통합 검색
	 * 커스터마이징 영역
	 * @param scv
	 * @return List<SearchVo>
	 */
	public List<SearchVo> getTagsSearch(SearchContextVo scv) {
		return null;
	}
	
	/**
	 * 파일명 통합 검색
	 * 커스터마이징 영역
	 * @param scv
	 * @return List<SearchVo>
	 */
	public List<SearchVo> getFileNamesSearch(SearchContextVo scv) {
		return null;
	}
	
	/**
	 * 즐겨찾기 통합 검색
	 * 커스터마이징 영역
	 * @param scv
	 * @return List<SearchVo>
	 */
	public List<SearchVo> getBookmarksSearch(SearchContextVo scv) {
		return null;
	}
	
	/**
	 * 지식 통합 검색
	 * 커스터마이징 영역
	 * @param scv
	 * @return List<SearchVo>
	 */
	public List<SearchVo> getKnowledgesSearch(SearchContextVo scv) {
		return null;
	}

}