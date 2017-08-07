	
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
				$('.img_feedmore').hide();
				if(data !=null && data.length > 0) {
					React.render(<FeedList data={data}/>, document.getElementById(curMoreDivId));
				}
			},

			getTodoFeed: function() {
				
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
							$('.img_feedmore').show();
							self.getFeedList();
	     				}
	     				
     				}
    			});
				React.render(<CalendarFooter selectedTab={'todoFeed'}/>, document.getElementById('calendar_footer'));

			},

			getTodoCalendar: function() {
				$(window).off('scroll');
				
				$('#todoFeedBackBtn').remove();
				React.unmountComponentAtNode(document.getElementById('feedlist_detailbox'));
				$('#feedlist_detailbox').hide();
				$('#feed_wholebox').show();
				
				React.unmountComponentAtNode(document.getElementById('feed_wholebox'));
				React.render(<Calendar type={this.props.type} memberId={this.props.followerId}/>, document.getElementById('feed_wholebox'));
				React.render(<CalendarFooter selectedTab={'todoCalendar'}/>, document.getElementById('calendar_footer'));
			},
			
			getToDoListResultRender : function(data) {
				if(data !=null && data.length > 0) {
					React.render(<ToDoFeedElemList data={data} />, document.getElementById(curMoreTodoFeedDivId));
				}
			},
			
			getToDoList : function() {
				var element = document.createElement("div");
				todoFeeddivIdNum = parseInt(todoFeeddivIdNum) + 1;
				element.id = 'todotodofeedLine' + todoFeeddivIdNum;
				curMoreTodoFeedDivId = element.id;
				document.getElementById('h_stdf_simplelist_table').appendChild(element);
				
				var baseurl = _TodoCalendar_BASE_FEED;
				var jsondata = {};
				
				if(_TodoCalendar_FOLLOWER_TYPE_MEMBER == this.props.type) {
					jsondata = {'feedId' : moreTodoFeedId, 'memberId' : this.props.followerId, 'dueDate' : '2015-00-00'};
				 	baseurl = _TodoCalendar_BASE_FEED;	
				} else if (_TodoCalendar_FOLLOWER_TYPE_OTHER_MEMBER == this.props.type){
					jsondata = {'feedId' : moreTodoFeedId, 'memberId' : this.props.followerId, 'dueDate' : '2015-00-00'};
				 	baseurl = _TodoCalendar_BASE_MEMBER_FEED;	
				} else {
					jsondata = {'feedId' : moreTodoFeedId, 'groupId' : this.props.followerId, 'dueDate' : '2015-00-00'};
				 	baseurl = _TodoCalendar_BASE_GROUP_FEED;	
				}
				
				ajaxGet(baseurl, jsondata, this.getToDoListResultRender);
			},
			
			getTodoFeedList : function() {
			
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
				
				//React.render(<ToDoFeedElem />, document.getElementById('feed_wholebox'));
				
				
				this.getToDoList();
				var self = this;
				$(window).scroll(function () {
     				if($TODO_SIMPLE_SCROLLING_ONOFF === 'ON') {
     				
	     				if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
							$('.btn_feedmore').hide();
							$('.img_feedmore').show();
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
				React.render(<Calendar type={this.props.type} memberId={this.props.followerId}/>, document.getElementById('feed_wholebox'));
				//React.render(<ToDoFeedElem type={this.props.type} followerId={this.props.followerId} />, document.getElementById('feed_wholebox'));
				React.render(<CalendarFooter selectedTab={'todoCalendar'}/>, document.getElementById('calendar_footer'));
				//this.getTodoFeedList();
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
							<div id='tobackbtnwrapper'></div>
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
							<ul>
								<li className="h_stdf_feedtitle">내용</li>
								<li className="h_stdf_membername">작성자</li>
								<li className="h_stdf_duedate">완료예정일</li>
							</ul>
							<ul id="h_stdf_simplelist_table"></ul>
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
				};
	        },
	        
	        todoFeedClickAction : function() {
	        	
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
					
							//$('html, body').animate({ scrollTop : $('input#myCurrentFavoriteIdInputHidden').val() }, 'fast');
							
						});
			        	
			        }
			    });
			    
			    backBtn.addClass('btn-m').addClass('btn-attention').attr("id", "todoFeedBackBtn").css("float","right");
			    $('#tobackbtnwrapper').empty();
			    $('#tobackbtnwrapper').append(backBtn);
			
	        },
	        
	        render : function(){
	        
	        	moreTodoFeedId = this.props.feedId;
	        
				return (
					<div className="simpletodofeedWrapper" onClick={this.todoFeedClickAction}>
						<table border="0" cellSpacing="0" cellPadding="0">
							<tr>
								<td className="stdf_feedtitle">{this.state.feedTitle}</td>
								<td className="stdf_membername">{this.state.regMember.memberName}</td>
								<td className="stdf_duedate">{this.state.dueDate}</td>
							</tr>
							<tr>
								<td colSpan="3" className="stdf_feedfollower">{this.state.feedfollower}</td>
							</tr>
						</table>
					</div>
				);
			}
		});
		
		var ToDoFeedElemList = React.createClass({
			render: function() {
				var ToDoFeedElemNodes;
				
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
							<div>
								<span className="img_feedmore_" style={{'marginTop':'50px'}}><img src="../images/img_feedmore.gif" width="25" height="4" /></span>
							</div>
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
						<ul className='do_menu'>
                        	<li className='do_off' id='menu_feed' onClick={this.getTodoFeed}>{_FEED_TodoCalendar_MSG_FEED}</li>
                            <li className='do_on' id='menu_calendar' onClick={this.getTodoCalendar}>{_FEED_TodoCalendar_MSG_CALENDAR}</li>
                            <li style={{'display':'none'}} className='do_off' id='menu_feed_list' onClick={this.getTodoFeedList}>목록</li>
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
	