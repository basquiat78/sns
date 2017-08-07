<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfFeedFile = new  org.uengine.sns.feed.FeedRestful();%>

<style type="text/css">
table#feedFileArea tbody td {
	white-space: nowrap;
    overflow: hidden;
}
</style>

<script type="text/javascript">
	
	var _FeedFile_session_memberId  		= '${memberId}';
	
	var _FeedFile_BASE_GROUP_FILE  = contextpath + '<%=frfFeedFile.BASE_GROUP_FILE%>';
	var _FeedFile_BASE_PERSON_FILE = contextpath + '<%=frfFeedFile.BASE_PERSON_FILE%>';
	
	var _FEED_FeedFile_MSG_NOFILEMSG = '<spring:message code="feed.feedfile.NOFILEMSG"/>';
	var _FEED_FeedFile_MSG_COLUMN1TEXT = '<spring:message code="feed.feedfile.COLUMN1TEXT"/>';
	var _FEED_FeedFile_MSG_COLUMN2TEXT = '<spring:message code="feed.feedfile.COLUMN2TEXT"/>';
	var _FEED_FeedFile_MSG_COLUMN3TEXT = '<spring:message code="feed.feedfile.COLUMN3TEXT"/>';
	
	var _FEED_FeedFile_MSG_WHATTOSHOWTEXT_FILETAB = '<spring:message code="feed.feedfile.WHATTOSHOWTEXT_FILETAB"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/view/FeedFile.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/view/FeedFile.jsx"></script>
  </c:otherwise>
</c:choose>
