//통합 페이지 Container
	var Container = React.createClass({

		componentDidMount: function() {
			// 더보기 관련 데이터 초기화
			curMoreDivId = '';
			divIdNum = 0;
			moreFeedId = 0;
			$('.btn_feedgroupmore').hide();
			snsCommLoadingObj({s : 'o'});
			this.getFeedList();
			
			var self = this;
			$(window).scroll(function () {
			// 피드영역의 높이
				if($(document).height()-50 <= $(window).scrollTop() + $(window).height()) {
			
					$('.btn_feedgroupmore').hide();
					snsCommLoadingObj({s : 'o'});
					self.getFeedList();
				}
			});
		},
		componentWillUnmount: function() {
			$(window).off('scroll');
			React.unmountComponentAtNode(document.getElementById('groupfeed_writebox'));
			React.unmountComponentAtNode(document.getElementById('feed_wholegroupbox'));
		},
		
		setGroupInfoSetting: function(data) {
			var groupInfo = {"groupName": data.groupName, "groupId": this.props.groupId};
			React.render(<FeedApp embededFrom={'GROUP'} groupInfo={groupInfo}/>, document.getElementById('groupfeed_writebox'));
		},
		
		getFeedList : function(){

			var b = ajaxGet(contextpath + _EmbededGroup_grfGTL_BASE_GROUP+"/"+this.props.groupId, '', this.setGroupInfoSetting);
			
			if(!b) {
				//return;
			}
		
			var element = document.createElement("div");
			divIdNum = parseInt(divIdNum) + 1;
			element.id = 'feedGroupLine' + divIdNum;
			curMoreDivId = element.id;
			document.getElementById('feed_wholegroupbox').appendChild(element);
	
			var jsondata = {'feedId' : moreFeedId, 'memberId' : _EmbededGroup_targetMemberId , 'menuType' : 'GROUP', 'groupId' : _EmbededGroup_groupId };	
			ajaxGet(contextpath + _EmbededGroup_grfGTL_BASE_GROUP_FEED , jsondata, this.feedRender);
		},
		
		feedRender:function(data){
			$('.btn_feedgroupmore').hide();
			snsCommLoadingObj({s : 'x'});
			
			if( data === undefined || data == null || data.length == 0) {
				$(window).off('scroll');
				$('#feedGroupLine' + divIdNum).html('<div class="last_contents">&nbsp;</div>');
			} else {
				React.render(<FeedList data={data} groupId={this.props.groupId} />, document.getElementById(curMoreDivId));
			}
			
		},
		
		render : function() {
			return (
				<div className='lay-container-wrap' id='GroupFeedBox'>
					<div id="groupfeed_writebox"></div>
					<div id="feed_wholegroupbox"></div>
					<span onClick={this.getFeedList} className="btn_feedgroupmore" style={{'marginTop':'50px'}} >더보기</span>
				</div>	
			);
		}
	});
	
//통합 페이지 상당
	var HomeSNS = React.createClass({
		render: function() {
	    	return (
				<div className='lay-wrap'>
					<Container groupId={_EmbededGroup_groupId} />
				</div>
			);
		}
	});
	
	React.render(<HomeSNS/>, document.getElementById('WholeScreen'));