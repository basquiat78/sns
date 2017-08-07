		var FeedNotice = React.createClass({displayName: "FeedNotice",
			render: function() {
	        	return (
					React.createElement("div", {className: "feed_notice"}, 
                       	React.createElement("span", null, _FEED_FeedNotice_MSG_TITLE), 
                       	React.createElement("dl", null, 
                       	    React.createElement("dt", {className: "pic_small"}, "pic"), 
                       	    React.createElement("dd", {style: {'color':'#386cbb', 'fontWeight':'600', 'fontSize':'14px'}}, "8월 20일 공지"), 
                       		React.createElement("dd", {style: {'color':'#999', 'fontSize':'12px', 'marginTop':'3px'}}, "김한화님이 1시간 전에 게시함")
                    	)
                	)
	           	);
			}
		});