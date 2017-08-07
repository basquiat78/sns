var Observer;

var _prev_noti_cnt = 0;
var _rootPath = "localhost:8090/sns";
//var _rootPath = "10.150.17.190:8080/sns";
var _currUserId = null;
var _id_noti_cnt = "_id_noti_cnt";
var _curr_cnt = 0;
var Noti = {};

function _view_notiCount() {
	$.ajax({
		url: window.location.protocol + "//" + _rootPath + '/notices/cnt/synckey/' + _currUserId,
		dataType	: "jsonp",
		type:'GET',
		success:function(data){
			//console.log(data);
			try {
				_curr_cnt = parseInt(data.noticeCnt);
			} catch(e) {
				_curr_cnt = 0;
			}
			if(_curr_cnt === 0) {
				$("#" + _id_noti_cnt).html("0");
				$("#" + _id_noti_cnt).css("display", "none");
			} else {
				var curCntStr = _curr_cnt > 99 ? new String('99+') : new String(_curr_cnt);
				$("#" + _id_noti_cnt).html(curCntStr);
				$("#" + _id_noti_cnt).css("display", "");
			}
			
			/*
			if(_prev_noti_cnt !== _curr_cnt) {
				_prev_noti_cnt = _curr_cnt;
				
				if(_cehckUserNotiAlarmCount !== undefined && _cehckUserNotiAlarmCount !== null) {
					_cehckUserNotiAlarmCount();
				}
			} else if(_curr_cnt === 0) {
				$("#" + _id_noti_cnt).html("0");
				$("#" + _id_noti_cnt).css("display", "none");
			}
			*/
		}
		
	});
}

//알림 폴링 재시도 횟수 제한 (30초씩 10회, 5분씩 10회 동안 에러시 중지, 성공하면 재시도횟수 초기화)

var attemptcnt = 0;
var firstInterval;
var secondInterval;
var SNS_NOTI_ERR = false;

function firstAttempt() {
	firstInterval = setInterval(function(){

	    _callSnsNoti();

	    if(attemptcnt === 10) {
	        clearInterval(firstInterval);
	        secondAttempt();
	    }
	}, 30000);
	//}, 1000);
}

function secondAttempt() {
	
	secondInterval = setInterval(function(){

	    _callSnsNoti();

	    if(attemptcnt === 20) {
	        clearInterval(secondInterval);
			if(SNS_NOTI_ERR) {
				console.log("stopped");
			} else
				firstAttempt();
	    }
	}, 300000);
	//}, 2000);
}

function _cehckUserNotiAlarmCount() {
	$.ajax({
		url: window.location.protocol + "//" + _rootPath + '/notices/users/alarms/count/' + _currUserId,
		dataType	: "jsonp",
		type:'GET',
		success:function(cnt){
			//console.log(cnt);
			var suffix = "/sns";
			var b = _rootPath.match(suffix+"$") == suffix;
			
			if(cnt > 0 && b) {	// sns 일 경우만 동작함.
				
				_view_notiCount();
				
				Observer.notifyObservers('reload');
				
				/*
				var cntStr = cnt > 99 ? new String('99+') : new String(cnt);
				$("#" + _id_noti_cnt).html(cntStr);
				$("#" + _id_noti_cnt).css("display", "");
				*/
			} else {
				/*
				$("#" + _id_noti_cnt).html("0");
				$("#" + _id_noti_cnt).css("display", "none");
				*/
			}
			
			SNS_NOTI_ERR = false;
			attemptcnt = 0;
		},
		error: function (jqXHR, textStatus, errorThrown) {
			SNS_NOTI_ERR = true;
			attemptcnt+=1;
        }
	});
}


function _callSnsNoti() {
//	_view_notiCount();
	_cehckUserNotiAlarmCount();
	//alkjskdlfjl();
}

function alkjskdlfjl() {
	attemptcnt+=1;
	SNS_NOTI_ERR = true;
	console.log("haha");
}

Noti.initialize = function(currUserId, rootPath) {
	_rootPath = rootPath;
	_currUserId = currUserId;
	
	_view_notiCount();
	
	//setInterval("_callSnsNoti()",30000);
	firstAttempt();
}

