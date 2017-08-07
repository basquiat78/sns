	var MessageController = function(roomController){
		this._ROOM_CONTROLLER = roomController;
	};

	MessageController.prototype = {
		
			/**
			 * 초기화
			 */
			init: function() {
				var me = this;
				me.registerObserver();
				Websocket.initialize(me);
			},
			
			/**
			 * Observer noti callback
			 * @param message
			 */
			message: function(message) {
				var me = this;
				var jsonData = JSON.parse(message.data);
		    	me.drawMessage(jsonData);
			},
			
			/**
			 * Observer 등록
			 */
			registerObserver: function() {
				var me = this;
				ChatObserver.registerObserver(me);
			},
			
			/**
			 * 메세지 보내기
			 */
			sendMessage: function(type) {
				var me = this;
				
				var message = $("#chatMessage").val();
				if(message == null || message == "") {
					return;
				}
				
				var jsonData = {
								roomId 			: me._ROOM_CONTROLLER.selectedRoomId,
								userId 			: me._ROOM_CONTROLLER.USERID,
								userName		: me._ROOM_CONTROLLER.USERNAME,
								message			: message,
								messageType	: type,
								followerList		: me._ROOM_CONTROLLER.selectedRoomFollowerList
				}
				
				ajaxPOST(contextpath + "/messages", jsonData, me.websocketMessage);
				
			},

			/**
			 * 귓속말 보내기
			 */
			sendWhisper: function(type) {
				var me = this;
				
				var message = $("#chatMessage").val();
				if(message == null || message == "") {
					return;
				}

				var titleTimeAgo = new Date(new Date()).toLocaleString();
				var time = me._ROOM_CONTROLLER.chatDateUtil.timeSplit(titleTimeAgo);
				var fullDate = me._ROOM_CONTROLLER.chatDateUtil.getFullDateToString(new Date());
				var today = me._ROOM_CONTROLLER.chatDateUtil.getYearToDayStringWithHyphen(new Date());
				
				if(today != me._ROOM_CONTROLLER.messageDateFlag) {
					DIV = $("<div style='text-align: center;'></div>");
					DIV.append("<div>--------------------------- <b>" + fullDate + "<b> ---------------------------</div>");
					$("#MainContents").append(DIV);
				}
				
				me._ROOM_CONTROLLER.messageDateFlag = today;
				
				var DIV	= $("<div style='text-align: right;'></div>");
				DIV.append("<div><b>whisper to @" + me._ROOM_CONTROLLER.targetWhisper.followerName+ "<b></div>");
				DIV.append("<div><abbr title='" + fullDate + "'>"+ time +"</abbr> <b>" + message+ "<b></div><br/>");
				$("#MainContents").append(DIV);
				
				var jsonData = {
								roomId 			: me._ROOM_CONTROLLER.selectedRoomId,
								userId 			: me._ROOM_CONTROLLER.USERID,
								userName		: me._ROOM_CONTROLLER.USERNAME,
								message			: message,
								messageType	: type,
								whisperId		: me._ROOM_CONTROLLER.targetWhisper.followerId,
								whisperName	: me._ROOM_CONTROLLER.targetWhisper.followerName
				}
				
				ajaxPOST(contextpath + "/messages", jsonData, me.websocketMessage);
				
			},
			
			/**
			 * 초대하기
			 * @param type
			 */
			sendInvite: function(type) {
				var me = this;
				var noticeFollowerList = new Array();
				var roomFollowerList = new Array();
				
				me._ROOM_CONTROLLER.invitedFollowerList.forEach(function(noticeFollower){
					var noticeFollowerData = {
							"followerId"	: noticeFollower.mentionId,
							"followerName"	: noticeFollower.mentionName
					}
					noticeFollowerList.push(noticeFollowerData);
				});

				me._ROOM_CONTROLLER.selectedRoomFollowerList.forEach(function(roomFollower){
					var roomFollowerData = {
							"roomId"				: me._ROOM_CONTROLLER.selectedRoomId,
							"followerId"			: roomFollower.followerId,
							"followerName"		: roomFollower.followerName
					}
					roomFollowerList.push(roomFollowerData);
				});
				
				var jsonData = {
								"itemType"				: type,
								"itemId"					: me._ROOM_CONTROLLER.selectedRoomId,
								"itemTitle"				: me._ROOM_CONTROLLER.selectedRoomTitle,
								"fromFollowerId"		: me._ROOM_CONTROLLER.USERID,
								"fromFollowerName"	: me._ROOM_CONTROLLER.USERNAME,
								"noticeFollowerList"	: noticeFollowerList,
								"roomFollowerList"		: roomFollowerList
				}
				
				me.websocketInvite(jsonData);
				me._ROOM_CONTROLLER.invitedFollowerList = [];
			},
			
			/**
			 * 초대 웹소켓 태우기
			 * @param data
			 */
			websocketInvite: function(data) {
				Websocket.sendMessage(JSON.stringify(data));
				$("#inviteFollower").empty();
			},
			
			/**
			 * 메세지 웹소켓 태우기
			 * @param data
			 */
			websocketMessage: function(data) {
				Websocket.sendMessage(JSON.stringify(data));
				 $("#chatMessage").val("");
			},
			
			timeSplit: function(time) {
				var firstSplit = time.lastIndexOf('.')+1;
				var lastSplit = time.lastIndexOf(':');
				return time.substring(firstSplit, lastSplit).trim();
			},
			
			/**
			 * 메세지 그리기
			 * @param messageData
			 */
			drawMessage: function(messageData) {
				var me = this;
				var titleTimeAgo = new Date(messageData.regDttm).toLocaleString();
				var time = me._ROOM_CONTROLLER.chatDateUtil.timeSplit(titleTimeAgo);
				var fullDate = me._ROOM_CONTROLLER.chatDateUtil.getFullDateToString(new Date(messageData.regDttm));
				
				
				if(messageData.roomId == me._ROOM_CONTROLLER.selectedRoomId) {
					var timeWithHyphen = me._ROOM_CONTROLLER.chatDateUtil.getYearToDayStringWithHyphen(new Date(messageData.regDttm));
					var DIV;
					
					if(me._ROOM_CONTROLLER.messageDateFlag != timeWithHyphen) {
						DIV = $("<div style='text-align: center;'></div>");
						DIV.append("<div>--------------------------- <b>" + fullDate + "<b> ---------------------------</div>");
						$("#MainContents").append(DIV);
					}
					me._ROOM_CONTROLLER.messageDateFlag = timeWithHyphen;
					
					if(messageData.userId == me._ROOM_CONTROLLER.USERID) {
						if(messageData.messageType == me._ROOM_CONTROLLER.MESSAGE_TYPE.WHISPER) {
							DIV = $("<div style='text-align: right;'></div>");
							DIV.append("<div><b>whisper to @" + messageData.whisperName+ "<b></div>");
							DIV.append("<div><abbr title='" + fullDate + "'>"+ time +"</abbr> <b>" + messageData.message+ "<b></div><br/>");
						} else {
							DIV = $("<div style='text-align: right;'></div>");
							DIV.append("<div><abbr title='" + fullDate + "'>"+ time +"</abbr>  " + messageData.message+ "</div><br/>");
						}
					} else {
						if(messageData.messageType == me._ROOM_CONTROLLER.MESSAGE_TYPE.WHISPER) {
							DIV = $("<div style='text-align: left;'></div>");
							DIV.append("<div><b>whisper from @" + messageData.userName+ "<b></div>");
							DIV.append("<div><b>" + messageData.message+ "<b> <abbr title='" + fullDate + "'>"+ time +"</abbr></div><br/>");
						} else {
							DIV = $("<div style='text-align: left;'></div>");
							DIV.append("<div>" + messageData.userName+ "</div>");
							DIV.append("<div>" + messageData.message+ " <abbr title='" + fullDate + "'>"+ time +"</abbr></div><br/>");
						}
					}
					$("#MainContents").append(DIV);
					
				} else {
					
					var countIdx = 0;
					
					// 1. 화면의 방 리스트에서 해당 카운트를 갱신한다.
					// 2. 갱신하고 방 정보를 가지고 있는 객체에서 해당 방의 카운트도 갱신한다.
					me._ROOM_CONTROLLER.participatedRoomList.some(function(participatedRoom){
						if(participatedRoom.roomId == messageData.roomId) {
							var id = "participatedRoom_" + messageData.roomId;
							var count = participatedRoom.messageReadVo.messageCount;
							countIdx = count;
							count = " (" + (Number(count) + 1) + ")";
							$("#" + id).html(count);
							participatedRoom.messageReadVo.messageCount = participatedRoom.messageReadVo.messageCount + 1;
						}
					});
					
					me._ROOM_CONTROLLER.establishRoomList.forEach(function(establishRoom){
						if(establishRoom.roomId == messageData.roomId) {
							var id = "establishRoom_" + messageData.roomId;
							var count = establishRoom.messageReadVo.messageCount;
							countIdx = count;
							count = " (" + (Number(count) + 1) + ")";
							$("#" + id).html(count);
							establishRoom.messageReadVo.messageCount = establishRoom.messageReadVo.messageCount + 1;
						}
					});
					
					// 3.ung_chat_read에 인서트 또는 갱신을 한다.
					var jsonData = {
							roomId 			: messageData.roomId,
							userId 			: me._ROOM_CONTROLLER.USERID,
					}
					
					// 0이면 생성 만일 0이 아니라면 update
					if(countIdx == 0 ) {
						ajaxPOST(contextpath + "/messages/read", jsonData, me.createMessageRead);
					} else {
						ajaxUPDATEByData(contextpath + "/messages/read", jsonData, me.createMessageRead);
					}
					
				}
				
			},
			
			createMessageRead: function() {
			}
	};
	
	MessageController.prototype.constructor = MessageController;