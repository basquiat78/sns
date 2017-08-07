<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, maximum-scale=1.0">
		<link rel="shortcut icon" href="images/favicon.ico" />
		<link href="css/jquery/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />
		<link href="css/mentions/jquery.mentions.css" rel="stylesheet" type="text/css" />
		<script>var contextpath = '${pageContext.request.contextPath}';</script>
	    <script type="text/javascript" src="js/common/jquery/jquery-1.11.3.min.js"></script>
	    <script type="text/javascript" src="js/common/jquery/jquery-ui.min.js"></script>
		<script type="text/javascript" src="js/common/jquery/jquery.form.js"></script>
		<script type="text/javascript" src="js/common/jquery/jquery.resize.js"></script>
		<script type="text/javascript" src="js/common/jquery/jquery.elastic.js"></script>
		<script type="text/javascript" src="js/common/mentions/jquery.events.input.js"></script>
		<script type="text/javascript" src="js/common/mentions/jquery.mentions.js"></script>
	    <script src="js/chat/original/util/ajaxUtil.js" charset="UTF-8"></script>
   		<script>
	    
   			var selectFollowerList = [];
   		
   			$(document).ready(function(){
   				
   				var userId = "${userId}";
   		    	var userName = "${userName}";
   		    	
   		    	var clickRoom = function(element, data) {
   		    		element.unbind("click");
   					element.bind("click", function(){
   						if(data.establisherId == userId) {
   							$("#userType").val("DEALER");
   							$("#roomFlag").val(data.roomFlag);
   							
   							var popName = "Chat_" + data.roomFlag;
   							$("#popup").attr("target", popName);
   							var url = contextpath + "/chat2";
   	   		   				window.open("", popName, "resizable=yes,width=470,height=650");
   	   		   				$("#popup").attr("action", url);
   	   		   				$("#popup").submit();
   							
   						} else {
   							$("#userType").val("NEGOTIATOR");
   							$("#roomId").val(data.roomId);
   							
   							var popName = "Chat_" + data.roomId;
   							$("#popup").attr("target", popName);
   							var url = contextpath + "/chat2";
   	   		   				window.open("", popName, "resizable=yes,width=470,height=650");
   	   		   				$("#popup").attr("action", url);
   	   		   				$("#popup").submit();
   						}
   					});
   		    	};
   		    	
   		    	var url = contextpath + "/chat/rooms/users/" + userId;
   				ajaxGET(url, null, function(data) {
   					console.log(data);
   					var roomFlag = "";
   					data.forEach(function(room){
   						if(roomFlag == room.roomFlag) {
   							
   						} else {
   							roomFlag = room.roomFlag;
							var DIV = $("<div>" + room.roomTitle + "</div>");
							clickRoom(DIV, room);
	   						$("#myChatList").append(DIV)
   						}
   					});
   					
   				});
   		    	
   		    	
   		    	var customRenderMenu = function(ul, items){
   					var that = this;
   					$.each(items, function( index, item) {
   						var li = that._renderItemData( ul, item );
   						li.attr("aria-label", item.mentionId + " : " + item.mentionName);
   					});
   				};
   				
   				var mentionsSelectEventHandler = function(item) {
   					var me = this;
   					selectFollowerList.push(item);
   					var SPAN = $("<div></div>");
   					SPAN.append(item.mentionName);
   					$("#invited_follower").append(SPAN);
   					$("#follower").val("");
   				};
   				
   				$("#follower").autocomplete({
   					autoFocus: true,
   					minLength: 2,
   	   				source: function(request, response) {
   	   					var baseurl = contextpath + "/chat/followers/mentions/";
   						if(request.term.length > 1) {
   	   	    	 			$.ajax({
   	            					url	    : baseurl + request.term,
   	   	         					type    : "GET",
   	    	        				success : function(data) {
   	    	        					response(data);
   	    	        				},

   	    	        				error	: function(jqXHR, textStatus, errorThrown){
   	    	            	 			console.log( textStatus);
   	    	        				}
   	    	    			});
   						}
   	    			},

   			    	select: function (event, ui) {
   	   		        	event.preventDefault();
   	   		        	mentionsSelectEventHandler(ui.item);
   	        		},

   					focus: function(event, ui) {
   						event.preventDefault();
   					},
   					
   	        		create: function () {
   						$(this).autocomplete('widget').menu('option', 'items', '> :not(.ui-autocomplete-category)');
   	        			$(this).data('ui-autocomplete')._renderMenu = customRenderMenu;
   	    			},
   					
   	    		}).on('keydown', function(event) {
   	       		}).focus(function(){            
   	   	 			$(this).autocomplete("search");
   	    		}).data('ui-autocomplete')._renderItem = function (ul, item) {
   					var $a = $("<a></a>");
   					var label = item.mentionName.toString();
   					$("<span style='margin-left:5px;font-size:13px;display:inline-block;'></span>").append(label).appendTo($a);
   					$("<br></br>").appendTo($a);
   					return $("<li style='width:250px;'>").append($a).appendTo(ul);
   	       		};
   		    	
   		    	
   		    	$("#openBtn1").bind('click', function(){
   		    		
   		    	});
   		    	
   		    	$("#openBtn").bind('click', function(){
   		    		
   		    		if($("#userType").val() == "DEALER") {
	   		    		
   		    			var roomTitle = $("#roomTitle").val();
	   					var followerList = new Array();
	   					
	   					selectFollowerList.forEach(function(follower){
   							var data = {
  									"followerId"	: follower.mentionId,
  		   							"followerName"	: follower.mentionName
   							}
   							followerList.push(data);		
	   					});
						
	   			    	var jsonData = {
	   				    			"roomTitle"			: roomTitle,
	   				    			"establisherId"		: userId,
	   				    			"establisherName"	: userName,
	   				    			"followerList"		: followerList
	   			    	}
	   						
	   					ajaxPOST(contextpath + "/chat/rooms/follower", jsonData, callbackFunc);
   		    		}
   		    	});
   		    	
   			});
   			
   			function callbackFunc(data) {
   			}
   			
   			function typeSelect() {
   				var selectedValue = $("#typeSelect").val();
   				if(selectedValue == "dealer") {
   					$("#userType").val("DEALER");
   				} else {
   					$("#userType").val("NEGOTIATOR");
   				}
   			}
	    </script>
	</head>
	<body>
		<h1>TEST</h1>
		<div>USER TYPE : <select id='typeSelect' onchange="typeSelect()">
			<option value="dealer">거래자</option>
			<option value="negotiator">협상자</option>
			</select><br>
		</div>
		<input type="text" name="follower" id="follower"/><br/><br/><br/>
		<div id="invited_follower"></div>
		<br/><br/><br/>
		방 타이틀 : <input type="text" name="roomTitle" id="roomTitle"/><br/>
		<form id="popup" target="" method="post" action="">
			type : <input type="text" name="userType" id="userType" value="DEALER"/>
			<input type="hidden" name="roomId" id="roomId"/>
			<input type="hidden" name="roomFlag" id="roomFlag"/>
		</form>
		<input type="button" id="openBtn" name="openBtn" value="open"/><br/>
		<div id="myChatList"></div>
		
		
	</body>
</html>