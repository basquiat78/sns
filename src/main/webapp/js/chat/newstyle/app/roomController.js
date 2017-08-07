	var RoomController = function() {
		
		/**
		 * rom controller config
		 */
		this.messageController			= null;
		this.alarmController				= null;
		this.chatDateUtil					= null;
		/** 사용자 정보 */
		this.USERID							= "";
		this.USERNAME					= "";
		/** 사용자 유저 타입 : 거래자 또는 협상자 */
		this.USERTYPE						= "";
		/** 참여하는 방 리스트 */
		this.participatedRoomList			= [];
		/** 최초 넘어올때 가져오는 방 아이디 */
		this.initRoomId						= "";
		/** room flag */
		this.initRoomFlag					= "";
		/** 현재 채팅하고 있는 방 아이디 */
		this.selectedRoomId				= "";
		/** 현재 채팅하고 있는 방 타이틀 */
		this.selectedRoomTitle			= "";
		/** 메세지 데이터 플래그 */
		this.messageDateFlag				= "";
		/** 저장된 있던 채팅방 메세지 리스트 */
		this.messageList					= [];
		/** 현재 채팅창에 속한 팔로워 리스트 */
		this.selectedRoomFollowerList	= [];
		/**
		 * 메신저에서 보고 있는 화면
		 * USERLIST | CHATROOM
		 */
		this.STAY_WHAT = "";
		/** 
		 * 웹채팅에서 유저가 보고 있는 UI : 리스트 또는 채팅룸 
		 */
		this.STAY_TYPE = {
				USERLIST		: "USERLIST", 
				CHATROOM		: "CHATROOM"
		};
		/** ROOM_STATUS : 협상중, 협상성공, 협상결렬 */
		this.ROOM_STATUS = {
				RUNNING	: "RUNNING", 
				SUCCESS		: "SUCCESS", 
				STOP			: "STOP"
		};
		/** 메세지 타입 */
		this.MESSAGE_TYPE = {
				MESSAGE			: "MESSAGE", 
				NOTICE				: "NOTICE",
				RELOAD				: "RELOAD",
				STATUS				: "STATUS"
		};
		/** User Type : 거래자 또는 협상자 */
		this.USER_TYPE = {
				DEALER			: "DEALER",
				NEGOTIATOR	: "NEGOTIATOR"
		};
		/** 협상에 따른 채팅창에 보여줄 메세지 */
		this.STATUS_MESSAGE = {
				MSG_SUCCESS		: "[협상성공] 협상이 완료되었습니다.", 
				MSG_STOP			: "[협상결렬] 협상이 완료되었습니다."
		};
	}
	
	RoomController.prototype =  {
		/**				 속성 setter getter        */
	
		/**
		 * userId setter
		 * @param roomTitle
		 */
		setUserId: function(userId) {
			var me = this;
			me.USERID = userId;
		},
		
		/**
		 * userId getter
		 * @returns {String}
		 */
		getUserId: function() {
			var me = this;
			return me.USERID;
		},	

		/**
		 * userId setter
		 * @param roomTitle
		 */
		setUserName: function(userName) {
			var me = this;
			me.USERNAME = userName;
		},
		
		/**
		 * userId getter
		 * @returns {String}
		 */
		getUserName: function() {
			var me = this;
			return me.USERNAME;
		},
		
		/**
		 * selectedRoomId getter
		 * @returns {String}
		 */
		getSelectedRoomId: function() {
			var me = this;
			return me.selectedRoomId;
		},
		
		/**
		 * selectedRoomId setter
		 * @param roomId
		 */
		setSelectedRoomId: function(roomId) {
			var me = this;
			me.selectedRoomId = roomId;
		},
		
		/**
		 * roomTitle setter
		 * @param roomTitle
		 */
		setSelectedRoomTitle: function(roomTitle) {
			var me = this;
			me.selectedRoomTitle = roomTitle;
		},
		
		/**
		 * roomTitle getter
		 * @returns {String}
		 */
		getSelectedRoomTitle: function() {
			var me = this;
			return me.selectedRoomTitle;
		},
		
		/**
		 * stay type setter
		 * @param stayType
		 */
		setStay: function(stayType){
			var me = this;
			me.STAY_WHAT = stayType;
		},
		
		/**
		 * stay type getter
		 * @returns {String}
		 */
		getStay: function() {
			var me = this;
			return me.STAY_WHAT;
		},

		/**
		 * user type setter
		 * @param stayType
		 */
		setUserType: function(userType){
			var me = this;
			me.USERTYPE = userType;
		},
		
		/**
		 * user type getter
		 * @returns {String}
		 */
		getUserType: function() {
			var me = this;
			return me.USERTYPE;
		},
		
		/**
		 * initRoomId getter
		 * @returns {String}
		 */
		getInitRoomId: function() {
			var me = this;
			return me.initRoomId;
		},
		
		/**
		 * initRoomId setter
		 * @param roomId
		 */
		setInitRoomId: function(roomId) {
			var me = this;
			me.initRoomId = roomId;
		},
		
		/**
		 * initRoomFlag setter
		 * @param initRoomFlag
		 */
		setInitRoomFlag: function(roomFlag) {
			var me = this;
			me.initRoomFlag = roomFlag;
		},
		
		/**
		 * initRoomFlag getter
		 * @returns {String}
		 */
		getInitRoomFlag: function() {
			var me = this;
			return me.initRoomFlag;
		},
		
		/**        roomController main        */
		/**
		 * 초기화
		 * @param userId
		 * @param userName
		 */
		initialize: function(userId, userName, initRoomId, initRoomFlag, userType) {
			
			var me = this;
			
			/** 초기값 세팅 */
			me.setUserId(userId)
			me.setUserName(userName);
			me.setUserType(userType);
			me.setInitRoomId(initRoomId);
			me.setInitRoomFlag(initRoomFlag);
			
			if(userType == me.USER_TYPE.DEALER) {
				me.getAllRoomListByFlag();
			} else {
				me.getRoomByRoomId();
			}

			me.alarmController = new AlarmController(me);
			me.alarmController.init();
			
			me.messageController = new MessageController(me);
			me.messageController.init();
			
			me.chatDateUtil = new ChatDateUtil();
		    me.chatDateUtil.init();
			
			me.registerObserver();
			me.drawUserList();
			me.eventBinding();
		},
		
		/**
		 * event binding
		 */
		eventBinding: function() {
			
			var me = this;
			$("#close").bind("click", function(){
				if(me.getStay() == me.STAY_TYPE.CHATROOM) {
					$("#bnb").empty();
					$("#unb").show();
					$("#unb-room").hide();
					$("body").removeAttr("id");
					me.drawUserList();
				}
			});
	    	
		},
		
		/**
		 * 룸의 협상 결렬시 호출 function
		 */
		updateRoomStop: function(type) {
			var me = this;
			var url = contextpath + "/rooms/status";
			var jsonData = {
					"roomId"			: me.getSelectedRoomId(),
					"status"  			: type,
					"followerList"	: me.selectedRoomFollowerList
			}
			ajaxUPDATEByData(url, jsonData, me.updataRoomCallback, me);
		},
		
		/**
		 * 룸의 협상 성공시 호출 function
		 */
		updateRoomSuccess: function(type) {
			var me = this;
			var url = contextpath + "/rooms/status";
			var jsonData = {
					"roomId"			: me.getSelectedRoomId(),
					"status"  			: type,
					"followerList"	: me.selectedRoomFollowerList
			}
			ajaxUPDATEByData(url, jsonData, me.updataRoomCallback, me);
		},
		
		/**
		 * 협상 업데이트 이후 콜백
		 * @param data
		 */
		updataRoomCallback: function(data, me) {
			if(data.status == me.ROOM_STATUS.STOP) {
				
			}
		},
		
		/** 채팅룸 초대 메세지 */
		makeChatAdmission: function(roomData) {
			
			var establisherName = roomData.establisherName;
			var followerListName = "";
			roomData.followerList.forEach(function(follower, idx){
				if(follower.followerId != roomData.establisherId ) {
					if(followerListName == "" && (roomData.followerList.length) == 2) {
						followerListName = follower.followerName + " 님을 초대했습니다.";
					} else {
						if( idx > 0 &&  idx == roomData.followerList.length-1 ) {
							followerListName = followerListName + ", " + follower.followerName + " 님을 초대했습니다.";
						} else {
							followerListName = followerListName + ", " + follower.followerName;
						}
					}
				}
			});
			
			return followerListName;
			
		},
		
		/** 값 초기화 */
		resetData: function() {
			var me = this;
			me.setSelectedRoomId("");
			me.messageDateFlag = "";
			me.messageList = [];
			me.selectedRoomFollowerList = [];
		},
		
		/**
		 * contents영역 초기화
		 */
		contentsRemoveSet: function() {
			$("#msgUserList").remove();
			$("#roomDIV").empty();
		},
		
		/**
		 * 채팅창 유저 목록
		 */
		drawUserList: function() {
			var me = this;
			
			me.setStay(me.STAY_TYPE.USERLIST); 
			me.resetData();
			me.contentsRemoveSet();
			me.gnbStyling();
			
			$("#unb").show();
			$("#unb-room").hide();
			$("#roomDIV").empty();

			var roomTitle = me.participatedRoomList[0].roomTitle;
			
			$("#mainRoomTitle").html(roomTitle);
			
			var DL = $("<dl class='msg-user' id='msgUserList'></dl>");
			DL.append("<dt>나</dt>");
			var MYSELF_DD = $("<dd></dd>");
			MYSELF_DD.append("<div class='photo' style=''>나</div>");
			MYSELF_DD.append("<span>" + me.getUserName() + " (" + me.getUserId() + ")</span>");
			DL.append(MYSELF_DD);
			
			var clickEvent = function(element, roomData) {
				element.unbind("click");
				element.bind("click", function(){
					me.makeChattingRoom(roomData);
				});
			}
			
			var listTitle = "협상대상자";
			if(me.getUserType() != me.USER_TYPE.DEALER) {
				listTitle = "거래자";
			}
			
			DL.append("<dt>" + listTitle + "</dt>");
			me.participatedRoomList.forEach(function(room){
				room.followerList.forEach(function(follower){
					if(follower.followerId != me.USERID) {
						var DD = $("<dd></dd>");
						DD.append("<div class='photo' style=''>" + follower.followerName + "</div>");
						var msgStr = "협상중";
						if(room.status == me.ROOM_STATUS.SUCCESS) {
							msgStr = "협상종료";
						} else if(room.status == me.ROOM_STATUS.STOP) {
							msgStr = "협상결렬";
						}
						DD.append("<span>" + follower.followerName + " (" + follower.followerId + ")</span>");
						DD.append("<div class='msg'><strong>" + msgStr + "</strong> 입니다.</div>");
						clickEvent(DD, room);
						DL.append(DD);
					}
				});
			});
			
			$("#content").append(DL);
			
		},
		
		/**
		 *  bnb영역 그리기
		 */
		makeBNBArea: function(status) {
			var me = this;
			if(status == me.ROOM_STATUS.STOP) {
				return;
			}
			
			$("#bnb").empty();
			
			var DL = $("<dl></dl>");
			var DT = $("<dt></dt>");
			
			DT.append("<div class='container'><input type='text' id='messageContents' onkeydown='javascript:sendMessage(event);' placeholder='내용를 입력하세요'></div>");
			DL.append(DT);
			
			var eventSuccess = function(element, type) {
				element.unbind("click");
				element.bind("click", function(){
					me.updateRoomSuccess(type);
				});
			}
			
			var eventStop = function(element, type) {
				element.unbind("click");
				element.bind("click", function(){
					me.updateRoomStop(type);
				});
			}
			
			if(status == me.ROOM_STATUS.SUCCESS) {
				$("#bnb").append(DL);
				return;
			}
			
			if(me.USERTYPE ==  me.USER_TYPE.DEALER) {
				var DD = $("<dd></dd>");
				var btnSuccess = $("<button class='success'>협상성공</button>");
				eventSuccess(btnSuccess, me.ROOM_STATUS.SUCCESS);
				DD.append(btnSuccess).append("&nbsp;");
				
				var btnStop = $("<button class='broken'>협상결렬</button>");
				eventStop(btnStop, me.ROOM_STATUS.STOP);
				DD.append(btnStop);
				DL.append(DD);
			}
			
			$("#bnb").append(DL);
			
		},

		/** gnb영역 버튼 스타일링 */
		gnbStyling: function() {
			var me = this;
			// 방에 있지 않은 경우
			if(me.getSelectedRoomId() == "") {
				$("#minimumScale").show();
				$("#maximumScale").show();
				$("#close").show();
			} else {
				$("#minimumScale").hide();
				$("#maximumScale").hide();
				$("#close").show();
			} 
		},
		
		/**
		 * 채팅방 들어가기
		 */
		makeChattingRoom: function(roomData) {
			var me = this;
			// 채팅방의 메세지 데이터 가져오기
			me.getMessageByRoomId(roomData.roomId);
			me.contentsRemoveSet();
			me.setStay(me.STAY_TYPE.CHATROOM); 
			
			$("body").attr("id", "room");
			$("#unb").hide();
			$("#unb-room").show();
			$("#roomTitle").html(roomData.roomTitle);
			$("#mainRoomTitle").html(roomData.roomTitle);
			var INVITEMESSAGE_DIV = $("<div class='chat_admission'></div>");
			INVITEMESSAGE_DIV.append(me.makeChatAdmission(roomData));
			$("#roomDIV").append(INVITEMESSAGE_DIV);
			
			if(me.messageList.length == 0) {
				var initDay = me.chatDateUtil.getYearToDayStringWithHyphen(new Date());
				me.messageDateFlag = initDay;
			}
			
			var UL = $("<ul class='chatting_list' id='chattingUL'></ul>");
			if(me.messageList.length > 0) {
				me.messageList.forEach(function(item, idx){
					var titleTimeAgo = new Date(item.regDttm).toLocaleString();
					var time = me.chatDateUtil.timeSplit(titleTimeAgo);
					var fullDate = me.chatDateUtil.getFullDateToString(new Date(item.regDttm));
					var itemDttm = me.chatDateUtil.getYearToDayStringWithHyphen(new Date(item.regDttm));
	
					var DIV;
					var SPAN;
					var LI;
					if(idx == "0") {
						var today = me.chatDateUtil.getYearToDayStringWithHyphen(new Date());
						if(today != itemDttm) {
							DIV = $("<div class='chat_day'></div>");
							SPAN = $("<span></span>");
							SPAN.append(fullDate);
							DIV.append(SPAN);
							UL.append(DIV);
						}
						
					} else {
						if(me.messageDateFlag != itemDttm) {
							DIV = $("<div class='chat_day'></div>");
							SPAN = $("<span></span>");
							SPAN.append(fullDate);
							DIV.append(SPAN);
							UL.append(DIV);
						}
					}
	
					me.messageDateFlag = itemDttm;
					
					var messageDivId = "messageDiv_" + item.messageId;
					
					if(item.userId == me.getUserId()) {
						LI = $("<li class='me' id='" + messageDivId + "'></li>");
						LI.append("<div class='txt_data' title='" + fullDate+ "'>" + time + "</div>");
						LI.append("<div class='box_me'>" + item.message + "</div>");
						UL.append(LI);
					} else {
						LI = $("<li class='their' id='" + messageDivId + "'></li>");
						LI.append("<div class='photo' style=''>" + item.userName + "</div>");
						LI.append("<div class='txt_name'>" + item.userName + "("+ item.userId  +")</div>");
						LI.append("<div class='box_their'>" + item.message + "</div>");
						LI.append("<div class='txt_data' title='" + fullDate+ "'>" + time + "</div>");
						UL.append(LI);
					}
					
					$("#roomDIV").append(UL);
					
				});
			} else {
				$("#roomDIV").append(UL);
			}
			
			if(roomData.status == me.ROOM_STATUS.SUCCESS ) {
				$("#chattingUL").append("<div class='chat_msg'>" + me.STATUS_MESSAGE.MSG_SUCCESS + "</div>");
			} else if(roomData.status == me.ROOM_STATUS.STOP ) {
				$("#chattingUL").append("<div class='chat_msg'>" + me.STATUS_MESSAGE.MSG_STOP + "</div>");
			}

			me.setSelectedRoomId(roomData.roomId);
			me.setSelectedRoomTitle(roomData.roomTitle);
			me.selectedRoomFollowerList = roomData.followerList;
			me.gnbStyling();
			$("#content").scrollTop($("#roomDIV").height());
			me.makeBNBArea(roomData.status);
		},
		
		/**
		 * Observer 등록
		 */
		registerObserver: function() {
			var me = this;
			ChatObserver.registerObserver(me);
		},

		/**
		 * Observer 메세지
		 * @param data
		 */
		reload: function(message) {
			var me = this;
			var jsonData = JSON.parse(message.data);
			me.reloadRoom(jsonData);
		},
		
		/**
		 * 사용자 아이디가 포함된 모든 방 정보가져오기 
		 * @param userId
		 */
		getAllRoomList: function(userId) {
			var me = this;
			me.getParticipatedRoomList(userId);
		},
		
		/**
		 * roomId로 검색
		 */
		getRoomByRoomId: function() {
			var me = this;
			var url = contextpath + "/rooms/" + me.getInitRoomId() + "/users/" + me.getUserId();
			ajaxGET(url, null, function(data) {
				me.participatedRoomList.push(data);
			});
		},
		
		/**
		 * flag로 룸 리스트 가져오기
		 */
		getAllRoomListByFlag: function() {

			var me = this;
			var url = contextpath + "/users/" + me.getUserId() + "/flag/" + me.getInitRoomFlag();
			ajaxGET(url, null, function(data) {
				me.participatedRoomList = data;
			});
		},
		
		/**
		 * 메세지 리스트 가져오기
		 */
		getMessageByRoomId: function(roomId) {
			var me = this;
			var url = contextpath + "/messages/" + roomId + "/users/" + me.getUserId();
			ajaxGET(url, null, function(data) {
				me.messageList = data;
			});
		},
		
		/**
		 * 메세지 보내기
		 */
		sendMessage: function() {
			var me = this;
			me.messageController.sendMessage(me.MESSAGE_TYPE.MESSAGE);
		},
		
		/**
		 * 채팅방 리스트 리로드
		 */
		reloadRoomList: function() {
			var me = this;
			$("#participated_room").empty();
			$("#establish_room").empty();
			me.getAllRoomList(me.getUserId());
			me.drawAllRoomList();
		},
		
	};
	
	RoomController.prototype.constructor = RoomController;