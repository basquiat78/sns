<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfFeedApp = new  org.uengine.sns.feed.FeedRestful();%>
<% org.uengine.sns.member.MemberRestful mrfFeedApp = new  org.uengine.sns.member.MemberRestful();%>
<%@include file="type/NormalType.jsp"%>
<%@include file="type/TodoType.jsp"%>
<%@include file="type/PollType.jsp"%>
<%@include file="type/NoticeType.jsp"%>
<%@include file="input/Follower.jsp"%>
<%@include file="input/OpenGraph.jsp"%>
<%@include file="input/TagInput.jsp"%>
<%@include file="input/TodoInput.jsp"%>
<%@include file="input/Dropzone.jsp"%>
<script type="text/javascript">
	
	var _FeedApp_session_memberId 	= '<%=session.getAttribute("memberId")%>';
	var _FeedApp_BASE_FEED  		= contextpath + '<%=frfFeedApp.BASE_FEED%>';
	var _FeedApp_BASE_POLL 			= contextpath + '<%=frfFeedApp.BASE_POLL%>';
	var _FeedApp_MEMBER_WIDGET_ACTIVITY 	= contextpath + '<%=mrfFeedApp.MEMBER_WIDGET_ACTIVITY%>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/FeedApp.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/FeedApp.jsx"></script>
  </c:otherwise>
</c:choose>
	