<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
	<head>
		<spring:eval var="operationModeRef" expression="@conf.getProperty('operation.mode')" />
		<spring:eval var="webjsMode" expression="@conf.getProperty('websocket.operation.mode')" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, maximum-scale=1.0">
		<link rel="shortcut icon" href="images/favicon.ico" />
	    <link href="css/common.css" rel="stylesheet" type="text/css" />
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
					<script type="text/javascript" src="js/chat/original/websocket-chat-dev.js"></script>
				</c:when >
				<c:otherwise>
					<script type="text/javascript" src="js/chat/original/websocket-chat-local.js"></script>
				</c:otherwise>
		</c:choose>
	    <script src="js/chat/original/util/ajaxUtil.js" charset="UTF-8"></script>
	    <script type="text/javascript" src="js/chat/original/util/dateUtil.js"></script>
	    <script type="text/javascript" src="js/chat/original/app/messageController.js"></script>
	    <script type="text/javascript" src="js/chat/original/app/roomController.js"></script>
	    <script type="text/javascript" src="js/chat/original/app/alarmController.js"></script>
		<script type="text/javascript" src="js/common/observer/lodash.js"></script>
   	    <script type="text/javascript" src="js/chat/original/observer/chatObserver.js"></script>
   		<script>
	    
   			$(document).ready(function(){
   				
   				var userId = "${userId}";
   		    	var userName = "${userName}";
   		    	var roomController = new RoomController();
   		    	roomController.initialize(userId, userName);
   		    	$("#whisperBtn").hide();
   		    	$("#whisperCancelBtn").hide();
   		    	$("#createRoom").bind('click', function(){
   		    		roomController.createRoom();
   		    	})
   		    	
   		    	$("#leaveRoom").bind('click', function(){
   		    		roomController.leaveRoom();
   		    	})
   		    	
   		    	$("#sendBtn").bind('click', function(){
   		    		roomController.sendMessage();
   		    	})
   		    	
   		    	$("#inviteBtn").bind('click', function(){
   		    		if($("#Invite_DIV").hasClass("clicked")) {
   		    			$("#Invite_DIV").removeClass("clicked");
   		    			$("#Invite_DIV").hide();
   		    		} else {
   		    			$("#Invite_DIV").addClass("clicked");
   		    			$("#Invite_DIV").show();
   		    		}
   		    	})
   		    	
   		    	$("#inviteSendBtn").bind('click', function(){
   		    		roomController.sendInvite();
   		    	})
   		    	
   		    	$("#whisperBtn").bind('click', function(){
   		    		roomController.sendWhisper();
   		    	})
   		    	
   		    	$("#whisperCancelBtn").bind('click', function(){
   		    		roomController.cancelWhisper();
   		    	})
   		    	
   		    	$("abbr.timeago").timeago();
   			});
	    </script>
	</head>
	<body>
	<div class="lay-wrap">
		<div class="lay-container" id="WholeScreen">
			<div id="Container">
				<div class="lay-container-wrap" style="height:100%;">
					<div id="SideNav">
						<div class='lay-snb' id='div_lay_snb'>
						<div class='snb-content'>
							<div>
								<p>개설한 방</p>
								<div id='establish_room'></div>
							</div>
							<div>
								<p>참여하고 있는 방</p>
								<div id='participated_room'></div>
							</div>
	            		</div>
	        			</div>	
					</div>
					<div class="lay-content lay-static-content">
            			<div class="lay-col1" id="div_lay_col1">
            				<div class="lay-contents-area lay-contents-margin">
            					<p>ROOM</p>
								<div id="MainContents" style="border-top:0;">
								</div>
								<div id="Message_DIV" style="border-top:1; display:none">
									<input type="text" name="chatMessage" id="chatMessage" placeholder="" style="width: 300px;"/> <input type="button" value="sendMessage" id="sendBtn"/><input type="button" value="Whisper" id="whisperBtn"/><input type="button" value="Whisper Cancel" id="whisperCancelBtn"/><input type="button" value="Invite" id="inviteBtn"/><input type="button" value="leave" id="leaveRoom"/>
									<div id="Invite_DIV" class="" style="border-top:1; display:none">
										<input type="text" name="targetInviteFollower" id="targetInviteFollower"/> <input type="button" value="sendInvite" id="inviteSendBtn"/>
										<div id="inviteFollower">
										</div>																			
									</div>
								</div>
								<div id="create_DIV">
									방 제목 : <input type="text" name="roomTitle" id="roomTitle" /><br/>
									참여자 : <input type="text"  name="follower" id="follower" />
									<div id="invited_follower">
									</div>
									<input type="button" value="채팅방 개설" id="createRoom"/>
								</div>
							</div>
						</div>

						<div class="lay-col2" id="div_lay_col2">
							<div id="RightContentArea" class="rightarea_wrap">
								<p>접속자 인원</p>
								<div id="connectUser_DIV"></div>
								<p>알림</p>
								<div id="alarm_DIV"></div>
							</div>
            			</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>