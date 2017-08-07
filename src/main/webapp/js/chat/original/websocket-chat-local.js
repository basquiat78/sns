/**
 * 웹소켓 정보
 */
var _rootPath = "127.0.0.1:8080/sns";
var _max_retry_cnt = 10;
var _retry_cnt = 0;
var _currentId = "";

/**
 * 옵져버 설정
 */
var websocketCallback = function(message) {
	ChatObserver.selectObserversType(message);
}


var Websocket = {};
Websocket.socket = null;

var _timeout_run;

// connect()
Websocket.connect = (function(host, messageController) {
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
        
    };
	
    Websocket.socket.onmessage = function (message) {
    	websocketCallback(message);
    };
    
    Websocket.socket.onerror = function (event) {
    	console.log("[websocket error] " + event.code + " - " + event.data);
    }
    
});

Websocket.initialize = function(messageController) {
	_currentId = messageController._ROOM_CONTROLLER.USERID;
	Websocket.run();
};

Websocket.run = function() {
	var fullPath = _rootPath + '/ws/chat?userId=' + _currentId;
    if (window.location.protocol == 'http:') {
    	Websocket.connect('ws://' + fullPath);
    } else {
        Websocket.connect('wss://' + fullPath);
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