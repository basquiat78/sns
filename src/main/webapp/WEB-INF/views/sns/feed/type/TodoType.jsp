<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.member.MemberRestful mrfTodoType = new  org.uengine.sns.member.MemberRestful();%>
<script type="text/javascript">
	var _TodoType_session_memberId	= '${memberId}';
	var _TodType_pageContext 		= '${pageContext.response.locale.language}';
	var	_TodType_basic_date			= '<spring:message code="feed.todocalendar.TODODAY"/>';
	var _TodoType_BASE_MENTIONS     = contextpath + '<%= mrfTodoType.BASE_MENTIONS%>';
	var _Todo_BASIC_TODO_TODOTEXTAREAMSG = '<spring:message code="feed.dropzone.TODOTEXTAREAMSG"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/type/TodoType.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/type/TodoType.jsx"></script>
  </c:otherwise>
</c:choose>
