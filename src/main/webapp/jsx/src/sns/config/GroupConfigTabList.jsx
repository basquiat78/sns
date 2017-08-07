	var GroupConfigTab  = React.createClass({
		getInitialState : function () {
			return {data : []};
        },
        componentDidMount: function() {
			React.unmountComponentAtNode(document.getElementById('GroupConfigTabList'));
			React.render(<GroupConfigTabBase changeTab={this.changeTab} onConfigSubmit = {this.handleConfigSubmit} 
				myGroupKeyValue={this.props.myGroupKeyValue} getCurrentGroupType={this.props.myGroupType} />
				, document.getElementById('GroupConfigTabList'));
		},
		handleConfigSubmit : function(conf) {
			MsgPopup(conf);
		},
		changeTab: function(tabId){
			React.unmountComponentAtNode(document.getElementById('GroupConfigTabList'));
			if(tabId == 'GroupConfigTabBase'){
				$('div#GroupConfigPop .click_popup').css('overflow','auto');
			
				React.render(<GroupConfigTabBase changeTab={this.changeTab} onConfigSubmit = {this.handleConfigSubmit} myGroupKeyValue={this.props.myGroupKeyValue} getCurrentGroupType={this.props.myGroupType} />
				, document.getElementById('GroupConfigTabList'));
			}else if(tabId == 'GroupConfigTabSetup'){
				$('div#GroupConfigPop .click_popup').css('overflow','auto');
				
				React.render(<GroupConfigTabSetup changeTab={this.changeTab} myGroupKeyValue={this.props.myGroupKeyValue} />, document.getElementById('GroupConfigTabList'));
			}else if(tabId == 'GroupConfigTabFeedDownload'){
				$('div#GroupConfigPop .click_popup').css('overflow','auto');
				
				React.render(<GroupConfigTabFeedDownload changeTab={this.changeTab} myGroupKeyValue={this.props.myGroupKeyValue} />, document.getElementById('GroupConfigTabList'));
			} else if(tabId == 'GroupConfigTabBase2nd') {
				$('div#GroupConfigPop .click_popup').css('overflow','auto');
				
				React.render(<GroupConfigTabBase2nd changeTab={this.changeTab} myGroupKeyValue={this.props.myGroupKeyValue} />
				, document.getElementById('GroupConfigTabList'));
			}
		},
		render: function() {
			return (
				<div className="feed_wrap">
					<dl className="result_feed_gate" style={{'marginLeft':'-26px'}}>
			    	    <dt style={{'width':'150px'}}>{_GroupConfigTabList_MSG_TITLE}</dt>
		        	        <dd className="find_box">   
		        	        	<ul style={{'display' : 'none'}}>
		        	        		<li><input style={{'borderRight':'0'}} name="" type="text" placeholder="Find"/></li>
		        	           		<li className="btn_find"></li>
									<li></li>
		        	        	</ul>
		        	    	</dd>
			    	</dl>
					<div id='GroupConfigTabList'></div>
				</div>
			);
		}
	});

var GroupMember = React.createClass({
	getInitialState : function () {
		return {
				memberName				:''
				, groupId 				: ''
				, memberId 				: ''
				, memberPartName		: ''
				, memberPositionName	: ''
			};
	},
	componentDidMount : function () {
		this.setState(
				{
					memberName			: this.props.memberName
        	    	,groupId			: this.props.groupId
        	    	,memberId			: this.props.memberId
        	    	,memberPartName		: this.props.memberPartName
        	    	,memberPositionName	: this.props.memberPositionName
        		}
			)
    },
	dropResult : function(v) {
		this.props.onGroupMemberLeave();
		var unmount = React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
		if(unmount)
			React.render(<MyGroupFollower groupId={this.state.groupId}/>, document.getElementById('RightUpLevel'));
	},
	getMemberSyncKey : function(data){
		var self = this;
		var syncKey = data.syncKey; var memberId = data.memberId;
		var jsondata = {
        			"groupId" : this.props.groupId,
					//"syncKey" : syncKey,
					"memberId" : memberId
        };
        
        ajaxGet(contextpath + _GroupConfigTabList_BASE_GFOLLOWER_URL 
				, jsondata
				, function(data){
					
					if(data[0].isGroupMng == 1) { // 그룹관리자라면 탈퇴시키지 않고, 그룹사용자로 옮긴다.
						
						if( $("#groupManagerBox").find('tr').length <= 1 ) { // 그룹관리자가 현재 한명뿐이라면 놔둔다.
							MsgPopup(_GroupConfigTabList_MSG_MGRMUSTBEEXISTMSG);
						} else {
							self.moveToNormalUser(data[0]);
						}
					
					} else {
						jsondata.syncKey = syncKey;
						ConfirmPopup(_GroupConfigTabList_MSG_GROUPMEMBERDELMSG , function(){
							ajaxDelByJson(contextpath + _GroupConfigTabList_GFOLLOWER_BYMNG_URL, jsondata, self.dropResult);
						}, 'okcancel');
					}
				});
		
	},

	dropit: function(v) {
		ajaxGet(contextpath + _GroupConfigTabList_BASE_MEMBER + '/' + v + '/', {}, this.getMemberSyncKey);
	},
	
	moveToNormalUser : function(data) {
		
		var fdata = {groupId : data.groupId	, memberId : data.memberId };
		var obj = $('#groupManagerBox').find("[data-id='" + fdata.memberId + "']");
		var $groupUsingMemberBox = $("tbody#groupUsingMemberBox");
		var $groupManagerBox = $("tbody#groupManagerBox");
		
			obj.fadeOut(function() {
                obj.removeClass("m")
                  .appendTo( $groupUsingMemberBox )
                  .fadeIn(function(){
                  	
                  	  $("#groupUsingMemberBox").find("tr.dummy").remove();
                	  
                	  fdata.isGroupMng = 0;
                	  
                	  ajaxUpd(contextpath + _GroupConfigTabList_BASE_GFOLLOWER_URL, fdata, function(){
                		  MsgPopup(_GroupConfigTabList_MSG_MOVETOGROUPUSERMSG);
							
							$("span#groupManagerCntWrapper").html('('+ $groupManagerBox.find('tr').length +')');
							$("span#groupUserCntWrapper").html('('+ $groupUsingMemberBox.find('tr').length +')');
                	  });
					  
					  if($("#groupManagerBox tr").length == 0) {
							$("#groupManagerBox").append("<tr class='dummy'><td colspan='5' style='height:30px;'>+" + _GroupConfigTabList_MSG_ADDGROUPMANAGERWITHDRAGTEXT + "</td></tr>");
					  }
                  });
              });
		
	},

	render : function() {
		return (
			<tr data-id={this.state.memberId} style={{'cursor':'pointer'}}>
                <td><span className="pic_small" style={{'marginLeft':'20px'}}></span></td>
                <td style={{'textAlign':'left'}}>{this.state.memberName}</td>
                <td>{this.state.memberPartName}</td>
                <td>{this.state.memberPositionName}</td> 
                <td className="table_check" style={{'width':'50px'}}>
                	<button style={{'width':'38px','height':'23px'}} onClick={this.dropit.bind(this, this.state.memberId)} className="btn-m btn-default">{_GroupConfigTabList_MSG_DELETEBTNTEXT}</button>
                </td>                                                
        	</tr>
		);
	}
});

