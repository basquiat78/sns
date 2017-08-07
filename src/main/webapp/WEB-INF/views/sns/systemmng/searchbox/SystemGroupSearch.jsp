<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.system.SystemMngRestful smrGS = new  org.uengine.sns.system.SystemMngRestful();%>
<% org.uengine.sns.group.GroupRestful grfGS = new org.uengine.sns.group.GroupRestful(); %>

<script type="text/javascript">
var _SystemGroupSearch_locale_language = '${pageContext.response.locale.language}';
var _SystemGroupSearch_smrGS_BASE_SYSTEM_GROUP = '<%=smrGS.BASE_SYSTEM_GROUP%>';
var _SystemGroupSearch_grfGS_GROUP_PIC = '<%=grfGS.GROUP_PIC%>';

var _SystemGroupSearch_MSG_TAB1COLUMN1TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN1TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN2TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN2TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN3TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN3TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN4TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN4TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN5TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN5TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN6TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN6TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN2OPTION1TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN2OPTION1TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN2OPTION2TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN2OPTION2TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN2OPTION3TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN2OPTION3TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN3OPTION1TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN3OPTION1TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN3OPTION2TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN3OPTION2TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN3OPTION3TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN3OPTION3TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN4OPTION1TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN4OPTION1TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN4OPTION2TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN4OPTION2TEXT"/>';
var _SystemGroupSearch_MSG_TAB1COLUMN4OPTION3TEXT = '<spring:message code="sysmgr.TAB2.TAB1COLUMN4OPTION3TEXT"/>';
var _SystemGroupSearch_MSG_SEARCHBTNTEXT = '<spring:message code="sysmgr.TAB2.SEARCHBTNTEXT"/>';
var _SystemGroupSearch_MSG_MOREBTNTEXT = '<spring:message code="sysmgr.TAB2.MOREBTNTEXT"/>';

var _SystemGroupSearch_MSG_GROUPTYPE1 = '<spring:message code="sysmgr.TAB2.GROUPTYPE1"/>';
var _SystemGroupSearch_MSG_GROUPTYPE2 = '<spring:message code="sysmgr.TAB2.GROUPTYPE2"/>';
var _SystemGroupSearch_MSG_ISPUBLIC1 = '<spring:message code="sysmgr.TAB2.ISPUBLIC1"/>';
var _SystemGroupSearch_MSG_ISPUBLIC2 = '<spring:message code="sysmgr.TAB2.ISPUBLIC2"/>';
var _SystemGroupSearch_MSG_CONFIGBTNTEXT = '<spring:message code="sysmgr.TAB2.CONFIGBTNTEXT"/>';

var _SystemGroupSearch_MSG_TOTALSEARCHRESULTISEMPTY = '<spring:message code="basic.msg.totalsearchresultisEmpty"/>';

</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/systemmng/searchbox/SystemGroupSearch.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/systemmng/searchbox/SystemGroupSearch.jsx"></script>
	</c:otherwise>
</c:choose>
