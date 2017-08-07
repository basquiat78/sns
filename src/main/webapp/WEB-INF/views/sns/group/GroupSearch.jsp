<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.group.GroupRestful grfGroupSearch = new org.uengine.sns.group.GroupRestful(); %>

<style>
.tableBox table tbody td {line-height : 0px; padding:10px 0;}
</style>

<script type="text/javascript">
var _GroupSearch_session_memberId = '<%=session.getAttribute("memberId")%>';
var _GroupSearch_grfGroupSearch_BASE_GFOLLOWER_URL = '<%=grfGroupSearch.BASE_GFOLLOWER_URL%>';
var _GroupSearch_grfGroupSearch_GROUP_PIC = '<%=grfGroupSearch.GROUP_PIC%>';
//var _GroupSearch_grfGroupSearch_BASE_GROUP = '<%=grfGroupSearch.BASE_GROUP%>';
var _GroupSearch_grfGroupSearch_BASE_GROUP = '<%=grfGroupSearch.BASE_GROUP_SEARCH%>';

var _GroupSearch_MSG_JOINCONFIRMMSG = '<spring:message code="group.search.JOINCONFIRMMSG"/>';
var _GroupSearch_MSG_INNERGROUPTEXT = '<spring:message code="group.search.INNERGROUPTEXT"/>';
var _GroupSearch_MSG_OUTERGROUPTEXT = '<spring:message code="group.search.OUTERGROUPTEXT"/>';
var _GroupSearch_MSG_JOINBTNTEXT = '<spring:message code="group.search.JOINBTNTEXT"/>';
var _GroupSearch_MSG_JOINREQUESTBTNTEXT = '<spring:message code="group.search.JOINREQUESTBTNTEXT"/>';
var _GroupSearch_MSG_SEARCHINPUTTEXT = '<spring:message code="group.search.SEARCHINPUTTEXT"/>';
var _GroupSearch_MSG_TAB1COLUMN1 = '<spring:message code="group.search.TAB1COLUMN1"/>';
var _GroupSearch_MSG_TAB1COLUMN2 = '<spring:message code="group.search.TAB1COLUMN2"/>';
var _GroupSearch_MSG_TAB1COLUMN3 = '<spring:message code="group.search.TAB1COLUMN3"/>';
var _GroupSearch_MSG_TAB1COLUMN4 = '<spring:message code="group.search.TAB1COLUMN4"/>';

var _GroupSearch_MSG_JOINSTATUSYES = '<spring:message code="group.headinfo.JOINSTATUSYES"/>';
var _GroupSearch_MSG_JOINSTATUSNO = '<spring:message code="group.headinfo.JOINSTATUSNO"/>';
var _GroupSearch_MSG_JOINSTATUSSTANDBY = '<spring:message code="group.headinfo.JOINSTATUSSTANDBY"/>';
var _GroupSearch_MSG_JOINSTATUSREJECTED = '<spring:message code="group.headinfo.JOINSTATUSREJECTED"/>';

var _GroupSearch_MSG_SEARCHINPUTFIELDISEMPTYMSG = '<spring:message code="group.search.SEARCHINPUTFIELDISEMPTYMSG"/>';

var _GroupSearch_MSG_spring_message_nogroup			= '<spring:message code="basic.msg.nogroup" htmlEscape="true" />';
</script>
	
<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/group/GroupSearch.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/group/GroupSearch.jsx"></script>
	</c:otherwise>
</c:choose>

	<div class="click_popup_wrap ,hidden" style="display: none;" id='GroupSearchPop'>
		<div class="pop-modalwindow-header" style="cursor:move;">
			<div class="pop-modalwindow-title"><spring:message code="group.search.title"/></div>
	        <div class="pop-modalwindow-header-option">
	        	<a class="ico-anchor"><span class="ico-img ico-close" onclick="closeGroupSearchPop()">닫기</span></a>
	    	</div>
		</div>
		<div class="click_popup" style="width:824px; overflow:auto;">
			<div class='gmsub' style="overflow:visible; border:0;">
				<div id='GroupSearchPopup' class='lay-contents-area lay-conteont-margin' style='height:580px;overflow-y: visible; border:0;'></div>
			</div>
		</div>
	</div>
