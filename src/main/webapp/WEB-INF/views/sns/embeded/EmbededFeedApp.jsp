<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.group.GroupRestful grfGroup = new org.uengine.sns.group.GroupRestful(); %>
<!DOCTYPE html>
<html lang="${pageContext.response.locale.language}">
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Share to Social</title>
	
<%@include file="../main/style.jsp"%>

	<%@include file="../feed/FeedApp.jsp"%>
	<%@include file="../feed/Feed.jsp"%>
	<%@include file="../popup/ConsolePop.jsp"%>
	
	<%@include file="../config/SharepointDocList.jsp"%>
	
	<script type="text/javascript">
	var _EmbededFeedApp_grfGroup_BASE_GROUP = '<%=grfGroup.BASE_GROUP%>';
	var _EmbededFeedApp_groupId = '${groupId}';
	var _EmbededFeedApp_feedtitle = '${feedtitle}';
	var _EmbededFeedApp_windowTitle = '${windowTitle}';
	var _Todo_BASIC_TODO_TODOTEXTAREAMSG = '<spring:message code="feed.dropzone.TODOTEXTAREAMSG" htmlEscape="true" />';
	</script>

	<script type="text/javascript">
	function closeEmbeddedPopup() {
		
		self.opener = self;
		window.close();
	}
	</script>
	
	<style>
	body {
		min-width:0; 
		overflow-x : hidden;  
		overflow-y : hidden;
	}
	.lay-container {
		margin : 0px;
	}
	.lay-wrap {width:auto;min-width:500px;}
	</style>
	</head>

	<body onclick="eventLayoutControll();">
		<div class="pop-modalwindow-header">
			<div class="pop-modalwindow-title"></div>
            <div class="pop-modalwindow-header-option">
            	<a class="ico-anchor"><span class="ico-img ico-close" onclick="closeEmbeddedPopup()">닫기</span></a>
            </div>
        </div>
		<div class="lay-container" id="WholeScreen"></div>
		<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
		<c:choose>
			<c:when  test="${uiMode eq 'js'}">
				<script type="text/javascript" src="../jsx/build/sns/embeded/EmbededFeedApp.js"></script>
			</c:when >
			<c:otherwise>
				<script type="text/jsx" src="../jsx/src/sns/embeded/EmbededFeedApp.jsx"></script>
			</c:otherwise>
		</c:choose>
	</body>
</html>