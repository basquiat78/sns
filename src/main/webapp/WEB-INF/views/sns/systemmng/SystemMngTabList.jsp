<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%@include file="searchbox/SystemFeedSearch.jsp"%>
<%@include file="searchbox/SystemGroupSearch.jsp"%>
<%@include file="searchbox/SystemTenantSearch.jsp"%>

<% org.uengine.sns.member.MemberRestful mrfSMT = new  org.uengine.sns.member.MemberRestful();%>
<% org.uengine.sns.feed.FeedRestful frfSMT = new  org.uengine.sns.feed.FeedRestful();%>

<style>
div#SystemSearchBox div.gmsub {
	width:100%; margin:0;
	border-top:0px;
	margin-bottom : 20px;
}

div#SystemSearchBox .pop-modalwindow-btn-area {
	padding : 0;
}

.tableBox table.sysGroupSearchTbl {
	border:0;
	border-right:1px solid #e0e0e0;
	border-left:1px solid #e0e0e0;
}

.tableBox table.sysGroupSearchTbl tbody td {
	border-bottom:1px solid #e0e0e0;
	padding:5px;
}
</style>

<script type="text/javascript">
var _SystemMgrTabList_MSG_TITLE = '<spring:message code="sysmgr.main.TITLE"/>';
var _SystemMgrTabList_MSG_TAB1TEXT = '<spring:message code="sysmgr.main.TAB1TEXT"/>';
var _SystemMgrTabList_MSG_TAB2TEXT = '<spring:message code="sysmgr.main.TAB2TEXT"/>';
var _SystemMgrTabList_MSG_TAB3TEXT = '<spring:message code="sysmgr.main.TAB3TEXT"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/systemmng/SystemMngTabList.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/systemmng/SystemMngTabList.jsx"></script>
	</c:otherwise>
</c:choose>