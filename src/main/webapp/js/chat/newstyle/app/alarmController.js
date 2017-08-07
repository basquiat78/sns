	var AlarmController = function(roomController) {
		this._ROOM_CONTROLLER = roomController;
	}
	
	AlarmController.prototype =  {
	
		/**
		 * 초기화
		 */
		init: function() {
			var me = this;
			me.registerObserver();
		},

		/**
		 * 접속한 세션 정보 그리기
		 * @param data
		 * @param me
		 */
		drawConntectUserInfo: function(data, me) {
			console.log(data);
		},
		
		/**
		 * 초대 메세지 그리기
		 * @param data
		 */
		drawInviteMessage: function() {
			var me = this;
			var stay = me._ROOM_CONTROLLER.getStay();
			if(stay == me._ROOM_CONTROLLER.STAY_TYPE.CHATLIST) {
				me._ROOM_CONTROLLER.drawChatList();
				me._ROOM_CONTROLLER.getNoticeList();
			}
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
		 * 노티스 확인 업데이트
		 * @param noticeId
		 */
		checkNoticeReadUpdate: function(data, me) {
			if(data.isRead == 1) {
				console.log("read notice");
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