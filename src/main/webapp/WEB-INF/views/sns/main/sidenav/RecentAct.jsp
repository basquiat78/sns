<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.group.GroupRestful   grfRecentAct = new  org.uengine.sns.group.GroupRestful();%>
<% org.uengine.sns.member.MemberRestful mrfRecentAct = new  org.uengine.sns.member.MemberRestful();%>
<% org.uengine.sns.feed.FeedRestful frfRecentAct = new  org.uengine.sns.feed.FeedRestful();%>
<% org.uengine.sns.feed.FeedRestful frfFeed = new  org.uengine.sns.feed.FeedRestful();%>

<script type="text/javascript">

var _RecentAct_SESSION_MEMBERID = '<%=session.getAttribute("memberId")%>';
var _RecentAct_SESSION_MEMBERNAME = '<%=session.getAttribute("memberName")%>';
var _RecentAct_BASE_FOLLOWER = '<%=frfRecentAct.BASE_FOLLOWER%>';
var _RecentAct_BASE_FEED = '<%=frfFeed.BASE_FEED%>';
var _RecentAct_BASE_GROUP = '<%=grfRecentAct.BASE_GROUP%>';

var _RecentAct_LOCALE_LANGUAGE = '${pageContext.response.locale.language}';
var _RecentAct_BASIC_RECENTACTIVITY = '<spring:message code="basic.recentactivity" htmlEscape="true" />';
var _RecentAct_BASIC_RECENTACTIVITY_NOT = '<spring:message code="basic.recentactivity.not" htmlEscape="true" />';



</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/main/sidenav/RecentAct.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/main/sidenav/RecentAct.jsx"></script>
  </c:otherwise>
</c:choose>
