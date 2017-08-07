<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
//	String syncKey = session.getAttribute("userId") == null ? "" : (String)session.getAttribute("userId");
	String siteType = "A";
%>

<script type="text/javascript">

var _SharepointDocList_SITETYPE =  '<%=siteType%>'   ;
var _SharepointDocList_USERID =  '${userId}'   ;

var _SharepointDocList_MSG_NOGROUPFOLDERMSG = '<spring:message code="sharepoint.config.NOGROUPFOLDERMSG"/>';
var _SharepointDocList_MSG_NOLINKAGEFOLDERMSG = '<spring:message code="sharepoint.config.NOLINKAGEFOLDERMSG"/>';
var _SharepointDocList_MSG_NOCHOSENFOLDERMSG = '<spring:message code="sharepoint.config.NOCHOSENFOLDERMSG"/>';
var _SharepointDocList_MSG_DELETEBTNTEXT = '<spring:message code="sharepoint.config.DELETEBTNTEXT"/>';
var _SharepointDocList_MSG_DUPLICATEFILEEXISTMSG = '<spring:message code="sharepoint.config.DUPLICATEFILEEXISTMSG"/>';
var _SharepointDocList_MSG_NOCHOSENFILEMSG = '<spring:message code="sharepoint.config.NOCHOSENFILEMSG"/>';
</script>


<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
        <script type="text/javascript" src="../jsx/build/sns/config/SharepointDocList.js"></script>
  </c:when >
  <c:otherwise>
        <script type="text/jsx" src="../jsx/src/sns/config/SharepointDocList.jsx"></script>
  </c:otherwise>
</c:choose>


	<div class="click_popup_wrap ,hidden" style="display: none;" id='SharepointDocPop'>
		<div class="pop-modalwindow-header">
			<div class="pop-modalwindow-title">Sharepoint Folder</div>
	        <div class="pop-modalwindow-header-option">
	        	<a class="ico-anchor"><span class="ico-img ico-close" onclick="closeSharepointDocPop()">닫기</span></a>
	    	</div>
		</div>
		<!-- <h3 style="line-height:36px; width:606px;">Sharepoint Folder<span class="btn_close"><img src="../images/btn_close.png" width="13" height="13" onclick="closeSharepointDocPop()" /></span></h3>
		 -->
		<div class="click_popup" style="width:600px;height:400px;">
			<div class='gmsub'>
				<div id='SharepointDocPopup' class='lay-contents-area lay-conteont-margin' style='height:310px;overflow-y:auto'></div>
			</div>
			<div class="pop-modalwindow-btn-area">
					<button class="btn-m btn-attention" onclick="javascript:setSelectDocInfo();">선택</button>
			</div>
			
		</div>
		
	</div>
	
