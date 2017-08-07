
		var MemberTabList = React.createClass({
		
			componentDidMount: function() {
				viewType = 'PERSON';
				selectedTab = 'PERSON_TOTAL';
				loadDttm = new Date().getTime();
				$('.btn_feedmore').hide();

				if(this.props.detailFeedId !==undefined && this.props.detailFeedId != '0') {
					var baseurl = contextpath + _MemberTabList_BASE_FEED + '/' + this.props.detailFeedId;
					var jsondata = {};	
					ajaxGet(baseurl, jsondata, this.feedDetail);
				} else {
					React.render(<FeedBox baseurl={contextpath + _MemberTabList_BASE_FEED} option={this.props.option} memberId={this.props.memberId} groupId={0}/>, document.getElementById('MemberFeedBox'));
				}
				
				uninstall();
			},
			
			componentWillUnmount: function() {
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
			},	

			feedDetail: function(feeddata) {
			
				curMoreDivId = '';
				divIdNum = 0;
				moreFeedId = 0;
				$(window).off('scroll');
				//shareClosePopup();
				
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				snsCommLoadingFeed(feeddata, 'MemberFeedBox');
			},

			totalTab: function() {
				selectedTab = 'PERSON_TOTAL';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				React.render(<FeedBox baseurl={contextpath + _MemberTabList_BASE_FEED} memberId={this.props.memberId} groupId={0}/>, document.getElementById('MemberFeedBox'));
				retouchStyle('#totalTab');
			},

			personalTab: function() {
				selectedTab = 'PERSON';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				React.render(<FeedBox baseurl={contextpath + _MemberTabList_BASE_MEMBER_FEED}  memberId={this.props.memberId} groupId={0}/>, document.getElementById('MemberFeedBox'));
				retouchStyle('#personalTab');
			},

			todoTab: function() {
				selectedTab = 'TODO';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				React.render(<ToDoCalendar type={_MemberTabList_BASE_FOLLOWER_TYPE_MEMBER} followerId={_MemberTabList_BASE_targetMemberId}/>, document.getElementById('MemberFeedBox'));
				retouchStyle('#todoTab');
			},

			fileTab: function() {
				selectedTab = 'FILE';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				React.render(<FileFeedList memberId={this.props.memberId}/>, document.getElementById('MemberFeedBox'));
				retouchStyle('#fileTab');
			},
			
			moreTab: function() {
					
				selectedTab = 'MORE';
				loadDttm = new Date().getTime();
				$('#moreTab').hide();
				
				$('#approvalTab').show('fast', function() {
    				$('#boardTab').show('fast');
  				});
				
			},
			
			approvalTab: function() {
				selectedTab = 'APPROVAL';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				React.render(<FeedBox baseurl={contextpath + _MemberTabList_FEED_TYPE_APPROVAL}  memberId={this.props.memberId} groupId={0}/>, document.getElementById('MemberFeedBox'));
				retouchStyle('#approvalTab');
			},

			boardTab: function() {
				selectedTab = 'BOARD';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				React.render(<FeedBox baseurl={contextpath + _MemberTabList_FEED_TYPE_BOARD}  memberId={this.props.memberId} groupId={0}/>, document.getElementById('MemberFeedBox'));
				retouchStyle('#boardTab');
			},

			render: function() {
			
				return (
						<div>
							<ul className='malgun13'>
	            				<li id='totalTab' 	 onClick={this.totalTab} 	className='tab_on' style={{'color':'#fe630f', 'fontWeight':'bold'}}>{_MemberTabList_MSG_MEMBERTAB1TEXT}</li>
	            				<li id='personalTab' onClick={this.personalTab} className='tab_off'>{_MemberTabList_MSG_MEMBERTAB2TEXT}</li>
	            				<li id='todoTab' 	 onClick={this.todoTab} 	className='tab_off'>{_MemberTabList_MSG_MEMBERTAB3TEXT}</li>
	            				<li id='fileTab' 	 onClick={this.fileTab} 	className='tab_off'>{_MemberTabList_MSG_MEMBERTAB4TEXT}</li>
	            				<li id='approvalTab' onClick={this.approvalTab} className='tab_off'>{_MemberTabList_MSG_MEMBERTAB5TEXT}</li>
	            				<li id='boardTab' 	 onClick={this.boardTab} 	className='tab_off' style={{'display':'none'}}>{_MemberTabList_MSG_MEMBERTAB6TEXT}</li>
	            				<li id='moreTab' 	 onClick={this.moreTab} 	className='tab_off last_tab' style={{'display':'none'}}>더보기</li>
	        				</ul>
	        				
	        				<div id='MemberFeedBox'></div>
	        			</div>
           		);
			}
		});

		var OtherMemberTabList = React.createClass({
		
			componentDidMount: function() {
				selectedTab = 'OTHER_PERSON_TOTAL';
				viewType = 'OTHER_PERSON';
				loadDttm = new Date().getTime();
				React.render(<FeedBox baseurl={contextpath + _MemberTabList_BASE_MEMBER_FEED} memberId={this.props.memberId} groupId={0}/>, document.getElementById('OtherMemberFeedBox'));
			},
			
			componentWillUnmount: function() {
				React.unmountComponentAtNode(document.getElementById('OtherMemberFeedBox'));
			},

			personalTab: function() {
				selectedTab = 'OTHER_PERSON';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('OtherMemberFeedBox'));
				React.render(<FeedBox baseurl={contextpath + _MemberTabList_BASE_MEMBER_FEED} memberId={this.props.memberId} groupId={0}/>, document.getElementById('OtherMemberFeedBox'));
				retouchStyle('#personalTab');
			},

			todoTab: function() {
				selectedTab = 'OTHER_TODO';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('OtherMemberFeedBox'));
				React.render(<ToDoCalendar type={_MemberTabList_BASE_FOLLOWER_TYPE_OTHER_MEMBER} followerId={this.props.memberId}/>, document.getElementById('OtherMemberFeedBox'));
				retouchStyle('#todoTab');
			},

			fileTab: function() {
				selectedTab = 'OTHER_FILE';
				loadDttm = new Date().getTime();
				React.unmountComponentAtNode(document.getElementById('OtherMemberFeedBox'));
				React.render(<FileFeedList memberId={this.props.memberId}/>, document.getElementById('OtherMemberFeedBox'));
				retouchStyle('#fileTab');
			},

			render: function() {
				return (
					<div>
						<ul className='malgun13'>
	            			<li id='personalTab' onClick={this.personalTab} className='tab_on' style={{'color':'#fe630f', 'fontWeight':'bold'}}>{_MemberTabList_MSG_MEMBERTAB2TEXT}</li>
	            			<li id='todoTab' 	 onClick={this.todoTab} 	className='tab_off'>{_MemberTabList_MSG_MEMBERTAB3TEXT}</li>
	            			<li id='fileTab' 	 onClick={this.fileTab} 	className='tab_off last_tab'>{_MemberTabList_MSG_MEMBERTAB4TEXT}</li>
	        			</ul>
        			
        				<div id='OtherMemberFeedBox'></div>
        			</div>
           		);
			}
		});

		function viewMemberTab(type) {
		
			loadDttm = new Date().getTime();
			if(type == 'PERSON') {
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				React.render(<FeedBox baseurl={contextpath + _MemberTabList_BASE_MEMBER_FEED}  memberId={_MemberTabList_session_memberId} groupId={0}/>, document.getElementById('MemberFeedBox'));
			} else if(type == 'OTHER_PERSON') {
				React.unmountComponentAtNode(document.getElementById('OtherMemberFeedBox'));
				React.render(<FeedBox baseurl={contextpath + _MemberTabList_BASE_MEMBER_FEED}  memberId={_MemberTabList_BASE_targetMemberId} groupId={0}/>, document.getElementById('OtherMemberFeedBox'));
			}
			
			selectedTab = type;
			retouchStyle('#personalTab');
		
		}
