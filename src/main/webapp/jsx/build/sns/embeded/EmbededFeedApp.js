//통합 페이지 Container
	var Container = React.createClass({displayName: "Container",

		onInit : function() {
			$("#WholeScreen").css("width", ($( window ).width() - 20) + "px");
		},

		SetCaretAtEnd : function(elem) {
			var elemLen = elem.value.length;
	        // IE 일 경우
	        if (document.selection) {
	            // 포커스설정
	            elem.focus();
	            // IE 범위 사용
	            var oSel = document.selection.createRange();
	            // 포지션을 0으로 리셋 & 마지막에 셋팅
	            oSel.moveStart('character', -elemLen);
	            oSel.moveStart('character', elemLen);
	            oSel.moveEnd('character', 0);
	            oSel.select();
	        }
	        else if (elem.selectionStart || elem.selectionStart == '0') {
	            // 크롬이나 파이어폭스의 경우
	            elem.selectionStart = elemLen;
	            elem.selectionEnd = elemLen;
	            elem.focus();
	        }
		},

		componentDidMount: function() {
			var feedTitleFromServer = _EmbededFeedApp_feedtitle;
			var groupId = _EmbededFeedApp_groupId;
			var windowTitle = _EmbededFeedApp_windowTitle;
			var groupInfo = undefined;
			var that = this;
			
			if(groupId != '') {
				ajaxGet(contextpath + _EmbededFeedApp_grfGroup_BASE_GROUP + '/' + _EmbededFeedApp_groupId , {}, function(data){
					groupInfo = data;
					React.render(React.createElement(FeedApp, {groupInfo: groupInfo, feedTitle: feedTitleFromServer, fromServer: 'Y'}), document.getElementById('feed_wholebox'));
					
					$("textarea#feedContentsInput").focus().typetype('  '
						, { callback: function() {
							
							$("textarea#feedContentsInput").val(feedTitleFromServer).trigger('keyup');
							$("textarea#feedContentsInput").val(feedTitleFromServer).trigger('change');
							
							that.SetCaretAtEnd(document.getElementById('feedContentsInput'));
						} })
					.delay(150);
				});
			} else {
				React.render(React.createElement(FeedApp, {feedTitle: feedTitleFromServer, fromServer: 'Y'}), document.getElementById('feed_wholebox'));
				
				$("textarea#feedContentsInput").val(feedTitleFromServer).trigger('keyup');
				$("textarea#feedContentsInput").val(feedTitleFromServer).trigger('change');

				that.SetCaretAtEnd(document.getElementById('feedContentsInput'));
			}

			$('div.pop-modalwindow-title').html(windowTitle);

		},

		render: function() {
	    	return (
				React.createElement("div", {className: "lay-container-wrap", style: {'height':'1046px'}, id: "feed_wholebox"})
			);
		}
	});
	
//통합 페이지 상당
	var HomeSNS = React.createClass({displayName: "HomeSNS",
		render: function() {
	    	return (
				React.createElement("div", {className: "lay-wrap"}, 
					React.createElement(Container, null)
				)
			);
		}
	});
	
	React.render(React.createElement(HomeSNS, null), document.getElementById('WholeScreen'));