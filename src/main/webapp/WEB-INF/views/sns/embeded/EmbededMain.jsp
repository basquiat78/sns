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
	
	<%@include file="../config/SharepointDocList.jsp"%>
	
	<% org.uengine.sns.feed.FeedRestful frfEmbedType1 = new  org.uengine.sns.feed.FeedRestful();%>
	
	<script type="text/javascript">
	var _EmbededMain_frfEmbedType1_BASE_FEED = '<%=frfEmbedType1.BASE_FEED%>';
	var _EmbededMain_targetMemberId = '${targetMemberId}';
	</script>
	
	<style>
	html {
		overflow-y:scroll; 
		height:100%;
	}
	body {
		min-width:0;
	}
	.lay-container {
		margin : 0px;
	}
	.lay-wrap {width:auto;min-width:500px;}
	
	</style>
	</head>

	<body onclick="eventLayoutControll();">
		<div class="lay-container" id="WholeScreen"></div>
		<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
		<c:choose>
			<c:when  test="${uiMode eq 'js'}">
				<script type="text/javascript" src="../jsx/build/sns/embeded/EmbededMain.js"></script>
			</c:when >
			<c:otherwise>
				<script type="text/jsx" src="../jsx/src/sns/embeded/EmbededMain.jsx"></script>
			</c:otherwise>
		</c:choose>
	</body>
</html>