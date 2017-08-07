<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfOG = new  org.uengine.sns.feed.FeedRestful();%>
<script type="text/javascript">
	var OpenGraph_BASE_FEED	= contextpath + '<%=frfOG.BASE_FEED%>';
	
	var _FEED_OpenGraph_MSG_MOVETOONEFEEDTEXT = '<spring:message code="feed.opengraph.MOVETOONEFEEDTEXT"/>';
	var _FEED_OpenGraph_MSG_NOTICETEXT = '<spring:message code="feed.opengraph.NOTICETEXT"/>';
	var _FEED_OpenGraph_MSG_DELETEBTNTEXT = '<spring:message code="feed.opengraph.DELETEBTNTEXT"/>';
	
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/input/OpenGraph.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/input/OpenGraph.jsx"></script>
  </c:otherwise>
</c:choose>
