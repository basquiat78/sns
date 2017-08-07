
var _prev_noti_cnt = 0;
var _rootPath = "127.0.0.1:8090/sns";
var _currUserId = null;
var _id_noti_cnt = "_id_noti_cnt";
var _curr_cnt = 0;

var _max_retry_cnt = 10;
var _retry_cnt = 0;

var _sns_callback_fnc = function() {
	var suffix = "/sns";
	var b = _rootPath.match(suffix+"$") == suffix;
	
	if(b) {	// sns 일 경우만 동작함.
		Observer.notifyObservers('reload');
	}
};




var Websocket = {};

Websocket.socket = null;

var _timeout_run;
var _timeout_msg;

// connect()
Websocket.connect = (function(host) {
    if ('WebSocket' in window) {
        Websocket.socket = new WebSocket(host);
    } else if ('MozWebSocket' in window) {
        Websocket.socket = new MozWebSocket(host);
    } else {
        console.log('Error: WebSocket is not supported by this browser.');
        return;
    }

    Websocket.socket.onopen = function () {
        console.log('Info: WebSocket connection opened.');
    };
	
    Websocket.socket.onclose = function () {
        console.log('Info: WebSocket closed.');
        console.log('Info: retry!.');
        
        if(_max_retry_cnt < (++_retry_cnt)) {
        	return;
        }
        
        _timeout_run = setTimeout(Websocket.run(), 10000);
        
        //Websocket.run();
        
        //var b = _isBrowser('msie');
        //if(b) {
        //	clearTimeout(_timeout_msg);
        //}
        
    };
	
    Websocket.socket.onmessage = function (message) {
    	try{
			//console.log(message.data);
			//test(JSON.parse(message.data));
			if(message.data == 'RELOAD') {
				_view_notiCount();
			}
		}catch(e){
			console.log(message.data);
		}
    };
    
    Websocket.socket.onerror = function (event) {
    	console.log("[websocket error] " + event.code + " - " + event.data);
    }
    
});

Websocket.initialize = function(currUserId, rootPath, id_noti_cnt, sns_callback_fnc) {
	_currUserId = currUserId;

	if(rootPath != undefined && rootPath != null) {
		_rootPath = rootPath;
	}
	if(id_noti_cnt != undefined && id_noti_cnt != null) {
		_id_noti_cnt = id_noti_cnt;
	}
	if(sns_callback_fnc != undefined && sns_callback_fnc != null) {
		_sns_callback_fnc = sns_callback_fnc;
	}
	
	_view_notiCount();
	
	Websocket.run();
	// clearTimeout(_timeout_run);
};

Websocket.run = function() {
    if(_currUserId == null || _currUserId == '') {
    	console.log('Error: User is not session.');
    	// Websocket.close();
    	return;
    }
    
    if (window.location.protocol == 'http:') {
    	Websocket.connect('ws://' + _rootPath + '/ws/snsnoti');
    	
    } else {
        Websocket.connect('wss://' + _rootPath + '/ws/snsnoti');
    }
    
    var message = "{\"MODE\" : \"NEWUSER\", \"ITEM_TYPE\" : \"\", \"ITEM_ID\" : \"" + _currUserId + "\", 'ss' : '" + new Date() + "'}";
    Websocket.sendMessage(message);
    
    //Websocket.sendMessage('{"MODE" : "NEWUSER", "ITEM_TYPE" : "", "ITEM_ID" : "1"}');
};

Websocket.sendMessage = (function(message) {
	waitForConnection(Websocket.socket, 1, function() {
        if (message != '') {
            Websocket.socket.send(message);
        }
	});
	// clearTimeout(_timeout_waitForConnection);
});

Websocket.close = (function() {
	Websocket.socket.close();
});

var _timeout_waitForConnection;
function waitForConnection(socket, state, callback){
	_timeout_waitForConnection = setTimeout(
        function(){
        	//console.log(socket.readyState);
            if (socket.readyState === state) {
                if(callback !== undefined && callback !== null){
                    callback();
                }
            	console.log("success. (" + state + ")");
                return;
            } else {
            	waitForConnection(socket, state, callback);
            }
        }, 3000);
};

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
			
			if(_prev_noti_cnt !== _curr_cnt) {
				$("#" + _id_noti_cnt).html(_curr_cnt);
				_prev_noti_cnt = _curr_cnt;
				
				if(_sns_callback_fnc !== undefined && _sns_callback_fnc !== null) {
					_sns_callback_fnc();
				}
			} else if(_curr_cnt === 0) {
				$("#" + _id_noti_cnt).html("0");
			}
		}
		
	});
}

function _isBrowser(browserName) {
	var browser = (function() {
		if (!!navigator.userAgent.match(/Trident\/7\./)) {
			return {name:'msie',version:'11'};	// ie 11
		}
		var s = navigator.userAgent.toLowerCase();
		console.log(s);;
		var match = /(webkit)[ \/](\w.]+)/.exec(s) ||
		              /(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
		              /(msie) ([\w.]+)/.exec(s) ||               
		              /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
		             [];
		return { name: match[1] || "", version: match[2] || "0" };}());
	var _bName = browser.name;
	console.log(_bName);
	if(_bName === browserName.toLowerCase()) {
		return true;
	}
	return false;
}

window.onbeforeunload = function() {
	waitForConnection(Websocket.socket, 3, function() {
        Websocket.close();
	});
};
