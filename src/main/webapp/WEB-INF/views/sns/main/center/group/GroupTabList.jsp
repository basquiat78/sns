<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.group.GroupRestful grfGTL = new  org.uengine.sns.group.GroupRestful();%>

<script type="text/javascript">

var _GroupTabList_BASE_GROUP_FEED = '<%=grfGTL.BASE_GROUP_FEED%>';
var _GroupTabList_BASE_KNWLDG_URL = '<%=grfGTL.BASE_KNWLDG_URL%>';
var _GroupTabList_BASE_FOLLOWER_TYPE_GROUP = '<%=org.uengine.sns.common.code.SNSCodeMaster.FOLLOWER_TYPE.GROUP.toString()%>';

var _GroupTabList_MSG_GROUPTAB1TEXT = '<spring:message code="group.grouptablist.GROUPTAB1TEXT"/>';
var _GroupTabList_MSG_GROUPTAB2TEXT = '<spring:message code="group.grouptablist.GROUPTAB2TEXT"/>';
var _GroupTabList_MSG_GROUPTAB3TEXT = '<spring:message code="group.grouptablist.GROUPTAB3TEXT"/>';
var _GroupTabList_MSG_GROUPTAB4TEXT = '<spring:message code="group.grouptablist.GROUPTAB4TEXT"/>';

</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/main/center/group/GroupTabList.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/main/center/group/GroupTabList.jsx"></script>
  </c:otherwise>
</c:choose>
