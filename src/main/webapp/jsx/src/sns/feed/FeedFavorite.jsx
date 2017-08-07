	var FeedFavoriteTab = React.createClass({
		
		getInitialState: function() {
        	return {};
        },
		
		componentDidMount: function() {
		
			$(window).off('scroll');
			
			React.unmountComponentAtNode(document.getElementById('selectTabByIntegration'));
			React.unmountComponentAtNode(document.getElementById('selectTabByNoti'));
			//React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
			React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			
			if(document.getElementById('SystemSearchBox')) React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
			
			//$('#selectTabBySession').hide();
		
			// 더보기 관련 데이터 초기화
			curMoreDivId = '';
			divIdNum = 0;
			moreFeedId = 0;
			
			$FAVORITE_WORKING_ON = 'ON';
			
			$('#FavoriteListBack').hide();
			$('.btn_feedfavoritemore').hide();
			
			snsCommLoadingObj({s : 'o'});
			this.getFavoriteFeedList();
			
			var self = this;
			$(window).scroll(function () {
				
				if($FAVORITE_SCROLLING_ONOFF === 'ON') {
					if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
						$('.btn_feedfavoritemore').hide();
						snsCommLoadingObj({s : 'o'});
						self.getFavoriteFeedList();
					}
				}
			});
		},
		
		componentWillMount : function(){
			$FAVORITE_SCROLLING_ONOFF = 'ON';
			$(window).off('scroll');
		},
		
		componentWillUnmount: function() {
			$('#selectTabBySession').show();
			React.unmountComponentAtNode(document.getElementById('favorite_feed_wholebox'));
		},
		getFavoriteFeedList : function(){
			var self = this;
			var element = document.createElement("div");
			divIdNum = parseInt(divIdNum) + 1;
			element.id = 'feedFavoriteLine' + divIdNum;
			curMoreDivId = element.id;
			document.getElementById('favorite_feed_wholebox').appendChild(element);
	
			var jsondata = {'feedId' : moreFeedId, 'memberId' : _FeedFavorite_session_memberId , 'menuType' : 'BOOKMARK' };
			
			ajaxGet(_FeedFavorite_BASE_FEED, jsondata, self.FavoriteFeedRender);
		},
		
		FavoriteFeedRender :function(data){
		
			$('.btn_feedfavoritemore').hide();
			snsCommLoadingObj({s : 'x'});
			
			if( typeof data == "undefined" || data.length == 0) {
				$(window).off('scroll');
				$('#feedFavoriteLine' + divIdNum).html('<div class="last_contents">&nbsp;</div>');
			} else {
				React.render(<FeedFavoriteElemList key={'favorite'} data={data} isbookmarklist={'bm'}/>, document.getElementById(curMoreDivId));
			}
			
			$("div#" + curMoreDivId).find("div.my_opinion").hide();
			$("div#" + curMoreDivId).find("div.noview_reple").hide();
			$("div.reply_contents").hide();
			$("ul.reply-layout").hide();
			
			$(".timeago").timeago();
			
			eventFeedHeight('favorite');
			
		},
		render : function() {
			return (
				<div>
					<ul id="favorite_malgun" className="malgun13" style={{'marginBottom':'20px'}}>
						<li className="tab_on" style={{'color':'#fe630f', 'fontWeight':'bold'}}>{_FEED_FeedFavorite_MSG_TITLE}</li>
					</ul>
					<div id='FavoriteFeedBox'>
						<div>
			    			<div id="feed_noti"></div>
			    			<div id="new_notibox"></div>
			    			<div id="new_loading_line" title={_style_MSG_COMMON_ISLOADEDBEFORETITLE}>
			    				<h2 className="newline-text"><span>{_style_MSG_COMMON_ISLOADEDBEFORE}</span></h2>
			    			</div>
							<div id="favorite_feed_wholebox"></div>
							<div>
								<span onClick={this.getFeedList} className="btn_feedfavoritemore" style={{'marginTop':'50px'}} >{_FEED_FeedFavorite_MSG_MORE}</span>
							</div>
						</div>
					</div>
				</div>
			);
		}
	});
	
	var FeedFavoriteElemList = React.createClass({
			
			getInitialState: function() {
          		return {};
        	},
			
			componentDidMount: function() {
				
			},
			
			render: function() {
				var FeedFavoriteElemNodes;
				var that = this;
				
				if(this.props.data.length > 0){
					FeedFavoriteElemNodes = this.props.data.map(
		        		function (feeddata, index) {
					
							//해당 피드를 등록한 사람의 정보
							var key = 'ff_' + feeddata.feedId;
							var member = feeddata.memberVo;
							//해당 피드에 속한 팔로워 리스트
							var follwers = feeddata.feedFollowerList;
							//해당 피드에 속한 태그 리스트
							var tags = feeddata.feedTagList;
							//해당 피드에 속한 파일 리스트
							var files = feeddata.fileList;
							var bookmarkList = feeddata.bookmarkList;
							
							var followerCnt = feeddata.followerCnt;
							var isFollow = feeddata.isFollowStr;
							var isPublic = feeddata.isPublic;
							
							moreFeedId = feeddata.feedId;
							
							return (
								<Feed 
									key				= {key}
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
									likeItByMe         = {feeddata.likeItByMe}
									feedPollList       = {feeddata.feedPollList}
									resultFeedPollList = {feeddata.resultFeedPollList}
									isbookmarklist	= {that.props.isbookmarklist}
									bookmark		= {bookmarkList}
									isFollow		   	= {isFollow}
									isPublic			= {isPublic}
									followerCnt		   	= {followerCnt}
								/>
							);
						
		           		}
		        	);
				}
	        	return (<div>{FeedFavoriteElemNodes}</div>);
			}
		});
