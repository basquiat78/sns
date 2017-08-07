<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.member.MemberRestful mrfPullType = new  org.uengine.sns.member.MemberRestful();%>
<script type="text/javascript">
	var _PollType_session_memberId = '${memberId}';
	var _PollType_BASE_MENTIONS	   = contextpath + '<%= mrfPullType.BASE_MENTIONS%>';
	var _FEED_PollType_MSG_ANSWERTEXT = '<spring:message code="feed.polltype.ANSWERTEXT"/>';
	var _FEED_PollType_MSG_WHATISYOURQUESTIONMSG = '<spring:message code="feed.polltype.WHATISYOURQUESTIONMSG"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/type/PollType.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/type/PollType.jsx"></script>
  </c:otherwise>
</c:choose>
