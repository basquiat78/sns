<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<c:set var="now" value="<%=new java.util.Date().getTime()%>" />

<c:choose>
	<c:when  test="${pageContext.request.secure}">
		<c:set var="httpProtocol" value="https" />
	</c:when >
	<c:otherwise>
		<c:set var="httpProtocol" value="http" />
	</c:otherwise>
</c:choose>
<!-- <%= request.getHeader("ExternalWebServer") %> -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, maximum-scale=1.0"> <!-- mobile device view -->
	
	<link rel="shortcut icon" href="../images/favicon.ico" />
	<!-- <link rel="shortcut icon" href="${httpProtocol}://snc.eagleoffice.co.kr/sns/images/favicon.ico" /> -->
	
	<script>var contextpath = '${pageContext.request.contextPath}';
	$FAVORITE_SCROLLING_ONOFF = 'ON';
	$FAVORITE_WORKING_ON = 'OFF';
	
	$TAG_SCROLLING_ONOFF = 'ON';
	$TAG_WORKING_ON = 'OFF';
	
	$TODO_SIMPLE_SCROLLING_ONOFF = 'ON';
	$TODO_SIMPLE_WORKING_ON = 'OFF';
	
	$TOTALNOTI_SCROLLING_ONOFF = 'ON';
	$FEED_SCROLLING_ONOFF = 'ON';
	
	$SHAREPOINT_FILE_SCROLLING_ONOFF = 'ON';
	
	// 그룹 또는 사람 (GROUP or USER)
	var contentsType = '';
	
	var _style_MSG_COMMON_ISLOADEDBEFORE = '<spring:message code="basic.msg.isloadedbefore"/>';
	var _style_MSG_COMMON_ISLOADEDBEFORETITLE = '<spring:message code="basic.msg.isloadedbeforetitle"/>';
	</script>
	
	<style type="text/css">
		body {
			margin: 0;
			padding: 0;
			font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
			font-size: 14px;
		}
	
		#script-warning {
			display: none;
			background: #eee;
			border-bottom: 1px solid #ddd;
			padding: 0 10px;
			line-height: 40px;
			text-align: center;
			font-weight: bold;
			font-size: 12px;
			color: red;
		}
	
		#loading {
			display: none;
			position: absolute;
			top: 10px;
			right: 10px;
		}
	
		#calendar {
			max-width: 900px;
			margin: 40px auto;
			padding: 0 10px;
		}
		
		span.top_info_text {
			display:block;
			margin: 20px 0 20px 0px;
			font-size: 14px;
		}
		
		table#totalNotiTab tbody tr td, table#sysGroupSearchTbl tbody tr td {
			white-space : nowrap; overflow: hidden;
		}
		/*
		div._loadingBar {
			position: fixed;
			top : 60%;
			left : 40%; 
			height : 50px;
			width : 200px;
			margin-top:-25px;
			margin-left:-100px;
			border:0;
			background-image : url(../images/loader_32.GIF);
			background-repeat : no-repeat;
			z-index : 10000;
			display:block;
		}
		*/
		div._loadingBar {
			position: fixed;
			top : 60%;
			left : 40%;
			/*
			margin-top:-25px;
			margin-left:-100px;
			border:0;
			background-image : url(../images/loader_32.GIF);
			background-repeat : no-repeat;
			*/
			z-index : 10000;
			display:block;
			width:50px;height:50px;text-align:center;vertical-align:middle;border-radius:50%;background-color:#fff;box-shadow:0px 1px 5px #888888;
		}
		div._loadingBar img{margin-top:8px;}
		
		.feed_wrap dl.home_feed_gate {overflow : hidden;}
		
		div#foo____ {
			position : absolute;
			top : 0%;
			left : 50%; 
			height : 20px;
			width : 400px;
			margin-left:-200px;
			z-index : 3000000000;
			padding : 20px;
			background-color : #fff;
			font-size : 20px; font-weight : bold;
			text-align:center;
		}
		
		textarea#description {
			font-family: 'Malgun Gothic', arial, gulim, dotum !important;
		}
    </style>
    
    <link href="../css/common.css" rel="stylesheet" type="text/css" />
	<link href="../css/ncp/theme/gw-calendar.css"  rel="stylesheet" type="text/css"/>
   	<link href="../css/layout.css" rel="stylesheet" type="text/css" />
	<link href="../css/jquery/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />
	<link href="../css/dropzone/dropzone.min.css" rel="stylesheet" type="text/css" />
	<link href="../css/dropzone/filemain.css" rel="stylesheet" type="text/css" />
	<link href="../css/dropzone/filepicker.css" rel="stylesheet" type="text/css" />
    <link href="../css/bpopup/bpopup.css" rel="stylesheet" type="text/css"/>
    <link href="../css/fullcalendar/fullcalendar.css" rel="stylesheet" />
	<link href="../css/fullcalendar/fullcalendar.print.css" rel="stylesheet" media="print" />
	<link href="../css/mentions/jquery.mentions.css" rel="stylesheet" media="print" />
	<link href="../css/tree/ui.dynatree.css" rel="stylesheet" type="text/css" id="skinSheet">
    <link href="../css/gw-sns-ui.css" rel="stylesheet" type="text/css">
    <link href="../css/sns-sort.css" rel="stylesheet" type="text/css">
	<spring:eval var="opMode" expression="@conf.getProperty('operation.mode')" />
	<c:choose>
	  <c:when  test="${opMode eq 'stage'}">
		<script src="../js/common/react/react.min.js"></script>
	  </c:when >
	  <c:otherwise>
		<script src="../js/common/react/react.js"></script>
	  </c:otherwise>
	</c:choose>
    
	<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
	<c:if  test="${uiMode ne 'js'}">
    <script src="../js/common/react/JSXTransformer.js"></script>
    </c:if>
    
    <script src="../js/common/dropzone/dropzone-4.0.0.js"></script>
    <script src="../js/common/dropzone/Helpers.js"></script>
    
    <!-- 한화 공통 js -->
    <script type="text/javascript" src="../js/common/jquery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="../js/common/jquery/jquery-ui.min.js"></script>
	<script type="text/javascript" src="../js/common/jquery/jquery.form.js"></script>
	<script type="text/javascript" src="../js/common/jquery/jquery.resize.js"></script>
	
	<!-- <script type="text/javascript" src="../js/common/jquery.gnb.js"></script> -->
	<script type="text/javascript" src="../js/common/jquery.ui_sns.js"></script>
	
    <script src="../js/common/jquery/jquery.bpopup.min.js"></script>
    <script src="../js/common/underscore/underscore.js"></script>
    <script src="../js/common/jquery/jquery.elastic.js"></script>
    <script src="../js/common/jquery/timeago/jquery.timeago.js"></script>
	<!-- <script src="../js/common/jquery/jquery.mCustomScrollbar.concat.min.js"></script> -->
    <script src="../js/common/mentions/jquery.events.input.js"></script>
    <script type="text/javascript" src="../js/common/jquery/jquery.maskedinput.min.js"></script>
    
	<script src="../js/common/fullcalendar/moment.min.js"></script>
	<script src="../js/common/fullcalendar/fullcalendar.js"></script>
    <script src="../js/common/linky/jquery.linky.js"></script>
    <script src="../js/common/util/ajaxutil.js" charset="UTF-8"></script>
    <script src="../js/common/util/textareautil.js?c=${now}" charset="UTF-8"></script>
	<script src="../js/common/mentions/jquery.mentions.js" charset="UTF-8"></script>
	
    <script src="../js/common/jquery/i18n/datepicker-${pageContext.response.locale.language}.js"></script>
    <script src="../js/common/jquery/timeago/locales/jquery.timeago.${pageContext.response.locale.language}.js"></script>
	<script src='../js/common/fullcalendar/lang/${pageContext.response.locale.language}.js'></script>
	
	<script src="../js/common/unitegallery/js/ug-common-libraries.js"></script>
    <script src="../js/common/unitegallery/js/ug-functions.js"></script>       
    <script src="../js/common/unitegallery/js/ug-thumbsgeneral.js"></script>   
    <script src="../js/common/unitegallery/js/ug-thumbsstrip.js"></script>     
    <script src="../js/common/unitegallery/js/ug-touchthumbs.js"></script>     
    <script src="../js/common/unitegallery/js/ug-panelsbase.js"></script>      
    <script src="../js/common/unitegallery/js/ug-strippanel.js"></script>      
    <script src="../js/common/unitegallery/js/ug-gridpanel.js"></script>       
    <script src="../js/common/unitegallery/js/ug-thumbsgrid.js"></script>      
    <script src="../js/common/unitegallery/js/ug-tiles.js"></script>           
    <script src="../js/common/unitegallery/js/ug-tiledesign.js"></script>      
    <script src="../js/common/unitegallery/js/ug-avia.js"></script>            
    <script src="../js/common/unitegallery/js/ug-slider.js"></script>          
	<script src="../js/common/unitegallery/js/ug-sliderassets.js"></script>    
	<script src="../js/common/unitegallery/js/ug-touchslider.js"></script>     
	<script src="../js/common/unitegallery/js/ug-zoomslider.js"></script>	     
    <script src="../js/common/unitegallery/js/ug-video.js"></script>           
    <script src="../js/common/unitegallery/js/ug-gallery.js"></script>         
	<script src="../js/common/unitegallery/js/ug-lightbox.js"></script>        
  	<script src="../js/common/unitegallery/js/ug-carousel.js"></script>        
    <script src="../js/common/unitegallery/js/ug-api.js"></script> 
    <script src="../js/common/observer/lodash.js" type="text/javascript"></script>            
	<script src="../js/common/observer/observer.js" type="text/javascript"></script>            
    <script src="../js/tree/jquery.cookie.js" type="text/javascript"></script>
	<script src="../js/tree/jquery.dynatree.js" type="text/javascript"></script>            
	
	
	<link rel="stylesheet" href="../js/common/unitegallery/css/unite-gallery.css" type="text/css" />
	
	<script type="text/javascript" src="../js/common/unitegallery/themes/default/ug-theme-default.js"></script>
	<link rel="stylesheet" href="../js/common/unitegallery/themes/default/ug-theme-default.css" type="text/css" />
	
	<script>

	var _Grobal_isEnterKeyReg = <c:out value="${empty Member.isEnter ? 0 : Member.isEnter}" />;

	var isSysAd = 0;
	
	var _memberCompanyName = '${Member.companyName}';
	
		function openLyncMenu(a,b,c,d,e) {
			// 링크 뷰 호출 함수
		}
		function hideLyncMenu() {
			// 링크 뷰 숨김 함수
		}
		
		function abc(){
			var jsondata = {
						"feedId"		: '3378',
	    	    		"approvalStatus"			: 'APPROVAL',
	    	    		"feedMemberSyncKey"		: 'jaeyun',
	    	    		"approvalComment"		: '111111'
	    	};
			
			ajaxAdd('/feeds/interface/approval/complete', jsondata, '');
		}
		
		$(function(){
			$('img').one('error', function() { this.src = contextpath + '/images/bg_table.png'; });
		});
		
		function checkSelectedTab() {
			if(selectedTab == 'TODO' || selectedTab == 'FILE') {
				return false;
			} else if(selectedTab == 'OTHER_TODO' || selectedTab == 'OTHER_FILE') {
				return false;
			} else if(selectedTab == 'GROUP_TODO' || selectedTab == 'GROUP_FILE') {
				return false;
			} else {
				return true;
			}
			
		}
					
		function goTabAfterWriteFeed(groupInfo) {
			if(selectedTab == 'TODO' || selectedTab == 'FILE') {
				viewMemberTab('PERSON');
			} else if(selectedTab == 'OTHER_TODO' || selectedTab == 'OTHER_FILE') {
				viewMemberTab('OTHER_PERSON');
			} else if(selectedTab == 'GROUP_TODO' || selectedTab == 'GROUP_FILE') {
				viewGroupTab(groupInfo);
			}
			
		}
		
		function addDrawTopLine() {
			var element = $('.addTopLine');
			var length = element.length;
			for(var i=1; i<length; i++) {
				$(element[i]).css('border-top','none');				
			}
		}
		
		function removeDrawTopLine() {
			var element = $('.addTopLine');
			$(element[0]).css('border-top','1px solid #e0e0e0');								
			
		}
		
		var snsCommLoadingObj = function(jobj) {
			var time = 500;

			setTimeout(function() {	
				$("div._loadingBar").remove();
			}, time);
			
			if(jobj.s === 'x') {
				return false;
			}
			
			var elem = document.createElement("div");
			$(elem).addClass('_loadingBar');
			$(elem).prepend('<img src="../images/loader_32.GIF" />');
			$('body').prepend($(elem));
		}

	</script>
	
	<c:choose>
  		<c:when  test="${uiMode eq 'js'}">
			<script type="text/javascript" src="../jsx/build/sns/main/Presence.js"></script>
  		</c:when >
  		<c:otherwise>
			<script type="text/jsx" src="../jsx/src/sns/main/Presence.jsx"></script>
 		</c:otherwise>
	</c:choose>