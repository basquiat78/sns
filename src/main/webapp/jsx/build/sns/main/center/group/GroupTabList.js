
		var GroupTabList = React.createClass({displayName: "GroupTabList",
		
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
				React.render(React.createElement(FeedBox, {baseurl: contextpath + _GroupTabList_BASE_GROUP_FEED, groupId: this.props.groupId, groupInfo: this.props.groupInfo, memberId: 0}), document.getElementById('GroupFeedBox'));
				retouchStyle('#totalTab');
			},
			
			knwldgTab: function() {
				selectedTab = 'GROUP_KNWLDG';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
				React.render(React.createElement(FeedBox, {baseurl: contextpath + _GroupTabList_BASE_KNWLDG_URL, groupId: this.props.groupId, memberId: 0}), document.getElementById('GroupFeedBox'));
				retouchStyle('#knwldgTab');
			},
			
			todoTab: function() {
				selectedTab = 'GROUP_TODO';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
				React.render(React.createElement(ToDoCalendar, {type: _GroupTabList_BASE_FOLLOWER_TYPE_GROUP, followerId: this.props.groupId}), document.getElementById('GroupFeedBox'));
				retouchStyle('#todoTab');
			},

			fileTab: function() {
				selectedTab = 'GROUP_FILE';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
				React.render(React.createElement(FileFeedList, {callType: 'GROUP', groupId: this.props.groupId}), document.getElementById('GroupFeedBox'));
				retouchStyle('#fileTab');
			},

			render: function() {
				
				return (
					React.createElement("div", null, 
						React.createElement("ul", {className: "malgun13"}, 
	            			React.createElement("li", {id: "totalTab", 	 onClick: this.totalTab, 	className: "tab_on", style: {'color':'#fe630f', 'fontWeight':'bold'}}, _GroupTabList_MSG_GROUPTAB1TEXT), 
	            			React.createElement("li", {id: "knwldgTab", 	 onClick: this.knwldgTab, 	className: "tab_off"}, _GroupTabList_MSG_GROUPTAB2TEXT), 
	            			React.createElement("li", {id: "todoTab", 	 onClick: this.todoTab, 	className: "tab_off"}, _GroupTabList_MSG_GROUPTAB3TEXT), 
	            			React.createElement("li", {id: "fileTab", 	 onClick: this.fileTab, 	className: "tab_off last_tab"}, _GroupTabList_MSG_GROUPTAB4TEXT)
	        			), 
        			
        				React.createElement("div", {id: "GroupFeedBox"})
        			)
           		);
			}
		});
		
		function viewGroupTab(groupInfo) {
			selectedTab = 'GROUP_TOTAL';
			loadDttm = new Date().getTime();
			React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
			React.render(React.createElement(FeedBox, {baseurl: contextpath + _GroupTabList_BASE_GROUP_FEED, groupId: groupInfo.groupId, groupInfo: groupInfo, memberId: 0}), document.getElementById('GroupFeedBox'));
			retouchStyle('#totalTab');
		}
