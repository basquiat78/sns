		
	var GNB_DIV_NOTI = '';
	var setGnbWebNoti = function(divid){
		GNB_DIV_NOTI = divid;
	}
	
	var GNB_DIV_FEED = '';
	var setGnbWebFeed = function(divid){
		GNB_DIV_FEED = divid;
	}
	
	var GNB_DIV_APPROVAL = '';
	var setGnbWebApproval = function(divid){
		GNB_DIV_APPROVAL = divid;
	}

	var Websocket = {};
	
    Websocket.socket = null;

    // connect()
    Websocket.connect = (function(host) {
        if ('WebSocket' in window) {
            Websocket.socket = new WebSocket(host);
        } else if ('MozWebSocket' in window) {
            Websocket.socket = new MozWebSocket(host);
        } else {
            Console.log('Error: WebSocket is not supported by this browser.');
            return;
        }

        Websocket.socket.onopen = function () {
            Console.log('Info: WebSocket connection opened.');
            document.getElementById('Websocket').onkeydown = function(event) {
                if (event.keyCode == 13) {
                    Websocket.sendMessage();
                }
            };
        };
		
        Websocket.socket.onclose = function () {
            document.getElementById('Websocket').onkeydown = null;
            Console.log('Info: WebSocket closed.');
        };
		
        Websocket.socket.onmessage = function (message) {
        	try{
    			test(JSON.parse(message.data));
    			//Console.log(message.data);
    		}catch(e){
    			Console.log(message.data);	
    		}
        };
    });

    
    Websocket.initialize = function() {
        if (window.location.protocol == 'http:') {
        	Websocket.connect('ws://localhost:8090/websocketjavax');
        	//Websocket.connect('ws://10.150.17.190:8090/websocketjavax');
        } else {
            Websocket.connect('wss://' + window.location.host + '/websocket');
        }
    };


    Websocket.sendMessage = (function() {
        var message = document.getElementById('Websocket').value;
        if (message != '') {
            Websocket.socket.send(message);
            document.getElementById('Websocket').value = '';
        }
    });
   
    
    var Console = {}; 

    Console.log = (function(message) {
        var console = document.getElementById('console');
        var p = document.createElement('p');
        p.style.wordWrap = 'break-word';
        p.innerHTML = message;
        console.appendChild(p); 
        
        while (console.childNodes.length > 25) {
            console.removeChild(console.firstChild);
        }

        console.scrollTop = console.scrollHeight;
    });
    

    Websocket.initialize();
