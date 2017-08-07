var GroupFollower = React.createClass({

		getInitialState : function() {
			return {
				thisTimer			:null
				,timeoutTime		:800
				,insidePopup		:false
			};
		},

		getMemberInfo: function(){
			contentsType = 'USER';
			React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
			React.render(<MsAddress/>, document.getElementById('RightUpLevel'));
		
			// 가운데 컨텐츠 상단 부분
			React.unmountComponentAtNode(document.getElementById('head_contents'));
			React.render(<MemberHead memberId={this.props.data.memberId}/>, document.getElementById('head_contents'));

			// 피드 입력창
			React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
			
			if(_GroupFollower_session_memberId == this.props.data.memberId){
				React.render(<FeedApp/>, document.getElementById('mainContentsArea'));
			} else {
				React.render(<FeedApp targetId={this.props.data.memberId} targetName={this.props.data.memberName}/>, document.getElementById('mainContentsArea'));
			}

			// 중하단 탭 리스트 및 피드
			React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			if(_GroupFollower_session_memberId == this.props.data.memberId){
				React.render(<MemberTabList memberId={this.props.data.memberId}/>,  document.getElementById('selectTabBySession'));
			}else{
				React.render(<OtherMemberTabList memberId={this.props.data.memberId}/>,  document.getElementById('selectTabBySession'));
			}
			openMainBody();
			Reloader.reloadObservers('reload');
		},

		getLyncStatus: function() {
			var memeberSyncKey = this.props.data.memberList[0].syncKey;
			var presenceAreaClass = 'presenceArea_'+ memeberSyncKey +'_hanwha_com';
			var userName = memeberSyncKey + "@hanwha.com";
			var userElementId = getId(userName);
			var presenceId = 'presence-'+userElementId;
			
			React.render(<Presence presenceId={presenceId}/>,  document.getElementById(presenceAreaClass));
    		if(!nameCtrl) {
        		return;
    		}
    		
    		try {
    			nameCtrl.GetStatus(userName, presenceId);
   	 			nameCtrl.OnStatusChange = onLyncPresenceStatusChange;
   	 		} catch(e){}
   	 		
		},

		openLyncMenuImg: function() {
			openLyncMenu(this.props.data.memberList[0].syncKey, React.findDOMNode(this.refs.ffImg),'','-560','-100');
		},
		
		openLyncMenuName: function() {
			openLyncMenu(this.props.data.memberList[0].syncKey, React.findDOMNode(this.refs.ffName),'','-560','-100');
		},
		
		hideLyncMenu: function() {
			hideLyncMenu();
		},

		componentDidMount : function() {
			
			var className = 'myGroup_'+this.props.data.memberId;
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

			var dragUserId = 'dragUser_'+this.props.data.memberId;
			$('#'+dragUserId).draggable({
				helper		: function() {
    							var clone = $(this).clone();
    							$(clone).removeAttr('data-reactid');
    							/*
    							$(clone).children('input').removeAttr('data-reactid');
    							$(clone).children('.presence-img').removeAttr('data-reactid');
    							$(clone).children('.presence-img').children('img').removeAttr('data-reactid');
    							$(clone).children('.presenceArea').removeAttr('data-reactid');
    							$(clone).children('.presenceArea').children('.presence-status').removeAttr('data-reactid');
    							*/
    							$(clone).find('*').removeAttr('data-reactid');
    							
    							return clone;
							},
				containment : 'document',
				drag		: function(event, ui){
								$('.showApp').show();
							 }
			});

       		$('#'+dragUserId).bind("dragstop", function(event, ui) {
				$('.notice_target').removeClass('drag-hover');
       		});
       		
			$('#'+dragUserId).bind("drag", function(event, ui) {
       			$('.notice_target').addClass('drag-hover');
        	});

			$(React.findDOMNode(this.refs.followerPic)).css("float","left").css("background-size", 'cover');
			
			//Lync Presence setting
			//initLyncStatus();
			//this.getLyncStatus();
			
		},

		render: function(){
			//var tooltipClass = 'myGroup_'+this.props.data.memberId;
			//var picClass = 'drag-box';
			var picClass = '';
			var memberRel = 'MEMBER;'+this.props.data.memberId;
			var dragUserId = 'dragUser_'+this.props.data.memberId;
			var hiddenValue = this.props.data.memberId+';'+this.props.data.memberName;
			var mapping = this.props.data.tenantMappingList[0]===undefined?[]:this.props.data.tenantMappingList[0];
			var partName = mapping.partName===undefined?' ':mapping.partName;
			if(partName.length >9) partName = partName.substring(0,8)+'...';
			var positionName = mapping.positionName===undefined?'':mapping.positionName;
			var memeberSyncKey = this.props.data.memberList[0].syncKey;
			var presenceAreaClass = 'presenceArea presenceArea_'+ memeberSyncKey +'_hanwha_com';
			var presenceAreaId = 'presenceArea_'+ memeberSyncKey +'_hanwha_com';
			var member_pic_url = contextpath + _GroupFollower_mrfGroupFollower_MEMBER_PIC + '?memberId=' + this.props.data.memberId;
			var imgStyle = {'marginRight':'10px', 'borderRadius':'50%', 'width':'40px', 'height':'40px'};
			return (
				<dl className="mb_space drag-box" id={dragUserId} rel={memberRel} style={{'cursor':'pointer'}} onClick={this.getMemberInfo} >
                    <input type='hidden' value={hiddenValue}/>
                    <dt className={picClass} ref='followerPic'><span className='presence-img'><img src={member_pic_url} ref='ffImg' onMouseOver={this.openLyncMenuImg} onMouseOut={this.hideLyncMenu} style={imgStyle}></img></span><span className={presenceAreaClass} style={{'marginLeft':'-20px'}} id={presenceAreaId}></span></dt>
                    <dd className="feed_name"><span ref='ffName' onMouseOver={this.openLyncMenuName} onMouseOut={this.hideLyncMenu} >{this.props.data.memberName} {positionName}</span><span className="feed_name2">{partName}</span></dd>
                    <dd className="per_email">&nbsp;</dd>
                </dl>
			);
		}
	});


	//SideNav 나의그룹
	var MyGroupFollower = React.createClass({
		getInitialState : function () {
	        return { groupFollowerNode : ''};
        },

		notify: function(data) {
			this.ajaxCallByComponent();
		},
        
        reload: function(reloadData) {
        	this.ajaxCallByReload(reloadData);
        },
        
        ajaxCallByReload: function(reloadData) {
			var baseurl  = contextpath + _GroupFollower_grfGroupFollower_BASE_GFOLLOWER_URL + '/' + reloadData.groupId;
			var jsondata = {};	
			ajaxGet(baseurl, jsondata, this.getMyGroupFollowerListResult);        
        },
        
        componentWillUnmount: function() {
     		Observer.unregisterObserver(this);
     		Reloader.unregisterReloader(this);
 		},
		
 		ajaxCallByComponent: function() {
			var baseurl  = contextpath + _GroupFollower_grfGroupFollower_BASE_GFOLLOWER_URL + '/' + this.props.groupId
			var jsondata = {};	
			ajaxGet(baseurl, jsondata, this.getMyGroupFollowerListResult);
        },
        
		componentDidMount: function() {
			
			Observer.registerObserver(this);
			Reloader.registerReloader(this);
						
			this.ajaxCallByComponent();		

		},
		
		getMyGroupFollowerListResult : function(data){
			var groupFollowerNode = data.map(
				function (ctl, index) {
					return (
						<GroupFollower key={index} data = {ctl}/>
					);
				}
			);

			this.setState({groupFollowerNode : groupFollowerNode});
		},

		getMyGroupFollowerList : function(){
			
		},

		render: function() {
	    	return (
	    		<div>
		            <dl className="rightarea_gate" >
	                    <dt className="malgun13">{_GroupFollower_MSG_GROUPMEMBERTEXT}</dt>
	                    <dd className="icon_plus"></dd>
	                </dl>
	                <div className="group_person">
						<div className='scroll_area'>
	                		{this.state.groupFollowerNode}
						</div>
	                </div> 
	        	</div>
			);
		}
	});