var GroupUsingMemberList = React.createClass({
	handleGroupMemberRemove : function() {
		this.props.onDropGroupMember();
	},
	render : function() {
		var that = this;
		var groupNodes = this.props.data.map(function (group, index) {
			return (
				<GroupMember key={index} memberName={group.memberName} memberId={group.memberId}
				memberPartName = {group.memberPartName}
				memberPositionName = {group.memberPositionName}
				groupId ={that.props.groupId} onGroupMemberLeave={that.handleGroupMemberRemove} status={'y'}/>
			);
		});
		return (
			<tbody id="groupUsingMemberBox">
				{groupNodes}
			</tbody>
		);
	}
});

var GroupManagerList = React.createClass({
	handleGroupMemberRemove : function() {
		this.props.onDropGroupMember();
	},
	render : function() {
		var that = this;
		var groupNodes = this.props.mdata.map(function (group, index) {
			return (
				<GroupMember key={index} memberName={group.memberName} memberId={group.memberId}
				memberPartName = {group.memberPartName}
				memberPositionName = {group.memberPositionName}
				groupId ={that.props.groupId} onGroupMemberLeave={that.handleGroupMemberRemove} status={'x'}/>
			);
		});
		return (
			<tbody id="groupManagerBox">
				{groupNodes}
			</tbody>
		);
	}
});

