		var SendMessagePop = React.createClass({

			sendMessageClosePopup: function(){
				React.unmountComponentAtNode(document.getElementById('sendMessage'));
				if(sendMessagePopup != null) sendMessagePopup.close();
			},

			componentDidMount: function() {
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
		
				React.render(
					<Feed 
						feedTitle		= {feeddata.feedTitle} 
						feedId			= {feeddata.feedId} 
						feedType		= {feeddata.feedType}
						regMember       = {member}
						feedfollower	= {follwers}
						tag				= {tags} 
						dueDate			= {feeddata.dueDate} 
						endDate			= {feeddata.endDate}
						regDttm			= {feeddata.regDttm}  
						files           = {files}
						feedContents	= {feeddata.feedContents}
						cmtLstSecFeedId	= {feeddata.cmtLstSecFeedId} 
						commentFeedList	= {feeddata.commentFeedList} 
						cmtCnt			= {feeddata.cmtCnt} 
						shareCnt		= {feeddata.shareCnt} 
						likeItCnt		= {feeddata.likeItCnt} 
					/>
					, document.getElementById('feed_wholebox')
				);
			},

			render: function() {
				var message  = '';
				console.log(this.props.targetFollower);
				if(this.props.targetFollower.followerId == _MessageFeed_session_memberId) {
					message = _FEED_MessageFeed_MSG_WRITEFEEDTEXT;
				} else {
					message = this.props.targetFollower.followerName + ' ' +  this.props.targetFollower.followerMappingInfo[0].positionName + _FEED_MessageFeed_MSG_WRITEFEEDFORWHOMMSG;
				}

	        	return (
						<div>

							<h3>{message}<span className='btn_close'><img src='../images/btn_close.png' width='13' height='13' onClick={this.sendMessageClosePopup}/></span></h3>
       						<div className='share_area_wrap'>
								<FeedApp/>
			       			</div>

						</div>
	           	);
			}
		});