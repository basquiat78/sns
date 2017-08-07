<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.group.GroupRestful grfmainContent = new org.uengine.sns.group.GroupRestful(); %>

	
	<%@include file="HeadInfo.jsp"%>
	<%@include file="member/MemberTabList.jsp"%>
	<%@include file="group/GroupTabList.jsp"%>

<script type="text/javascript">

var _MainContents_targetMemberId   = '<%=request.getAttribute("targetMemberId")%>';
var _MainContents_session_memberId = '<%=session.getAttribute("memberId")%>';
var _MainContents_MSG_SEARCHINPUTFIELDISEMPTYMSG = '<spring:message code="group.search.SEARCHINPUTFIELDISEMPTYMSG"/>';

function retouchStyle(divId) {
	var liElement = $('.malgun13 > li');
	for(var i=0; i<liElement.length; i++) {
		if( $(liElement[i]).hasClass('tab_on')) $(liElement[i]).removeClass('tab_on').addClass('tab_off').removeAttr('style');
	}

	$('.btn_feedmore').hide();
	$('.img_feedmore').show();
	//$('.img_feedmore').show(0).delay(500).hide(0);
	
	$(divId).removeClass('tab_off').addClass('tab_on').attr('style', 'color:#fe630f; font-weight:bold;');
}

</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/main/center/MainContents.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/main/center/MainContents.jsx"></script>
  </c:otherwise>
</c:choose>