var GroupUsingMemberInput = React.createClass({
	getInitialState : function () {
		return {selectedFollower:[]};
    },
    selectHandler: function(groupUser) {
		this.props.selectFollower(groupUser);
		this.refs.groupUser.getDOMNode().value ='';
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
		var currGroupType = self.props.getCurrentGroupType;
		
		var initJson = function(request, response) {
					   		if(request.term.length > 1) {
       	    	 				$.ajax({
                						url	    : contextpath +  _GroupConfigTabList_BASE_AUTO_FOLLOWER+'/'+request.term,
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
																	label 	 : follower.followerName,
																	value 	 : follower.followerName,
																	id	  	 : follower.followerId,
																	email 	 : follower.followerEmail,
																	type  	 : follower.followerType,
																	pic   	 : follower.followerImgUrl,
																	desc  	 : follower.followerDescription,
																	position : follower.followerPosition,
																	term     : request.term,
																	memberId : follower.followerId,
																	groupId  : ''
															}
															memberArray.push(followerVo);
														}
													}
			
												});

												if(data.length == 1 && data[0].followerType == 'line') {
													var setValue,type = "";

													if(currGroupType == '0') { // 내부그룹 (@ is disable)
														setValue = request.term;
													} else if (currGroupType == '1') { // 외부그룹 (@ is available)
														if(request.term.indexOf("@")>-1){
															setValue = request.term;
														} else {
															setValue = request.term + "@hanwha.com";
														}
													}
					
													if(setValue.indexOf("@") > -1) {
														type = "EMAIL";
													} else type = "MEMBER";
														
													var noSearchVo = {
																	label : setValue,
																	value : setValue,
																	id	  :	setValue,
																	email : setValue,
																	type  : 'type',
																	pic   : request.term,
																	memberId : 0,																	
																	memberId : follower.followerId,
																	groupId  : ''
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
        			}
    	
    	$(".groupUser_add_input").autocomplete({
    		autoFocus: true,
    		minLength: 2
	    	,source: initJson,
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
	render : function(){
		this.state.selectedFollower = this.props.fList;

		return (
			<dt className="admini_txt" style={{'border':'0px'}}>
				<input type='text' placeholder={_GroupConfigTabList_MSG_ADDGROUPUSERTEXT} className='groupUser_add_input ignore' ref='groupUser'/>
			</dt>
		)
	}
});

var GroupUsingMemberInputList = React.createClass({
	removeHandler: function(follower) {
		this.props.removeFollower(follower);
	},		
	selectHandler: function(follower) {
		this.props.selectFollower(follower);
	},
	focuson: function() {
		$('.groupUser_add_input').focus();
	},
	getCurrentGroupUserList : function() {
		this.props.getCurrentGroupUserList();
	},
	getCurrentGroupId : function() {
		return this.props.getCurrentGroupId;
	},
	componentDidMount : function() {
		//
	},
	render : function(){
		var followers = [];
		var that = this; //because react Object Confliction
		this.props.fList.forEach(function(follower) {
			if(follower.type === 'MEMBER') {
				var key = 'gmember'+follower.type+follower.id;
   				followers.push(<GroupUsingMember key={key} follower={follower} removeEvent={that.removeHandler}/>);
			} else {
				var key = 'gemail'+follower.type+follower.id;
   				followers.push(<GroupUsingMember key={key} follower={follower} removeEvent={that.removeHandler}/>);
			}
		});
		
		return (
			<dl onClick={this.focuson} style={{'border':'0px','paddingRight':'0px', 'width':'760px', 'margin':'0'}}>
				{followers}
				<GroupUsingMemberInput fList={this.props.fList} 
					writtenfeedFollower={this.props.writtenfeedFollower} 
					selectFollower={this.selectHandler}
					removeFollower = {this.removeHandler}
					getCurrentGroupId={this.getCurrentGroupId}
					getCurrentGroupType={this.props.getCurrentGroupType}
				/>
				<dd style={{'float':'right','width':'80px','textAlign':'center', 'marginTop':'5px'}}>
					<button style={{'width':'38px','height':'23px'}} onClick={this.getCurrentGroupUserList} className="btn-m btn-default">{_GroupConfigTabList_MSG_CONFIRMBTNTEXT}</button>
				</dd>
			</dl>
		);
	}
});

var GroupUsingMember = React.createClass({
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

		return(
				<dd className='lock_group' style={{'marginLeft':'5px;', 'height':'19px', 'padding':'5px 0 0 2px'}}>
					<span><img src={src} width='9' height='11' style={style}/></span>
				   	{this.props.follower.label}
					<span className='space_left'><img src='../images/icon_delete.png' width='8' height='8' onClick={this.removed}/></span>
				</dd>
			);
	}
});


var GroupConfigTabBase  = React.createClass({
	loadUsingMembersFromServer : function() {
		ajaxGet(contextpath + _GroupConfigTabList_GROUP_WIDGET_MEMBER, {"groupId" : this.props.myGroupKeyValue , "cType" : "user" }, function(data){
			this.setState({data : data});
			$("span#groupUserCntWrapper").html(' (' + data.length + ')');

			this.afterloadmemberlist();
		}.bind(this));
	},
	loadManagersFromServer : function() {
		ajaxGet(contextpath + _GroupConfigTabList_GROUP_WIDGET_MEMBER, {"groupId" : this.props.myGroupKeyValue , "cType" : "manager" }
			, function(mdata){
			this.setState({mdata : mdata});
			$("span#groupManagerCntWrapper").html(' (' + mdata.length + ')');

			this.afterloadmanagerlist();
		}.bind(this));
	},
	afterloadmemberlist : function() {
		var that = this;
		var $groupUsingMemberBox = $("tbody#groupUsingMemberBox");
		var $groupManagerBox = $("tbody#groupManagerBox");
		
		$( "tr", $groupUsingMemberBox ).draggable({
	      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
	      revert: "invalid", // when not dropped, the item will revert back to its initial position
	      containment: "document",
	      //stack: "div",
	      helper		: function() {
    							var clone = $(this).clone();
    							$(clone).removeAttr('data-reactid');
    							$(clone).find('*').css('border-bottom','0px');
    							$(clone).find('*').removeAttr('data-reactid');
    							$(clone).find('button').remove();
    							return clone;
							},
	      cursor: "move"
	    });

		function moveObjToGroupUsingMember($item) {
			var data = {groupId : that.props.myGroupKeyValue, memberId : $item.data('id')};
			$item.fadeOut(function() {
                $item.removeClass("m")
                  .appendTo( $groupUsingMemberBox )
                  .fadeIn(function(){
                  		$("#groupUsingMemberBox").find("tr.dummy").remove();
                	  data.isGroupMng = 0;
                	  ajaxUpd(contextpath + _GroupConfigTabList_BASE_GFOLLOWER_URL, data, function(){
                		  MsgPopup(_GroupConfigTabList_MSG_MOVETOGROUPUSERMSG);
							$("span#groupManagerCntWrapper").html('('+ $groupManagerBox.find('tr').length +')');
							$("span#groupUserCntWrapper").html('('+ $groupUsingMemberBox.find('tr').length +')');
                	  });
					  if($("#groupManagerBox tr").length == 0) {
							$("#groupManagerBox").append("<tr class='dummy'><td colspan='5' style='height:30px;'>+" + _GroupConfigTabList_MSG_ADDGROUPMANAGERWITHDRAGTEXT + "</td></tr>");
					  }
                  });
              });
		}
		
		$groupUsingMemberBox.parent().parent().droppable({
	        accept: "#groupManagerBox tr",
	        activeClass: "ui-state-highlight",
	        drop: function( event, ui ) {
	        	
	        	if( $("#groupManagerBox").find('tr').length - 1 <= 1 ) { // 그룹관리자가 현재 한명뿐이라면 놔둔다. drag & drop 의 경우 1을 빼주어야함
					MsgPopup(_GroupConfigTabList_MSG_MGRMUSTBEEXISTMSG);
					
				} else {
					moveObjToGroupUsingMember( ui.draggable );
				}
	        	
	        },
	        over: function(event, ui) {
	            $(this).css('z-index', -1);
	            ui.helper.css('z-index', "1000");
	        }
		});

		if($("#groupUsingMemberBox tr").length == 0) {
			$("#groupUsingMemberBox").append("<tr class='dummy'><td colspan='5' style='height:30px;'>+"+ _GroupConfigTabList_MSG_ADDGROUPUSERWITHDRAGTEXT +"</td></tr>");
		}
	},
	afterloadmanagerlist : function() {
		var that = this;
		var $groupUsingMemberBox = $("tbody#groupUsingMemberBox");
		var $groupManagerBox = $("tbody#groupManagerBox");
		
		$( "tr", $groupManagerBox ).draggable({
	      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
	      revert: "invalid", // when not dropped, the item will revert back to its initial position
	      containment: "document",
	      //stack: "div",
	      helper		: function() {
    							var clone = $(this).clone();
    							$(clone).removeAttr('data-reactid');
    							$(clone).find('*').css('border-bottom','0px');
    							$(clone).find('*').removeAttr('data-reactid');
    							$(clone).find('button').remove();
    							$(clone).css("z-index","1000");
    							return clone;
							},
	      cursor: "move"
	    	  , start : function() {
	    		  $("#groupUsingMemberBoxTable").css("z-index","-1000");
	    	  }
	    });

		function moveObjToManager($item) {
				var data = {groupId : that.props.myGroupKeyValue, memberId : $item.data('id') };
				$item.fadeOut(function() {
	                $item.appendTo( $groupManagerBox ).fadeIn(function() {
	                	$("#groupManagerBox").find("tr.dummy").remove();
	                	data.isGroupMng = 1;
	                	  ajaxUpd(contextpath + _GroupConfigTabList_BASE_GFOLLOWER_URL, data, function(){
	                		  MsgPopup(_GroupConfigTabList_MSG_MOVETOGROUPMANAGERMSG);
								$("span#groupManagerCntWrapper").html('('+ $groupManagerBox.find('tr').length +')');
								$("span#groupUserCntWrapper").html('('+ $groupUsingMemberBox.find('tr').length +')');
	                	  });
						
						if($("#groupUsingMemberBox tr").length == 0) {
							$("#groupUsingMemberBox").append("<tr class='dummy'><td colspan='5' style='height:30px;'>+"+ _GroupConfigTabList_MSG_ADDGROUPUSERWITHDRAGTEXT +"</td></tr>");
					  	}
	  				});
	            });
			}
		
		$groupManagerBox.parent().parent().droppable({
	        accept: "#groupUsingMemberBox > tr",
	        activeClass: "ui-state-highlight",
	        drop: function( event, ui ) {
	        	moveObjToManager( ui.draggable );
	        },
	        over: function(event, ui) {
	            $(this).css('z-index', -1);
	            ui.helper.css('z-index', "1000");
	        }
		});

		if($("#groupManagerBox tr").length == 0) {
			$("#groupManagerBox").append("<tr class='dummy'><td colspan='5' style='height:30px;'>+"+ _GroupConfigTabList_MSG_ADDGROUPMANAGERWITHDRAGTEXT +"</td></tr>");
		}
	},
	getInitialState : function () {
		return {data : [], mdata : [], followerList: []};
    },
	
    selectFollower: function(follower) {
		var followerList = this.state.followerList;
		var isDup = false;
		for(var i=0; i<followerList.length; i++){
			if(followerList[i].id === follower.id && follower.type==='MEMBER') {
				isDup = true;
				break;
			} else if(followerList[i].id === follower.id && follower.type==='EMAIL') {
				isDup = true;
				break;
			}
		}
		if(!isDup) {
			followerList.push(follower);
			followerList = followerList.concat(follower);
		}
		var uniqueNames = [];
		$.each(followerList, function(i, el){
    		if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
		});
		this.setState({followerList: uniqueNames});
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

	getCurrentGroupUserList : function() {
		var x = this;
		var data = {};
		var emaildata = {};
		data.groupFollowerList = [];
		emaildata.groupemaillist = [];
		
		for (var i=0; i<this.state.followerList.length; i++) {
			this.state.followerList[i].groupId = x.props.myGroupKeyValue;
			if(this.state.followerList[i].type == 'MEMBER') {
				data.groupFollowerList.push(this.state.followerList[i]);
			} else {
				if(x.props.getCurrentGroupType == '1') {
					emaildata.groupemaillist.push(this.state.followerList[i]);
					emaildata.groupId = x.props.myGroupKeyValue;
					emaildata.invitorId = _GroupConfigTabList_SESSION_MEMBERID;
				}
			}
		}

		ajaxAdd(contextpath + _GroupConfigTabList_GFOLLOWER_INVITE_WITHEMAIL, emaildata , function(z){
			if (z > 0) {
				MsgPopup(z + _GroupConfigTabList_MSG_SENDEMAILRESULTMSG);
			}
			
			ajaxAdd(contextpath + _GroupConfigTabList_BASE_GFOLLOWER_URL_WITHLIST, data, function(y){
				if(y > 0) {
					MsgPopup(y + _GroupConfigTabList_MSG_ADDUSERRESULTMSG);
				}
				x.changeTab1();
				var unmount = React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				if(unmount)
					React.render(<MyGroupFollower groupId={x.props.myGroupKeyValue}/>, document.getElementById('RightUpLevel'));
			});
			
		});
	},
	componentDidMount: function() {
		// back-end에서 개인 설정 데이터 취득후 결과 값 세팅
		this.loadUsingMembersFromServer();
		this.loadManagersFromServer();
	},
    changeTab1:function(){
		this.props.changeTab('GroupConfigTabBase');
	},
	changeTab2:function(){
		this.props.changeTab('GroupConfigTabSetup');
	},
	changeTab3:function(){
		this.props.changeTab('GroupConfigTabFeedDownload');
	},
	changeTab4 : function() {
		this.props.changeTab('GroupConfigTabBase2nd');
	},
	render: function() {
		return (
			<div id="GroupConfigTabBase">
				<div className="search_tabstyle" style={{'marginTop':'10px'}}>
		        	<ul className="malgun13">
		            	<li className="tab_on" style={{'color':'#fe630f'}}><strong>{_GroupConfigTabList_MSG_TABTITLE1}</strong></li>
		                <li className="tab_off" onClick={this.changeTab2}>{_GroupConfigTabList_MSG_TABTITLE2}</li>
		                <li className="tab_off , last_tab" onClick={this.changeTab3}>{_GroupConfigTabList_MSG_TABTITLE3}</li>              
		            </ul>
		        </div>	
		              
		        <div className="set_wrap">
		        	<div className="tableBox" style={{"overflow":"hidden"}}>
		        	<div className="groupset_tab">
			        	<ul>
			            	<li className="gset_on">{_GroupConfigTabList_MSG_SUBTABTITLE1}</li>
			                <li className="gset_off" onClick={this.changeTab4}>{_GroupConfigTabList_MSG_SUBTABTITLE2}</li>
			            </ul>
			        </div>
					<div className="tableBox tblboxsub" style={{'overflow':'hidden'}}>
						<table className="notice_target"><tr>
			             	<td className="malgun13 , nobottom" style={{'lineHeight':'0px', 'textAlign':'left', 'padding':'0px'}}>
			       					<GroupUsingMemberInputList 
									fList={this.state.followerList} removeFollower={this.removeFollower} selectFollower={this.selectFollower}
									getCurrentGroupUserList = {this.getCurrentGroupUserList} getCurrentGroupId = {this.props.myGroupKeyValue}
									getCurrentGroupType = {this.props.getCurrentGroupType}
									/>
							</td></tr>
		        		</table>
					</div>
			        <span className="set_txt" style={{'margin':'30px 0 20px 0px'}}>{_GroupConfigTabList_MSG_GUBUN1}<span id="groupManagerCntWrapper"></span></span>
			        <div className="tableBox tblboxsub">
			            
			            <div className='table_wrap2' style={{'height':'150px', 'overflow':'auto'}}>
			            	<table width='0' border='0' cellSpacing='0' cellPadding='0' style={{'borderTop':'none','borderBottom':'none','border':'0px'}}> 
			            		<colgroup>
				                	<col width="5%" />
				                	<col width="*" />  
				                	<col width="30%" />
				                	<col width="15%" />
				                	<col width="15%" />                                    
			                	</colgroup>
			                    <GroupManagerList groupId = {this.props.myGroupKeyValue} mdata = {this.state.mdata} onDropGroupMember = {this.changeTab1}/>
			        		</table>
			        	</div>	
			        </div>
			        <span className="set_txt" style={{'margin':'30px 0 20px 0px'}}>{_GroupConfigTabList_MSG_GUBUN2}<span id="groupUserCntWrapper"></span></span>
			        <div className="tableBox tblboxsub">
						
			            <div className="table_wrap2" style={{'height':'150px', 'overflow':'auto'}}>
			            	<table cellSpacing='0' cellPadding='0' style={{'borderTop':'none','borderBottom':'none','border':'0px'}}>
			            		<colgroup>
				                	<col width="5%" />
				                	<col width="*" />  
				                	<col width="30%" />
				                	<col width="15%" />
				                	<col width="15%" />                                    
			                	</colgroup>
			                    <GroupUsingMemberList groupId = {this.props.myGroupKeyValue} data = {this.state.data} onDropGroupMember = {this.changeTab1}/>
			       			</table>
			       		</div>
			    	</div>
					</div>
		        </div>
	        </div>
		);
	}
});

var GroupRequestMember = React.createClass({
	getInitialState : function () {
		return {
			memberName					:''
				, groupId 				: ''
				, memberId 				: ''
				, companyName			: ''
				, memberPartName		: ''
				, memberPositionName	: ''
				, regDttm				: ''
			};
	},
	
	leadingZeros : function(n, digits) {
		var zero = '';
	    n = n.toString();
	    if (n.length < digits) {
	        for (i = 0; i < digits - n.length; i++)
	            zero += '0';
	    }
	    return zero + n;
	},
	
	componentDidMount : function () {
		var d = new Date(this.props.regDttm);

	    var titleTimeAgo =
	    	this.leadingZeros(d.getFullYear(), 4) + '-' +
	    	this.leadingZeros(d.getMonth() + 1, 2) + '-' +
	    	this.leadingZeros(d.getDate(), 2);

		this.setState(
				{
					memberName			: this.props.memberName
        	    	,groupId			: this.props.groupId
        	    	,memberId			: this.props.memberId
        	    	, companyName			: this.props.companyName
					, memberPartName		: this.props.memberPartName
					, memberPositionName	: this.props.memberPositionName
					, regDttm			: titleTimeAgo
        		}
			)
    },
	render : function() {
		return (
			<tr>
                <td className="table_check"><input name="memberId" type="checkbox" value={this.state.memberId} />
                </td>
                <td><span className="pic_small"></span></td>
                <td style={{'textAlign':'left'}}>{this.state.memberName}</td>
                <td>{this.state.memberPartName}</td>
                <td>{this.state.memberPositionName}</td>
                <td>{this.state.regDttm}</td>
                <td>{this.state.companyName}</td>                                                    
            </tr>
		);
	}
});

var GroupConfigTabBase2nd  = React.createClass({
	
	getInitialState : function () {
        return { 
        	 getRequestMemberList: []
        };
    },
    
    componentDidMount: function() {
    	this.getReqMember();
    },
    
    getReqMemberResult : function(data) {
    	this.setState({getRequestMemberList : data});
    },

	getReqMember : function(){
		var that = this;
		ajaxGet(contextpath + _GroupConfigTabList_GROUP_WIDGET_MEMBER, {"groupId" : this.props.myGroupKeyValue , "cType" : "standby" }
			, that.getReqMemberResult );
	},
    
    changeTab1:function(){
		this.props.changeTab('GroupConfigTabBase');
	},
	
	changeTab2:function(){
		this.props.changeTab('GroupConfigTabSetup');
	},
	
	changeTab3:function(){
		this.props.changeTab('GroupConfigTabFeedDownload');
	},
	changeTab4 : function() {
		this.props.changeTab('GroupConfigTabBase2nd');
	},
	approveRequestResult : function(data) {
		MsgPopup(_GroupConfigTabList_MSG_MEMCHOOSERESULTMSG1);
		
		//this.setState({getRequestMemberList : data});
		this.changeTab4();
		
	},
	approveRequest : function() {
		var that = this;
		var arr = $("input[name=memberId]:checked").map(function(){
			return this.value;
		}).get();

		if(arr.length == 0) {
			MsgPopup(_GroupConfigTabList_MSG_MEMCHOOSEAPPROVEMSG);
			return;
		}

		var d = {'groupId' : this.props.myGroupKeyValue , 'checkedlist' : arr, 'joinStatus' : 'COMPLETE' };
		ajaxAdd(contextpath + _GroupConfigTabList_GROUP_WIDGET_MEMBER_OK, d , that.approveRequestResult);
	},
	refuseRequest : function() {
		var that = this;
		var arr = $("input[name=memberId]:checked").map(function(){
			return this.value;
		}).get();

		if(arr.length == 0) {
			MsgPopup(_GroupConfigTabList_MSG_MEMCHOOSEREFUSEMSG);
			return;
		}

		var d = {'groupId' : this.props.myGroupKeyValue , 'checkedlist' : arr, 'joinStatus' : 'REJECT' };
		ajaxAdd(contextpath + _GroupConfigTabList_GROUP_WIDGET_MEMBER_OK, d , function(data){
			MsgPopup(_GroupConfigTabList_MSG_MEMCHOOSERESULTMSG2);
			//this.setState({data : data});
			//that.getReqMember();
			that.changeTab4();
		}.bind(this));
	},
	render: function() {
	
		var that = this;
		var groupNodes = [];
		
		if(this.state.getRequestMemberList.length == 0) {
			groupNodes = [<tr><td colSpan="7">{_GroupConfigTabList_MSG_NOREQUESTMEMBERMSG}</td></tr>];
		} else {
			groupNodes = this.state.getRequestMemberList.map(function (group, index) {
				return (
					<GroupRequestMember key={index} memberName={group.memberName} memberId={group.memberId}
					groupId ={group.groupId} companyName={group.companyName} memberPartName={group.memberPartName}
					memberPositionName = {group.memberPositionName} regDttm = {group.regDttm} />
				);
			});
		}
	
		return (
			<div id="GroupConfigTabBase2nd">
				<div className="search_tabstyle" style={{'marginTop':'10px'}}>
		        	<ul className="malgun13">
		            	<li className="tab_on" style={{'color':'#fe630f'}}><strong>{_GroupConfigTabList_MSG_TABTITLE1}</strong></li>
		                <li className="tab_off" onClick={this.changeTab2}>{_GroupConfigTabList_MSG_TABTITLE2}</li>
		                <li className="tab_off , last_tab" onClick={this.changeTab3}>{_GroupConfigTabList_MSG_TABTITLE3}</li>              
		            </ul>
		        </div>	
		              
		        <div className="set_wrap">
		        	<div className="tableBox" style={{"minHeight":"450px", "overflow":"hidden"}}>

			        	<div className="groupset_tab">
				        	<ul>
				            	<li className="gset_off" onClick={this.changeTab1}>{_GroupConfigTabList_MSG_SUBTABTITLE1}</li>
				                <li className="gset_on">{_GroupConfigTabList_MSG_SUBTABTITLE2}</li>
				            </ul>
				        </div>
				        <span className="set_txt" style={{'margin':'30px 0 20px 0px'}}>{_GroupConfigTabList_MSG_SUBTABTITLE3}</span>
				        <div className="tableBox">
				            <table border="0" cellSpacing="0" cellPadding="0">
				                <caption>테이블컨텐츠</caption>                
				                <colgroup>
				                  <col width="5%" />
				                  <col width="5%" />
				                  <col width="*" />  
				                  <col width="20%" />
				                  <col width="20%" />
				                  <col width="20%" />
				                  <col width="20%" />                                      
				                </colgroup>
				                	<thead>
				                  	<th colSpan="3">{_GroupConfigTabList_MSG_TAB1SUBTAB1COLUMN1}</th>                      
				                          <th>{_GroupConfigTabList_MSG_TAB1SUBTAB1COLUMN2}</th>
				                          <th>{_GroupConfigTabList_MSG_TAB1SUBTAB1COLUMN3}</th>
				                    	  <th>{_GroupConfigTabList_MSG_TAB1SUBTAB1COLUMN4}</th> 
				                    	  <th className="no_rightline">{_GroupConfigTabList_MSG_TAB1SUBTAB1COLUMN5}</th>                   
				                    </thead>       
				                    <tbody>
				                    {groupNodes}
				                    </tbody>
				           </table>
				        </div>
					</div>
					<div className="btn_gslist">
						<button onClick={this.approveRequest} style={{'marginRight':'10px'}} className="btn-m btn-attention">{_GroupConfigTabList_MSG_APPROVALBTNTEXT}</button>
						<button onClick={this.refuseRequest} style={{'marginRight':'10px'}} className="btn-m btn-default">{_GroupConfigTabList_MSG_REFUSALBTNTEXT}</button>
				    </div>
		        </div>
	        </div>
		);
	}
});

var GroupConfigTabSetup  = React.createClass({
	closePop : function() {
		$('#GroupConfigPop').bPopup({
			onClose : function(){
				document.body.style.overflow = "visible";
				$("html").css("overflow-y","scroll");
			}
		}).close();
	},
	saveGroupImage : function() {
		var o = this;
		var formData = new FormData($('form#groupConfigForm')[0]);
		formData.append("groupimage", $("input[name=groupimage]")[0].files[0]);
		
		$.ajax({
			url: contextpath + _GroupConfigTabList_FILE_UPLOAD_AJAX,
			data:formData,
			cache : false,
			processData:false,
			contentType:false,
			type:'POST',
			success:function(data){
				o.setImgSrc(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				  if(jqXHR.status == 500) {
			    	  MsgPopup("관리자에게 문의하세요.");
				  } else if(jqXHR.status == 401) {
					  window.location.href = "/";
				  } else {
					  var resText = jQuery.parseJSON(jqXHR.responseText)
					  MsgPopup(resText.msg);
				  }
			}
		});	
	},
	setImgSrc : function(data) {
		var src = contextpath + _GroupConfigTabList_GROUP_PIC_TEMP + '?groupTempPicUrl=' + data.fileUrl;
		
		React.findDOMNode(this.refs.grpImgArea).src = src;
		React.findDOMNode(this.refs.groupImgUrl).value = src;
		React.findDOMNode(this.refs.feedFileVo).value = JSON.stringify(data);
	},
	getInitialState : function () {
		return {data : [], isGroupMng : false};
    },
    loadOneGroupFromServer : function() {
    	var o = this;
    	ajaxGet(contextpath + _GroupConfigTabList_BASE_GROUP + '/' + this.props.myGroupKeyValue , {}, function(data){
			this.setState({data : data});
			if (data.fileRepoId == undefined || data.fileRepoId == null) {
				React.findDOMNode(o.refs.fileRepoId).value = "";
				$("#shpChkBox").prop("checked",false);
			} else {
				React.findDOMNode(o.refs.fileRepoId).value = data.fileRepoId;
				$("#shpChkBox").prop("checked",true);
     			$("#grpFileRepoId").attr('readonly', true);
			}

			//React.findDOMNode(o.refs.grpImgArea).src = data.groupImgUrl;
			React.findDOMNode(o.refs.groupImgUrl).value = data.groupImgUrl !== undefined ? data.groupImgUrl : '';
			React.findDOMNode(o.refs.targetId).value = data.targetId;
			React.findDOMNode(o.refs.targetType).value = data.targetType;
			React.findDOMNode(o.refs.groupName).value = data.groupName;
			React.findDOMNode(o.refs.description).value = data.description;
			React.findDOMNode(o.refs.ispublic1).checked = data.isPublic == '1' ? true : false;
			React.findDOMNode(o.refs.ispublic0).checked = data.isPublic == '0' ? true : false;
			React.findDOMNode(o.refs.isAutoJoin1).checked = data.isAutoJoin == '1' ? true : false;
			React.findDOMNode(o.refs.isAutoJoin0).checked = data.isAutoJoin == '0' ? true : false;
			$('#dummyifr').attr("src", contextpath + _GroupConfigTabList_GROUP_PIC + '?groupId=' + data.groupId).load(function(){
				React.findDOMNode(o.refs.grpImgArea).src = contextpath + _GroupConfigTabList_GROUP_PIC + '?groupId=' + data.groupId
			});
			
			ajaxGet(contextpath + _GroupConfigTabList_BASE_GFOLLOWER_URL
					, {"groupId" : data.groupId, "memberId" : _GroupConfigTabList_session_memberId}, this.checkGroupManager);
		}.bind(this));
	},
	
	checkGroupManager : function(data) {
		var isGroupMng = false;
		
		if(typeof data == "undefined") {
			isGroupMng = false;
		} else if(data.length == 0) {
			isGroupMng = false;
		} else {
			data.map(
				function (groupFollower) {
					
					if(groupFollower.isGroupMng == '1'){
						isGroupMng = true;
					}
				
				}
			);
		}
		
		this.setState({
			isGroupMng : isGroupMng
		});

	},
	
	deleteGroup : function() {
		var self = this;
		var currGroupId = this.state.data.groupId;
		var currGroupName = this.state.data.groupName;
		ConfirmPopup(_GroupConfigTabList_MSG_CONFIRMDELGROUPMSG , function(){
			ajaxDelByJson( contextpath + _GroupConfigTabList_BASE_GROUP + '/' + currGroupId , {}, function(x){
				MsgPopup(currGroupName + _GroupConfigTabList_MSG_DELGROUPRESULTMSG);
				//document.location.reload(true);
				
				self.GoBackToHeaven();
				
			});
		}, 'okcancel');
	},
	
	GoBackToHeaven : function() {
		this.closePop();
		comeBackHome();
		
		// 오른쪽 메뉴 추천 그룹 리스트
		React.unmountComponentAtNode(document.getElementById('RecommendGroup'));
		React.render(<RecommendGroup/>, document.getElementById('RecommendGroup'));


		// 오른쪽 메뉴 신규 그룹 리스트
		React.unmountComponentAtNode(document.getElementById('NewGroup'));
		React.render(<NewGroup/>, document.getElementById('NewGroup'));
	},
	
	saveGroupChange : function() {
		$.fn.serializeObject = function()
		{
		   var o = {};
		   var a = this.serializeArray();
		   $.each(a, function() {
		       if (o[this.name]) {
		           if (!o[this.name].push) {
		               o[this.name] = [o[this.name]];
		           }
		           o[this.name].push(this.value || '');
		       } else {
		           o[this.name] = this.value || '';
		       }
		   });
		   return o;
		};
		
		var frmData = $('form#groupConfigForm').serializeObject();
		
		/*if(frmData.fileRepoId == "")
			delete frmData.fileRepoId;
		console.log(frmData);
		//return ;
*/		
		if(React.findDOMNode(this.refs.feedFileVo).value != '')
			frmData.feedFileVo = eval("("+ React.findDOMNode(this.refs.feedFileVo).value +")");
		
		ajaxUpd(contextpath + _GroupConfigTabList_BASE_GROUP, frmData , function(v){
		
			if(v.groupId == 0) {
				MsgPopup(_GroupConfigTabList_MSG_CHKGROUPNAMEMSG);
				return false;
			}
		
			MsgPopup(_GroupConfigTabList_MSG_GROUPSAVERESULTMSG);
			closeGroupConfigPop();
			React.unmountComponentAtNode(document.getElementById('head_contents'));
			React.render(<GroupHead groupId={v.groupId} />, document.getElementById('head_contents'));
		
			React.unmountComponentAtNode(document.getElementById('mygrp'));
			React.render(<MyGroup/>, document.getElementById('mygrp'));
			reRenderingRecommendGroupList();
			reRenderingNewGroupList();
			
		});
	},

	groupNameChk : function() {
		var currGnval = this.state.data.groupName;
		var gnval = React.findDOMNode(this.refs.groupName).value;
		if(gnval == currGnval) {
			$(React.findDOMNode(this.refs.grpNameChkMgs)).html('');
			return false;
		}
		if(gnval.trim() == "") {
			$(React.findDOMNode(this.refs.grpNameChkMgs)).html(_GroupConfigTabList_MSG_CHKGROUPNAMEISNULLMSG);
			return false;
		}
		var baseurl = contextpath + _GroupConfigTabList_BASE_GROUP_NAME;
		var jsondata = {'groupName' : gnval };
		ajaxGet(baseurl, jsondata, this.groupNameChkResult);
	},
	
	groupNameChkResult : function(data) {
		if( React.findDOMNode(this.refs.groupName).value == data.groupName){
			$(React.findDOMNode(this.refs.grpNameChkMgs)).html(_GroupConfigTabList_MSG_GROUPNAMEISEXISTMSG);
			$(React.findDOMNode(this.refs.groupName)).focus();
		}else{
			$(React.findDOMNode(this.refs.grpNameChkMgs)).html(_GroupConfigTabList_MSG_GROUPNAMEISNOTEXISTMSG);
		}
	},
	
	componentDidMount: function() {
		// back-end에서 개인 설정 데이터 취득후 결과 값 세팅
		this.checkSharepointCheckbox();
		this.loadOneGroupFromServer();
	},
	changeTab1:function(){
		this.props.changeTab('GroupConfigTabBase');
	},
	checkSharepointCheckboxLabel:function() {
		if ($("#shpChkBox").prop("checked") == true) {
			$("#shpChkBox").prop("checked",false);
			$("#grpFileRepoId").val("");
		} else {
			$("#shpChkBox").prop("checked",true);
			this.openSharepointDoc();
		}
	},
	checkSharepointCheckbox:function() {
		if ($('#shpChkBox').is(':checked')) {
			this.openSharepointDoc();
		} else {
			$("#grpFileRepoId").val("");
		}
	},
	openSharepointDoc:function(){
		openSharepointDocPop("grpFileRepoId", "FOLDER");
	},
	changeTab2:function(){
		this.props.changeTab('GroupConfigTabSetup');
	},
	changeTab3:function(){
		this.props.changeTab('GroupConfigTabFeedDownload');
	},
	render: function() {
		var groupDeleteBtn =
				(this.state.isGroupMng || _GroupConfigTabList_isSysAdmin == '1')
				? <button className="btn-m btn-attention" onClick={this.deleteGroup}>{_GroupConfigTabList_MSG_DELGROUPBTNTEXT}</button>
				: '';
		
		return (
			<div id="GroupConfigTabSetup">
				<div className="search_tabstyle" style={{'marginTop':'10px'}}>
		        	<ul className="malgun13">
		            	<li className="tab_off" onClick={this.changeTab1}>{_GroupConfigTabList_MSG_TABTITLE1}</li>
		                <li className="tab_on"  style={{'color':'#fe630f'}}><strong>{_GroupConfigTabList_MSG_TABTITLE2}</strong></li>
		                <li className="tab_off , last_tab" onClick={this.changeTab3}>{_GroupConfigTabList_MSG_TABTITLE3}</li>              
		            </ul>
		        </div>	
		        <form encType="multipart/form-data" id="groupConfigForm">
		        <div className="tableBox" style={{ "overflow":"hidden", "margin" : "20px 0"}}>
			        <div className="set_manage">
				        <dl style={{'paddingLeft':'0'}}>
				            <dt>{_GroupConfigTabList_MSG_TAB2COLUMN1}</dt>
				            <dd>
				            	<ul>
				                	<li className="pic_sm"><img ref="grpImgArea" id="grpImgArea" width="80" style={{'maxHeight':'80px'}} /></li>
				                    <li className="btn_selectfile"><input type="file" name="groupimage" id="groupimage" onChange={this.saveGroupImage} />
									<input type="text" ref="groupImgUrl" name="groupImgUrl" />
									<iframe id="dummyifr" src="" style={{'display':'none'}}></iframe>
									<input type="hidden" ref="groupId" name="groupId" value={this.state.data.groupId} />
									<input type="hidden" ref="feedFileVo" />
									</li>
				                    <li className="file_subtxt">{_GroupConfigTabList_MSG_TAB2COLUMN1TEXT1}</li>
				                </ul>
				            </dd>
				        </dl>
				        <dl style={{'marginTop':'28px', 'height':'55px'}}>
				            <dt>{_GroupConfigTabList_MSG_TAB2COLUMN2}</dt>
				            <dd className="g_name" style={{'width':'220px'}}><input name="groupName" ref="groupName" type="text" placeholder={_GroupConfigTabList_MSG_TAB2COLUMN2TEXT1} onChange={this.groupNameChk} /></dd>
				            <dd className="g_txt" ref="grpNameChkMgs" style={{'color':'#06F', 'width':'165px'}}></dd>
				        </dl> 
				        <dl style={{'marginTop':'28px', 'height':'120px'}}>
				            <dt>{_GroupConfigTabList_MSG_TAB2COLUMN3}</dt>
				            <dd className="group_name"><textarea name="description" ref="description" cols="" rows="" placeholder={_GroupConfigTabList_MSG_TAB2COLUMN3TEXT1} />
				            </dd>
				        </dl>
				        <dl style={{'marginTop':'28px', 'height':'115px'}}>
				            <dt>{_GroupConfigTabList_MSG_TAB2COLUMN4}</dt>
				            <dd>
				            	<ul>
				                	<li className="pic_sm" style={{'width':'10px'}}><input id="shpChkBox" name="shpChkBox" type="checkbox" value="" onClick={this.checkSharepointCheckbox} /></li>
				                    <li className="malgun13" onClick={this.checkSharepointCheckboxLabel}>{_GroupConfigTabList_MSG_TAB2COLUMN4TEXT1}</li>
				                    <li className="malgun13" style={{'marginTop':'18px', 'marginLeft':'2px'}}>{_GroupConfigTabList_MSG_TAB2COLUMN4TEXT2}</li>
				                    <li className="group_name"  style={{'marginTop':'5px'}}><input ref="fileRepoId" id="grpFileRepoId" name="fileRepoId" type="text" onClick={this.checkSharepointCheckboxLabel}/></li>
									<input type='hidden' ref='targetId' id='targetId' name='targetId' value='' />
									<input type='hidden' ref='targetType' id='targetType'  name='targetType' value='' />
				                </ul>
				             </dd>
				        </dl> 
				        <dl style={{'marginTop':'20px', 'height':'115px'}}>
				            <dt>{_GroupConfigTabList_MSG_TAB2COLUMN5}</dt>
				            <dd>
				            	<ul className="lineset">
				                	<li className="pic_sm" style={{'width':'10px'}}><input name="isPublic" id="ispublic1" ref="ispublic1" type="radio" value="1" /></li>
				                    <li className="malgun13"><label htmlFor="ispublic1">{_GroupConfigTabList_MSG_TAB2COLUMN5TEXT1}</label></li>
				                    <li className="pic_sm" style={{'width':'10px'}}><input name="isPublic" id="ispublic0" ref="ispublic0" type="radio" value="0" /></li>
				                    <li className="malgun13"><label htmlFor="ispublic0">{_GroupConfigTabList_MSG_TAB2COLUMN5TEXT2}</label></li>
									<li className="pic_sm" style={{'width':'10px','display':'none'}}><input name="" type="checkbox" value="" /></li>
				                    <li className="malgun13" style={{'display':'none'}}>그룹 이름도 비공개</li>                            
				                </ul>
				             </dd>
				        </dl>  
				        <dl style={{'marginTop':'20px', 'height':'85px'}}>
				            <dt>{_GroupConfigTabList_MSG_TAB2COLUMN6}</dt>
				            <dd>
				            	<ul className="lineset">
				                	<li className="pic_sm" style={{'width':'10px'}}><input name="isAutoJoin" id="isAutoJoin1" ref="isAutoJoin1" type="radio" value="1" /></li>
				                    <li className="malgun13"><label htmlFor="isAutoJoin1">{_GroupConfigTabList_MSG_TAB2COLUMN6TEXT1}</label></li>
				                    <li className="pic_sm" style={{'width':'10px'}}><input name="isAutoJoin" id="isAutoJoin0" ref="isAutoJoin0" type="radio" value="0" /></li>
				                    <li className="malgun13"><label htmlFor="isAutoJoin0">{_GroupConfigTabList_MSG_TAB2COLUMN6TEXT2}</label></li>                         
				                </ul>
				             </dd>
				        </dl>                                                                              
					</div>
		        </div>
		        </form>
				<div className="pop-modalwindow-btn-area">
					<button style={{'marginRight':'10px'}} className="btn-m btn-attention" onClick={this.saveGroupChange}>{_GroupConfigTabList_MSG_CONFIRMGROUPCHANGEBTNTEXT}</button>
					{groupDeleteBtn}
				</div>
			</div>
		);
	}
});


var GroupConfigTabFeedDownload  = React.createClass({
	getInitialState : function () {
        return { gList : null };
    },
    startDatePicker : function() {
    	$('#date_from').combodate({
    		minYear : 2015
    	});
    	$('#date_to').combodate({
    		minYear : 2015
    	});
    	$("#date_from").datepicker({
			buttonImage: '../images/icon_calendal.png',
        	buttonImageOnly: true,
			showOn : 'both',
			onSelect: function(dateText, inst) {
				$("#fromWrapper").find("select.year").val(inst.selectedYear);
				$("#fromWrapper").find("select.month").val(inst.selectedMonth);
				$("#fromWrapper").find("select.day").val(inst.selectedDay);
        	}
		});
    	$("#date_to").datepicker({
			buttonImage: '../images/icon_calendal.png',
        	buttonImageOnly: true,
			showOn : 'both',
			onSelect: function(dateText, inst) {
				$("#toWrapper").find("select.year").val(inst.selectedYear);
				$("#toWrapper").find("select.month").val(inst.selectedMonth);
				$("#toWrapper").find("select.day").val(inst.selectedDay);
        	}
		});
    },
	componentDidMount: function() {
		this.startDatePicker();
		React.findDOMNode(this.refs.pchooser1).checked = true;
		React.findDOMNode(this.refs.groupId).value = this.props.myGroupKeyValue;
		$("input[name=cType]").on('click',function(){
			if($(this).val() == 0) {
				$('#date_from').combodate('setValue', _GroupConfigTabList_NOW);
				$('#date_to').combodate('setValue', _GroupConfigTabList_NOW);
			}
		});
	},
	startFeedDownload : function() {
		var sDateStr = $("form#feedDownloadFrm input[name=startDate]").val();
		var eDateStr = $("form#feedDownloadFrm input[name=endDate]").val();
		var sDate = new Date(sDateStr);
		var eDate = new Date(eDateStr);
		
		if ($("form#feedDownloadFrm").find(':radio[name="cType"]:checked').val() == '0') {
			if((sDate instanceof Date && isFinite(sDate)) && (eDate instanceof Date && isFinite(eDate))) {
				if(sDate > eDate) {
					MsgPopup(_GroupConfigTabList_MSG_DATECHOOSEERRMSG1);
					return;
				}
			} else {
				MsgPopup(_GroupConfigTabList_MSG_DATECHOOSEERRMSG2);
				return;
			}
		}
		
		$('iframe#dummyifr').attr("src", contextpath + _GroupConfigTabList_GFOLLOWER_FEED_DOWNLOAD2 + '?' + $("form#feedDownloadFrm").serialize()).load(function(){
			
		});
		
		//$('iframe#dummyifr').attr("src", contextpath + _GroupConfigTabList_GFOLLOWER_FEED_DOWNLOAD + '?' + $("form#feedDownloadFrm").serialize()).load(function(){
			
		//});
		
		//ajaxGet(contextpath + _GroupConfigTabList_GFOLLOWER_FEED_DOWNLOAD
		//		, $("form#feedDownloadFrm").serialize()
		//		, function(data){
		//	MsgPopup(JSON.stringify(data));
		//});
	},
	changeTab1:function(){
		this.props.changeTab('GroupConfigTabBase');
	},
	changeTab2:function(){
		this.props.changeTab('GroupConfigTabSetup');
	},
	changeTab3:function(){
		this.props.changeTab('GroupConfigTabFeedDownload');
	},
	render: function() {
		return (
			<div id="GroupConfigTabFeedDownload">
		        <div className="search_tabstyle" style={{'marginTop':'10px'}}>
		        	<ul className="malgun13">
		            	<li className="tab_off" onClick={this.changeTab1}>{_GroupConfigTabList_MSG_TABTITLE1}</li>
		                <li className="tab_off" onClick={this.changeTab2}>{_GroupConfigTabList_MSG_TABTITLE2}</li>
		                <li className="tab_on last_tab"  style={{'color':'#fe630f'}}><strong>{_GroupConfigTabList_MSG_TABTITLE3}</strong></li>              
		            </ul>
		        </div>	
		        
		        <div className="set_wrap">  
		        	<form className="configForm" id="feedDownloadFrm">
			        	<div className="set_manage">
					        <dl style={{'borderBottom':'none', 'height':'76px', 'paddingLeft':'0'}}>
			                    <dt><input type="hidden" name="groupId" ref="groupId" /></dt>
			                    <dd>
			                        <ul className="lineset" style={{'margin' : '20px'}}>
			                        	<li className="pic_sm"><input id="pchooser1" ref="pchooser1" name="cType" type="radio" value="1" /></li>
			                            <li className="malgun13"><label htmlFor="pchooser1">{_GroupConfigTabList_MSG_TAB3COLUMN1TEXT1}</label></li>
			                            <li className="pic_sm"><input id="pchooser0" ref="pchooser0" name="cType" type="radio" value="0" /></li>
			                            <li className="malgun13"><label htmlFor="pchooser0">{_GroupConfigTabList_MSG_TAB3COLUMN1TEXT2}</label></li>                          
			                        </ul>
			                    </dd>
			                </dl>
			                <ul className="calendal_area" style={{'marginLeft':'13px'}}>
			                	<li id="fromWrapper">
			                		<input id="date_from" data-format="YYYY-MM-DD" data-template="YYYY MM DD" name="startDate" type="text" />
			                	</li>
			                    <li>~</li> 
			                    <li id="toWrapper">
			                		<input id="date_to" data-format="YYYY-MM-DD" data-template="YYYY MM DD" name="endDate" type="text" />
			                	</li>                                                         
			                </ul>
			        	</div>
			        </form>
					<iframe id="dummyifr" src="" style={{'display':'none'}}></iframe>
	            </div>          
				<div className="pop-modalwindow-btn-area">
					<button className="btn-m btn-attention" onClick={this.startFeedDownload}>{_GroupConfigTabList_MSG_TAB3DOWNLOADBTNTEXT}</button>
				</div>     
			</div>
		);
	}
});

var bGroupConfigPop = null;

function closeGroupConfigPop(){
	var unmount = React.unmountComponentAtNode(document.getElementById('GroupConfigTabPopup'));
	
	if(bGroupConfigPop != null)
		bGroupConfigPop.close();
}

function openGroupConfigPop(v){
	React.unmountComponentAtNode(document.getElementById('GroupConfigTabPopup'));
	React.render(<GroupConfigTab myGroupKeyValue={v.groupId} myGroupType={v.groupType} />, document.getElementById('GroupConfigTabPopup'));
	
	bGroupConfigPop = $('#GroupConfigPop').bPopup({
		modalClose: false,
    	opacity: 0.6
    	,positionStyle: 'fixed'
    	, onOpen : function() {
			document.body.style.overflow = "hidden";
			$("html").css("overflow-y","hidden");
			$('#GroupConfigPop').draggable({ handle: "div.pop-modalwindow-header" });
		}
		, onClose : function(){
			document.body.style.overflow = "visible";
			$("html").css("overflow-y","scroll");
		}
	});
}
