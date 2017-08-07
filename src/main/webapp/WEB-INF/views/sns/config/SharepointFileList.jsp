<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
//	String syncKey = session.getAttribute("userId") == null ? "" : (String)session.getAttribute("userId");
	String siteType = "A";
%>

<script type="text/javascript">

var _SharepointFileList_SITETYPE =  '<%=siteType%>'   ;
var _SharepointFileList_USERID =  '${userId}'   ;

var _SharepointFileList_MSG_NOCHOOSEFOLDER = '<spring:message code="sharepoint.file.NOCHOOSEFOLDER"/>';
var _SharepointFileList_MSG_NOLINKAGEFOLDERMSG = '<spring:message code="sharepoint.config.NOLINKAGEFOLDERMSG"/>';
var _SharepointFileList_MSG_DELETEBTNTEXT = '<spring:message code="sharepoint.config.DELETEBTNTEXT"/>';
var _SharepointFileList_MSG_NOCHOSENFILEMSG = '<spring:message code="sharepoint.config.NOCHOSENFILEMSG"/>';


var _SharepointFileList_DUPLFILE = '<spring:message code="sharepoint.file.DUPLFILE"/>';
var _SharepointFileList_MSG_COLUMN1TEXT = '<spring:message code="sharepoint.file.COLUMN1TEXT"/>';
var _SharepointFileList_MSG_COLUMN2TEXT = '<spring:message code="sharepoint.file.COLUMN2TEXT"/>';
var _SharepointFileList_MSG_COLUMN3TEXT = '<spring:message code="sharepoint.file.COLUMN3TEXT"/>';
var _SharepointFileList_MSG_COLUMN4TEXT = '<spring:message code="sharepoint.file.COLUMN4TEXT"/>';



</script>


<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
        <script type="text/javascript" src="../jsx/build/sns/config/SharepointFileList.js"></script>
  </c:when >
  <c:otherwise>
        <script type="text/jsx" src="../jsx/src/sns/config/SharepointFileList.jsx"></script>
  </c:otherwise>
</c:choose>


	<div class="click_popup_wrap ,hidden" style="display: none;height:710px;" id='SharepointFilePop'>
		<div class="pop-modalwindow-header">
			<div class="pop-modalwindow-title">Sharepoint File</div>
	        <div class="pop-modalwindow-header-option">
	        	<a class="ico-anchor"><span class="ico-img ico-close" onclick="closeSharepointFilePop()">닫기</span></a>
	    	</div>
		</div>
		<div class="click_popup" style="width:1075px;">
			<div class='gmsub'>
				<div id='SharepointFilePopup' class='lay-contents-area lay-conteont-margin' style='border-top:none'></div>
			</div>
			<div class="pop-modalwindow-btn-area">
					<button class="btn-m btn-attention" onclick="javascript:setShpFileInfo();">선택</button>
			</div>
			
		</div>
		
	</div>
	
