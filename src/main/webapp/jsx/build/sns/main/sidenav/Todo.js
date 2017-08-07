// 완료예정일과 오늘날짜 비교
		function compareDate(datestr){
			var match = datestr.match(/(\d{4})(\d{2})(\d{2})/);
			var betterDateStr =  match[1] + '.' + match[2] + '.' + match[3];
			var todoDuedate = new Date(match[1], parseInt(match[2])-1, match[3]);
			var now = new Date();
			var betweenDay = (now.getTime() - todoDuedate.getTime()) / 1000 / 60 / 60 / 24;
			
			return betweenDay;
		}
		
		
		function chgDateToFormal(datestr){
			var match = datestr.match(/(\d{4})(\d{2})(\d{2})/);
			var betterDateStr =  match[1] + '.' + match[2] + '.' + match[3];
			return betterDateStr;
		}
	
	var Todo = React.createClass({displayName: "Todo",
	
		getInitialState : function () {
	        return { feedId:''};
        },
		
		getFeedDetail:function(){
			
			selectedTab = 'MY_TODO';
			onClickFrom = 'TODO';
			
			if(viewType == 'GROUP' && this.props.groupOrNot !== 0) {
				
				//getGroupDetailResult 함수를 호출한다.
				var baseurl = contextpath + _Todo_BASE_GROUP + '/' + this.props.groupOrNot;
				ajaxGet(baseurl, {}, getGroupDetailResult);
				
			} else {
				if(viewType != 'PERSON') {
					getMemberInfo(_RecentAct_SESSION_MEMBERID, _RecentAct_SESSION_MEMBERNAME, 'fromTodo');
				}
				
				var baseurl = contextpath + _Todo_BASE_FEED + '/' + this.props.todoVo.feedId;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, getFeedDetailResult);
			}
		
			openMainBody();
		},

		notify: function(data) {
		},
        
        componentWillUnmount: function() {
 		},

		componentDidMount: function () {
			// 타이틀에 사람 또는 태그가 노출되는 경우에는 파싱해준다.
			$('.to-do-list').noLinky();
	
		},		

		render: function() {
			var delay = 0;
			var className = 'data-mytodo';
			var toDoTypeName = "[" + _Todo_BASIC_TODO_MYTODO + "]";
			
			if(this.props.todoVo.toDoType == 1){
				className = 'data-mytodo';
				toDoTypeName = "[" + _Todo_BASIC_TODO_MYTODO + "]";
			} else if(this.props.todoVo.toDoType == 2) {
				className = 'data-sendwork';
				toDoTypeName = "[" + _Todo_BASIC_TODO_SENDTODO + "]";
			} else {
				className = 'data-towork';
				toDoTypeName = "[" + _Todo_BASIC_TODO_WHODO + "]";
			}
			
			delay = this.props.todoVo.isDelay;
			//delay = compareDate(this.props.todoVo.dueDate);
			var title = this.props.todoVo.feedTitle;
			if(title.length > 60) title = title.substring(0,60)+'...';
			
			if(delay == 1){
				return (
					React.createElement("div", {onClick: this.getFeedDetail, className: "to-do-list", style: {'paddingBottom':'10px'}}, 
						React.createElement("span", {className: "data-delay"}, "(", _Todo_BASIC_TODO_DELAY, ")"), 
						React.createElement("span", {className: className}, toDoTypeName), React.createElement("span", {style: {'display':'inline-block','whiteSpace':'pre-line','wordBreak': 'break-all'}}, title), React.createElement("br", null), 
						React.createElement("span", {className: "data-date"}, chgDateToFormal(this.props.todoVo.dueDate))
					)
				);
			} else {
				return (
					React.createElement("div", {onClick: this.getFeedDetail, className: "li-select-hover", style: {'paddingBottom':'10px'}}, 
						React.createElement("span", {className: className}, toDoTypeName), React.createElement("span", {style: {'display':'inline-block','whiteSpace':'pre-line','wordBreak': 'break-all'}}, title), React.createElement("br", null), 
						React.createElement("span", {className: "data-date"}, chgDateToFormal(this.props.todoVo.dueDate))
					)
				);
			}
		}
	});
	
	
	//SideNav 할일
	var TodoList = React.createClass({displayName: "TodoList",
		
		getInitialState : function () {
	        return { todolist:[], groupOrNot : ''};
        },
        
        resultTodoList: function(data){
        	this.setState({todolist:data})
        },
        
        ajaxCallByComponent: function() {
       		var baseurl = contextpath + _Todo_MEMBER_WIDGET_TODO;
        	var jsondata = {"memberId"	: _Todo_SESSION_MEMBERID, "followerType" : 'MEMBER'};
        	ajaxGet(baseurl, jsondata, this.resultTodoList);
        },
        
        ajaxCallByReload: function(reloadData) {
        	var baseurl = contextpath + _Todo_MEMBER_WIDGET_TODO;
        	var jsondata = {"memberId"	: _Todo_SESSION_MEMBERID, "followerType" : 'MEMBER'};
        	
        	this.setState({'groupOrNot' : 0});
        	
        	if(reloadData.groupId !== undefined) {
        		this.setState({'groupOrNot' : reloadData.groupId});
        		jsondata = {"memberId"	: reloadData.groupId, "followerType" : 'GROUP'};
        	}
       		
        	ajaxGet(baseurl, jsondata, this.resultTodoList);
        },

		notify: function(data) {
			this.ajaxCallByComponent();
		},
		
		reload: function(data) {
			this.ajaxCallByReload(data);
		},
        
        componentWillUnmount: function() {
     			Observer.unregisterObserver(this);
     			Reloader.unregisterReloader(this);
 		},
 			
		componentDidMount: function () {
			Observer.registerObserver(this);
			Reloader.registerReloader(this);		
        	this.ajaxCallByComponent();
		},
		
		render: function() {
			var that = this;
			var todo = this.state.todolist.map(
        		function(todoVo, index){
					var key = 'todo'+index;
        			return ( React.createElement(Todo, {key: key, todoVo: todoVo, groupOrNot: that.state.groupOrNot}) );
        		}
        	);
        	
			if(this.state.todolist.length > 0) {
				return (
						React.createElement("div", {className: "webpart"}, 
							React.createElement("div", {className: "webpart-header"}, 
								React.createElement("p", {className: "webpart-left"}, React.createElement("span", {className: "webpart-title"}, _Todo_BASIC_TODO))
							), 
							
							React.createElement("div", {className: "webpart-body"}, 
								React.createElement("ul", {className: "webpart-content-list-multiline"}, 
									React.createElement("li", {className: "webpart-item"}, 
										todo
									)
								)
							)
						)
					);
			} else {
				return (
						React.createElement("div", {className: "webpart"}, 
							React.createElement("div", {className: "webpart-header"}, 
								React.createElement("p", {className: "webpart-left"}, React.createElement("span", {className: "webpart-title"}, _Todo_BASIC_TODO))
							), 
							
							React.createElement("div", {className: "webpart-body"}, 
								React.createElement("ul", {className: "webpart-content-list-multiline"}, 
									React.createElement("li", {className: "webpart-item"}, 
										React.createElement("div", {style: {'paddingBottom':'10px'}}, 
											React.createElement("span", {className: "item-anchor"}, _Todo_BASIC_RECENTNOT), React.createElement("br", null), 
											React.createElement("span", {className: "data-date"})
										)
									)
								)
							)
						)
					);
			}
			
		}
	});