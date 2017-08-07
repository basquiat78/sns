var FeedSearchisEmpty = React.createClass({
	render : function() {
		return (
				<div style={{'text-align':'center'}}>
					{_SystemFeedSearch_MSG_TOTALSEARCHRESULTISEMPTY}
				</div>
		)
	}
});

var FeedSearchBox = React.createClass({
			componentWillMount: function() {
				
			},
			componentDidMount: function() {
				
				$('#selectTabBySession').hide();
				
				$("#regDttm").datepicker({
        			buttonImage: '../images/icon_calendal.png',
        			buttonImageOnly: true,
        			showOn: 'both',
					//changeMonth: true,
        			//changeYear: true,
     			});

				$( "#regDttm" ).datepicker( "option", $.datepicker.regional[_SystemFeedSearch_locale_language] );
				$( "#regDttm" ).datepicker( "option", "dateFormat", "yy-mm-dd");
				
				$( "#regDttm" ).click(function(){
					$('#regDttm').datepicker('show');
				});
				
				if ( $("#MemberFeedBox").length ) {
					React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));	
				}
				
				eventFeedHeight('sysadmin');
			},
			
			componentWillUnmount: function() {
				React.unmountComponentAtNode(document.getElementById('SystemFeedBox'));
			},
			
			search: function(){
				
				React.unmountComponentAtNode(document.getElementById('SystemFeedBox'));
				React.render(<SystemFeedBox 
						baseurl={contextpath + _SystemFeedSearch_smrFS_BASE_SYSTEM_FEED} 
						feedTitle={this.refs.feedTitle.getDOMNode().value} 
						feedType={this.refs.feedType.getDOMNode().value}
						regMemberName={this.refs.regMemberName.getDOMNode().value}
						regDttm={this.refs.regDttm.getDOMNode().value}/>
					, document.getElementById('SystemFeedBox')
				);
				
			},

			render: function() {
			
				return (
					<div>
						<div className="gmsub">
							<dl className="groupimg" style={{"height":"25px"}}>
				            	<dt>{_SystemFeedSearch_MSG_TAB1COLUMN1TEXT}</dt>
				                <dd className="g_name"><input ref="feedTitle" type="text"/></dd>
				            </dl>
				            <dl className="groupimg" style={{"height":"25px"}}>
				            	<dt>{_SystemFeedSearch_MSG_TAB1COLUMN2TEXT}</dt>
				                <dd className="g_name">
				                	<select ref="feedType" >
				                		<option value="">{_SystemFeedSearch_MSG_TAB1COLUMN2OPTION1TEXT}</option>
				                		<option value={_SystemFeedSearch_SNSCodeMaster_FEED_TYPE_GENERAL}>{_SystemFeedSearch_MSG_TAB1COLUMN2OPTION2TEXT}</option>
				                		<option value={_SystemFeedSearch_SNSCodeMaster_FEED_TYPE_NOTICE}>{_SystemFeedSearch_MSG_TAB1COLUMN2OPTION3TEXT}</option>
				                		<option value={_SystemFeedSearch_SNSCodeMaster_FEED_TYPE_SHARE}>{_SystemFeedSearch_MSG_TAB1COLUMN2OPTION4TEXT}</option>
				                		<option value={_SystemFeedSearch_SNSCodeMaster_FEED_TYPE_POLL}>{_SystemFeedSearch_MSG_TAB1COLUMN2OPTION5TEXT}</option>
				                		<option value={_SystemFeedSearch_SNSCodeMaster_FEED_TYPE_BOARD}>{_SystemFeedSearch_MSG_TAB1COLUMN2OPTION6TEXT}</option>
				                		<option value={_SystemFeedSearch_SNSCodeMaster_FEED_TYPE_SHAREPOINT}>{_SystemFeedSearch_MSG_TAB1COLUMN2OPTION7TEXT}</option>
				                		<option value={_SystemFeedSearch_SNSCodeMaster_FEED_TYPE_APPROVAL}>{_SystemFeedSearch_MSG_TAB1COLUMN2OPTION8TEXT}</option>
				                	</select>
				                </dd>
				            </dl>
				            <dl className="groupimg" style={{"height":"25px"}}>
				            	<dt>{_SystemFeedSearch_MSG_TAB1COLUMN3TEXT}</dt>
				                <dd className="g_name"><input ref="regMemberName" type="text"/></dd>
				            </dl>
				            <dl className="groupimg" style={{"height":"25px"}}>
				            	<dt>{_SystemFeedSearch_MSG_TAB1COLUMN4TEXT}</dt>
				                <dd className="g_name">
				                	<input id='regDttm' ref='regDttm' style={{'color':'blue', 'fontWeight':'bold', 'width':'70%', 'marginBottom':'15px', 'borderBottom':'1px solid #e0e0e0'}} placeholder='' readOnly></input>
				                </dd>
				            </dl>
				    	</div>
				    	<div className="pop-modalwindow-btn-area">
							<button type="button" className="btn-m btn-attention" onClick={this.search}>{_SystemFeedSearch_MSG_SEARCHBTNTEXT}</button>
						</div>
						<div id='SystemFeedBox'></div>
        			</div>
           		);
			}
		});
		
