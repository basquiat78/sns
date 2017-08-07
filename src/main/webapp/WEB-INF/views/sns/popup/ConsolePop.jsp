<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/popup/ConsolePop.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/popup/ConsolePop.jsx"></script>
	</c:otherwise>
</c:choose>
	
<body>
	<div class="click_popup_wrap ,hidden" style="display: none;" id='MsgPop'>
		<div class="pop-modalwindow-header" style="cursor:move;">
			<div class="pop-modalwindow-title"><spring:message code="basic.consolepopup.TITLE"/></div>
	        <div class="pop-modalwindow-header-option">
	        	<a class="ico-anchor"><span class="ico-img ico-close" onclick="closeMessagePopup()"><spring:message code="basic.consolepopup.CLOSEBTNTEXT"/></span></a>
	    	</div>
		</div>
		<!-- <h3 style="line-height:36px; width:430px;">메시지<span class="btn_close"><img src="../images/btn_close.png" width="13" height="13" onclick="closeMessagePopup()" /></span></h3>
		 -->
		<div class="click_popup" style="width:424px;">
			<div class='gmsub' id='MsgPopup' style='height:180px'>
			</div>
		</div>
	</div>
</body>