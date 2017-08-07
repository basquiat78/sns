<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script type="text/javascript">
	var sendMessagePopup = null;
	var _MessageFeed_session_memberId = '${memberId}';
	
	var _FEED_MessageFeed_MSG_WRITEFEEDTEXT = '<spring:message code="feed.messagefeed.WRITEFEEDTEXT"/>';
	var _FEED_MessageFeed_MSG_WRITEFEEDFORWHOMMSG = '<spring:message code="feed.messagefeed.WRITEFEEDFORWHOMMSG"/>';
	
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/input/MessageFeed.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/input/MessageFeed.jsx"></script>
  </c:otherwise>
</c:choose>

<div id="sendMessage" class="share_area_popup"></div>
