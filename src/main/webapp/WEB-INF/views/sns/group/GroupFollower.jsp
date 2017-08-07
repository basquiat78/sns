<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.group.GroupRestful grfGroupFollower = new org.uengine.sns.group.GroupRestful(); %>
<% org.uengine.sns.feed.FeedRestful frfGroupFollower = new  org.uengine.sns.feed.FeedRestful();%>
<% org.uengine.sns.member.MemberRestful mrfGroupFollower = new  org.uengine.sns.member.MemberRestful();%>

<script type="text/javascript">
var _GroupFollower_frfGroupFollower_BASE_FOLLOWER = '<%=frfGroupFollower.BASE_FOLLOWER%>';
var _GroupFollower_session_memberId = '<%=session.getAttribute("memberId")%>';
var _GroupFollower_session_UserId  	= '${userId}';

var _GroupFollower_mrfGroupFollower_MEMBER_PIC = '<%=mrfGroupFollower.MEMBER_PIC%>';
var _GroupFollower_grfGroupFollower_BASE_GFOLLOWER_URL = '<%=grfGroupFollower.BASE_GFOLLOWER_URL%>';

var _GroupFollower_MSG_NEEDDEPARTMENTINFOTEXT = '<spring:message code="group.groupfollower.NEEDDEPARTMENTINFOTEXT"/>';
var _GroupFollower_MSG_GROUPMEMBERTEXT = '<spring:message code="group.groupfollower.GROUPMEMBERTEXT"/>';

</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/group/GroupFollower.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/group/GroupFollower.jsx"></script>
	</c:otherwise>
</c:choose>
	