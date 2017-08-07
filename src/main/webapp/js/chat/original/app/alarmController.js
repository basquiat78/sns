	var AlarmController = function(roomController) {
		this._ROOM_CONTROLLER = roomController;
	}
	
	AlarmController.prototype =  {
	
		/**
		 * 초기화
		 * @param userId
		 * @param userName
		 */
		init: function() {
			var me = this;
			me.getNoticeInfo();
			me.registerObserver();
		},

		/**
		 * 접속한 세션 정보
		 */
		getConnectUserInfo: function() {
			var me = this;
			var url = contextpath + "/notices/users";
			ajaxGET(url, null, me.drawConntectUserInfo, me);
		},
		
		/**
		 * notice 그리기
		 * @param data
		 * @param me
		 */
		drawNotice: function(data, me) {
			
			var clickEvent = function(element, data) {
				element.unbind("click");
				element.bind("click", function(){
					if(data.itemType == me._ROOM_CONTROLLER.MESSAGE_TYPE.INVITE) {
						if(me._ROOM_CONTROLLER.getStatus()) {
							alert("현재 방 참여중입니다.");
							return;
						}
						var url = contextpath + "/notices/"+data.noticeId;
						ajaxUPDATEById(url, null, me.checkNoticeReadUpdate, me);
						me.participateRoom(data);
					}
					var fontType = element.css("font-weight");
					if(fontType == "bold") {
						element.css("font-weight", "normal");
					}
					
				});
			};
			
			data.forEach(function(notice){
				var isRead = notice.isRead;
				var fontType = "normal";
				if(isRead == 0) {
					if(notice.itemType == me._ROOM_CONTROLLER.MESSAGE_TYPE.INVITE) {
						var data = {
								noticeId	: notice.noticeId,
								roomId	: notice.itemId
						};
						me._ROOM_CONTROLLER.invitedRoomList.push(data);
					}
					fontType = "bold";
				}
				var divId = "noticeId_"+notice.noticeId;
				var DIV = $("<div id='" + divId + "' style='font-weight: "+fontType+"'></div>");
				clickEvent(DIV, notice);
				DIV.append(notice.itemContent);
				$("#alarm_DIV").append(DIV);
			});
		},
		
		/**
		 * 알람에서 클릭시 채팅방으로 입장하기
		 * @param data
		 */
		participateRoom: function(data) {
			var me = this;
			me._ROOM_CONTROLLER.participatedRoomList.forEach(function(room){
				if(data.itemId == room.roomId) {
					
					me._ROOM_CONTROLLER.invitedRoomList.some(function(data, idx){
						if(room.roomId == data.roomId) {
							me._ROOM_CONTROLLER.invitedRoomList.splice(idx, 1);
						}
					});
					me._ROOM_CONTROLLER.makeChattingRoom(room);
				}
			});
		},
		
		/**
		 * notice 정보
		 */
		getNoticeInfo: function() {
			var me = this;
			var url = contextpath + "/notices/" + me._ROOM_CONTROLLER.USERID;
			ajaxGET(url, null, me.drawNotice, me);
		},
		
		/**
		 * 접속한 세션 정보 그리기
		 * @param data
		 * @param me
		 */
		drawConntectUserInfo: function(data, me) {
			var DIV = $("<div></div>");
			DIV.append(data.message);
			$("#connectUser_DIV").empty();
			$("#connectUser_DIV").append(DIV);
			data.connectUsers.forEach(function(user){
				var userDIV = $("<div></div>");
				
				if(user.userId == me._ROOM_CONTROLLER.USERID ) {
					userDIV.append(user.userName + " (me)");
				} else {
					userDIV.append(user.userName + " (" + user.userId + ")");
				}
				
				$("#connectUser_DIV").append(userDIV);
			});
		},
		
		/**
		 * 노티스 확인 업데이트
		 * @param noticeId
		 */
		checkNoticeReadUpdate: function(data, me) {
			if(data.isRead == 1) {
				console.log("read notice");
			}
		},
		
		/**
		 * 초대 메세지 그리기
		 * @param data
		 */
		drawInviteMessage: function(data) {
			var me = this;
			me._ROOM_CONTROLLER.reloadRoomList();
			var notiData = {
					noticeId	: data.noticeId,
					roomId	: data.roomId
			};
			
			data['itemId'] = data.roomId;
			data['itemType'] = data.messageType;
			
			me._ROOM_CONTROLLER.invitedRoomList.push(notiData);
			
			var clickEvent = function(element, data) {
				element.unbind("click");
				element.bind("click", function(){
					if(data.itemType == me._ROOM_CONTROLLER.MESSAGE_TYPE.INVITE) {
						if(me._ROOM_CONTROLLER.getStatus()) {
							alert("현재 방 참여중입니다.");
							return;
						}
						var url = contextpath + "/notices/"+data.noticeId;
						ajaxUPDATEById(url, null, me.checkNoticeReadUpdate, me);
						me.participateRoom(data);
					}
					var fontType = element.css("font-weight");
					if(fontType == "bold") {
						element.css("font-weight", "normal");
					}
					
				});
			};
			
			var divId = "noticeId_"+data.noticeId;
			var DIV = $("<div id='" + divId + "' style='font-weight: bold;'></div>");
			clickEvent(DIV, data);
			DIV.append(data.message);
			$("#alarm_DIV").append(DIV);
			
		},
		
		/**
		 * Observer noti callback
		 * @param message
		 */
		notice: function(message) {
			var me = this;
			var jsonData = JSON.parse(message.data);
			if(jsonData.messageType == me._ROOM_CONTROLLER.MESSAGE_TYPE.NOTICE) {
				me.drawConntectUserInfo(jsonData, me);
			} else if(jsonData.messageType == me._ROOM_CONTROLLER.MESSAGE_TYPE.INVITE) {
				me.drawInviteMessage(jsonData);
			}
		},
		
		/**
		 * Observer 등록
		 */
		registerObserver: function() {
			var me = this;
			ChatObserver.registerObserver(me);
		}
		
	};
	
	AlarmController.prototype.constructor = AlarmController;