<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.member.MemberRestful mrf = new org.uengine.sns.member.MemberRestful(); %>
<%
	String sMainType = request.getAttribute("snsMainType") == null ? "snsMain" : (String)request.getAttribute("snsMainType");
%>
<!DOCTYPE html>
<html lang="${pageContext.response.locale.language}">
<head>
<spring:eval var="opModeRef" expression="@conf.getProperty('operation.mode')" />
<style>
.morecontent span {
    display: none;
}
</style>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title><spring:message code="basic.title" htmlEscape="true" /></title>
<%@include file="style.jsp"%>
<%@include file="MainLayer.jsp"%>

<script type="text/javascript">

var _MemberWidget_BASE_MEMBER      = '<%=mrf.BASE_MEMBER%>';
var _MemberWidget_session_memberId = '<%=session.getAttribute("memberId")%>';
var gSMainType = "<%=sMainType%>";

</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/main/MemberWidget.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/main/MemberWidget.jsx"></script>
  </c:otherwise>
</c:choose>

<style>
div.img_feedmore {
	display:none;
}
</style>

</head>
	
<body onclick="eventLayoutControll();">
<input type='hidden' id='currGroupInfo' name='currGroupInfo' value='' />
<input type='hidden' id='mainHeadInfo' name='mainHeadInfo' value='' />
<input type='hidden' id='shpFileRepoId' name='shpFileRepoId' value='' />
<input type='hidden' id='shpTargetId' name='shpTargetId' value='' />
<input type='hidden' id='pItgSchHid' name='pItgSchHid' value='' />
	<div class="lay-wrap">
	<c:choose>
	  <c:when  test="${pageContext.request.remoteAddr eq '127.0.0.1'}">
		<%@include file="../header/GNB.jsp"%>
	  </c:when >
	  <c:when  test="${opMode eq 'dev'}">
		<%@include file="../header/GNB.jsp"%>
	  </c:when >
	  <c:otherwise>
		${gnbStr}
	  </c:otherwise>
	</c:choose>
		<div class="lay-container" id="WholeScreen">
			<div id="Container">
				<div class="lay-container-wrap" style="height:100%;">
					<div id="SideNav">
						<div class='lay-snb' id='div_lay_snb'>
						<div class='snb-content'>
	                    	<div class='depth1-header'>
	                        	<!-- <h2 class='depth1-menu-title'>Social Network</h2> -->
	                    	</div>
	                    	<div class='menu-page-set' id='menu-page-set' style='display:none;'>
	                        	<a class='anchor-ico' title='home'><span class='ico-img ico-home' onClick='comeBackHome()'>Home</span></a>
		                        <a class='anchor-ico active' title='<spring:message code="main.sidenav.SideNav.FAVORITEHOVERTITLE"/>'><span class='ico-img ico-favorite' onClick='openFeedFavorite()'>Favorite</span></a>
	    	                    <a class='anchor-ico' title='<spring:message code="main.sidenav.SideNav.CONFIGLINKHOVERTITLE"/>'><span class='ico-img ico-setting' onClick='openMemberConfigPop()'>Settings</span></a>
	        	            </div>
							<div id='mygrp'></div>
							<div id='recentAct'></div>
							<div id='myTodoList'></div>
							<div id='tagCloudList' style='margin-bottom:10px'></div>
	            		 	<a class='banner' style='display:none;' target="_blank" href='http://sncsp.eagleoffice.co.kr/G/G00015/D00001/SNSWeb.pdf?Web=1'><span class='banner-manualnguide'><spring:message code="basic.manual" htmlEscape="true" /> Go</span></a>
	            		</div>
						<footer class='lay-footer' style='display:none;'>
                    		<p class='footer-logo'>uEngine</p>
                       		<p class='copyright'>© 2000-2016 uengine.org.<br />ALL RIGHTS RESERVED.</p>
                    	</footer>
	        			</div>	
					</div>
					<div class="lay-content lay-static-content">
            			<div class="lay-col1" id="div_lay_col1">
            				<div class="lay-contents-area lay-contents-margin">
								<div id="MainContents" style="border-top:0;"></div>
							</div>
						</div>

						<div class="lay-col2" id="div_lay_col2">
							<div id="RightContentArea" class="rightarea_wrap"></div>
            			</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>