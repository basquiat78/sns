		var bPopupGc = null;
		
		var NoFeedHere = React.createClass({
			render : function() {
				return (
						<div style={{'textAlign':'center'}}>
							{_FEED_Feed_MSG_NOMESSAGE}
						</div>
				)
			}
		});
		
		var NoticeInFeed = React.createClass({
					render: function() {
			        	return (
								<div>
		                        	<div className='noticeTitle'><strong>[{_Feed_basic_notiheader}]</strong> {this.props.feedTitle} </div>
		                        </div>    
			           	);
					}
		
				});
			
		// 첨부 파일
		var LikeIt = React.createClass({
			// 파일 리스트  렌더링
			render: function() {

					return (
							<div>
								<ul className='result_wrap2' style={{'marginLeft':'0px'}}>
                              		<li className='result_like'><img src='../images/btn_like.png' width='14' height='13' /></li>
                                	<li>{_FEED_Feed_MSG_ILIKETHISONEMSG}</li>
                              	</ul>
            				</div>  
					);
			}

		});
			
		// 전자결재 코멘트
		var ApprovalComment = React.createClass({

			componentDidMount: function() {
				$(React.findDOMNode(this.refs.apprCommentArea)).elastic();
				var src = _Feed_MEMBER_PIC+'?memberId=' + _Feed_session_memberId;
				$(React.findDOMNode(this.refs.memberPic)).css("background", 'url(' + src + ') no-repeat').css("background-size", 'cover');
			},

			// 렌더링
			render: function() {
					var sessionMemberName = _Feed_session_memberName;
					var commentId = 'comment_'+this.props.feedId;

					var approvaButtonSettings=[];
					var key = 'apprButtonArea_'+this.props.feedId;
					approvaButtonSettings.push(<ApprovalButton completeAppr={this.props.completeAppr} taskId={this.props.taskId} key={key} feedId={this.props.feedId}/>);

					return (
							<div className='my_comment' style={{'paddingTop':'0'}}>
								<dl>
									{approvaButtonSettings}
                					<dd className='pic_small' ref='memberPic'>pic</dd>
									<dd className='feed_name'>{_FEED_Feed_MSG_APPROVALOPINION}</dd>
                					<dd>
										<textarea id={commentId} className='apprCommentArea' placeholder={_FEED_Feed_MSG_INPUTOPINIONMSG} ref='apprCommentArea'></textarea>
									</dd>
           						</dl>
							</div>
					);
			}

		});
	
	
			
		// 전자결재 버튼
		var ApprovalButton = React.createClass({

			getInitialState : function () {
				return {
	        	 		comment  : '',
						apprType : ''
	    			};
        	},

			ajaxCallback:function(data) {
				this.props.completeAppr(data, this.state.apprType, this.state.comment);
			},			

			approval: function() {
				var apprPassword = this.refs.apprPassword.getDOMNode().value;
				this.state.apprType = 'APPROVAL';
				if(apprPassword.length == 0) {
					this.state.apprType = '';
					MsgPopup(_FEED_Feed_MSG_INPUTPASSWORDMSG);
					return;
				} else {
					var baseurl = _Feed_GW_APPROVAL_APPROVE;
					var commentId = 'comment_'+this.props.feedId;
					var comment = $('#'+commentId).val();
					this.state.comment = comment;
					var gwVo = {
										"userId"	:_Feed_session_UserId, 
										"password"  : apprPassword,
										"taskId"    : this.props.taskId,		
										"comment"	: comment
										}
					ajaxAdd(baseurl, gwVo, this.ajaxCallback);
				}
			},

			reject  : function() {
				var apprPassword = this.refs.apprPassword.getDOMNode().value;
				this.state.apprType = 'REJECT';
				if(apprPassword.length == 0) {
					this.state.apprType = '';
					MsgPopup(_FEED_Feed_MSG_INPUTPASSWORDMSG);
					return;
				} else {
					var baseurl = _Feed_EG_APPROVAL_REJECT;
					var commentId = 'comment_'+this.props.feedId;
					var comment = $('#'+commentId).val();
					this.state.comment = comment;
					if(comment.length == 0 ) {
						MsgPopup(_FEED_Feed_MSG_INPUTRETURNOPINIONMSG);
						return;
					}

					var gwVo = {
										"userId"	:_Feed_session_UserId, 
										"password"  : apprPassword,
										"taskId"    : this.props.taskId,		
										"comment"	: comment
										}
					ajaxAdd(baseurl, gwVo, this.ajaxCallback);
				}
			},

			// 렌더링
			render: function() {
					var id = 'approval_'+this.props.feedId;
					return (
							<div className='approval'>
								<ul className='btn_request_area'>
                            		<li className='btn_return' onClick={this.reject}>{_FEED_Feed_MSG_RETURN}</li>
                            	    <li className='btn_approve' onClick={this.approval}>{_FEED_Feed_MSG_APPROVAL}</li>
									<li className='apprPassword'><input placeholder='Password' type='password' ref='apprPassword'/></li>                        
                            	</ul>
							</div>  
					);
			}

		});
			
		// 첨부 파일
		var FeedAttachFileList = React.createClass({
			// 파일 리스트  렌더링
			render: function() {

				var filesArray = [];
				var data = this.props.fileList;
				if(data!==undefined && data.length>0) {
					data.forEach(function(file){
						if(file.fileId != 0) {
							filesArray.push(<FeedAttachFile key={file.fileId} file={file}/>);
						}
					});
	
					return (
							<div>
								{filesArray}
            				</div>  
					);
				} else {
					return (<div></div>);
				}
			}

		});
		
		// 파일 
		var FeedAttachFile = React.createClass({
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
						<div className='af_list01'>
                    		<dl>
                       			<dt><img className={extClassName} width='19' height='20' /></dt>
                       			<dd className='name_file'><strong><a href={fileUrl} target='_blank'>{this.props.file.fileName}</a></strong><br /><span className='txt_post'></span></dd>
							</dl>
						</div>
				);
			}
		});
	
		var CommentNoti = React.createClass({
		
			getInitialState : function () {
				return { initialDttm : 0 };
			},
		
			componentDidMount: function() {
				this.state.initialDttm = this.props.initialDttm;
			},
		
			newCommentShow: function() {
				this.props.newCommentShow(this.state.initialDttm);
			},
			
			render: function() {
			
					return (
							<div onClick={this.newCommentShow}>
								<ul className='result_wrap' style={{'marginLeft':'30px', 'marginRight':'20px', 'fontWeight': 'bold', 'cursor':'pointer'}}>
                	                	<li>{this.props.noticeCnt} {_FEED_Feed_MSG_NEWREPLYMSG} &#8250;&#8250;&#8250;</li>
                	           	</ul>
           					</div>  
					);
			}
		});
	
		// 피드 
		var Feed = React.createClass({
			// 데이터 초기화
			getInitialState : function () {
				return {
	        	 		feedId				:''
	        			,feedTitle			:''
	        			,mainFeedTitle		:''
	        			,feedType			:''
						,regMember			:''
						,memberSyncKey		:''
						,files				:[]
	        			,feedfollower		:[]
	        			,updateFeedFollower :[]
	        			,newFeedfollower	:[]
	        			,tag				:[]
	        			,updateTag			:[]
	        			,feedContents		:''
						,dueDate			:''
						,regDttm			:''
						,pFeedId			:''
						,pMemberId			:''
						,approvalStatus		:''
						,contentsType	    :''
	        			,cmtCnt				:''
	        			,shareCnt			:''
	        			,likeItCnt			:''
						,likeItByMe			: 0
						,cmtLstSecFeedId	:''
						,commentListBefore	:''
	        			,commentListReal	:[]
						,clickedMoreReply   :'false'
						,bookmark			:[]
						,src				:''
						,isFollow			:'false'
						,isBookmarkByMe     :'false'
						,regFeedKldg		:'false'
						,newCommentData     :[]
						,feedPollList		:[]
						,resultPollList	    :[]
						,isVote				:'false'
						,groupId			: 0
						,groupName			: ''
						,isGroupMng			: 0
						,kldgVo				:[]
						,isbookmarklist		:''
						,thisTimer			:null
						,timeoutTime		:800
						,insidePopup		:false
						,offsetTop 			:''
             			,offsetLeft			:''
             			,onFucus			:'false'
             			,setUp				:'false'
             			,isPublic			: 0
             			,isTagEdit			:'false'
	    			};
        	},
		
			fileHandler: function(fileList) {
				this.state.files = [];
				this.state.files = fileList;
			},

			answerTag: function() {
				answerTag(this.props.feedId, this.state.regMember, this.removeAnswerTag);
			},	

			removeAnswerTag: function() {
				removeAnswerTag(this.state.feedId);
			},

			setpMemberId:	function(id) {
				this.state.pMemberId = id;
			},

			// 댓글 달기 이벤트 결과 
			createCommentResult : function(data){
				//data.commentFeedList = this.props.commentFeedList !== undefined ? 
				//	(this.props.commentFeedList).concat(data.commentFeedList) : data.commentFeedList;
				feedCreateCommentResult(this, data);
			},
	
			// 댓글 달기 이벤트
			createComment : function(){
				feedCreateComment(this);
			},
	
			// 이전 댓글 리스트 결과
			getBeforeCommentListResult : function(data){
				feedGetBeforeCommentListResult(this, data);
			},
	
			// 이전 댓글 리스트 취득 이벤트 
			getBeforeCommentList : function(){
				//var baseurl = _Feed_FEED_BEFORE_COMMENT + '/' + this.state.feedId;
				var baseurl = _Feed_AND_COMMENT + '/' + this.state.feedId;
				var jsondata = {limit : 0};
				ajaxGet(baseurl, jsondata, this.getBeforeCommentListResult);
			},
	
	
			setFeedTitleNContents : function(title, contents, pFeedId, contentType, commentFollowerList, tagList){
				this.state.feedTitle = title;
				this.state.feedContents = contents;
				this.state.pFeedId = pFeedId;
				this.state.contentsType = contentType;
				this.state.feedfollower = commentFollowerList;
				this.state.tag = this.state.tag.concat(tagList);
			},
	
			getFeedDetail : function(){
				var baseurl = _Feed_BASE_FEED + '/' + this.state.feedId;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, getFeedDetailResult);
			},

			OGTrigger: function(data) {
				feedOGTrigger(this.state.feedId, data);
			},

			ajaxCallBackNoti: function(data) {
				feedAjaxCallBackNoti(this, data);
			},
			
			newCommentShowCallBack : function(data) {
				feedNewCommentShowCallBack(this, data);
			},
			
			newCommentShow: function(initialDttm) {
				var baseurl = _Feed_FEED_COMMENT_BY_REGDTTM;
				var jsondata = {"feedId":this.state.feedId, "regDttm": initialDttm };	
				ajaxGet(baseurl, jsondata, this.newCommentShowCallBack);
			},
			
			ajaxCallByNoti: function() {
				feedAjaxCallByNoti(this);
        	},

			notify: function(data) {
				var self = this;
				clearTimeout(self.state.thisTimer);
				self.state.thisTimer = setTimeout(function() {
					self.ajaxCallByNoti();
    				clearTimeout(self.state.thisTimer);
    			}, 2500);
			},

        	componentWillUnmount: function() {
     			Observer.unregisterObserver(this);
     			window.removeEventListener('scroll', this.setUpFeed, false);
    			window.removeEventListener('resize', this.setUpFeed, false);
 			},
 		
 			setUpFeed:function() {
 				var scrollTop = $(window).scrollTop();
 				var feedTop = $(React.findDOMNode(this.refs.focusDIV)).offset().top;
 				if(feedTop - scrollTop <= 1500) {
 					if(this.state.setUp == 'false') {
 						feedComponentDidMount(this);
 						this.state.setUp == 'true';
 						window.removeEventListener('scroll', this.setUpFeed, false);
    					window.removeEventListener('resize', this.setUpFeed, false);
 					}
 				}
 			},
 		
			componentDidMount: function() {
				Observer.registerObserver(this);
				window.addEventListener('scroll', this.setUpFeed, false);
    			window.addEventListener('resize', this.setUpFeed, false);
				this.setUpFeed();
				
    			//feedComponentDidMount(this);
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

			feedLikeitResult: function(data){
				feedLikeitResult(this, data);
			},
	
			feedLikeit: function() {
				var baseurl = _Feed_BASE_LIKEIT;
				var	likeItFollower = {
				      			   "itemId"		   : 0,
								   "itemType"	   : "",
								   "followerId"	   : 0,
								   "followerType"  : "",
								   "regMemberId"   : 0	
								   };
								   
				if(this.state.isFollow == 'false' && this.state.likeItByMe === 0) {
					likeItFollower = {
				      			   	  "itemId"		  : this.state.feedId,
								   	  "itemType"	  : "FEED",
								   	  "followerId"	  : _Feed_session_memberId,
								   	  "followerName"  : _Feed_session_memberName,	
								   	  "followerType"  : "MEMBER",
								   	  "regMemberId"   : this.state.regMember.memberId	
								   };
								   
				}
				
	        	var jsondata = {
					  	"regMemberId"  : _Feed_session_memberId,
	        	      	"feedId"	   : this.state.feedId,
	        	      	"ffVo"		   : likeItFollower 
	        	};
       			ajaxAdd(baseurl, jsondata, this.feedLikeitResult);
			},
			
			getFanaticList : function() {
				showFanaticList(this.state.feedId);
			},

			fromFollowerInputSetting: function(data) {
				groupFollowerList = data;
			},

			followerHandler : function(data) {
				groupFollowerList = data;
			},

			makeGroup: function() {
				feedMakeGroup(this);
			},

			shareFollower: function(data) {
				feedShareFollower(this.state.feedTitle, this.state.src, this.state.regMember.memberName);
			},

			share:function(){
				feedShare(this.shareFollower, this.state.regMember.memberId, this.state.feedId);
			},
			
			deleteCommentAct :function() {
				this.setState({cmtCnt:this.state.cmtCnt-1});
				
				//this.rerenderComment();
				
				/*
				this.setState({commentListReal : []});
				this.state.newCommentData = [];
				var self = this;
				var baseurl = _Feed_AND_COMMENT + '/' + this.state.feedId;
				ajaxGet(baseurl, {'limit' : 5}, function(data){
					
					var mycommentNode = '';
					
					mycommentNode = data.commentFeedList.map(function (ctl) {
								var key = 'feedId'+ctl.feedId;
								return (
										<CommentFeed key = {key}
													 commentData = {ctl} 
												 	 pFeedData={self.state}
												 	 isFollow={self.state.isFollow} 
												 	 setting={self.setpMemberId}
												 	 groupId={self.state.groupId}
												 	 feedFollow={self.feedFollow}
												 	 feedUnfollow={self.feedUnfollow}
												 	 addFeedBookmark={self.addFeedBookmark}
												 	 removeFeedBookmark={self.removeFeedBookmark}
													 deleteCommentAct={self.deleteCommentAct}
												 	 regFeedKldg={self.regFeedKldg}
												 	 removeFeedKldg={self.removeFeedKldg}
												 	 feedCommentFollowerAndTagSetting={self.feedCommentFollowerAndTagSetting}
									/>
								);
							}
					);
						
					self.setState({commentListReal : mycommentNode});
					
				});
				*/
			},

			rerenderComment:function() {
				feedRerenderComment(this);
			},	

			calenderPositionOffset: function() {
 				var moreDivOffset = $(React.findDOMNode(this.refs.moreDiv)).offset();
 				this.state.offsetTop = moreDivOffset.top;
             	this.state.offsetLeft = moreDivOffset.left;
 			},

			feedMoreLayout:function() {
				feedMoreLayOut(this.state.isbookmarklist, this.state.feedId, this);
			},

			followCallback: function() {
				feedFollowCallback(this);
			},

			//더보기 창 팔로우 이벤트 처리
			feedFollow: function() {
				feedFollow(this);
			},

			unFollowCallback: function() {
				unFollowCallback(this);
			},

			tagEdit: function() {
				this.setState({isTagEdit:'true'});
			},

			completeTagEdit: function() {
				this.setState({isTagEdit:'false'});
			},

			addEditTag:function(data) {
				this.setState({tag:this.state.tag.concat(data)});
			},
			
			removeEditTag:function(data) {
			},

			feedCommentFollowerAndTagSetting: function(followerList, tagList) {
				var updateTagList = [];
				var updateFollowerList = [];
				var self = this;
				tagList.forEach(function(tag){
					var dup = false;
					for(var i=0; i<self.state.tag.length; i++) {
						if(self.state.tag[i].tagName == tag.tagName) {
							dup = true;
						}
					}
					
					if(!dup) {
						var tagVo = {"tagName":tag.tagName};
						updateTagList.push(tagVo);
					}
					
				});
				
				followerList.forEach(function(follower){
					var dup = false;
					for(var i=0; i<self.state.feedfollower.length; i++) {
						if(self.state.feedfollower[i].followerType == 'MEMBER' && self.state.feedfollower[i].followerId == follower.followerId) {
							dup = true;
						}
					}
					
					if(!dup)updateFollowerList.push(follower);
				})

				this.setState({tag:this.state.tag.concat(updateTagList), updateTag:this.state.updateTag.concat(updateTagList), updateFeedFollower:updateFollowerList});
				
			},

			feedModify: function() {
				$(React.findDOMNode(this.refs.feedTitle)).empty();
				var titleId = 'title_'+this.state.feedId;
				React.render(<FeedModifyElement contents={this.state.feedTitle} feedUpdate={this.feedUpdate} cancelModify={this.cancelModify} feedId={this.state.feedId}/>, document.getElementById(titleId));
			},

			feedUpdate:function(contents, mentions, tags) {
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
											"followerName"   : '',
											"followerEmail"  : '',
											"followerImgUrl" : ''
										}

						followerList.push(followerVo);
					});
				}
				
        		var jsondata = {
        					  "feedId"		     : this.state.feedId,
							  "regMemberId"		 : _FeedApp_session_memberId,
	        			      "feedTitle"		 : contents,
	        			      "feedType"		 : this.state.feedType,
	        			      "contentsType"	 : this.state.contentsType,
	        			      "feedContents"	 : this.state.feedContents,
	        			      "feedFollowerList" : followerList,
	        			      "feedTagList"      : tagList
			        		};
			    
			    var baseurl = _Feed_BASE_FEED;
	       		ajaxUpd(baseurl, jsondata, this.updateComplete);
				
			},

			updateComplete: function(data) {
				var titleId = 'title_'+this.state.feedId;
				this.state.feedTitle = data.feedTitle;
				React.unmountComponentAtNode(document.getElementById(titleId));
				$(React.findDOMNode(this.refs.feedTitle)).html(data.feedTitle);
				$(React.findDOMNode(this.refs.substance)).linky();
				var updateTagList = [];
				var updateFollowerList = [];
				var self = this;
				data.feedTagList.forEach(function(tag){
					var dup = false;
					for(var i=0; i<self.state.tag.length; i++) {
						if(self.state.tag[i].tagName == tag.tagName) {
							dup = true;
						}
					}
					
					if(!dup) {
						var tagVo = {"tagName":tag.tagName};
						updateTagList.push(tagVo);
					}
					
				});
				data.feedFollowerList.forEach(function(follower){
					var dup = false;
					for(var i=0; i<self.state.feedfollower.length; i++) {
						if(self.state.feedfollower[i].followerType == 'MEMBER' && self.state.feedfollower[i].followerId == follower.followerId) {
							dup = true;
						}
					}
					
					if(!dup)updateFollowerList.push(follower);
				})

				this.setState({tag:this.state.tag.concat(updateTagList), updateTag:this.state.updateTag.concat(updateTagList), updateFeedFollower:updateFollowerList});
				
			},

			cancelModify: function() {
				var titleId = 'title_'+this.state.feedId;
				React.unmountComponentAtNode(document.getElementById(titleId));
				$(React.findDOMNode(this.refs.feedTitle)).html(this.state.feedTitle);
				$(React.findDOMNode(this.refs.substance)).linky();
			},

			//더보기 창 언팔로우 이벤트 처리
			feedUnfollow: function() {
				var feedFollwerList = [
										{"itemId"		:this.state.feedId,
										 "itemType"		:"FEED",
										 "followerId"	: _Feed_session_memberId,
										 "followerType" :"MEMBER"
										}	
				];
				
				var feedVo = {
								"feedId": this.state.feedId,
								"feedFollowerList":feedFollwerList
							}

				ajaxDelByJson(_Feed_BASE_FOLLOWER, feedVo, this.unFollowCallback);
			},

			addBookmarkCallback:function() {
				feedAddBookmarkCallback(this);
			},

			removeBookmarkCallback:function() {
				feedRemoveBookmarkCallback(this);
			},

			//즐겨찾기 아이콘 이벤트액션 처리
			favoriteAct:function() {
				feedFavoriteAct(this);
			},

			//더보기 창 즐겨찾기 이벤트 처리
			addFeedBookmark: function() {
				var bookMarkVo = {"memberId":_Feed_session_memberId, feedId:this.state.feedId};
				ajaxAdd(_Feed_BASE_BOOKMARK, bookMarkVo, this.addBookmarkCallback);	
			},

			//더보기 창 즐겨찾기해제 이벤트 처리
			removeFeedBookmark: function() {
				var bookMarkVo = {"memberId":_Feed_session_memberId, feedId:this.state.feedId};
				ajaxDelByJson(_Feed_BASE_BOOKMARK, bookMarkVo, this.removeBookmarkCallback);	
			},

			//더보기 창 지식등록 이벤트 처리
			regFeedKldg: function() {
				var baseurl = _Feed_BASE_KNWLDG_URL;
				var jsondata = {"feedId": this.state.feedId ,  "groupId": this.state.groupId, "regMemberId": _Feed_session_memberId};
				ajaxAdd(baseurl, jsondata, this.regFeedKldgCallback);
			},

			regFeedKldgCallback:function(data) {
				feedRegFeedKldgCallback(this);
			},

			removeFeedKldgCallback:function() {
				feedRemoveFeedKldgCallback(this);
			},

			//더보기 창 지식해제 이벤트 처리
			removeFeedKldg: function() {
				var baseurl = _Feed_BASE_KNWLDG_URL;
				var jsondata = {"feedId": this.state.feedId,  "groupId": this.state.groupId};
				ajaxDelByJson(baseurl, jsondata, this.removeFeedKldgCallback);
			},

 			//더보기 창 완료 이벤트 처리
			feedComplete: function() {
				feedComplete(this);
			},

 			//더보기 창 미완료 이벤트 처리
			feedIncomplete: function() {
				feedIncomplete(this);
			},

			chnCallBack: function(data) {
				feedChnCallBack(this, data);
			},

 			//더보기 창 날짜변경 이벤트 처리
			changFeedDate: function(dateText) {
				feedChangeFeedDate(this, dateText);
			},

			deleteFeedCallback: function() {
				deleteFeedCallback(this);
			},

 			//더보기 창 삭제 이벤트 처리
			deleteFeed: function() {
				ajaxDelById(_Feed_BASE_FEED, this.state.feedId, this.deleteFeedCallback);
			},

			// 투표하기
			votePoll: function() {
				var baseurl = _Feed_BASE_POLL_RESULT;
				var selectVal = $('input[name='+this.state.feedId+']:checked').val();
				var PollVo = {"feedId": this.state.feedId , "seq": selectVal, memberId: _Feed_session_memberId};
				ajaxAdd(baseurl, PollVo, this.votePollResult);
			},
			
			// 투표이후 렌더링..
			votePollResult:function(data) {
				this.setState({resultPollList:data, isVote:'true'});
			},

			viewPoll:function() {
				this.setState({isVote:'false'});
			},

			resultViewPoll:function() {
				var baseurl = _Feed_BASE_POLL_RESULT;
				ajaxGet(baseurl+'/'+this.state.feedId, '', this.votePollResult);
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
				React.render(<FollowerTooltip followerInfo={data} itemId={this.state.feedId}/>, document.getElementById('sns-tooltip'));
			},

			getFollowerInfo: function(info) {
				var infoArray = info.split(';');
				var followerType = infoArray[0];
				var followerId = infoArray[1];
				var baseurl = _Feed_BASE_FOLLOWER + '/members/'+followerId;
				if(followerType ==='GROUP') {
					baseurl = _Feed_BASE_FOLLOWER + '/group/'+followerId;
				}
				ajaxGetForSync(baseurl, '',  this.tooltipRender);
			},

			completeAppr: function(apprInfo, apprType, comment) {
				var apprCommentId = 'apprComment_'+this.state.feedId;
				React.unmountComponentAtNode(document.getElementById(apprCommentId));
				this.setState({approvalStatus:apprType});
			},

			focusFeedArea: function() {
				focusFeedId = this.state.feedId;
				/*
				if(this.state.onFucus == 'false') {
					feedComponentDidMount(this);
					this.state.onFucus = 'true';
				}
				*/
			},
			
			getMemberInfo:function() {
				getMemberInfo(this.state.regMember.memberId, this.state.regMember.memberName);
			},
			
			getLyncStatus: function() {
				var presenceAreaId = 'presence_'+this.props.feedId;
				var userName = this.state.memberSyncKey + "@hanwha.com";
				var userElementId = getId(userName);
				var presenceId = 'presence-'+userElementId;
			
				if($("#" + presenceAreaId).length == 1)
					React.render(<Presence presenceId={presenceId}/>,  document.getElementById(presenceAreaId));
    			if(!nameCtrl) {
    	    		return;
    			}
    			
   		 		try {
   		 			nameCtrl.GetStatus(userName, presenceId);
   		 			nameCtrl.OnStatusChange = onLyncPresenceStatusChange;
   		 		} catch(e){}
			},

			openLyncMenuImg: function() {
				openLyncMenu(this.state.memberSyncKey, React.findDOMNode(this.refs.ffImg),'','-560','-100');
			},
		
			openLyncMenuName: function() {
				openLyncMenu(this.state.memberSyncKey, React.findDOMNode(this.refs.ffName),'','-560','-100');
			},
		
			hideLyncMenu: function() {
				hideLyncMenu();
			},
			
			// 피드 렌더링
			render: function() {
				// 이전 댓글 카운트
				var commentBeforeNodes = '';
				if(parseInt(this.props.cmtCnt) > 2){
					var totalBeforeCmtCnt = parseInt(parseInt(this.props.cmtCnt) - 2);
					commentBeforeNodes = _FEED_Feed_MSG_PREVIOUSCOMMENT1 + totalBeforeCmtCnt+ _FEED_Feed_MSG_PREVIOUSCOMMENT2
				}
				 	
				// 최초 2건의 댓글 리스트
				var commentRealNodes = '';
				var self = this;
				if(this.props.commentFeedList != null){
					commentRealNodes = this.props.commentFeedList.map(
						function (ctl) {
							var key = 'feedId'+ctl.feedId;
							return (
									<CommentFeed key={key}
												 commentData = {ctl} 
											 	 pFeedData={self.state}
											 	 isFollow={self.props.isFollow} 
											 	 setting={self.setpMemberId}
											 	 groupId={self.state.groupId}
											 	 feedFollow={self.feedFollow}
											 	 feedUnfollow={self.feedUnfollow}
											 	 addFeedBookmark={self.addFeedBookmark}
											 	 removeFeedBookmark={self.removeFeedBookmark}
												 deleteCommentAct={self.deleteCommentAct}
											 	 regFeedKldg={self.regFeedKldg}
											 	 removeFeedKldg={self.removeFeedKldg}
											 	 feedCommentFollowerAndTagSetting={self.feedCommentFollowerAndTagSetting}
								/>
							);
						}
					);
				}
				
				// 데이터 셋
				if(this.state.feedId == ''){
			        this.state.feedId 	  			= this.props.feedId;
		     		this.state.feedTitle  			= this.props.feedTitle;
		     		this.state.mainFeedTitle		= this.props.feedTitle;
		     		this.state.feedType   			= this.props.feedType;
					this.state.approvalStatus		= this.props.approvalStatus;
					this.state.regMember       		= this.props.regMember;
		     		this.state.tag 		  			= this.props.tag;
		     		this.state.feedContents 		= this.props.feedContents;
					this.state.dueDate				= this.props.dueDate;
					this.state.endDate				= this.props.endDate;
					this.state.regDttm              = this.props.regDttm;
					this.state.bookmark				= this.props.bookmark;
	        		this.state.cmtCnt				= this.props.cmtCnt;
	        		this.state.shareCnt				= this.props.shareCnt;
	        		this.state.likeItCnt			= this.props.likeItCnt;
					this.state.likeItByMe			= this.props.likeItByMe;	
					this.state.cmtLstSecFeedId		= this.props.cmtLstSecFeedId;
					this.state.feedPollList			= this.props.feedPollList;
					this.state.resultPollList   	= this.props.resultFeedPollList;
					this.state.commentListBefore  	= commentBeforeNodes;
					this.state.commentListReal  	= commentRealNodes;
					this.state.groupId				= this.props.groupId;
					this.state.groupName			= this.props.groupName;			
					this.state.kldgVo				= this.props.kldgVo;
					this.state.files				= this.props.files;
					this.state.isPublic				= this.props.isPublic;
					this.state.src					= _Feed_MEMBER_PIC+'?memberId=' + this.state.regMember.memberId;
					// 더보기를 위해 필터링 조건으로 사용할 화면상의 최하단에 위치한 피드 아이디
					if(this.props.fromNoti == 'N') {
						moreFeedId 						= this.props.feedId;
					}
	        	}

		     	this.state.feedfollower   		= this.props.feedfollower;
				var commentId = "commentInput"+this.state.feedId;
				var addCommentId = "addComment"+ this.state.feedId;
				var ogAreaId    = "ogArea"+this.state.feedId;
				var moreReplyId = "moreReply"+this.state.feedId;
				var feedMoreLayoutId = (this.state.isbookmarklist == 'bm') ? "feedMoreLayoutBM"+this.state.feedId : "feedMoreLayout"+this.state.feedId;
				var showMoreBtnStyle = {'display':'block'};
				var noview_reple = 'noview_reple';
				var duedateAreaId = 'duedateArea'+this.state.feedId;
				var sliderId = 'sliderArea'+this.state.feedId;
				var feedLikeItByMeAreaId = 'feedLikeItByMeArea'+this.state.feedId;
				var notiMsgId = 'notiMsg'+this.state.feedId;
				var apprCommentId = 'apprComment_'+this.state.feedId;
				var feedAreaId = 'feed_'+this.state.feedId;
				if(this.props.fromNoti == 'Y') feedAreaId = 'newNotiFeed_'+this.state.feedId; 
				if(this.state.commentListBefore === '') showMoreBtnStyle = {'display':'none'};
				if(this.state.clickedMoreReply ==='true') noview_reple = '';

				//해당 피드가 지식 등록된 피드인지 여부를 체크한다.
				var knowledgeClass = '';
				if(this.state.kldgVo !==undefined) {
					this.state.regFeedKldg = 'true';
					knowledgeClass = 'icon_knowledge';
				}

				var orgFeedFollower = this.state.feedfollower.concat(this.state.newFeedfollower).concat(this.state.updateFeedFollower);
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

				var bookmarkList =this.state.bookmark;
				if(bookmarkList !== undefined && bookmarkList.length>0) {
					for(var j=0; j< bookmarkList.length; j++) {
						if(bookmarkList[j].memberId == _Feed_session_memberId) {
							this.state.isBookmarkByMe = 'true';
							break;
						}
					}
				}
				
				var timeago = new Date(this.state.regDttm).toISOString();
				var titleTimeAgo = new Date(this.state.regDttm).toLocaleString();
				var likeItByMeMsg = _FEED_Feed_MSG_LIKEMSG;
				if(this.state.likeItByMe === 1) {
					likeItByMeMsg = _FEED_Feed_MSG_CANCELLIKEMSG;
				}
			
				var feedTitle = this.state.mainFeedTitle;
				if(this.state.feedType =='POLL' && this.state.isVote == 'false') {
					var pollNode = [];
					var key = 'feedPollView'+this.state.feedId;
					pollNode.push(<FeedPollView key={key} 
												votePoll={this.votePoll} 
												feedId={this.state.feedId} 
												feedTitle={this.state.feedTitle} 
												pollList={this.state.feedPollList}
												resultPollList={this.state.resultPollList}
												viewPoll={this.viewPoll}
												resultViewPoll={this.resultViewPoll}
									/>);
					feedTitle = pollNode;
				} else if(this.state.feedType =='POLL' && this.state.isVote == 'true') {
					var resultPollNode = [];
					var key = 'resultPollView'+this.state.feedId;
					resultPollNode.push(<FeedPollResultView key={key} 
													  votePoll={this.votePoll} 
													  feedId={this.state.feedId} 
													  feedTitle={this.state.feedTitle} 
													  pollList={this.state.feedPollList}
													  resultPollList={this.state.resultPollList}
													  viewPoll={this.viewPoll}
													  resultViewPoll={this.resultViewPoll}									

										/>);
					feedTitle = resultPollNode;
				}

				if(this.state.feedType ==='NOTICE') {
					var noticeTitle = [];
					try {
						var noticeJsonData = jQuery.parseJSON(this.state.feedContents.replace(/\n/g, '<br>'));
						var noticeKey = 'notice'+this.state.feedId;
						noticeTitle.push(<NoticeInFeed key={noticeKey} feedTitle={this.state.feedTitle} data={noticeJsonData} />);
						feedTitle = noticeTitle
					} catch(e) {};
				}
				var tooltipInfo = 'MEMBER;'+this.state.regMember.memberId;
				var tooltipClass = 'tooltip_'+this.state.feedId;
				var titleId = 'title_'+this.state.feedId;
				var picClass = 'pic_small '+tooltipClass;
				var mapping   = this.props.regMember.tenantMappingList[0]===undefined?[]:this.props.regMember.tenantMappingList[0];
				var positionName = mapping.positionName ===undefined?'':mapping.positionName;
				var partName = mapping.partName ===undefined?'':mapping.partName;
				var memeberSyncKey = this.props.regMember.tenantMappingList[0]=== undefined?this.props.regMember.memberId : this.props.regMember.tenantMappingList[0].syncKey;
				this.state.memberSyncKey = memeberSyncKey;
				var presenceAreaClass = 'presenceArea_'+ memeberSyncKey +'_hanwha_com';
				var presenceAreaId = 'presence_'+this.props.feedId;
				var imgStyle = {'marginRight':'10px', 'borderRadius':'50%', 'width':'40px', 'height':'40px'};
				
				var bookMarkByMeChecker = this.state.isBookmarkByMe;
				var reactBookMarkHtmlElement = '';
				if(bookMarkByMeChecker == 'true') {
					reactBookMarkHtmlElement = 
						<dd className='icon_favorite' ref='favoriteIconId' onClick={this.removeFeedBookmark} title={_FEED_Feed_MSG_BOOKMARKHOVERTITLE}></dd>
				} else { // 북마크아니라면
					reactBookMarkHtmlElement = 
						<dd className='icon_favorite2' ref='favoriteIconId' onClick={this.addFeedBookmark} title={_FEED_Feed_MSG_BOOKMARKHOVERTITLE}></dd>
				}
				
				var publicFeedChecker = this.state.isPublic;
				var reactPublicFeedHtmlElement = '';
				if(publicFeedChecker == 0) {
					reactPublicFeedHtmlElement = 
						<dd className="icon_lock" title={_FEED_Feed_MSG_SECRETHOVERTITLE}></dd>
				} else { // 공개그룹의 피드라면
					reactPublicFeedHtmlElement = 
						<dd></dd>
				}
				
	        	return (
	        		<div id={feedAreaId}>
						<FeedInGroupFeed feedId={this.state.feedId} feedfollower={this.state.feedfollower} groupId={this.state.groupId}/>
						<div onMouseOver={this.focusFeedArea} ref='focusDIV' className='feed_contents'>
			        		<div ref='feed_contents' style={{'borderTop':'none'}}>
		    	    			<dl>
									<dt ref='memberPic' rel={tooltipInfo} style={{'float':'left','cursor':'pointer'}}><span className='presence-img'><img src={this.state.src} ref='ffImg' onMouseOver={this.openLyncMenuImg} onMouseOut={this.hideLyncMenu} style={imgStyle}></img></span><span className={presenceAreaClass} style={{'marginLeft':'-20px'}} id={presenceAreaId}></span></dt>
									<dd className='feed_name' rel={tooltipInfo}><span rel={tooltipInfo} onClick={this.getMemberInfo} ref='ffName' onMouseOver={this.openLyncMenuName} onMouseOut={this.hideLyncMenu}>{this.state.regMember.memberName} {positionName}</span><span className='belong_people'>{partName}</span></dd>
                					<dd className='time_write'><abbr className='timeago' ref='timeago' title={timeago}>{titleTimeAgo}</abbr></dd>
									<dd className={knowledgeClass} ref='knowledgeId' title={_FEED_Feed_MSG_KNOWLEDGEHOVERTITLE}></dd>
									{reactBookMarkHtmlElement}
                					{reactPublicFeedHtmlElement}
		            			</dl>

								<div className='substance reply-layout' ref='substance' style={{'whiteSpace':'pre-line'}}>
									<strong id={duedateAreaId}></strong>
		            				<div ref='feedTitle' id={titleId}>{feedTitle}</div>
            					</div>
								
								<div id={sliderId} className='reply-layout' style={{'clear':'both'}}></div>
								<div ref='ffList'>
									<FeedFollowerList feedfollower = {orgFeedFollower} followerCnt={this.props.followerCnt}/>
								</div>
								<div className='af_list_wrap reply-layout'>

									<div id={ogAreaId} ref='ogArea'></div>

									<FeedAttachFileList fileList 	 = {this.props.files}/>

								</div>

								<ul className='ss_vote reply-layout' ref='voteArea'>
									<li onClick={this.feedLikeit} className='mark_vote' style={{'marginLeft':'0'}}><img src='../images/btn_like.png' width='14' height='13' /></li>
                                    <li onClick={this.feedLikeit}>{likeItByMeMsg}</li>
                                    <li id={'feedlikecnt' + this.state.feedId} onClick={this.getFanaticList} style={{'paddingLeft':'4px'}}><strong>{this.state.likeItCnt}</strong></li>
                                    <li onClick={this.answerTag} className='mark_vote'><img src='../images/btn_reply.png' width='14' height='13' /></li>
                                    <li onClick={this.answerTag} >{_FEED_Feed_MSG_COMMENTTEXT} <strong>{this.state.cmtCnt}</strong></li>
                                    <li className='mark_vote' onClick={this.share}><img src='../images/btn_sympathy.png' width='16' height='13' /></li>
                                    <li onClick={this.share}>{_FEED_Feed_MSG_SHARETEXT} <strong>{this.state.shareCnt}</strong></li>
                                    <li onClick={this.feedMoreLayout} style={{'marginLeft':'20px','display':'none'}}>{_FEED_Feed_MSG_MORETEXT}</li>
                                    <li onClick={this.feedMoreLayout} style={{'marginLeft':'20px'}} ref='moreDiv' className='mark_vote2'><img src='../images/btn_more.png' width='18' height='13' /></li>	

									<div id={feedMoreLayoutId} className='more_select' style={{'display':'none'}}>
                                    	<ul>
                                        	<li onClick={this.feedFollow} 			className='icon_ms' ref='iconFollowId'><img src='../images/btn_selectmore1.png'/></li>
                                            <li onClick={this.feedFollow}			className='txt_ms'  ref='txtFollowId'>{_FEED_Feed_MSG_LAYOUTFOLLOW}</li>
											<li onClick={this.feedUnfollow} 		className='icon_ms' ref='iconUnfollowId'><img src='../images/btn_selectmore1.png'/></li>
                                            <li onClick={this.feedUnfollow}			className='txt_ms'  ref='txtUnfollowId'>{_FEED_Feed_MSG_LAYOUTUNFOLLOW}</li>
                                            <li onClick={this.addFeedBookmark} 		className='icon_ms' ref='iconAddBookmarkId'><img src='../images/btn_selectmore7.png'/></li>
                                            <li onClick={this.addFeedBookmark} 		className='txt_ms'  ref='txtAddBookmarkId'>{_FEED_Feed_MSG_LAYOUTBOOKMARK}</li>
                                            <li onClick={this.removeFeedBookmark} 	className='icon_ms' ref='iconRemoveBookmarkId'><img src='../images/btn_selectmore8.png'/></li>
                                            <li onClick={this.removeFeedBookmark}	className='txt_ms'  ref='txtRemoveBookmarkId'>{_FEED_Feed_MSG_LAYOUTCLEARBOOKMARK}</li>  
                                            <li onClick={this.regFeedKldg} 			className='icon_ms' ref='iconRegFeedKldgId'><img src='../images/btn_selectmore2.png'/></li>
                                            <li onClick={this.regFeedKldg} 			className='txt_ms'  ref='txtRegFeedKldgId'>{_FEED_Feed_MSG_LAYOUTKNOWLEDGE}</li>                                                
                                           	<li onClick={this.removeFeedKldg}		className='icon_ms' ref='iconRemoveFeedKldgId'><img src='../images/btn_selectmore2.png'/></li>
                                            <li onClick={this.removeFeedKldg}		className='txt_ms'  ref='txtRemoveFeedKldgId'>{_FEED_Feed_MSG_LAYOUTCLEARKNOWLEDGE}</li>
                                            <li onClick={this.makeGroup}			className='icon_ms' ref='iconMakeGroupId'><img src='../images/btn_selectmore2.png'/></li>
                                            <li onClick={this.makeGroup}			className='txt_ms'  ref='txtMakeGroupId'>그룹만들기</li>
											<li onClick={this.feedComplete} 		className='icon_ms' ref='iconFeedCompleteId'><img src='../images/btn_selectmore3.png'/></li>
                                            <li onClick={this.feedComplete} 		className='txt_ms'  ref='txtFeedCompleteId'>{_FEED_Feed_MSG_LAYOUTCOMPLETE}</li>
                                            <li onClick={this.feedIncomplete} 		className='icon_ms' ref='iconFeedIncompleteId'><img src='../images/btn_selectmore4.png'/></li>
                                            <li onClick={this.feedIncomplete} 		className='txt_ms'  ref='txtFeedIncompleteId'>{_FEED_Feed_MSG_LAYOUTINCOMPLETE}</li>                                                
                                            <li className='icon_ms' ref='iconChangFeedDateId'><img src='../images/btn_selectmore5.png'/></li>
                                            <li className='txt_ms'  ref='txtChangFeedDateId'><input type='hidden' ref='inputChangFeedDateId'/>{_FEED_Feed_MSG_LAYOUTCHANGEDATE}</li>
                                            <li onClick={this.deleteFeed} 			className='icon_ms' ref='iconDeleteFeedId'><img src='../images/btn_selectmore6.png'/></li>
                                            <li onClick={this.deleteFeed} 			className='txt_ms'  ref='txtDeleteFeedId'>{_FEED_Feed_MSG_LAYOUTDELETE}</li>                       
                                    	</ul>
                                    </div>	

            					</ul>

							</div>
							<ResultTagList 
											rtList={this.state.tag} 
											editable={this.state.isTagEdit} 
											feedId={this.state.feedId} 
											completeTagEdit={this.completeTagEdit} 
											addEditTag={this.addEditTag} 
											removeEditTag={this.removeEditTag}
											/>
			
							<div className='reply-layout' ref='likeitArea' id={feedLikeItByMeAreaId} style={{'marginLeft':'0px','marginRight':'0px'}}></div>							
							<div id={apprCommentId} className='apprCommentDiv reply-layout'></div>
							<div className='reply-layout'>
								<div id={moreReplyId} style={showMoreBtnStyle} className={noview_reple} onClick={this.getBeforeCommentList}>{this.state.commentListBefore}</div>
								{this.state.commentListReal}
							</div>		
							<div className='reply-layout' id={notiMsgId}></div>
							<CommentDropzoneComponent 
										config={componentConfig} 
	                      				eventHandlers={eventHandlers} 
	                      				djsConfig={djsConfig}
										fileHandler={this.fileHandler}
										feedId={this.props.feedId}
							    		commentId={commentId}
							    		addCommentId={addCommentId}
										answerTag={this.answerTag}
							    		addComment={this.createComment}
							    		setFeedTitleNContents={this.setFeedTitleNContents}
							    		commentAdded={this.state.commentAdded}
										parentTagList = {this.state.tag}
										feedType={this.state.feedType}
										approvalStatus={this.state.approvalStatus}
							/>

	      				</div>
	      			</div>	
					);
				}
			});
	
				
		// 피드 리스트 
		var FeedList = React.createClass({
		
			getInitialState: function() {
          		return {listHeight:''};
        	},
		
			setUp:function() {
				var listHeight 	  =  $(React.findDOMNode(this.refs.feedList)).height();
				var listOffsetTop = $(React.findDOMNode(this.refs.feedList)).offset().top;
				var listOffsetBottom = listOffsetTop + listHeight;
				if($(window).scrollTop() - listOffsetBottom  > 5200) {
					var h = $(React.findDOMNode(this.refs.feedList)).height();
					$(React.findDOMNode(this.refs.feedList)).css('height', h);
					$(React.findDOMNode(this.refs.element)).hide();
					this.state.listHeight = listHeight;
				} else {
					$(React.findDOMNode(this.refs.element)).show();
					if(listOffsetBottom - $(window).scrollTop() > 5200) {
						var h = $(React.findDOMNode(this.refs.feedList)).height();
						$(React.findDOMNode(this.refs.feedList)).css('height', h);
						$(React.findDOMNode(this.refs.element)).hide();
					}
				
				}
				
			},
		
			setUpHeight:function() {
				var listHeight 	  =  $(React.findDOMNode(this.refs.feedList)).height();
				var listOffsetTop = $(React.findDOMNode(this.refs.feedList)).offset().top;
				var listOffsetBottom = listOffsetTop + listHeight;
				var h = $(React.findDOMNode(this.refs.feedList)).height();
				this.state.listHeight = listHeight;
				feedHeight = feedHeight + h; 
				window.removeEventListener('scroll', this.setUpHeight, false);
    			window.removeEventListener('resize', this.setUpHeight, false);
    			eventFeedHeight();
			},
			
			componentWillUnmount:function() {
				window.removeEventListener('scroll', this.setUpHeight, false);
    			window.removeEventListener('resize', this.setUpHeight, false);
			},
		
			componentDidMount: function() {
				window.addEventListener('scroll', this.setUpHeight, false);
    			window.addEventListener('resize', this.setUpHeight, false);
				
			},
		
			render: function() {
				var feedNodes;
				var groupId = this.props.groupId;
				var groupName = this.props.groupName;
				var groupInfo = this.props.groupInfo;
				var fromNoti = this.props.fromNoti === undefined ? 'N' : this.props.fromNoti;
				
				if(this.props.data.length > 0){
					feedNodes = this.props.data.map(
		        		function (feeddata) {
							// 해당 피드를 등록한 사람의 정보
							var key = feeddata.feedId;
							if(fromNoti == 'Y') key = 'newNotiFeed_'+feeddata.feedId;
							var member = feeddata.memberVo;
							// 해당 피드에 속한 팔로워 리스트
							var followers = feeddata.feedFollowerList;
							// 해당 피드에 속한 태그 리스트
							var tags = feeddata.feedTagList;
							// 피드에 속한 즐겨찾기 정보 리스트
							var bookmark = feeddata.bookmarkList;						
							// 해당 피드에 속한 파일 리스트
							var files = feeddata.fileList;
							// 피드가 설문이라면
							var feedPollList = feeddata.feedPollList;		
							// 피드가 설문이라면
							var resultFeedPollList = feeddata.resultFeedPollList;	
							// 해당 피드의 지식 등록 정보
							var kldgVo = feeddata.kldgVo;
							// 전자결재 피드의 경우 taskId를 가져온다.
							var taskId = feeddata.infId;
							// 그룹을 클릭시 해당 그룹에 대한 정보를 담은 객체
							var followerCnt = feeddata.followerCnt;
							// 해당 피드에 대해서 나 자신의 팔로워 여부 (0, 1)
							var isFollow = feeddata.isFollowStr;
							var isPublic = feeddata.isPublic;
							return (
	
			               			<Feed
										key            	   = {key}
										feedTitle		   = {feeddata.feedTitle} 
										feedId			   = {feeddata.feedId} 
										feedType		   = {feeddata.feedType}
										regMember          = {member}
										feedfollower	   = {followers} 
										bookmark		   = {bookmark}
										tag				   = {tags}
										dueDate			   = {feeddata.dueDate}
										endDate			   = {feeddata.endDate}
										regDttm			   = {feeddata.regDttm}  
										files              = {files}
										approvalStatus     = {feeddata.approvalStatus}
										feedContents	   = {feeddata.feedContents}
										cmtLstSecFeedId	   = {feeddata.cmtLstSecFeedId} 
										commentFeedList	   = {feeddata.commentFeedList} 
										cmtCnt			   = {feeddata.cmtCnt} 
										shareCnt		   = {feeddata.shareCnt} 
										likeItCnt		   = {feeddata.likeItCnt}
										likeItByMe         = {feeddata.likeItByMe}
										feedPollList       = {feeddata.feedPollList}
										resultFeedPollList = {feeddata.resultFeedPollList}
										groupId			   = {groupId}
										kldgVo			   = {kldgVo}
										taskId		   	   = {taskId}
										fromNoti      	   = {fromNoti}
										groupInfo		   = {groupInfo}
										followerCnt		   = {followerCnt}
										isFollow		   = {isFollow}
			               				isPublic			= {isPublic}
									/>
		           			);
		           		}
		        	);
				}
				
	        	return (<div ref='feedList'>
	        				<div ref='element'>{feedNodes}</div>
	        			</div>);
	
			}
			
		});
		
	
	
	
		// 개인 피드내에 나타나는 그룹피드의 표시 유무
		var FeedInGroupFeed = React.createClass({
			getInitialState: function() {

          		return {groupId:'', groupName:'', thisTimer:null, timeoutTime:800, insidePopup:false};

        	},

			tooltipPosition: function(element) {
				var pos = $(element).offset();
				var width = $(element).width();
				$('.over_feed_gate').css({
	    			left: pos.left + 'px',
	    			top: pos.top - 160 + 'px'
				});

			},

			tooltipRender: function(data) {
				React.render(<FollowerTooltip followerInfo={data} itemId={this.props.feedId}/>, document.getElementById('sns-tooltip'));
			},

			getFollowerInfo: function(info) {
				var infoArray = info.split(';');
				var followerType = infoArray[0];
				var followerId = infoArray[1];
				var baseurl = _Feed_BASE_FOLLOWER + '/members/'+followerId;
				if(followerType ==='GROUP') {
					baseurl = _Feed_BASE_GROUP + '/'+followerId;
				}
				
				ajaxGetForSync(baseurl, '',  this.tooltipRender);

			},

			goGroupContents: function() {

				// 오른쪽 메뉴 상단 그룹 팔로워 리스트
				if(contentsType == 'USER') {
					React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
					React.render(<MyGroupFollower groupId={this.state.groupId}/>, document.getElementById('RightUpLevel'));
				}
			
				contentsType  = 'GROUP';

				Reloader.reloadObservers({'type':'group', 'groupId':this.state.groupId, 'isGroupChange':'false'});
	
	
	
				// 가운데 컨텐츠 상단 부분(그룹 정보)
				React.unmountComponentAtNode(document.getElementById('head_contents'));
				React.render(<GroupHead groupId={this.state.groupId} />, document.getElementById('head_contents'));
	
	
				// 가운데 컨텐츠 상단 부분(그룹 정보)
				React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
				React.render(<FeedApp groupInfo={this.state}/>, document.getElementById('mainContentsArea'));


				// 중하단 탭 리스트 및 피드
				React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
				React.render(<GroupTabList groupId={this.state.groupId} />,  document.getElementById('selectTabBySession'));
				
				var groupId = 'myGroup_' + this.state.groupId;
				$('#'+groupId).addClass('group-select');
				$('#'+groupId+ ' > span.data-txt').addClass('group-select-text');
				
			},

			componentDidMount: function() {
		
				var className = 'feedInGroupFeed_'+this.props.feedId;

				var self = this;

				$("#sns-tooltip").mouseenter(function(){
					self.state.insidePopup = true;
				}).mouseleave(function(){
                   	self.state.insidePopup = false;
                   	$(this).hide();
                });

				$(React.findDOMNode(this.refs.feedInGroupFeed)).mouseenter(function(event) {
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
			},

			render: function() {
				
				var feedfollower = this.props.feedfollower;
				var followerId = '';
				var followerName = '';
				var followerType = '';
				feedfollower.forEach(function(follower){
					if(follower.followerType === 'GROUP') {
						followerType = follower.followerType;
						followerId = follower.followerId;
						followerName = follower.followerName;
					}
				});


				if(followerName != '' && this.props.groupId === 0){
					this.state.groupName = followerName;
					this.state.groupId = followerId;
					var rel = followerType+';'+followerId;
	        		return (
							<ul className='txt_ct feed-in-group' style={{'marginBottom':'0', 'clear':'both', 'marginTop':'10px'}}>
      							<li style={{'margin':'2px 5px 0 0'}}><img src='../images/icon_division.gif' width='6' height='14' /></li>
        						<li ref='feedInGroupFeed' rel={rel} style={{'cursor':'pointer'}} onClick={this.goGroupContents}><strong>{followerName}</strong></li>
      						</ul>
	           		);
				} else {
	        		return (
							<ul style={{'display':'none'}}>
      						</ul>
	           		);
				}

			}
		});
	
		var NotiMessage = React.createClass({
		
			getInitialState: function () {
	       		return { notiData : [], initialRegDttm : 0, noticeCnt : 0 };
	    	},
	    	
			notify: function(data) {
				this.ajaxCallByComponent();
			},
        
        	componentWillUnmount: function() {
     			Observer.unregisterObserver(this);
 			},		
			
			ajaxCallBack: function(data) {
				notiData = data;
				var feedList = data.feedList;
				if(selectedTab == 'PERSON_TOTAL') {
					this.setState({notiData:feedList, noticeCnt:data.noticeCnt});
				} else if(selectedTab == 'PERSON') {
					var personFeedList = [];
					var personNotiCnt  = 0;
					
					for(var i=0; i<feedList.length; i++) {
						var feedFollowerList = feedList[i].feedFollowerList;
						
						var feedFollowerList = feedList[i].feedFollowerList;
						for(var j=0; j<feedFollowerList.length; j++) {
							if(feedFollowerList[j].followerType == 'MEMBER' && feedFollowerList[j].followerId == _Feed_session_memberId) {
								personFeedList.push(feedList[i]);
								personNotiCnt++;
							}
						}
						
					}

					this.setState({notiData:personFeedList, noticeCnt:personNotiCnt});
				
				} else if(selectedTab == 'GROUP_TOTAL') {
					var groupFeedList = [];
					var groupNotiCnt  = 0;
					
					for(var i=0; i<feedList.length; i++) {
						var feedFollowerList = feedList[i].feedFollowerList;
						for(var j=0; j<feedFollowerList.length; j++) {
							if(feedFollowerList[j].followerType == 'GROUP' && feedFollowerList[j].followerId == this.props.groupId) {
								groupFeedList.push(feedList[i]);
								groupNotiCnt++;
							}
						}

					}

					this.setState({notiData : groupFeedList, noticeCnt : groupNotiCnt});
				}
			},
			
			ajaxCallByComponent: function() {
				var baseurl  = _Feed_NOTI_BY_REGDTTM + '/' + this.state.initialRegDttm;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, this.ajaxCallBack);
        	},
 			
			componentDidMount: function() {
				Observer.registerObserver(this);
				this.state.initialRegDttm = loadDttm;
				if(this.props.initial == 'false') {
					this.ajaxCallByComponent();
				}
			},
			
			showNewFeed	:function() {
				this.props.showNewFeed(this.state.notiData);
			},
			
			render: function() {
			
				if(selectedTab == 'PERSON_TOTAL' || selectedTab == 'PERSON') {
					if(this.state.noticeCnt == 0 || this.props.memberId != _Feed_session_memberId) {
			    		return (
			    				<div id="no_message"></div>
						);
					} else {
						return (
			    				<div id="noti_message" onClick={this.showNewFeed}>{this.state.noticeCnt} {_FEED_Feed_MSG_MESSAGECNTMSG}</div>
						);
					}
				} else if(selectedTab == 'GROUP_TOTAL') {
					if(this.state.noticeCnt == 0) {
			    		return (
			    				<div id="no_message"></div>
						);
					} else {
						return (
			    				<div id="noti_message" onClick={this.showNewFeed}>{this.state.noticeCnt} {_FEED_Feed_MSG_MESSAGECNTMSG}</div>
						);
					}				
				
				//TODO : 웹소켓 관련 전자결재 및 게시판도 붙일 수 있다.
				} else {
						return (
			    				<div id="no_message"></div>
						);
				}
				
			}
		});	
			
		var FeedSearchSortOption = React.createClass({
			getInitialState: function () {
	       		return {};
	    	},
	    	componentDidMount : function() {
	    		
	    		var today = new Date();
	    		var that = this;
	    		var fromDate = '';
	    		var toDate = this.makeDateFormat(today);
	    		
	    		$('#_feedSearchSortOption input').eq(0).val(toDate)
	    			.mask("9999-99-99", {placeholder: 'yyyy-mm-dd'});
	    		$('#_feedSearchSortOption input').eq(1).val(toDate)
	    			.mask("9999-99-99", {placeholder: 'yyyy-mm-dd'});
	    		
	    		$('#_feedSearchSortOption input').eq(0).datepicker({
	    			buttonImage: '../images/icon_calendal.png',
	            	buttonImageOnly: false,
	    			showOn : 'both',
	    			onSelect: function(dateText, inst) {
	    				//$("#fromWrapper").find("select.year").val(inst.selectedYear);
	            	}
	    		});
	    		
	    		$('#_feedSearchSortOption input').eq(1).datepicker({
	    			buttonImage: '../images/icon_calendal.png',
	            	buttonImageOnly: false,
	    			showOn : 'both',
	    			onSelect: function(dateText, inst) {
	    				//$("#fromWrapper").find("select.year").val(inst.selectedYear);
	            	}
	    		});
	    		
				$('.date-select button').each(function(i){
					$(this).click(function(){
						today = new Date();
						
						switch(i) {
							case 0 : 
								//fromDate = '0001-01-01';
								that.searchStart('', '', i);
								break;
							case 1 : 
								today.setDate(today.getDate() - 7);
								fromDate = that.makeDateFormat(today);
								toDate = that.makeDateFormat(new Date());
								that.searchStart(fromDate, toDate, i);
								break;
							case 2 : 
								today.setMonth(today.getMonth() - 1);
								fromDate = that.makeDateFormat(today);
								toDate = that.makeDateFormat(new Date());
								that.searchStart(fromDate, toDate, i);
								break;
							case 3 : 
								today.setFullYear(today.getFullYear() - 1);
								fromDate = that.makeDateFormat(today);
								toDate = that.makeDateFormat(new Date());
								that.searchStart(fromDate, toDate, i);
								break;
						}
						
					});
				});
				
				$('.btn-search button').click(function(){
					fromDate = $('#_feedSearchSortOption input').eq(0).val();
					toDate = $('#_feedSearchSortOption input').eq(1).val();
					
					if((fromDate != '' &&!isValidDate(fromDate))) {
						MsgPopup(_FEED_Feed_MSG_DATECHOOSEERRMSG2);
						return;
					}
					
					if((toDate != '' && !isValidDate(toDate))) {
						MsgPopup(_FEED_Feed_MSG_DATECHOOSEERRMSG2);
						return;
					}
					
					that.searchStart(fromDate, toDate, 0);
				});
				
				if(this.props.dateObj !== undefined) {
					var dateObj = this.props.dateObj;
					var idx = dateObj.option;
					$('.date-select button').removeClass('selected');
					$('.date-select button').eq(idx).addClass('selected');
					$('#_feedSearchSortOption input').eq(0).val(dateObj.fromdate);
					$('#_feedSearchSortOption input').eq(1).val(dateObj.todate);
				}
			},
			makeDateFormat : function(date) {
				var dateresult =
			    	leadingZeros(date.getFullYear(), 4) + '-' +
			    	leadingZeros(date.getMonth() + 1, 2) + '-' +
			    	leadingZeros(date.getDate(), 2);
				return dateresult;
			},
			searchStart : function(fromdate , todate, i) {
				$('.date-select button').removeClass('selected');
				$('.date-select button').eq(i).addClass('selected');
				$('#_feedSearchSortOption input').eq(0).val(fromdate);
				$('#_feedSearchSortOption input').eq(1).val(todate);
				
				var dateObj = {'fromdate' : fromdate, 'todate' : todate, 'option' : i};
				
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				React.render(<FeedBox dateObj = {dateObj} baseurl={_Feed_BASE_FEED} memberId={_Feed_session_memberId} groupId={0}/>, document.getElementById('MemberFeedBox'));
			},
			componentWillUnmount: function() {
				jQuery('#_feedSearchSortOption').hide();
			},
			render : function() {
				return (
					<div>
						<p className="title">등록일기준</p>
						<div className="date-select">
							<button className="selected">전체</button>
							<button>1주</button>
							<button>1개월</button>
							<button>1년</button>
						</div>
						<p className="title2">직접입력</p>
						<div className="data-insert">
							<input type="text" style={{'width':'120px'}} />
							<span>~</span>
							<input type="text" style={{'width':'120px'}} />
						</div>
						<div className="btn-search">
							<button>검색</button>
						</div>
					</div>
				);
			}
		});
		
		// 피드 박스 DIV
		var FeedBox = React.createClass({
		
			getInitialState: function () {
	       		return { clickNoti : 'false' };
	    	},
	    	
			notify: function(data) {
				if(this.state.clickNoti = 'true') {
					React.render(<NotiMessage showNewFeed={this.showNewFeed} initial={'false'} groupId={this.props.groupId} memberId={this.props.memberId}/>, document.getElementById('feed_noti'));
					this.state.clickNoti = 'false';
				}
			},
		
			componentWillMount: function() {
				feedHeight = 0;
				$(window).off('scroll');
			},
			
			componentDidMount: function() {
				feedHeight = 0;
				$('#new_loading_line').tooltip({
      				track: true,
      				position: {
        				my    : 'center bottom-20',
        				at	  : 'center top',
       				 	using : function(position, feedback) {
         					$(this).css(position);
          					$('<div>').addClass('arrow').addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this);
        				}
      				}
    			});
				Observer.registerObserver(this);
				
				// 더보기 관련 데이터 초기화
				curMoreDivId = '';
				divIdNum = 0;
				moreFeedId = 0;
				$('.btn_feedmore').hide();
				snsCommLoadingObj({s : 'o'});
				this.getFeedList();
				React.render(<NotiMessage showNewFeed={this.showNewFeed} initial={'true'} groupId={this.props.groupId} memberId={this.props.memberId}/>, document.getElementById('feed_noti'));
				var self = this;
				
				$(window).scroll(function () {
					if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
						if($FEED_SCROLLING_ONOFF =='ON') {
							$('.btn_feedmore').hide();
							snsCommLoadingObj({s : 'o'});
							self.getFeedList();
							$FEED_SCROLLING_ONOFF = 'OFF';
     					}
     				}
				
    			});
				
				if(document.getElementById('_feedSearchSortOption')) {
					React.render(<FeedSearchSortOption dateObj={this.props.dateObj} />, document.getElementById('_feedSearchSortOption'));
				}
				
				$(".sort-text").on('click', function(eve){
					jQuery('#_feedSearchSortOption').toggle('show');
				});
			},
			
			componentWillUnmount: function() {
				feedComponentWillUnmount(this);
			},			

			getFeedList : function(){
				var element = document.createElement('div');
				divIdNum = parseInt(divIdNum) + 1;
				element.id = 'feedLine' + divIdNum;
				curMoreDivId = element.id;
				try {
					if(element != null) {
						document.getElementById('feed_wholebox').appendChild(element);
						var jsondata = {'feedId' : moreFeedId, 'memberId' : this.props.memberId, 'groupId' : this.props.groupId};	
						
						if(this.props.dateObj !== undefined && this.props.dateObj !== null) {
							jsondata.fromdate = this.props.dateObj.fromdate;
							jsondata.todate = this.props.dateObj.todate;
						}
						
						ajaxGet(this.props.baseurl, jsondata, this.feedRender);
					}
					
				} catch(err){ console.log(err.message); }
			},
			
			showNewFeed: function(data) {
				data.forEach(function(feed){
					var feedAreaId = 'feed_'+feed.feedId;
					var newNotiFeedAreaId = 'newNotiFeed_'+feed.feedId;
					$('#'+feedAreaId).hide();
					$('#'+newNotiFeedAreaId).hide();
				});
				
				loadDttm = new Date().getTime();
				this.state.clickNoti = 'true';
				clickNoti = true;
				React.unmountComponentAtNode(document.getElementById('feed_noti'));
				
				var element = document.createElement("div");
				notiDiv = parseInt(notiDiv) + 1;
				element.id = 'newFeedByNoti' + notiDiv;
				$('#new_notibox').prepend(element);
				React.render(<FeedList data={data} fromNoti={'Y'} groupId={this.props.groupId} groupInfo={this.props.groupInfo}/>, document.getElementById(element.id));
				$('#new_loading_line').show();
				
			},
			
			feedRender:function(data){
				$('.btn_feedmore').hide();
				snsCommLoadingObj({s : 'x'});
				if( data === undefined || data == null || data.length == 0) {
					
					if(data.length == 0) {
						var element = document.createElement("div");
						element.id = 'noMoreFeedHere';
						document.getElementById('feedLine' + divIdNum).appendChild(element);
						if(divIdNum == 1)
							React.render(<NoFeedHere />, document.getElementById('noMoreFeedHere'));
						else
							$('#feedLine' + divIdNum).html('<div class="last_contents">&nbsp;</div>');
					}
					
					$(window).off('scroll');
					
					eventFeedHeight();
				} else {
					if(this.props.option === undefined) {
						React.render(<FeedList data={data} groupId={this.props.groupId} groupInfo={this.props.groupInfo}/>, document.getElementById(curMoreDivId));
						$FEED_SCROLLING_ONOFF = 'ON';
					}
				}
			},
			
			render: function() {
			
				var topInfoText = '';
				var topSearchOption = '';
				switch(selectedTab) {
					case 'PERSON_TOTAL'		: topInfoText = _FEED_Feed_MSG_WHATTOSHOWTEXT_PERSON_TOTAL; 
						//topSearchOption = <div className="date-sort-article"><div className="date-sort-content"><a href="#" className="sort-text">기간검색<span className="sort-btn close">btn-arrow</span></a><div className="sort-option" id="_feedSearchSortOption"></div></div></div>;
						break;
					case 'PERSON'			: topInfoText = _FEED_Feed_MSG_WHATTOSHOWTEXT_PERSON; break;
					case 'GROUP_TOTAL' 		: topInfoText = _FEED_Feed_MSG_WHATTOSHOWTEXT_GROUP_TOTAL; break;
					case 'APPROVAL'			: topInfoText = _FEED_Feed_MSG_WHATTOSHOWTEXT_APPROVAL; break;
					case 'BOARD'			: topInfoText = _FEED_Feed_MSG_WHATTOSHOWTEXT_BOARD; break;
					case 'GROUP_KNWLDG'		: topInfoText = _FEED_Feed_MSG_WHATTOSHOWTEXT_GROUP_KNWLDG; break;
				}
			
		    	return (
		    		<div>
		    			<span className="top_info_text">
		    				{topInfoText} {topSearchOption}
		    			</span>
		    			<div id="feed_noti"></div>
		    			<div id="new_notibox"></div>
		    			<div id="new_loading_line" title={_style_MSG_COMMON_ISLOADEDBEFORETITLE}>
		    				<h2 className="newline-text"><span>{_style_MSG_COMMON_ISLOADEDBEFORE}</span></h2>
		    			</div>
						<div id="feed_wholebox"></div>
						<span onClick={this.getFeedList} className="btn_feedmore" style={{'marginTop':'50px'}} >{_FEED_Feed_MSG_MORETEXT}</span>
						<span className="img_feedmore_" style={{'display':'none'}}><img src="../images/loader_32.GIF" /></span>
					</div>
				);
			}
		});

		// 각 툴팁에서 멤버명 클릭시 해당 멤버 콘텐츠 영역 띄우기 위한 공통 스크립트
		function getMemberInfo(fromTargetMemberId, fromTargetMemberName, option){
		
			if(viewType == 'FAVORITE') {
				if(option == 'fromRecentAct' || option == 'fromTodo') {
					//
				} else {
					return false;
				}
			}	
			
			$("#feedGate").show();
			$("#selectTabBySession").show();
			React.unmountComponentAtNode(document.getElementById('selectTabByNoti'));
			React.unmountComponentAtNode(document.getElementById('selectTabByIntegration'));
			React.unmountComponentAtNode(document.getElementById('FavoriteListBack'));
			React.unmountComponentAtNode(document.getElementById('selectTabBySystem'));
			React.unmountComponentAtNode(document.getElementById('selectTabByFavorite'));
		
			if(contentsType == 'GROUP') {
				contentsType = 'USER';
				React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				React.render(<MsAddress/>, document.getElementById('RightUpLevel'));
			}
		
			Reloader.reloadObservers('reload');
		
			// 가운데 컨텐츠 상단 부분
			React.unmountComponentAtNode(document.getElementById('head_contents'));
			React.render(<MemberHead memberId={fromTargetMemberId}/>, document.getElementById('head_contents'));

			// 피드 입력창
			React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
			
			if(_Feed_session_memberId == fromTargetMemberId){
				React.render(<FeedApp/>, document.getElementById('mainContentsArea'));
			} else {
				React.render(<FeedApp targetId={fromTargetMemberId} targetName={fromTargetMemberName}/>, document.getElementById('mainContentsArea'));
			}

			// 중하단 탭 리스트 및 피드
			React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			if(_Feed_session_memberId == fromTargetMemberId){
				React.render(<MemberTabList memberId={fromTargetMemberId} option={option}/>,  document.getElementById('selectTabBySession'));
			}else{
				React.render(<OtherMemberTabList memberId={fromTargetMemberId}/>,  document.getElementById('selectTabBySession'));
			}
		}
		
		function getOneFavoriteFeedDetailResult(feeddata) {
			
			$FAVORITE_SCROLLING_ONOFF = 'OFF';
			$TODO_SIMPLE_SCROLLING_ONOFF = 'OFF';
			
			$('input#myCurrentFavoriteIdInputHidden').val($("#feed_" + feeddata.feedId).position().top);
			
			React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			$('#selectTabByFavorite').hide();
			$('#feed_favorite').remove();
			
			snsCommLoadingFeed(feeddata, 'selectTabBySession');
			
			$('#favorite_malgun_forDetail').remove();
			
			var element = document.createElement("ul");
			element.id = 'favorite_malgun_forDetail';
			$(element).addClass('malgun13');
			$(element).html('<li class="tab_on" style="color:#fe630f; font-weight:bold;">즐겨찾기</li>');
			$('#selectTabBySession').prepend($(element));
				
			$('#FavoriteListBack').show();
			$('#selectTabBySession').show();
			
			$("html, body").animate({ scrollTop: 0 }, "fast");
		}
		
		function getOneToDoFeedDetailResult(feeddata) {
			
			$FAVORITE_SCROLLING_ONOFF    = 'OFF';
			$TODO_SIMPLE_SCROLLING_ONOFF = 'OFF';
			$FAVORITE_WORKING_ON      = 'OFF';
			
			if(document.getElementById('feedlist_detailbox'))
				React.unmountComponentAtNode(document.getElementById('feedlist_detailbox'));
			$('#feed_wholebox').hide();
			
			snsCommLoadingFeed(feeddata, 'feedlist_detailbox');
			
			$('#feedlist_detailbox').show();
			
			$("html, body").animate({ scrollTop: 0 }, "fast");
  			
		}
		
		// 알림상세보기
		function getOneNotiFeedDetailResult(feeddata) {
			
			$FAVORITE_SCROLLING_ONOFF = 'OFF';
			$TODO_SIMPLE_SCROLLING_ONOFF = 'OFF';
			$TOTALNOTI_SCROLLING_ONOFF = 'OFF';
			
			//$('input#myCurrentFavoriteIdInputHidden').val($("#feed_" + feeddata.feedId).position().top);
			
			if ( $("#MemberFeedBox").length ) {
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				snsCommLoadingFeed(feeddata, 'MemberFeedBox');
			}
			
			var element = document.createElement("ul");
			element.id = 'favorite_malgun_forDetail';
			$(element).addClass('malgun13');
			$(element).html('<li class="tab_on" style="color:#fe630f; font-weight:bold;">'+ _FEED_Feed_MSG_TOTALNOTITITLE +'</li>');
			$('#MemberFeedBox').prepend($(element));
			$('#selectTabBySession').show();
			
			$("html, body").animate({ scrollTop: 0 }, "fast");
		}

		// 공유된 피드를 렌더링
		function getFeedDetailResult(feeddata){
		
			if(selectedTab != 'FILE') {
				for(var i=1 ; i< parseInt(divIdNum)+1 ; i++) {
					unmountedId = 'feedLine'+i;
					if ( $("#" + unmountedId ).length ) {
						React.unmountComponentAtNode(document.getElementById(unmountedId));
					}
				}
			}
			
			if(clickNoti) {
				for(var i=1 ; i< parseInt(notiDiv)+1 ; i++) {
					unmountedNotiId = 'newFeedByNoti'+i;
					if ( $("#" + unmountedNotiId ).length ) {
						React.unmountComponentAtNode(document.getElementById(unmountedNotiId));
					}
				}
				
				clickNoti = false;
				notiDiv = 0;
			}
			// 화면 기본 데이터 초기화
			curMoreDivId = '';
			divIdNum = 0;
			moreFeedId = 0;
			//$(window).off('scroll');
			$TOTALNOTI_SCROLLING_ONOFF = 'OFF';
			
			if ( $("#MemberFeedBox").length ) {
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				snsCommLoadingFeed(feeddata, 'MemberFeedBox');
				var element = document.createElement("div");
				element.id = 'feed_noti';
				$('#MemberFeedBox').prepend(element);
			} else if( $("#GroupFeedBox").length ) {
				React.unmountComponentAtNode(document.getElementById('GroupFeedBox'));
				snsCommLoadingFeed(feeddata, 'GroupFeedBox');
			} else {
				if(viewType != 'PERSON') {
			 		console.log('getMemberInfo');
					getMemberInfo(_Feed_session_memberId, _Feed_session_memberName, 'fromSysSearch');
				}
				
				React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));
				snsCommLoadingFeed(feeddata, 'MemberFeedBox');
			}
			
			$("html, body").animate({ scrollTop: 0 }, "fast");
		}
		
		// 할일피드를 렌더링
		function getFeedTodoDetailResult(feeddata){
		
			// 화면 기본 데이터 초기화
			curMoreDivId = '';
			divIdNum = 0;
			moreFeedId = 0;
			$(window).off('scroll');
			React.unmountComponentAtNode(document.getElementById('feed_wholebox'));
			snsCommLoadingFeed(feeddata, 'feed_wholebox');
			
		}
		
		function OpenLyncMenuName(memberId, element) {
			getMentionSyncKey(memberId, element);
		}
		
		function getMentionSyncKey(memberId, element) {
			var baseurl = _Feed_BASE_FOLLOWER + '/members/'+memberId;
			ajaxGetForSync(baseurl, '',  this.getSyncKey, element);
		}
		
		function getSyncKey(data, element) {
			var mentionSyncKey = data.followerMappingInfo[0]===undefined?this.props.regMemberId:data.followerMappingInfo[0].syncKey
			openLyncMenu(mentionSyncKey, element,'','-560','-100');
		}

		function answerTag(feedId, regMember, removeAnswerTag){
			var clickAreaId = 'ppp' + feedId;
			//$('#'+clickAreaId).attr('style','position:absolute; top:41px; right:40px; cursor:pointer;');
			$('#'+clickAreaId).attr('style','cursor:pointer;');
			var answerTagId = 'answerTag' + feedId;
			React.render( <Answer receiveMember={regMember} removeAnswerTag={removeAnswerTag}/>, document.getElementById(answerTagId) );
			var cfId = 'cf' + feedId;
			$('#'+cfId).show();
			$('#commentInput' + feedId).focus();
			$('#subButtonLayout' + feedId).show();
		}
		
		function removeAnswerTag(feedId){
			var clickAreaId = 'ppp' + feedId;
			$('#'+clickAreaId).attr('style','position:absolute; top:6px; right:10px; cursor:pointer;');
			var answerTagId = 'answerTag' + feedId;
			React.unmountComponentAtNode(document.getElementById(answerTagId));
		}
		
		function feedComponentWillUnmount(element) {
			Observer.unregisterObserver(element);
			
			React.unmountComponentAtNode(document.getElementById('feed_noti'));
			for(var i=1 ; i< parseInt(divIdNum)+1 ; i++) {
				unmountedId = 'feedLine'+i;
				if($("#" + unmountedId).length == 1)
					React.unmountComponentAtNode(document.getElementById(unmountedId));
			}
				
			if(clickNoti) {
				for(var i=1 ; i< parseInt(notiDiv)+1 ; i++) {
					unmountedNotiId = 'newFeedByNoti'+i;
					React.unmountComponentAtNode(document.getElementById(unmountedNotiId));
				}
					
				clickNoti = false;
				notiDiv = 0;
			}
			
			$('#_feedSearchSortOption').hide();
			
			if(document.getElementById("_feedSearchSortOption")) {
				//React.unmountComponentAtNode(document.getElementById('_feedSearchSortOption'));
			}
			React.unmountComponentAtNode(document.getElementById('feed_wholebox'));
		}
		
		function feedOGTrigger(feedId, data) {
			var ogAreaId   = "ogArea"+feedId;
			var showRemove= 'false';
			React.render(<MainOG data={data} showRemove={showRemove}/>, document.getElementById(ogAreaId));
		}
		
		function feedShareFollower(feedTitle, src, memberName) {
			$('#sfeedTitle').html(feedTitle);
			$('#shareUserPic').attr('src', src);	
			$('#shareUserName').html(memberName);
		}
		
		function feedShare(shareFollower, memberId, feedId) {
			React.render(<SharePopup shareData={shareFollower} shareMemberId={memberId} shareFeedId={feedId}/>, document.getElementById('share_popup'));
			sharePopup = $('#share_popup').bPopup({
					modalClose		: false,
					positionStyle	: 'absolute',
					scrollBar		: false,
					onOpen 			: function() {
						$('#share_popup').draggable({ handle: "div.pop-modalwindow-header" });
					}
					, onClose		: function() {
						// 화면 데이터 초기화
						$('#shareFeedTitle').val('');
						multiFileList = new Array();
						React.unmountComponentAtNode(document.getElementById('share_popup'));
					}
				});
				
			$('#shareFeedTitle').focus();
		}
		
		function feedFavoriteAct(reactElement) {
			if(reactElement.state.isBookmarkByMe === 'true') {
				reactElement.removeFeedBookmark();
			} else {
				reactElement.addFeedBookmark();
			}
		}
		
		function feedMoreLayOut(isbookmarklist, feedId, reactElement) {
			
			reactElement.calenderPositionOffset();
			isFeedMoreLayout = true;
			if(isbookmarklist != 'bm') {
				fmlId = "feedMoreLayout" + feedId;
			} else {
				fmlId = "feedMoreLayoutBM" + feedId;
			}	
			var feedMoreLayoutId = fmlId;
			$('#'+feedMoreLayoutId).show();
		}
		
		function feedRegFeedKldgCallback(reactElement) {
			reactElement.state.regFeedKldg = 'true';
			if(reactElement.state.clickedMoreReply ==='true') {
				reactElement.getBeforeCommentList();
			}

			reactElement.rerenderComment();

			$(React.findDOMNode(reactElement.refs.knowledgeId)).addClass('icon_knowledge');
			$(React.findDOMNode(reactElement.refs.iconRegFeedKldgId)).hide();
			$(React.findDOMNode(reactElement.refs.txtRegFeedKldgId)).hide();
			$(React.findDOMNode(reactElement.refs.iconRemoveFeedKldgId)).show();
			$(React.findDOMNode(reactElement.refs.txtRemoveFeedKldgId)).show();
			MsgPopup(_FEED_Feed_MSG_MADEKNOWLEDGEMSG);
		}
		
		function feedRemoveFeedKldgCallback(reactElement) {
			reactElement.state.regFeedKldg = 'false';
			reactElement.state.kldgVo = undefined;
			if(reactElement.state.clickedMoreReply ==='true') {
				reactElement.getBeforeCommentList();
			}

			reactElement.rerenderComment();

			$(React.findDOMNode(reactElement.refs.knowledgeId)).removeClass('icon_knowledge');
			$(React.findDOMNode(reactElement.refs.iconRegFeedKldgId)).show();
			$(React.findDOMNode(reactElement.refs.txtRegFeedKldgId)).show();
			$(React.findDOMNode(reactElement.refs.iconRemoveFeedKldgId)).hide();
			$(React.findDOMNode(reactElement.refs.txtRemoveFeedKldgId)).hide();
			MsgPopup(_FEED_Feed_MSG_MADEKNOWLEDGECLEARMSG);
		}
		
		function feedAddBookmarkCallback(reactElement) {
			
			if(reactElement.state.clickedMoreReply ==='true') {
				reactElement.getBeforeCommentList();
			}

			reactElement.rerenderComment();
			
			reactElement.state.isBookmarkByMe = 'true';

			$(React.findDOMNode(reactElement.refs.favoriteIconId)).removeClass('icon_favorite2').addClass('icon_favorite');		
			$(React.findDOMNode(reactElement.refs.iconAddBookmarkId)).hide();
			$(React.findDOMNode(reactElement.refs.txtAddBookmarkId)).hide();
			$(React.findDOMNode(reactElement.refs.iconRemoveBookmarkId)).show();
			$(React.findDOMNode(reactElement.refs.txtRemoveBookmarkId)).show();	
			//MsgPopup('즐겨찾기로 등록했습니다.');
		}
		
		function feedRemoveBookmarkCallback(reactElement) {
			
			if(reactElement.state.clickedMoreReply ==='true') {
				reactElement.getBeforeCommentList();
			}

			reactElement.rerenderComment();
			
			reactElement.setState({'bookmark': []});
			reactElement.state.isBookmarkByMe = 'false';
			
			$(React.findDOMNode(reactElement.refs.favoriteIconId)).removeClass('icon_favorite').addClass('icon_favorite2');		
			$(React.findDOMNode(reactElement.refs.iconAddBookmarkId)).show();
			$(React.findDOMNode(reactElement.refs.txtAddBookmarkId)).show();
			$(React.findDOMNode(reactElement.refs.iconRemoveBookmarkId)).hide();
			$(React.findDOMNode(reactElement.refs.txtRemoveBookmarkId)).hide();		
			//MsgPopup('즐겨찾기를 해제했습니다.');
		}
		
		function feedFollow(reactElement) {
			reactElement.state.newFeedfollower = [];
				
			var feedFollwerList = [
									{"itemId"		: reactElement.state.feedId,
									 "itemType"		: "FEED",
									 "followerId"	: _Feed_session_memberId,
									 "followerName" : _Feed_session_memberName,
									 "followerType" : "MEMBER",
									 "regMemberId"  : reactElement.state.regMember.memberId	
									}	
								  ];
				
			reactElement.state.newFeedfollower = feedFollwerList;
				
			var feedVo = {
							"feedId"			: reactElement.state.feedId,
							"feedFollowerList"  :feedFollwerList
						}
			ajaxAdd(_Feed_BASE_FOLLOWER, feedVo, reactElement.followCallback)
		}
		
		function unFollowCallback(reactElement) {
			reactElement.state.isFollow = 'false';
			if(reactElement.state.clickedMoreReply ==='true') {
				reactElement.getBeforeCommentList();
			}

			reactElement.rerenderComment();

			$(React.findDOMNode(reactElement.refs.iconFollowId)).show();
			$(React.findDOMNode(reactElement.refs.txtFollowId)).show();
			$(React.findDOMNode(reactElement.refs.iconUnfollowId)).hide();
			$(React.findDOMNode(reactElement.refs.txtUnfollowId)).hide();	
			MsgPopup(_FEED_Feed_MSG_UNFOLLOWEDMSG);
		}
		
		function feedComplete(reactElement) {
			$(React.findDOMNode(reactElement.refs.iconFeedCompleteId)).hide();
			$(React.findDOMNode(reactElement.refs.txtFeedCompleteId)).hide();
			$(React.findDOMNode(reactElement.refs.iconFeedIncompleteId)).show();
			$(React.findDOMNode(reactElement.refs.txtFeedIncompleteId)).show();

			var feedVo = {"feedId"			:reactElement.state.feedId,
					      "compMemberId"	: _Feed_session_memberId,
						  "regMemberId"		: _Feed_session_memberId,
        	   			  "feedTitle"		: '',
        	   			  "contentsType"	: reactElement.state.contentsType,
        	   			  "feedContents"	: reactElement.state.feedContents, 
						  "pFeedId"			: reactElement.state.pFeedId,
						  "pMemberId"		: reactElement.state.pMemberId,	
						  "cmtLstSecFeedId"	: reactElement.state.cmtLstSecFeedId
						};

			ajaxUpd(_Feed_TODO_COMPLETE, feedVo, reactElement.chnCallBack);
		}

		function feedIncomplete(reactElement) {
			$(React.findDOMNode(reactElement.refs.iconFeedCompleteId)).show();
			$(React.findDOMNode(reactElement.refs.txtFeedCompleteId)).show();
			$(React.findDOMNode(reactElement.refs.iconFeedIncompleteId)).hide();
			$(React.findDOMNode(reactElement.refs.txtFeedIncompleteId)).hide();

			var feedVo = {
						  "feedId"			: reactElement.state.feedId,
						  "regMemberId"		: _Feed_session_memberId,
            			  "feedTitle"		: '',
            			  "contentsType"	: reactElement.state.contentsType,
            			  "feedContents"	: reactElement.state.feedContents, 
						  "pFeedId"			: reactElement.state.pFeedId,
						  "pMemberId"		: reactElement.state.pMemberId,	
						  "cmtLstSecFeedId"	: reactElement.state.cmtLstSecFeedId			
						};

			ajaxUpd(_Feed_TODO_INCOMPLETE, feedVo, reactElement.chnCallBack);
		}
		
		function feedChangeFeedDate(reactElement, dateText) {
			var duedateAreaId = 'duedateArea'+reactElement.state.feedId;
			var duedateId = 'duedate'+reactElement.state.feedId;
			var oldDuedate = $('#'+duedateId).html();
			//dueDate가 있는 경우와 없는 경우를 나눠 액션처리
				
			if(reactElement.state.dueDate !== undefined && reactElement.state.dueDate.length>0) {
				$("#"+duedateId).html(dateText);
				var regex = /[^0-9]/g;
   				dateText = dateText.replace(regex, '');
				oldDuedate = oldDuedate.replace(regex, '');
				if(dateText == oldDuedate)return false;
				var feedVo = {
								"feedId"			: reactElement.state.feedId,
								"regMemberId"		: _Feed_session_memberId,
        	    				"feedTitle"			: '',
        	    				"dueDate"		    : dateText,
        	    				"contentsType"		: reactElement.state.contentsType,
        	    				"feedContents"		: reactElement.state.feedContents, 
								"pFeedId"			: reactElement.state.pFeedId,
								"pMemberId"			: reactElement.state.pMemberId,	
								"cmtLstSecFeedId"	: reactElement.state.cmtLstSecFeedId
								 };

				ajaxUpd(_Feed_SET_DUEDATE, feedVo, reactElement.chnCallBack);
			} else {
				$(React.findDOMNode(reactElement.refs.iconFeedCompleteId)).show();
				$(React.findDOMNode(reactElement.refs.txtFeedCompleteId)).show();
				React.unmountComponentAtNode(document.getElementById(duedateAreaId));
				React.render(<ChangeDueDate feedId={reactElement.state.feedId} dateText={dateText}/>, document.getElementById(duedateAreaId));

				var regex = /[^0-9]/g;
				dateText = dateText.replace(regex, '');
				if(oldDuedate !== undefined && oldDuedate.length>0) {
					oldDuedate = oldDuedate.replace(regex, '');
				} else {
					oldDuedate = '';
				}
				if(dateText == oldDuedate)return false;
				var feedVo = {
								"feedId"			: reactElement.state.feedId,
								"regMemberId"		: _Feed_session_memberId,
        	    				"feedTitle"			: '',
        	    				"dueDate"		    : dateText,
        	    				"contentsType"		: reactElement.state.contentsType,
        	    				"feedContents"		: reactElement.state.feedContents, 
								"pFeedId"			: reactElement.state.pFeedId,
								"pMemberId"			: reactElement.state.pMemberId,	
								"cmtLstSecFeedId"	: reactElement.state.cmtLstSecFeedId
							 };
				ajaxUpd(_Feed_SET_DUEDATE, feedVo, reactElement.chnCallBack);
			}
		}
		
		function deleteFeedCallback(reactElement) {
			MsgPopup(_FEED_Feed_MSG_FEEDWASDELETEDMSG);
			var id = '[data-reactid='+reactElement._reactInternalInstance._rootNodeID+']';
			$('div').find('[data-reactid="'+ reactElement._reactInternalInstance._rootNodeID + '"]').hide();
		}
		
		function feedGetBeforeCommentListResult(reactElement, data) {
			var self = reactElement;
			var commentBeforeNodes = data.commentFeedList.map(
				function (ctl) {
						var key = 'feedId'+ctl.feedId;
						return (
								<CommentFeed key = {key}
											 commentData = {ctl} 
											 pFeedData={self.state}
											 isFollow={self.state.isFollow} 
											 setting={self.setpMemberId}
											 groupId={self.state.groupId}
											 feedFollow={self.feedFollow}
											 feedUnfollow={self.feedUnfollow}
											 addFeedBookmark={self.addFeedBookmark}
											 removeFeedBookmark={self.removeFeedBookmark}	
											 deleteCommentAct={self.deleteCommentAct}
											 regFeedKldg={self.regFeedKldg}
											 removeFeedKldg={self.removeFeedKldg}
											 feedCommentFollowerAndTagSetting={self.feedCommentFollowerAndTagSetting}
								/>
						);
					}
				);
			//reactElement.setState({commentListBefore : commentBeforeNodes, clickedMoreReply  : 'true'});
			reactElement.setState({commentListBefore : [], clickedMoreReply  : 'true'});
			reactElement.setState({commentListReal : commentBeforeNodes, clickedMoreReply  : 'true' });
		}
		
		function feedAjaxCallBackNoti(reactElement, data) {
			var feedId = reactElement.state.feedId;
			var notiMsgId = 'notiMsg'+reactElement.state.feedId;
			var notiData = notiData;
			var feedList = notiData.feedTypeList;
			var cnt = 0;
			if(feedList !== undefined) {
				for(var i=0; i<feedList.length; i++) {
					for(key in feedList[i]) {
						if(key == feedId) cnt++;
					}
				}
			}

			if(cnt > 0) {
				var notiMsgId = 'notiMsg'+reactElement.state.feedId;
				React.unmountComponentAtNode(document.getElementById(notiMsgId));
				React.render(<CommentNoti initialDttm={loadDttm} newCommentShow={reactElement.newCommentShow} noticeCnt={cnt}/>, document.getElementById(notiMsgId));
			}
		}
		
		function feedMakeGroup(reactElement) {
			makeFeedId = reactElement.state.feedId;
			makeGroupFrom = 'feed';
			var followerList = reactElement.state.feedfollower;
			var feedFromFollowerList = [];
			for(var i=0; i<followerList.length; i++) {
				if(followerList[i].followerType == 'MEMBER' && followerList[i].followerId !=  _Feed_session_memberId) {
					var vo = {
								label : followerList[i].followerName,
								value : followerList[i].followerName,
								id    : followerList[i].followerId,
								email : '',
								type  : followerList[i].followerType,
								pic   : ''
							 };
					feedFromFollowerList.push(vo);
				}
			}
			React.render(<FollowerApp fromFollowerInputSetting={reactElement.fromFollowerInputSetting} writtenFollowerList={feedFromFollowerList} fromFollowrSetting={reactElement.fromFollowrSetting} followerHandler={reactElement.followerHandler}  ftype={'normal'}/>, document.getElementById('_gflist'));
		
			bPopupGc = $('#element_to_pop_up').bPopup({
				modalClose: false,
	    		opacity: 0.6,
	   		 	positionStyle: 'fixed'
				, onOpen : function() {
					$("#groupName").val('');
					$("#description").val('');
					$('#grpImg').attr('src', '../images/pic_group.jpg');
					$("#grpNameChkMgs").html('');
					document.body.style.overflow = "hidden";
					$("html").css("overflow-y","hidden");
					
					$('#element_to_pop_up').draggable({ handle: "div.pop-modalwindow-header" });
				}
				, onClose : function(){
					document.body.style.overflow = "visible";
					$("html").css("overflow-y","scroll");
				}
			});
			
		}
		
		function feedLikeitResult(reactElement, data) {
			var feedLikeItByMeAreaId = 'feedLikeItByMeArea'+reactElement.state.feedId;
			var likeItByMe = 0;
			if(reactElement.state.likeItByMe === 1) {
				React.unmountComponentAtNode(document.getElementById(feedLikeItByMeAreaId));
				likeItByMe = 0;
			} else {
				React.unmountComponentAtNode(document.getElementById(feedLikeItByMeAreaId));
				React.render(<LikeIt />, document.getElementById(feedLikeItByMeAreaId));
				likeItByMe = 1;
			}
			reactElement.setState({likeItCnt : data.likeItCnt, likeItByMe: likeItByMe});
		}
		
		function getOneFeedCommentDataResult(data) {
			
		}
		
		function feedRerenderComment(reactElement) {
			var self = reactElement;
			var commentRealNodes = '';
			if(reactElement.state.newCommentData.commentFeedList !==undefined && reactElement.state.newCommentData.commentFeedList.length>0){
				commentRealNodes = reactElement.state.newCommentData.commentFeedList.map(function (ctl) {
							var key = 'feedId'+ctl.feedId;
							return (
									<CommentFeed key = {key}
												 commentData = {ctl} 
											 	 pFeedData={self.state}
											 	 isFollow={self.state.isFollow} 
											 	 setting={self.setpMemberId}
											 	 groupId={self.state.groupId}
											 	 feedFollow={self.feedFollow}
											 	 feedUnfollow={self.feedUnfollow}
											 	 addFeedBookmark={self.addFeedBookmark}
											 	 removeFeedBookmark={self.removeFeedBookmark}
												 deleteCommentAct={self.deleteCommentAct}
											 	 regFeedKldg={self.regFeedKldg}
											 	 removeFeedKldg={self.removeFeedKldg}
											 	 feedCommentFollowerAndTagSetting={self.feedCommentFollowerAndTagSetting}
								/>
							);
						}
				);
			} else {
				if(reactElement.props.commentFeedList !== undefined) {
					commentRealNodes = reactElement.props.commentFeedList.map(function (ctl) {
								var key = 'feedId'+ctl.feedId;
								return (
										<CommentFeed key = {key}
													 commentData = {ctl} 
												 	 pFeedData={self.state}
												 	 isFollow={self.state.isFollow} 
												 	 setting={self.setpMemberId}
												 	 groupId={self.state.groupId}
												 	 feedFollow={self.feedFollow}
												 	 feedUnfollow={self.feedUnfollow}
												 	 addFeedBookmark={self.addFeedBookmark}
												 	 removeFeedBookmark={self.removeFeedBookmark}
													 deleteCommentAct={self.deleteCommentAct}
												 	 regFeedKldg={self.regFeedKldg}
												 	 removeFeedKldg={self.removeFeedKldg}
												 	 feedCommentFollowerAndTagSetting={self.feedCommentFollowerAndTagSetting}
									/>
								);
							}
					);
				} else {
				}
			}
			
			if(reactElement.state.isbookmarklist !== 'bm') {
				reactElement.setState({commentListReal:commentRealNodes});
			} else {
				reactElement.setState({commentListReal:''});
			}
		}
		
		function feedFollowCallback(reactElement) {
			reactElement.state.isFollow = 'true';
			if(reactElement.state.clickedMoreReply ==='true') {
				reactElement.getBeforeCommentList();
			}
				
			reactElement.rerenderComment();

			$(React.findDOMNode(reactElement.refs.iconFollowId)).hide();
			$(React.findDOMNode(reactElement.refs.txtFollowId)).hide();
			$(React.findDOMNode(reactElement.refs.iconUnfollowId)).show();
			$(React.findDOMNode(reactElement.refs.txtUnfollowId)).show();
			MsgPopup(_FEED_Feed_MSG_FOLLOWEDMSG);
		}
		
		function feedAjaxCallByNoti(reactElement) {
			var feedId = reactElement.state.feedId;
			var notiMsgId = 'notiMsg'+reactElement.state.feedId;
			var feedList = notiData.feedTypeList;
			var cnt = 0;
			if(feedList !== undefined) {
				for(var i=0; i<feedList.length; i++) {
					for(key in feedList[i]) {
						if(key == feedId) cnt++;
					}
				}
			}
			
			if(cnt > 0) {
				var notiMsgId = 'notiMsg'+reactElement.state.feedId;
				React.unmountComponentAtNode(document.getElementById(notiMsgId));
				React.render(<CommentNoti initialDttm={loadDttm} newCommentShow={reactElement.newCommentShow} noticeCnt={cnt}/>, document.getElementById(notiMsgId));
			}
        }
        
		function feedCreateCommentResult(reactElement, data) {
			
			$("button#addComment" + reactElement.state.pFeedId).removeAttr("disabled");
			
				// 입력한 댓글창 내용 지우기
			reactElement.state.feedfollower 	= [];
			reactElement.state.newFeedfollower  = [];
			reactElement.state.feedTitle 		= '';
			reactElement.state.feedContents 	= '';
			reactElement.state.pMemberId 		= '';
			reactElement.state.files			= [];
			// 해당 피드의 댓글 리스트 초기화
			reactElement.state.commentListReal 	= [];
			reactElement.state.newCommentData = data;
			var self = reactElement;				
			var commentRealNodes = data.commentFeedList.map(
				function (ctl) {
					var key = self.props.fromServer == 'y' ? 'feedIdCo'+ctl.feedId : 'feedId'+ctl.feedId;
					return (
							<CommentFeed key={key}
										 commentData = {ctl} 
										 pFeedData={self.state}
										 isFollow={self.state.isFollow} 
										 setting={self.setpMemberId}
										 groupId={self.state.groupId}
										 feedFollow={self.feedFollow}
										 feedUnfollow={self.feedUnfollow}
										 addFeedBookmark={self.addFeedBookmark}
										 removeFeedBookmark={self.removeFeedBookmark}	
										 deleteCommentAct={self.deleteCommentAct}	
										 regFeedKldg={self.regFeedKldg}
										 removeFeedKldg={self.removeFeedKldg}		
										 feedCommentFollowerAndTagSetting={self.feedCommentFollowerAndTagSetting}
							/>
					);
				}
			);
			var answerTagId = 'answerTag' +  reactElement.state.pFeedId;
			var clickAreaId = 'ppp' + reactElement.state.pFeedId;
			$('#'+clickAreaId).attr('style','position:absolute; top:2px; right:10px; cursor:pointer;');
			var commentId = "commentInput"+reactElement.state.feedId;
			$('#'+commentId).attr('style','height:34px;width:94%;padding:10px 5% 0px 1%;border:1px solid #e0e0e0;resize:none;');
			$('#'+answerTagId).empty();
			var setTag = reactElement.state.tag;
			loadDttm = new Date().getTime();
			// 더보기를 위한 화면상의 최하단 피드 아이디 전역변수에 세팅
			// moreFeedId = data.feedId;
			reactElement.setState(
					{
	        	    	feedId				: data.feedId
	        	    	,feedTitle			: data.feedTitle
	        	    	,feedType			: data.feedType
	        	    	,newFeedfollower    : data.feedFollowerList
	        	    	,feedContents		: data.feedContents
	        			,cmtCnt				: data.cmtCnt
	        	  		,shareCnt			: data.shareCnt
						,tag				: setTag
	        	  		,likeItCnt			: data.likeItCnt
	        	    	,commentListReal	: commentRealNodes
	        	    	,isFollow			: 'true'
	        		}
			);
				
			if(reactElement.state.clickedMoreReply ==='true') {
				reactElement.getBeforeCommentList();
			}

			//reactElement.rerenderComment();

			$(React.findDOMNode(reactElement.refs.iconFollowId)).hide();
			$(React.findDOMNode(reactElement.refs.txtFollowId)).hide();
			$(React.findDOMNode(reactElement.refs.iconUnfollowId)).show();
			$(React.findDOMNode(reactElement.refs.txtUnfollowId)).show();
			window.focus();
		}
	
		function feedCreateComment(reactElement) {
			
			$("button#addComment" + reactElement.state.feedId).attr("disabled", "disabled");
			
			var notiMsgId = 'notiMsg'+reactElement.state.feedId;
			React.unmountComponentAtNode(document.getElementById(notiMsgId));
			var baseurl = _Feed_FEED_TYPE_COMMENT;
			var followerList = reactElement.state.feedfollower;
			var mainFeedFollowerList = reactElement.props.feedfollower;
			if(followerList !== undefined && followerList.length>0){
				for(var i = 0; i < followerList.length; i++) {
					for(var j=0; j<mainFeedFollowerList.length; j++) {
						try{
	                		if( followerList[i].followerId === mainFeedFollowerList[j].followerId && 
								mainFeedFollowerList[j].followerType === 'MEMBER'
								) {
    	                		followerList.splice(i, 1);
            	        	}
	           	        } catch(e){continue;}
					}
               	}
			
				for(var k = 0; k < followerList.length; k++) {
					if(followerList[k].followerId == _Feed_session_memberId &&
							followerList[k].followerType === 'MEMBER') {
						followerList.splice(k, 1);
					}
               	}
			}

			var memberId = _Feed_session_memberId;
			// 댓글 달때 원피드에 내가 팔로워가 아니고 내가 등록한 글이 아니라면 나를 추가한다.				
			if(reactElement.state.isFollow == 'false' && reactElement.state.regMember.memberId != _Feed_session_memberId) {
				followerMySelf = {"itemId"    	 : '14',
									"itemType"  	 : 'FEED',
									"followerId"     : memberId,
									"followerType"   : 'MEMBER',
									"followerName"   : '',
									"followerEmail"  : '',
									"followerImgUrl" : ''
									}
				followerList.push(followerMySelf);
			}
				
			var fileArr = reactElement.state.files;
			setSharepointFileInfo(fileArr, reactElement.state.feedId, memberId);
	
       		var jsondata = {
						"regMemberId"		: _Feed_session_memberId,
        	    		"feedTitle"			: reactElement.state.feedTitle,
        	    		"contentsType"		: reactElement.state.contentsType,
        	    		"feedContents"		: reactElement.state.feedContents, 
						"pFeedId"			: reactElement.state.pFeedId,
						"pMemberId"			: reactElement.state.pMemberId,	
						"feedTagList"		: reactElement.state.tag,
						"cmtLstSecFeedId"	: reactElement.state.cmtLstSecFeedId,
        	    		"feedFollowerList" 	: followerList,
						"fileList"			: fileArr,
						"fromServer"		: reactElement.props.fromServer == undefined ? '' : reactElement.props.fromServer
        			};

   			ajaxAdd(baseurl, jsondata, reactElement.createCommentResult);
		}
		
		function feedNewCommentShowCallBack(reactElement, data) {
			// 해당 피드의 댓글 리스트 초기화
			var notiMsgId = 'notiMsg'+reactElement.state.feedId;
			React.unmountComponentAtNode(document.getElementById(notiMsgId));
			var self = reactElement;				
			var commentRealNodes = data.commentFeedList.map(
				function (ctl) {
					var key = self.props.fromServer == 'y' ? 'feedIdCo'+ctl.feedId : 'feedId'+ctl.feedId;
					return (
							<CommentFeed key={key}
										 commentData = {ctl} 
										 pFeedData={self.state}
										 isFollow={self.state.isFollow}
										 setting={self.setpMemberId}
										 groupId={self.state.groupId}
										 feedFollow={self.feedFollow}
										 feedUnfollow={self.feedUnfollow}
										 addFeedBookmark={self.addFeedBookmark}
										 removeFeedBookmark={self.removeFeedBookmark}	
										 deleteCommentAct={self.deleteCommentAct}	
										 regFeedKldg={self.regFeedKldg}
										 removeFeedKldg={self.removeFeedKldg}		
										 feedCommentFollowerAndTagSetting={self.feedCommentFollowerAndTagSetting}
							/>
					);
					}
			)	
				
			loadDttm = new Date().getTime();
			var commentNodes = reactElement.state.commentListReal.concat(commentRealNodes);
			if(reactElement.state.commentListReal.length == 0) commentNodes = commentRealNodes;
			reactElement.setState({commentListReal	: commentNodes, cmtCnt : reactElement.state.cmtCnt+data.commentFeedList.length});
		}
		
    	function feedComponentDidMount(reactElement) {
    		reactElement.state.isFollow	= reactElement.props.isFollow;
			var groupInfo = reactElement.props.groupInfo;
			if(groupInfo !== undefined) {
				reactElement.state.isGroupMng = groupInfo.isGroupMng;
			}
			if(reactElement.state.feedType === 'APPROVAL' && reactElement.props.approvalStatus === undefined) {
				//$(React.findDOMNode(reactElement.refs.ogArea)).hide();
				$(React.findDOMNode(reactElement.refs.voteArea)).hide();
				$(React.findDOMNode(reactElement.refs.likeitArea)).hide();
				$(React.findDOMNode(reactElement.refs.ffList)).hide();
				var apprCommentId = 'apprComment_'+reactElement.state.feedId;
				React.render(<ApprovalComment taskId={reactElement.props.taskId} completeAppr={reactElement.completeAppr}  feedId={reactElement.state.feedId}/>,document.getElementById(apprCommentId));
			}

			var isbookmarklist = reactElement.props.isbookmarklist == undefined ? '' : reactElement.props.isbookmarklist;
			reactElement.setState({isbookmarklist : isbookmarklist});
			var sliderId = 'sliderArea'+reactElement.state.feedId;
			
			if($("#"+sliderId).length == 1)
				React.render(<Slider fileList = {reactElement.props.files} feedtype={'feed_'} feedId={reactElement.state.feedId}/>, document.getElementById(sliderId));

			if(reactElement.state.isFollow === 'true') {
				$(React.findDOMNode(reactElement.refs.iconFollowId)).hide();
				$(React.findDOMNode(reactElement.refs.txtFollowId)).hide();
				$(React.findDOMNode(reactElement.refs.iconUnfollowId)).show();
				$(React.findDOMNode(reactElement.refs.txtUnfollowId)).show();
			} else {
				$(React.findDOMNode(reactElement.refs.iconFollowId)).show();
				$(React.findDOMNode(reactElement.refs.txtFollowId)).show();
				$(React.findDOMNode(reactElement.refs.iconUnfollowId)).hide();
				$(React.findDOMNode(reactElement.refs.txtUnfollowId)).hide();
			}	

			var bookmarkList = reactElement.state.bookmark;
			$(React.findDOMNode(reactElement.refs.iconAddBookmarkId)).show();
			$(React.findDOMNode(reactElement.refs.txtAddBookmarkId)).show();
			$(React.findDOMNode(reactElement.refs.iconRemoveBookmarkId)).hide();
			$(React.findDOMNode(reactElement.refs.txtRemoveBookmarkId)).hide();	
				if(bookmarkList !== undefined) {
				for(var i=0; i<bookmarkList.length; i++) {
					if(bookmarkList[i].feedId === reactElement.state.feedId &&
					   bookmarkList[i].memberId == _Feed_session_memberId
					) {
						//reactElement.state.isBookmarkByMe = 'true';
						reactElement.setState({isBookmarkByMe : 'true'});
						$(React.findDOMNode(reactElement.refs.favoriteIconId)).removeClass('icon_favorite2').addClass('icon_favorite');						
						$(React.findDOMNode(reactElement.refs.iconAddBookmarkId)).hide();
						$(React.findDOMNode(reactElement.refs.txtAddBookmarkId)).hide();
						$(React.findDOMNode(reactElement.refs.iconRemoveBookmarkId)).show();
						$(React.findDOMNode(reactElement.refs.txtRemoveBookmarkId)).show();	
					}
				}
			}
			if(reactElement.state.groupId == 0) {
				$(React.findDOMNode(reactElement.refs.iconRegFeedKldgId)).hide();
				$(React.findDOMNode(reactElement.refs.txtRegFeedKldgId)).hide();
				$(React.findDOMNode(reactElement.refs.iconRemoveFeedKldgId)).hide();
				$(React.findDOMNode(reactElement.refs.txtRemoveFeedKldgId)).hide();
					
			} else {
				$('.feed-in-group').hide();
				if((reactElement.state.regFeedKldg == 'false' && reactElement.state.isGroupMng === 1) || (reactElement.state.regFeedKldg == 'false' && isSysAd == 1) ) {
					$(React.findDOMNode(reactElement.refs.iconRegFeedKldgId)).show();
					$(React.findDOMNode(reactElement.refs.txtRegFeedKldgId)).show();
					$(React.findDOMNode(reactElement.refs.iconRemoveFeedKldgId)).hide();
					$(React.findDOMNode(reactElement.refs.txtRemoveFeedKldgId)).hide();
				} else if((reactElement.state.regFeedKldg == 'true' && reactElement.state.isGroupMng === 1) || (reactElement.state.regFeedKldg == 'true' && isSysAd == 1)){
					$(React.findDOMNode(reactElement.refs.iconRegFeedKldgId)).hide();
					$(React.findDOMNode(reactElement.refs.txtRegFeedKldgId)).hide();
					$(React.findDOMNode(reactElement.refs.iconRemoveFeedKldgId)).show();
					$(React.findDOMNode(reactElement.refs.txtRemoveFeedKldgId)).show();
				} else if(reactElement.state.isGroupMng === 0 && isSysAd == 0) {
					$(React.findDOMNode(reactElement.refs.iconRegFeedKldgId)).hide();
					$(React.findDOMNode(reactElement.refs.txtRegFeedKldgId)).hide();
					$(React.findDOMNode(reactElement.refs.iconRemoveFeedKldgId)).hide();
					$(React.findDOMNode(reactElement.refs.txtRemoveFeedKldgId)).hide();
				} else {
					$(React.findDOMNode(reactElement.refs.iconRegFeedKldgId)).hide();
					$(React.findDOMNode(reactElement.refs.txtRegFeedKldgId)).hide();
					$(React.findDOMNode(reactElement.refs.iconRemoveFeedKldgId)).hide();
					$(React.findDOMNode(reactElement.refs.txtRemoveFeedKldgId)).hide();
				}
			}

			//내가 쓴 글이 아니면 삭제 버튼 안보여주기
			if((reactElement.state.regMember.memberId == _Feed_session_memberId) || (isSysAd == 1)){
				if(reactElement.state.feedType == 'POLL') {
					$(React.findDOMNode(reactElement.refs.iconTagEditId)).hide();
					$(React.findDOMNode(reactElement.refs.txtTagEditId)).hide();
					$(React.findDOMNode(reactElement.refs.iconModifyFeedId)).hide();
					$(React.findDOMNode(reactElement.refs.txtModifyFeedId)).hide();
				} else {
					$(React.findDOMNode(reactElement.refs.iconTagEditId)).show();
					$(React.findDOMNode(reactElement.refs.txtTagEditId)).show();
					$(React.findDOMNode(reactElement.refs.iconModifyFeedId)).show();
					$(React.findDOMNode(reactElement.refs.txtModifyFeedId)).show();
				}
				$(React.findDOMNode(reactElement.refs.iconDeleteFeedId)).show();
				$(React.findDOMNode(reactElement.refs.txtDeleteFeedId)).show();
				$(React.findDOMNode(reactElement.refs.iconMakeGroupId)).show();
				$(React.findDOMNode(reactElement.refs.txtMakeGroupId)).show();	
			} else {
				$(React.findDOMNode(reactElement.refs.iconTagEditId)).hide();
				$(React.findDOMNode(reactElement.refs.txtTagEditId)).hide();
				$(React.findDOMNode(reactElement.refs.iconModifyFeedId)).hide();
				$(React.findDOMNode(reactElement.refs.txtModifyFeedId)).hide();
				$(React.findDOMNode(reactElement.refs.iconDeleteFeedId)).hide();
				$(React.findDOMNode(reactElement.refs.txtDeleteFeedId)).hide();
				$(React.findDOMNode(reactElement.refs.iconMakeGroupId)).hide();
				$(React.findDOMNode(reactElement.refs.txtMakeGroupId)).hide();
			}
				
			var duedatePrefix = '';
			var __duedate = reactElement.state.dueDate;
			var __D = '';
			
			//duedatePrefix = _Feed_basic_date + ' : ';
			var dueDate = '';
			var duedateId = 'duedate'+reactElement.state.feedId;
			var duedateAreaId = 'duedateArea'+reactElement.state.feedId;
			if(reactElement.state.dueDate !== undefined && reactElement.state.dueDate.length>0) {
				
				var year  = reactElement.state.dueDate.substring(0,4); 
				var month = reactElement.state.dueDate.substring(4,6);
				var day   = reactElement.state.dueDate.substring(6,8);
				
				__D = new Date(year,month-1,day);
				
				if(reactElement.state.endDate == undefined) {
					if(__D < new Date()) {
						duedatePrefix = _FEED_Feed_MSG_TODOISDELAYTEXT + ' : ';
					} else {
						duedatePrefix = _FEED_Feed_MSG_TOTOISNOWONGOINGTEXT + ' : ';
					}
				} else {
					duedatePrefix = _FEED_Feed_MSG_TODOISCOMPLETEDTEXT + ' : ';
				}
				
				dueDate = duedatePrefix + year + '-' + month + '-'+day+'\r\r';
				
				if($("#" + duedateAreaId).length == 1)
					React.render(<ChangeDueDate option={'mount'} feedId={reactElement.state.feedId} dateText={dueDate}/>, document.getElementById(duedateAreaId));
			}

			if(reactElement.state.regMember.memberId == _Feed_session_memberId || reactElement.state.isFollow == 'true' || (isSysAd == 1)){
				$(React.findDOMNode(reactElement.refs.iconChangFeedDateId)).show();
				$(React.findDOMNode(reactElement.refs.txtChangFeedDateId)).show();
				//dueDate가 있다면...					
				if(reactElement.state.dueDate !== undefined && reactElement.state.dueDate.length>0) {
					//dueDate가 있고 endDate도 있다면 미완료 버튼 보여주기
					if(reactElement.state.endDate !== undefined && reactElement.state.endDate.length>0) {
						$(React.findDOMNode(reactElement.refs.iconFeedCompleteId)).hide();
						$(React.findDOMNode(reactElement.refs.txtFeedCompleteId)).hide();
						$(React.findDOMNode(reactElement.refs.iconFeedIncompleteId)).show();
						$(React.findDOMNode(reactElement.refs.txtFeedIncompleteId)).show();
					} else {
						$(React.findDOMNode(reactElement.refs.iconFeedCompleteId)).show();
						$(React.findDOMNode(reactElement.refs.txtFeedCompleteId)).show();
						$(React.findDOMNode(reactElement.refs.iconFeedIncompleteId)).hide();
						$(React.findDOMNode(reactElement.refs.txtFeedIncompleteId)).hide();
					}
				} else {
					$(React.findDOMNode(reactElement.refs.iconFeedCompleteId)).hide();
					$(React.findDOMNode(reactElement.refs.txtFeedCompleteId)).hide();
					$(React.findDOMNode(reactElement.refs.iconFeedIncompleteId)).hide();
					$(React.findDOMNode(reactElement.refs.txtFeedIncompleteId)).hide();
				}
			} else {
				$(React.findDOMNode(reactElement.refs.iconChangFeedDateId)).hide();
				$(React.findDOMNode(reactElement.refs.txtChangFeedDateId)).hide();
				$(React.findDOMNode(reactElement.refs.iconFeedCompleteId)).hide();
				$(React.findDOMNode(reactElement.refs.txtFeedCompleteId)).hide();
				$(React.findDOMNode(reactElement.refs.iconFeedIncompleteId)).hide();
				$(React.findDOMNode(reactElement.refs.txtFeedIncompleteId)).hide();
			}
			
			var self = reactElement;
			var ogData = reactElement.state.feedContents;
			if(ogData !== undefined && ogData.length>0){
				try {
					var ogJsonData = jQuery.parseJSON(ogData.replace(/\n/g, "<br>"));
					reactElement.OGTrigger(ogJsonData);
				} catch(e){}
			}

			$(React.findDOMNode(reactElement.refs.inputChangFeedDateId)).datepicker({
       			onSelect: function(dateText, inst) {
						self.changFeedDate(dateText.replace('일자', _FEED_Feed_MSG_DUEDATE));
       			},
				changeMonth: true,
       			changeYear: true,
       			beforeShow: function(input, inst) {
            			setTimeout(function () {
           				inst.dpDiv.css({
            	   				top: self.state.offsetTop+30,
            	   				left: self.state.offsetLeft
           				});
       				}, 0);
				}
			});
			
			$(React.findDOMNode(reactElement.refs.inputChangFeedDateId)).datepicker( "option", $.datepicker.regional["ko"] );
			$(React.findDOMNode(reactElement.refs.inputChangFeedDateId)).datepicker( "option", "dateFormat", duedatePrefix +"yy-mm-dd");
			$(React.findDOMNode(reactElement.refs.txtChangFeedDateId)).click(function() {
       			$(React.findDOMNode(self.refs.inputChangFeedDateId)).datepicker("show");
   			});

			var feedLikeItByMeAreaId = 'feedLikeItByMeArea'+reactElement.state.feedId;
			if(reactElement.state.likeItByMe === 1) {
				if($('#' + feedLikeItByMeAreaId).length == 1) {
					React.render(<LikeIt />, document.getElementById(feedLikeItByMeAreaId));
				}
			}

			$(React.findDOMNode(reactElement.refs.timeago)).timeago();
			$("#sns-tooltip").mouseenter(function(){
				self.state.insidePopup = true;
			}).mouseleave(function(){
               	self.state.insidePopup = false;
               	$(this).hide();
            });

			// more / less
			var showChar = 500;
			var ellipsestext = "...";
			var moretext = _FEED_Feed_MSG_MOREFEEDCONTENTSTEXT;
			var lesstext = _FEED_Feed_MSG_LESSFEEDCONTENTSTEXT;

			/////
			var originContent = $(React.findDOMNode(reactElement.refs.substance));
			var contentHtml = $(React.findDOMNode(reactElement.refs.substance)).find('div').html();
			
			if(reactElement.props.feedType != 'POLL') {
				if(contentHtml != undefined) {
					if(contentHtml.length > showChar) {
						var c = contentHtml.substr(0, showChar);
						var h = contentHtml.substr(showChar, contentHtml.length - showChar);
						var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
						$(React.findDOMNode(reactElement.refs.substance)).find('div').html(html);
					}
				}
			}
			
			try {
				$(React.findDOMNode(reactElement.refs.substance)).linky();
			} catch (e) {
				/////
			}
				
			$(React.findDOMNode(reactElement.refs.substance)).find("a.morelink").on('click', function(){
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

			//Lync Presence setting
			//initLyncStatus();
			//reactElement.getLyncStatus();
				
			if(isbookmarklist !== '') {
				$(React.findDOMNode(reactElement.refs.substance)).click(function(){
					if(viewType != 'PERSON') {
						getMemberInfo(_Feed_session_memberId, _Feed_session_memberName, 'fromFavreactElementeAct');
					}
					var feedId = self.state.feedId;
					var baseurl = _Feed_BASE_FEED + '/' + feedId;
					ajaxGet(baseurl, {}, getOneFavoriteFeedDetailResult);
				});
					
				$(React.findDOMNode(reactElement.refs.feed_contents)).parent().css("cursor","pointer");
				
				$(React.findDOMNode(reactElement.refs.feed_contents)).parent().hover(function(){
					$(this).addClass("li-select-hover");
				}, function(){
					$(this).removeClass("li-select-hover");
				});
				
			}

			if(onClickFrom == 'RECENT_ACT' || onClickFrom == 'TODO') {
				window.scroll(0, reactElement.getOffsetTop(document.getElementById('selectTabBySession')));
				onClickFrom = '';
			}
  		}
  		
		function feedChnCallBack(reactElement, data) {
			var self = reactElement;				
			var commentRealNodes = data.commentFeedList.map(
				function (ctl) {
					var key = self.props.fromServer == 'y' ? 'feedIdCo'+ctl.feedId : 'feedId'+ctl.feedId;
					return (
							<CommentFeed key={key}
										 commentData = {ctl} 
										 pFeedData={self.state}
										 isFollow={self.state.isFollow} 
										 setting={self.setpMemberId}
										 groupId={self.state.groupId}
										 feedFollow={self.feedFollow}
										 feedUnfollow={self.feedUnfollow}
										 addFeedBookmark={self.addFeedBookmark}
										 removeFeedBookmark={self.removeFeedBookmark}	
										 deleteCommentAct={self.deleteCommentAct}	
										 regFeedKldg={self.regFeedKldg}
										 removeFeedKldg={self.removeFeedKldg}		
										 feedCommentFollowerAndTagSetting={self.feedCommentFollowerAndTagSetting}
							/>
					);
				}
			)	
			reactElement.setState({commentListReal	: commentRealNodes });
		}
		
		var FanaticElem = React.createClass({
			
			getInitialState : function () {
		        return {likeitlist :[]};
	        },
			
	        componentDidMount : function() {
	        	this.likeitlistRender();
			},
	        
			likeitlistRender : function() {
				var data = this.props.data;
				var likeItNodes = null;
				if(data.length > 0){
					likeItNodes = data.map(
		        		function (likeitdata, index) {
							return (
			               			<li key={index}>
			               				{likeitdata.memberName}&nbsp;
			               				{likeitdata.memberPositionName}&nbsp;
			               				{likeitdata.memberPartName}
			               			</li>
		           			);
		           		}
		        	);
				}
				
				this.setState({likeitlist : likeItNodes});
			},
			
			render: function() {
				return (
					<ul>
						{this.state.likeitlist}
					</ul>
				);
			}
		});
		
		function showFanaticList(feedId, isCmt) {
			
			$('div.fanaticlist').remove();
			
			var clkElem = 
				isCmt === 'cmt' ? $('#cmtfeedlikecnt' + feedId) : $('#feedlikecnt' + feedId)
			, baseurl = _Feed_BASE_LIKEIT + '/' + feedId
			, w = 250, h = 200
			, xPos = clkElem.offset().left
			, yPos = clkElem.offset().top;
			
			if(clkElem.find("strong").text() == '0') return false;
			
			$('<div/>').addClass('fanaticlist').appendTo('body').attr('id', 'fanaticlist' + feedId)
			.css({'width':w + 'px','height':h + 'px'
				,'top':yPos - h ,'left':xPos - w/2 });
			
			ajaxGet(baseurl, {}, function(data){
				React.render(<FanaticElem data={data}/>, document.getElementById('fanaticlist' + feedId));
			
				var realHeight = $("#fanaticlist" + feedId).find("ul").height() + 15;
				var ofval = 'hidden';
				
				if(realHeight > 200) {
					realHeight = 200; ofval = 'scroll';
				}
				
				var realPosY = yPos - realHeight;
				
				$("#fanaticlist" + feedId).css({'height':realHeight 
					,'top': realPosY, 'overflow-y': ofval});
			});
			
			$(document).mouseup(function (e)
			{
			    if (
			    	!clkElem.is(e.target) // if the target of the click isn't the container...
			        && clkElem.has(e.target).length === 0
			        && !$("#fanaticlist" + feedId).find('*').is(e.target)
			        )
			    {
			    	$('div.fanaticlist').remove();
			    	$(document).unbind('mouseup');
			    }
			});
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		