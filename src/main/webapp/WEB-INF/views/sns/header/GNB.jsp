<%@ page contentType="text/html;charset=UTF-8" %> 
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!-- 한화 공통 -->
<link href="../css/hhsc-gnb.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../js/common/jquery.gnb.js"></script>
<!-- 한화 공통 -->

<spring:eval var="opMode" expression="@conf.getProperty('operation.mode')" />
<spring:eval var="wsUrl" expression="@conf.getProperty('websocket.server.url')" />

<c:set var="url">${pageContext.request.requestURL}</c:set>
<c:set var="uri" value="${pageContext.request.requestURI}" />

<script src="../js/common/noti-alarm.js"></script>

<!--
<script src="../js/common/websocket-noti.js"></script>		 DEL 2015.11.23 websocket 삭제  -->

<script type="text/javascript">

// var _sns_domain = "127.0.0.1:8080";
var _sns_domain = '${fn:substringAfter(fn:substring(url, 0, (fn:length(url) - fn:length(uri)) ), "http://")}'; 
// var _sns_domain = '${fn:substringAfter(wsUrl, "ws://")}';
var _sns_userSyncKey = '${userId}';
// Websocket.initialize("${userId}", _sns_domain + "/sns");
// Websocket.initialize("${userId}", _sns_domain + "/sns", "_id_noti_cnt", function() {});	// DEL 2015.11.23 websocket 삭제

Noti.initialize("${userId}", _sns_domain + "/sns"); 

var langset = '${pageContext.response.locale.language}';

</script>
<script src="../js/common/gnb_sns_alarm.js"></script>

		<div class="lay-gnb">
			<!-- 한화S&C 그룹포탈 GNB -->
			<!-- [D] 검색에 적용할 GNB영역은 여기부터 적용해주세요 -->
			<div class="hhsc-gnb">
				<div class="hhsc-gnb-lay-top">
					<h1 class="hhsc-logo-area"><a class="hhsc-logo" href="#">uEngine Solutions</a></h1>
					<!-- Quick menu -->
					<ul class="hhsc-nav-util"> 
						<li class="hhsc-nav-util-item"><b>SNS GNB Area</b></li>
						<li class="hhsc-nav-util-item"></li>
						<li class="hhsc-nav-util-item">
							<!-- 관리자메뉴 -->
						</li>
					</ul>
					<!-- //Quick menu -->
					
					<!-- 통합검색 -->
					<div class="hhsc-search-unified">
						<div class="hhsc-search-wrap">
						</div>
					</div>
					<!-- //통합검색 -->
				</div>
				<div class="hhsc-gnb-lay-bottom">
					<!-- Global Navigation -->
					<nav class="hhsc-nav-gnb">
						<ul class="hhsc-nav-gnb-root">
							<!-- [D] 메뉴 선택시 .hhsc-active 적용 -->
							<li class="hhsc-gnb-item hhsc-active">
								<a href="#" class="hhsc-gnb-anchor">Social Network</a>
							</li>
						</ul>
					</nav>
					<!-- //Global Navigation -->
					<!-- 접속자 정보 -->
					<div class="hhsc-gnb-connect-data">
						<div class="hhsc-btn-layer hhsc-connector-info" data-role="layermenu">
							<a class="hhsc-connector-anchor" data-role="layermenu-button">
								<span class="hhsc-connector-pic">
									<!-- <span class="hhsc-connector-img"><img src="../../styles/images/sampleimg/yellow_profile3.jpg"></span> -->
									<span class="hhsc-connector-img"><img src="../images/sampleimg/yellow_profile10.jpg"></span>
								</span>
								<p class="hhsc-connector-data">
									<span class="hhsc-data-user">${memberName}</span><span class="hhsc-bu"></span>
									<span class="hhsc-data-belong"></span>
								</p>
							</a>
							<div class="hhsc-connector-layerbox" data-role="layermenu-layer">
								<span class="hhsc-bu-pointer"></span>
								<ul class="hhsc-layer-list">
									<li class="hhsc-layer-item"><a class="hhsc-layer-anchor" href="../login.do">로그아웃</a></li>
								</ul>
								
							</div>
						</div>
						<!-- 접속자 맞춤 메뉴 -->
						<div class="hhsc-connector-menu">
							<!-- Social Alarm -->
							<div class="hhsc-connector-menu-box hhsc-connector-social">
								<a class="hhsc-connector-menu-anchor">
									<span class="hhsc-ico-img hhsc-ico-social">Social Alarm</span>
									<span class="hhsc-push" id="_id_noti_cnt">-</span>
									<span class="hhsc-bu-layermenu"></span>
								</a>
								<div class="hhsc-connector-menu-layer" style="display:none;">
									<div class="hhsc-layer-container">
										<div class="hhsc-layer-header">
											<div class="hhsc-layer-title">Social Alarm</div>
											<div class="hhsc-layer-description">Social Network에서 발생하는 피드에 대한 알림을 제공합니다.</div>
											<div class="hhsc-layer-btn-area">
												<a href="#" class="hhsc-btn hhsc-btn-attention" onclick="javascript:goTotalNotiList();return false;">Alarm More</a>
											</div>
										</div>
										<div class="hhsc-layer-contents">
											<div class="hhsc-layer-contents-scroll">
												<ul class="hhsc-sociallist">
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- //Social Alarm -->
							
						</div>
						<!-- //접속자 맞춤 메뉴 -->
					</div>
					<!-- //접속자 정보 -->
				</div>
			</div>
			<!-- //한화S&C 그룹포탈 GNB -->
		</div>
		