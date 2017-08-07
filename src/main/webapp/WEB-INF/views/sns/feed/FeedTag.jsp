<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfTag = new org.uengine.sns.feed.FeedRestful();%>
<script type="text/javascript">
	
	var _FeedTag_session_memberId  = '<%=session.getAttribute("memberId")%>';
	var _FeedTag_BASE_FEED  		= contextpath + '<%=frfTag.BASE_FEED%>';
	var _FeedTag_MSG_FEEDTAGTITLE = '<spring:message code="feed.feedtag.FEEDHASHTAGTITLE"/>';
	var _FeedTag_MSG_NOFEEDHEREMSG = '<spring:message code="basic.msg.nomessage"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/FeedTag.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/FeedTag.jsx"></script>
  </c:otherwise>
</c:choose>