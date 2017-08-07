<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.group.GroupRestful grfNewGroup = new org.uengine.sns.group.GroupRestful(); %>
<% org.uengine.sns.feed.FeedRestful frfNewGroup = new  org.uengine.sns.feed.FeedRestful();%>

<script type="text/javascript">
var _NewGroup_frfNewGroup_BASE_FOLLOWER = '<%=frfNewGroup.BASE_FOLLOWER%>';
var _NewGroup_grfNewGroup_GROUP = '<%=grfNewGroup.BASE_GROUP%>';
var _NewGroup_grfNewGroup_GROUP_PIC = '<%=grfNewGroup.GROUP_PIC%>';
var _NewGroup_grfNewGroup_GROUP_WIDGET_ACTIVITY = '<%=grfNewGroup.GROUP_WIDGET_ACTIVITY%>';
var _NewGroup_grfNewGroup_GROUP_WIDGET_LIST2 = '<%=grfNewGroup.GROUP_WIDGET_LIST2%>';

var _NewGroup_MSG_NEWGROUPTITLE = '<spring:message code="main.rightarea.NewGroup.NEWGROUPTITLE"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/main/rightarea/NewGroup.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/main/rightarea/NewGroup.jsx"></script>
	</c:otherwise>
</c:choose>