<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<% org.uengine.sns.openapi.OpenAPIRestful openAPIRestUrl = new  org.uengine.sns.openapi.OpenAPIRestful();%>
<% org.uengine.sns.feed.FeedRestful frfMTL = new  org.uengine.sns.feed.FeedRestful();%>
<% org.uengine.sns.group.GroupRestful grfGroup = new org.uengine.sns.group.GroupRestful(); %>
<% org.uengine.sns.member.MemberRestful memGroup = new org.uengine.sns.member.MemberRestful(); %>
<%
	String isGroupYn = "N";
%>

<style type="text/css">
#itgDataSpan table {
	table-layout : fixed;
}

#itgDataSpan table td {
	white-space: nowrap; overflow: hidden;
}
</style>

<script type="text/javascript">
var _IntegrationTabList_isGroupYn = '<%=isGroupYn%>';
var _IntegrationTabList_openAPIRestUrl_SHAREPOINT_IF_ITG_SCH = '<%= openAPIRestUrl.SHAREPOINT_IF_ITG_SCH %>';
var _IntegrationTabList_frfMTL_BASE_FEED = '<%=frfMTL.BASE_FEED%>';
var _IntegrationTabList_grfGroup_GROUP_WIDGET_ACTIVITY = '<%=grfGroup.GROUP_WIDGET_ACTIVITY%>';
var _IntegrationTabList_userId = '${userId}';
var _IntegrationTabList_contextPath = '${contextPath}';
var _IntegrationTabList_memberId = '<%=session.getAttribute("memberId")%>';
var _IntegrationTabList_getMemberUrl = '<%=memGroup.MEMBER_SYNCKEY %>';

var _IntegrationTabList_MSG_SEARCHRESULTTEXT1 = '<spring:message code="integrationtablist.pop.SEARCHRESULTTEXT1"/>';
var _IntegrationTabList_MSG_SEARCHRESULTTEXT2 = '<spring:message code="integrationtablist.pop.SEARCHRESULTTEXT2"/>';
var _IntegrationTabList_MSG_SUBTITLE = '<spring:message code="integrationtablist.pop.SUBTITLE"/>';
var _IntegrationTabList_MSG_TAB1TEXT = '<spring:message code="integrationtablist.pop.TAB1TEXT"/>';
var _IntegrationTabList_MSG_TAB2TEXT = '<spring:message code="integrationtablist.pop.TAB2TEXT"/>';
var _IntegrationTabList_MSG_TAB3TEXT = '<spring:message code="integrationtablist.pop.TAB3TEXT"/>';
var _IntegrationTabList_MSG_TAB4TEXT = '<spring:message code="integrationtablist.pop.TAB4TEXT"/>';
var _IntegrationTabList_MSG_TAB5TEXT = '<spring:message code="integrationtablist.pop.TAB5TEXT"/>';
var _IntegrationTabList_MSG_TAB6TEXT = '<spring:message code="integrationtablist.pop.TAB6TEXT"/>';
var _IntegrationTabList_MSG_TAB7TEXT = '<spring:message code="integrationtablist.pop.TAB7TEXT"/>';

var _IntegrationTabList_MSG_TAB1REFERENCETEXT = '<spring:message code="integrationtablist.pop.TAB1.REFERENCETEXT"/>';
var _IntegrationTabList_MSG_TAB2COLUMN1TEXT = '<spring:message code="integrationtablist.pop.TAB2.COLUMN1TEXT"/>';
var _IntegrationTabList_MSG_TAB2COLUMN2TEXT = '<spring:message code="integrationtablist.pop.TAB2.COLUMN2TEXT"/>';
var _IntegrationTabList_MSG_TAB2COLUMN3TEXT = '<spring:message code="integrationtablist.pop.TAB2.COLUMN3TEXT"/>';
var _IntegrationTabList_MSG_TAB2COLUMN4TEXT = '<spring:message code="integrationtablist.pop.TAB2.COLUMN4TEXT"/>';
var _IntegrationTabList_MSG_TAB3COLUMN1TEXT = '<spring:message code="integrationtablist.pop.TAB3.COLUMN1TEXT"/>';
var _IntegrationTabList_MSG_TAB3COLUMN2TEXT = '<spring:message code="integrationtablist.pop.TAB3.COLUMN2TEXT"/>';
var _IntegrationTabList_MSG_TAB3COLUMN3TEXT = '<spring:message code="integrationtablist.pop.TAB3.COLUMN3TEXT"/>';
var _IntegrationTabList_MSG_TAB3JOINREQUESTMSG = '<spring:message code="integrationtablist.pop.TAB3.JOINREQUESTMSG"/>';
var _IntegrationTabList_MSG_TAB4REFERENCETEXT = '<spring:message code="integrationtablist.pop.TAB4.REFERENCETEXT"/>';
var _IntegrationTabList_MSG_TAB5COLUMN1TEXT = '<spring:message code="integrationtablist.pop.TAB5.COLUMN1TEXT"/>';
var _IntegrationTabList_MSG_TAB5COLUMN2TEXT = '<spring:message code="integrationtablist.pop.TAB5.COLUMN2TEXT"/>';
var _IntegrationTabList_MSG_TAB5COLUMN3TEXT = '<spring:message code="integrationtablist.pop.TAB5.COLUMN3TEXT"/>';
var _IntegrationTabList_MSG_TAB5COLUMN4TEXT = '<spring:message code="integrationtablist.pop.TAB5.COLUMN4TEXT"/>';
var _IntegrationTabList_MSG_TAB6REFERENCETEXT = '<spring:message code="integrationtablist.pop.TAB6.REFERENCETEXT"/>';
var _IntegrationTabList_MSG_TAB7REFERENCETEXT = '<spring:message code="integrationtablist.pop.TAB7.REFERENCETEXT"/>';
var _IntegrationTabList_MSG_TOTALSEARCHRESULTISEMPTY = '<spring:message code="basic.msg.totalsearchresultisEmpty"/>';

</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/integration/IntegrationTabList.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/integration/IntegrationTabList.jsx"></script>
	</c:otherwise>
</c:choose>
