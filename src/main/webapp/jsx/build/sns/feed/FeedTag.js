	var FeedTagTab = React.createClass({displayName: "FeedTagTab",
	
		componentDidMount: function() {
		
			$(window).off('scroll');
		
			// 더보기 관련 데이터 초기화
			curMoreDivId = '';
			divIdNum = 0;
			moreFeedId = 0;
			
			$TAG_WORKING_ON = 'ON';
			
			$('.btn_feedtagmore').hide();
			snsCommLoadingObj({s : 'o'});
			this.getFeedTagList();
			
			var self = this;
			$(window).scroll(function () {
				
				if($TAG_SCROLLING_ONOFF === 'ON') {
					if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
						$('.btn_feedtagmore').hide();
						snsCommLoadingObj({s : 'o'});
						self.getFeedTagList();
					}
				}
				
				
			});
		},
		
		componentWillMount : function(){
			$TAG_SCROLLING_ONOFF = 'ON';
			$(window).off('scroll');
		},
		
		componentWillUnmount: function() {
			React.unmountComponentAtNode(document.getElementById('tag_feed_wholebox'));
		},
		
		getFeedTagList : function(){
		
			var self = this;
			var element = document.createElement("div");
			divIdNum = parseInt(divIdNum) + 1;
			element.id = 'feedLine' + divIdNum;
			curMoreDivId = element.id;
			document.getElementById('tag_feed_wholebox').appendChild(element);
	
			var jsondata = {'feedId' : moreFeedId, 'memberId' : _FeedTag_session_memberId, 'tagName': this.props.tagName, 'menuType' : 'HASHTAG' };
			
			ajaxGet(_FeedTag_BASE_FEED, jsondata, self.feedTagRender);
		},
		
		feedTagRender :function(data){
		
			$('.btn_feedtagmore').hide();
			snsCommLoadingObj({s : 'x'});
			
			if( typeof data == "undefined" || data.length == 0) {
				$(window).off('scroll');
				
				if(divIdNum == 1) {
					$('#feedLine' + divIdNum).html('<div style="text-align:center;">'+ _FeedTag_MSG_NOFEEDHEREMSG +'</div>');
				} else {
					$('#feedLine' + divIdNum).html('<div class="last_contents">&nbsp;</div>');
				}
				
			} else {
				React.render(React.createElement(FeedTagElemList, {key: 'tag', data: data}), document.getElementById(curMoreDivId));
			}
			
			eventFeedHeight('hashtaglist');
			
		},
		
		render : function() {
			return (
				React.createElement("div", null, 
					React.createElement("ul", {id: "tag_malgun", className: "malgun13", style: {'marginBottom':'20px'}}, 
						React.createElement("li", {className: "tab_on", style: {'color':'#fe630f', 'fontWeight':'bold'}}, _FeedTag_MSG_FEEDTAGTITLE)
					), 
					React.createElement("div", {id: "FeedTagBox"}, 
						React.createElement("div", null, 
			    			React.createElement("div", {id: "feed_noti"}), 
			    			React.createElement("div", {id: "new_notibox"}), 
			    			React.createElement("div", {id: "new_loading_line", title: _style_MSG_COMMON_ISLOADEDBEFORETITLE}, 
			    				React.createElement("h2", {className: "newline-text"}, React.createElement("span", null, _style_MSG_COMMON_ISLOADEDBEFORE))
			    			), 
							React.createElement("div", {id: "tag_feed_wholebox"}), 
							React.createElement("span", {onClick: this.feedTagRender, className: "btn_feedtagmore", style: {'marginTop':'50px'}}), 
							React.createElement("span", {className: "img_feedtagmore", style: {'marginTop':'50px'}})
						)
					)
				)
			);
		}
	});
	
	var FeedTagElemList = React.createClass({displayName: "FeedTagElemList",
			
			componentDidMount: function() {
				
			},
			
			render: function() {
				var FeedTagElemNodes;
				var that = this;
				
				if(this.props.data.length > 0){
					FeedTagElemNodes = this.props.data.map(
		        		function (feeddata, index) {
					
		        			//해당 피드를 등록한 사람의 정보
		        			var member = feeddata.memberVo;
		        			//해당 피드에 속한 팔로워 리스트
		        			var followers = feeddata.feedFollowerList;
		        			//해당 피드에 속한 태그 리스트
		        			var tags = feeddata.feedTagList;
		        			//해당 피드에 속한 파일 리스트
		        			var files = feeddata.fileList;
		        			var bookmark = feeddata.bookmarkList;
		        			var feedPollList = feeddata.feedPollList;
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
		        			
		        			var groupId = 0;
		        			var groupName = '';
		        			var groupInfo = {};
		        			for(var fidx in followers) {
		        				var follower = followers[fidx];
		        				if(follower.followerType == 'GROUP') {
		        					groupId = follower.followerId;
		        					groupName = follower.followerName;
		        					groupInfo = follower;
		        					break;
		        				}
		        			}
		        			
		        			moreFeedId = feeddata.feedId;
		        			
		        			return (
		        				React.createElement(Feed, {
		        					feedTitle: feeddata.feedTitle, 
		        					feedId: feeddata.feedId, 
		        					feedType: feeddata.feedType, 
		        					regMember: member, 
		        					feedfollower: followers, 
		        					bookmark: bookmark, 
		        					tag: tags, 
		        					dueDate: feeddata.dueDate, 
		        					endDate: feeddata.endDate, 
		        					regDttm: feeddata.regDttm, 
		        					files: files, 
		        					approvalStatus: feeddata.approvalStatus, 
		        					feedContents: feeddata.feedContents, 
		        					cmtLstSecFeedId: feeddata.cmtLstSecFeedId, 
		        					commentFeedList: feeddata.commentFeedList, 
		        					cmtCnt: feeddata.cmtCnt, 
		        					shareCnt: feeddata.shareCnt, 
		        					likeItCnt: feeddata.likeItCnt, 
		        					likeItByMe: feeddata.likeItByMe, 	
		        					feedPollList: feeddata.feedPollList, 
		        					resultFeedPollList: feeddata.resultFeedPollList, 
		        					kldgVo: kldgVo, 
		        					taskId: taskId, 
		        					followerCnt: followerCnt, 
		        					isFollow: isFollow, 
		           					isPublic: isPublic, 
		        					groupId: groupId, 
		        					groupInfo: groupInfo}
		        				)
		        			);
		        			
		           		}
		        	);
				}
	        	return (React.createElement("div", null, FeedTagElemNodes));
	
			}
		});

			// 해쉬태그 관련 클릭시 피드 보여주기
		function findFeedTag(tagName, option) {
			
			if(viewType == 'FAVORITE') {
				if(option !== undefined && option == 'go') {
				} else {
					return false;
				}
			}
			
			viewType='TAG';
			openIntegrationBody();
			
			$('.btn_feedfavoritemore').hide();
			$('.img_feedfavoritemore').hide();
			$("#feedGate").hide();
			$('#selectTabBySystem').hide();
			$("#selectTabByNoti").hide();
			$("#selectTabByIntegration").hide();
			$("#selectTabByFavorite").hide();
			
			$TAG_WORKING_ON = 'ON';
			$TAG_SCROLLING_ONOFF === 'ON'
			
			$("#selectTabBySession").show();
			React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			React.render(React.createElement(FeedTagTab, {tagName: tagName}), document.getElementById('selectTabBySession'));
		}