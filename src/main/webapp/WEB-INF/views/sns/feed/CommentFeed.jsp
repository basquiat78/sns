<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfCommentFeed = new  org.uengine.sns.feed.FeedRestful();%>
<% org.uengine.sns.member.MemberRestful mrfCommentFeed = new  org.uengine.sns.member.MemberRestful();%>
<style>
	.reply_contents dl dd.rco_txt {white-space:pre-line; word-break: break-all }
</style>
<script type="text/javascript">
	
	var _CommentFeed_session_memberId  = '${memberId}';
	var _CommentFeed_BASE_FOLLOWER  	= contextpath + '<%=frfCommentFeed.BASE_FOLLOWER%>';
	var _CommentFeed_MEMBER_PIC  		= contextpath + '<%=mrfCommentFeed.MEMBER_PIC%>';
	var _CommentFeed_BASE_LIKEIT  		= contextpath + '<%=frfCommentFeed.BASE_LIKEIT%>';
	var _CommentFeed_BASE_FEED  		= contextpath + '<%=frfCommentFeed.BASE_FEED%>';
	var _CommentFeed_BASE_FEED_COMMENT	= contextpath + '<%=frfCommentFeed.FEED_TYPE_COMMENT%>';
	
	var _FEED_CommentFeed_MSG_FEEDDELETEDMSG = '<spring:message code="feed.commentfeed.FEEDDELETEDMSG"/>';
	var _FEED_CommentFeed_MSG_REPLYFORWHAT = '<spring:message code="feed.commentfeed.REPLYFORWHAT"/>';
	var _FEED_CommentFeed_MSG_LIKEIT = '<spring:message code="feed.commentfeed.LIKEIT"/>';
	var _FEED_CommentFeed_MSG_CANCELLIKEIT = '<spring:message code="feed.commentfeed.CANCELLIKEIT"/>';
	var _FEED_CommentFeed_MSG_REPLY = '<spring:message code="feed.commentfeed.REPLY"/>';
	var _FEED_CommentFeed_MSG_SHARE = '<spring:message code="feed.commentfeed.SHARE"/>';
	var _FEED_CommentFeed_MSG_MORE = '<spring:message code="feed.commentfeed.MORE"/>';
	var _FEED_CommentFeed_MSG_FOLLOW = '<spring:message code="feed.commentfeed.FOLLOW"/>';
	var _FEED_CommentFeed_MSG_UNFOLLOW = '<spring:message code="feed.commentfeed.UNFOLLOW"/>';
	var _FEED_CommentFeed_MSG_BOOKMARK = '<spring:message code="feed.commentfeed.BOOKMARK"/>';
	var _FEED_CommentFeed_MSG_CLEARBOOKMARK = '<spring:message code="feed.commentfeed.CLEARBOOKMARK"/>';
	var _FEED_CommentFeed_MSG_MAKEKNOWLEDGE = '<spring:message code="feed.commentfeed.MAKEKNOWLEDGE"/>';
	var _FEED_CommentFeed_MSG_CLEARKNOWLEDGE = '<spring:message code="feed.commentfeed.CLEARKNOWLEDGE"/>';
	var _FEED_CommentFeed_MSG_MODIFY = '<spring:message code="feed.commentfeed.MODIFY"/>';
	var _FEED_CommentFeed_MSG_DELETE = '<spring:message code="feed.commentfeed.DELETE"/>';
	var _FEED_CommentFeed_MSG_MOREFEEDCONTENTSTEXT = '<spring:message code="feed.feed.MOREFEEDCONTENTSTEXT"/>';
	var _FEED_CommentFeed_MSG_LESSFEEDCONTENTSTEXT = '<spring:message code="feed.feed.LESSFEEDCONTENTSTEXT"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/CommentFeed.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/CommentFeed.jsx"></script>
  </c:otherwise>
</c:choose>
