package org.uengine.sns.member.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.vo.SearchContextVo;
import org.uengine.sns.feed.service.FeedService;
import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.member.mapper.BookmarkMapper;
import org.uengine.sns.member.vo.BookmarkVo;

/**
 * 
 * BookmarkService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("bookmarkService")
public class BookmarkService {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(MemberService.class);

	@Autowired
	BookmarkMapper bookmarkMapper;
	
	@Autowired
	FeedService feedService; 
	
	/**
	 * 멤버별 즐겨찾기 리스트
	 * @param memberId
	 * @return List<BookmarkVo>
	 */
	public List<BookmarkVo> getBookmarkList(long memberId) {
		return bookmarkMapper.selectBookmarkList(memberId);
	}
	
	/**
	 * 멤버별 즐겨찾기 리스트
	 * @param lang
	 * @param scv
	 * @param sessionMemberId
	 * @return List<FeedVo>
	 */
	public List<FeedVo> getBookmarkList(String lang, SearchContextVo scv, long sessionMemberId) {
		scv.menuType(SNSCodeMaster.FEED_SEARCH_TYPE.BOOKMARK.toString());
		return feedService.getFeedList(lang, scv, sessionMemberId);
	}
	
	/**
	 * 피드별 즐겨찾기 리스트
	 * @param feedId
	 * @return List<BookmarkVo>
	 */
	public List<BookmarkVo> getBookmarkListByFeed(long feedId) {
		return bookmarkMapper.selectBookmarkListByFeed(feedId);
	}
	
	/**
	 * 즐겨찾기 등록
	 * @param bookmarkVo
	 * @return BookmarkVo
	 */
	public BookmarkVo insertBookmark(BookmarkVo bookmarkVo){
		bookmarkMapper.insertBookmark(bookmarkVo);
		return bookmarkVo;
	}
	
	/**
	 * 즐겨찾기 삭제
	 * @param bookmarkVo
	 * @return BookmarkVo
	 */
	public BookmarkVo deleteBookmark(BookmarkVo bookmarkVo){
		bookmarkMapper.deleteBookmark(bookmarkVo);
		return bookmarkVo;
	}

}