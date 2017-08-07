var NoTodoHere = React.createClass({
	render : function() {
		return (
				<div style={{'textAlign':'center'}}>
					{_FEED_TodoCalendar_MSG_NOTODO}
				</div>
		)
	}
});	
		

var ToDoCalendar = React.createClass({

			componentWillUnmount: function() {
				$(window).off('scroll');
			},

			getFeedList : function(){
				var element = document.createElement("div");
				divIdNum = parseInt(divIdNum) + 1;
				element.id = 'feedLine' + divIdNum;
				curMoreDivId = element.id;
				document.getElementById('feed_wholebox').appendChild(element);
				
				
				var baseurl = _TodoCalendar_BASE_FEED;
				var jsondata = {};
				
				if(_TodoCalendar_FOLLOWER_TYPE_MEMBER == this.props.type){
					jsondata = {'feedId' : moreFeedId, 'memberId' : this.props.followerId, 'dueDate' : '2015-00-00'};
				 	baseurl = _TodoCalendar_BASE_FEED;	
				} else if(_TodoCalendar_FOLLOWER_TYPE_OTHER_MEMBER == this.props.type){
					jsondata = {'feedId' : moreFeedId, 'memberId' : this.props.followerId, 'dueDate' : '2015-00-00'};
				 	baseurl = _TodoCalendar_BASE_MEMBER_FEED;	
				}else{
					jsondata = {'feedId' : moreFeedId, 'groupId' : this.props.followerId, 'dueDate' : '2015-00-00'};
				 	baseurl = _TodoCalendar_BASE_GROUP_FEED;	
				}
				
				ajaxGet(baseurl, jsondata, this.feedRender);
			},
			
			feedRender:function(data){
				
				if(data !=null && data.length > 0) {
					React.render(<FeedList data={data}/>, document.getElementById(curMoreDivId));
				} else {
					
					var element = document.createElement("div");
					element.id = 'noMoreTodoHere';
					document.getElementById('feedLine' + divIdNum).appendChild(element);
					if(divIdNum == 1)
						React.render(<NoTodoHere />, document.getElementById('noMoreTodoHere'));
					else
						$('#' + curMoreDivId).html('<div class="last_contents">&nbsp;</div>');
					
					$(window).off('scroll');
				}
			},

			getTodoFeed: function() {
				snsCommLoadingObj({s : 'o'});
				$TODO_SIMPLE_SCROLLING_ONOFF = 'ON';
				$('#todoFeedBackBtn').remove();
				
				React.unmountComponentAtNode(document.getElementById('feedlist_detailbox'));
				$('#feedlist_detailbox').hide();
				$('#todoCalendarFeedHeader').hide();
				$('#feed_wholebox').show();
				
				$(window).off('scroll');
				curMoreDivId = '';
				divIdNum = 0;
				moreFeedId = 0;
				
				React.render(<NormalFeedElem type={this.props.type} followerId={this.props.followerId} />, document.getElementById('feed_wholebox'));
				
				React.unmountComponentAtNode(document.getElementById('feed_wholebox'));
				this.getFeedList();
				var self = this;
				$(window).scroll(function () {
     				
     				if($TODO_SIMPLE_SCROLLING_ONOFF === 'ON') {
     				
	     				if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
							$('.btn_feedmore').hide();
							snsCommLoadingObj({s : 'o'});
							self.getFeedList();
	     				}
	     				
     				}
    			});
				React.render(<CalendarFooter selectedTab={'todoFeed'}/>, document.getElementById('calendar_footer'));

			},

			getTodoCalendar: function() {
				$(window).off('scroll');
				React.unmountComponentAtNode(document.getElementById('feed_wholebox'));
				React.render(<Calendar type={this.props.type} memberId={this.props.followerId}/>, document.getElementById('feed_wholebox'));
				React.render(<CalendarFooter selectedTab={'todoCalendar'}/>, document.getElementById('calendar_footer'));
			},
			
			getToDoListResultRender : function(data) {
				snsCommLoadingObj({s : 'x'});
				if(data !=null && data.length > 0) {
					React.render(<ToDoFeedElemList viewType={this.props.type} viewFollower={this.props.followerId} data={data} />, document.getElementById(curMoreTodoFeedDivId));
				} else {
					
					var element = document.createElement("div");
					element.id = 'noMoreTodoListHere';
					document.getElementById('todotodofeedLine' + todoFeeddivIdNum).appendChild(element);
					if(todoFeeddivIdNum == 1)
						React.render(<NoTodoHere />, document.getElementById('noMoreTodoListHere'));
					else
						$('.h_stdf_wrapper_table').css('margin-bottom','80px');
					
					$(window).off('scroll');	
				}
				
				eventFeedHeight('simpleTodo');
			},
			
			getToDoList : function() {
				
				var element = document.createElement("div");
				todoFeeddivIdNum = parseInt(todoFeeddivIdNum) + 1;
				element.id = 'todotodofeedLine' + todoFeeddivIdNum;
				curMoreTodoFeedDivId = element.id;
				document.getElementById('h_stdf_simplelist_table').appendChild(element);
				
				var rowNumToShow = 20;
				var baseurl = _TodoCalendar_BASE_FEED;
				var jsondata = {};
				
				if(_TodoCalendar_FOLLOWER_TYPE_MEMBER == this.props.type) {
					jsondata = {'feedId' : moreTodoFeedId, 'memberId' : this.props.followerId, 'dueDate' : '2015-00-00', 'rowNumToShow' : rowNumToShow};
				 	baseurl = _TodoCalendar_BASE_FEED;	
				} else if (_TodoCalendar_FOLLOWER_TYPE_OTHER_MEMBER == this.props.type){
					jsondata = {'feedId' : moreTodoFeedId, 'memberId' : this.props.followerId, 'dueDate' : '2015-00-00', 'rowNumToShow' : rowNumToShow};
				 	baseurl = _TodoCalendar_BASE_MEMBER_FEED;	
				} else {
					jsondata = {'feedId' : moreTodoFeedId, 'groupId' : this.props.followerId, 'dueDate' : '2015-00-00', 'rowNumToShow' : rowNumToShow};
				 	baseurl = _TodoCalendar_BASE_GROUP_FEED;	
				}
				
				ajaxGet(baseurl, jsondata, this.getToDoListResultRender);
			},
			
			getTodoFeedList : function() {
				
				snsCommLoadingObj({s : 'o'});
				$TODO_SIMPLE_SCROLLING_ONOFF = 'ON';
				$('#todoFeedBackBtn').remove();
				
				React.unmountComponentAtNode(document.getElementById('feedlist_detailbox'));
				React.unmountComponentAtNode(document.getElementById('feed_wholebox'));
				React.render(<ToDoFeedTableHeader />, document.getElementById('feed_wholebox'));
			
				$('#feedlist_detailbox').hide();
				$('#feed_wholebox').show();
			
				$(window).off('scroll');
				curMoreTodoFeedDivId = '';
				todoFeeddivIdNum = 0;
				moreTodoFeedId = 0;
				
				this.getToDoList();
				var self = this;
				$(window).scroll(function () {
     				if($TODO_SIMPLE_SCROLLING_ONOFF === 'ON') {
     				
	     				if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
							$('.btn_feedmore').hide();
							snsCommLoadingObj({s : 'o'});
							self.getToDoList();
	     				}
     				}
    			});
				
				React.unmountComponentAtNode(document.getElementById('calendar_footer'));
			},

			componentDidMount: function () {
				$(window).off('scroll');
				
				$TODO_SIMPLE_WORKING_ON = 'ON';
				
				React.render(<CalendarHeader getTodoFeed={this.getTodoFeed} getTodoCalendar={this.getTodoCalendar} 
					getTodoFeedList = {this.getTodoFeedList}
				/>, document.getElementById('todoCalendarHeader'));
				//React.render(<Calendar type={this.props.type} memberId={this.props.followerId}/>, document.getElementById('feed_wholebox'));
				//React.render(<ToDoFeedElem type={this.props.type} followerId={this.props.followerId} />, document.getElementById('feed_wholebox'));
				//React.render(<CalendarFooter selectedTab={'todoCalendar'}/>, document.getElementById('calendar_footer'));
				this.getTodoFeedList();
			},
			
			componentWillMount : function() {
				$TODO_SIMPLE_SCROLLING_ONOFF = 'ON';
				$(window).off('scroll');
			},

			render: function() {
	        	return (
						<div>
							<span style={{'display':'block', 'margin': '20px 0 20px 0px', 'fontSize': '14px'}}>{_FEED_TodoCalendar_MSG_WHATTOSHOWTEXT}</span>
							<div id='todoCalendarHeader'></div>
							<div id='todoCalendarFeedHeader'></div>
							<div id='feed_wholebox'></div>
							<div id='tobackbtnwrapper' style={{'overflow':'hidden'}}></div>
							<div id='feedlist_detailbox' style={{'display':'none'}}></div>
							<div id='calendar_footer'></div>
                		</div>
	           	);
			}

		});
		
		var ToDoFeedTableHeader = React.createClass({

			render: function() {

				return (
						<div className="h_stdf_wrapper_table">
							<table border="0" cellSpacing="0" cellPadding="0">
								<colgroup>
			        				<col width='15%'/>
			        				<col width='20%'/>  
			        				<col width='*'/>
			        				<col width='15%'/>
			    				</colgroup>
								<thead id="h_stdf_simplelist_header">
									<tr>
										<th className="h_stdf_todoType">{_FEED_TodoCalendar_MSG_SIMPLELISTCOL2TEXT}</th>
										<th className="h_stdf_duedate">{_FEED_TodoCalendar_MSG_SIMPLELISTCOL4TEXT}</th>
										<th className="h_stdf_feedtitle">{_FEED_TodoCalendar_MSG_SIMPLELISTCOL1TEXT}</th>
										<th className="h_stdf_membername">{_FEED_TodoCalendar_MSG_SIMPLELISTCOL3TEXT}</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td id="h_stdf_simplelist_table" colSpan="4"></td>
									</tr>
								</tbody>
							</table>
						</div>
           		);

			}

		});
		
		var NormalFeedElem = React.createClass({
			componentDidMount: function () {
				
			},
			
			render : function(){
	    
				return (
					<div></div>
				);
			}
		});
		
		var ToDoFeedElem = React.createClass({
			componentDidMount: function () {
				
			},
			
			render : function(){
	    
				return (
					<div></div>
				);
			}
		});
		
		var ToDoFeedOneElem = React.createClass({
			getInitialState : function () {
		        return { 
					 feedTitle 			: this.props.tdfdata.feedTitle 
					,dueDate 			: this.props.tdfdata.dueDate
					,regMember 			: this.props.regMember
					,feedfollower		: this.props.feedfollower
					,tdfdata			: this.props.tdfdata
					,viewType			: this.props.viewType
					,viewFollower		: this.props.viewFollower
				};
	        },
	        
	        componentDidMount: function () {
	        	$(React.findDOMNode(this.refs.stdf_SubWrapper)).css("cursor","pointer");
				$(React.findDOMNode(this.refs.stdf_SubWrapper)).hover(function(){
					$(this).addClass("li-select-hover");
				}, function(){
					$(this).removeClass("li-select-hover");
				});
	        },
	        
	        todoFeedClickAction : function() {
	        
	        	$FAVORITE_WORKING_ON = 'OFF';
	        	$TODO_SIMPLE_WORKING_ON = 'ON';
	        
	        	$('input#myCurrentTodoIdInputHidden').val($(React.findDOMNode(this.refs.stdf_SubWrapper)).position().top);
	        	
	        	$('#todoCalendarFeedHeader').hide();
	        	
	        	var data = this.state.tdfdata;
	        	getOneToDoFeedDetailResult(data);
	        	
	        	var backBtn = $('<button/>',
			    {
			        text: 'back',
			        click: function () {
			        
			        	$('#todoFeedBackBtn').remove();
			        	React.unmountComponentAtNode(document.getElementById('feedlist_detailbox'));
			        	
			        	$TODO_SIMPLE_SCROLLING_ONOFF = 'ON';
			        	
			        	$('#todoCalendarFeedHeader').show();
			        	
			        	$('#feed_wholebox').show('fast', function(){
					
							$('html, body').animate({ scrollTop : $('input#myCurrentTodoIdInputHidden').val() }, 'fast');
							
						});
			        	
			        }
			    });
			    
			    backBtn.addClass('btn-m').addClass('btn-attention').attr("id", "todoFeedBackBtn").css("float","right");
			    $('#tobackbtnwrapper').empty();
			    $('#tobackbtnwrapper').append(backBtn);
			
	        },
	        
	        render : function(){
	        
	        	moreTodoFeedId = this.props.feedId;
	        	
	        	var orgFeedFollower = this.state.feedfollower;
	        	
				//팔로워에는 내 자신이 추가되 있기 때문에 내 자신은 넘어론 리스트에서 뺀다.
				var index = -1;	
       			var followerLength = orgFeedFollower.length;
    			for(var i = 0; i < followerLength; i++ ) {
    				if(orgFeedFollower[i].followerId === this.state.regMember.memberId && orgFeedFollower[i].followerType =='MEMBER') {
    					index = i;
						orgFeedFollower.splice(index, 1);
    					break;
    				}
    			}
    			
    			var feedTitleOrigin = this.state.feedTitle;
    			var cuttingLimit = 25;
    			var feedTitleSummary = feedTitleOrigin.length > cuttingLimit ? 
    				feedTitleOrigin.substring(0, 25) + '...' : feedTitleOrigin;
    				
    			var year  = this.state.dueDate.substring(0,4); 
				var month = this.state.dueDate.substring(4,6);
				var day   = this.state.dueDate.substring(6,8);
				var dueDate = year + '-' + month + '-'+day+'\r\r';
	        
	        	var delay = 0;
	        	var isTodoComplete = this.state.tdfdata.endDate === undefined ? 0 : 1;
	        	
	        	var className = '';
	        	var todoTypeName = '';
	        	var totalFeedFollower = this.state.feedfollower;
	        	
	        	if(_TodoCalendar_FOLLOWER_TYPE_MEMBER == this.state.viewType || _TodoCalendar_FOLLOWER_TYPE_OTHER_MEMBER == this.state.viewType) {
	        		
	        		if(totalFeedFollower.length == 0) {
	        			if(this.state.viewFollower == this.state.regMember.memberId) {
	        				className = 'data-mytodo';
	        				//todoTypeName = _FEED_TodoCalendar_MSG_BASIC_TODO_MYTODO;
	        				todoTypeName = _FEED_TodoCalendar_MSG_BASIC_TODO_SENDTODO;
	        			} else {
	        				className = 'data-towork';
	        				todoTypeName = _FEED_TodoCalendar_MSG_BASIC_TODO_WHODO;
	        			}
	        		} else if (totalFeedFollower.length >= 1) {
	        			if(this.state.viewFollower == this.state.regMember.memberId) {
	        				className = 'data-sendwork';
	        				todoTypeName = _FEED_TodoCalendar_MSG_BASIC_TODO_SENDTODO;
	        			} else {
	        				className = 'data-towork';
	        				todoTypeName = _FEED_TodoCalendar_MSG_BASIC_TODO_WHODO;
	        			}
	        		}
	        	} else {
	        		className = 'data-sendwork';
	        		todoTypeName = _FEED_TodoCalendar_MSG_BASIC_TODO_SENDTODO;
	        	}
				
				delay = this.state.tdfdata.isDelay;
				if(isTodoComplete == 1) delay = 0;
				
				var delayText = '';
				var todoStatusText = '';
				
				if(delay == 1) {
					delayText = '[' + _FEED_TodoCalendar_MSG_BASIC_TODO_DELAY + ']';
				} else {
					if(isTodoComplete == 1) {
						todoStatusText = '[' + _FEED_TodoCalendar_MSG_SCHEDULESTEP1 + ']';
					} else {
						todoStatusText = '[' + _FEED_TodoCalendar_MSG_BASIC_ISONGOING + ']'  ;
					}
				}

				return (
					<table border="0" cellSpacing="0" cellPadding="0" onClick={this.todoFeedClickAction} ref="stdf_SubWrapper">
						<caption>테이블컨텐츠</caption>                
	    				<colgroup>
	        				<col width='15%'/>
	        				<col width='20%'/>  
	        				<col width='*'/>
	        				<col width='15%'/>
	    				</colgroup>
						<thead></thead>
						<tbody>
							<tr>
								<td className="stdf_todoType"><span className={className}>{todoTypeName}</span></td>
								<td className="stdf_duedate">
									<span className='data-delay'>{delayText}</span>
									<span className='data-complete'>{todoStatusText}</span>
								{dueDate}</td>
								<td className="stdf_feedtitle">
									{feedTitleSummary}</td>
								<td className="stdf_membername">{this.state.regMember.memberName}</td>
							</tr>
							<tr>
								<td className="stdf_todoType">&nbsp;</td>
								<td colSpan="3" className="stdf_feedfollower">
								<FeedFollowerList feedfollower = {orgFeedFollower} followerCnt={this.state.tdfdata.followerCnt} />
								</td>
							</tr>
						</tbody>
					</table>
				);
			}
		});
		
		var ToDoFeedElemList = React.createClass({
			render: function() {
				var ToDoFeedElemNodes;
				var viewType=this.props.viewType;
				var viewFollower = this.props.viewFollower;
				
				if(this.props.data.length > 0){
					ToDoFeedElemNodes = this.props.data.map(
		        		function (tdfdata) {
							//해당 피드를 등록한 사람의 정보
							var key = 'todotodo' + tdfdata.feedId;
							var member = tdfdata.memberVo;
							var follwers = tdfdata.feedFollowerList;
							
							return (
	
			               			<ToDoFeedOneElem
										key            	   = {key}
										regMember          = {member}
										feedfollower	   = {follwers}
										feedId			   = {tdfdata.feedId}
										tdfdata			   = {tdfdata}
										viewType		   = {viewType}
										viewFollower	   = {viewFollower}
									/>
		           			);
		           		}
		        	);
				}
	        	return (<div>{ToDoFeedElemNodes}</div>);
	
			}
		});
	
		var CalendarFooter = React.createClass({

			render: function() {

				if(this.props.selectedTab === 'todoCalendar') {
	        		return (
							<div>
								<ul className='icon_do'>
	                            	<li style={{'margin':'1px 6px 0 0'}}><img src='../images/icon_doend.jpg' width='14' height='14' /></li>
                                	<li className='txt_do'>{_FEED_TodoCalendar_MSG_SCHEDULESTEP1}</li>
                                	<li style={{'margin':'1px 6px 0 0'}}><img src='../images/icon_dodelay.jpg' width='14' height='14' /></li>
                                	<li className='txt_do'>{_FEED_TodoCalendar_MSG_SCHEDULESTEP2}</li>
                                	<li style={{'margin':'1px 6px 0 0'}}><img src='../images/icon_doing.jpg' width='14' height='14' /></li>
                                	<li className='txt_do'>{_FEED_TodoCalendar_MSG_SCHEDULESTEP3}</li>
                            	</ul>
								<span className='cal_subtxt'>{_FEED_TodoCalendar_MSG_SHOWSCHEDULEWHENHOVER}</span> 
							</div>
	           		);
				} else {
	        		return (
							<div/>
	           		);
				}

			}

		});
	
	
	
		var CalendarHeader = React.createClass({

			retouchStyle: function(id) {
				var liElement = $('.do_menu > li');
				for(var i=0; i<liElement.length; i++) {
					if( $(liElement[i]).hasClass('do_on')) $(liElement[i]).removeClass('do_on').addClass('do_off');
				}

				$('#'+id).removeClass('do_off').addClass('do_on');
			
			},

			getTodoFeed: function() {
				$('.img_feedmore').show(0).delay(500).hide(0);
				this.retouchStyle('menu_feed');
				this.props.getTodoFeed();
			},

			getTodoCalendar: function() {
				this.retouchStyle('menu_calendar');
				this.props.getTodoCalendar();
			},
			
			getTodoFeedList : function() {
				this.retouchStyle('menu_feed_list');
				this.props.getTodoFeedList();
			},

			render: function() {
	        	return (
						<ul className='do_menu' style={{'marginBottom':'30px'}}>
                        	<li className='do_off' id='menu_feed' onClick={this.getTodoFeed}>{_FEED_TodoCalendar_MSG_FEED}</li>
                            <li style={{'display':'none'}} className='do_off' id='menu_calendar' onClick={this.getTodoCalendar}>{_FEED_TodoCalendar_MSG_CALENDAR}</li>
                            <li className='do_on' id='menu_feed_list' onClick={this.getTodoFeedList}>{_FEED_TodoCalendar_MSG_SIMPLEFEED}</li>
                        </ul>
	           	);
			}

		});
	
	
	
		var Calendar = React.createClass({

			getFeedDetailResult: function(feedId) {
				$(window).off('scroll');
				React.unmountComponentAtNode(document.getElementById('calendar_footer'));
				$('.tooltipevent').remove();
				var baseurl = _TodoCalendar_BASE_FEED + '/' + feedId;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, getFeedTodoDetailResult);
			},

			componentDidMount: function () {
				var self = this;

				var currentLangCode = _TodoCalendar_pageContext_lang;
				var targetMemberId = _TodoCalendar_target_memberId;
				var type = this.props.type;
				if(this.props.memberId !== undefined) {
					targetMemberId = this.props.memberId;
				}
				var reqUrl =  contextpath + '/sns/model/feed/calendar/list?memberId='+targetMemberId+'&type='+type;
				var strJson = "";
				$('#calendar').fullCalendar({

					header: {
						left: '',
						center: 'prev, title, next today',
						right: ''
					},

		    		editable: false,
					lang: currentLangCode,

					events: {
						url: reqUrl,
						error: function() {
							$('#script-warning').html("<code>/sns/model/feed/calendar/list</code> must be running.");
						}
					},

					eventClick: function(event) {
						self.getFeedDetailResult(event.feedId);
					},

					loading: function(bool) {
						$('#loading').toggle(bool);
					},

					eventMouseover: function(calEvent, jsEvent) {
						var endInfo = calEvent.endInfo;
						var endInfoMessage = '';
						if(endInfo != '') {
							endInfoMessage = '\n'+ _FEED_TodoCalendar_MSG_DAYCOMPLETETASK +' : '+endInfo;
						}
						var tooltip = '<div class="tooltipevent" style="border:1px solid #e0e0e0; background:#fefefe; width:200px;overflow: hidden;height: auto; box-shadow:0px 2px 5px #999; padding:10px;position:absolute;z-index:10001;white-space:pre-line; word-break: break-all">' + calEvent.realTitle + endInfoMessage+'</div>';

				    	$("body").append(tooltip);
				    	$(this).mouseover(function(e) {
					        $(this).css('z-index', 10000);
							$('.tooltipevent').noLinky().noLinky();
				        	$('.tooltipevent').fadeIn('500');
				        	$('.tooltipevent').fadeTo('10', 1.9);
				    	}).mousemove(function(e) {
					        $('.tooltipevent').css('top', e.pageY + 10);
				        	$('.tooltipevent').css('left', e.pageX + 20);
				    	});
					},

					eventMouseout: function(calEvent, jsEvent) {
					    $(this).css('z-index', 8);
				    	$('.tooltipevent').remove();
					},
	
				});
				//$('.fc-title').noLinky().noLinky();
			},

			render: function() {
	        	return (
						<div>
							<div id='script-warning'></div>
							<div id='calendar'></div>
                		</div>
	           	);
			}

		});
	