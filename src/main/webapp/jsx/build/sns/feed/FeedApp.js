		var FeedApp = React.createClass({displayName: "FeedApp",

			getInitialState: function() {
        		return {
						feedTitle    	  : '',
						feedType	 	  : 'GENERAL', 
						feedContentsType  : '',
						feedContents	  : '',
						feedTagList		  : [],
						feedFollowerList  : [],
						feedFileList  	  : [],
						ogValidate		  : '',
						selectTab		  : 'TOTAL',
				};

        	},

			feedTypeHandler: function(feedType) {
				this.state.feedType = feedType;
			},

			contentsTypeHandler: function(contentsType) {
				this.state.feedContentsType = contentsType;
			},

			tagHandler: function(tagsList) {
				var tagList = [];
				tagsList.forEach(function(tag) {
					var tagVo = { "tagName": tag }
         			tagList.push(tagVo);
       			});

				this.state.feedTagList = tagList;
			},

			followerHandler: function(followerList) {
				var totalFollowerList = [];
				followerList.forEach(function(follower) {
					var followerType = follower.type;
					if(followerType == 'ORGANIZATION')followerType='GROUP';
					var followerVo = {
									"itemId"    	 : '14',
									"itemType"  	 : 'FEED',
									"followerId"     : follower.id,
									"followerType"   : followerType,
									"followerName"   : follower.label,
									"followerEmail"  : follower.email,
									"followerImgUrl" : follower.pic
									}

					totalFollowerList.push(followerVo);

				});

				this.state.feedFollowerList = totalFollowerList;
			},

			titleHandler: function(feedTitle) {
				this.state.feedTitle = feedTitle;
			},

			fileHandler: function(fileList) {
				this.state.feedFileList = [];
				this.state.feedFileList = fileList;
			},

			getFeedListAfterAdd: function(data) {
				var element = document.createElement("div");
				element.id = 'addFeed' + data.feedId;
				if(this.props.embededFrom !== undefined && this.props.embededFrom == 'GROUP') {
					$('#feed_wholegroupbox').prepend(element);
				} else {
					if(selectedTab == 'RECENT_FEED_ACT' || selectedTab == 'MY_TODO') {
						$('#feed_noti').prepend(element);
					} else {
						
						if($('#new_notibox').length == 0)
							$('#feed_noti').prepend(element);
						else
							$('#new_notibox').prepend(element);
					}
					
				}

				var array = [];
				array.push(data);
				var groupId = 0;
				var groupInfo = [];
				if(this.props.groupInfo !== undefined) {
					groupId = this.props.groupInfo.groupId;
					groupInfo = this.props.groupInfo;
				}
				
				/////
				//해당 피드를 등록한 사람의 정보
				var key = data.feedId;
				var member = data.memberVo;
				//해당 피드에 속한 팔로워 리스트
				var follwers = data.feedFollowerList;
				//해당 피드에 속한 태그 리스트
				var tags = data.feedTagList;
				//해당 피드에 속한 파일 리스트
				var files = data.fileList;
				// 해당 피드의 지식 등록 정보
				var kldgVo = data.kldgVo;
				// 전자결재 피드의 경우 taskId를 가져온다.
				var taskId = data.infId;
				// 그룹을 클릭시 해당 그룹에 대한 정보를 담은 객체
				var followerCnt = data.followerCnt;
				// 해당 피드에 대해서 나 자신의 팔로워 여부 (0, 1)
				//var isFollow = data.isFollowStr;
				var isFollow = 'true';
				var isPublic = 0;
				
				for(var i=0; i< follwers.length; i++) {
					if(follwers[i].followerType == 'GROUP' && follwers[i].isPublic == 1) {
						isPublic = 1; break;
					}
				}
		
				React.render(
					React.createElement(Feed, {
						key: key, 
						feedTitle: data.feedTitle, 
						feedId: data.feedId, 
						feedType: data.feedType, 
						regMember: member, 
						feedfollower: follwers, 
						tag: tags, 
						dueDate: data.dueDate, 
						endDate: data.endDate, 
						regDttm: data.regDttm, 
						files: files, 
						feedContents: data.feedContents, 
						cmtLstSecFeedId: data.cmtLstSecFeedId, 
						commentFeedList: data.commentFeedList, 
						cmtCnt: data.cmtCnt, 
						shareCnt: data.shareCnt, 
						likeItCnt: data.likeItCnt, 
						likeItByMe: data.likeItByMe, 
						feedPollList: data.feedPollList, 
						resultFeedPollList: data.resultFeedPollList, 
						bookmark: data.bookmarkList, 
						groupId: groupId, 
						kldgVo: kldgVo, 
						taskId: taskId, 
						groupInfo: groupInfo, 
						followerCnt: followerCnt, 
						isFollow: isFollow, 
						isPublic: isPublic}
					)
					, document.getElementById(element.id)
				);
				
				//React.render(<FeedList data={array} groupId={groupId} feedAddAct={'true'} />, document.getElementById(element.id));
			},

			resetFeed: function(data) {
				
				$("#addFeed").removeAttr("disabled");
			
				var isGoTab = checkSelectedTab();
			
				if(!isGoTab) {
					var groupInfo = this.props.groupInfo === undefined ? '' : this.props.groupInfo; 
					goTabAfterWriteFeed(groupInfo);
					return;
				}
			
				if(this.props.fromServer !== undefined && this.props.fromServer == 'Y') {
					window.close();
					return;
				}

				data['resultFeedPollList'] = [];
				this.getFeedListAfterAdd(data);
				
				if($('#recentAct').length == 1 && $('#myTodoList').length == 1) {
					React.unmountComponentAtNode(document.getElementById('recentAct'));
					React.render(React.createElement(RecentActList, {baseurl: _FeedApp_MEMBER_WIDGET_ACTIVITY}), document.getElementById('recentAct'));
				
					React.unmountComponentAtNode(document.getElementById('myTodoList'));
					React.render(React.createElement(TodoList, null), document.getElementById('myTodoList'));
				
					if(contentsType == 'GROUP') {
						for(var x in data.feedFollowerList) {
							var fwldata = data.feedFollowerList[x];
							if(fwldata.followerType == 'GROUP') {
								Reloader.reloadObservers({'type':'group', 'groupId': fwldata.followerId , 'isGroupChange':'false'});
								break;
							}
						}			
					}
				}
				
				$("div.feed_tab li.update span").removeClass('onHover');
				$("div.feed_tab li.doing span").removeClass('onHover');
				$("div.feed_tab li.survay span").removeClass('onHover');
				$("div.feed_tab li.update span").addClass('onHover');
				$("div.feed_tab li.update").removeClass('icon_update_on');
				$("div.feed_tab li.doing").removeClass('icon_feeddoing_on');
				$("div.feed_tab li.survay").removeClass('icon_feedsurvay_on');

				$("div.feed_tab li.update").addClass('icon_update_on');
				$("div.feed_tab li.doing").addClass('icon_feeddoing_off');
				$("div.feed_tab li.survay").addClass('icon_feedsurvay_off');
				
				$('#noMoreFeedHere').remove();
				
				this.setState( {
						feedTitle    	 	: '',
						feedType	 	 	: 'GENERAL', 
						feedContentsType 	: '',
						feedContents	 	: '',
						feedTagList		 	: [],
						feedFollowerList 	: [],
						feedFileList  	 	: [],
						ogValidate		 	: '',
						selectTab		    : 'TOTAL',	
						});
				window.focus();
			},

			feedAdd: function() {
				
				$("#addFeed").attr("disabled", "disabled");
				
				if(this.state.feedTitle.trim() === '') {
					
					var spfilelength = $('#file_preview > span').length;
				
					if(this.state.feedFileList.length > 0 || spfilelength > 0) {
						
					} else return;
				}
				var baseurl = _FeedApp_BASE_FEED;

				var followerList = [];				

				var me = _FeedApp_session_memberId;
				var addMySelf = true;
				var followerMySelf;
				for(var i=0; i<this.state.feedFollowerList.length; i++) {
						var fId = this.state.feedFollowerList[i].followerId + '';
					if(fId === me) {
						addMySelf = false;
						break;
					}
				
				}

				if(addMySelf) {

					followerMySelf = {"itemId"    	 : '14',
									"itemType"  	 : 'FEED',
									"followerId"     : _FeedApp_session_memberId,
									"followerType"   : 'MEMBER',
									"followerName"   : '',
									"followerEmail"  : '',
									"followerImgUrl" : ''
									}

					followerList = this.state.feedFollowerList.concat(followerMySelf);
				} else {
					followerList = this.state.feedFollowerList;
				}
				var dueDate = '';
				try {
					dueDate = $('#dueDate').val().trim();
					var regex = /[^0-9]/g;
   					dueDate = dueDate.replace(regex, '');
				} catch(e){}	

				//피드 해쉬태그 캐치
				var addTagArray = [];
				var writtenTagArray = this.state.feedTitle.match(/#\S+/g);

				this.state.feedTagList.forEach(function(tag){

					if(writtenTagArray !== null) {
						for(var j=0; j<writtenTagArray.length; j++) {
							if(writtenTagArray[j].replace('#','').toLowerCase() === tag.tagName.toLowerCase()) {
								writtenTagArray.splice(j, 1);
							}
						}
					}

				});

				if(writtenTagArray !== null && writtenTagArray.length > 0 ) {
					writtenTagArray.forEach(function(str){
						var tagName = str.replace('#', '');
						var tagVo = {
								"tagName": tagName
								}

						addTagArray.push(tagVo);
					});
				}

				var feedPollList=[];

				if(this.state.feedType==='POLL') {
					baseurl = _FeedApp_BASE_POLL;
					var questInputClass = $('.questions');
					for(var i=0; i<questInputClass.length; i++) {
						var inputVal = questInputClass[i].value;
						if(inputVal != '') {
							var PollVo = {
										 "seq": i ,
										 "choice": inputVal 
										 };
							feedPollList.push(PollVo);
						}

					}

				}
				
				var memberId = _FeedApp_session_memberId;
				var fileArr = this.state.feedFileList;
				setSharepointFileInfo(fileArr, this.state.feedId, memberId);

        		var jsondata = {
							  "regMemberId"		 : _FeedApp_session_memberId,
	        			      "feedTitle"		 : this.state.feedTitle,
	        			      "feedType"		 : this.state.feedType,
	        			      "contentsType"	 : this.state.contentsType,
	        			      "feedContents"	 : this.state.feedContents,
	        			      "feedFollowerList" : followerList,
	        			      "feedTagList"      : this.state.feedTagList.concat(addTagArray),
							  "fileList"		 : fileArr,
							  "followerCnt"		 : followerList.length,
							  "dueDate"			 : dueDate,
							  "feedPollList"	 : feedPollList
			        		};
				
	       		ajaxAdd(baseurl, jsondata, this.resetFeed);

			},

			OGTrigger: function(data) {
				var showRemove = 'true';
				React.render(React.createElement(MainOG, {data: data, removeOG: this.removeOGTag, showRemove: showRemove}), document.getElementById('ogArea'));
				addDrawTopLine();
			},

			removeOGTag:function() {
				this.state.ogValidate = 'false';
				this.state.feedContents = '';
				React.unmountComponentAtNode(document.getElementById('ogArea'));
				$('#ogArea').empty();
				removeDrawTopLine();
			},

			getResultVal: function(result, i) {
               	if(!result) return null;
               	return (typeof(result[i]) == 'undefined' ? "" : result[i]);
           	},

            urlParse: function(urlStr) {
				var matchExp      = /^((\w+):\/\/\/?)?((\w+):?(\w+)?@)?([^\/\?:]+)?(:\d+)?(.*)?/;
           		var regExpHost  = /^(.+\.)?(.+\..+)$/;
               	var r         = matchExp.exec(urlStr);
               	var results   = r;
               	var domain    = this.getResultVal(results,6);
           	    return regExpHost;
			},

			getLinks : function(text) {
				var expression = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
           		return (text.match(expression));
			},

			ogSetting: function(data, ogValidate) {
				if(ogValidate == 'true') {
					this.state.feedContents = JSON.stringify(data);
					this.state.ogValidate = ogValidate;
					this.OGTrigger(data);
				} else {
					this.state.ogValidate = ogValidate;
				}
			},
			
			componentDidMount: function() {

				var self = this;

				if(this.props.fromServer !== undefined && this.props.fromServer == 'Y') {
					$(".feedContentsInput").val(self.props.feedTitle);
				}
				
				_getLengthCheckCommand($(".feedContentsInput"));
				
				/*
				$(".feedContentsInput").bind('keydown', function(e){
				
					var keycode = (e.keyCode ? e.keyCode : e.which);
					
					if(_Grobal_isEnterKeyReg == 1) {
					
							var v = $(this).val();
							if(keycode === 13 && e.ctrlKey) { // 컨트롤과 엔터함께누를경우
								
								var el = document.getElementById('feedContentsInput'),
						            allText = $(this).val(),
						            currentPos = getCaret(el),
						            beforeText = allText.substr(0, currentPos) + '\n',
						            afterText = allText.substr(currentPos);
						
								
						
						        $(this).val(beforeText + afterText);
						        
						        setCaretPosition(el, currentPos);
								
						
							} else if(keycode === 13) {
								$('#addFeed').click();
							} else {
								//alert(GetIEVersion());
							}
							
						}
				});
				*/
				
				$(".feedContentsInput").bind('input keyup paste', function(e){
					var keycode = (e.keyCode ? e.keyCode : e.which);
					if( (keycode === 13 || keycode === 32)  && 
					    self.state.ogValidate != 'true' && 
						(self.state.feedType !== 'NOTICE' || self.state.feedType !== 'POLL') ) {
						
						// 엔터키 등록을 하지 않을 경우만 링크 정보 읽어옴.
						if(_Grobal_isEnterKeyReg == 0) {
							var urlStr = this.value.trim();
							var urlArray = self.getLinks(urlStr);
							if(urlArray !=null && urlArray.length>0) {
								var url = urlArray[0].replace("http://","").replace("https://","");
								$.ajax({
	      								url: contextpath + '/opengraph',
	      								dataType: 'json',
										type : 'POST',
										data : { url : url},
	      								cache: false,
	      								success: function(data) {
												self.state.feedContents = JSON.stringify(data);
												self.state.ogValidate = 'true';
												self.OGTrigger(data);
						    			}.bind(this),
	      								error: function(xhr, status, err) {
											self.state.ogValidate = 'false';
	        								console.error(urlStr, status, err.toString());
	      								}.bind(this)
	    						});	
							}
						}
						// 여기에 엔터키 등록 확인 후 add 하도록 처리
						/*
						if(_Grobal_isEnterKeyReg == 1) {
							
							if(keycode === 13 && e.ctrlKey) {
								/////
							} else {
								$('#addFeed').click();
							}
						}
						*/
					}
				
					e.stopPropagation();
				}).elastic();


				$('#addFeed').click(function() {
					var feedType = self.state.feedType;
					if(feedType !== 'NOTICE') {
	   					var mentionVal = $('.feedContentsInput').mentionsInput('getValue');
						self.setState({feedTitle:mentionVal});
					} else if(feedType == 'NOTICE') {
						var feedTitle = $('#noticeTitle').val();
						var feedContents = '{"NOTICE":{"contents":"'+$('#feedContentsInput').val() + '"}}'
						self.setState({feedTitle:feedTitle, feedContents:feedContents});
					}

				});

				$('.aa').click(function() {
					if($('.feed_select').hasClass('hidden')) {
						$('.feed_select').removeClass('hidden').show();;
					} else {
						$('.feed_select').addClass('hidden').hide();
					}
				});

			},

			checkFeedType: function(feedType) {
				this.state.feedType = feedType;
			},

			titleContentsSetting:function(title, contents) {
				this.state.feedTitle = title;
	        	this.state.feedContents = contents;
			},

			render: function() {

				var fromGroupInfo = [];				

				if(this.props.groupInfo !== undefined) {
					var groupFollower = {"itemId"    	 : '14',
										"itemType"  	 : 'FEED',
										"followerId"     : this.props.groupInfo.groupId,
										"followerType"   : 'GROUP',
										"followerName"   : this.props.groupInfo.groupName,
										"followerEmail"  : '',
										"followerImgUrl" : ''
									}

					fromGroupInfo.push(groupFollower);
				}

				var existFeedTitle = '';
				if(this.props.feedTitle !== undefined && this.props.feedTitle !== '') {
					existFeedTitle = 'y';
				}

        		return ( React.createElement(MainFeedDropzoneComponent, {
								config: componentConfig, 
  						   	    eventHandlers: eventHandlers, 
								djsConfig: djsConfig, 
								fromGroupInfo: fromGroupInfo, 
							    fileHandler: this.fileHandler, 
								followerHandler: this.followerHandler, 
								tagHandler: this.tagHandler, 
								feedAdd: this.feedAdd, 
								checkFeedType: this.checkFeedType, 
								titleContentsSetting: this.titleContentsSetting, 
								targetId: this.props.targetId, 
								targetName: this.props.targetName, 
								ogSetting: this.ogSetting, 
								existFeedTitle: existFeedTitle, 
								removeOGTag: this.removeOGTag}
							 ) 
				);
	        }
		});