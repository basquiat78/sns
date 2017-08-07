package org.uengine.sns.member.mapper;

import java.util.List;

import org.uengine.sns.member.vo.BookmarkVo;

/**
 * 
 * BookmarkMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/member/bookmark.xml
 *
 */
public interface BookmarkMapper {

	void insertBookmark(BookmarkVo bookmarkVo);
	void deleteBookmark(BookmarkVo bookmarkVo);
	
	List<BookmarkVo> selectBookmarkList(long memberId);
	List<BookmarkVo> selectBookmarkListByFeed(long feedId);

}