// 피드 박스 DIV
		var SystemFeedBox = React.createClass({
		
			componentWillMount: function() {
				console.log('willmount');
				$(window).off('scroll');
			},
			
			componentDidMount: function() {
				// 더보기 관련 데이터 초기화
				
				curMoreDivId = '';
				divIdNum = 0;
				moreFeedId = 0;
				$('.btn_feedmore').hide();
				
				snsCommLoadingObj({s : 'o'});
				this.getFeedList();
				
				var self = this;
				$(window).scroll(function () {
     				if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
						$('.btn_feedmore').hide();
						snsCommLoadingObj({s : 'o'});
						self.getFeedList();
     				}
    			});
			},
			
			componentWillUnmount: function() {
				$(window).off('scroll');
				React.unmountComponentAtNode(document.getElementById('system_feed_wholebox'));
			},			

			getFeedList : function(){
				
				var element = document.createElement("div");
				divIdNum = parseInt(divIdNum) + 1;
				element.id = 'system_feedLine' + divIdNum;
				curMoreDivId = element.id;
				document.getElementById('system_feed_wholebox').appendChild(element);
				var that = this;
				var jsondata = {
					'feedId' 		: moreFeedId,
					"feedTitle" 	: this.props.feedTitle,
					"feedType"  	: this.props.feedType,
					"regMemberName" : this.props.regMemberName,
					"regDttm"		: this.props.regDttm
				};
				
				ajaxGet(this.props.baseurl, jsondata , that.feedRender);
			},
			
			feedRender:function(data){
				$('.btn_feedmore').hide();
				
				if(data!==undefined && data.length > 0) {
					React.render(<FeedList data={data}/>, document.getElementById(curMoreDivId));
				} else {
					
					var element = document.createElement("div");
					element.id = 'noMoreFeedSearchResultIsHere';
					document.getElementById('system_feedLine' + divIdNum).appendChild(element);
					if(divIdNum == 1)
						React.render(<FeedSearchisEmpty />, document.getElementById('noMoreFeedSearchResultIsHere'));
					else
						$('#' + curMoreDivId).html('<div class="last_contents">&nbsp;</div>');
					
					$(window).off('scroll');
				}
				
				snsCommLoadingObj({s : 'x'});
				
				eventFeedHeight('sysadmin');
			},
			
			render: function() {
		    	return (
		    		<div>
						<div id="system_feed_wholebox"></div>
						<span onClick={this.getFeedList} className="btn_feedmore"  style={{'marginTop':'50px'}} >{_SystemFeedSearch_MSG_MOREBTNTEXT}</span>
						<span className="img_feedmore_" style={{'marginTop':'50px'}}></span>
					</div>
				);
			}
		});
	