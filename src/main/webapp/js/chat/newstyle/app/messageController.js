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
				if(jsonData.messageType == me._ROOM_CONTROLLER.MESSAGE_TYPE.MESSAGE) {
					me.drawMessage(jsonData);
				} else {
					me.updateStatus(jsonData);
				}
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
				var message = $("#messageContents").val();
				
				if(message == null || message == "") {
					return;
				}
				
				var jsonData = {
								roomId 			: me._ROOM_CONTROLLER.getSelectedRoomId(),
								userId 			: me._ROOM_CONTROLLER.getUserId(),
								userName		: me._ROOM_CONTROLLER.getUserName(),
								message			: message,
								messageType	: type,
								followerList		: me._ROOM_CONTROLLER.selectedRoomFollowerList
				}
				
				ajaxPOST(contextpath + "/messages", jsonData, me.websocketMessage);
				
			},
			
			/**
			 * 메세지 웹소켓 태우기
			 * @param data
			 */
			websocketMessage: function(data) {
				Websocket.sendMessage(JSON.stringify(data));
				 $("#messageContents").val("");
			},
			
			/**
			 * updata Status
			 * @param messageData
			 */
			updateStatus: function(messageData) {
				var me = this;
				// {message: "협상종료 되었습니다.", status: "SUCCESS", roomId: 133, messageType: "STATUS"}
				// 딜러인 경우 여러 협상자가 존재한다. 메세진가 최신으로 날아오면 해당 룸에 해당하는 협상자를
				// 찾아 배열에서 지우고 첫번째로 unshift한 이후 다시 그린다.
				if(me._ROOM_CONTROLLER.getUserType() == me._ROOM_CONTROLLER.USER_TYPE.DEALER) {
					var targetRoom = null;
					me._ROOM_CONTROLLER.participatedRoomList.some(function(room, idx){
						if(messageData.roomId == room.roomId) {
							targetRoom = room;
							me._ROOM_CONTROLLER.participatedRoomList.splice(idx, 1);
						}
					});
					
					if(targetRoom == null) {
						return;
					}
					
					targetRoom.status = messageData.status;
					me._ROOM_CONTROLLER.participatedRoomList.unshift(targetRoom);
					if( me._ROOM_CONTROLLER.getStay() ==  me._ROOM_CONTROLLER.STAY_TYPE.USERLIST ) {
						me._ROOM_CONTROLLER.drawUserList();
					}
				} else {
					me._ROOM_CONTROLLER.participatedRoomList[0].status = messageData.status;
					if( me._ROOM_CONTROLLER.getStay() ==  me._ROOM_CONTROLLER.STAY_TYPE.USERLIST ) {
						me._ROOM_CONTROLLER.drawUserList();
					}					
				}
				
				// 협상 결렬일 경우 대화 입력 창 및 버튼을 지운다.
				if(messageData.status == me._ROOM_CONTROLLER.ROOM_STATUS.STOP) {
					$("#chattingUL").append("<div class='chat_msg'>" + me._ROOM_CONTROLLER.STATUS_MESSAGE.MSG_STOP + "</div>");
					$("#bnb").empty();
				} else if(messageData.status == me._ROOM_CONTROLLER.ROOM_STATUS.SUCCESS) {
					$("#chattingUL").append("<div class='chat_msg'>" + me._ROOM_CONTROLLER.STATUS_MESSAGE.MSG_SUCCESS + "</div>");
					$("#bnb").find('dd').remove();
				}
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
				
				if(messageData.roomId == me._ROOM_CONTROLLER.getSelectedRoomId()) {
					var timeWithHyphen = me._ROOM_CONTROLLER.chatDateUtil.getYearToDayStringWithHyphen(new Date(messageData.regDttm));
					var DIV;
					var LI;
					
					var messageDivId = "messageDiv_" + messageData.messageId;
					
					if(messageData.userId == me._ROOM_CONTROLLER.getUserId()) {
						LI = $("<li class='me' id='" + messageDivId + "'></li>");
						LI.append("<div class='txt_data' title='" + fullDate+ "'>" + time + "</div>");
						LI.append("<div class='box_me'>" + messageData.message + "</div>");
					} else {
						LI = $("<li class='their' id='" + messageDivId + "'></li>");
						LI.append("<div class='photo' style=''>" + messageData.userName + "</div>");
						LI.append("<div class='txt_name'>" + messageData.userName + "("+ messageData.userId  +")</div>");
						LI.append("<div class='box_their'>" + messageData.message + "</div>");
						LI.append("<div class='txt_data' title='" + fullDate+ "'>" + time + "</div>");
					}
					
					if(me._ROOM_CONTROLLER.messageDateFlag != timeWithHyphen) {
						DIV = $("<div class='chat_day'></div>");
						SPAN = $("<span></span>");
						SPAN.append(fullDate);
						DIV.append(SPAN);
						$("#chattingUL").append(DIV);
					}
					
					me._ROOM_CONTROLLER.messageDateFlag = timeWithHyphen;
					
					$("#chattingUL").append(LI);
					
				} else {
					
					// 딜러인 경우 여러 협상자가 존재한다. 메세진가 최신으로 날아오면 해당 룸에 해당하는 협상자를
					// 찾아 배열에서 지우고 첫번째로 unshift한 이후 다시 그린다.
					if(me._ROOM_CONTROLLER.getUserType() == me._ROOM_CONTROLLER.USER_TYPE.DEALER) {
						var targetRoom = null;
						me._ROOM_CONTROLLER.participatedRoomList.some(function(room, idx){
							if(messageData.roomId == room.roomId) {
								targetRoom = room;
								me._ROOM_CONTROLLER.participatedRoomList.splice(idx, 1);
							}
						});
						
						if(targetRoom == null) {
							return;
						}
						
						me._ROOM_CONTROLLER.participatedRoomList.unshift(targetRoom);
						me._ROOM_CONTROLLER.drawUserList();
					} else {
						me._ROOM_CONTROLLER.drawUserList();
					}
					
				}
				$("#content").scrollTop($("#roomDIV").height());
			}
	};
	
	MessageController.prototype.constructor = MessageController;