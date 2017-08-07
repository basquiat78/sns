<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="${pageContext.response.locale.language}">
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title><spring:message code="basic.title" htmlEscape="true" /></title>
	
<%@include file="../main/style.jsp"%>

	<%@include file="../feed/FeedApp.jsp"%>
	<%@include file="../feed/Feed.jsp"%>
	<%@include file="../feed/FeedNotice.jsp"%>
	<%@include file="../popup/ConsolePop.jsp"%>
	
	<%@include file="../config/SharepointFileList.jsp"%>
	
	<% org.uengine.sns.group.GroupRestful grfGTL = new  org.uengine.sns.group.GroupRestful();%>
	
	<script type="text/javascript">
	var _EmbededGroup_grfGTL_BASE_GROUP_FEED = '<%=grfGTL.BASE_GROUP_FEED%>';
	var _EmbededGroup_grfGTL_BASE_GROUP = '<%=grfGTL.BASE_GROUP%>';
	var _EmbededGroup_groupId = '${groupId}';
	var _EmbededGroup_targetMemberId = '${targetMemberId}';
	</script>
	
	<style>
	html {
		overflow-y:scroll; 
		height:100%;
	}
	body {
		min-width:0; 
		line-height:170%;
	}	
	
	.lay-wrap {width:auto;min-width:500px;}
	</style>
	</head>

	<body onclick="eventLayoutControll();">
		<div class="lay-container" id="WholeScreen"></div>
		<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
		<c:choose>
			<c:when  test="${uiMode eq 'js'}">
				<script type="text/javascript" src="../jsx/build/sns/embeded/EmbededGroup.js"></script>
			</c:when >
			<c:otherwise>
				<script type="text/jsx" src="../jsx/src/sns/embeded/EmbededGroup.jsx"></script>
			</c:otherwise>
		</c:choose>
	</body>
</html>