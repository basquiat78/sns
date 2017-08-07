<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.system.SystemMngRestful smrSTS = new  org.uengine.sns.system.SystemMngRestful();%>

<script type="text/javascript">
var _SystemTenantSearch_smrSTS_BASE_SYSTEM_TENANT = '<%=smrSTS.BASE_SYSTEM_TENANT%>';
var _SystemTenantSearch_smrSTS_BASE_SYSTEM_COMPANY = '<%=smrSTS.BASE_SYSTEM_COMPANY%>';

var _SystemTenantSearch_MSG_CREATETENANTBTNTEXT = '<spring:message code="sysmgr.TAB3.CONT.CREATETENANTBTNTEXT"/>';
var _SystemTenantSearch_MSG_POPUPCOLUMN1TEXT = '<spring:message code="sysmgr.TAB3.POPUP.COLUMN1TEXT"/>';
var _SystemTenantSearch_MSG_COLUMN1TEXT = '<spring:message code="sysmgr.TAB3.CONT.COLUMN1TEXT"/>';
var _SystemTenantSearch_MSG_COLUMN2TEXT = '<spring:message code="sysmgr.TAB3.CONT.COLUMN2TEXT"/>';
var _SystemTenantSearch_MSG_COLUMN3TEXT = '<spring:message code="sysmgr.TAB3.CONT.COLUMN3TEXT"/>';
var _SystemTenantSearch_MSG_COLUMN4TEXT = '<spring:message code="sysmgr.TAB3.CONT.COLUMN4TEXT"/>';
var _SystemTenantSearch_MSG_COLUMN5TEXT = '<spring:message code="sysmgr.TAB3.CONT.COLUMN5TEXT"/>';
var _SystemTenantSearch_MSG_INNERTEXT = '<spring:message code="sysmgr.TAB3.CONT.INNERTEXT"/>';
var _SystemTenantSearch_MSG_OUTERTEXT = '<spring:message code="sysmgr.TAB3.CONT.OUTERTEXT"/>';
var _SystemTenantSearch_MSG_CONFIGBTNTEXT = '<spring:message code="sysmgr.TAB3.CONT.CONFIGBTNTEXT"/>';
var _SystemTenantSearch_MSG_COLUMN1OPTION1TEXT = '<spring:message code="sysmgr.TAB3.POPUP.COLUMN1OPTION1TEXT"/>';
var _SystemTenantSearch_MSG_COLUMN1OPTION2TEXT = '<spring:message code="sysmgr.TAB3.POPUP.COLUMN1OPTION2TEXT"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/systemmng/searchbox/SystemTenantSearch.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/systemmng/searchbox/SystemTenantSearch.jsx"></script>
	</c:otherwise>
</c:choose>
	
	<div id="tenant_to_pop_up" class="share_area_popup ,hidden" style="display:none">
		<div class="pop-modalwindow-header" style="cursor:move;">
			<div class="pop-modalwindow-title"><spring:message code="sysmgr.TAB3.POPUP.TITLE"/></div>
            <div class="pop-modalwindow-header-option">
            	<a class="ico-anchor"><span class="ico-img ico-close" onClick="closeTenantConfigPop()">닫기</span></a>
            </div>
        </div>
	    <div class="share_area_wrap" style="width:624px">
	    	<div class="select_com" id='companyList'></div>
            
            <div class="outnetwork">
           	  	<h4><spring:message code="sysmgr.TAB3.POPUP.COLUMN2TEXT"/><input type="checkbox" name='isNetwork' onChange="chgCheck()"/></h4>
           	  	<ul class="list_out">
               	  	<span style="width:150px; display:inlineBlock; float:left; ine-height:26px; margin-left:5px"><spring:message code="sysmgr.TAB3.POPUP.COLUMN3TEXT"/></span>
                  	<span style="width:400px; display:inlineBlock; float:left"><input name="networkApiUrl" type="text" style="width:360px" disabled='disabled'/></span>
              	</ul>
              	<ul class="list_out">
                  	<span style="width:150px; display:inlineBlock; float:left; line-height:26px; margin-left:5px"><spring:message code="sysmgr.TAB3.POPUP.COLUMN4TEXT"/></span>
                  	<span style="width:400px; display:inlineBlock; float:left"><input name="networkAuthIp" type="text" style="width:360px"disabled='disabled' /></span>
              	</ul>
              	<ul class="list_out">
                  	<span style="width:150px; display:inlineBlock; float:left; line-height:26px; margin-left:5px"><spring:message code="sysmgr.TAB3.POPUP.COLUMN5TEXT"/></span>
                  	<span style="width:400px; display:inlineBlock; float:left"><input name="networkAuthToken" type="text" style="width:360px" disabled='disabled'/></span>
              	</ul>
         	</div>
         	
			<div class="pop-modalwindow-btn-area">
			  	<button type="button" class="btn-m btn-attention" onClick="saveTenant()"><spring:message code="sysmgr.TAB3.POPUP.SAVEBTNTEXT"/></button>
			  	<button id='tenantDeleteBtn' style='paddin-left:10px; display:none' type="button" class="btn-m btn-attention" onClick="deleteTenant()"><spring:message code="sysmgr.TAB3.POPUP.DELETEBTNTEXT"/></button>
			</div>
	    </div>
	</div>