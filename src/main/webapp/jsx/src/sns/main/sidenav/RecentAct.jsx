var MyHappyTime = React.createClass({
	componentDidMount: function () {
		//jQuery("abbr.timeago").timeago();
	},
	render: function() {
		var timeago = this.props.x;
		var titleTimeAgo = this.props.y;
		return (
			<span className='data-date'>
				<abbr className='timeago' title={timeago}>{titleTimeAgo}</abbr>
			</span>
		);
	}
});

	//SideNav 최근활동
	var RecentAct  = React.createClass({

		getInitialState : function() {
			return {
				thisTimer			:null
				,timeoutTime		:500
				,insidePopup		:false
			};
		},

		tooltipPosition: function(element) {
			var pos = $(element).offset();
			var width = $(element).width();
			$('.over_feed_gate').css({
    			left: pos.left + 'px',
    			top: pos.top - 160 + 'px'
			});
		},

		tooltipRender: function(data) {
			React.render(<FollowerTooltip followerInfo={data} itemId={this.state.feedId}/>, document.getElementById('sns-tooltip'));
		},

		getFollowerInfo: function(info) {
			var infoArray = info.split(';');
			var followerType = infoArray[0];
			var followerId = infoArray[1];
			var baseurl = contextpath + _RecentAct_BASE_FOLLOWER + '/members/'+followerId;
			if(followerType ==='GROUP') {
				baseurl = contextpath + _RecentAct_BASE_FOLLOWER + '/groups/'+followerId;
			}
				
			ajaxGetForSync(baseurl, '',  this.tooltipRender);
		},
		componentDidMount: function () {

			var className = 'recentAct_'+this.props.noticeVo.itemId;
			var self = this;
			$("#sns-tooltip").mouseenter(function(){
				self.state.insidePopup = true;
			}).mouseleave(function(){
               	self.state.insidePopup = false;
               	$(this).hide();
            });


			$('.'+className).mouseenter(function(event) {
				var rel = $(this).attr('rel');
				var targetFollowerInfo = self.getFollowerInfo(rel);
				self.tooltipPosition(this);
				$('#sns-tooltip').show();
				clearTimeout(self.state.thisTimer);

			}).mouseleave(function(event) {
				clearTimeout(self.state.thisTimer);
    			self.state.thisTimer = setTimeout(function(){
        			if(!self.state.insidePopup) $("#sns-tooltip").hide();
        			clearTimeout(self.state.thisTimer);
    			}, self.state.timeoutTime);
			});

			//jQuery("abbr.timeago").timeago();

		},

		onClickOneAct : function() {
		
			$('ul.malgun13 li').removeClass('tab_on').addClass('tab_off').css({'color':'#7a7a7a','font-weight':'normal'});;
			$('ul.malgun13 li:first').removeClass('tab_off').addClass('tab_on').css({'color':'#fe630f','font-weight':'bold'});
		 	
		 	if(viewType != 'PERSON') {
				getMemberInfo(_RecentAct_SESSION_MEMBERID, _RecentAct_SESSION_MEMBERNAME, 'fromRecentAct');
			}
			
			selectedTab = 'RECENT_ACT';
			onClickFrom = 'RECENT_ACT';
			var feedType = this.props.noticeVo.itemType;
			var feedId = this.props.noticeVo.itemId;
			if (feedType == 'FEED') {
				contentsType = 'USER';
				selectedTab = 'RECENT_FEED_ACT';	
				//getFeedDetailResult 함수를 호출한다.
				var baseurl = contextpath + _RecentAct_BASE_FEED + '/' + feedId;
				ajaxGet(baseurl, {}, getFeedDetailResult);
				
				$(window).off('scroll');
				
			} else {
				contentsType = 'GROUP';
				//getGroupDetailResult 함수를 호출한다.
				var baseurl = contextpath + _RecentAct_BASE_GROUP + '/' + feedId;
				ajaxGet(baseurl, {}, getGroupDetailResult);
			}
			openMainBody();
			
		},

		render: function() {
			var timeago = new Date(this.props.noticeVo.regDttm).toISOString();
			var titleTimeAgo = new Date(this.props.noticeVo.regDttm).toLocaleString();
			var className = 'data-name ' + 'recentAct_'+this.props.noticeVo.itemId;
			var memberRel = 'MEMBER;'+ this.props.noticeVo.fromMemberId;
			
			var langset = _RecentAct_LOCALE_LANGUAGE;
			var ls = '';
    		switch (langset) {
    		case 'ko' : ls = this.props.noticeVo.noticeContentKo; break;
    		case 'en' : ls = this.props.noticeVo.noticeContentEn; break;
    		case 'zh' : ls = this.props.noticeVo.noticeContentZh; break;
    		default : ls = this.props.noticeVo.noticeContentKo;
    		}
    		
    		ls = ls == undefined ? this.props.noticeVo.noticeContent : ls;

	    	return (
					<li className='webpart-item li-select-hover' style={{'cursor':'pointer'}} onClick={this.onClickOneAct}>
						<span className='item-anchor'>
						{ls}
						</span>
						<MyHappyTime x={timeago} y={titleTimeAgo} />
					</li>
			);
		}
	});


	var RecentActList  = React.createClass({
	
		getInitialState : function () {
	        return { recentActList:[], g : ''};
        },
        
        resultRecActList: function(data){
        	if(this.isMounted()) {
        		this.setState({recentActList:data});
            	//jQuery("abbr.timeago").timeago();
        	}
        	
        },
        
        ajaxCallByComponent: function() {
        	var baseurl = '';
        	if(this.props.currGroupId !== undefined) {
        		baseurl = this.props.baseurl + '/' + this.props.currGroupId;
        	} else {
        		baseurl = this.props.baseurl + '/' + _RecentAct_SESSION_MEMBERID;
        	}	
        	var jsondata = {};
        	ajaxGet(baseurl, jsondata, this.resultRecActList);
        },
        
        ajaxCallByReload: function(reloadData) {
        	var baseurl = contextpath + _SideNav_MEMBER_WIDGET_ACTIVITY + '/' + _RecentAct_SESSION_MEMBERID;
        	if(reloadData.groupId !== undefined) {
        		this.setState({g : reloadData.groupId});
        		baseurl = contextpath + _SideNav_GROUP_WIDGET_ACTIVITY + '/' + reloadData.groupId;
        	} else
        		this.setState({g : ''});
        	var jsondata = {};
        	ajaxGet(baseurl, jsondata, this.resultRecActList);
        },
        
		notify: function(data) {
			this.ajaxCallByComponent();
		},
        
        reload: function(reloadData) {
        	this.ajaxCallByReload(reloadData);
        },
        
        componentWillUnmount: function() {
     		Observer.unregisterObserver(this);
     		Reloader.unregisterReloader(this);
     		this.setState({g : ''});
 		},
 
		componentDidMount: function () {
			Observer.registerObserver(this);
			Reloader.registerReloader(this);
        	this.ajaxCallByComponent();
        	
        	var noticeCnt = 0;
        	ajaxGet(onOpenSocialAlarmUrl , {}, function(data){
				noticeCnt = data.length;
				if (noticeCnt > 5) {
	        		$("#rcntMoreBtn").show();
	        	}
			});
        	
		},
		
		getTotalNotiList: function(ev) {
			ev.preventDefault();
   			ev.stopPropagation();
   			v = this.state.g;
     		goTotalNotiList('', {g : v});
 		},
 		
 		componentDidUpdate: function(prevProps, prevState){
 			
 			for(var i in this.state.recentActList) {
 				
 				var now = new Date(this.state.recentActList[i].regDttm);
 				$('#recentAct').find('abbr.timeago:eq('+ i +')').text($.timeago(now));
 				
 				//$('#recentAct').find('abbr.timeago:eq('+ i +')').livequery(function () { $(this).timeago(); });
 			}
 			
 			//jQuery("abbr.timeago").timeago();
 		},
		
		render: function() {
			var rctact = this.state.recentActList.map(
        		function(noticeVo, index){
					var key = 'rctact'+index;
        			return ( <RecentAct key={key} noticeVo={noticeVo} /> );
        		}
        	);
	        	
			if(this.state.recentActList.length > 0){
	        	return (
					<div className='webpart'> 
						<div className='webpart-header'>
							<p className='webpart-left'><span className='webpart-title'>{_RecentAct_BASIC_RECENTACTIVITY}</span>
							</p>
							<p className="webpart-right" id="rcntMoreBtn" onClick={this.getTotalNotiList}>
                                <a className="ico-anchor" href="#"><span className="ico-img ico-more">더보기</span></a>
                            </p>
						</div>
						
						<div className='webpart-body'>
							<ul className='webpart-content-list-multiline'>
								{rctact}
							</ul>
						</div>
					</div>
				);
				
        	} else {
        		return (
					<div className='webpart'>
						<div className='webpart-header'>
							<p className='webpart-left'><span className='webpart-title'>{_RecentAct_BASIC_RECENTACTIVITY}</span></p>
						</div>
						
						<div className='webpart-body'>
							<ul className='webpart-content-list-multiline'>
								<li className='webpart-item'>
									<span className='item-anchor'>{_RecentAct_BASIC_RECENTACTIVITY_NOT}</span>
									<span className='data-date'></span>
								</li>
							</ul>
						</div>
					</div>
				);
        	}
			
			
		}
	});

