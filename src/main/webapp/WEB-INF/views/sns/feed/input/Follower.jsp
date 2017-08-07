<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfFollower = new  org.uengine.sns.feed.FeedRestful();%>
<% org.uengine.sns.group.GroupRestful grfFollower = new org.uengine.sns.group.GroupRestful(); %>
<% org.uengine.sns.member.MemberRestful mrfFollower = new  org.uengine.sns.member.MemberRestful();%>
<style>
	.ui-menu .ui-menu-item a.ui-corner-all:hover, 
	.ui-menu .ui-menu-item a.ui-corner-all:focus, 
	.ui-menu .ui-menu-item a.ui-corner-all:active {
		background:#ff8a00!important;
	    color:#000;
	    border-radius:0;
	}
	
	.ui-state-hover, 
	.ui-widget-content 
	.ui-state-hover, 
	.ui-widget-header .ui-state-hover, 
	.ui-state-focus, 
	.ui-widget-content .ui-state-focus, 
	.ui-widget-header .ui-state-focus {
		background: #ff8a00;
		border: 1;
		border-color:#ff8a00;
		color:#000;
		border-radius:0;
		font-weight: normal;
		text-decoration: none;
		-webkit-border-radius: 0px;
		-moz-border-radius: 0px;
		background-image: none;
	}
</style>
<script type="text/javascript">
	var _Follower_session_memberId = '${memberId}';

	var _Follower_GROUP_WIDGET_ACTIVITY		= contextpath + '<%=grfFollower.GROUP_WIDGET_ACTIVITY%>';
	var _Follower_GROUP_PIC 				= contextpath + '<%=grfFollower.GROUP_PIC%>';
	var _Follower_BASE_GROUP 				= contextpath + '<%=grfFollower.BASE_GROUP%>';
	var _Follower_MEMBER_PIC 				= contextpath + '<%=mrfFollower.MEMBER_PIC%>';
	var _Follower_BASE_FOLLOWER				= contextpath + '<%=frfFollower.BASE_FOLLOWER%>';
	var _Follower_BASE_AUTO_FOLLOWER		= contextpath + '<%= frfFollower.BASE_AUTO_FOLLOWER%>';
	var _Follower_BASE_AUTO_FOLLOWER_ALL	= contextpath + '<%= frfFollower.BASE_AUTO_FOLLOWER_ALL%>';
	var _Follower_BASE_MEMBER_BY_EMAIL		= contextpath + '<%=mrfFollower.BASE_MEMBER_BY_EMAIL%>';
	
	var _FEED_Follower_MSG_TOOLTIPTEXT1 = '<spring:message code="feed.follower.TOOLTIPTEXT1"/>';
	var _FEED_Follower_MSG_TOOLTIPTEXT2 = '<spring:message code="feed.follower.TOOLTIPTEXT2"/>';
	var _FEED_Follower_MSG_FTT_FOLLOWERTEXT = '<spring:message code="feed.follower.FTT.FOLLOWERTEXT"/>';
	var _FEED_Follower_MSG_FTT_SENDMSGBTNTEXT = '<spring:message code="feed.follower.FTT.SENDMSGBTNTEXT"/>';
	var _FEED_Follower_MSG_FTT_GROUPTEXT = '<spring:message code="feed.follower.FTT.GROUPTEXT"/>';
	var _FEED_Follower_MSG_FTT_TEAMTEXT = '<spring:message code="feed.follower.FTT.TEAMTEXT"/>';
	var _FEED_Follower_MSG_REFERENCETEXT = '<spring:message code="feed.follower.REFERENCETEXT"/>';
	var _FEED_Follower_MSG_FOLLOWERTYPENAME1 = '<spring:message code="feed.follower.FOLLOWERTYPENAME1"/>';
	var _FEED_Follower_MSG_FOLLOWERTYPENAME2 = '<spring:message code="feed.follower.FOLLOWERTYPENAME2"/>';
	var _FEED_Follower_MSG_FOLLOWERTYPENAME3 = '<spring:message code="feed.follower.FOLLOWERTYPENAME3"/>';
	var _FEED_Follower_MSG_GROUPORFOLLOWERADDTEXT = '<spring:message code="feed.follower.GROUPORFOLLOWERADDTEXT"/>';
	var _FEED_Follower_MSG_ERRORDEFAULTMSG = '<spring:message code="feed.follower.ERRORDEFAULTMSG"/>';
	var _FEED_Follower_MSG_ALLCOMPANY = '<spring:message code="feed.follower.ALLCOMPANY"/>';
	var _FEED_Follower_MSG_REPORTOTHERPEOPLE = '<spring:message code="feed.follower.REPORTOTHERPEOPLE"/>';
	
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/input/Follower.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/input/Follower.jsx"></script>
  </c:otherwise>
</c:choose>
