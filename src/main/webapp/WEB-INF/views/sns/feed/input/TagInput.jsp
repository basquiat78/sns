<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfTagInput = new  org.uengine.sns.feed.FeedRestful();%>
<script type="text/javascript">
	var _FEED_TagInput_session_memberId = '${memberId}';
	var _FEED_TagInput_MSG_ADDTAG = '<spring:message code="feed.taginput.ADDTAG"/>';
	var _FEED_TagInput_MSG_TOPICISALREADYADDEDMSG = '<spring:message code="feed.taginput.TOPICISALREADYADDEDMSG"/>';
	var _FEED_TagInput_BASE_TAG = contextpath + '<%=frfTagInput.BASE_TAG%>';
	var _FEED_TagInput_MSG_EDITCOMP = '<spring:message code="feed.taginput.EDITCOMP"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/input/TagInput.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/input/TagInput.jsx"></script>
  </c:otherwise>
</c:choose>
