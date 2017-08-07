<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.system.SystemMngRestful smrFS = new  org.uengine.sns.system.SystemMngRestful();%>
<% org.uengine.sns.common.code.SNSCodeMaster codeMaster = new  org.uengine.sns.common.code.SNSCodeMaster();%>

<script type="text/javascript">
var _SystemFeedSearch_locale_language = '${pageContext.response.locale.language}';
var _SystemFeedSearch_smrFS_BASE_SYSTEM_FEED = '<%=smrFS.BASE_SYSTEM_FEED%>';
var _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_GENERAL = '<%=org.uengine.sns.common.code.SNSCodeMaster.FEED_TYPE.GENERAL.toString()%>';
var _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_NOTICE = '<%=org.uengine.sns.common.code.SNSCodeMaster.FEED_TYPE.NOTICE.toString()%>';
var _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_SHARE = '<%=org.uengine.sns.common.code.SNSCodeMaster.FEED_TYPE.SHARE.toString()%>';
var _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_POLL = '<%=org.uengine.sns.common.code.SNSCodeMaster.FEED_TYPE.POLL.toString()%>';
var _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_BOARD = '<%=org.uengine.sns.common.code.SNSCodeMaster.FEED_TYPE.BOARD.toString()%>';
var _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_SHAREPOINT = '<%=org.uengine.sns.common.code.SNSCodeMaster.FEED_TYPE.SHAREPOINT.toString()%>';
var _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_APPROVAL = '<%=org.uengine.sns.common.code.SNSCodeMaster.FEED_TYPE.APPROVAL.toString()%>';

var _SystemFeedSearch_MSG_TAB1COLUMN1TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN1TEXT"/>';
var _SystemFeedSearch_MSG_TAB1COLUMN2TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN2TEXT"/>';
var _SystemFeedSearch_MSG_TAB1COLUMN3TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN3TEXT"/>';
var _SystemFeedSearch_MSG_TAB1COLUMN4TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN4TEXT"/>';
var _SystemFeedSearch_MSG_TAB1COLUMN2OPTION1TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN2OPTION1TEXT"/>';
var _SystemFeedSearch_MSG_TAB1COLUMN2OPTION2TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN2OPTION2TEXT"/>';
var _SystemFeedSearch_MSG_TAB1COLUMN2OPTION3TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN2OPTION3TEXT"/>';
var _SystemFeedSearch_MSG_TAB1COLUMN2OPTION4TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN2OPTION4TEXT"/>';
var _SystemFeedSearch_MSG_TAB1COLUMN2OPTION5TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN2OPTION5TEXT"/>';
var _SystemFeedSearch_MSG_TAB1COLUMN2OPTION6TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN2OPTION6TEXT"/>';
var _SystemFeedSearch_MSG_TAB1COLUMN2OPTION7TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN2OPTION7TEXT"/>';
var _SystemFeedSearch_MSG_TAB1COLUMN2OPTION8TEXT = '<spring:message code="sysmgr.TAB1.TAB1COLUMN2OPTION8TEXT"/>';
var _SystemFeedSearch_MSG_SEARCHBTNTEXT = '<spring:message code="sysmgr.TAB1.SEARCHBTNTEXT"/>';
var _SystemFeedSearch_MSG_MOREBTNTEXT = '<spring:message code="sysmgr.TAB1.MOREBTNTEXT"/>';	
var _SystemFeedSearch_MSG_TOTALSEARCHRESULTISEMPTY = '<spring:message code="basic.msg.totalsearchresultisEmpty"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/systemmng/searchbox/SystemFeedSearch.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/systemmng/searchbox/SystemFeedSearch.jsx"></script>
	</c:otherwise>
</c:choose>