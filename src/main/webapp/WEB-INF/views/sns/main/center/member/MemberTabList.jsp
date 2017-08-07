<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.member.MemberRestful mrfMTL = new  org.uengine.sns.member.MemberRestful();%>
<% org.uengine.sns.feed.FeedRestful frfMTL = new  org.uengine.sns.feed.FeedRestful();%>

<script type="text/javascript">

var _MemberTabList_BASE_FEED        = '<%=frfMTL.BASE_FEED%>';
var _MemberTabList_BASE_MEMBER_FEED = '<%=mrfMTL.BASE_MEMBER_FEED%>';


var _MemberTabList_session_memberId = '<%=session.getAttribute("memberId")%>';
var _MemberTabList_BASE_targetMemberId = '<%=request.getAttribute("targetMemberId")%>';

var _MemberTabList_FEED_TYPE_APPROVAL  = '<%=frfMTL.FEED_TYPE_APPROVAL%>';
var _MemberTabList_FEED_TYPE_BOARD     = '<%=frfMTL.FEED_TYPE_BOARD%>';

var _MemberTabList_BASE_FOLLOWER_TYPE_MEMBER = '<%=org.uengine.sns.common.code.SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString()%>';
var _MemberTabList_BASE_FOLLOWER_TYPE_OTHER_MEMBER = '<%=org.uengine.sns.common.code.SNSCodeMaster.FOLLOWER_TYPE.OTHER_MEMBER.toString()%>';


var _MemberTabList_MSG_MEMBERTAB1TEXT = '<spring:message code="member.membertablist.MEMBERTAB1TEXT"/>'; //전체대화
var _MemberTabList_MSG_MEMBERTAB2TEXT = '<spring:message code="member.membertablist.MEMBERTAB2TEXT"/>'; //개인
var _MemberTabList_MSG_MEMBERTAB3TEXT = '<spring:message code="member.membertablist.MEMBERTAB3TEXT"/>'; //할일
var _MemberTabList_MSG_MEMBERTAB4TEXT = '<spring:message code="member.membertablist.MEMBERTAB4TEXT"/>'; //파일
var _MemberTabList_MSG_MEMBERTAB5TEXT = '<spring:message code="member.membertablist.MEMBERTAB5TEXT"/>'; //전자결재
var _MemberTabList_MSG_MEMBERTAB6TEXT = '<spring:message code="member.membertablist.MEMBERTAB6TEXT"/>'; //게시판

</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/main/center/member/MemberTabList.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/main/center/member/MemberTabList.jsx"></script>
  </c:otherwise>
</c:choose>
