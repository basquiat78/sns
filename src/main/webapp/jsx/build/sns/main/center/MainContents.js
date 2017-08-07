		
		var MainContents = React.createClass({displayName: "MainContents",
			componentDidMount: function() {
				this.goIntegrationPop();

				// 공지사항
				//React.render(<FeedNotice/>, document.getElementById('feed_notice'));

				if(this.props.mainType =='main') {
					// 개인, 그룹 정보 나오는 창
					React.render(React.createElement(MemberHead, {memberId: _MainContents_targetMemberId}), document.getElementById('head_contents'));
							
					// 피드 입력창
					React.render(React.createElement(FeedApp, null), document.getElementById('mainContentsArea'));
		
					// 멤버 탭 영역
					if(_MainContents_session_memberId == _MainContents_targetMemberId){
						React.render(React.createElement(MemberTabList, {memberId: _MainContents_session_memberId, detailFeedId: this.props.detailFeedId}),  document.getElementById('selectTabBySession'));
					}else{
						React.render(React.createElement(OtherMemberTabList, {memberId: _MainContents_targetMemberId}),  document.getElementById('selectTabBySession'));
					}
				} else if(this.props.mainType =='group') {
					React.render(React.createElement(GroupHead, {groupId: this.props.groupInfo.groupId}), document.getElementById('head_contents'));
					// 가운데 컨텐츠 상단 부분(그룹 정보)
					React.render(React.createElement(FeedApp, {groupInfo: this.props.groupInfo}), document.getElementById('mainContentsArea'));

					React.render(React.createElement(GroupTabList, {groupId: this.props.groupInfo.groupId}),  document.getElementById('selectTabBySession'));
				} else {
					
					$('#MemberFeedBox').remove();
					$('#selectTabBySession').append($('<div/>').attr('id', 'MemberFeedBox'));
					goTotalNotiList('', {g : 0});
				}
				
				if (gSMainType == "totalNoti") {
					//goTotalNotiList('', {g : 0});
				}
			},

			componentWillUnmount: function() {
				React.unmountComponentAtNode(document.getElementById('feed_notice'));
				React.unmountComponentAtNode(document.getElementById('head_contents'));
				React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
				React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			},
			
			integrationSearch: function(){
//				React.unmountComponentAtNode(document.getElementById('IntegrationTabPopup'));
//				openIntegrationPop();
//				React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
//				React.render(<IntegrationTab/>, document.getElementById('selectTabBySession'));
				
				if($.trim($("#pItgSch").val()) == '') {
					MsgPopup(_MainContents_MSG_SEARCHINPUTFIELDISEMPTYMSG);
					return false;
				}
				
				openIntegrationBody();
				$("#itgBack").hide();
			},

			goIntegrationPop: function(){
				$("#pItgSch").on('keydown', this.handleKeyDown);
			},
			
			goItgBack: function(){
				$("#loadingSpan").hide();
				var keeword = $("#pItgSchHid").val();
				$("#pItgSch").val(keeword);
				$("#itgBack").hide();
				$("#pItgSchHid").val(keeword);
//				this.integrationSearch();
				
				$("#feedGate").hide();
				$("#selectTabBySession").hide();
				$("#selectTabByNoti").hide();
				$("#selectTabByIntegration").show();
				
				
				var itgTabId = "itg" + gTab.substring(0, 1).toUpperCase() + gTab.substring(1);
				if ($("#" + itgTabId).hasClass("tab_on") == false ) {
					$("#" + itgTabId).addClass("tab_on");
				}
				
			},
			
			goTotalNotiBack: function(){
				goTotalNotiList("Y", {g : 0});
				//setTimeout(function() { goTotalNotiList("Y"); }, 1000)
			},
			
			goFavoriteListBack : function(){
				
				$('#feedGate').hide();
				$('#selectTabBySession').hide();
				$('#FavoriteListBack').hide();
				
				$FAVORITE_SCROLLING_ONOFF = 'ON';
				
				$('#selectTabByFavorite').show('fast', function(){
					
					$('html, body').animate({ scrollTop : $('input#myCurrentFavoriteIdInputHidden').val() }, 'fast');
					
				});
			
			},
			
			handleKeyDown: function(e) {
	            if( e.keyCode == 13 ) {
					 this.integrationSearch();
	            }

	        },
			componentWillUnMount: function() {
	            $("#pItgSch").off('keydown', this.handleKeyDown);
	        },
			
			render: function() {
				// 검색 입력 창
				return (
					React.createElement("div", {className: "feed_wrap"}, 
						React.createElement("dl", {className: "home_feed_gate"}, 
    						React.createElement("dt", null, _memberCompanyName), 
        					React.createElement("dd", {className: "find_box"}, 
        						React.createElement("ul", null, 
        							React.createElement("li", {id: "itgBack", style: {'display':'none'}, onClick: this.goItgBack}, React.createElement("button", {className: "btn-m btn-attention"}, "back")), 
        							React.createElement("li", {id: "toTalNotiBack", style: {'display':'none'}, onClick: this.goTotalNotiBack}, React.createElement("button", {className: "btn-m btn-attention"}, "back")), 
            						React.createElement("li", {id: "FavoriteListBack", style: {'display':'none'}, onClick: this.goFavoriteListBack}, 
            							React.createElement("input", {type: "hidden", id: "myCurrentTodoIdInputHidden"}), 
            							React.createElement("input", {type: "hidden", id: "myCurrentFavoriteIdInputHidden"}), 
            							React.createElement("button", {className: "btn-m btn-attention"}, "back")
            						), 
            						React.createElement("li", null, React.createElement("input", {id: "pItgSch", name: "pItgSch", type: "text", placeholder: "Find", style: {'borderRight':'0'}})), 
                					React.createElement("li", {className: "btn_find", onClick: this.integrationSearch})
            					)
        					)
    					), 
						
						React.createElement("div", {id: "feed_notice"}), 
						
						React.createElement("div", {id: "feedGate", className: "feed_gate"}, 
							React.createElement("div", {id: "head_contents", style: {'overflow':'hidden','height':'90px'}}), 
							React.createElement("div", {id: "mainContentsArea"})
						), 
						
						React.createElement("div", {className: "search_tabstyle", id: "selectTabBySession", style: {'marginBottom':'10px'}}), 
						React.createElement("div", {className: "search_tabstyle", id: "selectTabByFavorite", style: {'display':'none'}}), 
						React.createElement("div", {className: "search_tabstyle", id: "selectTabByIntegration", style: {'display':'none'}}), 
						React.createElement("div", {className: "search_tabstyle", id: "selectTabBySystem", style: {'display':'none', 'borderBottom': 'none'}}), 
						React.createElement("div", {className: "search_tabstyle", id: "selectTabByNoti", style: {'display':'none'}})
						
					)
				);
			}
		});
		
		function goTotalNotiList(aldShowYn, o) {
			$(".hhsc-connector-menu-layer").hide();
			$elm = $(".hhsc-connector-menu-box.hhsc-connector-social");
			if ($elm.hasClass("hhsc-active") == true) {	// menu slide down
				$elm.removeClass('hhsc-active');
				document.body.style.overflow = "visible";
				$("html").css("overflow-y","scroll");
				$(this).removeClass('hhsc-active');
				$(this).find('.hhsc-connector-menu-layer').slideUp();
				if($(this).hasClass('hhsc-connector-social')) $(this).find("ul.hhsc-sociallist").html("");
			}
			
			aldShowYn = (aldShowYn == undefined || 0) ? "N" : aldShowYn;
			$("#selectTabByNoti").show();
			$("#selectTabBySession").hide();
			$("#selectTabByIntegration").hide();
			$("#selectTabBySystem").hide();
			$('#selectTabByFavorite').hide();
			$("#feedGate").hide();
			$("#toTalNotiBack").hide();
			$("#FavoriteListBack").hide();
			
			$FAVORITE_WORKING_ON = 'OFF';
			$TODO_SIMPLE_WORKING_ON = 'OFF';
			$TOTALNOTI_SCROLLING_ONOFF = 'ON';
			
			$(window).off('scroll');
			
			var selectTabByNotiHtmlStr = $.trim($("#selectTabByNoti").html());
			
			React.unmountComponentAtNode(document.getElementById('selectTabByFavorite'));
			React.unmountComponentAtNode(document.getElementById('selectTabByIntegration'));
			if($('#SystemSearchBox').length == 1)
				React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
			
			React.unmountComponentAtNode(document.getElementById('selectTabByNoti'));
			React.render(React.createElement(TotalNotiTab, {g: o.g}), document.getElementById('selectTabByNoti'));
			$("#totalNotiLi").addClass("tab_on");
			
			if ($("#todoCalendarFeedHeader").length) React.unmountComponentAtNode(document.getElementById('todoCalendarFeedHeader'));
			
			uninstall('totalNoti');

		}
		
		function openMainBody(callType){
//			React.unmountComponentAtNode(document.getElementById('WholeScreen'));
//			React.render(<HomeSNS mainType={'main'}/>, document.getElementById('WholeScreen'));
			callType = callType == undefined ? "" : callType;
			if (callType.toUpperCase() == "ITG") {
				$("#itgBack").show();
				$("#feedGate").hide();
			} else if(callType.toUpperCase() == "TN") { // 전체알림
				$("#itgBack").hide();
				$("#toTalNotiBack").hide();
				$('div#selectTabBySession ul.malgun13').hide();
				$("#pItgSch").val("");	
			} else {
				$("#itgBack").hide();
				$("#toTalNotiBack").hide();
				$("#feedGate").show();
				$("#pItgSch").val("");
				$('div#selectTabBySession ul.malgun13').show();
			}
			$("#toTalNotiBack").hide();
			$("#selectTabBySession").show();
			$("#selectTabByNoti").hide();
			$("#selectTabByIntegration").hide();
			$('#FavoriteListBack').hide();
			$('#todoFeedBackBtn').remove();
			$("#selectTabBySystem").hide();
			$('#selectTabByFavorite').hide();
			
			$FAVORITE_WORKING_ON = 'OFF';
			$TODO_SIMPLE_WORKING_ON = 'OFF';
			React.unmountComponentAtNode(document.getElementById('selectTabByFavorite'));
			
			$('.img_feedmore').hide(0);
			
		}
		
		function openIntegrationBody(txt){
			if(txt != undefined && txt != null) {
				$("#pItgSch").val(txt);
			}
			$("#feedGate").hide();
			$("#selectTabBySession").hide();
			$("#selectTabByNoti").hide();
			$('#FavoriteListBack').hide();
			$('#todoFeedBackBtn').remove();
			$("#selectTabByIntegration").show();
			$("#selectTabBySystem").hide();
			$('#selectTabByFavorite').hide();
			$("#toTalNotiBack").hide();
			
			$FAVORITE_WORKING_ON = 'OFF';
			$TODO_SIMPLE_WORKING_ON = 'OFF';
			
			React.unmountComponentAtNode(document.getElementById('selectTabByIntegration'));
			React.render(React.createElement(IntegrationTab, null), document.getElementById('selectTabByIntegration'));
			
		}
		
		function uninstall(param) {
			
			$("#totalTab, #knwldgTab, #personalTab, #todoTab, #fileTab, #approvalTab, #boardTab, #moreTab").click(function(){
				$("#toTalNotiBack").hide();
			});
			
			if(param != undefined) {
				if(param == 'sysmgr') // 시스템 관리자 클릭 시
					$("#toTalNotiBack").hide();
				
				if(param == 'totalNoti') { // 전체알림 보여줄때
					//React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
					$('#selectTabBySession').hide();
					$("#toTalNotiBack").hide();
					
				}
			}
			
		}
		
		var snsCommLoadingFeed = function(feeddata, target) {
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
			
			React.render(
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
				, document.getElementById(target)
			);
		};
		
