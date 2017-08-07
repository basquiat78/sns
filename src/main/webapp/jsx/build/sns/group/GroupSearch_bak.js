var GroupSearch = React.createClass({displayName: "GroupSearch",
		getInitialState : function () {
	        return { 
	        	 isJoinStatus: false
	        };
        },
        
        componentDidMount: function() {
			
		},
		
		groupClickTest: function() {

			// 오른쪽 메뉴 상단 그룹 팔로워 리스트
			React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
			React.render(React.createElement(MyGroupFollower, {groupId: this.props.groupVo.groupId}), document.getElementById('RightUpLevel'));

			// 가운데 컨텐츠 상단 부분(그룹 정보)
			React.unmountComponentAtNode(document.getElementById('head_contents'));
			React.render(React.createElement(GroupHead, {groupId: this.props.groupVo.groupId}), document.getElementById('head_contents'));

			// 가운데 컨텐츠 상단 부분(그룹 정보)
			React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
			React.render(React.createElement(FeedApp, {groupInfo: this.props.groupVo}), document.getElementById('mainContentsArea'));

			// 중하단 탭 리스트 및 피드
			React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			React.render(React.createElement(GroupTabList, {groupId: this.props.groupVo.groupId}),  document.getElementById('selectTabBySession'));

			if(bGroupSearchPop != null)
				bGroupSearchPop.close();
			
		},
        
        join: function(){
			var jsondata = {
    			"groupId" : this.props.groupVo.groupId,
				"regMemberId" : _GroupSearch_session_memberId
    		};
			console.log(jsondata);
			var self = this;
			ConfirmPopup(_GroupSearch_MSG_JOINCONFIRMMSG , function(){
				ajaxAdd(contextpath + _GroupSearch_grfGroupSearch_BASE_GFOLLOWER_URL, jsondata, self.joinResult);
			}, 'okcancel');
			
		},
		
		joinResult: function(data){
			//console.log(JSON.stringify(data));
			this.setState({ isJoinStatus: true});
			reGroupList();
		},
		
		render: function() {
			var src = contextpath + _GroupSearch_grfGroupSearch_GROUP_PIC + '?groupId=' + this.props.groupVo.groupId;
			
			var self = this;
			var isJoin = false;
			if( typeof this.props.groupVo.groupFollowerList == "undefined" ) {
				isJoin = false;
			} else if(this.props.groupVo.groupFollowerList.length == 0){
				isJoin = false;
			} else {
				this.props.groupVo.groupFollowerList.map(
					function (groupFollower) {
						if(_GroupSearch_session_memberId == groupFollower.memberId){
							
							isJoin = true;
						}
					}
				);
			}
			
			var groupType= _GroupSearch_MSG_INNERGROUPTEXT;
			if(this.props.groupVo.groupType == 1) groupType = _GroupSearch_MSG_OUTERGROUPTEXT;
			
			var oneGroupId = 'groupSearch_' + this.props.groupVo.groupId;
			moreGroupId = this.props.groupVo.groupId;
			
			if(isJoin || this.state.isJoinStatus) {
				return (
	   				React.createElement("tr", {id: oneGroupId}, 
	                   	React.createElement("td", {className: "group_pic", style: {'paddingTop':'0px'}}, React.createElement("img", {src: src, width: "50", height: "50"})), 
	                   	React.createElement("td", {className: "btn_gjoin", style: {'textAlign':'left'}, onClick: this.groupClickTest}, this.props.groupVo.groupName), 
	                   	React.createElement("td", null, groupType), 
	                   	React.createElement("td", null, this.props.groupVo.groupFollowerList.length), 
	                   	React.createElement("td", {className: "btn_gjoin"}, 
	                   		React.createElement("div", {className: "pop-modalwindow-btn-area"}, 
							  	React.createElement("button", {type: "button", className: "btn-m"}, _GroupSearch_MSG_JOINBTNTEXT)
							)
	                   	)
	               	)
	   			);
			} else {
				return (
	   				React.createElement("tr", {id: oneGroupId}, 
	                	React.createElement("td", {className: "group_pic", style: {'paddingTop':'15px'}}, React.createElement("img", {src: src, width: "50", height: "50"})), 
	                   	React.createElement("td", {className: "btn_gjoin", style: {'textAlign':'left'}, onClick: this.groupClickTest}, this.props.groupVo.groupName), 
	                   	React.createElement("td", null, groupType), 
	                   	React.createElement("td", null, this.props.groupVo.groupFollowerList.length), 
	                   	React.createElement("td", {className: "btn_gjoin"}, 
	                   		React.createElement("div", {className: "pop-modalwindow-btn-area"}, 
							  	React.createElement("button", {type: "button", className: "btn-m btn-attention", onClick: this.join}, _GroupSearch_MSG_JOINREQUESTBTNTEXT)
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
			
			$('div#GroupSearchPopup').scroll(function () {
				if($('div#GroupSearchPopup').prop('scrollHeight') - 50 <= $(this).scrollTop() + $(this).height()) {
					groupSearchPage += 1;
					that.groupSearch();
				}
			});
		},
		
		groupSearchResult: function(data){
		
			if( typeof data == "undefined" || data.length == 0) {
				$('#GroupSearchPopup').off('scroll');
			}
			
			if ((this.state.getResultlist).length == 0) {
				this.setState({getResultlist: data});
			} else {
				this.setState({getResultlist: (this.state.getResultlist).concat(data) });
			}
			
		},
		
		groupSearchWithName : function(){
			groupSearchPage = 0;
			this.state.getResultlist = [];
			this.groupSearch();
		},

		groupSearch: function(){
			var groupName = this.refs.groupName.getDOMNode().value;
			
			var cnt = 8;
			var start = groupSearchPage * cnt;
			
			// 검색 사용하였을 경우 데이터 가져오기
			var jsondata = {'groupName' : groupName.trim(), 'selectType' : 'SEARCH', 'page' : groupSearchPage
					 , 'cnt' : cnt, 'start' : start };	
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
			
			if(bGroupSearchPop != null)
				bGroupSearchPop.close();
		}
		
		function openGroupSearchPop(){
			
			React.render(React.createElement(GroupSearch, null), document.getElementById('GroupSearchPopup'));
			
			bGroupSearchPop = $('#GroupSearchPop').bPopup({
				modalClose: false,
            	opacity: 0.6,
            	positionStyle: 'fixed'
			});
		}