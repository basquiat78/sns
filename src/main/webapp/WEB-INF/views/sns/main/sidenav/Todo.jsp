<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfTodo = new  org.uengine.sns.feed.FeedRestful();%>
<% org.uengine.sns.member.MemberRestful mrfTodo = new  org.uengine.sns.member.MemberRestful();%>
<% org.uengine.sns.group.GroupRestful   grfTodo = new  org.uengine.sns.group.GroupRestful();%>

<script type="text/javascript">
var _Todo_BASE_GROUP = '<%=grfTodo.BASE_GROUP%>';

var _Todo_BASE_FEED = '<%=frfTodo.BASE_FEED%>';
var _Todo_BASIC_TODO_MYTODO = '<spring:message code="basic.todo.mytodo" htmlEscape="true" />';
var _Todo_BASIC_TODO_WHODO = '<spring:message code="basic.todo.whodo" htmlEscape="true" />';
var _Todo_BASIC_TODO_SENDTODO = '<spring:message code="basic.todo.sendtodo" htmlEscape="true" />';
var _Todo_BASIC_TODO_TODOTEXTAREAMSG = '<spring:message code="feed.dropzone.TODOTEXTAREAMSG" htmlEscape="true" />';

var _Todo_MEMBER_WIDGET_TODO = '<%=mrfTodo.MEMBER_WIDGET_TODO%>';
var _Todo_BASIC_TODO_DELAY = '<spring:message code="basic.todo.delay" htmlEscape="true" />';
var _Todo_SESSION_MEMBERID = '<%=session.getAttribute("memberId")%>';
var _Todo_BASIC_TODO = '<spring:message code="basic.todo" htmlEscape="true" />';
var _Todo_BASIC_RECENTNOT = '<spring:message code="basic.todo.recentnot" htmlEscape="true" />';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
        <script type="text/javascript" src="../jsx/build/sns/main/sidenav/Todo.js"></script>
  </c:when >
  <c:otherwise>
        <script type="text/jsx" src="../jsx/src/sns/main/sidenav/Todo.jsx"></script>
  </c:otherwise>
</c:choose>



	<style type="text/css">
	.underline-on-hover:hover {
		cursor: pointer;
		font-weight:bold;
	    text-decoration: underline;
	}
	
	.data-delay {
		font-size:12px;
		color:#fe2b0f;
		margin-right:2px;
		font-weight:bold;
	}
	
	.data-complete {
		font-size:12px;
		color:#000;
		margin-right:2px;
		font-weight:bold;
	}
	</style>
