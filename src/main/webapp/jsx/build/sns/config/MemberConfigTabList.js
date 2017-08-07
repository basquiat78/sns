	var MemberConfigTab  = React.createClass({displayName: "MemberConfigTab",
		getInitialState : function () {
			return {data : []};
        },
		
		componentDidMount: function() {
			React.render(React.createElement(MemberConfigTabBase, {changeTab: this.changeTab, onConfigSubmit: this.handleConfigSubmit})
				, document.getElementById('MemberConfigTabList'));
		},

		handleConfigSubmit : function(conf) {
			ajaxAdd(contextpath + _MemberConfigTabList_BASE_NOTI_CONFIG, conf, function(data){
				MsgPopup(_MemberConfigTabList_MSG_DEFAULTSAVEMSG);
			});
		},

		changeTab: function(tabId){
			React.unmountComponentAtNode(document.getElementById('MemberConfigTabList'));
			if(tabId == 'MemberConfigTabBase'){
				$('div#MemberConfigPop .click_popup').css('overflow','auto');
				
				React.render(React.createElement(MemberConfigTabBase, {changeTab: this.changeTab, onConfigSubmit: this.handleConfigSubmit})
				, document.getElementById('MemberConfigTabList'));
			}else if(tabId == 'MemberConfigTabGroup'){
				$('div#MemberConfigPop .click_popup').css('overflow','auto');
				
				React.render(React.createElement(MemberConfigTabGroup, {changeTab: this.changeTab}), document.getElementById('MemberConfigTabList'));
			}else if(tabId == 'MemberConfigTabInterface'){
				$('div#MemberConfigPop .click_popup').css('overflow','auto');
			
				React.render(React.createElement(MemberConfigTabInterface, {changeTab: this.changeTab}), document.getElementById('MemberConfigTabList'));
			}
				
		},
		
		render: function() {
			return (
				React.createElement("div", {className: "feed_wrap"}, 
					React.createElement("dl", {className: "result_feed_gate"}, 
			    	    React.createElement("dt", {style: {'width':'150px'}}, _MemberConfigTabList_MSG_TITLE), 
		        	        React.createElement("dd", {className: "find_box"}, 
		        	        	React.createElement("ul", {style: {'display' : 'none'}}, 
		        	        		React.createElement("li", null, React.createElement("input", {style: {'borderRight':'0'}, name: "", type: "text", placeholder: "Find"})), 
		        	           		React.createElement("li", {className: "btn_find"})
		        	        	)
		        	    	)
			    	), 
					React.createElement("div", {id: "MemberConfigTabList"})
				)
			);
		}
	});
	
	var MemberConfigTabBase  = React.createClass({displayName: "MemberConfigTabBase",
		getInitialState : function () {
	        return { gList : null };
        },
		
		componentDidMount: function() {
			var o = this;
			// back-end에서 개인 설정 데이터 취득후 결과 값 세팅
			var baseurl = contextpath + _MemberConfigTabList_BASE_NOTI_CONFIG + '/' + _MemberConfigTabList__SESSION_MEMBERID;
			//var jsondata = {};
			//var dataLen = 0;
			ajaxGet(baseurl, {}, function(data){
				/*if (data == null) {
					return;
				}
				dataLen = Object.keys(data).length;*/
				
				React.findDOMNode(o.refs.isGroupAct).checked = data.isGroupAct == '1' ? true : false;
				React.findDOMNode(o.refs.isGroupNewFeed).checked = data.isGroupNewFeed == '1' ? true : false;
				React.findDOMNode(o.refs.isFeedFollow).checked = data.isFeedFollow == '1' ? true : false;
				React.findDOMNode(o.refs.isFeedComment).checked = data.isFeedComment == '1' ? true : false;
				React.findDOMNode(o.refs.isFeedLikeIt).checked = data.isFeedLikeIt == '1' ? true : false;
				React.findDOMNode(o.refs.isFeedFollowed).checked = data.isFeedFollowed == '1' ? true : false;
				React.findDOMNode(o.refs.isToDoComing).checked = data.isToDoComing == '1' ? true : false;
				React.findDOMNode(o.refs.isApproval).checked = data.isApproval == '1' ? true : false;
				React.findDOMNode(o.refs.isEnter).checked = data.isEnter == '1' ? true : false;
			});
			
			/*if (dataLen == 0) {
				React.findDOMNode(o.refs.isGroupAct).checked = true;
				React.findDOMNode(o.refs.isGroupNewFeed).checked = true;
				React.findDOMNode(o.refs.isFeedFollow).checked = true;
				React.findDOMNode(o.refs.isFeedComment).checked = true;
				React.findDOMNode(o.refs.isFeedLikeIt).checked = true;
				React.findDOMNode(o.refs.isFeedFollowed).checked = true;
				React.findDOMNode(o.refs.isToDoComing).checked = true;
				React.findDOMNode(o.refs.isApproval).checked = true;
				React.findDOMNode(o.refs.isEnter).checked = true;
			}*/
		},
		
		changeTab1:function(){
			this.props.changeTab('MemberConfigTabBase');
		},
		
		changeTab2:function(){
			this.props.changeTab('MemberConfigTabGroup');
		},
		
		changeTab3:function(){
			this.props.changeTab('MemberConfigTabInterface');
		},
		
		checkLabel :function(ev){
			var $chk = $(ev.target).parent().find('input:checkbox');
			if ($chk.prop("checked") == true) {
				$chk.prop("checked", false) 
			} else {
				$chk.prop("checked", true)
			}
		},
		
		handleSubmit : function(e) {
			e.preventDefault();
			var memberId = React.findDOMNode(this.refs.memberId).value.trim();
			var isGroupAct = React.findDOMNode(this.refs.isGroupAct).checked ? 1 : 0;
			var isGroupNewFeed = React.findDOMNode(this.refs.isGroupNewFeed).checked ? 1 : 0;
			var isFeedFollow = React.findDOMNode(this.refs.isFeedFollow).checked ? 1 : 0;
			var isFeedComment = React.findDOMNode(this.refs.isFeedComment).checked ? 1 : 0;
			var isFeedLikeIt = React.findDOMNode(this.refs.isFeedLikeIt).checked ? 1 : 0;
			var isFeedFollowed = React.findDOMNode(this.refs.isFeedFollowed).checked ? 1 : 0;
			var isToDoComing = React.findDOMNode(this.refs.isToDoComing).checked ? 1 : 0;
			var isApproval = React.findDOMNode(this.refs.isApproval).checked ? 1 : 0;
			var isEnter = React.findDOMNode(this.refs.isEnter).checked ? 1 : 0;
			
			// 엔터키 등록키 전역변수 변경
			_Grobal_isEnterKeyReg = isEnter;
			
			this.props.onConfigSubmit({
				memberId : memberId, isGroupAct : isGroupAct
				, isGroupNewFeed : isGroupNewFeed, isFeedFollow : isFeedFollow, isFeedComment : isFeedComment 
				, isFeedLikeIt : isFeedLikeIt , isFeedFollowed : isFeedFollowed 
				, isToDoComing : isToDoComing , isApproval : isApproval, isEnter : isEnter
			});
			return;
		},
		render: function() {
			return (
				React.createElement("div", {id: "MemberConfigTabBase"}, 
					React.createElement("div", {className: "search_tabstyle"}, 
			        	React.createElement("ul", {className: "malgun13"}, 
			            	React.createElement("li", {className: "tab_on", style: {'color':'#fe630f'}}, React.createElement("strong", null, _MemberConfigTabList_MSG_TABTITLE1)), 
			                React.createElement("li", {className: "tab_off", onClick: this.changeTab2}, _MemberConfigTabList_MSG_TABTITLE2), 
			                React.createElement("li", {className: "tab_off , last_tab", style: {'display':'none'}, onClick: this.changeTab3}, _MemberConfigTabList_MSG_TABTITLE3)
			            )
			        ), 	
			              
			        React.createElement("div", {className: "set_wrap"}, 
			        	React.createElement("form", {className: "configForm"}, 
				            React.createElement("span", {className: "set_txt"}, _MemberConfigTabList_MSG_TAB1LIST1TITLE), 
				            React.createElement("ul", {className: "setBox"}, 
				                React.createElement("li", {style: {'marginTop':'3px'}}, React.createElement("input", {ref: "isEnter", type: "checkbox", value: "1"}), 
									
									React.createElement("input", {ref: "memberId", type: "hidden", value: _MemberConfigTabList__SESSION_MEMBERID})
								
								), 
				                React.createElement("li", {onClick: this.checkLabel}, _MemberConfigTabList_MSG_TAB1LIST1SUBTITLE1)
				            ), 
				            React.createElement("span", {className: "set_txt"}, _MemberConfigTabList_MSG_TAB1LIST2TITLE), 
				            React.createElement("ul", {className: "setBox"}, 
				                React.createElement("li", {style: {'marginTop':'3px'}}, React.createElement("input", {ref: "isGroupAct", type: "checkbox", value: "1"})), 
				                React.createElement("li", {onClick: this.checkLabel}, _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE1)
				            ), 
				            React.createElement("ul", {className: "setBox"}, 
				                React.createElement("li", {style: {'marginTop':'3px'}}, React.createElement("input", {ref: "isGroupNewFeed", type: "checkbox", value: "1"})), 
				                React.createElement("li", {onClick: this.checkLabel}, _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE2)
				            ), 
				            React.createElement("ul", {className: "setBox"}, 
				                React.createElement("li", {style: {'marginTop':'3px'}}, React.createElement("input", {ref: "isFeedFollow", type: "checkbox", value: "1"})), 
				                React.createElement("li", {onClick: this.checkLabel}, _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE3)
				            ), 
				            React.createElement("ul", {className: "setBox"}, 
				                React.createElement("li", {style: {'marginTop':'3px'}}, React.createElement("input", {ref: "isFeedComment", type: "checkbox", value: "1"})), 
				                React.createElement("li", {onClick: this.checkLabel}, _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE4)
				            ), 
				            React.createElement("ul", {className: "setBox"}, 
				                React.createElement("li", {style: {'marginTop':'3px'}}, React.createElement("input", {ref: "isFeedLikeIt", type: "checkbox", value: "1"})), 
				                React.createElement("li", {onClick: this.checkLabel}, _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE5)
				            ), 
				            React.createElement("ul", {className: "setBox"}, 
				                React.createElement("li", {style: {'marginTop':'3px'}}, React.createElement("input", {ref: "isFeedFollowed", type: "checkbox", value: "1"})), 
				                React.createElement("li", {onClick: this.checkLabel}, _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE7)
				            ), 
				            React.createElement("ul", {className: "setBox"}, 
				                React.createElement("li", {style: {'marginTop':'3px'}}, React.createElement("input", {ref: "isToDoComing", type: "checkbox", value: "1"})), 
				                React.createElement("li", {onClick: this.checkLabel}, _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE8)
				            ), 
				            React.createElement("ul", {className: "setBox"}, 
				                React.createElement("li", {style: {'marginTop':'3px'}}, React.createElement("input", {ref: "isApproval", type: "checkbox", value: "1"})), 
				                React.createElement("li", {onClick: this.checkLabel}, _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE9)
				            )
							
			            )
			        ), 
					React.createElement("div", {className: "pop-modalwindow-btn-area"}, 
						React.createElement("button", {className: "btn-m btn-attention", onClick: this.handleSubmit}, _MemberConfigTabList_MSG_TAB1SAVEBTNTEXT)
					)
		        )
			);
		}
	});
	

	function convertTimestamp(timestamp) {
		  var d = new Date(timestamp),	// Convert the passed timestamp to milliseconds
				yyyy = d.getFullYear(),
				mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
				dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
				hh = d.getHours(),
				h = hh,
				min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
				ampm = 'AM',
				time;
					
			if (hh > 12) {
				h = hh - 12;
				ampm = 'PM';
			} else if (hh === 12) {
				h = 12;
				ampm = 'PM';
			} else if (hh == 0) {
				h = 12;
			}
			
			// ie: 2013-02-18, 8:35 AM	
			time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
				
			return time;
	}
	
	var MemberGroup = React.createClass({displayName: "MemberGroup",
		getInitialState : function () {
			return {
					groupName				:''
					, regDttm 				: ''
					, isPublic 				: ''
					, isApproval 			: ''
					, groupId 				: ''
					, groupType				: ''
					, groupFollowerList		: []
    			};
    	},
		componentDidMount : function () {
			this.setState(
					{
	        	    	groupName				: this.props.groupName
	        	    	,regDttm				: this.props.regDttm
	        	    	,isPublic				: this.props.isPublic
	        	    	,isApproval				: this.props.isApproval
	        	    	,groupId				: this.props.groupId
	        	    	,groupType				: this.props.groupType
	        	    	,groupFollowerList	 	: this.props.groupFollowerList
	        		}
				)
        },
        
		dropResult : function(v) {
			this.props.onGroupLeave();
			reGroupList();
			reRenderingNewGroupList();
		},
		
		getMemberSyncKey : function(data){
			var syncKey = data.syncKey;
			var jsondata = {
        		"groupId" : this.state.groupId,
        		"syncKey" : syncKey
        	};
			
			var self = this;
			
			var groupMemberArr = [];
			var groupManagerArr = [];
			self.state.groupFollowerList.map(function (v) {
				if(v.joinStatus == 'COMPLETE') {
					if(v.isGroupMng == '1') {
						groupManagerArr.push(v);
					} else {
						groupMemberArr.push(v);
					}
				}
			});
			
			var GROUPLEAVECONFIRMMSG = _MemberConfigTabList_MSG_GROUPLEAVECONFIRMMSG;
			
			if(groupMemberArr.length > 0 && groupManagerArr.length == 1
				&& _MemberConfigTabList__SESSION_MEMBERID == groupManagerArr[0].memberId
				) {
				GROUPLEAVECONFIRMMSG = _MemberConfigTabList_MSG_MGRMUSTBEEXISTMSG;
				MsgPopup(GROUPLEAVECONFIRMMSG);
				return;
			} else if(groupMemberArr.length == 0 && groupManagerArr.length == 1) {
				GROUPLEAVECONFIRMMSG = _MemberConfigTabList_MSG_GROUPLEAVECONFIRMMSG_FORMGR;
			}

			ConfirmPopup(GROUPLEAVECONFIRMMSG , function(){
				ajaxDelByJson( contextpath + _MemberConfigTabList_GFOLLOWER_BYSELF_URL, jsondata, self.dropResult);
			}, 'okcancel');
			
		},
		
		dropit: function(v) {
				ajaxGet(contextpath + _MemberConfigTabList_BASE_MEMBER + '/' + _MemberConfigTabList__SESSION_MEMBERID + '/', {}, this.getMemberSyncKey);
		},
		
		groupClickAction : function() {
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
			React.render(React.createElement(GroupTabList, {groupId: this.state.groupId, groupInfo: this.state}),  document.getElementById('selectTabBySession'));
			
			ajaxUpd(contextpath + _MemberConfigTabList_BASE_GFOLLOWER_ACCESS , { 'groupId' : this.state.groupId }, function(){});

			$('.my-group-item').removeClass('group-select');
			$('.data-txt').removeClass('group-select-text');
			var myGroupId = 'myGroup_'+this.state.groupId;
			var rel = $('#'+ myGroupId).attr('rel');

			if(rel == this.state.groupId) {
				$('#'+ myGroupId).addClass('group-select');
				$(React.findDOMNode(this.refs.dataTxt)).addClass('group-select-text');
			}

			closeMemberConfigPop();
				
			openMainBody();
		},
		
		render : function() {
			//var rawMarkup = marked(this.props.children.toString(), {sanitize : true});
			var src = contextpath + _MemberConfigTabList_GROUP_PIC + '?groupId=' + this.state.groupId;
			var regdate = convertTimestamp(this.state.regDttm);
			
			var groupFollowerList = [];
			var groupFollowerListx = this.state.groupFollowerList.map(function (x) {
				if(x.joinStatus == 'COMPLETE')
					groupFollowerList.push(x);
			});
			
			return (
				React.createElement("tr", {id: "x_" + this.state.groupId}, 
                   	React.createElement("td", {className: "icon_join_group", style: {'paddingTop':'15px'}}, React.createElement("img", {src: src, width: "50", height: "50"})), 
                   	React.createElement("td", {className: "btn_gjoin", style: {'textAlign':'left'}, onClick: this.groupClickAction}, this.state.groupName), 
                   	React.createElement("td", null, this.state.groupType == 0 ? _MemberConfigTabList_MSG_INNERGROUPTEXT : _MemberConfigTabList_MSG_OUTERGROUPTEXT), 
                   	React.createElement("td", null, groupFollowerList.length), 
                   	React.createElement("td", {className: "btn_dropout", style: {'paddingTop':'10px'}}, 
                   		React.createElement("button", {style: {'width':'38px','height':'23px'}, onClick: this.dropit.bind(this, this.state.groupId), className: "btn-m btn-default"}, _MemberConfigTabList_MSG_LEAVEBTNTEXT)
					)
               	)
			);
		}
	});
	
	var MemberGroupList = React.createClass({displayName: "MemberGroupList",
		handleGroupRemove : function() {
			this.props.onGroupRemove();
		},
		render : function() {
			var that = this;
			var groupNodes = null;
			
			if(this.props.data.length > 0) {
				groupNodes = this.props.data.map(function (group, index) {
					return (
						React.createElement(MemberGroup, {key: index, groupName: group.groupName, isPublic: group.isPublic, regDttm: group.regDttm, 
						isApproval: group.isApproval, groupId: group.groupId, onGroupLeave: that.handleGroupRemove, 
						groupType: group.groupType, groupFollowerList: group.groupFollowerList}
						)
					);
				});
			} else {
				groupNodes = 
					React.createElement("tr", null, 
						React.createElement("td", {colSpan: "5", style: {'textAlign':'center'}}, _MemberConfigTabList_MSG_IHAVENOHEAVEN)
					);
			}
			
			return (
				React.createElement("tbody", null, 
					groupNodes
				)
			);
		}
	});
	
	var MemberConfigTabGroup  = React.createClass({displayName: "MemberConfigTabGroup",
		
		loadGroupsFromServer : function() {
			ajaxGet( contextpath + _MemberConfigTabList_BASE_GROUP_MYLIST, {"memberId" : _MemberConfigTabList__SESSION_MEMBERID}, function(data){
				this.setState({data : data});
			}.bind(this));
		},
		getInitialState : function () {
	        //return { gList : null };
			return {data : []};
        },
		
		componentDidMount: function() {
			// back-end에서 개인 설정 데이터 취득후 결과 값 세팅
			this.loadGroupsFromServer();
		},
		
		changeTab1:function(){
			this.props.changeTab('MemberConfigTabBase');
		},
		
		changeTab2:function(){
			this.props.changeTab('MemberConfigTabGroup');
		},
		
		changeTab3:function(){
			this.props.changeTab('MemberConfigTabInterface');
		},
		
		// <div className="tableBox" style={{"height":"450px", "overflow":"auto"}}>
		
		render: function() {
			return (
				React.createElement("div", {id: "MemberConfigTabGroup"}, 
			        
					React.createElement("div", {className: "search_tabstyle"}, 
			        	React.createElement("ul", {className: "malgun13"}, 
			            	React.createElement("li", {className: "tab_off", onClick: this.changeTab1}, _MemberConfigTabList_MSG_TABTITLE1), 
			                React.createElement("li", {className: "tab_on", style: {'color':'#fe630f'}}, React.createElement("strong", null, _MemberConfigTabList_MSG_TABTITLE2)), 
			                React.createElement("li", {className: "tab_off , last_tab", style: {'display':'none'}, onClick: this.changeTab3}, _MemberConfigTabList_MSG_TABTITLE3)
			            )
			        ), 	
			        React.createElement("span", {className: "set_txt"}, _MemberConfigTabList_MSG_TAB2LIST1TITLE), 

			        React.createElement("div", {className: "tableBox", style: { "overflow":"hidden"}}, 
						React.createElement("table", {border: "0", cellSpacing: "0", cellPadding: "0"}, 
			                React.createElement("caption", null, "테이블컨텐츠"), 
			                React.createElement("colgroup", null, 
	                            React.createElement("col", {width: "10%"}), 
	                            React.createElement("col", {width: "*"}), 
	                            React.createElement("col", {width: "15%"}), 
	                            React.createElement("col", {width: "10%"}), 
	                            React.createElement("col", {width: "15%"})
	                        ), 
	                        React.createElement("thead", null, 
	                   			React.createElement("th", {colSpan: "2", height: "34px"}, _MemberConfigTabList_MSG_TAB2LIST1COLUMN1), 
	                            React.createElement("th", null, _MemberConfigTabList_MSG_TAB2LIST1COLUMN2), 
	                            React.createElement("th", null, _MemberConfigTabList_MSG_TAB2LIST1COLUMN3), 
	                            React.createElement("th", {style: {'borderRight':'0'}}, _MemberConfigTabList_MSG_TAB2LIST1COLUMN4)
	                        ), 
							React.createElement(MemberGroupList, {data: this.state.data, onGroupRemove: this.changeTab2})
						)
			        )
				)
			);
		}
	});
	
	
	
	var ExtMapping = React.createClass({displayName: "ExtMapping",
		getInitialState : function () {
			return {
					boardName				:''
					, companyId 			: ''
					, followId 				: ''
					, userId 				: ''
					, parentId 				: ''
					, boardId				: ''
					, extChildData : []
    			};
    	},
		componentDidMount : function () {
			this.setState(
					{
						boardName				: this.props.boardName
						, companyId 			: this.props.companyId
						, followId 				: this.props.followId
						, userId 				: this.props.userId
						, parentId 				: this.props.parentId
						, boardId				: this.props.boardId
	        		}
				)
        },
        chooseExtOne : function(o) {
        	$externallist.find("dd").removeClass("select_list");
			o.addClass("select_list");
        },
        loadExtChildList : function() {
        	var t = this;
        	var x = this.state;
        	
			var o = React.findDOMNode(this.refs.parentDD);
        	this.chooseExtOne($(o));
        	
        	ajaxGet(contextpath + _MemberConfigTabList_EXTMAPPINGLIST, {"userId" : x.userId
       			, "parentId" : x.boardId , "companyId" : x.companyId
       		}, function(data){
       				
				this.setState({extChildData : data});
				t.showResult();
				
			}.bind(this));
        },
        showResult : function() {
			var ecd = this.state.extChildData;
			var y = React.findDOMNode(this.refs.parentDD);
			var html = '';
			
			$("dd.lidd-child").remove();

        	for (var i=0; i<ecd.length; i++) {
        	
        		if(i == ecd.length-1)
        			html += '<dd class="list-icon lidd-child lidd-child-last">';
        		else
        			html += '<dd class="list-icon lidd-child">';
        		html += '<span class="li_c" style="display:none;">'+ ecd[i].boardId +'</span>';
				html += '<span class="li_c_ui" style="display:none;">'+ ecd[i].userId +'</span>';
				html += '<img src="../images/config/bbs_leaf.png" style="margin-right:5px;" />';
        		html += ecd[i].boardName;
        		html += '</dd>';
        	}
        	
        	$(y).after(html);
        	
        	$('button#boardSelectBtn').addClass('btn-attention');
        	
        	this.dndHandle();
			
        },
		dndHandle : function() {
			var t = this;
			
			$externallist.find("dd.lidd-child").each(function(){
				$(this).click(function(){
					t.chooseExtOne($(this));
				});
			});
			
			this.props.onDNDStarted();
		},
		render : function() {
			return (
				React.createElement("dd", {className: "list_icon", onClick: this.loadExtChildList, ref: "parentDD"}, 
					React.createElement("span", {className: "li_c", style: {'display':'none'}}, this.state.boardId), 
					React.createElement("span", {className: "li_c_fi", style: {'display':'none'}}, this.state.followId), 
					React.createElement("span", {className: "li_c_ui", style: {'display':'none'}}, this.state.userId), 
					React.createElement("span", {className: "config_folder_close"}), 
					React.createElement("span", null, this.state.boardName)
				)
			);
		}
	});

	var ExtFMapping = React.createClass({displayName: "ExtFMapping",
		getInitialState : function () {
			return {
					boardName				:''
					, companyId 			: ''
					, followId 				: ''
					, userId 				: ''
					, parentId 				: ''
					, boardId				: ''
					, extChildData : []
    			};
    	},
		componentDidMount : function () {
			this.setState(
					{
						boardName				: this.props.boardName
						, companyId 			: this.props.companyId
						, followId 				: this.props.followId
						, userId 				: this.props.userId
						, parentId 				: this.props.parentId
						, boardId				: this.props.boardId
	        		}
				)
        },
        removeFd : function() {
			var data = {
				"userId" : this.state.userId
			    , "followId" : this.state.followId
			};
        	this.props.removeFdata(data);
        },
        followingItemChoose : function() {
        	$('div#followinglist dd.list_icon').removeClass('selected');
        	$(React.findDOMNode(this.refs.followingItem)).addClass('selected');
        },
		render : function() {
			return (
				React.createElement("dd", {ref: "followingItem", className: "list_icon", onClick: this.followingItemChoose}, 
					React.createElement("span", {className: "li_c", style: {'display':'none'}}, this.state.boardId), 
					React.createElement("span", {className: "li_c_fi", style: {'display':'none'}}, this.state.followId), 
					React.createElement("span", {className: "li_c_ui", style: {'display':'none'}}, this.state.userId), 
					React.createElement("span", null, this.state.boardName), 
					React.createElement("img", {className: "_delbtn", src: "../images/icon_delete.png", onClick: this.removeFd})
				)
			);
		}
	});

	var ExtMappingList = React.createClass({displayName: "ExtMappingList",
		onDNDStart : function() {
			this.props.onDND();
		},
		render : function() {
			var that = this;
			var extMappingNodes = this.props.data.map(function (extMap, index) {
				return (
					React.createElement(ExtMapping, {key: index, boardName: extMap.boardName, companyId: extMap.companyId, 
					followId: extMap.followId, userId: extMap.userId, parentId: extMap.parentId, boardId: extMap.boardId, 
					onDNDStarted: that.onDNDStart}
					)
				);
			});
			return (
				React.createElement("dl", {id: "externallist", className: "gallery ui-helper-reset ui-helper-clearfix"}, 
                    extMappingNodes
                )
			);
		}
	});
	
	var ExtFollowingList = React.createClass({displayName: "ExtFollowingList",
		rmvFdata : function(data) {
			this.props.onRemoveFdata(data);
		},
		render : function() {
			var that = this;
			var extFollowingNodes = this.props.data.map(function (extFMap, index) {
				return (
					React.createElement(ExtFMapping, {key: index, boardName: extFMap.boardName, companyId: extFMap.companyId, userId: extFMap.userId, 
					followId: extFMap.followId, parentId: extFMap.parentId, boardId: extFMap.boardId, removeFdata: that.rmvFdata}
					)
				);
			});
			return (
				React.createElement("dl", {className: "gallery ui-helper-reset", style: {'marginRight':'0px'}}, 
            		extFollowingNodes
            	)		
			);
		}
	});
	
	var ExtFollowingListisEmpty = React.createClass({displayName: "ExtFollowingListisEmpty",
		render : function() {
			return (
					React.createElement("div", {style: {'textAlign':'center'}}, 
						_MemberConfigTabList_MSG_MYFOLLOWINGLISTISEMPTY
					)
			)
		}
	});
	
	var MemberConfigTabInterface  = React.createClass({displayName: "MemberConfigTabInterface",
		getInitialState : function () {
	        return {extmappingdata : [], extfollowingdata : []};
        },
        
        loadMemInfo : function() {
        	var that  = this;
        	ajaxGet(contextpath + _MemberConfigTabList_MEMBERINFOFOREXTLINKAGE, {"memberId" : _MemberConfigTabList__SESSION_MEMBERID } , function(data){
				that.loadExtLinkageList(data);
				that.loadExtFollowingList(data);
			});
        },

        loadExtFollowingList : function(x) {
        	var t = this;
        	
        	ajaxGet(contextpath + _MemberConfigTabList_EXTFOLLOWINGLIST, {"userId" : x.SYNC_KEY
       		}, function(data){
       			
       			data.companyId = '';
       			data.parentId = '';
       			data.boardId = '';
        			
				this.setState({extfollowingdata : data});
				
				$( "dd", $( "#followinglist" ) ).draggable({
			    	cancel: "a.ui-icon", // clicking an icon won't initiate dragging
			    	revert: "invalid", // when not dropped, the item will revert back to its initial position
			    	containment: "document",
			    	helper		: function() {
    							var clone = $(this).clone();
    							$(clone).removeAttr('data-reactid');
    							$(clone).find('*').removeAttr('data-reactid');
    							$(clone).find('img._delbtn').remove();
    							return clone;
							},
			    	cursor: "move"
			    });
				
				if(data.length == 0) {
					var element = document.createElement("div");
					element.id = 'noMyFollowingListHere';
					$("div#followinglist").html(element);
					React.render(React.createElement(ExtFollowingListisEmpty, null), document.getElementById('noMyFollowingListHere'));
				}
				
			}.bind(this));
        	
        },
        
        makeDragNDrop : function() {
        	var t = this;
        	$( "dd", $externallist ).draggable({
		    	cancel: "a.ui-icon", // clicking an icon won't initiate dragging
		    	revert: "invalid", // when not dropped, the item will revert back to its initial position
		    	containment: "document",
		    	helper		: function() {
    							var clone = $(this).clone();
    							$(clone).removeAttr('data-reactid');
    							$(clone).find('*').removeAttr('data-reactid');
    							$(clone).css('background-image', 'none').css('background-color', '#fff');
    							return clone;
							},
		    	cursor: "move"
		    });
		    
		    $followinglist.droppable({
		        accept: "#externallist > dd",
		        activeClass: "ui-state-highlight",
		        drop: function( event, ui ) {
		        	//t.deleteObj( ui.draggable );
		        	
		        	var exfitmKey = ui.draggable.find('span.li_c').html();
		        	var isExist = false;
		        	
		        	$('div#followinglist dd span.li_c').each(function(){
		        		if($(this).html() == exfitmKey) isExist = true;
		        	});
		        	
		        	if(!isExist)
		        		t.addToFollow({ "userId" : $xSyncKey, "boardId" : ui.draggable.find('span.li_c').html() });
		        	else	
		        		MsgPopup(_MemberConfigTabList_MSG_EXFOLLOWITMISALREADYEXISTMSG);
		        }
			});
        },
        
        loadExtLinkageList : function(x) {
       		var t = this;
       		$xSyncKey = x.SYNC_KEY;
       		
       		ajaxGet(contextpath + _MemberConfigTabList_EXTMAPPINGLIST, {"userId" : $xSyncKey
       			, "parentId" : "0", "companyId" : x.COMPANY_ID
       		}, function(data){
        			
				this.setState({extmappingdata : data});
				
				$("span.btn_select").on("click", function(){
					var v = $externallist.find("dd.select_list");
					//t.deleteObj(v);
					var uid = $xSyncKey;
					var bid = v.find('span.li_c').html();
					
		        	var isExist = false;
		        	
		        	$('div#followinglist dd span.li_c').each(function(){
		        		if($(this).html() == bid) isExist = true;
		        	});
		        	
		        	if(!isExist) {
		        		t.addToFollow({ "userId" : uid, "boardId" : bid });
		        	}
		        	else	
		        		MsgPopup(_MemberConfigTabList_MSG_EXFOLLOWITMISALREADYEXISTMSG);
					
				});
	 
			    this.makeDragNDrop(); ///// xxxxxxxxxxxxxxxxxx
			    
			    $externallist.droppable({
			        accept: "#followinglist dd",
			        activeClass: "custom-state-active",
			        drop: function( event, ui ) {
			        	//t.recycleObj( ui.draggable );
			        	t.delFollowing({
			        		"userId" : ui.draggable.find('span.li_c_ui').html()
			        		, "followId" : ui.draggable.find('span.li_c_fi').html()
			        	});
			        }
				});
				
			}.bind(this));
        },
        
        delFollowing : function (data) {
			//ajaxDelByJson
        	var t = this;
        	ajaxDelByJson(contextpath + _MemberConfigTabList_EXTFOLLOWINGLIST, {"userId" : data.userId, "followId" : data.followId
       		}, function(data){
        		////t.loadExtFollowingList({"SYNC_KEY" : data.userId});
				t.changeTab3();
			});
        },
        
        addToFollow : function(fdata) {
        	var t = this;
        	ajaxAdd(contextpath + _MemberConfigTabList_EXTFOLLOWINGLIST, {"userId" : fdata.userId, "boardId" : fdata.boardId
        		, "boardMode" : "COMPANY"
       		}, function(data){
        		//t.loadExtFollowingList({"SYNC_KEY" : data.userId});
				t.changeTab3();
			});
        },
        
        deleteObj : function($item) {
        	var x = this;
        	$item.fadeOut(function() {
            	var $list = $( "dl", $followinglist ).length ?
                  $( "dl", $followinglist ) :
                  $( "<dl class='gallery ui-helper-reset'/>" ).appendTo( $followinglist );
                  
                $item.appendTo( $list ).fadeIn(function() {
					var delimg = $('<img class="_delbtn" src="../images/btn_delete.png" />').css("margin-left", "11px").on("click", function(){
						x.recycleObj($(this).parent());
					});
		    		$item.append(delimg);
  				});
            });
        },
        
        recycleObj : function($item) {
        	$item.fadeOut(function() {
                $item.removeClass("select_list")
                  .appendTo( $externallist )
                  .fadeIn().find("img._delbtn").remove();
            });
        },
        
		componentDidMount: function() {
			//var x = this;
			$externallist = $( "#externallist" ),
			$followinglist = $( "#followinglist" );
			
			this.loadMemInfo();

		},
		
		changeTab1:function(){
			this.props.changeTab('MemberConfigTabBase');
		},
		
		changeTab2:function(){
			this.props.changeTab('MemberConfigTabGroup');
		},
		
		changeTab3:function(){
			this.props.changeTab('MemberConfigTabInterface');
		},
		
		render: function() {
			return (
				React.createElement("div", {id: "MemberConfigTabInterface"}, 
			        React.createElement("div", {className: "search_tabstyle"}, 
			        	React.createElement("ul", {className: "malgun13"}, 
			            	React.createElement("li", {className: "tab_off", onClick: this.changeTab1}, _MemberConfigTabList_MSG_TABTITLE1), 
			                React.createElement("li", {className: "tab_off", onClick: this.changeTab2}, _MemberConfigTabList_MSG_TABTITLE2), 
			                React.createElement("li", {className: "tab_on , last_tab", style: {'color':'#fe630f'}}, React.createElement("strong", null, _MemberConfigTabList_MSG_TABTITLE3))
			            )
			        ), 	
			        
			        React.createElement("div", {className: "set_wrap"}, 
			            React.createElement("span", {className: "set_txt"}, _MemberConfigTabList_MSG_TAB3LIST1TITLE), 
			            React.createElement("div", {className: "list_wrap"}, 
			                React.createElement("div", {className: "elt_list_wrap_sub"}, 
			                	React.createElement("div", {className: "extlink_list_title"}, _MemberConfigTabList_MSG_TAB3LIST1COLUMN1), 
			                	React.createElement("div", {className: "outside_list", style: {'overflow-y' : 'auto'}}, 
			                		React.createElement(ExtMappingList, {data: this.state.extmappingdata, onDND: this.makeDragNDrop})
				                )
			                ), 
			                React.createElement("div", {className: "elt_list_wrap_sub elws_mid"}, 
			                	React.createElement("span", {className: "btn_select"}, 
									React.createElement("span", null, 
										React.createElement("button", {id: "boardSelectBtn", style: {'width':'56px','height':'25px'}, className: "btn-m btn-default"}, _MemberConfigTabList_MSG_SELECTBTNTEXT)	
									)
								)
			                ), 
			                React.createElement("div", {className: "elt_list_wrap_sub"}, 
			                	React.createElement("div", {className: "extlink_list_title elt_r"}, _MemberConfigTabList_MSG_TAB3LIST2COLUMN1), 
			                	React.createElement("div", {className: "fallow_list", style: {'overflow-y' : 'auto'}, id: "followinglist"}, 
				                	React.createElement(ExtFollowingList, {data: this.state.extfollowingdata, onRemoveFdata: this.delFollowing})
				                )
			                )
			            ), 
			            React.createElement("span", {className: "drag_txt"}, 
			            	React.createElement("ul", null, 
			                	React.createElement("li", null, React.createElement("img", {src: "../images/icon_drag.jpg", width: "24", height: "18"})), 
			                    React.createElement("li", {style: {'color':'#aaaaaa'}}, _MemberConfigTabList_MSG_TAB3BOTTOMMSG)
			            	)
			            )
			        )
				)
			);
		}
	});
	
		var bMemberConfigPop = null;
		
		function closeMemberConfigPop(){
			var unmount = React.unmountComponentAtNode(document.getElementById('MemberConfigTabPopup'));
			
			if(bMemberConfigPop != null)
				bMemberConfigPop.close();
		}
		
		function openMemberConfigPop(){
			React.render(React.createElement(MemberConfigTab, null), document.getElementById('MemberConfigTabPopup'));
			
			bMemberConfigPop = $('#MemberConfigPop').bPopup({
				modalClose: false,
            	opacity: 0.6,
            	positionStyle: 'fixed'
            	, onOpen : function() {
					document.body.style.overflow = "hidden";
					$("html").css("overflow-y","hidden");
					$('#MemberConfigPop').draggable({ handle: "div.pop-modalwindow-header" });
				}
				, onClose : function(){
					document.body.style.overflow = "visible";
					$("html").css("overflow-y","scroll");
				}
			});
		}
