var FeedSearchisEmpty = React.createClass({displayName: "FeedSearchisEmpty",
	render : function() {
		return (
				React.createElement("div", {style: {'text-align':'center'}}, 
					_SystemFeedSearch_MSG_TOTALSEARCHRESULTISEMPTY
				)
		)
	}
});

var FeedSearchBox = React.createClass({displayName: "FeedSearchBox",
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
				React.render(React.createElement(SystemFeedBox, {
						baseurl: contextpath + _SystemFeedSearch_smrFS_BASE_SYSTEM_FEED, 
						feedTitle: this.refs.feedTitle.getDOMNode().value, 
						feedType: this.refs.feedType.getDOMNode().value, 
						regMemberName: this.refs.regMemberName.getDOMNode().value, 
						regDttm: this.refs.regDttm.getDOMNode().value})
					, document.getElementById('SystemFeedBox')
				);
				
			},

			render: function() {
			
				return (
					React.createElement("div", null, 
						React.createElement("div", {className: "gmsub"}, 
							React.createElement("dl", {className: "groupimg", style: {"height":"25px"}}, 
				            	React.createElement("dt", null, _SystemFeedSearch_MSG_TAB1COLUMN1TEXT), 
				                React.createElement("dd", {className: "g_name"}, React.createElement("input", {ref: "feedTitle", type: "text"}))
				            ), 
				            React.createElement("dl", {className: "groupimg", style: {"height":"25px"}}, 
				            	React.createElement("dt", null, _SystemFeedSearch_MSG_TAB1COLUMN2TEXT), 
				                React.createElement("dd", {className: "g_name"}, 
				                	React.createElement("select", {ref: "feedType"}, 
				                		React.createElement("option", {value: ""}, _SystemFeedSearch_MSG_TAB1COLUMN2OPTION1TEXT), 
				                		React.createElement("option", {value: _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_GENERAL}, _SystemFeedSearch_MSG_TAB1COLUMN2OPTION2TEXT), 
				                		React.createElement("option", {value: _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_NOTICE}, _SystemFeedSearch_MSG_TAB1COLUMN2OPTION3TEXT), 
				                		React.createElement("option", {value: _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_SHARE}, _SystemFeedSearch_MSG_TAB1COLUMN2OPTION4TEXT), 
				                		React.createElement("option", {value: _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_POLL}, _SystemFeedSearch_MSG_TAB1COLUMN2OPTION5TEXT), 
				                		React.createElement("option", {value: _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_BOARD}, _SystemFeedSearch_MSG_TAB1COLUMN2OPTION6TEXT), 
				                		React.createElement("option", {value: _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_SHAREPOINT}, _SystemFeedSearch_MSG_TAB1COLUMN2OPTION7TEXT), 
				                		React.createElement("option", {value: _SystemFeedSearch_SNSCodeMaster_FEED_TYPE_APPROVAL}, _SystemFeedSearch_MSG_TAB1COLUMN2OPTION8TEXT)
				                	)
				                )
				            ), 
				            React.createElement("dl", {className: "groupimg", style: {"height":"25px"}}, 
				            	React.createElement("dt", null, _SystemFeedSearch_MSG_TAB1COLUMN3TEXT), 
				                React.createElement("dd", {className: "g_name"}, React.createElement("input", {ref: "regMemberName", type: "text"}))
				            ), 
				            React.createElement("dl", {className: "groupimg", style: {"height":"25px"}}, 
				            	React.createElement("dt", null, _SystemFeedSearch_MSG_TAB1COLUMN4TEXT), 
				                React.createElement("dd", {className: "g_name"}, 
				                	React.createElement("input", {id: "regDttm", ref: "regDttm", style: {'color':'blue', 'fontWeight':'bold', 'width':'70%', 'marginBottom':'15px', 'borderBottom':'1px solid #e0e0e0'}, placeholder: "", readOnly: true})
				                )
				            )
				    	), 
				    	React.createElement("div", {className: "pop-modalwindow-btn-area"}, 
							React.createElement("button", {type: "button", className: "btn-m btn-attention", onClick: this.search}, _SystemFeedSearch_MSG_SEARCHBTNTEXT)
						), 
						React.createElement("div", {id: "SystemFeedBox"})
        			)
           		);
			}
		});
		
// 피드 박스 DIV
		var SystemFeedBox = React.createClass({displayName: "SystemFeedBox",
		
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
					React.render(React.createElement(FeedList, {data: data}), document.getElementById(curMoreDivId));
				} else {
					
					var element = document.createElement("div");
					element.id = 'noMoreFeedSearchResultIsHere';
					document.getElementById('system_feedLine' + divIdNum).appendChild(element);
					if(divIdNum == 1)
						React.render(React.createElement(FeedSearchisEmpty, null), document.getElementById('noMoreFeedSearchResultIsHere'));
					else
						$('#' + curMoreDivId).html('<div class="last_contents">&nbsp;</div>');
					
					$(window).off('scroll');
				}
				
				snsCommLoadingObj({s : 'x'});
				
				eventFeedHeight('sysadmin');
			},
			
			render: function() {
		    	return (
		    		React.createElement("div", null, 
						React.createElement("div", {id: "system_feed_wholebox"}), 
						React.createElement("span", {onClick: this.getFeedList, className: "btn_feedmore", style: {'marginTop':'50px'}}, _SystemFeedSearch_MSG_MOREBTNTEXT), 
						React.createElement("span", {className: "img_feedmore_", style: {'marginTop':'50px'}})
					)
				);
			}
		});
	