<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.member.MemberRestful mrfSideNav = new org.uengine.sns.member.MemberRestful(); %>
<% org.uengine.sns.group.GroupRestful grfSideNav = new org.uengine.sns.group.GroupRestful(); %>
	<%@include file="../../group/Group.jsp"%>
	<%@include file="../../group/GroupSearch.jsp"%>
	<%@include file="RecentAct.jsp"%>
	<%@include file="Todo.jsp"%>
	<%@include file="TagCloud.jsp"%>

<style>
div.menu-page-set a {margin-right:4px;}
</style>

<script type="text/javascript">

var _SideNav_basic_manual = '<spring:message code="basic.manual" htmlEscape="true" />';
var _SideNav_MEMBER_WIDGET_ACTIVITY = '<%=mrfSideNav.MEMBER_WIDGET_ACTIVITY%>';
var _SideNav_GROUP_WIDGET_ACTIVITY = '<%=grfSideNav.GROUP_WIDGET_ACTIVITY%>';

var _SideNav_MSG_SYSMGRHOVERTITLE = '<spring:message code="main.sidenav.SideNav.SYSMGRHOVERTITLE"/>';
var _SideNav_MSG_FAVORITEHOVERTITLE = '<spring:message code="main.sidenav.SideNav.FAVORITEHOVERTITLE"/>';
var _SideNav_MSG_CONFIGLINKHOVERTITLE = '<spring:message code="main.sidenav.SideNav.CONFIGLINKHOVERTITLE"/>';

</script>


<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
        <script type="text/javascript" src="../jsx/build/sns/main/sidenav/SideNav.js"></script>
  </c:when >
  <c:otherwise>
  		<script type="text/jsx" src="../jsx/src/sns/main/sidenav/SideNav.jsx"></script>
  </c:otherwise>
</c:choose>
