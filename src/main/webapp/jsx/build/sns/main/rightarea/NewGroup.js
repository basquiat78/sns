function reRenderingNewGroupList() {
		var unmount = React.unmountComponentAtNode(document.getElementById('NewGroup'));
		if(unmount)
			React.render(React.createElement(NewGroup, null), document.getElementById('NewGroup'));
	}
	//신규 그룹
	var NewGroupOne = React.createClass({displayName: "NewGroupOne",
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
			React.render(React.createElement(FollowerTooltip, {followerInfo: data, itemId: this.state.feedId}), document.getElementById('sns-tooltip'));
		},

		getFollowerInfo: function(info) {
			var infoArray = info.split(';');
			var followerType = infoArray[0];
			var followerId = infoArray[1];
			var baseurl = contextpath + _NewGroup_frfNewGroup_BASE_FOLLOWER + '/members/'+followerId;
			if(followerType ==='GROUP') {
				baseurl = contextpath + _NewGroup_grfNewGroup_GROUP + '/'+followerId;
			}
				
			ajaxGetForSync(baseurl, '',  this.tooltipRender);
		},

		componentDidMount : function() {
			var className = 'newGroup_'+this.props.groupId;
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
						"background", 'url('+ contextpath + _NewGroup_grfNewGroup_GROUP_PIC + '?groupId=' + this.props.groupId + ') no-repeat')
							.css("background-size", '40px');

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
		
		getRegMemberSyncKey: function() {
			var baseurl = contextpath + _NewGroup_frfNewGroup_BASE_FOLLOWER + '/members/'+this.props.regMemberId;
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
		
		openLyncMenuName: function() {
			this.getRegMemberSyncKey();
			openLyncMenu(this.state.regMemberSyncKey, React.findDOMNode(this.refs.ffName),'','-560','-100');
		},
		
		hideLyncMenu: function() {
			hideLyncMenu();
		},
		
		groupClickTest: function() {

			// 오른쪽 메뉴 상단 그룹 팔로워 리스트
			if(contentsType == 'USER') {
				React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				React.render(React.createElement(MyGroupFollower, {groupId: this.state.groupId}), document.getElementById('RightUpLevel'));
			}
			
			contentsType  = 'GROUP';

			Reloader.reloadObservers({'type':'group', 'groupId':this.state.groupId, 'isGroupChange':'false'});

			// 가운데 컨텐츠 상단 부분(그룹 정보)
			React.unmountComponentAtNode(document.getElementById('head_contents'));
			React.render(React.createElement(GroupHead, {groupId: this.state.groupId}), document.getElementById('head_contents'));


			// 가운데 컨텐츠 상단 부분(그룹 정보)
			React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
			React.render(React.createElement(FeedApp, {groupInfo: this.state}), document.getElementById('mainContentsArea'));


			// 중하단 탭 리스트 및 피드
			React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			React.render(React.createElement(GroupTabList, {groupId: this.state.groupId}),  document.getElementById('selectTabBySession'));
			
			openMainBody();
		},
		
		render : function() {
			//var regDttm = convertTimestamp(this.state.regDttm);
			
			var d = new Date(this.state.regDttm);

		    var regdate =
		    	leadingZeros(d.getFullYear(), 4) + '-' +
		    	leadingZeros(d.getMonth() + 1, 2) + '-' +
		    	leadingZeros(d.getDate(), 2);
			
			var className = 'newGroup_'+this.props.groupId;
			var picClass = 'pic_group_small '+className;
			var groupRel = 'GROUP;'+this.props.groupId;
			var memberRel = 'MEMBER;'+this.props.regMemberId; 

			return (
				React.createElement("dl", {className: "new_group"}, 
                    React.createElement("dt", {className: picClass, ref: "gsPicture", style: {'cursor':'pointer'}, rel: groupRel}), 
                    React.createElement("dd", {className: "feed_name line_space", style: {'fontSize':'12px'}, onClick: this.groupClickTest}, React.createElement("span", {className: className, rel: groupRel}, this.state.groupName)), 
                    React.createElement("dd", {className: "line_space", style: {'fontSize':'12px', 'color':'#333'}}, React.createElement("span", {ref: "ffName", onMouseOver: this.openLyncMenuName, onMouseOut: this.hideLyncMenu}, this.state.regMemberName)), 
                    React.createElement("dd", {className: "per_email line_space", style: {'color':'#999999'}}, regdate, React.createElement("span", {style: {'marginLeft':'17px'}}, "Member ", React.createElement("strong", {className: "txt_point", style: {'color':'#333', 'cursor':'pointer'}}, this.state.memberCnt)))
                )
			);
		}
	});
	
	var NewGroupList = React.createClass({displayName: "NewGroupList",
	
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
			var newGroupNodes = this.props.data.map(function (group, index) {
				return (
					React.createElement(NewGroupOne, {key: index, groupId: group.groupId, groupName: group.groupName, groupImgUrl: group.groupImgUrl, regMemberName: group.regMemberName, 
					regMemberId: group.regMemberId, regDttm: group.regDttm, memberCnt: group.memberCnt})
				);
			});
			return (
					React.createElement("div", {className: "group_person"}, 
						newGroupNodes
					)
			);
		}
	});
	
	var NewGroup  = React.createClass({displayName: "NewGroup",
	
		loadNewGroupsFromServer : function() {
			ajaxGet(contextpath + _NewGroup_grfNewGroup_GROUP_WIDGET_LIST2 , {"cType" : "fresh"}, function(data){
				this.setState({data : data});
			}.bind(this));
		},
		
		getInitialState : function () {
			return {data : []};
        },
        
        componentDidMount: function() {
			// back-end에서 개인 설정 데이터 취득후 결과 값 세팅
			this.loadNewGroupsFromServer();
		},
		
		render: function() {
	    	return (
    			React.createElement("div", null, 
                    React.createElement("dl", {className: "rightarea_gate", style: {'marginTop':'0', 'marginBottom':'0'}}, 
                        React.createElement("dt", {className: "malgun13"}, _NewGroup_MSG_NEWGROUPTITLE), 
                        React.createElement("dd", {className: "icon_plus"}, React.createElement("img", {src: "../images/btn_more.gif", width: "18", height: "4", style: {"display":"none"}}))
                    ), 
                    React.createElement(NewGroupList, {data: this.state.data})
                )
			);
		}
	});