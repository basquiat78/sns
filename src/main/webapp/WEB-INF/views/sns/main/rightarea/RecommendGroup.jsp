<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.group.GroupRestful grf2 = new org.uengine.sns.group.GroupRestful(); %>
<% org.uengine.sns.feed.FeedRestful frf2 = new  org.uengine.sns.feed.FeedRestful();%>

<script type="text/javascript">
var _RecommendGroup_frf2_BASE_FOLLOWER = '<%=frf2.BASE_FOLLOWER%>';
var _RecommendGroup_grf2_GROUP = '<%=grf2.BASE_GROUP%>';
var _RecommendGroup_grf2_GROUP_PIC = '<%=grf2.GROUP_PIC%>';
var _RecommendGroup_grf2_GROUP_WIDGET_ACTIVITY = '<%=grf2.GROUP_WIDGET_ACTIVITY%>';
var _RecommendGroup_grf2_GROUP_WIDGET_LIST2 = '<%=grf2.GROUP_WIDGET_LIST2%>';

var _RecommendGroup_MSG_RECOMMENDGROUPTITLE = '<spring:message code="main.rightarea.RecommendGroup.RECOMMENDGROUPTITLE"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/main/rightarea/RecommendGroup.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/main/rightarea/RecommendGroup.jsx"></script>
	</c:otherwise>
</c:choose>
