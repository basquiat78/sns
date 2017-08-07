<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE HTML>
<html lang="ko">
	<head>
		<title>uEngine Solutions Messinger</title>
		<spring:eval var="operationModeRef" expression="@conf.getProperty('operation.mode')" />
		<spring:eval var="webjsMode" expression="@conf.getProperty('websocket.operation.mode')" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="description" content="uEngine Solutions" />
		<meta name="viewport" content="width=360, initial-scale=0">
		
		<link rel="shortcut icon" href="images/favicon.ico" />
		
	    <link href="css/chat/layout.css" rel="stylesheet" type="text/css" media="screen,print" />
		<link href="css/jquery/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />
		<link href="css/mentions/jquery.mentions.css" rel="stylesheet" type="text/css" />
		<script>var contextpath = '${pageContext.request.contextPath}'+'/chat';</script>
	    <script type="text/javascript" src="js/common/jquery/jquery-1.11.3.min.js"></script>
	    <script type="text/javascript" src="js/common/jquery/jquery-ui.min.js"></script>
		<script type="text/javascript" src="js/common/jquery/jquery.form.js"></script>
		<script type="text/javascript" src="js/common/jquery/jquery.resize.js"></script>
		<script type="text/javascript" src="js/common/jquery/jquery.elastic.js"></script>
		<script type="text/javascript" src="js/common/mentions/jquery.events.input.js"></script>
		<script type="text/javascript" src="js/common/mentions/jquery.mentions.js"></script>
		<script type="text/javascript" src="js/common/jquery/timeago/jquery.timeago.js"></script>
		<script type="text/javascript" src="js/common/jquery/timeago/locales/jquery.timeago.${pageContext.response.locale.language}.js"></script>
		<script type="text/javascript" src="js/common/jquery/jquery.livequery.min.js"></script>
		
	    <c:choose>
				<c:when  test="${webjsMode eq 'dev'}">
					<script type="text/javascript" src="js/chat/newstyle/websocket-chat-dev.js"></script>
				</c:when >
				<c:otherwise>
					<script type="text/javascript" src="js/chat/newstyle/websocket-chat-local.js"></script>
				</c:otherwise>
		</c:choose>
	    <script src="js/chat/newstyle/util/ajaxUtil.js" charset="UTF-8"></script>
	    <script type="text/javascript" src="js/chat/newstyle/util/dateUtil.js"></script>
	    <script type="text/javascript" src="js/chat/newstyle/app/messageController.js"></script>
	    <script type="text/javascript" src="js/chat/newstyle/app/roomController.js"></script>
	    <script type="text/javascript" src="js/chat/newstyle/app/alarmController.js"></script>
		<script type="text/javascript" src="js/common/observer/lodash.js"></script>
   	    <script type="text/javascript" src="js/chat/newstyle/observer/chatObserver.js"></script>
   	    <script type="text/javascript">
   	    
   	 		var initRoomController;
   	    
   			$(document).ready(function(){
   				var userId = "${userId}";
   		    	var userName = "${userName}";
   		    	var initRoomId = "${roomId}";
   		    	var initRoomFlag = "${roomFlag}";
   		    	var userType = "${userType}";
   		    	var roomController = new RoomController();
   		    	initRoomController = roomController;
   		    	console.log('init');
   		    	roomController.initialize(userId, userName, initRoomId, initRoomFlag, userType);
   			});
   			
   			function sendMessage(event) {
   				if(event.keyCode == 13) {
   						initRoomController.sendMessage();
   				}
   			}
   			
   	    </script>
	</head>
	<body>
	
		<div id="wrap">
		
			<div id="header">
			
				<div id="gnb">
					<div class="container">
					<h1><span>uEngine Solutions Messinger</span></h1>
					<div class="quick_button">
						<span id="minimumScale"><a href="#" title="최소화">최소화</a></span>
						<span id="maximumScale"><a href="#" title="최대화">최대화</a></span>
						<span id="close"><a href="#" title="화면닫기">화면닫기</a></span>
					</div>
					</div>
				</div>
			
				<div id="unb">
					<div class="container">
						<strong id="mainRoomTitle"></strong>
					</div>
				</div>
		
				<div id="unb-room">
					<div class="container">
						<strong id="roomTitle"></strong>
						<div class="room_btn">
						</div>
					</div>
				</div>
				
			</div>
		
			<div id="content">
			
				<div class="container" id="roomDIV">
				</div>
				<div id="bnb">
				</div>
			</div>
		</div>
		
	</body>
</html>