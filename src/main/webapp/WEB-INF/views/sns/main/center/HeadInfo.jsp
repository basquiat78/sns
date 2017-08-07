<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.group.GroupRestful grfFeedHead = new org.uengine.sns.group.GroupRestful(); %>
<% org.uengine.sns.member.MemberRestful mrfFeedHead = new  org.uengine.sns.member.MemberRestful();%>
<% org.uengine.sns.feed.FeedRestful frfFeedHead = new  org.uengine.sns.feed.FeedRestful();%>

<script type="text/javascript">

var _HeadInfo_session_memberId = '<%=session.getAttribute("memberId")%>';

var _HeadInfo_BASE_FOLLOWER = '<%=frfFeedHead.BASE_FOLLOWER%>';
var _HeadInfo_BASE_MEMBER   = '<%=mrfFeedHead.BASE_MEMBER%>';
var _HeadInfo_MEMBER_PIC    = '<%=mrfFeedHead.MEMBER_PIC%>';
var _HeadInfo_GROUP_PIC     = '<%=grfFeedHead.GROUP_PIC%>';
var _HeadInfo_BASE_GROUP    = '<%=grfFeedHead.BASE_GROUP%>';
var _HeadInfo_BASE_FOLLOWERREJOIN = '<%=grfFeedHead.BASE_GFOLLOWER_URL_REJOIN%>';

var _HeadInfo_GFOLLOWER_BYSELF_URL = '<%=grfFeedHead.GFOLLOWER_BYSELF_URL%>';
var _HeadInfo_BASE_GFOLLOWER_URL   = '<%=grfFeedHead.BASE_GFOLLOWER_URL%>';
var _HeadInfo_BASE_GFOLLOWER_URL_FOR_GROUPINFO   = '<%=grfFeedHead.BASE_GFOLLOWER_URL_FOR_GROUPINFO%>';
var _HeadInfo_isSysAdmin = '${Member.isSysAdmin}';

var _HeadInfo_MSG_NEEDDEPARTMENTINFOTEXT = '<spring:message code="group.headinfo.NEEDDEPARTMENTINFOTEXT"/>';
var _HeadInfo_MSG_CLOSEDGROUP = '<spring:message code="group.headinfo.CLOSEDGROUP"/>';
var _HeadInfo_MSG_OPENGROUP = '<spring:message code="group.headinfo.OPENGROUP"/>';
var _HeadInfo_MSG_JOINSTATUSYES = '<spring:message code="group.headinfo.JOINSTATUSYES"/>';
var _HeadInfo_MSG_JOINSTATUSNO = '<spring:message code="group.headinfo.JOINSTATUSNO"/>';
var _HeadInfo_MSG_JOINSTATUSSTANDBY = '<spring:message code="group.headinfo.JOINSTATUSSTANDBY"/>';
var _HeadInfo_MSG_JOINSTATUSREJECTED = '<spring:message code="group.headinfo.JOINSTATUSREJECTED"/>';
var _HeadInfo_MSG_JOINGROUPCONFIRMMSG = '<spring:message code="group.headinfo.JOINGROUPCONFIRMMSG"/>';
var _HeadInfo_MSG_LEAVEGROUPCONFIRMMSG = '<spring:message code="group.headinfo.LEAVEGROUPCONFIRMMSG"/>';
var _HeadInfo_MSG_MGRMUSTBEEXISTMSG = '<spring:message code="group.config.MGRMUSTBEEXISTMSG"/>';
var _HeadInfo_MSG_GROUPLEAVECONFIRMMSG_FORMGR = '<spring:message code="member.config.GROUPLEAVECONFIRMMSG_FORMGR"/>';

var _HeadInfo_MSG_REJOINYNMSG = '<spring:message code="group.headinfo.REJOINYNMSG"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/main/center/HeadInfo.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/main/center/HeadInfo.jsx"></script>
  </c:otherwise>
</c:choose>
