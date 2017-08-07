<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.member.MemberRestful mrfNormalType = new  org.uengine.sns.member.MemberRestful();%>
<script type="text/javascript">
	var _NormalType_session_memberId	= '${memberId}';
	var _NormalType_BASE_MENTIONS 		= contextpath + '<%= mrfNormalType.BASE_MENTIONS%>';
	var _FEED_NormalType_MSG_WHATRUWORKINGONMSG = '<spring:message code="feed.normaltype.WHATRUWORKINGONMSG"/>';
	var _FEED_NormalType_CANCELBUTTON = '<spring:message code="feed.normaltype.CANCELUPDATE"/>';
	var _FEED_NormalType_UPDATEDBUTTON = '<spring:message code="feed.normaltype.FEEDUPDATE"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/type/NormalType.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/type/NormalType.jsx"></script>
  </c:otherwise>
</c:choose>
