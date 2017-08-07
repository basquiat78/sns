		var FeedNotice = React.createClass({
			render: function() {
	        	return (
					<div className='feed_notice'>
                       	<span>{_FEED_FeedNotice_MSG_TITLE}</span>
                       	<dl>
                       	    <dt className='pic_small'>pic</dt>
                       	    <dd style={{'color':'#386cbb', 'fontWeight':'600', 'fontSize':'14px'}}>8월 20일 공지</dd>
                       		<dd style={{'color':'#999', 'fontSize':'12px', 'marginTop':'3px'}}>김한화님이 1시간 전에 게시함</dd>
                    	</dl>
                	</div>
	           	);
			}
		});