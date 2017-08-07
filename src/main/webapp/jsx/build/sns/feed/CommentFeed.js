	
		// 댓글 
		var CommentFeed = React.createClass({displayName: "CommentFeed",
			// 데이터 초기화
	    	getInitialState : function () {
	            return {
			      	 feedId				  :''
	      			,feedTitle			  :''
	      			,feedType			  :''
	      			,feedContents		  :''
					,feedfollower         :''
					,pFeedId			  :''
					,pMemberId	          :''
					,pMemberName 		  :''
	      			,shareCnt		 	  :''
	      			,likeItCnt			  :''
					,likeItList			  :''
					,likeItByMe			  : 0
					,cmtMember			  :''
					,memberSyncKey		  :''
					,receiveMemberSyncKey : ''
					,regDttm			  :''
					,files				  :[]
					,ogValidate			  :'false'
					,pFeedId			  :''
					,src				  :''
					,isFollow			  :'false'
					,isBookmarkByMe		  :'false'
					,regFeedKldg		  :'false'
					,thisTimer			  :null
					,timeoutTime		  :800
					,insidePopup		  :false
	      		};
        	},

 			componentWillReceiveProps: function (nextProps) {
    			this.setState({	
								isFollow:nextProps.pFeedData.isFollow, 
								isBookmarkByMe:nextProps.pFeedData.isBookmarkByMe,
								regFeedKldg:nextProps.pFeedData.regFeedKldg
							  });
  			},

			OGTrigger: function(data) {
				commentOGTrigger(this, data);
			},
	
			removeOGTag:function() {
				commentRemoveOGTag(this);
			},

			tooltipPosition: function(element) {
				var pos = $(element).offset();
				var width = $(element).width();
				$('.over_feed_gate').css({
	    			left: pos.left + 'px',
	    			top: pos.top - 180 + 'px'
				});
			},

			tooltipRender: function(data) {
				React.render(React.createElement(FollowerTooltip, {followerInfo: data, itemId: this.state.feedId}), document.getElementById('sns-tooltip'));
			},

			getFollowerInfo: function(info) {
				var infoArray = info.split(';');
				var followerType = infoArray[0];
				var followerId = infoArray[1];
				var baseurl = _CommentFeed_BASE_FOLLOWER + '/members/'+followerId;
				if(followerType ==='GROUP') {
					baseurl = _CommentFeed_BASE_FOLLOWER + '/groups/'+followerId;
				}
				
				ajaxGetForSync(baseurl, '',  this.tooltipRender);

			},

			componentDidMount: function() {
				commentComponentDidMount(this);
  			},
	
			cmtLikeitResult: function(data){
				commentCmtLikeitResult(this, data);
			},
	
			cmtLikeit: function() {
				var baseurl = _CommentFeed_BASE_LIKEIT;
	        	var jsondata = {
					  	"regMemberId"		 : _CommentFeed_session_memberId,
	        	      	"feedId"		 	 : this.state.feedId
	        	};
       			ajaxAdd(baseurl, jsondata, this.cmtLikeitResult);
			},
			
			cmtGetFanaticList : function() {
				showFanaticList(this.state.feedId, 'cmt');
			},

			shareFollower: function(data) {
				commentShareFollower(this, data);
			},

			share:function(){
				commentShare(this);
			},

			answerTag: function() {
				commentAnswerTag(this);
			},	

			removeAnswerTag: function() {
				commentRemoveAnswerTag(this);
			},

			//더보기 클릭 이벤트 처리
			commentMoreLayout: function() {
				commentMoreLayout(this);
			},

			//더보기 창 팔로우 이벤트 처리<
			commentFollow: function() {
				this.props.feedFollow();
			},
 		
			//더보기 창 팔로우 이벤트 처리
			commentUnfollow: function() {
				this.props.feedUnfollow();
			},

			//더보기 창 즐겨찾기 이벤트 처리
			addCommentBookmark: function() {
				this.props.addFeedBookmark();
			},

			//더보기 창 즐겨찾기해제 이벤트 처리
			removeCommentBookmark: function() {
				this.props.removeFeedBookmark();
			},

			//더보기 창 지식 이벤트 처리
			regCommentKldg: function() {
				this.props.regFeedKldg();
			},

			//더보기 창 지식 이벤트 처리
			removeCommentKldg: function() {
				this.props.removeFeedKldg();
			},


 			//더보기 창 삭제 이벤트 처리
			deleteComment: function() {
				var feedVo = {"feedId":this.state.feedId, "pFeedId":this.state.pFeedId};
				ajaxDelByJson(_CommentFeed_BASE_FEED, feedVo, this.deleteCommentCallback);				

			},
			
			commentUpdate: function(contents, mentions, tags) {
				var tagList = [];
				if(tags !== null && tags.length > 0 ) {
					tags.forEach(function(tag){
						var tagName = tag.replace('#', '');
						var tagVo = {
								"tagName": tagName
								}

						tagList.push(tagVo);
					});
				}
				
				var followerList = [];
				if(mentions.length > 0 ) {
					mentions.forEach(function(mention){
						var followerVo = {
											"itemId"    	 : '14',
											"itemType"  	 : 'FEED',
											"followerId"     : mention.uid,
											"followerType"   : 'MEMBER',
											"followerName"   : mention.name,
											"followerEmail"  : '',
											"followerImgUrl" : ''
										}

						followerList.push(followerVo);
					});
				}
				
				this.props.feedCommentFollowerAndTagSetting(followerList, tagList);
				
			    var jsondata = {
			    		"feedId"			: this.state.feedId,
						"regMemberId"		: _CommentFeed_session_memberId,
        	    		"feedTitle"			: contents,
						"pFeedId"			: this.state.pFeedId,
						"feedTagList"		: tagList,
        	    		"feedFollowerList" 	: followerList,
        			};
				
				var baseurl = _CommentFeed_BASE_FEED_COMMENT;
				ajaxUpd(baseurl, jsondata, this.updateComplete);
				
			},
			
			updateComplete: function(data) {
				var subtitleId   = "subtitle_"+this.state.feedId;
				var tooltipClass = 'commentTooltip_'+this.state.feedId;
				React.unmountComponentAtNode(document.getElementById(subtitleId));
				$(React.findDOMNode(this.refs.subtitle)).html(data.feedTitle);
				$(React.findDOMNode(this.refs.subtitle)).linky({"tooltipId":tooltipClass});
			},
			
			cancelModify: function() {
				var subtitleId   = "subtitle_"+this.state.feedId;
				var tooltipClass = 'commentTooltip_'+this.state.feedId;
				React.unmountComponentAtNode(document.getElementById(subtitleId));
				$(React.findDOMNode(this.refs.subtitle)).html(this.state.feedTitle);
				$(React.findDOMNode(this.refs.subtitle)).linky({"tooltipId":tooltipClass});
			},
			
			modifyComment: function() {
				$(React.findDOMNode(this.refs.subtitle)).empty();
				var subtitleId   = "subtitle_"+this.state.feedId;
				React.render(React.createElement(CommentFeedModifyElement, {contents: this.state.feedTitle, commentUpdate: this.commentUpdate, cancelModify: this.cancelModify, feedId: this.state.feedId}), document.getElementById(subtitleId));
			},
			
			deleteCommentCallback: function() {
				// MsgPopup(_FEED_CommentFeed_MSG_FEEDDELETEDMSG);
				var id = '[data-reactid='+this._reactInternalInstance._rootNodeID+']';
				$('div').find('[data-reactid="'+ this._reactInternalInstance._rootNodeID + '"]').addClass('hiddenArea');
				this.props.deleteCommentAct();
			},
			
 			getMemberInfo:function() {
				getMemberInfo(this.state.cmtMember.memberId, this.state.cmtMember.memberName);
			},
			
			getReceiveMemberInfo:function() {
				var targetMemberInfo = $(React.findDOMNode(this.refs.targetMember)).attr('rel').split(';');
				getMemberInfo(targetMemberInfo[0], targetMemberInfo[1]);
			},
			
			getLyncStatus: function() {
				var presenceAreaId = 'presence_'+this.props.commentData.feedId;
				var userName = this.state.memberSyncKey + "@hanwha.com";
				var userElementId = getId(userName);
				var presenceId = 'presence-'+userElementId;
			
				React.render(React.createElement(Presence, {presenceId: presenceId}),  document.getElementById(presenceAreaId));
    			if(!nameCtrl) {
    	    		return;
    			}
    			
   		 		try {
   		 			nameCtrl.GetStatus(userName, presenceId);
   		 			nameCtrl.OnStatusChange = onLyncPresenceStatusChange;
   		 		} catch(e){}
   	 		
			},

			getReceiveMemberSyncKey: function() {
				var targetMemberInfo = $(React.findDOMNode(this.refs.targetMember)).attr('rel').split(';');
				var baseurl = _Follower_BASE_FOLLOWER + '/members/'+targetMemberInfo[0];
				ajaxGetForSync(baseurl, '',  this.getSyncKey);
			},
		
			getSyncKey: function(data) {
				var receiveMemberSyncKey = data.followerMappingInfo[0]===undefined?this.props.regMemberId:data.followerMappingInfo[0].syncKey
				this.state.receiveMemberSyncKey = receiveMemberSyncKey;
			},
			
			openLyncMenuImg: function() {
				openLyncMenu(this.state.memberSyncKey, React.findDOMNode(this.refs.ffImg),'','-560','-100');
			},
		
			openLyncMenuName: function() {
				openLyncMenu(this.state.memberSyncKey, React.findDOMNode(this.refs.ffName),'','-560','-100');
			},
		
			openLyncMenuReceiveName: function() {
				this.getReceiveMemberSyncKey();
				openLyncMenu(this.state.receiveMemberSyncKey, React.findDOMNode(this.refs.targetMember),'','-560','-100');
			},
			
			hideLyncMenu: function() {
				hideLyncMenu();
			},
					
			// 댓글 렌더링
			render: function() {
				if(this.state.feedId == ''){
       				this.state.feedId 	  			= this.props.commentData.feedId;
      				this.state.feedTitle  			= this.props.commentData.feedTitle;
      				this.state.feedType   			= this.props.commentData.feedType;
					this.state.feedfollower 		= this.props.commentData.feedFollowerList;
      				this.state.feedContents 		= this.props.commentData.feedContents;
	 	  			this.state.shareCnt				= this.props.commentData.shareCnt;
	 	  			this.state.likeItCnt			= this.props.commentData.likeItCnt;
					this.state.regDttm				= this.props.commentData.regDttm;
					this.state.cmtMember			= this.props.commentData.memberVo;
					this.state.pMemberId			= this.props.commentData.pMemberId;
					this.state.pMemberName			= this.props.commentData.pMemberName;
					this.state.files				= this.props.commentData.fileList;
					this.state.pFeedId				= this.props.commentData.pFeedId;
					this.state.likeItList			= this.props.commentData.likeItList;
					this.state.src					= _CommentFeed_MEMBER_PIC+'?memberId=' + this.state.cmtMember.memberId;
					this.state.likeItByMe			= this.props.commentData.likeItByMe;
				}
	        	
				this.state.isFollow = this.props.isFollow;
				
				var ogAreaId   = "commentogArea"+this.state.feedId;
				var subtitleId   = "subtitle_"+this.state.feedId;
				var commentMoreLayoutId = "commentMoreLayout"+this.state.feedId;
				var commentSliderId = 'commentSlider'+this.state.feedId;
				var orgFeedFollower = this.state.feedfollower;
				var commentLikeItByMeAreaId = 'commentLikeItByMeArea'+this.state.feedId; 
				var timeago = new Date(this.state.regDttm).toISOString();
				var titleTimeAgo = new Date(this.state.regDttm).toLocaleString();
				var targetMessege = '';
				var targetName = '';
				if(this.state.pMemberName !==undefined && this.state.pMemberName.length >0) {
					targetMessege = _FEED_CommentFeed_MSG_REPLYFORWHAT;
					targetName = this.state.pMemberName;
					var targetTooltipInfo = this.state.pMemberId+';'+targetName;
				}
					
				var self = this;
				
				/*if(this.state.likeItList.length>0) {
					this.state.likeItList.forEach(function(likeIt){
						if(likeIt.regMemberId == _CommentFeed_session_memberId) {
							self.state.likeItByMe = 1;
						}
					});
				}*/

				var likeItByMeMsg = _FEED_CommentFeed_MSG_LIKEIT;
				if(this.state.likeItByMe === 1) {
					likeItByMeMsg = _FEED_CommentFeed_MSG_CANCELLIKEIT;
				}

				var tooltipInfo = 'MEMBER;'+this.state.cmtMember.memberId;
				var tooltipClass = 'commentTooltip_'+this.state.feedId;
				var picClass = 'pic_small '+tooltipClass;
				var memberPosition = this.state.cmtMember.memberPositionName===undefined?'':this.state.cmtMember.memberPositionName;
				var commentFeedId = 'commentFeed_'+this.state.feedId;
				this.state.memberSyncKey = this.props.commentData.memberVo.syncKey;
				var presenceAreaClass = 'presenceArea_'+ this.state.memberSyncKey +'_hanwha_com';
				var presenceAreaId = 'presence_'+this.props.commentData.feedId;
				var imgStyle = {'marginRight':'10px', 'borderRadius':'50%', 'width':'40px', 'height':'40px'};
				
				return (
						React.createElement("div", {className: "reply_contents", id: commentFeedId}, 
							React.createElement("dl", {style: {'marginLeft':'23px'}}, 
	            				React.createElement("dt", {ref: "commentPic", style: {'float':'left','cursor':'pointer'}}, React.createElement("span", {className: "presence-img"}, React.createElement("img", {src: this.state.src, ref: "ffImg", onMouseOver: this.openLyncMenuImg, onMouseOut: this.hideLyncMenu, style: imgStyle})), React.createElement("span", {className: presenceAreaClass, style: {'marginLeft':'-20px'}, id: presenceAreaId})), 
                				React.createElement("dd", {className: "feed_name", rel: tooltipInfo}, React.createElement("span", {rel: tooltipInfo, onClick: this.getMemberInfo, ref: "ffName", onMouseOver: this.openLyncMenuName, onMouseOut: this.hideLyncMenu}, this.state.cmtMember.memberName, " ", memberPosition), "  ", React.createElement("span", {style: {'color': '#27641b'}}, targetMessege), React.createElement("span", {ref: "targetMember", onClick: this.getReceiveMemberInfo, onMouseOver: this.openLyncMenuReceiveName, onMouseOut: this.hideLyncMenu, rel: targetTooltipInfo, style: {'color': '#264f8c'}}, targetName)), 
								React.createElement("dd", {className: "time_write"}, React.createElement("abbr", {className: "timeago", ref: "timeago", title: timeago}, titleTimeAgo)), 
                				React.createElement("dd", {ref: "subtitle", id: subtitleId, className: "rco_txt", style: {'wordWrap':'break-word'}}, this.state.feedTitle), 
								React.createElement("div", {id: commentSliderId, style: {'marginLeft':'55px', 'marginTop':'0', 'marginLeft':'35px'}}), 
								React.createElement("div", {className: "af_list_wrap", style: {'marginLeft':'55px'}}, 
									React.createElement("div", {id: ogAreaId})
								), 
								React.createElement(CommentAttachFileList, {fileList: this.state.files})

            				), 

            				React.createElement("ul", {className: "rc_vote"}, 
								React.createElement("li", {className: "mark_vote", style: {'marginLeft':'0'}, onClick: this.cmtLikeit}, React.createElement("img", {src: "../images/btn_like.png", width: "14", height: "13"})), 
                                React.createElement("li", {onClick: this.cmtLikeit}, likeItByMeMsg, "  "), 
                                React.createElement("li", {id: 'cmtfeedlikecnt' + this.state.feedId, onClick: this.cmtGetFanaticList, style: {'paddingLeft':'4px'}}, React.createElement("strong", null, this.state.likeItCnt)), 
                                React.createElement("li", {onClick: this.answerTag, className: "mark_vote"}, React.createElement("img", {src: "../images/btn_reply.png", width: "14", height: "13"})), 
                                React.createElement("li", {onClick: this.answerTag}, _FEED_CommentFeed_MSG_REPLY), 
                                React.createElement("li", {onClick: this.share, className: "mark_vote"}, React.createElement("img", {src: "../images/btn_sympathy.png", width: "16", height: "13"})), 
                                React.createElement("li", {onClick: this.share}, _FEED_CommentFeed_MSG_SHARE), 
                                React.createElement("li", {onClick: this.commentMoreLayout, style: {'display':'none'}}, _FEED_CommentFeed_MSG_MORE), 
                                React.createElement("li", {onClick: this.commentMoreLayout, style: {'marginLeft':'20px'}, className: "mark_vote"}, React.createElement("img", {src: "../images/btn_more.png", width: "18", height: "13"}))
							), 
							React.createElement("div", {id: commentLikeItByMeAreaId}), 
							React.createElement("div", {className: "for_select2"}, 
								React.createElement("div", {id: commentMoreLayoutId, className: "more_select2", style: {'display':'none'}}, 
                                   	React.createElement("ul", null, 
                                       	React.createElement("li", {onClick: this.commentFollow, 		 ref: "iconCommentFollowId", 			className: "icon_ms"}, React.createElement("img", {src: "../images/btn_selectmore1.png"})), 
                                        React.createElement("li", {onClick: this.commentFollow, 		 ref: "txtCommentFollowId", 			className: "txt_ms"}, _FEED_CommentFeed_MSG_FOLLOW), 
										React.createElement("li", {onClick: this.commentUnfollow, 		 ref: "iconCommentUnfollowId", 		className: "icon_ms"}, React.createElement("img", {src: "../images/btn_selectmore1.png"})), 
                                        React.createElement("li", {onClick: this.commentUnfollow, 		 ref: "txtCommentUnfollowId", 			className: "txt_ms"}, _FEED_CommentFeed_MSG_UNFOLLOW), 
                                        React.createElement("li", {onClick: this.addCommentBookmark, 	 ref: "iconAddCommentBookmarkId", 		className: "icon_ms"}, React.createElement("img", {src: "../images/btn_selectmore7.png"})), 
                                        React.createElement("li", {onClick: this.addCommentBookmark, 	 ref: "txtAddCommentBookmarkId", 		className: "txt_ms"}, _FEED_CommentFeed_MSG_BOOKMARK), 
                                        React.createElement("li", {onClick: this.removeCommentBookmark, ref: "iconRemoveCommentBookmarkId", 	className: "icon_ms"}, React.createElement("img", {src: "../images/btn_selectmore8.png"})), 
                                        React.createElement("li", {onClick: this.removeCommentBookmark, ref: "txtRemoveCommentBookmarkId", 	className: "txt_ms"}, _FEED_CommentFeed_MSG_CLEARBOOKMARK), 
                                        React.createElement("li", {onClick: this.regCommentKldg, 		 ref: "iconRegCommentKldgId", 			className: "icon_ms"}, React.createElement("img", {src: "../images/btn_selectmore2.png"})), 
                                        React.createElement("li", {onClick: this.regCommentKldg, 		 ref: "txtRegCommentKldgId", 			className: "txt_ms"}, _FEED_CommentFeed_MSG_MAKEKNOWLEDGE), 
										React.createElement("li", {onClick: this.removeCommentKldg, 	 ref: "iconRemoveCommentKldgId", 		className: "icon_ms"}, React.createElement("img", {src: "../images/btn_selectmore2.png"})), 
                                        React.createElement("li", {onClick: this.removeCommentKldg, 	 ref: "txtRemoveCommentKldgId", 		className: "txt_ms"}, _FEED_CommentFeed_MSG_CLEARKNOWLEDGE), 
										React.createElement("li", {onClick: this.deleteComment, 		 ref: "iconDeleteCommentId", 			className: "icon_ms"}, React.createElement("img", {src: "../images/btn_selectmore6.png"})), 
                                        React.createElement("li", {onClick: this.deleteComment, 		 ref: "txtDeleteCommentId", 			className: "txt_ms"}, _FEED_CommentFeed_MSG_DELETE)
                                   	)
                                )
							)
						)
					);
				}

			});
	
		// Comment 파일
		var CommentAttachFileList = React.createClass({displayName: "CommentAttachFileList",
			// 파일 리스트  렌더링
			render: function() {

				var filesArray = [];
				var data = this.props.fileList;
				if(data!==undefined && data.length>0) {
					data.forEach(function(file){
						if(file.fileId != 0) {
							filesArray.push(React.createElement(CommentAttachFile, {key: file.fileId, file: file}));
						}
					});
	
					if(filesArray.length > 0) {
						return (
								React.createElement("div", {className: "af_list_wrap"}, 
									filesArray
            					)  
						);
					} else {
						return (React.createElement("div", {style: {'borderBottom':'none'}}));
					}

				} else {
					return (React.createElement("div", null));
				}
			}

		});
	
		// 파일 
		var CommentAttachFile = React.createClass({displayName: "CommentAttachFile",
			// 파일  렌더링
			render: function() {
				var fileUrl = contextpath + "/common/files/"+this.props.file.fileId;
				if (this.props.file.repositoryType == "SHAREPOINT") {
					fileUrl = this.props.file.fileUrl;
				}
				
				var ext = 'unknown';
				var idx = this.props.file.fileName.lastIndexOf('.');
    	  		if(idx > 0) {
        	  		ext = this.props.file.fileName.substring(idx+1).toLowerCase();
        	  	}
				
				var extClassName = 'ico-ext ico-'+ext;
				
				return (
						React.createElement("div", {className: "af_list02"}, 
                   			React.createElement("dl", null, 
                      			React.createElement("dt", null, React.createElement("img", {className: extClassName, width: "19", height: "20"})), 
                      			React.createElement("dd", {className: "name_file"}, React.createElement("strong", null, React.createElement("a", {href: fileUrl, target: "_blank"}, this.props.file.fileName)), React.createElement("br", null), React.createElement("span", {className: "txt_post"})), 
								React.createElement("dd", {className: "mod_cle", style: {'display':'none'}}), 
								React.createElement("dd", {className: "next_line"})
							)
						)
				);
			}
		});
	
	
		var CommentFeedModifyElement = React.createClass({displayName: "CommentFeedModifyElement",

			getInitialState: function() {
        		return {
						orgContents		  : ''
				};

        	},			

			componentDidWillUnmount:function() {
				$(React.findDOMNode(this.refs.modifyCommentContentsInput)).mentionsInput('destroy');
			},

			componentDidMount: function () {
				var self = this;
				$(React.findDOMNode(this.refs.modifyCommentContentsInput)).mentionsInput({
					contents   : self.props.contents,
            		showAtCaret: true,
					source: function(request, response) {
						if(request.term.length > 1) {
       	    	 			$.ajax({
                					url	    : _NormalType_BASE_MENTIONS+'/'+request.term,
       	         					type    : "get",
        	        				success : function(data) {
											var array = [];
											data.forEach(function(member){
												if(member.id != _NormalType_session_memberId) {
													var mentionVo = {
														value : member.name,
														uid	  :	member.id,
														dept  : member.deptFullPath
													};
													array.push(mentionVo);
												}			
											});
											response(array);

        	        				},
        	        				error	: function(jqXHR, textStatus, errorThrown){
        	            	 			console.log( textStatus);
        	        				}
        	    			});
						}
        			}
        		}).elastic();

				$(React.findDOMNode(this.refs.modifyCommentContentsInput)).bind('keydown', function(e){
				
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
				
				_getLengthCheckCommand($('#modifyCommentContentsInput'));
								
				var parent = $(React.findDOMNode(this.refs.modify_comment_area));
				parent.children('.mentions-input').css('height', '');
				this.initialSetting(parent.children('.mentions-input'));
			},

				
			initialSetting: function(element) {
				this.mentionContents(element, this.props.contents);
			},	
			
			mentionContents: function(element, contents) {
        		var regexpWithWhiteSpaceEn = /@\[(\w+\s+\w+)\]\(([0-9]+)\)/g;
        		var regexpWithWhiteSpaceKo = /@\[(\S+\s+\S+)\]\(([0-9]+)\)/g;
        		var regexpWithNoramal = /@\[(\S+)\]\(([0-9]+)\)/g;
        		var textareaContents = '';
        		if(regexpWithNoramal.test(contents)){
        			textareaContents = contents.replace(regexpWithNoramal, '$1');
        		}
        		$(React.findDOMNode(this.refs.modifyCommentContentsInput)).val(textareaContents);
        		textareaContents = textareaContents.replace("\n", "<br/>");
        		if(textareaContents == '')textareaContents = contents;
        		element.find('.commentBox').children('div').html(textareaContents);
        		
        		var convertContents = '';
        		if(regexpWithNoramal.test(contents)){
        			convertContents = contents.replace(regexpWithNoramal, '<strong style="color: rgb(163, 188, 234); padding-right: 0px; display: inline-block; background-color: rgb(163, 188, 234);">$1</strong>');
        		}
        		if(convertContents == '') {
        			convertContents = contents;
        			$(React.findDOMNode(this.refs.modifyCommentContentsInput)).val(contents);	
        		}	
        		element.children('.highlighter').children('.highlighter-content').html(convertContents);
        		$(React.findDOMNode(this.refs.modifyCommentContentsInput)).focus();
        		var commentFeedId = 'commentFeed_'+this.props.feedId;
        		window.scroll(0, this.getOffsetTop(document.getElementById(commentFeedId)));
			},
			
			cancelModify:function() {
				this.props.cancelModify();
			},
			
			getOffsetTop: function(el) {
				var top = 0;
				if(el.offsetParent) {
					do {
						top += el.offsetTop;
					} while (el = el.offsetParent);
					return [top];
				}
			},
			
			commentUpdate:function() {
				var contents = $(React.findDOMNode(this.refs.modifyCommentContentsInput)).mentionsInput('getValue');
				var mentions = $(React.findDOMNode(this.refs.modifyCommentContentsInput)).mentionsInput('getMentions');
				var tags = contents.match(/#\S+/g);
				this.props.commentUpdate(contents, mentions, tags);
			},
			
			render: function() {
	        	return (
	        			React.createElement("div", {className: "modify_comment"}, 
							React.createElement("div", {ref: "modify_comment_area"}, 
                            	React.createElement("textarea", {style: {'width':'99%', 'padding':'1% 4% 2% 2%', 'height':'32px', 'right':'10px', 'border':'none', 'resize':'none'}, className: "modifyCommentContentsInput", id: "modifyCommentContentsInput", ref: "modifyCommentContentsInput"})
							), 
							React.createElement("div", {style: {'margin':'0px 35px 0 0px'}}, 
								React.createElement("button", {style: {'float':'right','cursor':'initial'}, type: "button", id: "commentUpdate", ref: "commentUpdate", className: "btn-m btn-m btn-attention", onClick: this.commentUpdate}, _FEED_NormalType_UPDATEDBUTTON), 
								React.createElement("button", {style: {'float':'right', 'marginRight':'5px', 'cursor':'initial'}, type: "button", id: "cancelModify", ref: "cancelModify", className: "btn-m btn-m btn-attention", onClick: this.cancelModify}, _FEED_NormalType_CANCELBUTTON)
								)
						)
	           	);
			}
		});
	
	
	
		function commentOGTrigger(reactElement, data) {
			var ogAreaId   = "commentogArea"+reactElement.state.feedId;
			var showRemove= 'false';
			React.render(React.createElement(CommentOG, {data: data, showRemove: showRemove}), document.getElementById(ogAreaId));
		}
		
		function commentRemoveOGTag(reactElement) {
			reactElement.state.ogValidate = 'false';
			reactElement.state.feedContents = '';
		   	var ogAreaId   = "commentogArea"+reactElement.state.feedId;
			React.unmountComponentAtNode(document.getElementById(ogAreaId));
			$(ogAreaId).empty();
		}
		
		function commentComponentDidMount(reactElement) {
			var commentLikeItByMeAreaId = 'commentLikeItByMeArea'+reactElement.state.feedId;
			if(reactElement.state.likeItByMe === 1) {
				React.render(React.createElement(LikeIt, null), document.getElementById(commentLikeItByMeAreaId));
			}

			reactElement.state.isBookmarkByMe = reactElement.props.pFeedData.isBookmarkByMe;;
			reactElement.state.regFeedKldg = reactElement.props.pFeedData.regFeedKldg;
			var self = reactElement;
			var ogData = reactElement.state.feedContents;
			if(ogData !== undefined && ogData.length>0){
				ogJsonData = jQuery.parseJSON(ogData);
				self.OGTrigger(ogJsonData);
			}
	
			var tooltipClass = 'commentTooltip_'+reactElement.state.feedId;
			
			// more / less
			var showChar = 500;
			var ellipsestext = "...";
			var moretext = _FEED_CommentFeed_MSG_MOREFEEDCONTENTSTEXT;
			var lesstext = _FEED_CommentFeed_MSG_LESSFEEDCONTENTSTEXT;

			/////
			var originContent = $(React.findDOMNode(reactElement.refs.subtitle));
			var contentHtml = $(React.findDOMNode(reactElement.refs.subtitle)).html();
					
			if(originContent != undefined) {
				if(contentHtml.length > showChar) {
					var c = contentHtml.substr(0, showChar);
					var h = contentHtml.substr(showChar, contentHtml.length - showChar);
					var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
					$(React.findDOMNode(reactElement.refs.subtitle)).html(html);
				}
			}
			
			$(React.findDOMNode(reactElement.refs.subtitle)).linky({"tooltipId":tooltipClass});
			
			$(React.findDOMNode(reactElement.refs.subtitle)).find("a.morelink").on('click', function(){
				if($(this).hasClass("less")) {
		            $(this).removeClass("less");
		            $(this).html(moretext);
		        } else {
		            $(this).addClass("less");
		            $(this).html(lesstext);
		        }
		        $(this).parent().prev().toggle();
		        $(this).prev().toggle();
		        return false;
			});
			
			$(React.findDOMNode(reactElement.refs.timeago)).timeago();
			var self = reactElement;
			$("#sns-tooltip").mouseenter(function(){
				self.state.insidePopup = true;
			}).mouseleave(function(){
               	self.state.insidePopup = false;
               	$(this).hide();
            });
				
			$('.'+tooltipClass).mouseenter(function(event) {
				var tooltip = this;
				var tooltipElm = $(tooltip);
				clearTimeout(self.state.thisTimer);
					self.state.thisTimer = setTimeout(function() {
						var rel = tooltipElm.attr('rel');
						var targetFollowerInfo = self.getFollowerInfo(rel);
						self.tooltipPosition(tooltip);
						$('#sns-tooltip').show();
						clearTimeout(self.state.thisTimer);
    				}, self.state.timeoutTime);

			}).mouseleave(function(event) {
				clearTimeout(self.state.thisTimer);
    			self.state.thisTimer = setTimeout(function(){
       				if(!self.state.insidePopup) {
						$("#sns-tooltip").hide();
						React.unmountComponentAtNode(document.getElementById('sns-tooltip'));
					}
       				clearTimeout(self.state.thisTimer);
    			}, self.state.timeoutTime);
			});

			var commentSliderId = 'commentSlider'+reactElement.state.feedId;
			React.render(React.createElement(Slider, {fileList: reactElement.state.files, feedtype: 'commentFeed_', feedId: reactElement.state.feedId}), document.getElementById(commentSliderId));
			
			//Lync Presence setting
			//initLyncStatus();
			//reactElement.getLyncStatus();
  		}
  		
		function commentCmtLikeitResult(reactElement, data) {
			var commentLikeItByMeAreaId = 'commentLikeItByMeArea'+reactElement.state.feedId;
			var commentLikeItByMe = 0;
			if(reactElement.state.likeItByMe === 1) {
				React.unmountComponentAtNode(document.getElementById(commentLikeItByMeAreaId));
				commentLikeItByMe = 0;
			} else {
				React.unmountComponentAtNode(document.getElementById(commentLikeItByMeAreaId));
				React.render(React.createElement(LikeIt, null), document.getElementById(commentLikeItByMeAreaId));
				commentLikeItByMe = 1;
			}
			reactElement.setState({likeItCnt : data.likeItCnt, likeItByMe: commentLikeItByMe});
		}

		function commentShareFollower(reactElement, data) {
			$('#sfeedTitle').html(reactElement.props.pFeedData.feedTitle);
			$('#shareUserPic').attr('src', reactElement.state.src);	
			$('#shareUserName').html(reactElement.state.cmtMember.memberName);
		}

		function commentShare(reactElement) {
			React.render(React.createElement(SharePopup, {shareData: reactElement.shareFollower, shareMemberId: _CommentFeed_session_memberId, shareFeedId: reactElement.state.pFeedId}), document.getElementById('share_popup'));
			sharePopup = $('#share_popup').bPopup({
				modalClose: false,
			});
			$('#shareFeedTitle').focus();
		}
		
		function commentAnswerTag(reactElement) {
			reactElement.state.pMemberId = reactElement.state.cmtMember.memberId;
			reactElement.props.setting(reactElement.state.pMemberId);
			var clickAreaId = 'ppp' + reactElement.state.pFeedId;
			//$('#'+clickAreaId).attr('style','position:absolute; top:2px; right:10px; cursor:pointer;');
			$('#'+clickAreaId).attr('style','cursor:pointer;');
			var answerTagId = 'answerTag' + reactElement.state.pFeedId;
			React.render( React.createElement(Answer, {receiveMember: reactElement.state.cmtMember, removeAnswerTag: reactElement.removeAnswerTag}), document.getElementById(answerTagId) );
			var cfId = 'cf' + reactElement.state.pFeedId;
			$('#'+cfId).show();
			$('#commentInput' + reactElement.state.pFeedId).focus();
			$('#subButtonLayout' + reactElement.state.pFeedId).show();
		}

		function commentRemoveAnswerTag(reactElement) {
			reactElement.props.setting('');
			var clickAreaId = 'ppp' + reactElement.state.pFeedId ;
			$('#'+clickAreaId).attr('style','position:absolute; top:6px; right:10px; cursor:pointer;');
			var answerTagId = 'answerTag' + reactElement.state.pFeedId;
			React.unmountComponentAtNode(document.getElementById(answerTagId));
		}
		
		function commentMoreLayout(reactElement) {
			isCommentMoreLayout = true;
			cmlId = "commentMoreLayout"+reactElement.state.feedId;
			var commentMoreLayoutId = cmlId;
			var isBookmarkByMe = reactElement.state.isBookmarkByMe;
			var isFollow = reactElement.state.isFollow;
			var regKldg = reactElement.state.regFeedKldg;

			if(reactElement.state.cmtMember.memberId == _CommentFeed_session_memberId || isSysAd == 1) {
				$(React.findDOMNode(reactElement.refs.iconModifyCommentId)).show();
				$(React.findDOMNode(reactElement.refs.txtModifyCommentId)).show();
				$(React.findDOMNode(reactElement.refs.iconDeleteCommentId)).show();
				$(React.findDOMNode(reactElement.refs.txtDeleteCommentId)).show();
			} else {
				$(React.findDOMNode(reactElement.refs.iconModifyCommentId)).hide();
				$(React.findDOMNode(reactElement.refs.txtModifyCommentId)).hide();
				$(React.findDOMNode(reactElement.refs.iconDeleteCommentId)).hide();
				$(React.findDOMNode(reactElement.refs.txtDeleteCommentId)).hide();
			}

			if(regKldg === 'true') {
				$(React.findDOMNode(reactElement.refs.iconRegCommentKldgId)).hide();
				$(React.findDOMNode(reactElement.refs.txtRegCommentKldgId)).hide();
				$(React.findDOMNode(reactElement.refs.iconRemoveCommentKldgId)).hide();
				$(React.findDOMNode(reactElement.refs.txtRemoveCommentKldgId)).hide();
			} else {
				$(React.findDOMNode(reactElement.refs.iconRegCommentKldgId)).hide();
				$(React.findDOMNode(reactElement.refs.txtRegCommentKldgId)).hide();
				$(React.findDOMNode(reactElement.refs.iconRemoveCommentKldgId)).hide();
				$(React.findDOMNode(reactElement.refs.txtRemoveCommentKldgId)).hide();
			}

			if(isFollow === 'true') {
				$(React.findDOMNode(reactElement.refs.iconCommentFollowId)).hide();
				$(React.findDOMNode(reactElement.refs.txtCommentFollowId)).hide();
				$(React.findDOMNode(reactElement.refs.iconCommentUnfollowId)).show();
				$(React.findDOMNode(reactElement.refs.txtCommentUnfollowId)).show();
			} else {
				$(React.findDOMNode(reactElement.refs.iconCommentFollowId)).show();
				$(React.findDOMNode(reactElement.refs.txtCommentFollowId)).show();
				$(React.findDOMNode(reactElement.refs.iconCommentUnfollowId)).hide();
				$(React.findDOMNode(reactElement.refs.txtCommentUnfollowId)).hide();
			}

			if(isBookmarkByMe === 'true') {
				$(React.findDOMNode(reactElement.refs.iconAddCommentBookmarkId)).hide();
				$(React.findDOMNode(reactElement.refs.txtAddCommentBookmarkId)).hide();
				$(React.findDOMNode(reactElement.refs.iconRemoveCommentBookmarkId)).show();
				$(React.findDOMNode(reactElement.refs.txtRemoveCommentBookmarkId)).show();
			} else {
				$(React.findDOMNode(reactElement.refs.iconAddCommentBookmarkId)).show();
				$(React.findDOMNode(reactElement.refs.txtAddCommentBookmarkId)).show();
				$(React.findDOMNode(reactElement.refs.iconRemoveCommentBookmarkId)).hide();
				$(React.findDOMNode(reactElement.refs.txtRemoveCommentBookmarkId)).hide();
			}
			$('#'+cmlId).show();
		}