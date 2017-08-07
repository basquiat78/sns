//통합 페이지 Container
	var Container = React.createClass({

		onInit : function() {
			$("#WholeScreen").css("width", ($( window ).width() - 20) + "px");
		},

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

					if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
			
						$('.btn_feedgroupmore').hide();
						snsCommLoadingObj({s : 'o'});
						self.getFeedList();
					}
			});
		},

		componentWillUnmount: function() {
			$(window).off('scroll');
			React.unmountComponentAtNode(document.getElementById('feed_wholegroupbox'));
		},

		getFeedList : function(){
			var element = document.createElement("div");
			divIdNum = parseInt(divIdNum) + 1;
			element.id = 'feedGroupLine' + divIdNum;
			curMoreDivId = element.id;
			document.getElementById('feed_wholegroupbox').appendChild(element);
	
			var jsondata = {'feedId' : moreFeedId, 'memberId' : _EmbededMain_targetMemberId , 'menuType' : 'MEMBER' };	
			ajaxGet(contextpath + _EmbededMain_frfEmbedType1_BASE_FEED , jsondata, this.feedRender);
		},

		feedRender:function(data){
			$('.btn_feedgroupmore').hide();
			snsCommLoadingObj({s : 'x'});
			
			if( typeof data == "undefined" || data.length == 0) {
				$(window).off('scroll');
			}
	
			React.render(<FeedList data={data} />, document.getElementById(curMoreDivId));
		},

		render: function() {
			return (
				<div className='lay-container-wrap' id='GroupFeedBox'>
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
					<Container/>
				</div>
			);
		}
	});
	
	React.render(<HomeSNS/>, document.getElementById('WholeScreen'));