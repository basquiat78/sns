var Observer = {
     
     observerCollection: [],
     
     registerObserver: function(observer) {
         var index = this.observerCollection.indexOf(observer);
         if (index == -1) {
             this.observerCollection.push(observer);
         }
     },
     
     unregisterObserver: function(observer) {
         _.remove(this.observerCollection, function(e) {
             return observer === e;
         });
     },
     
     notifyObservers: function(data) {
     	//console.log(data);
         for (var observer in this.observerCollection) {
             if (this.observerCollection.hasOwnProperty(observer)) {
                 var subscriber = this.observerCollection[observer];
                 if (typeof subscriber.notify === "function") {
                     subscriber.notify(data);
                 } else {
                     console.warn("An observer was found without a notify function");
                 }
             }
         }
     },
     
 };

var Reloader = {
	     
		 reloaderCollection: [],
	     
	     registerReloader: function(reloader) {
	         var index = this.reloaderCollection.indexOf(reloader);
	         if (index == -1) {
	             this.reloaderCollection.push(reloader);
	         }
	     },
	     
	     unregisterReloader: function(reloader) {
	         _.remove(this.reloaderCollection, function(e) {
	             return reloader === e;
	         });
	     },
	     
	     reloadObservers: function(data) {
	         for (var reloader in this.reloaderCollection) {
	             if (this.reloaderCollection.hasOwnProperty(reloader)) {
	                 var subscriber = this.reloaderCollection[reloader];
	                 if (typeof subscriber.reload === "function") {
	                     subscriber.reload(data);
	                 } else {
	                     console.warn("An observer was found without a reload function");
	                 }
	             }
	         }
	     },
	     
	 };