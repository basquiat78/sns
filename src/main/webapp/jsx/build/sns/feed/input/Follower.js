		// 팔로워 툴팁
		var TooltipGroup = React.createClass({displayName: "TooltipGroup",

			getInitialState : function () {
	        	return { 
						 groupId 			: ''
						,groupName 			: ''
				};
        	},

			goGroup: function() {

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
				
				var groupId = 'myGroup_' + this.state.groupId;
				$('#'+groupId).addClass('group-select');
				$('#'+groupId+ ' > span.data-txt').addClass('group-select-text');
				
				openMainBody();

			},

			render: function() {
				if(this.props.group !== undefined) {
					this.state.groupId = this.props.group.groupId;
					this.state.groupName = this.props.group.groupName;
				}

				if(this.props.lastComma ==='true' && this.props.extra === 0 ) {
					return (
							React.createElement("span", {className: "link_gr", onClick: this.goGroup}, this.props.group.groupName, ", ")
					);
				} else if(this.props.lastComma ==='false' && this.props.extra === 0 ) {
					return (
							React.createElement("span", {className: "link_gr", onClick: this.goGroup}, this.props.group.groupName, " ")
					);
				} else {
					return (
							React.createElement("span", null, _FEED_Follower_MSG_TOOLTIPTEXT1, " ", this.props.extra, _FEED_Follower_MSG_TOOLTIPTEXT2)
					);
				}
			}

		});
	
	
		// 팔로워 툴팁
		var FollowerTooltip = React.createClass({displayName: "FollowerTooltip",

			getInitialState : function () {
	        	return { 
						 groupId 			: ''
						,groupName 			: ''
						,tooltipMe			: false
				};
        	},

			getMemberInfo:function() {
				getMemberInfo(this.props.followerInfo.followerId, this.props.followerInfo.followerName);
			},

			writeFeed:function() {
	/*
				React.render(<SendMessagePop targetFollower={this.props.followerInfo}/>, document.getElementById('sendMessage'));
				sendMessagePopup = $('#sendMessage').bPopup({
					modalClose: false,
					positionStyle: 'absolute',
					scrollBar: 		false
				});
	*/			
			},

			componentDidMount: function() {
				var self = this;				

				$(React.findDOMNode(this.refs.postup)).mouseover(function(){
					$(this).css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
				}).mouseleave(function(){
					$(this).css('cursor','initial').removeClass('btn-attention').addClass('btn-default');
				});

				if(this.props.followerInfo.groupType == '0' || this.props.followerInfo.groupType === 'ORGANIZATION') {
					var group_pic_url = _Follower_GROUP_PIC+'?groupId=' + this.props.followerInfo.groupId;
					$(React.findDOMNode(this.refs.followerPic)).css("background", 'url(' + group_pic_url + ') no-repeat').css("background-size", 'cover');
				} else {
					var member_pic_url = _Follower_MEMBER_PIC+'?memberId=' + this.props.followerInfo.followerId;
					$(React.findDOMNode(this.refs.followerPic)).css("background", 'url('+ member_pic_url  + ') no-repeat').css("background-size", 'cover');
				}
			},

			goGroupContents: function() {

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
				var groupId = 'myGroup_' + this.state.groupId;
				$('#'+groupId).addClass('group-select');
				$('#'+groupId+ ' > span.data-txt').addClass('group-select-text');
			},

			render: function() {
				var itemId = this.props.itemId;
				if(this.props.followerInfo.groupType == '0' || this.props.followerInfo.groupType === 'ORGANIZATION') {
					this.state.groupId = this.props.followerInfo.groupId;
					this.state.groupName = this.props.followerInfo.groupName;
					return (
							React.createElement("div", {className: "over_feed_gate"}, 
        	                	React.createElement("dl", null, 
            	                	React.createElement("dt", {className: "pic_group_big", ref: "followerPic"}, " "), 	
                	                React.createElement("dd", {className: "malgun16"}, React.createElement("span", {className: "tooltip_link", onClick: this.goGroupContents}, this.props.followerInfo.groupName)), 
                    	            React.createElement("dd", {className: "malgun12"}, this.props.followerInfo.description, " "), 
                        	        React.createElement("dd", {className: "malgun12"}, _FEED_Follower_MSG_FTT_FOLLOWERTEXT, "(", this.props.followerInfo.memberCnt, ")")
                            	), 
                            	React.createElement("span", {className: "send_mail_wrap", style: {'cursor':'initial'}}, 
									React.createElement("button", {style: {'cursor':'initial','visibility':'hidden'}, type: "button", ref: "postup", className: "btn-m btn-default"}, _FEED_Follower_MSG_FTT_SENDMSGBTNTEXT)
								)
                        	)
						);
				} else {
				
					var tooltipGroupList = [];
					var lastComma = 'true';
					var groupList = this.props.followerInfo.groupList;
					var mapping   = this.props.followerInfo.followerMappingInfo[0]===undefined?[]:this.props.followerInfo.followerMappingInfo[0];
					var partName  = mapping.partName===undefined?'':mapping.partName;
					var positionName = mapping.positionName===undefined?'':mapping.positionName;
					var groupListLength = groupList.length;
					if(groupListLength>3) {
						var extra = 0;
						var key = '';
						for(var i=0; i<3; i++) {
							if(i===2) lastComma = 'true';
							var group = groupList[i];
							key = 'tooltipGroupList_'+itemId+'_'+group.groupId;
							
							tooltipGroupList.push(React.createElement(TooltipGroup, {key: key, lastComma: lastComma, extra: extra, group: group}))
						}

						key = 'tooltipExtra_'+itemId;
						lastComma = 'false';
						extra = groupListLength - 3;
						tooltipGroupList.push(React.createElement(TooltipGroup, {key: key, lastComma: lastComma, extra: extra}))

					} else {
						var extra = 0;
						var key = '';
						for(var i=0; i<groupListLength; i++) {
							if(i=== (groupListLength-1)) lastComma = 'false';
							var group = groupList[i];
							key = 'tooltipGroupList_'+itemId+'_'+group.groupId;
							tooltipGroupList.push(React.createElement(TooltipGroup, {key: key, lastComma: lastComma, extra: extra, group: group}))
						}
					}

					return (
							React.createElement("div", {className: "over_feed_gate"}, 
        	       	        	React.createElement("dl", null, 
            	   	            	React.createElement("dt", {className: "pic_big", ref: "followerPic", onClick: this.getMemberInfo, style: {'cursor':'pointer'}}, " "), 	
                	                React.createElement("dd", {className: "malgun16", onClick: this.getMemberInfo}, React.createElement("span", {className: "tooltip_link"}, this.props.followerInfo.followerName, " ", positionName)), 
                   		            React.createElement("dd", {className: "malgun12"}, _FEED_Follower_MSG_FTT_GROUPTEXT, ":", tooltipGroupList, " "), 
                   	    	        React.createElement("dd", {className: "malgun12"}, _FEED_Follower_MSG_FTT_TEAMTEXT, ": ", partName, " "), 
									React.createElement("span", {className: "send_mail_wrap", style: {'cursor':'initial'}}, 
										React.createElement("button", {style: {'cursor':'initial','visibility':'hidden'}, type: "button", ref: "postup", className: "btn-m btn-default", onClick: this.writeFeed}, _FEED_Follower_MSG_FTT_SENDMSGBTNTEXT)
									)
                   	        	)
                   	    	)
						);


				}
			}

		});
	

	
	
		// 팔로워 참조 
		var FeedFollowerList = React.createClass({displayName: "FeedFollowerList",
			// 팔로워 참조  렌더링
			render: function() {

				var ffArray = [];
				var data = this.props.feedfollower;
				var isGroup = false;
				var sortData = [];
				var exceptionCnt = 0;
				if(data.length>0) {
					data.forEach(function(feedFollower){
						if(feedFollower.followerType === 'GROUP') {
							isGroup = true;
							var key = 'feedFollower_GROUP'+"_"+feedFollower.itemId+'_'+feedFollower.followerId;
							ffArray.push(React.createElement(FeedFollower, {key: key, feedFollower: feedFollower, type: 'GROUP'}));
						}
					});

					data.forEach(function(feedFollower){
						if(feedFollower.followerType === 'MEMBER') {
							var key = 'feedFollower_MEMBER'+feedFollower.itemId+'_'+feedFollower.followerId;
							ffArray.push(React.createElement(FeedFollower, {key: key, feedFollower: feedFollower, type: 'MEMBER'}));
						}
					});

					if(isGroup) {
						if(this.props.followerCnt > 11 ) {
							
							exceptionCnt = this.props.followerCnt - 12;
						}
					} else {
						if(this.props.followerCnt > 10 ) {
							
							exceptionCnt = this.props.followerCnt - 11;
						}
					}
					if(exceptionCnt > 0) {
						ffArray.push(React.createElement(FeedFollower, {key: 'exeption', followerCnt: exceptionCnt, feedFollower: [], type: 'EXE'}));
					}
		
					return (
							React.createElement("span", {className: "call_target reply-layout"}, 
           	  					React.createElement("ul", null, 
		            	        	React.createElement("li", {style: {'textDecoration':'none'}}, _FEED_Follower_MSG_REFERENCETEXT, " :"), 
									ffArray
	            	 			)
	            			)  
							);
				} else {
					return (React.createElement("div", null));
				}

			}

		});
	
	
		
		// 팔로워 참조 
		var FeedFollower = React.createClass({displayName: "FeedFollower",

			getInitialState: function() {

          		return {ffSyncKey: '', thisTimer:null, timeoutTime:800, insidePopup:false};

        	},

			tooltipPosition: function(element) {
				var pos = $(element).offset();
				var width = $(element).width();
				$('.over_feed_gate').css({
	    			left: pos.left + 'px',
	    			top: pos.top - 180 + 'px'
				});

			},

			tooltipRender: function(data) {
				React.render(React.createElement(FollowerTooltip, {followerInfo: data, itemId: this.props.feedFollower.itemId}), document.getElementById('sns-tooltip'));
			},

			getFollowerInfo: function(info) {
				var infoArray = info.split(';');
				var followerType = infoArray[0];
				var followerId = infoArray[1];
				var baseurl = _Follower_BASE_FOLLOWER + '/members/'+followerId;
				if(followerType ==='GROUP') {
					baseurl = _Follower_BASE_GROUP + '/'+followerId;
				}
				
				ajaxGetForSync(baseurl, '',  this.tooltipRender);

			},

			getMemberInfo:function() {
				if(viewType=='FAVORITE') {
					return;
				}
				
				if(this.props.feedFollower.followerType == 'MEMBER') {
					getMemberInfo(this.props.feedFollower.followerId, this.props.feedFollower.followerName);
				} else {
					this.goGroup();
				}
			},

			goGroup: function() {

				// 오른쪽 메뉴 상단 그룹 팔로워 리스트
				if(contentsType == 'USER') {
					React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
					React.render(React.createElement(MyGroupFollower, {groupId: this.props.feedFollower.followerId}), document.getElementById('RightUpLevel'));
				}
			
				contentsType  = 'GROUP';

				Reloader.reloadObservers({'type':'group', 'groupId':this.props.feedFollower.followerId, 'isGroupChange':'false'});
	
				// 가운데 컨텐츠 상단 부분(그룹 정보)
				React.unmountComponentAtNode(document.getElementById('head_contents'));
				React.render(React.createElement(GroupHead, {groupId: this.props.feedFollower.followerId}), document.getElementById('head_contents'));
	
				var groupInfo = {"groupId":this.props.feedFollower.followerId, "groupName":this.props.feedFollower.followerName};
	
				// 가운데 컨텐츠 상단 부분(그룹 정보)
				React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
				React.render(React.createElement(FeedApp, {groupInfo: groupInfo}), document.getElementById('mainContentsArea'));


				// 중하단 탭 리스트 및 피드
				React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
				React.render(React.createElement(GroupTabList, {groupId: this.props.feedFollower.followerId}),  document.getElementById('selectTabBySession'));
				
				var groupId = 'myGroup_' + this.props.feedFollower.followerId;
				$('#'+groupId).addClass('group-select');
				$('#'+groupId+ ' > span.data-txt').addClass('group-select-text');

			},
			
					
			getFfSyncKey: function() {
				var baseurl = _Follower_BASE_FOLLOWER + '/members/'+this.props.feedFollower.followerId;
				ajaxGetForSync(baseurl, '',  this.getSyncKey);
			},
		
			getSyncKey: function(data) {
				var ffSyncKey = data.followerMappingInfo[0]===undefined?this.props.regMemberId:data.followerMappingInfo[0].syncKey
				this.state.ffSyncKey = ffSyncKey;
			},
		
			getLyncStatus: function() {
				
    			if(!nameCtrl) {
        			return;
    			}
			},
		
			openLyncMenuName: function() {
				this.getFfSyncKey();
				openLyncMenu(this.state.ffSyncKey, React.findDOMNode(this.refs.ffName),'','-560','-100');
			},
		
			hideLyncMenu: function() {
				hideLyncMenu();
			},
		
			componentDidMount: function() {
		
				var self = this;

				$("#sns-tooltip").mouseenter(function(){
					self.state.insidePopup = true;
				}).mouseleave(function(){
                   	self.state.insidePopup = false;
                   	$(this).hide();
                });

				$(React.findDOMNode(this.refs.popupTrigger)).mouseenter(function(event) {
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
				
							
				//Lync Presence setting
				if(this.props.feedFollower.followerType == 'MEMBER') {
					//initLyncStatus();
					//this.getLyncStatus();
				}
			},	

			// 팔로워 참조  렌더링
			render: function() {
				var rel = this.props.feedFollower.followerType+';'+this.props.feedFollower.followerId;
				if(this.props.type == 'GROUP') {
					return (
           	    	    	React.createElement("li", {ref: "popupTrigger", rel: rel, onClick: this.getMemberInfo}, this.props.feedFollower.followerName)
							);

				} else if(this.props.type == 'MEMBER') {
					return (
           	    	    	React.createElement("li", {ref: "ffName", onClick: this.getMemberInfo, onMouseOver: this.openLyncMenuName, onMouseOut: this.hideLyncMenu}, this.props.feedFollower.followerName)
							);
				} else if(this.props.type == 'EXE') {
					return (
           	    	    	React.createElement("li", {style: {'textDecoration':'none'}}, "외 ", this.props.followerCnt, "명")
							);
				}
			}

		});
	

		var FollowerList = React.createClass({displayName: "FollowerList",

			removeHandler: function(follower) {

				this.props.removeFollower(follower);

			},		

			selectHandler: function(follower, type) {

				this.props.selectFollower(follower, type);

			},	

			render: function() {
				var followers = [];
				var that = this; //because react Object Confliction
				this.props.fList.forEach(function(follower) {
					if(follower.type === 'GROUP' || follower.type === 'ORGANIZATION') {
						var key = 'follower'+follower.type+follower.id;
    	   				followers.push(React.createElement(Follower, {key: key, follower: follower, removeEvent: that.removeHandler}));
					}
        		});

				this.props.fList.forEach(function(follower) {
					if(follower.type === 'MEMBER') {
						var key = 'follower'+follower.type+follower.id;
           				followers.push(React.createElement(Follower, {key: key, follower: follower, removeEvent: that.removeHandler}));
					}
        		});

				return (
						React.createElement("dl", null, 
							followers, 
							React.createElement(FollowerInput, {fList: this.props.fList, 
										   writtenfeedFollower: this.props.writtenfeedFollower, 
										   selectFollower: this.selectHandler, 
										   dropFollower: this.props.dropFollower, 
										   removeFollower: this.removeHandler, 
										   companyAll: this.props.companyAll}
							)
						)
						);
			}

		});
	

		var FollowerInput = React.createClass({displayName: "FollowerInput",

			componentWillReceiveProps: function (nextProps) {
				if(nextProps.dropFollower.length>0) {
					var selectedFollower = this.state.selectedFollower;	
					var dropFollower = nextProps.dropFollower[0];
					var duplictedUser = false;
					for(var i=0; i<selectedFollower.length; i++) {
						if(selectedFollower[i].id == dropFollower.id) {
							duplictedUser = true;
							break;
						}
					}
					if(!duplictedUser) {
						this.state.selectedFollower = this.state.selectedFollower.concat(dropFollower);
						this.props.selectFollower(dropFollower, 'drop');
					}
				}
  			},

			selectHandler: function(follower) {
					if(follower.id == 0)return false;
					this.state.selectedFollower = this.state.selectedFollower.concat(follower);
					this.props.selectFollower(follower, 'input');
					this.refs.follower.getDOMNode().value ='';

			},

			getInitialState: function() {

          		return {selectedFollower:[], writtenfeedFollower:[], companyAll: false};

        	},

			componentDidMount: function() {

				// autocomplete dropmenu ui customized 
				var customRenderMenu = function(ul, items){
        			var that = this,
					currentCategory = "";
					$.each(items, function( index, item) {
						var li;
						if (item.type != currentCategory) {
							var className = 'ui-autocomplete-category category-person';
							var typeName = _FEED_Follower_MSG_FOLLOWERTYPENAME1;
							if(item.type=='GROUP') {
								typeName = _FEED_Follower_MSG_FOLLOWERTYPENAME2;
								className = 'ui-autocomplete-category category-group';
							} else if(item.type=='ORGANIZATION') {
								typeName = _FEED_Follower_MSG_FOLLOWERTYPENAME3;
								className = 'ui-autocomplete-category category-organization';
							}
							ul.append( "<li style='width:250px;' class='"+className+"'>" + typeName + "</li>" );
							currentCategory = item.type;
						}
						li = that._renderItemData( ul, item );
						if(item.type) {
							li.attr("aria-label", item.type + " : " + item.label);
						}
					});

    			};

				var self = this;
				$(React.findDOMNode(this.refs.follower)).autocomplete({
					autoFocus: true,
					minLength: 2,
       				source: function(request, response) {
       					var baseurl = _Follower_BASE_AUTO_FOLLOWER;
       					if(self.state.companyAll) baseurl = _Follower_BASE_AUTO_FOLLOWER_ALL;
						if(request.term.length > 1) {
       	    	 			$.ajax({
                					url	    : baseurl+'/'+request.term,
       	         					type    : "get",
        	        				success : function(data) {
											var groupArray = [];
											var orgArray = [];
											var memberArray = [];
											var noSearchArray = [];
											var selectedGroup = false;
											for(var i=0; i<self.state.selectedFollower.length; i++) {
												if(self.state.selectedFollower[i].type == 'GROUP' 
													|| self.state.selectedFollower[i].type == 'ORGANIZATION'
													) {
													selectedGroup = true;
													break;
												}
											}

											data.forEach(function(follower){
												if(follower.followerType == 'GROUP') {
													if(!selectedGroup) {
															var groupVo = {
																label : follower.followerName,
																value : follower.followerName,
																id	  :	follower.followerId,
																email : '',
																type  : follower.followerType,
																pic   : follower.followerImgUrlm,
																desc  : follower.followerDescription,
																term  : request.term
															};
															groupArray.push(groupVo);
													}
												}
			
											});

											data.forEach(function(follower){
												if(follower.followerType == 'ORGANIZATION') {
													if(!selectedGroup) {
															var groupVo = {
																label : follower.followerName,
																value : follower.followerName,
																id	  :	follower.followerId,
																email : '',
																type  : follower.followerType,
																pic   : follower.followerImgUrlm,
																desc  : follower.followerDescription,
																term  : request.term
															};
															orgArray.push(groupVo);
													}
												}
			
											});
											data.forEach(function(follower){

												var isSelected = false
												for(var j=0; j<self.state.selectedFollower.length; j++) {
													if(self.state.selectedFollower[j].id == follower.followerId && self.state.selectedFollower[j].type =='MEMBER') {
														isSelected = true;
														break;
													}
												}	
												if(follower.followerType == 'MEMBER') {
													if(follower.followerId != _Follower_session_memberId && !isSelected) {
														var followerVo = {
																label 	 : follower.followerName,
																value 	 : follower.followerName,
																id	  	 :	follower.followerId,
																email 	 : follower.followerEmail,
																type  	 : follower.followerType,
																pic   	 : follower.followerImgUrl,
																desc  	 : follower.followerDescription,
																position : follower.followerPosition,
																term  	 : request.term
														};
														memberArray.push(followerVo);
													}
												}
			
											});

											if(data.length == 1 && data[0].followerType == 'line') {
												var noSearchVo = {
																label : request.term,
																value : request.term,
																id	  :	0,
																email : '',
																type  : 'MEMBER',
																pic   : request.term,
																desc  : ''
														};
												noSearchArray.push(noSearchVo);
											}

											response(memberArray.concat(groupArray).concat(orgArray).concat(noSearchArray));

        	        				},

        	        				error	: function(jqXHR, textStatus, errorThrown){
        	            	 			console.log( textStatus);
        	        				}
        	    			});
						}
        			},

    		    	select: function (event, ui) {
       		        	event.preventDefault();
						self.selectHandler(ui.item);
            		},
					
					create: function () {
						$(this).autocomplete('widget').menu('option', 'items', '> :not(.ui-autocomplete-category)');
            			$(this).data('ui-autocomplete')._renderMenu = customRenderMenu;
        			},

					focus: function(event, ui) {
						event.preventDefault();
					}
					
        		}).on('keydown', function(event) {
           			if (event.keyCode == 8 || event.which == 8) {
           				if($(this).val() == '') {
           					var len = self.state.selectedFollower.length;
           					self.props.removeFollower(self.state.selectedFollower[len-1]);
           					console.log(self.state.selectedFollower);
           				}
           			}
           		}).focus(function(){            
       	 			$(this).autocomplete("search");
        		}).data('ui-autocomplete')._renderItem = function (ul, item) {
					ul.css("z-index","10002");
          			var $a = $("<a></a>");
					var src = '';
					var sub   = '';
					var label = item.label.toString();
					console.log(label);
					var position = '';
					var fullSub = '';
					if(item.type == 'GROUP') {
						sub = item.desc ===undefined?'':item.desc;
						fullSub = item.desc;
						if(sub.length > 19) sub = sub.substring(0,19)+'...';
						src = _Follower_GROUP_PIC+'?groupId=' + item.id;
					} else if(item.type == 'ORGANIZATION') {
						sub = item.desc ===undefined?'':item.desc;
						fullSub = item.desc;
						if(sub.length > 19) sub = sub.substring(0,19)+'...';
						src = _Follower_GROUP_PIC+'?groupId=' + item.id;
					} else {
						position = item.position;
						fullSub = item.desc;
						sub = item.desc ===undefined?'':item.desc;
						if(sub.length > 19) sub = sub.substring(0,20) + '...';
						src = _Follower_MEMBER_PIC+'?memberId=' + item.id;
					}
					if(item.term !== undefined) {
						var xxxxx = stripHTML(item.label);
    					label = xxxxx.replace(item.term.toLowerCase().substring(), "<strong>$&</strong>")+ ' ' + position;
					}
					$("<img style='height:40px;width:40px;display:inline-block;float:left;' src='"+src+"'/>").appendTo($a);
					$("<span style='margin-left:5px;font-size:13px;display:inline-block;'></span>").append(label).appendTo($a);
					$("<br></br>").appendTo($a);
					$("<span style='margin-left:5px;font-size:11px;display:inline-block;' title='"+fullSub+"'></span>").text(sub).appendTo($a);
					return $("<li style='width:250px;'>").append($a).appendTo(ul);
           		};

			},

			render: function() {
				this.state.companyAll = this.props.companyAll;
				this.state.selectedFollower = this.props.fList;

				return(
						React.createElement("dd", {className: "none_attribute"}, 
							React.createElement("input", {type: "text", placeholder: _FEED_Follower_MSG_GROUPORFOLLOWERADDTEXT, className: "follower_add_input ignore", ref: "follower"})
						)
				);
			}

		});
	

	

	
		var Follower  = React.createClass({displayName: "Follower",

			removed: function() {

				this.props.removeEvent(this.props.follower);

			},

			render: function() {
				var style;
				var src;
				if(this.props.follower.type==='GROUP') { 
					src = '../images/icon_lock.png';
					style= {
							'marginLeft':'10px','marginBottom':'-1px'
							};
				} else {
					style= {
							'display':'none'
							};
				}

				return(
						React.createElement("dd", {className: "lock_group"}, 
							React.createElement("span", null, React.createElement("img", {src: src, width: "9", height: "11", style: style})), 
						   	React.createElement("span", null, this.props.follower.label), 
							React.createElement("span", {className: "space_left"}, React.createElement("img", {src: "../images/icon_delete.png", width: "8", height: "8", onClick: this.removed, style: {'marginRight':'3px'}}))
						)
					);
			}

		});
	
	
	
		var ShareFollowerApp = React.createClass({displayName: "ShareFollowerApp",

			selectFollower: function(follower) {
				var followerList = this.state.followerList;
				var isDup = false;
				for(var i=0; i<followerList.length; i++){
					if(followerList[i].id === follower.id && follower.type==='MEMBER') {
						isDup = true;
						break;
					}
				}
				if(!isDup) {
					followerList.push(follower);
					if(this.props.fromFollowerInputSetting !==undefined) {			
						this.props.fromFollowerInputSetting(follower);
					}

					followerList = followerList.concat(follower);
				}
				this.setState({followerList: followerList});
			},

			removeFollower: function(follower) {
				var index = -1;	
       			var followerLength = this.state.followerList.length;
    			for(var i = 0; i < followerLength; i++ ) {
    				if(this.state.followerList[i].id === follower.id ) {
    					index = i;
    					break;
    				}
    			}

    			this.state.followerList.splice(index, 1);	
    			this.setState( {followerList: this.state.followerList} );

			},
				
			getInitialState: function() {

       			return {followerList: [], dropFollower:[]};

       		},

			render: function() {
				this.state.followerList = this.props.writtenFollowerList;
				this.props.followerHandler(this.state.followerList);
				return (
	        		   	React.createElement("div", {className: "notice_target"}, 
							React.createElement(FollowerList, {writtenfeedFollower: this.props.writtenfeedFollower, dropFollower: this.state.dropFollower, fList: this.state.followerList, removeFollower: this.removeFollower, selectFollower: this.selectFollower})
	        	     	)
		            );
	        }
		});

	
	
	
		var FollowerApp = React.createClass({displayName: "FollowerApp",

			dropFollowerSetting: function(follower) {
				this.props.dropFollowerSetting(follower);
			},

			selectFollower: function(follower, type) {
				var followerList = this.state.followerList;
				var isDup = false;
				for(var i=0; i<followerList.length; i++){
					if(followerList[i].id === follower.id && follower.type==='MEMBER') {
						isDup = true;
						break;
					}
				}
				if(!isDup) {
					followerList.push(follower);
					if(this.props.fromFollowerInputSetting !==undefined && type == 'input') {
						this.props.fromFollowerInputSetting(follower);
						this.setState({followerList: followerList});
					} else if(this.props.fromFollowerInputSetting !==undefined && type == 'drop') {
						this.props.fromFollowerInputSetting(follower);
						this.setState({followerList: followerList});
					}

				}

			},

			removeFollower: function(follower) {
				var index = -1;	
       			var followerLength = this.state.followerList.length;
    			for(var i = 0; i < followerLength; i++ ) {
    				if(this.state.followerList[i].id == follower.id && this.state.followerList[i].type == follower.type ) {
    					index = i;
    					break;
    				}
    			}

				if(index > -1) {
					this.state.followerList.splice(index, 1);
					index = -1;
				}

				var droppedFollowerList = this.state.droppedFollowerList.length;
				for(var j = 0; j < droppedFollowerList; j++ ) {
    				if(this.state.droppedFollowerList[j].id == follower.id && this.state.droppedFollowerList[j].type == follower.type ) {
    					index = i;
    					break;
    				}
    			}

				if(index > -1) {
	    			this.state.droppedFollowerList.splice(index, 1);
				}
				
				if(this.props.removeDropFollower !== undefined) {
					this.props.removeDropFollower(follower);
				}
    			this.setState( {followerList: this.state.followerList, droppedFollowerList: this.state.droppedFollowerList} );
			},
				
			getInitialState: function() {

       			return {followerList: [], dropFollower:[], droppedFollowerList:[], companyAll: false};

       		},

			dropSetting: function(dropInfo) {
				this.selectFollower(dropInfo, 'drop');
			},

			getMemberInfoFromEmail:function(data) {

			},

			componentDidMount: function() {
				this.setState({followerList : this.props.writtenFollowerList});
				var self = this;
				$(React.findDOMNode(this.refs.dropZone)).droppable({
					accept :'.drag-box',
					greedy : true,
					drop   : function( event, ui) {
						self.state.dropFollower = [];
 						var valueArray = $(ui.draggable[0].childNodes[0]).val().split(';');
						var userId = valueArray[0];
						var userName = valueArray[1];
						var dropStop = false;
						if(valueArray.length == 3) {
							var baseurl = _Follower_BASE_MEMBER_BY_EMAIL+'/'+userId;
							$.ajax({
	      							url		: baseurl,
	      							type	: "get",
	      							async	: false,
	      							success : function(data) {
											if(data == '' || data === undefined || data == null) {
												dropStop = true;
												userId = '';
											} else {
												userId  = data.memberId;
											}		 
			      					},
	      							error : function (jqXHR) {
	    	  							MsgPopup(_FEED_Follower_MSG_ERRORDEFAULTMSG);
          							}
							});
							
						}

						if(!dropStop) {
							var droppedFollowerList = self.state.droppedFollowerList;
							var duplictedUser = false;
							for(var i=0; i<droppedFollowerList.length; i++) {
								if(droppedFollowerList[i].id == userId) {
									duplictedUser = true;
									break;
								}
							}
	
							if(!duplictedUser) {
								var dropInfo = {
										label : userName,
										value : userName,
										id    : userId,
										email : '',
										type  : 'MEMBER',
										pic   : ''
								
										};

								self.dropSetting(dropInfo);
								event.stopPropagation();
							}
						}

					}
                	
				});
			},

			checkBox: function() {
				this.setState({companyAll: $(React.findDOMNode(this.refs.companyAll)).prop('checked')});
			},
			
			focuson: function() {
				$('.follower_add_input').focus();
			},
			
			render: function() {
				this.props.followerHandler(this.state.followerList);
				if(this.props.ftype == 'normal'){
					return (
	        	    	React.createElement("div", {className: "notice_target", onClick: this.focuson}, 
							React.createElement(FollowerList, {writtenfeedFollower: this.props.writtenfeedFollower, 
										  fList: this.state.followerList, 
										  removeFollower: this.removeFollower, 
										  selectFollower: this.selectFollower, 
										  dropFollower: this.state.dropFollower, 
										  companyAll: this.state.companyAll}
							)
	        	      	)
		        	    );
				}else{
					return (
	        	    		React.createElement("div", {className: "notice_target mainDrop-area", ref: "dropZone", onClick: this.focuson}, 
								React.createElement("ul", {className: "select_all"}, 
	                        		React.createElement("li", {className: "all_target"}, React.createElement("input", {ref: "companyAll", id: "companyAll", type: "checkbox", value: "N", onClick: this.checkBox})), 
	                        		React.createElement("li", {className: "all_target_name"}, React.createElement("label", {htmlFor: "companyAll"}, _FEED_Follower_MSG_ALLCOMPANY))
	                    		), 
								React.createElement(FollowerList, {writtenfeedFollower: this.state.followerList, 
											  fList: this.state.followerList, 
											  removeFollower: this.removeFollower, 
											  selectFollower: this.selectFollower, 
											  dropFollower: this.state.dropFollower, 
											  companyAll: this.state.companyAll}
								)
	        	      		)
		        	);
				}
	        }
		});

	
	
	
		var CommentFollowerInput = React.createClass({displayName: "CommentFollowerInput",

			selectHandler: function(follower) {
				if(follower.id == 0)return false;
				this.state.selectedFollower = this.state.selectedFollower.concat(follower); 
				this.props.selectFollower(follower);
				this.refs.follower.getDOMNode().value ='';

			},
				
			getInitialState: function() {

       			return {selectedFollower:[]};

       		},

			componentDidMount: function() {

				// autocomplete dropmenu ui customized 
				var customRenderMenu = function(ul, items){
        			var that = this,
					currentCategory = "";
					$.each(items, function( index, item) {
						var li;
						if (item.type != currentCategory) {
							var className = 'ui-autocomplete-category category-person';
							var typeName = _FEED_Follower_MSG_FOLLOWERTYPENAME1;
							if(item.type=='GROUP') {
								typeName = _FEED_Follower_MSG_FOLLOWERTYPENAME2;
								className = 'ui-autocomplete-category category-group';
							}
							ul.append( "<li class='"+className+"'>" + typeName + "</li>" );
							currentCategory = item.type;
						}
						li = that._renderItemData( ul, item );
						if(item.type) {
							li.attr("aria-label", item.type + " : " + item.label);
						}
					});

    			};

				var self = this;

	        	$(React.findDOMNode(this.refs.follower)).autocomplete({
	        		autoFocus: true,
	        		minLength: 2,
					source: function(request, response) {
						if(request.term.length > 1) {
       	    	 			$.ajax({
                					url	    : _Follower_BASE_AUTO_FOLLOWER+'/'+request.term,
       	         					type    : "get",
        	        				success : function(data) {
											var groupArray = [];
											var memberArray = [];
											var noSearchArray = [];

											data.forEach(function(follower){

												var isSelected = false
												for(var j=0; j<self.state.selectedFollower.length; j++) {
													if(self.state.selectedFollower[j].id == follower.followerId && self.state.selectedFollower[j].type =='MEMBER') {
														isSelected = true;
														break;
													}
												}	
												if(follower.followerType == 'MEMBER') {
													if(follower.followerId != _Follower_session_memberId && !isSelected) {
														var followerVo = {
																label : follower.followerName,
																value : follower.followerName,
																id	  :	follower.followerId,
																email : follower.followerEmail,
																type  : follower.followerType,
																pic   : follower.followerImgUrl,
																desc  	 : follower.followerDescription,
																position : follower.followerPosition,
																term  : request.term
														};
														memberArray.push(followerVo);
													}
												}
			
											});

											if(data.length == 1 && data[0].followerType == 'line') {
												var noSearchVo = {
																label : request.term,
																value : request.term,
																id	  :	0,
																email : request.term,
																type  : 'MEMBER',
																pic   : request.term
														};
												noSearchArray.push(noSearchVo);
											}

											response(groupArray.concat(memberArray).concat(noSearchArray));

        	        				},

        	        				error	: function(jqXHR, textStatus, errorThrown){
        	            	 			console.log( textStatus);
        	        				}
        	    			});
						}
        			},
	    	    	select: function (event, ui) {
	       	        	event.preventDefault();
	    	        	this.value = ui.item.value;
						self.selectHandler(ui.item);
	           		},
					create: function () {
						$(this).autocomplete('widget').menu('option', 'items', '> :not(.ui-autocomplete-category)');
            			$(this).data('ui-autocomplete')._renderMenu = customRenderMenu;
        			},

					focus: function(event, ui) {
						event.preventDefault();
					}
	        	}).on('keydown', function(event) {
           			if (event.keyCode == 8 || event.which == 8) {
           				if($(this).val() == '') {
           					var len = self.state.selectedFollower.length;
           					self.props.removeFollower(self.state.selectedFollower[len-1]);
           					console.log(self.state.selectedFollower);
           				}
           			}
           		}).focus(function(){            
        				$(this).autocomplete("search");
	        	}).data('ui-autocomplete')._renderItem = function (ul, item) {
					ul.css("z-index","10002");
          			var $a = $("<a></a>");
					var label = item.label;
					var	position = item.position;
					var	sub = item.desc;
					var	src = _Follower_MEMBER_PIC+'?memberId=' + item.id;
					if(item.term !== undefined) {
    					label = item.label.replace(item.term.substring(), "<strong>$&</strong>")+ ' ' + position;
					}
					$("<img style='height:40px;width:40px;display:inline-block;float:left;' src='"+src+"'/>").appendTo($a);
					$("<span style='margin-left:5px;font-size:13px;display:inline-block;'></span>").append(label).appendTo($a);
					$("<br></br>").appendTo($a);
					$("<span style='margin-left:5px;font-size:11px;display:inline-block;'></span>").text(sub).appendTo($a);
					return $("<li style='width:250px;'>").append($a).appendTo(ul);
            	};

  			},

			render: function() {
					this.state.selectedFollower = this.props.fList;
					var inputObjectid = "commentFollower"+this.props.pFeedId;
					return(
							React.createElement("dd", {className: "none_attribute"}, 
								React.createElement("input", {type: "text", placeholder: _FEED_Follower_MSG_REPORTOTHERPEOPLE, className: "ignore", id: inputObjectid, ref: "follower"})
							)
					);
			}

		});
	
	
	
		var CommentFollowerList = React.createClass({displayName: "CommentFollowerList",

			removeHandler: function(follower) {

				this.props.removeFollower(follower);

			},		

			selectHandler: function(follower) {

				this.props.selectFollower(follower);

			},

			focuson: function() {

				var inputObjectId = "commentFollower"+this.props.pFeedId;
				$('#'+ inputObjectId).focus();				
	
			},

			render: function() {
				var followerList = this.props.fList;
				var followers = [];
				var that = this; //because react Object Confliction

				followerList.forEach(function(follower) {
					if(follower.type === 'MEMBER') {
						var key = 'comment'+follower.type+follower.id;
           				followers.push(React.createElement(CommentFollower, {key: key, follower: follower, removeEvent: that.removeHandler}));
					}
       			});

				return(
						React.createElement("div", {className: "tag_area", style: {'padding':'0'}}, 
							React.createElement("dl", {style: {'paddingTop':'0', 'paddingBottom':'3px', 'left':'0', 'right':'0', 'marginLeft':'9px'}, onClick: this.focuson}, 
								followers, 
								React.createElement(CommentFollowerInput, {
													pFeedId: this.props.pFeedId, 
													fList: this.props.fList, 
													selectFollower: this.selectHandler, 
													removeFollower: this.removeHandler}
								)
							)
						)
					);
			}

		});
	
	
	
		var CommentFollower  = React.createClass({displayName: "CommentFollower",

			removed: function() {
		
				this.props.removeEvent(this.props.follower);
		
			},

			render: function() {
				var style;
				var src;
				if(this.props.follower.type==='GROUP') { 
					src = '../images/icon_lock.png';
				} else {
					style= {
							'display':'none'
							};
				}

				var label = this.props.follower.label;

				return (
						React.createElement("dd", {className: "lock_group"}, 
							React.createElement("span", null, React.createElement("img", {src: src, width: "9", height: "11", style: style})), 
							label, 
							React.createElement("span", {className: "space_left"}, 
								React.createElement("img", {src: "../images/icon_delete.png", width: "8", height: "8", onClick: this.removed})
							)
						)
					);
			}

		});
	
	
	
		var CommentFollowerApp = React.createClass({displayName: "CommentFollowerApp",

			selectFollower: function(follower) {

				var followerList = this.state.followerList;

				var isDup = false;
				for(var i=0; i<followerList.length; i++){
					if(followerList[i].id == follower.id && follower.type == 'MEMBER') {
						isDup = true;
						break;
					}
				}
				if(!isDup) {
					followerList.push(follower);			
					this.props.fromFollowerInputSetting(follower);
				}

				this.setState({followerList: followerList});

			},

			removeFollower: function(follower) {

				var index = -1;	
         		var followerLength = this.state.followerList.length;
      			for(var i = 0; i < followerLength; i++ ) {
      				if(this.state.followerList[i].id == follower.id ) {
      					index = i;
      					break;
      				}
      			}

				if(index > -1) {
      				this.state.followerList.splice(index, 1);	
				}

				if(this.props.removeDropFollower !== undefined) {
					this.props.removeDropFollower(follower);
				}

      			this.setState( {followerList: this.state.followerList} );

			},
				
			getInitialState: function() {

       			return {followerList: []};

       		},

			componentDidMount: function() {
				this.setState({followerList : this.props.writtenFollowerList});
			},

			render: function() {
				this.props.followerHandler(this.state.followerList);
        		return (
							React.createElement(CommentFollowerList, {
									pFeedId: this.props.pFeedId, 
									writtenfeedFollower: this.props.writtenfeedFollower, fList: this.state.followerList, 
									removeFollower: this.removeFollower, 
									selectFollower: this.selectFollower}
							)
	        	    );
						
        	}

        });
	
	