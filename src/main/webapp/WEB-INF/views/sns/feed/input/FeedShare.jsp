<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfFeedShare = new  org.uengine.sns.feed.FeedRestful();%>
<% org.uengine.sns.member.MemberRestful mrfFeedShare= new  org.uengine.sns.member.MemberRestful();%>
<script type="text/javascript">
	var sharePopup = null;
	
	var _FeedShare_session_memberId = '<%=session.getAttribute("memberId")%>';
	var _FeedShare_session_memberName  		= '${memberName}';
	
	var _FeedShare_FEED_TYPE_SHARE  = contextpath + '<%=frfFeedShare.FEED_TYPE_SHARE%>';
	var _FeedShare_BASE_FEED  		 = contextpath + '<%=frfFeedShare.BASE_FEED%>';
	var _FeedShare_MEMBER_PIC 		 = contextpath + '<%=mrfFeedShare.MEMBER_PIC%>';
	
	var _FEED_FeedShare_MSG_SHAREBTNTEXT = '<spring:message code="feed.feedshare.SHAREBTNTEXT"/>';
	var _FEED_FeedShare_MSG_CLOSEBTNTEXT = '<spring:message code="feed.feedshare.CLOSEBTNTEXT"/>';
	
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/input/FeedShare.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/input/FeedShare.jsx"></script>
  </c:otherwise>
</c:choose>

<div id="share_popup" class="share_area_popup" ></div>
