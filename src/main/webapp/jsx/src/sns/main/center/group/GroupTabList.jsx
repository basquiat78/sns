
		var GroupTabList = React.createClass({
		
			componentDidMount: function() {
				viewType = 'GROUP';
				$('.btn_feedmore').hide();
				this.totalTab();
				
				uninstall();
			},

			componentWillUnmount: function() {
				//$(window).off('scroll');
				React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
			},
	
			totalTab: function() {
				selectedTab = 'GROUP_TOTAL';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
				React.render(<FeedBox baseurl={contextpath + _GroupTabList_BASE_GROUP_FEED} groupId={this.props.groupId} groupInfo={this.props.groupInfo} memberId={0}/>, document.getElementById('GroupFeedBox'));
				retouchStyle('#totalTab');
			},
			
			knwldgTab: function() {
				selectedTab = 'GROUP_KNWLDG';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
				React.render(<FeedBox baseurl={contextpath + _GroupTabList_BASE_KNWLDG_URL} groupId={this.props.groupId} memberId={0}/>, document.getElementById('GroupFeedBox'));
				retouchStyle('#knwldgTab');
			},
			
			todoTab: function() {
				selectedTab = 'GROUP_TODO';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
				React.render(<ToDoCalendar type={_GroupTabList_BASE_FOLLOWER_TYPE_GROUP} followerId={this.props.groupId}/>, document.getElementById('GroupFeedBox'));
				retouchStyle('#todoTab');
			},

			fileTab: function() {
				selectedTab = 'GROUP_FILE';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
				React.render(<FileFeedList callType={'GROUP'} groupId={this.props.groupId}/>, document.getElementById('GroupFeedBox'));
				retouchStyle('#fileTab');
			},

			render: function() {
				
				return (
					<div>
						<ul className='malgun13'>
	            			<li id='totalTab' 	 onClick={this.totalTab} 	className='tab_on' style={{'color':'#fe630f', 'fontWeight':'bold'}}>{_GroupTabList_MSG_GROUPTAB1TEXT}</li>
	            			<li id='knwldgTab' 	 onClick={this.knwldgTab} 	className='tab_off'>{_GroupTabList_MSG_GROUPTAB2TEXT}</li>
	            			<li id='todoTab' 	 onClick={this.todoTab} 	className='tab_off'>{_GroupTabList_MSG_GROUPTAB3TEXT}</li>
	            			<li id='fileTab' 	 onClick={this.fileTab} 	className='tab_off last_tab'>{_GroupTabList_MSG_GROUPTAB4TEXT}</li>
	        			</ul>
        			
        				<div id='GroupFeedBox'></div>
        			</div>
           		);
			}
		});
		
		function viewGroupTab(groupInfo) {
			selectedTab = 'GROUP_TOTAL';
			loadDttm = new Date().getTime();
			React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
			React.render(<FeedBox baseurl={contextpath + _GroupTabList_BASE_GROUP_FEED} groupId={groupInfo.groupId} groupInfo={groupInfo} memberId={0}/>, document.getElementById('GroupFeedBox'));
			retouchStyle('#totalTab');
		}
