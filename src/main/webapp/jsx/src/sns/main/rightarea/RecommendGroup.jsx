function reRenderingRecommendGroupList() {
	
	var unmount = React.unmountComponentAtNode(document.getElementById('RecommendGroup'));
		if(unmount)
			React.render(<RecommendGroup/>, document.getElementById('RecommendGroup'));
}

var RecommendGroupOne = React.createClass({
		getInitialState : function() {
			return {
				  groupId : 0
				, groupName : ''
				, groupImgUrl : ''
				, regMemberName : ''
				, regMemberId : ''
				, regMemberSyncKey:''
				, regDttm : ''
				, memberCnt : 0
				,thisTimer			:null
				,timeoutTime		:800
				,insidePopup		:false
			};
		},

		tooltipPosition: function(element) {
			var pos = $(element).offset();
			var width = $(element).width();
			$('.over_feed_gate').css({
    			left: (pos.left - 120) + 'px',
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
			var baseurl = contextpath + _RecommendGroup_frf2_BASE_FOLLOWER + '/members/'+followerId;
			if(followerType ==='GROUP') {
				baseurl = contextpath + _RecommendGroup_grf2_GROUP + '/'+followerId;
			}
				
			ajaxGetForSync(baseurl, '',  this.tooltipRender);
		},

		componentDidMount : function() {
			var className = 'recommendGroup_'+this.props.groupId;
			var self = this;
			$("#sns-tooltip").mouseenter(function(){
				self.state.insidePopup = true;
			}).mouseleave(function(){
               	self.state.insidePopup = false;
               	$(this).hide();
            });


			$('.'+className).mouseenter(function(event) {
				var tooltip = this;
				var tooltipElm = $(tooltip);
				clearTimeout(self.state.thisTimer);
					self.state.thisTimer = setTimeout(function() {
					var rel = tooltipElm.attr('rel');
					var targetFollowerInfo = self.getFollowerInfo(rel);
					self.tooltipPosition(tooltip);
					$('#sns-tooltip').show();
					clearTimeout(self.state.thisTimer);
    			}, self.state.timeoutTime);

			}).mouseleave(function(event) {
				clearTimeout(self.state.thisTimer);
    			self.state.thisTimer = setTimeout(function(){
        			if(!self.state.insidePopup) {
						$("#sns-tooltip").hide();
						React.unmountComponentAtNode(document.getElementById('sns-tooltip'));
					}
        			clearTimeout(self.state.thisTimer);
    			}, self.state.timeoutTime);
			});

			$(React.findDOMNode(this.refs.gsPicture)).css(
						"background", 'url('+ contextpath + _RecommendGroup_grf2_GROUP_PIC + '?groupId=' + this.props.groupId + ') no-repeat')
							.css("background-size", '40px');

			if(this.props.regMemberId === 0) {
				var className = 'recommendGroup_'+this.props.groupId;
				$(React.findDOMNode(this.refs.regMemberArea)).removeClass(className).removeAttr('rel');
			}

			this.setState (
				{
					  groupId   : this.props.groupId
					, groupName : this.props.groupName
					, groupImgUrl : this.props.groupImgUrl
					, regMemberName : this.props.regMemberName
					, regMemberId : this.props.regMemberId
					, regDttm : this.props.regDttm
					, memberCnt : this.props.memberCnt
				}		
			)
			//Lync Presence setting
			//initLyncStatus();
			//this.getLyncStatus();
		},
		
		openLyncMenuName: function() {
			this.getRegMemberSyncKey();
			openLyncMenu(this.state.regMemberSyncKey, React.findDOMNode(this.refs.ffName),'','-560','-100');
		},
		
		hideLyncMenu: function() {
			hideLyncMenu();
		},
		
				
		getRegMemberSyncKey: function() {
			var baseurl = contextpath + _RecommendGroup_frf2_BASE_FOLLOWER + '/members/'+this.props.regMemberId;
			ajaxGetForSync(baseurl, '',  this.getSyncKey);
		},
		
		getSyncKey: function(data) {
			var regMemberSyncKey = data.followerMappingInfo[0]===undefined?this.props.regMemberId:data.followerMappingInfo[0].syncKey
			this.state.regMemberSyncKey = regMemberSyncKey;
		},
		
		getLyncStatus: function() {

    		if(!nameCtrl) {
        		return;
    		}
   	 		
		},
						
		groupClickTest: function() {
			
			// 오른쪽 메뉴 상단 그룹 팔로워 리스트
			if(contentsType == 'USER') {
				React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				React.render(<MyGroupFollower groupId={this.state.groupId}/>, document.getElementById('RightUpLevel'));
			}
			
			contentsType  = 'GROUP';

			Reloader.reloadObservers({'type':'group', 'groupId':this.state.groupId, 'isGroupChange':'false'});

			// 가운데 컨텐츠 상단 부분(그룹 정보)
			React.unmountComponentAtNode(document.getElementById('head_contents'));
			React.render(<GroupHead groupId={this.state.groupId} />, document.getElementById('head_contents'));


			// 가운데 컨텐츠 상단 부분(그룹 정보)
			React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
			React.render(<FeedApp groupInfo={this.state}/>, document.getElementById('mainContentsArea'));


			// 중하단 탭 리스트 및 피드
			React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			React.render(<GroupTabList groupId={this.state.groupId} />,  document.getElementById('selectTabBySession'));
			
			var groupId = 'myGroup_' + this.state.groupId;
			$('#'+groupId).addClass('group-select');
			$('#'+groupId+ ' > span.data-txt').addClass('group-select-text');
			openMainBody();
		},
		
		
		render : function() {
			//var regdate = convertTimestamp(this.state.regDttm);
			
			var d = new Date(this.state.regDttm);

		    var regdate =
		    	leadingZeros(d.getFullYear(), 4) + '-' +
		    	leadingZeros(d.getMonth() + 1, 2) + '-' +
		    	leadingZeros(d.getDate(), 2);
			
			var className = 'recommendGroup_'+this.props.groupId;
			var picClass = 'pic_group_small '+className;
			var groupRel = 'GROUP;'+this.props.groupId;
			var memberRel = 'MEMBER;'+this.props.regMemberId; 

			return (
				<dl className='recommand_group'>
                    <dt className={picClass} ref='gsPicture' style={{'cursor':'pointer'}} rel={groupRel}></dt>
                    <dd className="feed_name line_space" style={{'fontSize':'12px'}} onClick={this.groupClickTest}><span className={className} rel={groupRel}>{this.state.groupName}</span></dd>
                    <dd className="line_space" style={{'fontSize':'12px', 'color':'#333'}}><span ref='ffName' onMouseOver={this.openLyncMenuName} onMouseOut={this.hideLyncMenu}>{this.state.regMemberName}&nbsp;</span></dd>
                    <dd className="per_email line_space" style={{'color':'#999999','marginLeft':'54px'}}>{regdate}<span style={{'marginLeft':'17px'}}>Member <strong className="txt_point" style={{'color':'#333', 'cursor':'pointer'}}>{this.state.memberCnt}</strong></span></dd>
                </dl>		
			);
		}
	});
	
	var RecommendGroupList = React.createClass({
	
		notify: function(data) {
			this.setState({});
		},
        
        reload: function(data) {
			this.setState({});
		},
		
        componentWillUnmount: function() {
     		Observer.unregisterObserver(this);
     		Reloader.unregisterReloader(this);
 		},
        
		componentDidMount: function() {
			Observer.registerObserver(this);
			Reloader.registerReloader(this);
		},
	
		render : function() {
			var recommendGroupNodes = this.props.data.map(function (group, index) {
				return (
					<RecommendGroupOne key={index} groupId={group.groupId} groupName={group.groupName} groupImgUrl={group.groupImgUrl} regMemberName={group.regMemberName}
					regMemberId={group.regMemberId} regDttm={group.regDttm} memberCnt={group.memberCnt} />
				);
			});
			return (
					<div className="group_person">
						{recommendGroupNodes}
					</div>
			);
		}
	});
	
	var RecommendGroup  = React.createClass({
	
		loadRecommendGroupsFromServer : function() {
			ajaxGet(contextpath + _RecommendGroup_grf2_GROUP_WIDGET_LIST2 , {"cType" : "recommend"}, function(data){
				this.setState({data : data});
			}.bind(this));
		},
		
		getInitialState : function () {
			return {data : []};
        },
        
        componentDidMount: function() {
			// back-end에서 개인 설정 데이터 취득후 결과 값 세팅
			this.loadRecommendGroupsFromServer();
		},
		
		render: function() {
	    	return (
					<div>
                        <dl className="rightarea_gate" style={{'marginTop':'0', 'marginBottom':'0'}} >
                            <dt className="malgun13">{_RecommendGroup_MSG_RECOMMENDGROUPTITLE}</dt>
                            <dd className="icon_plus"><img src="../images/btn_more.gif" width="18" height="4" style={{"display":"none"}} /></dd>
                        </dl>
                        <RecommendGroupList data= {this.state.data} />
                    </div>
			);
		}
	});