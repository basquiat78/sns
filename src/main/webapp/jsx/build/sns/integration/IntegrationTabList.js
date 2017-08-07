		var gTab = "";
		var gIsGroupYn = "N";
		var gIsInitTab = false;
		var gItgTab = "";
		
		var TotalSearchResultEmpty = React.createClass({displayName: "TotalSearchResultEmpty",
			render : function() {
				return (
						React.createElement("div", {style: {'textAlign':'center'}}, 
							_IntegrationTabList_MSG_TOTALSEARCHRESULTISEMPTY
						)
				)
			}
		});
		
		function renderTotalSearchResultEmpty() {
			$('#totalsearchisfallen').remove();
			var element = document.createElement("div");
			element.id = 'totalsearchisfallen';
			$("#IntegrationTabList").parent().after(element);
			if(document.getElementById('totalsearchisfallen'))
				React.render(React.createElement(TotalSearchResultEmpty, null), document.getElementById('totalsearchisfallen'));
		}
		
		var IntegrationTab  = React.createClass({displayName: "IntegrationTab",
			componentDidMount: function() {
				
				snsCommLoadingObj({s : 'o'});
				
				var itgTabMode = this.props.itgTabMode;
				if (itgTabMode == undefined) {
					if (gTab == "") {
						gTab = "feed";
					}
				} else {
					gTab = itgTabMode;
				}
				gIsGroupYn = ($("#mainHeadInfo").val() != undefined && $("#mainHeadInfo").val().toUpperCase() == "GROUP") ? "Y" : "N";
				
				gItgTab = this;
				gIsInitTab = true;
				
				$('.btn_feedmore').hide();
				$(window).off('scroll');
				
				React.unmountComponentAtNode(document.getElementById('selectTabByFavorite'));
				React.unmountComponentAtNode(document.getElementById('selectTabByNoti'));
				
				$('#selectTabBySession').hide();
				
				if ( $("#MemberFeedBox").length ) {
					React.unmountComponentAtNode(document.getElementById('MemberFeedBox'));	
				}

				this.goTabList();
			},

			handleKeyDown: function(e) {
	            if( e.keyCode == 13 ) {
					this.goTabList();
	            }

	        },

			goTabList: function(){
				var dataArr = [];
				React.unmountComponentAtNode(document.getElementById('IntegrationTabList'));
				React.render(React.createElement(IntegrationSearchResult, {dataArr: dataArr}), document.getElementById("IntegrationTabList"));
				var paramVar = null;
				var keeword = $("#pItgSch").val();
				if (gIsInitTab == true) {
					keeword = $("#pItgSch").val();
					gIsInitTab = false;
				}

				if (keeword != "") {
					$("#keywordSpan").html(_IntegrationTabList_MSG_SEARCHRESULTTEXT1 + " <span>‘" + keeword + "’</span>" + _IntegrationTabList_MSG_SEARCHRESULTTEXT2);
					$("#pItgSchHid").val(keeword);
				}
				
				if (gIsGroupYn == "Y") {
					paramVar = { "userid": _IntegrationTabList_userId, "keyword":keeword , "category": "group", "type" : gTab, "groupid" : $('#currGroupInfo').val() };
				} else {
					paramVar = { "userid": _IntegrationTabList_userId, "keyword":keeword , "category": "person", "type" : gTab };
				}
				
				if(gTab == 'feed' || gTab == 'tag') {
					ajaxGet(contextpath + _IntegrationTabList_openAPIRestUrl_SHAREPOINT_IF_ITG_SCH , paramVar, this.getTabList);
				} else {
					ajaxAdd(contextpath + _IntegrationTabList_openAPIRestUrl_SHAREPOINT_IF_ITG_SCH , paramVar, this.getTabList);
				}
			},

			getTabList: function(dataList){
				
				snsCommLoadingObj({s : 'o'});
				
					var dataArr = [];
					if (dataList.length == 0) {
						dataArr.push(React.createElement(IntegrationEmptyResultList, {key: 'empty'}));
						renderTotalSearchResultEmpty();
					} else {
						$('#totalsearchisfallen').remove();
						var key = null;
						switch (gTab){
						  case "feed":
							$.each(dataList, function(idx, dataRow) {
								key = gTab + idx;
						  		dataArr.push(React.createElement(IntegrationFeedResultList, {key: key, dataRow: dataRow}));
							});
						    break;
						  case "user":
						  		dataArr.push(React.createElement(IntegrationUserResultList, {key: 'user', dataList: dataList}));
						    break;
						  case "group":
						  		dataArr.push(React.createElement(IntegrationGroupResultList, {key: 'group', dataList: dataList}));
						    break;
						  case "tag":
							$.each(dataList, function(idx, dataRow) {
								key = gTab + idx;
						  		dataArr.push(React.createElement(IntegrationTagResultList, {key: key, dataRow: dataRow}));
							});
						    break;
						  case "file":
						  		dataArr.push(React.createElement(IntegrationFileResultList, {key: 'file', dataList: dataList}));
						    break;
						  case "bookmark":
						    $.each(dataList, function(idx, dataRow) {
								key = gTab + idx;
						  		dataArr.push(React.createElement(IntegrationBookmarkResultList, {key: key, dataRow: dataRow}));
							});
						    break;
						  case "knowledge":
						   	$.each(dataList, function(idx, dataRow) {
								key = gTab + idx;
						  		dataArr.push(React.createElement(IntegrationKnowledgeResultList, {key: key, dataRow: dataRow}));
							});
						    break;
  						  default:
    						$.each(dataList, function(idx, dataRow) {
								key = gTab + idx;
						  		dataArr.push(React.createElement(IntegrationFeedResultList, {key: key, dataRow: dataRow}));
							});
    						break;
						}  
					}
					if(document.getElementById("IntegrationTabList"))
						React.render(React.createElement(IntegrationSearchResult, {dataArr: dataArr}), document.getElementById("IntegrationTabList"));
				 
			},

			render: function() {
				return (
					React.createElement("div", {className: "feed_wrap", style: {'height':'50px'}}, 
						React.createElement("div", {id: "IntegrationTabList"})
					)
				);
			}
		});
		
		var IntegrationSearchResult = React.createClass({displayName: "IntegrationSearchResult",
			getInitialState: function() {
					return {
						pItgSchKey				: 1
					};
       		},
       		componentDidMount: function() {
       			snsCommLoadingObj({s : 'x'});
       			
       			eventFeedHeight('totalSearch');
       		},
			getItgTabHeader: function() {
					var tabOnStr = "class=\"tab_on\" style='color:#fe630f;'";
					var tabOffStr = "class=\"tab_off\" ";
					var lastTabOnStr = "class=\"tab_on, last_tab\" style='color:#fe630f;'";
					var lastTabOffStr = "class=\"tab_off last_tab\" ";
					
					var tabHeadStr = "";
					tabHeadStr += "        				<ul class=\"malgun13\">";
					tabHeadStr += "            				<li id='itgFeed' " + (gTab == "feed" ? tabOnStr : tabOffStr) + " onclick='javascript:changeItgTab(\"feed\");'><strong>"+ _IntegrationTabList_MSG_TAB1TEXT +"</strong></li>";
					if (gIsGroupYn == "N") {					
						tabHeadStr += "                			<li id='itgUser' " + (gTab == "user" ? tabOnStr : tabOffStr) + " onclick='javascript:changeItgTab(\"user\");'>"+ _IntegrationTabList_MSG_TAB2TEXT +"</li>";
						tabHeadStr += "                			<li style='display:none;' id='itgGroup' " + (gTab == "group" ? tabOnStr : tabOffStr) + " onclick='javascript:changeItgTab(\"group\");'>"+ _IntegrationTabList_MSG_TAB3TEXT +"</li>";
					}	
					tabHeadStr += "                			<li id='itgTag' " + (gTab == "tag" ? tabOnStr : tabOffStr) + " onclick='javascript:changeItgTab(\"tag\");'>"+ _IntegrationTabList_MSG_TAB4TEXT +"</li>";
					tabHeadStr += "                			<li id='itgFile' " + (gTab == "file" ? tabOnStr : tabOffStr) + " onclick='javascript:changeItgTab(\"file\");'>"+ _IntegrationTabList_MSG_TAB5TEXT +"</li>";
					if (gIsGroupYn == "N") {
						tabHeadStr += "                			<li style='display:none;' id='itgBookmark' " + (gTab == "bookmark" ? lastTabOnStr : lastTabOffStr) + " onclick='javascript:changeItgTab(\"bookmark\");'>"+ _IntegrationTabList_MSG_TAB6TEXT +"</li>";
					} else {
						tabHeadStr += "                			<li style='display:none;' id='itgKnowledge' " + (gTab == "knowledge" ? lastTabOnStr : lastTabOffStr) + " onclick='javascript:changeItgTab(\"knowledge\");'>"+ _IntegrationTabList_MSG_TAB7TEXT +"</li>";
					}
					tabHeadStr += "            			</ul>";

				return tabHeadStr;
       		 },
			render: function() {
				var dataArr = this.props.dataArr;
				setTimeout(setTabFocus, 300);
				return (
					React.createElement("div", {className: "feed_wrap"}, 
						React.createElement("div", null, 
							React.createElement("div", {className: "search_tabstyle", dangerouslySetInnerHTML: {__html: this.getItgTabHeader()}}
							), 
							React.createElement("div", {id: "itgDataSpan"}, 
								dataArr
							)
						)
					)
				);
			}
		});


		// feed 리스트 
		var IntegrationFeedResultList = React.createClass({displayName: "IntegrationFeedResultList",
			goFeedCont: function(reqFeedId) {
				openMainBody("itg");
				var baseurl = contextpath + _IntegrationTabList_frfMTL_BASE_FEED + '/' + reqFeedId;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, getFeedDetailResult);

       		},
			goFollowTitle: function() {
				
       		},
			goTagTitle: function(tagName) {
				changeItgTab("tag", tagName);
       		},
			render: function() {
				if (this.props.dataRow == null) {
					return (
						React.createElement("div", null)
					);
				} else {
					
					var fromNoti = this.props.fromNoti === undefined ? 'N' : this.props.fromNoti;
					var groupId = 0;
					var groupInfo = {};
					
					var feeddata = this.props.dataRow;
					var key = feeddata.feedId;
					if(fromNoti == 'Y') key = 'newNotiFeed_'+feeddata.feedId;
					var member = feeddata.memberVo;
					// 해당 피드에 속한 팔로워 리스트
					var follwers = feeddata.feedFollowerList;
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

	               			React.createElement(Feed, {
								key: key, 
								feedTitle: feeddata.feedTitle, 
								feedId: feeddata.feedId, 
								feedType: feeddata.feedType, 
								regMember: member, 
								feedfollower: follwers, 
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
								groupId: groupId, 
								kldgVo: kldgVo, 
								taskId: taskId, 
								fromNoti: fromNoti, 
								groupInfo: groupInfo, 
								followerCnt: followerCnt, 
								isFollow: isFollow, 
	               				isPublic: isPublic}
							)
           			);
				}
			}
		});


		// user 리스트 
		var IntegrationUserResultList = React.createClass({displayName: "IntegrationUserResultList",
			
			getMemberData : function (userSyncKey) {
				var that = this;
				var baseurl = _IntegrationTabList_contextPath + _IntegrationTabList_getMemberUrl + '/' + userSyncKey;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, that.getMemberInfo);
			},
			
			getMemberInfo: function(data){
				
				contentsType = 'USER';
				React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				React.render(React.createElement(MsAddress, null), document.getElementById('RightUpLevel'));
			
				// 가운데 컨텐츠 상단 부분
				React.unmountComponentAtNode(document.getElementById('head_contents'));
				React.render(React.createElement(MemberHead, {memberId: data.memberId}), document.getElementById('head_contents'));

				// 피드 입력창
				React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
				
				if(_GroupFollower_session_memberId == data.memberId){
					React.render(React.createElement(FeedApp, null), document.getElementById('mainContentsArea'));
				} else {
					React.render(React.createElement(FeedApp, {targetId: data.memberId, targetName: data.memberName}), document.getElementById('mainContentsArea'));
				}

				// 중하단 탭 리스트 및 피드
				React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
				if(_IntegrationTabList_memberId == data.memberId){
					React.render(React.createElement(MemberTabList, {memberId: data.memberId}),  document.getElementById('selectTabBySession'));
				}else{
					React.render(React.createElement(OtherMemberTabList, {memberId: data.memberId}),  document.getElementById('selectTabBySession'));
				}
				openMainBody();
				Reloader.reloadObservers('reload');
			},
			
			render: function() {

				var dataList = this.props.dataList;
				var that = this;
				return (
			        React.createElement("div", {className: "tableBox"}, 
			            React.createElement("table", {border: "0", cellSpacing: "0", cellPadding: "0"}, 
			                React.createElement("caption", null, "테이블컨텐츠"), 
			                React.createElement("colgroup", null, 
			                    React.createElement("col", {width: "10%"}), 
			                    React.createElement("col", {width: "15%"}), 
			                    React.createElement("col", {width: "*"}), 
			                    React.createElement("col", {width: "20%"}), 
			                    React.createElement("col", {width: "20%"})
			                ), 
			                     React.createElement("thead", null, 
			                     	  React.createElement("th", null), 
			                          React.createElement("th", null, _IntegrationTabList_MSG_TAB2COLUMN1TEXT), 
			                          React.createElement("th", null, _IntegrationTabList_MSG_TAB2COLUMN2TEXT), 
			                          React.createElement("th", null, _IntegrationTabList_MSG_TAB2COLUMN3TEXT), 
			                          React.createElement("th", {style: {'borderRight':'0'}}, _IntegrationTabList_MSG_TAB2COLUMN4TEXT)
			                     ), 
			                               
			                     React.createElement("tbody", null, 
								    dataList.map(function(dataRow, idx) {
								    	var userSyncKey = dataRow.AccountName;
								    	userSyncKey = userSyncKey.split("\\")[1];
								    	
										return (React.createElement("tr", null, 
					                           React.createElement("td", null, React.createElement("span", {className: "pic_small", style: {'marginLeft':'20px'}})), 
					                           React.createElement("td", {style: {'cursor':'pointer'}, onClick: that.getMemberData.bind(this, userSyncKey)}, dataRow.PreferredName), 
					                           React.createElement("td", null, dataRow.JobTitle), 
					                           React.createElement("td", null, dataRow.Department), 
					                           React.createElement("td", {className: "pic_email"}, 
					                           		React.createElement("a", {href: 'mailto:' + dataRow.WorkEmail}, 
					                           		dataRow.WorkEmail
					                           		)
					                           )
					                      	));
									})
			                    )
			           )
			        )
				);
			}
		});



		// group 리스트 
		var IntegrationGroupResultList = React.createClass({displayName: "IntegrationGroupResultList",
			goGroupTitle: function(groupId, groupName) {
				openMainBody("itg");
				var groupInfo = { "groupId" : groupId, "groupName" : groupName}
				
				// 최근활동
				React.unmountComponentAtNode(document.getElementById('recentAct'));
				React.render(React.createElement(RecentActList, {currGroupId: groupId, baseurl:  contextpath + _IntegrationTabList_grfGroup_GROUP_WIDGET_ACTIVITY}), document.getElementById('recentAct'));


				// 오른쪽 메뉴 상단 그룹 팔로워 리스트
				React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				React.render(React.createElement(MyGroupFollower, {groupId: groupId}), document.getElementById('RightUpLevel'));


				// 오른쪽 메뉴 추천 그룹 리스트
				React.unmountComponentAtNode(document.getElementById('RecommendGroup'));
				React.render(React.createElement(RecommendGroup, null), document.getElementById('RecommendGroup'));


				// 오른쪽 메뉴 신규 그룹 리스트
				React.unmountComponentAtNode(document.getElementById('NewGroup'));
				React.render(React.createElement(NewGroup, null), document.getElementById('NewGroup'));


				// 가운데 컨텐츠 상단 부분(그룹 정보)
				React.unmountComponentAtNode(document.getElementById('head_contents'));
				React.render(React.createElement(GroupHead, {groupId: groupId}), document.getElementById('head_contents'));


				// 가운데 컨텐츠 상단 부분(그룹 정보)
				React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
				React.render(React.createElement(FeedApp, {groupInfo: groupInfo}), document.getElementById('mainContentsArea'));

				// 중하단 탭 리스트 및 피드
				React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
				React.render(React.createElement(GroupTabList, {groupId: groupId}),  document.getElementById('selectTabBySession'));
       		},
       		joinGroup: function(groupId){
				var jsondata = {
	    			"groupId" : groupId,
					"regMemberId" : _IntegrationTabList_memberId
	    		};
				
				var self = this;
				ConfirmPopup(_GroupSearch_MSG_JOINCONFIRMMSG , function(){
					ajaxAdd(contextpath + _GroupSearch_grfGroupSearch_BASE_GFOLLOWER_URL, jsondata, self.joinResult);
				}, 'okcancel');
				
			},
			joinResult: function(data){
//				this.setState({ isJoinStatus: true});
//				reGroupList();
			},
			render: function() {

				var dataList = this.props.dataList;
				var self = this;
				return (
			        React.createElement("div", {className: "tableBox"}, 
			            React.createElement("table", {border: "0", cellSpacing: "0", cellPadding: "0"}, 
			                React.createElement("caption", null, "테이블컨텐츠"), 
			                React.createElement("colgroup", null, 
			                    React.createElement("col", {width: "10%"}), 
			                    React.createElement("col", {width: "*"}), 
			                    React.createElement("col", {width: "15%"})
			                ), 
			                     React.createElement("thead", null, 
			                          React.createElement("th", {colSpan: "2"}, _IntegrationTabList_MSG_TAB3COLUMN1TEXT), 
			                          React.createElement("th", null, _IntegrationTabList_MSG_TAB3COLUMN2TEXT)
			                     ), 
			                               
			                     React.createElement("tbody", null, 
									dataList.map(function(dataRow, idx) {
										var modDate = dataRow.SNSGroupModDate.replace(/-/g, '.');
										if (modDate.length > 10) {
											modDate = modDate.substring(0,10);
										}
										return  React.createElement("tr", null, 
			                       	   		React.createElement("td", null, React.createElement("span", {className: "pic_small"})), 
			                           		React.createElement("td", {style: {'textAlign':'left'}}, React.createElement("a", {href: "#", onClick: self.goGroupTitle.bind(this, dataRow.SNSGroupPkId, dataRow.SNSGroupName)}, dataRow.SNSGroupName)), 
			                           		React.createElement("td", null, modDate)
			                       		)
									 })
			                    )
			           )
			        )
				);
			}
		});


		// tag 리스트
		var IntegrationTagResultList = React.createClass({displayName: "IntegrationTagResultList",
			goTagCont: function(reqFeedId) {
				openMainBody("itg");
				var baseurl = contextpath + _IntegrationTabList_frfMTL_BASE_FEED + '/' + reqFeedId;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, getFeedDetailResult);
       		},
			goFollowTitle: function() {
			//	alert("follower click");
       		},
			goTagTitle: function(tagName) {
				changeItgTab("tag", tagName);
       		},
			render: function() {
				if (this.props.dataRow == null) {
					return (
						React.createElement("div", null)
					);
				} else {
					
					var fromNoti = this.props.fromNoti === undefined ? 'N' : this.props.fromNoti;
					var groupId = 0;
					var groupInfo = {};
					
					var feeddata = this.props.dataRow;
					var key = feeddata.feedId;
					if(fromNoti == 'Y') key = 'newNotiFeed_'+feeddata.feedId;
					var member = feeddata.memberVo;
					// 해당 피드에 속한 팔로워 리스트
					var follwers = feeddata.feedFollowerList;
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

	               			React.createElement(Feed, {
								key: key, 
								feedTitle: feeddata.feedTitle, 
								feedId: feeddata.feedId, 
								feedType: feeddata.feedType, 
								regMember: member, 
								feedfollower: follwers, 
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
								groupId: groupId, 
								kldgVo: kldgVo, 
								taskId: taskId, 
								fromNoti: fromNoti, 
								groupInfo: groupInfo, 
								followerCnt: followerCnt, 
								isFollow: isFollow, 
	               				isPublic: isPublic}
							)
           			);
				}
			}
		});


		// file 리스트 
		var IntegrationFileResultList = React.createClass({displayName: "IntegrationFileResultList",
			render: function() {
				var dataList = this.props.dataList;
				return (
			        React.createElement("div", {className: "tableBox"}, 
			            React.createElement("table", {border: "0", cellSpacing: "0", cellPadding: "0"}, 
			                React.createElement("caption", null, "테이블컨텐츠"), 
			                React.createElement("colgroup", null, 
			                    React.createElement("col", {width: "7%"}), 
			                    React.createElement("col", {width: "7%"}), 
			                    React.createElement("col", {width: "*"}), 
			                    React.createElement("col", {width: "15%"}), 
			                    React.createElement("col", {width: "15%"}), 
			                    React.createElement("col", {width: "15%"})
			                ), 
			                     React.createElement("thead", null, 
			                          React.createElement("th", {colSpan: "3"}, _IntegrationTabList_MSG_TAB5COLUMN1TEXT), 
			                          React.createElement("th", null, _IntegrationTabList_MSG_TAB5COLUMN2TEXT), 
			                          React.createElement("th", null, _IntegrationTabList_MSG_TAB5COLUMN3TEXT), 
			                          React.createElement("th", {style: {'borderRight':'0'}}, _IntegrationTabList_MSG_TAB5COLUMN4TEXT)
			                     ), 
			                               
			                     React.createElement("tbody", null, 
									dataList.map(function(dataRow, idx) {
										var modDate = dataRow.SNSFileFeedRegDTTM.replace(/-/g, '.');
										var repType = dataRow.SNSFileRepositoryType;
										var fileType = null;
										
										if (modDate.length > 10) {
											modDate = modDate.substring(0,10);
										}
										
										if (repType == "LOCAL") {
											fileType = "N";
										} else {
											fileType = "S";
										}
										var fileDownUrl = _IntegrationTabList_contextPath + "/common/files/" + dataRow.SNSFilePkid;
										return  React.createElement("tr", null, 
			                           		React.createElement("td", {style: {'color':'#09F', 'fontWeight':'600'}}, fileType), 
			                           		React.createElement("td", null, React.createElement("a", {href: fileDownUrl}, React.createElement("span", {className: "icon_file"}))), 
			                           		React.createElement("td", {style: {'textAlign':'left', 'paddingLeft':'10px'}}, React.createElement("a", {href: fileDownUrl}, dataRow.SNSFileName)), 
			                           		React.createElement("td", null, dataRow.SNSRegMemberName), 
			                           		React.createElement("td", null, modDate), 
			                           		React.createElement("td", null, dataRow.SNSFilePath)
			                       		)
									 })
			                    )
			           )
			        )
				);
			}
		});


		// bookmark 리스트 
		var IntegrationBookmarkResultList = React.createClass({displayName: "IntegrationBookmarkResultList",
			goBookmarkCont: function(reqFeedId) {
				openMainBody("itg");
				var baseurl = contextpath + _IntegrationTabList_frfMTL_BASE_FEED + '/' + reqFeedId;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, getFeedDetailResult);
       		},
			goFollowTitle: function() {
//				alert("follower click");
       		},
			goTagTitle: function(tagName) {
				changeItgTab("tag", tagName);
       		},
			render: function() {
				var self = this;
				var followerName = this.props.dataRow.SNSFollowerName;
				var followerNameArr = followerName.split(",");

				var tagName = this.props.dataRow.SNSTagName;
				var tagNameArr = tagName.split(",");
				return (
				React.createElement("div", {className: "tab_feed_contents"}, 
					React.createElement("div", {className: "feed_contents", style: {'border':'1px solid #e0e0e0', 'margin':'20px', 'padding':'15px 15px 0 15px'}}, 
			        	React.createElement("dl", null, 
			            	React.createElement("dt", {className: "pic_small"}, "pic"), 
			                React.createElement("dd", {className: "feed_name"}, this.props.dataRow.SNSGroupName), 
			                React.createElement("dd", {className: "time_write", style: {'left':'55px', 'top':'34px'}})
			            ), 
			            React.createElement("div", {className: "substance"}, 
			            	React.createElement("a", {href: "#", onClick: self.goBookmarkCont.bind(this, this.props.dataRow.SNSPkId)}, React.createElement("pre", null, this.props.dataRow.Title))
			            ), 
			            React.createElement("span", {className: "call_target"}, 
			              React.createElement("ul", null, 
			                    (
									function() {
										if (followerName != "") {
			                    			return React.createElement("li", {style: {'textDecoration':'none'}}, _IntegrationTabList_MSG_TAB6REFERENCETEXT, " :")
										}
									}
								).call(this), 
			                  	followerNameArr.map(function(followerName, idx) {
									if (idx == followerNameArr.length - 1) {
									 return React.createElement("li", null, React.createElement("a", {href: "#", onClick: self.goFollowTitle}, followerName));
									} else {
									 return React.createElement("li", null, React.createElement("a", {href: "#", onClick: self.goFollowTitle}, followerName), ",");
									}
								})
			              )
			            )
			     	), 
					(
						function() {
							if (tagName != "") {
			                    return React.createElement("span", {className: "result_tag2"}, 
            					React.createElement("ul", null, 
									tagNameArr.map(function(tagName, idx) {
									return React.createElement("li", null, React.createElement("a", {href: "#", onClick: self.goTagTitle.bind(this, tagName)}, React.createElement("span", null, React.createElement("img", {src: "../images/icon_tag.png", width: "14", height: "14"})), tagName))
									})
            				)
     					)
							}
						}
					 ).call(this)
				)   
				);
			}
		});


		// knowledge 리스트 
		var IntegrationKnowledgeResultList = React.createClass({displayName: "IntegrationKnowledgeResultList",
			goKnowledgeCont: function(reqFeedId) {
				openMainBody("itg");
				var baseurl = contextpath + _IntegrationTabList_frfMTL_BASE_FEED + '/' + reqFeedId;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, getFeedDetailResult);
       		},
			goFollowTitle: function() {
//				alert("follower click");
       		},
			goTagTitle: function(tagName) {
				changeItgTab("tag", tagName);
       		},
			render: function() {
				var self = this;
				var followerName = this.props.dataRow.SNSFollowerName;
				var followerNameArr = followerName.split(",");

				var tagName = this.props.dataRow.SNSTagName;
				var tagNameArr = tagName.split(",");
				return (
				React.createElement("div", {className: "tab_feed_contents"}, 
					React.createElement("div", {className: "feed_contents", style: {'border':'1px solid #e0e0e0', 'margin':'20px', 'padding':'15px 15px 0 15px'}}, 
			        	React.createElement("dl", null, 
			            	React.createElement("dt", {className: "pic_small"}, "pic"), 
			                React.createElement("dd", {className: "feed_name"}, this.props.dataRow.SNSGroupName), 
			                React.createElement("dd", {className: "time_write", style: {'left':'55px', 'top':'34px'}})
			            ), 
			            React.createElement("div", {className: "substance"}, 
			            	React.createElement("a", {href: "#", onClick: self.goKnowledgeCont.bind(this, this.props.dataRow.SNSPkId)}, React.createElement("pre", null, this.props.dataRow.Title))
			            ), 
			            React.createElement("span", {className: "call_target"}, 
			              React.createElement("ul", null, 
			                    (
									function() {
										if (followerName != "") {
			                    			return React.createElement("li", {style: {'textDecoration':'none'}}, _IntegrationTabList_MSG_TAB7REFERENCETEXT, " :")
										}
									}
								).call(this), 
			                  	followerNameArr.map(function(followerName, idx) {
									if (idx == followerNameArr.length - 1) {
									 return React.createElement("li", null, React.createElement("a", {href: "#", onClick: self.goFollowTitle}, followerName));
									} else {
									 return React.createElement("li", null, React.createElement("a", {href: "#", onClick: self.goFollowTitle}, followerName), ",");
									}
								})
			              )
			            )
			     	), 
					(
						function() {
							if (tagName != "") {
			                    return React.createElement("span", {className: "result_tag2"}, 
            					React.createElement("ul", null, 
									tagNameArr.map(function(tagName, idx) {
									return React.createElement("li", null, React.createElement("a", {href: "#", onClick: self.goTagTitle.bind(this, tagName)}, React.createElement("span", null, React.createElement("img", {src: "../images/icon_tag.png", width: "14", height: "14"})), tagName))
									})
            				)
     					)
							}
						}
					 ).call(this)
				)   
				);
			}
		});

		// empty 리스트 
		var IntegrationEmptyResultList = React.createClass({displayName: "IntegrationEmptyResultList",
			render: function() {
				return (
					React.createElement("div", null)
				);
			}
		});
		
		function changeItgTab(tabId, schText){
			
			snsCommLoadingObj({s : 'o'});
			
			if (schText != undefined && schText !="") {
				$("#pItgSch").val(schText);
			}
			gTab = tabId;
			gItgTab.goTabList();
		}
		
		function setTabFocus() {
			$("#pItgSch").focus();
		}