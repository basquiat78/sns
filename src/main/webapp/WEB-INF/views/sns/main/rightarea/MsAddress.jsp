<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.member.MemberRestful mrfMA = new org.uengine.sns.member.MemberRestful();%>
<% org.uengine.sns.feed.FeedRestful frfMA = new  org.uengine.sns.feed.FeedRestful();%>
<% org.uengine.sns.openapi.OpenAPIRestful oarMA =  new org.uengine.sns.openapi.OpenAPIRestful();%>

<script type="text/javascript">
var _MsAddress_oarMA_GW_CONTACT_LYNC = '<%=oarMA.GW_CONTACT_LYNC%>';
var _MsAddress_oarMA_GW_CONTACT_FOLDER = '<%=oarMA.GW_CONTACT_FOLDER%>';
var _MsAddress_oarMA_GW_CONTACT_LIST = '<%=oarMA.GW_CONTACT_LIST%>';
var _MsAddress_userId = '${userId}';

var _MsAddress_MSG_LYNCTABTEXT = '<spring:message code="main.rightarea.MsAddress.LYNCTABTEXT"/>';
var _MsAddress_MSG_OUTLOOKTABTEXT = '<spring:message code="main.rightarea.MsAddress.OUTLOOKTABTEXT"/>';
var _MsAddress_MSG_IAMAOUTCAST = '<spring:message code="basic.msg.iamaoutcast"/>';

</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/main/rightarea/MsAddress.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/main/rightarea/MsAddress.jsx"></script>
	</c:otherwise>
</c:choose>