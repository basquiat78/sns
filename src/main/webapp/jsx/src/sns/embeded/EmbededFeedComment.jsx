//통합 페이지 Container
	var Container = React.createClass({

		componentDidMount: function() {
			var baseurl = contextpath + _EmbededFeedComment_frfEmbedType1_BASE_FEED + '/' + _EmbededFeedComment_request_feedId;
			console.log(baseurl);
			snsCommLoadingObj({s : 'o'});
			var jsondata = {};	
			ajaxGet(baseurl, jsondata, this.getFeedDetailResult);
		},

		getFeedDetailResult: function(feeddata){
			
			snsCommLoadingObj({s : 'x'});
			//해당 피드를 등록한 사람의 정보
			var member = feeddata.memberVo;
			//해당 피드에 속한 팔로워 리스트
			var follwers = feeddata.feedFollowerList;
			//해당 피드에 속한 태그 리스트
			var tags = feeddata.feedTagList;
			//해당 피드에 속한 파일 리스트
			var files = feeddata.fileList;
			// 해당 피드에 대해서 나 자신의 팔로워 여부 (0, 1)
			var isFollow = feeddata.isFollowStr;
	
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
					fromServer		= {'y'}
					isFollow		= {isFollow}
				/>
				, document.getElementById('feed_wholebox')
			);

			$(".feed_contents div:first").show();
			
			if(_isFocusOnInput === 'on') {
				$("textarea#commentInput" + feeddata.feedId).click().focus();
			}
			
		},

		render: function() {
	    	return (
				<div className='lay-container-wrap' style={{'height':'1046px'}} id='feed_wholebox'>
				</div>
			);
		}
	});
	
//통합 페이지 상당
	var HomeSNS = React.createClass({
		render: function() {
	    	return (
				<div className='lay-wrap'>
					<Container/>
				</div>
			);
		}
	});
	
	React.render(<HomeSNS/>, document.getElementById('WholeScreen'));