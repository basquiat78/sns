		var SharePopup = React.createClass({displayName: "SharePopup",

			getInitialState : function () {
				return {
						shareFollowerList  : [],
						shareFileList  	  : [],
	    			};
        	},

			shareClosePopup: function(){
				// 화면 데이터 초기화
				$('#shareFeedTitle').val('');
				multiFileList = new Array();
				React.unmountComponentAtNode(document.getElementById('share_popup'));
				if(sharePopup != null) sharePopup.close();
			},

			componentDidMount: function() {

				var src = _FeedShare_MEMBER_PIC + '?memberId=' + this.props.shareMemberId;
				$(React.findDOMNode(this.refs.sharePic)).css("background", 'url(' + src + ') no-repeat').css("background-size", 'cover');

				this.props.shareData();
				$('#sfeedTitle').linky();
				
				$('#addShare').removeClass('btn-default').addClass('btn-attention').css('cursor','pointer');
			},

			resultShareFeed: function(data){
			
				console.log(JSON.stringify(data));
			
				var baseurl = _FeedShare_BASE_FEED + '/' + data.feedId;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, this.getFeedDetailResult);
			},

			getFeedDetailResult: function(feeddata){
			
				// 화면 기본 데이터 초기화
				curMoreDivId = '';
				divIdNum = 0;
				moreFeedId = 0;
				$(window).off('scroll');
				$('#feed_wholebox').empty();
				this.shareClosePopup();
				//해당 피드를 등록한 사람의 정보
				var member = feeddata.memberVo;
				//해당 피드에 속한 팔로워 리스트
				var follwers = feeddata.feedFollowerList;
				//해당 피드에 속한 태그 리스트
				var tags = feeddata.feedTagList;
				//해당 피드에 속한 파일 리스트
				var files = feeddata.fileList;
				
				selectedTab = 'PERSON_TOTAL';
				loadDttm = new Date().getTime();
				if(document.getElementById('MemberFeedBox')) {
					React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
					React.render(React.createElement(FeedBox, {baseurl: _FeedShare_BASE_FEED, memberId: member.memberId, groupId: 0}), document.getElementById('MemberFeedBox'));
				} else if( $("#GroupFeedBox").length ) {
					React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
					snsCommLoadingFeed(feeddata, 'GroupFeedBox');
				} else {
					if(viewType != 'PERSON') {
				 		console.log('getMemberInfo');
						getMemberInfo(_FeedShare_session_memberId, _FeedShare_session_memberName, 'fromSysSearch');
					}
					
					React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
					snsCommLoadingFeed(feeddata, 'MemberFeedBox');
				}
				
				retouchStyle('#totalTab');
				
				$("html, body").animate({ scrollTop: 0 }, "fast");
			},
	
			shareFeed: function() {
				
				if(this.state.shareFollowerList.length < 2) {
					//MsgPopup(_FEED_FeedShare_MSG_YOUHAVETOADDSHAREFOLLOWERMSG);
					//return;
				}
				
				var baseurl = _FeedShare_FEED_TYPE_SHARE;
				var shareTitle = $('.shareContentsInput').mentionsInput('getValue');
				
				var memberId = _FeedShare_session_memberId;
				var fileArr = this.state.shareFileList;
				setSharepointFileInfo(fileArr, this.props.shareFeedId, memberId, "SHAREPOP");
				
				
				var jsondata = {
							  	"regMemberId"		: _FeedShare_session_memberId,
			      				"feedTitle"			: shareTitle,
			      				"contentsType"		: 'link',
			      				"pFeedId"	 		: this.props.shareFeedId,
			      				"feedFollowerList"  : this.state.shareFollowerList,
				  				"fileList"		 	: fileArr
				};

				ajaxAdd(baseurl, jsondata, this.resultShareFeed);
			},

			followerHandler: function(followerList) {
				var totalFollowerList = [];
				
				var havetoaddmyself = true;
				
				followerList.forEach(function(follower) {
				//console.log(JSON.stringify(follower));
					var followerVo = {
									"itemId"    	 : '14',
									"itemType"  	 : 'FEED',
									"followerId"     : follower.id,
									"followerType"   : follower.type,
									"followerName"   : follower.label,
									"followerEmail"  : follower.email,
									"followerImgUrl" : follower.pic
									}

					totalFollowerList.push(followerVo);
					
					if(follower.type == 'GROUP') havetoaddmyself = false; // follower type 이 그룹일 경우에는 나 자신을 추가하지 않는다.

				});
				
				var _followerList = [];
				var me = _FeedShare_session_memberId;
				var addMySelf = true;
				var followerMySelf;
				for(var i=0; i< totalFollowerList.length; i++) {
						var fId = totalFollowerList[i].followerId + '';
					if(fId === me) {
						addMySelf = false;
						break;
					}
				
				}

				if(addMySelf && havetoaddmyself) {

					followerMySelf = {"itemId"    	 : '14',
									"itemType"  	 : 'FEED',
									"followerId"     : me,
									"followerType"   : 'MEMBER',
									"followerName"   : '',
									"followerEmail"  : '',
									"followerImgUrl" : ''
									}

					_followerList = totalFollowerList.concat(followerMySelf);
				} else {
					_followerList = totalFollowerList;
				}
				
				/*if(_followerList.length > 1) {
					$('#addShare').removeClass('btn-default').addClass('btn-attention').css('cursor','pointer');
				} else {
					$('#addShare').removeClass('btn-attention').addClass('btn-default').css('cursor','initial');
				}*/
				
				this.state.shareFollowerList = _followerList;
				
			},

			fileHandler: function(fileList) {
				this.state.shareFileList = [];
				this.state.shareFileList = fileList;
			},

			render: function() {
	        	return (
						React.createElement("div", null, 

							React.createElement("div", {className: "pop-modalwindow-header", style: {'cursor':'move'}}, 
								React.createElement("div", {className: "pop-modalwindow-title"}, _FEED_FeedShare_MSG_SHAREBTNTEXT), 
						        React.createElement("div", {className: "pop-modalwindow-header-option"}, 
						        	React.createElement("a", {className: "ico-anchor"}, React.createElement("span", {className: "ico-img, ico-close", onClick: this.shareClosePopup}, _FEED_FeedShare_MSG_CLOSEBTNTEXT))
						    	)
							), 
       						React.createElement("div", {className: "share_area_wrap", style: {'overflowX':'hidden','overflowY':'auto'}}, 
           						React.createElement("div", {id: "ffList"}, 
									React.createElement(ShareFeedDropzoneComponent, {config: componentConfig, 
  						   	    								eventHandlers: eventHandlers, 
																djsConfig: djsConfig, 
							    								fileHandler: this.fileHandler, 
																followerHandler: this.followerHandler, 
																shareFeed: this.shareFeed}	
									 )
								), 
           						React.createElement("div", {className: "share_feedcontents", style: {'height':'150px','border':'0'}}, 
               						React.createElement("dl", null, 
	                   					React.createElement("dt", {className: "pic_small", ref: "sharePic"}), 
                   						React.createElement("dd", {className: "feed_name"}, React.createElement("div", {id: "shareUserName"}))
               						), 
               						React.createElement("div", {className: "substance", id: "sfeedTitle"})
           						)
			       			)

						)
	           	);
			}
		});