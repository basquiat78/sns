	var RoomController = function() {
		/**
		 * rom controller 정보
		 */
		this.USERID							= "";
		this.USERNAME					= "";
		/** 참여하는 방 리스트 */
		this.participatedRoomList			= [];
		/** 자신이 개설한 방 리스트 */
		this.establishRoomList				= [];
		this.messageController			= null;
		this.alarmController				= null;
		this.chatDateUtil					= null;
		/** 채팅 참여 여부 */
		this.participated					= false;
		/** 현재 채팅하고 있는 방 아이디 */
		this.selectedRoomId				= "";
		/** 현재 채팅하고 있는 방 타이틀 */
		this.selectedRoomTitle			= "";
		this.selectedRoomUnreadCnt	= 0;
		/** 메세지 데이터 플래그 */
		this.messageDateFlag				= "";
		/** 저장된 있던 채팅방 메세지 리스트 */
		this.messageList					= [];
		/** 초대한 팔로워 리스트 */
		this.invitedFollowerList			= [];
		/** 귓속말 대상자 정보 */
		this.targetWhisper					= null;
		/** 현재 채팅창에 속한 팔로워 리스트 */
		this.selectedRoomFollowerList	= [];
		/** 내가 초대받았던 방 리스트 */
		this.invitedRoomList = [];
		this.ROOM_TYPE = {
				PARTICIPATE	: "PARTICIPATE",
				ESTABLISH		: "ESTABLISH"
		};
		
		this.MESSAGE_TYPE = {
				MESSAGE			: "MESSAGE", 
				INVITE				: "INVITE", 
				PARTICIPATION	: "PARTICIPATION",
				LEAVE					: "LEAVE",
				NOTICE				: "NOTICE",
				RELOAD				: "RELOAD",
				WHISPER				: "WHISPER"
		};
		
	}
	
	RoomController.prototype =  {
	
		/**
		 * 초기화
		 * @param userId
		 * @param userName
		 */
		initialize: function(userId, userName) {
			var me = this;
			me.USERID = userId;
			me.USERNAME = userName;
			me.getAllRoomList(userId);
			me.drawAllRoomList();
			
			me.alarmController = new AlarmController(me);
			me.alarmController.init();
			
			me.messageController = new MessageController(me);
			me.messageController.init();
			
			me.chatDateUtil = new ChatDateUtil();
		    me.chatDateUtil.init();
			
		    var date = new Date();
		    
			me.bindMentionEvent();
			me.registerObserver();
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
		 * 초대 이후의 방 정보를 갱신해야한다.
		 */
		reloadRoom: function(data) {
			var me = this;
			me.getAllRoomList(me.USERID);
			var roomId = data.roomId;
			
			var nameClickEvent = function(element, item) {
				element.unbind("click");
				element.bind("click", function(){
					if(me.USERID == item.followerId) {
						alert("자기자신에게 귓말을 할 수 없습니다.");
						return
					}
					$("#sendBtn").hide();
					$("#inviteBtn").hide();
					$("#whisperBtn").show();
	   		    	$("#whisperCancelBtn").show();
	   		    	var placeholderMessage = item.followerName+"님에게 귓말하기";
					$("#chatMessage").attr("placeholder", placeholderMessage);
					me.targetWhisper = item;
				});
			};
			
			if(roomId == me.selectedRoomId) {
				me.participatedRoomList.some(function(room){
					me.selectedRoomFollowerList = room.followerList;
					$("#roomInfoDIV").empty();
					$("#roomInfoDIV").append("방 아이디 : " + room.roomId + "<br/>");
					$("#roomInfoDIV").append("방 제목 : " + room.roomTitle + "<br/>");
					$("#roomInfoDIV").append("방 개설자 : " + room.establisherName + "<br/>");
					$("#roomInfoDIV").append("방 개설일자 : " + new Date(room.regDttm).toLocaleString() + "<br/>");
					room.followerList.forEach(function(follower, idx){
						var followerDIV = $("<div></div>");
						nameClickEvent(followerDIV, follower);
						followerDIV.append("방 참여자_"+ idx+" : " + follower.followerName);
						$("#roomInfoDIV").append(followerDIV);
					});
				});
			}
		},
		
		/**
		 * 멘션 이벤트 바인딩
		 */
		bindMentionEvent: function() {
			var me = this;
			var customRenderMenu = function(ul, items){
				var that = this;
				$.each(items, function( index, item) {
					var li = that._renderItemData( ul, item );
					li.attr("aria-label", item.mentionId + " : " + item.mentionName);
				});
			};
			
			$("#follower").autocomplete({
				autoFocus: true,
				minLength: 2,
   				source: function(request, response) {
   					var baseurl = contextpath + "/followers/mentions/";
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
   		        	me.mentionsSelectEventHandler(ui.item);
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
       		
       		$("#targetInviteFollower").autocomplete({
				autoFocus: true,
				minLength: 2,
   				source: function(request, response) {
   					var baseurl = contextpath + "/followers/mentions/";
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
   		        	me.mentionsInviteEventHandler(ui.item);
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
		},
		
		/**
		 * 멘션 셀렉트 이벤트 핸들러
		 * @param item
		 */
		mentionsSelectEventHandler: function(item) {
			var me = this;
			me.invitedFollowerList.push(item);
			var SPAN = $("<div></div>");
			SPAN.append(item.mentionName);
			$("#invited_follower").append(SPAN);
			$("#follower").val("");
		},
		
		/**
		 * 멘션 셀렉트 이벤트 핸들러 방 내부에서 초대장 날리기 위한 
		 * @param item
		 */
		mentionsInviteEventHandler: function(item) {
			var me = this;
			me.invitedFollowerList.push(item);
			var SPAN = $("<div></div>");
			SPAN.append(item.mentionName);
			$("#inviteFollower").append(SPAN);
			$("#targetInviteFollower").val("");
		},
		
		/**
		 * 사용자 아이디가 포함된 모든 방 정보가져오기 
		 * @param userId
		 */
		getAllRoomList: function(userId) {
			var me = this;
			me.getParticipatedRoomList(userId);
			me.getEstablishRoomList(userId);
		},
		
		/**
		 * 사용자가 포함된 모든 채팅방 리스트 가져오기
		 */
		drawAllRoomList: function() {
			var me = this;
			me.drawParticipatedRoomList();
			me.drawEstablishRoomList();
		},
		
		/**
		 * 메세지 리스트 가져오기
		 */
		getMessageByRoomId: function(roomId) {
			var me = this;
			var url = contextpath + "/messages/" + roomId + "/users/" + me.USERID;
			ajaxGET(url, null, function(data) {
				me.messageList = data;
			});
		},
		
		/**
		 * 노티스 관련 체크 로직
		 */
		checkReadNotice: function(roomData) {
			var me = this;
			
			me.invitedRoomList.some(function(data, idx){
				if(data.roomId == roomData.roomId) {
					me.invitedRoomList.splice(idx, 1);
					var url = contextpath + "/notices/"+data.noticeId;
					ajaxUPDATEById(url, null, me.alarmController.checkNoticeReadUpdate, me.alarmController);
					var divId = "noticeId_"+data.noticeId;
					$("#"+divId).css("font-weight", "normal");
				}
			});
		
		},
		
		/**
		 * 채팅방 들어가기
		 */
		makeChattingRoom: function(roomData) {
			var me = this;
			
			if(me.getStatus()) {
				alert("현재 방 참여중입니다.");
				return;
			}
			
			// 노티스 관련 로직 처리
			me.checkReadNotice(roomData);
			me.checkMessageRead(roomData.roomId);
			//me.getUnreadMessageCount(roomData.roomId)
			me.getMessageByRoomId(roomData.roomId);

			var nameClickEvent = function(element, item) {
				element.unbind("click");
				element.bind("click", function(){
					if(me.USERID == item.followerId) {
						alert("자기자신에게 귓말을 할 수 없습니다.");
						return
					}
					$("#sendBtn").hide();
					$("#inviteBtn").hide();
					$("#whisperBtn").show();
	   		    	$("#whisperCancelBtn").show();
	   		    	var placeholderMessage = item.followerName+"님에게 귓말하기";
					$("#chatMessage").attr("placeholder", placeholderMessage);
					me.targetWhisper = item;
				});
			};
			
			var roomInfo = $("<div id='roomInfoDIV'></div>");
			roomInfo.append("방 아이디 : " + roomData.roomId + "<br/>");
			roomInfo.append("방 제목 : " + roomData.roomTitle + "<br/>");
			roomInfo.append("방 개설자 : " + roomData.establisherName + "<br/>");
			roomInfo.append("방 개설일자 : " + me.chatDateUtil.getFullDateToString(new Date(roomData.regDttm)) + "<br/>");
			roomData.followerList.forEach(function(follower, idx){
				var followerDIV = $("<div></div>");
				nameClickEvent(followerDIV, follower);
				followerDIV.append("방 참여자_"+ idx+" : " + follower.followerName);
				roomInfo.append(followerDIV);
			});
			
			$("#MainContents").append(roomInfo);
			
			if(me.messageList.length == 0) {
				var initDay = me.chatDateUtil.getYearToDayStringWithHyphen(new Date());
				me.messageDateFlag = initDay;
			}
			
			me.messageList.forEach(function(item, idx){
				var titleTimeAgo = new Date(item.regDttm).toLocaleString();
				var time = me.chatDateUtil.timeSplit(titleTimeAgo);
				var fullDate = me.chatDateUtil.getFullDateToString(new Date(item.regDttm));
				var itemDttm = me.chatDateUtil.getYearToDayStringWithHyphen(new Date(item.regDttm));

				var DIV;
				if(idx == "0") {
					var today = me.chatDateUtil.getYearToDayStringWithHyphen(new Date());
					if(today != itemDttm) {
						DIV = $("<div style='text-align: center;'></div>");
						DIV.append("<div>--------------------------- <b>" + fullDate + "<b> ---------------------------</div>");
						$("#MainContents").append(DIV);
					}
					
				} else {
					if(me.messageDateFlag != itemDttm) {
						DIV = $("<div style='text-align: center;'></div>");
						DIV.append("<div>--------------------------- <b>" + fullDate + "<b> ---------------------------</div>");
						$("#MainContents").append(DIV);
					}
				}
				
				me.messageDateFlag = itemDttm;
				//<span class='readCount'></span>
				if(item.userId == me.USERID) {
					if(item.messageType == me.MESSAGE_TYPE.WHISPER) {
						DIV = $("<div style='text-align: right;'></div>");
						DIV.append("<div><b>whisper to @" + item.whisperName+ "<b></div>");
						DIV.append("<div><span class='readCount'></span> <abbr title='" + fullDate + "'>"+ time +"</abbr> <b>" + item.message+ "<b></div><br/>");
					} else {
						DIV = $("<div style='text-align: right;'></div>");
						DIV.append("<div><span class='readCount'></span> <abbr title='" + fullDate + "'>"+ time +"</abbr> " + item.message+ "</div><br/>");
					}
				} else {
					if(item.messageType == me.MESSAGE_TYPE.WHISPER) {
						DIV = $("<div style='text-align: left;'></div>");
						DIV.append("<div><b>whisper from @" + item.userName+ "<b></div>");
						DIV.append("<div><b>" + item.message+ "<b> <abbr title='" + fullDate + "'>"+ time +"</abbr> <span class='readCount'></span> </div><br/>");
					} else {
						DIV = $("<div style='text-align: left;'></div>");
						DIV.append("<div>" + item.userName+ "</div>");
						DIV.append("<div>" + item.message+ " <abbr title='" + fullDate + "'>"+ time +"</abbr> <span class='readCount'></span> </div><br/>");
					}
				}
				
				$("#MainContents").append(DIV);
				
			});
			
			$("#Message_DIV").show();
			$("#create_DIV").hide();
			$("#invited_follower").empty();
			$("#roomTitle").val("");
			me.setStatus(true);
			me.setSelectedRoomId(roomData.roomId);
			me.setSelectedRoomTitle(roomData.roomTitle);
			me.invitedFollowerList = [];
			me.selectedRoomFollowerList = roomData.followerList;
		},
		
		/**
		 * 참여하고 있는 roomId 가져오기
		 * @returns {String}
		 */
		getSelectedRoomId: function() {
			var me = this;
			return me.selectedRoomId;
		},
		
		/**
		 * roomId setting
		 * @param roomId
		 */
		setSelectedRoomId: function(roomId) {
			var me = this;
			me.selectedRoomId = roomId;
		},
		
		/**
		 * 참여하고 있는 roomTitle 가져오기
		 * @returns {String}
		 */
		getSelectedRoomTitle: function() {
			var me = this;
			return me.selectedRoomTitle;
		},
		
		/**
		 * roomTitle setting
		 * @param roomTitle
		 */
		setSelectedRoomTitle: function(roomTitle) {
			var me = this;
			me.selectedRoomTitle = roomTitle;
		},
		
		/**
		 * 채팅 참여 여부 가져오기
		 */
		getStatus: function() {
			var me = this;
			return me.participated;
		},
		
		/**
		 * 현재 방 참여 여부 
		 */
		setStatus: function(status) {
			var me = this;
			me.participated = status;	
		},
		
		/**
		 * 메세지 보내기
		 */
		sendMessage: function() {
			var me = this;
			me.messageController.sendMessage(me.MESSAGE_TYPE.MESSAGE);
		},
		
		/**
		 * 귓속말 보내기
		 */
		sendWhisper: function() {
			var me = this;
			me.messageController.sendWhisper(me.MESSAGE_TYPE.WHISPER);
			me.targetWhisper = null;
			$("#sendBtn").show();
			$("#inviteBtn").show();
			$("#whisperBtn").hide();
	    	$("#whisperCancelBtn").hide();
			$("#chatMessage").attr("placeholder", "");
		},
		
		/**
		 * 귓속말 취소
		 */
		cancelWhisper: function() {
			var me = this;
			me.targetWhisper = null;
			$("#sendBtn").show();
			$("#inviteBtn").show();
			$("#whisperBtn").hide();
	    	$("#whisperCancelBtn").hide();
			$("#chatMessage").attr("placeholder", "");
		},
		
		/**
		 * 참여하고 있는 채팅방 리스트 그리기
		 */
		drawParticipatedRoomList: function() {
			var me = this;
			
			var clickEvent = function(element) {
				element.unbind("click");
				element.bind("click", function(){
					var selectedIdx = element.data("index");
					me.makeChattingRoom(me.participatedRoomList[selectedIdx]);
				});
			};
			
			me.participatedRoomList.forEach(function(item, idx){
				var DIV = $("<div data-index='"+idx+"'></div>");
				clickEvent(DIV);
				DIV.append(item.roomTitle);
				var id = "participatedRoom_"+item.roomId;
				var count = item.messageReadVo.messageCount;
				if(count == "0") {
					count = "";
				} else {
					count = " (" + count + ")";
				}
				var SPAN = $("<span id='" + id +"'>" + count + "</span>");
				DIV.append(SPAN);
				$("#participated_room").append(DIV);
			});
		},
		
		/**
		 * 개설한 채팅방 리스트 그리기
		 */
		drawEstablishRoomList: function() {
			var me = this;
			
			var clickEvent = function(element) {
				element.unbind("click");
				element.bind("click", function(){
					var selectedIdx = element.data("index");
					me.makeChattingRoom(me.establishRoomList[selectedIdx]);
				});
			};
			
			me.establishRoomList.forEach(function(item, idx){
				var DIV = $("<div data-index='"+idx+"'></div>");
				clickEvent(DIV);
				DIV.append(item.roomTitle);
				var id = "establishRoom_"+item.roomId;
				var count = item.messageReadVo.messageCount;
				if(count == "0") {
					count = "";
				} else {
					count = " (" + count + ")";
				}
				var SPAN = $("<span id='" + id +"'>" + count + "</span>");
				DIV.append(SPAN);
				$("#establish_room").append(DIV);
			});
		},
		
		/**
		 * 참여자로 있는 모든 방 정보 가져오기
		 * @param userId
		 */
		getParticipatedRoomList: function(userId) {
			var me = this;
			var url = contextpath + "/rooms/users/" + userId;
			ajaxGET(url, null, function(data) {
				me.participatedRoomList = data;
			});
		},
		
		/**
		 * 사용자가 개설한 방 가져오기
		 * @param userId
		 */
		getEstablishRoomList: function(userId) {
			var me = this;
			var url = contextpath + "/rooms/establishers/" + userId;
			ajaxGET(url, null, function(data) {
				me.establishRoomList = data;
			});
		},
		
		/**
		 * 채팅방 리스트 리로드
		 */
		reloadRoomList: function() {
			var me = this;
			$("#participated_room").empty();
			$("#establish_room").empty();
			me.getAllRoomList(me.USERID);
			me.drawAllRoomList();
		},
		
		/**
		 * 해당 룸의 읽지 않는 사용자 건수
		 */
		getUnreadMessageCount: function(roomId) {
			var me = this;
			var url = contextpath + "/messages/unread/" + roomId;
			ajaxGET(url, null, me.callbackUnreadCheck, me);
		},
		
		/**
		 * callback
		 */
		callbackUnreadCheck: function(data, me) {
			me.selectedRoomUnreadCnt = data;
		},
		
		/**
		 * 방 개설하기
		 */
		createRoom:  function() {
			var me = this;

			var roomTitle = $("#roomTitle").val();
			if(roomTitle == null || roomTitle == "") {
				alert("방 타이틀을 입력하세요.");
				return;
			}
			
			var followerList = new Array();
			/**
			 * 개설한 사람의 정보 등록
			 */
			var myself = {
					"followerId"	: me.USERID,
					"followerName"	: me.USERNAME
			}
			followerList.push(myself);
			
			me.invitedFollowerList.forEach(function(follower){
				var follower = {
						"followerId"	: follower.mentionId,
						"followerName"	: follower.mentionName
				}
				followerList.push(follower);
			})
		    
	    	var jsonData = {
		    			"roomTitle"			: roomTitle,
		    			"establisherId"		: me.USERID,
		    			"establisherName"	: me.USERNAME,
		    			"followerList"		: followerList
	    	}
				
			ajaxPOST(contextpath + "/rooms", jsonData, me.createAndParticipate, me);
			
		},
		
		/**
		 * 방을 개설하고 채팅방으로 들어간다
		 * @param data
		 * @param roomController
		 */
		createAndParticipate: function(data, roomController) {
			roomController.reloadRoomList();
			roomController.makeChattingRoom(data);
		},
		
		/**
		 * 채팅방 나가기
		 */
		leaveRoom: function() {
			var me = this;
			if(confirm("방을 나가시겠습니까?")) {
				$("#MainContents").empty();
				$("#Message_DIV").hide();
				$("#inviteFollower").empty();
				$("#Invite_DIV").hide();
				$("#Invite_DIV").removeClass("clicked");
				$("#create_DIV").show();
				me.messageList = [];
				me.setStatus(false);
				me.setSelectedRoomId("");
				me.messageDateFlag = "";
				me.selectedRoomFollowerList = [];
				me.invitedFollowerList=[];
			}
		},
		
		/**
		 * 방 초대장 날리기
		 */
		sendInvite: function() {
			var me = this;
			me.messageController.sendInvite(me.MESSAGE_TYPE.INVITE);
			$("#inviteBtn").click();
		},
		
		/**
		 * 채팅방을 벗어날 때 메세지 보내기
		 */
		leaveMessage: function() {
			
		},
		
		/**
		 * 참여할 때 메세지 보내기
		 */
		participateMessage: function() {
			
		},
		
		/**
		 * 읽음 표시 체크
		 */
		checkMessageRead: function(roomId) {
			var me = this;
			
			var jsonData = {
					roomId 			: roomId,
					userId 			: me.USERID,
			}
			
			ajaxDELETEByData(contextpath + "/messages/read", jsonData, me.callBackCheckMessageRead, me);
		},
		
		callBackCheckMessageRead: function(data, me) {
			
			me.participatedRoomList.some(function(participatedRoom){
				if(participatedRoom.roomId == data.roomId) {
					var id = "participatedRoom_" + data.roomId;
					$("#" + id).html("");
					participatedRoom.messageReadVo.messageCount = 0;
				}
			});
			
			me.establishRoomList.forEach(function(establishRoom){
				if(establishRoom.roomId == data.roomId) {
					var id = "establishRoom_" + data.roomId;
					$("#" + id).html("");
					establishRoom.messageReadVo.messageCount = 0;
				}
			});
			
		}
	};
	
	RoomController.prototype.constructor = RoomController;