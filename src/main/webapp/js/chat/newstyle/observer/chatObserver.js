/**
 * 옵져버 패턴을 이용한 옵져버 객체
 */

var ChatObserver = {
     
     observerCollection: [],

     /**
      * 객체를 옵져버 콜렉션에 담는다.
      * @param observer
      */
     registerObserver: function(observer) {
         var index = this.observerCollection.indexOf(observer);
         if (index == -1) {
             this.observerCollection.push(observer);
         }
     },
     
     /**
      * 콜렉션에서 해당 객체를 지운다.
      * @param observer
      */
     unregisterObserver: function(observer) {
         _.remove(this.observerCollection, function(e) {
             return observer === e;
         });
     },
     
     /**
      * 메세지에 담긴 타입에 따라 분기 실행
      * @param message
      */
     selectObserversType: function(message) {
    	
    	 var jsonData = JSON.parse(message.data);
    	 var type = jsonData.messageType;
    	 
    	 if(type == "MESSAGE" || type == "WHISPER" || type == "STATUS") {
    		 this.messageObservers(message);
    	 } else if(type == "RELOAD") {
    		 this.reloadObservers(message);
    	 } else {
    		 this.noticeObservers(message);
    	 }
    	 
     },
     
     /**
      * 메세지와 관련된 실행
      * @param message
      */
     messageObservers: function(message) {
         for (var observer in this.observerCollection) {
             if (this.observerCollection.hasOwnProperty(observer)) {
                 var subscriber = this.observerCollection[observer];
                 if (typeof subscriber.message === "function") {
                     subscriber.message(message);
                 }
             }
         }
     },
     
     /**
      * 스케쥴로부터 호출된 노티스 메세지 실행
      * @param message
      */
     noticeObservers: function(message) {
          for (var observer in this.observerCollection) {
              if (this.observerCollection.hasOwnProperty(observer)) {
                  var subscriber = this.observerCollection[observer];
                  if (typeof subscriber.notice === "function") {
                      subscriber.notice(message);
                  }
              }
          }
      },
     
      /**
       * 스케쥴로부터 호출된 리로드 메세지 실행
       * @param message
       */
      reloadObservers: function(message) {
           for (var observer in this.observerCollection) {
               if (this.observerCollection.hasOwnProperty(observer)) {
                   var subscriber = this.observerCollection[observer];
                   if (typeof subscriber.reload === "function") {
                       subscriber.reload(message);
                   }
               }
           }
       }
 };