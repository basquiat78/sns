
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
    	$("#chatMessage").append(message.data + "<br/>");
    };
    
    Websocket.socket.onerror = function (event) {
    	console.log("[websocket error] " + event.code + " - " + event.data);
    }
    
});

Websocket.initialize = function() {
	Websocket.run();
};

Websocket.run = function() {
    if (window.location.protocol == 'http:') {
    	Websocket.connect('ws://' + _rootPath + '/ws/chat');
    } else {
        Websocket.connect('wss://' + _rootPath + '/ws/chat');
    }
};

Websocket.sendMessage = (function(message) {
    if (message != '') {
        Websocket.socket.send(message);
    }
});

Websocket.close = (function() {
	Websocket.socket.close();
});

window.onbeforeunload = function() {
    Websocket.close();
};