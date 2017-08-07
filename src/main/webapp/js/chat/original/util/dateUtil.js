	var ChatDateUtil = function() {
	
			this.WEEK = null;
			
	}
	
	ChatDateUtil.prototype =  {
			
			init: function() {
				var me = this;
				me.WEEK = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
			},
			
			getYear: function(date) {
				return date.getFullYear();
			},
	
			getMonth: function(date) {
				return date.getMonth() + 1;
			},
			
			getDay: function(date) {
				return date.getDate();
			},
			
			getDayName: function(date) {
				var me = this
				return me.WEEK[date.getDay()];
			},
			
			/**
			 * 2017-03-03 or 2017-12-21
			 * @param date
			 * @returns {String}
			 */
			getYearToDayString: function(date) {
				var me = this;
				var timeLocaleString = date.toLocaleString();
				var time = me.timeSplit(timeLocaleString);
				return me.getYear(date) + "년 " + me.getMonth(date) + "월 " + me.getDay(date)  + "일";
			},
			
			/**
			 * 2017-03-03 or 2017-12-21
			 * @param date
			 * @returns {String}
			 */
			getYearToDayStringWithHyphen: function(date) {
				var me = this;
				var month  = me.getMonth(date);
				
				var day = me.getDay(date);
				if(month < 10 ) {
					month = "0" + month;
				}
				
				if(day < 10) {
					day = "0" + day;
				}
				
				return me.getYear(date) + "-" + month + "-" + day;
			},
			
			getYearToDayNameString: function(date) {
				var me = this;
				return me.getYearToDayString(date) + " " + me.getDayName(date);
			},
			
			getFullDateToString: function(date) {
				var me = this;
				var timeLocaleString = date.toLocaleString();
				var time = me.timeSplit(timeLocaleString);
				return me.getYearToDayNameString(date) + " " + time;
			},
			
			timeSplit: function(timeLocaleString) {
				var firstSplit = timeLocaleString.lastIndexOf('.')+1;
				var lastSplit = timeLocaleString.lastIndexOf(':');
				return timeLocaleString.substring(firstSplit, lastSplit).trim();
			}
			
	}
	
	ChatDateUtil.prototype.constructor = ChatDateUtil;