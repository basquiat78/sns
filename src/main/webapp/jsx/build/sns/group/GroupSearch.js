var GroupSearchResultIsEmpty = React.createClass({displayName: "GroupSearchResultIsEmpty",
	render : function() {
		return (
				React.createElement("div", {style: {'textAlign':'center'}}, 
					_GroupSearch_MSG_spring_message_nogroup
				)
		)
	}
});	

var GroupSearch = React.createClass({displayName: "GroupSearch",
		getInitialState : function () {
	        return { 
	        	 isJoinStatus: 'X'
	        };
        },
        
        componentDidMount: function() {
			
		},
		
		groupClickTest: function() {
			
			// 오른쪽 메뉴 상단 그룹 팔로워 리스트
			if(contentsType == 'USER') {
				React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				React.render(React.createElement(MyGroupFollower, {groupId: this.props.groupVo.groupId}), document.getElementById('RightUpLevel'));
			}
			
			contentsType  = 'GROUP';

			Reloader.reloadObservers({'type':'group', 'groupId':this.props.groupVo.groupId, 'isGroupChange':'false'});

			// 가운데 컨텐츠 상단 부분(그룹 정보)
			React.unmountComponentAtNode(document.getElementById('head_contents'));
			React.render(React.createElement(GroupHead, {groupId: this.props.groupVo.groupId}), document.getElementById('head_contents'));


			// 가운데 컨텐츠 상단 부분(그룹 정보)
			React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
			React.render(React.createElement(FeedApp, {groupInfo: this.props.groupVo}), document.getElementById('mainContentsArea'));


			// 중하단 탭 리스트 및 피드
			React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			React.render(React.createElement(GroupTabList, {groupId: this.props.groupVo.groupId, groupInfo: this.props.groupVo}),  document.getElementById('selectTabBySession'));
			
			ajaxUpd(contextpath + _Group_grfGroup_BASE_GFOLLOWER_ACCESS , { 'groupId' : this.props.groupVo.groupId }, function(){});

			$('.my-group-item').removeClass('group-select');
			$('.data-txt').removeClass('group-select-text');
			var myGroupId = 'myGroup_' + this.props.groupVo.groupId;
			var rel = $('#'+ myGroupId).attr('rel');

			if(rel == this.props.groupVo.groupId) {
				$('#'+ myGroupId).addClass('group-select');
				$(React.findDOMNode(this.refs.dataTxt)).addClass('group-select-text');
			}

			if(bGroupSearchPop != null)
				bGroupSearchPop.close();
				
			openMainBody();
			
		},
        
        join: function(){
			var jsondata = {
    			"groupId" : this.props.groupVo.groupId,
				"regMemberId" : _GroupSearch_session_memberId
    		};
			
			var self = this;
			ConfirmPopup(_GroupSearch_MSG_JOINCONFIRMMSG , function(){
				ajaxAdd(contextpath + _GroupSearch_grfGroupSearch_BASE_GFOLLOWER_URL, jsondata, self.joinResult);
			}, 'okcancel');
			
		},
		
		joinResultDetail : function(data) {
			
			if(data.length != 0 && data[0].joinStatus != null)
				this.setState({ isJoinStatus: 'COMPLETE' });
			else
				this.setState({ isJoinStatus: 'STANDBY' });
			
			reGroupList();
		},
		
		joinResult: function(data){
			var that = this;
			ajaxGet(contextpath + _GroupSearch_grfGroupSearch_BASE_GFOLLOWER_URL 
				, {'groupId' : data.groupId, 'memberId' : data.memberId}
				, that.joinResultDetail);
		},
		
		render: function() {
			var src = contextpath + _GroupSearch_grfGroupSearch_GROUP_PIC + '?groupId=' + this.props.groupVo.groupId;
			
			var self = this;
			
			var joinStatusTEXT = '';
			var statusKey = this.props.groupVo.isMember;
			
			if(statusKey == 'STANDBY' || this.state.isJoinStatus == 'STANDBY') 			joinStatusTEXT = _GroupSearch_MSG_JOINSTATUSSTANDBY;
			else if(statusKey == 'COMPLETE' || this.state.isJoinStatus == 'COMPLETE')	joinStatusTEXT = _GroupSearch_MSG_JOINSTATUSYES;
			else if(statusKey == 'REJECT')												joinStatusTEXT = _GroupSearch_MSG_JOINSTATUSREJECTED;
			else if(statusKey == 'NOTAMEMBER')											joinStatusTEXT = _GroupSearch_MSG_JOINSTATUSNO;
			
			var groupType = '';
			if(this.props.groupVo.groupType == '0') {
				groupType = _GroupSearch_MSG_INNERGROUPTEXT;
			// } else if(this.props.groupVo.groupType == '1') {		// 외부그룹 보안문제로 삭제됨
			//	groupType = _GroupSearch_MSG_OUTERGROUPTEXT;
			// } else if(this.props.groupVo.groupType == 'ORGANIZATION') {	// 숨김그룹
			//	groupType = '팀';
			} else if(this.props.groupVo.groupType == 'SHAREPOINT') {
				groupType = 'Collaboration';
			} else {
				groupType = _GroupSearch_MSG_INNERGROUPTEXT;
			}
			
			var oneGroupId = 'groupSearch_' + this.props.groupVo.groupId;
			moreGroupId = this.props.groupVo.groupId;
			
			if(joinStatusTEXT == _GroupSearch_MSG_JOINSTATUSSTANDBY 
				|| joinStatusTEXT == _GroupSearch_MSG_JOINSTATUSYES 
				|| joinStatusTEXT == _GroupSearch_MSG_JOINSTATUSREJECTED ) {
				return (
	   				React.createElement("tr", {id: oneGroupId}, 
	                   	React.createElement("td", {className: "group_pic", style: {'paddingTop':'0px'}}, React.createElement("img", {src: src, width: "50", style: {'height':'auto !important', 'maxHeight':'80px'}})), 
	                   	React.createElement("td", {className: "btn_gjoin", style: {'textAlign':'left'}, onClick: this.groupClickTest}, this.props.groupVo.groupName), 
	                   	React.createElement("td", null, groupType), 
	                   	React.createElement("td", null, this.props.groupVo.memberCnt), 
	                   	React.createElement("td", {className: "btn_gjoin"}, 
	                   		React.createElement("div", {className: "pop-modalwindow-btn-area"}, 
							  	React.createElement("button", {type: "button", className: "btn-m"}, joinStatusTEXT)
							)
	                   	)
	               	)
	   			);
			} else {
				return (
	   				React.createElement("tr", {id: oneGroupId}, 
	                	React.createElement("td", {className: "group_pic", style: {'paddingTop':'15px'}}, React.createElement("img", {src: src, width: "50", style: {'height':'auto !important', 'maxHeight':'80px'}})), 
	                   	React.createElement("td", {className: "btn_gjoin", style: {'textAlign':'left'}, onClick: this.groupClickTest}, this.props.groupVo.groupName), 
	                   	React.createElement("td", null, groupType), 
	                   	React.createElement("td", null, this.props.groupVo.memberCnt), 
	                   	React.createElement("td", {className: "btn_gjoin"}, 
	                   		React.createElement("div", {className: "pop-modalwindow-btn-area"}, 
							  	React.createElement("button", {type: "button", className: "btn-m btn-attention", onClick: this.join}, joinStatusTEXT)
							)
	                   	)
	               	)
	   			);
			}
		}
	});
	
	var GroupSearchList  = React.createClass({displayName: "GroupSearchList",
		getInitialState : function () {
	        return { 
	        	 getResultlist: []
	        };
        },
		
		componentDidMount: function() {
		
			// 더보기 관련 데이터 초기화
			groupSearchPage = 0;
			trIdNum = 0;
		
			// 초기 그룹 검색 데이터 가져오기
			var that = this;
			this.groupSearch();
			$(this.refs.groupName.getDOMNode()).keydown(function(e){
				var x = e.keyCode || e.which;
				if(x == '13') {
					if(($(this).val()).trim() == '') return false;
					else that.groupSearchWithName();
				}
			});
			
			//GroupSearchPop
			
			$('div#GroupSearchPop .click_popup').scroll(function () {
				if($('div#GroupSearchPop .click_popup').prop('scrollHeight') - 50 <= $(this).scrollTop() + $(this).height()) {
					groupSearchPage += 1;
					that.groupSearch();
				}
			});
		
		},
		
		arrayUnique : function(array) {
			var a = array.concat();
		    for(var i=0; i<a.length; ++i) {
		        for(var j=i+1; j<a.length; ++j) {
		            if(a[i] === a[j])
		                a.splice(j--, 1);
		        }
		    }
		    return a;
		},
		
		groupSearchResult: function(data){
			
			this.state.getResultlist = this.state.getResultlist.concat(data);
			this.setState({getResultlist: this.state.getResultlist});
			
			if( typeof data == "undefined" || data.length == 0) {
				
				var element = document.createElement("div");
				element.id = 'noGroupSearchResultHere';
				
				$('#GroupSearchPopup').off('scroll');
				
				if($("#groupSearchPopBox tbody tr").length == 0
					
					){
					$("#noGroupSearchResultHere").remove();
					$("#groupSearchPopBox").after(element);
					React.render(React.createElement(GroupSearchResultIsEmpty, null), document.getElementById('noGroupSearchResultHere'));
				}
			} else {
				$("#noGroupSearchResultHere").remove();
			}
			
		},
		
		groupSearchWithName : function(){
		
			var groupName = this.refs.groupName == undefined ? '' : this.refs.groupName.getDOMNode().value;
			
			/*
			if(groupName.trim() == '') {
				MsgPopup(_GroupSearch_MSG_SEARCHINPUTFIELDISEMPTYMSG);
				return false;
			}
			*/
		
			var that = this;
			groupSearchPage = 0;
			$('#GroupSearchPopup').off('scroll');
			this.state.getResultlist = [];
			this.groupSearch();
			
			$('div#GroupSearchPopup').scroll(function () {
				if($('div#GroupSearchPopup').prop('scrollHeight') - 50 <= $(this).scrollTop() + $(this).height()) {
					groupSearchPage += 1;
					that.groupSearch();
				}
			});
		},

		groupSearch: function(){
			var groupName = this.refs.groupName == undefined ? '' : this.refs.groupName.getDOMNode().value;
			
			var cnt = 8;
			var start = groupSearchPage * cnt;
			
			// 검색 사용하였을 경우 데이터 가져오기
			var jsondata = {'groupName' : groupName.trim(), 'selectType' : 'SEARCH', 'page' : groupSearchPage
					 , 'cnt' : cnt, 'start' : start , 'memberId' : _GroupSearch_session_memberId};	
			ajaxGet(contextpath + _GroupSearch_grfGroupSearch_BASE_GROUP , jsondata, this.groupSearchResult);
		},
		
		render: function() {
			var groupSearchResult = this.state.getResultlist.map(
        		function(groupVo){
        			return ( React.createElement(GroupSearch, {groupVo: groupVo}) );
        		}
        	);
        	
			return (
				React.createElement("div", {className: "feed_wrap"}, 
					React.createElement("div", {id: "feedGate", className: "feed_gate", style: {'paddingBottom':'0'}}, 
	                    React.createElement("div", {className: "search_tabstyle", style: {'marginBottom':'10px', 'paddingLeft':'0', 'borderBottom':'0', 'height':'30px'}}, 
	                        React.createElement("dl", null, 
	                            React.createElement("dt", null), 
	                            React.createElement("dd", {className: "gsearch_box"}, 
	                                React.createElement("ul", null, 
	                                    React.createElement("li", null, React.createElement("input", {name: "groupName", ref: "groupName", type: "text", placeholder: _GroupSearch_MSG_SEARCHINPUTTEXT})), 
	                                    React.createElement("li", {className: "btn_find", onClick: this.groupSearchWithName})
	                                )
	                            )
	                        )
	                	)	
	                ), 
	                
	                React.createElement("div", {className: "tableBox"}, 
                        React.createElement("table", {border: "0", cellSpacing: "0", cellPadding: "0", id: "groupSearchPopBox"}, 
                            React.createElement("caption", null, "테이블컨텐츠"), 
                            React.createElement("colgroup", null, 
                                React.createElement("col", {width: "10%"}), 
                                React.createElement("col", {width: "*"}), 
                                React.createElement("col", {width: "15%"}), 
                                React.createElement("col", {width: "10%"}), 
                                React.createElement("col", {width: "15%"})
                            ), 
	                        React.createElement("thead", null, 
	                   			React.createElement("th", {colSpan: "2", height: "34px"}, _GroupSearch_MSG_TAB1COLUMN1), 
	                            React.createElement("th", null, _GroupSearch_MSG_TAB1COLUMN2), 
	                            React.createElement("th", null, _GroupSearch_MSG_TAB1COLUMN3), 
	                            React.createElement("th", {style: {'borderRight':'0'}}, _GroupSearch_MSG_TAB1COLUMN4)
	                        ), 
	                                   
	                        React.createElement("tbody", null, 
	                        	groupSearchResult
	                        )
                       	)
                    )
                )
			);
		}
	});
	
var bGroupSearchPop = null;
		
		function closeGroupSearchPop(){
			var unmount = React.unmountComponentAtNode(document.getElementById('GroupSearchPopup'));
			groupSearchPage = 0;
			$('#GroupSearchPopup').off('scroll');
			
			if(bGroupSearchPop != null)
				bGroupSearchPop.close();
		}
		
		function openGroupSearchPop(){
			
			React.render(React.createElement(GroupSearch, null), document.getElementById('GroupSearchPopup'));
			
			bGroupSearchPop = $('#GroupSearchPop').bPopup({
				modalClose: false,
            	opacity: 0.6,
            	positionStyle: 'fixed'
            	, onOpen : function() {
					document.body.style.overflow = "hidden";
					$("html").css("overflow-y","hidden");
					$('#GroupSearchPop').draggable({ handle: "div.pop-modalwindow-header" });
				}
				, onClose : function(){
					document.body.style.overflow = "visible";
					$("html").css("overflow-y","scroll");
				}
			});
		}