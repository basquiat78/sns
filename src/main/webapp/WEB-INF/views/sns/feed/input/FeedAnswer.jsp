<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script type="text/javascript">
	var _FeedAnswer_session_memberName = '${memberName}';
	
	var _FEED_FeedAnswer_MSG_ANSWERTEXT1 = '<spring:message code="feed.feedanswer.ANSWERTEXT1"/>';
	var _FEED_FeedAnswer_MSG_ANSWERTEXT2 = '<spring:message code="feed.feedanswer.ANSWERTEXT2"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/input/FeedAnswer.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/input/FeedAnswer.jsx"></script>
  </c:otherwise>
</c:choose>
