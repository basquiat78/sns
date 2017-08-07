		var gTab = "";
		var gIsGroupYn = "N";
		var gIsInitTab = false;
		var gItgTab = "";
		
		var TotalSearchResultEmpty = React.createClass({
			render : function() {
				return (
						<div style={{'textAlign':'center'}}>
							{_IntegrationTabList_MSG_TOTALSEARCHRESULTISEMPTY}
						</div>
				)
			}
		});
		
		function renderTotalSearchResultEmpty() {
			$('#totalsearchisfallen').remove();
			var element = document.createElement("div");
			element.id = 'totalsearchisfallen';
			$("#IntegrationTabList").parent().after(element);
			if(document.getElementById('totalsearchisfallen'))
				React.render(<TotalSearchResultEmpty />, document.getElementById('totalsearchisfallen'));
		}
		
		var IntegrationTab  = React.createClass({
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
				React.render(<IntegrationSearchResult  dataArr={dataArr}/>, document.getElementById("IntegrationTabList"));
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
						dataArr.push(<IntegrationEmptyResultList key={'empty'}/>);
						renderTotalSearchResultEmpty();
					} else {
						$('#totalsearchisfallen').remove();
						var key = null;
						switch (gTab){
						  case "feed":
							$.each(dataList, function(idx, dataRow) {
								key = gTab + idx;
						  		dataArr.push(<IntegrationFeedResultList key={key} dataRow={dataRow}/>);
							});
						    break;
						  case "user":
						  		dataArr.push(<IntegrationUserResultList key={'user'} dataList={dataList}/>);
						    break;
						  case "group":
						  		dataArr.push(<IntegrationGroupResultList key={'group'} dataList={dataList}/>);
						    break;
						  case "tag":
							$.each(dataList, function(idx, dataRow) {
								key = gTab + idx;
						  		dataArr.push(<IntegrationTagResultList key={key} dataRow={dataRow}/>);
							});
						    break;
						  case "file":
						  		dataArr.push(<IntegrationFileResultList key={'file'} dataList={dataList}/>);
						    break;
						  case "bookmark":
						    $.each(dataList, function(idx, dataRow) {
								key = gTab + idx;
						  		dataArr.push(<IntegrationBookmarkResultList key={key} dataRow={dataRow}/>);
							});
						    break;
						  case "knowledge":
						   	$.each(dataList, function(idx, dataRow) {
								key = gTab + idx;
						  		dataArr.push(<IntegrationKnowledgeResultList key={key} dataRow={dataRow}/>);
							});
						    break;
  						  default:
    						$.each(dataList, function(idx, dataRow) {
								key = gTab + idx;
						  		dataArr.push(<IntegrationFeedResultList key={key} dataRow={dataRow}/>);
							});
    						break;
						}  
					}
					if(document.getElementById("IntegrationTabList"))
						React.render(<IntegrationSearchResult  dataArr={dataArr}/>, document.getElementById("IntegrationTabList"));
				 
			},

			render: function() {
				return (
					<div className="feed_wrap" style={{'height':'50px'}}>
						<div id='IntegrationTabList'></div>
					</div>
				);
			}
		});
		
		var IntegrationSearchResult = React.createClass({
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
					<div className="feed_wrap">
						<div>
							<div className="search_tabstyle" dangerouslySetInnerHTML={{__html: this.getItgTabHeader()}}>
							</div>
							<div id="itgDataSpan">
								{dataArr}
							</div>
						</div>
					</div>
				);
			}
		});


		// feed 리스트 
		var IntegrationFeedResultList = React.createClass({
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
						<div/>
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

	               			<Feed
								key            	   = {key}
								feedTitle		   = {feeddata.feedTitle} 
								feedId			   = {feeddata.feedId} 
								feedType		   = {feeddata.feedType}
								regMember          = {member}
								feedfollower	   = {follwers} 
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
			}
		});


		// user 리스트 
		var IntegrationUserResultList = React.createClass({
			
			getMemberData : function (userSyncKey) {
				var that = this;
				var baseurl = _IntegrationTabList_contextPath + _IntegrationTabList_getMemberUrl + '/' + userSyncKey;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, that.getMemberInfo);
			},
			
			getMemberInfo: function(data){
				
				contentsType = 'USER';
				React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				React.render(<MsAddress/>, document.getElementById('RightUpLevel'));
			
				// 가운데 컨텐츠 상단 부분
				React.unmountComponentAtNode(document.getElementById('head_contents'));
				React.render(<MemberHead memberId={data.memberId}/>, document.getElementById('head_contents'));

				// 피드 입력창
				React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
				
				if(_GroupFollower_session_memberId == data.memberId){
					React.render(<FeedApp/>, document.getElementById('mainContentsArea'));
				} else {
					React.render(<FeedApp targetId={data.memberId} targetName={data.memberName}/>, document.getElementById('mainContentsArea'));
				}

				// 중하단 탭 리스트 및 피드
				React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
				if(_IntegrationTabList_memberId == data.memberId){
					React.render(<MemberTabList memberId={data.memberId}/>,  document.getElementById('selectTabBySession'));
				}else{
					React.render(<OtherMemberTabList memberId={data.memberId}/>,  document.getElementById('selectTabBySession'));
				}
				openMainBody();
				Reloader.reloadObservers('reload');
			},
			
			render: function() {

				var dataList = this.props.dataList;
				var that = this;
				return (
			        <div className="tableBox">
			            <table border="0" cellSpacing="0" cellPadding="0">
			                <caption>테이블컨텐츠</caption>                
			                <colgroup>
			                    <col width="10%" />
			                    <col width="15%" />  
			                    <col width="*" />
			                    <col width="20%" />
			                    <col width="20%" />                                      
			                </colgroup>
			                     <thead>
			                     	  <th></th> 
			                          <th>{_IntegrationTabList_MSG_TAB2COLUMN1TEXT}</th>                      
			                          <th>{_IntegrationTabList_MSG_TAB2COLUMN2TEXT}</th>
			                          <th>{_IntegrationTabList_MSG_TAB2COLUMN3TEXT}</th>
			                          <th style={{'borderRight':'0'}}>{_IntegrationTabList_MSG_TAB2COLUMN4TEXT}</th>                     
			                     </thead>
			                               
			                     <tbody>
								    {dataList.map(function(dataRow, idx) {
								    	var userSyncKey = dataRow.AccountName;
								    	userSyncKey = userSyncKey.split("\\")[1];
								    	
										return (<tr>
					                           <td><span className="pic_small" style={{'marginLeft':'20px'}}></span></td>
					                           <td style={{'cursor':'pointer'}} onClick={that.getMemberData.bind(this, userSyncKey)}>{dataRow.PreferredName}</td>
					                           <td>{dataRow.JobTitle}</td>
					                           <td>{dataRow.Department}</td>
					                           <td className="pic_email">
					                           		<a href={'mailto:' + dataRow.WorkEmail}>
					                           		{dataRow.WorkEmail}
					                           		</a>
					                           </td>                                                     
					                      	</tr>);
									})}
			                    </tbody>
			           </table>
			        </div>
				);
			}
		});



		// group 리스트 
		var IntegrationGroupResultList = React.createClass({
			goGroupTitle: function(groupId, groupName) {
				openMainBody("itg");
				var groupInfo = { "groupId" : groupId, "groupName" : groupName}
				
				// 최근활동
				React.unmountComponentAtNode(document.getElementById('recentAct'));
				React.render(<RecentActList currGroupId={groupId} baseurl={ contextpath + _IntegrationTabList_grfGroup_GROUP_WIDGET_ACTIVITY}/>, document.getElementById('recentAct'));


				// 오른쪽 메뉴 상단 그룹 팔로워 리스트
				React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				React.render(<MyGroupFollower groupId={groupId}/>, document.getElementById('RightUpLevel'));


				// 오른쪽 메뉴 추천 그룹 리스트
				React.unmountComponentAtNode(document.getElementById('RecommendGroup'));
				React.render(<RecommendGroup/>, document.getElementById('RecommendGroup'));


				// 오른쪽 메뉴 신규 그룹 리스트
				React.unmountComponentAtNode(document.getElementById('NewGroup'));
				React.render(<NewGroup/>, document.getElementById('NewGroup'));


				// 가운데 컨텐츠 상단 부분(그룹 정보)
				React.unmountComponentAtNode(document.getElementById('head_contents'));
				React.render(<GroupHead groupId={groupId} />, document.getElementById('head_contents'));


				// 가운데 컨텐츠 상단 부분(그룹 정보)
				React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
				React.render(<FeedApp groupInfo={groupInfo}/>, document.getElementById('mainContentsArea'));

				// 중하단 탭 리스트 및 피드
				React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
				React.render(<GroupTabList groupId={groupId} />,  document.getElementById('selectTabBySession'));
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
			        <div className="tableBox" >
			            <table border="0" cellSpacing="0" cellPadding="0">
			                <caption>테이블컨텐츠</caption>                
			                <colgroup>
			                    <col width="10%" />
			                    <col width="*" /> 
			                    <col width="15%" />
			                </colgroup>
			                     <thead>
			                          <th colSpan="2">{_IntegrationTabList_MSG_TAB3COLUMN1TEXT}</th>                      
			                          <th>{_IntegrationTabList_MSG_TAB3COLUMN2TEXT}</th>
			                     </thead>
			                               
			                     <tbody>
									{dataList.map(function(dataRow, idx) {
										var modDate = dataRow.SNSGroupModDate.replace(/-/g, '.');
										if (modDate.length > 10) {
											modDate = modDate.substring(0,10);
										}
										return  <tr>
			                       	   		<td><span className="pic_small"></span></td>
			                           		<td style={{'textAlign':'left'}}><a href='#' onClick={self.goGroupTitle.bind(this, dataRow.SNSGroupPkId, dataRow.SNSGroupName)} >{dataRow.SNSGroupName}</a></td>
			                           		<td>{modDate}</td>
			                       		</tr>
									 })}
			                    </tbody>
			           </table>
			        </div>
				);
			}
		});


		// tag 리스트
		var IntegrationTagResultList = React.createClass({
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
						<div/>
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

	               			<Feed
								key            	   = {key}
								feedTitle		   = {feeddata.feedTitle} 
								feedId			   = {feeddata.feedId} 
								feedType		   = {feeddata.feedType}
								regMember          = {member}
								feedfollower	   = {follwers} 
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
			}
		});


		// file 리스트 
		var IntegrationFileResultList = React.createClass({
			render: function() {
				var dataList = this.props.dataList;
				return (
			        <div className="tableBox" >
			            <table border="0" cellSpacing="0" cellPadding="0">
			                <caption>테이블컨텐츠</caption>                
			                <colgroup>
			                    <col width="7%" />
			                    <col width="7%" />  
			                    <col width="*" />
			                    <col width="15%" />
			                    <col width="15%" />
			                    <col width="15%" />                                      
			                </colgroup>
			                     <thead>
			                          <th colSpan="3">{_IntegrationTabList_MSG_TAB5COLUMN1TEXT}</th>                      
			                          <th>{_IntegrationTabList_MSG_TAB5COLUMN2TEXT}</th>
			                          <th>{_IntegrationTabList_MSG_TAB5COLUMN3TEXT}</th>
			                          <th style={{'borderRight':'0'}}>{_IntegrationTabList_MSG_TAB5COLUMN4TEXT}</th>
			                     </thead>
			                               
			                     <tbody>
									{dataList.map(function(dataRow, idx) {
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
										return  <tr>
			                           		<td style={{'color':'#09F', 'fontWeight':'600'}}>{fileType}</td>
			                           		<td><a href={fileDownUrl} ><span className="icon_file"></span></a></td>
			                           		<td style={{'textAlign':'left', 'paddingLeft':'10px'}}><a href={fileDownUrl}>{dataRow.SNSFileName}</a></td>
			                           		<td>{dataRow.SNSRegMemberName}</td>
			                           		<td>{modDate}</td>
			                           		<td>{dataRow.SNSFilePath}</td>                                                     
			                       		</tr>
									 })}
			                    </tbody>
			           </table>
			        </div>
				);
			}
		});


		// bookmark 리스트 
		var IntegrationBookmarkResultList = React.createClass({
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
				<div className="tab_feed_contents">
					<div className="feed_contents" style={{'border':'1px solid #e0e0e0', 'margin':'20px', 'padding':'15px 15px 0 15px'}}>
			        	<dl>
			            	<dt className="pic_small">pic</dt>
			                <dd className="feed_name">{this.props.dataRow.SNSGroupName}</dd>
			                <dd className="time_write" style={{'left':'55px', 'top':'34px'}}></dd>
			            </dl>
			            <div className="substance">
			            	<a href="#" onClick={self.goBookmarkCont.bind(this, this.props.dataRow.SNSPkId)} ><pre>{this.props.dataRow.Title}</pre></a>
			            </div>   
			            <span className="call_target">
			              <ul>
			                    {(
									function() {
										if (followerName != "") {
			                    			return <li style={{'textDecoration':'none'}}>{_IntegrationTabList_MSG_TAB6REFERENCETEXT} :</li>
										}
									}
								).call(this)}
			                  	{followerNameArr.map(function(followerName, idx) {
									if (idx == followerNameArr.length - 1) {
									 return <li><a href="#" onClick={self.goFollowTitle} >{followerName}</a></li>;
									} else {
									 return <li><a href="#" onClick={self.goFollowTitle} >{followerName}</a>,</li>;
									}
								})}
			              </ul>
			            </span>            
			     	</div> 
					{(
						function() {
							if (tagName != "") {
			                    return <span className="result_tag2">
            					<ul>
									{tagNameArr.map(function(tagName, idx) {
									return <li><a href="#" onClick={self.goTagTitle.bind(this, tagName)} ><span><img src="../images/icon_tag.png" width="14" height="14" /></span>{tagName}</a></li>
									})}
            				</ul> 
     					</span>
							}
						}
					 ).call(this)}
				</div>   
				);
			}
		});


		// knowledge 리스트 
		var IntegrationKnowledgeResultList = React.createClass({
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
				<div className="tab_feed_contents">
					<div className="feed_contents" style={{'border':'1px solid #e0e0e0', 'margin':'20px', 'padding':'15px 15px 0 15px'}}>
			        	<dl>
			            	<dt className="pic_small">pic</dt>
			                <dd className="feed_name">{this.props.dataRow.SNSGroupName}</dd>
			                <dd className="time_write" style={{'left':'55px', 'top':'34px'}}></dd>
			            </dl>
			            <div className="substance">
			            	<a href="#" onClick={self.goKnowledgeCont.bind(this, this.props.dataRow.SNSPkId)} ><pre>{this.props.dataRow.Title}</pre></a>
			            </div>   
			            <span className="call_target">
			              <ul>
			                    {(
									function() {
										if (followerName != "") {
			                    			return <li style={{'textDecoration':'none'}}>{_IntegrationTabList_MSG_TAB7REFERENCETEXT} :</li>
										}
									}
								).call(this)}
			                  	{followerNameArr.map(function(followerName, idx) {
									if (idx == followerNameArr.length - 1) {
									 return <li><a href="#" onClick={self.goFollowTitle} >{followerName}</a></li>;
									} else {
									 return <li><a href="#" onClick={self.goFollowTitle} >{followerName}</a>,</li>;
									}
								})}
			              </ul>
			            </span>            
			     	</div> 
					{(
						function() {
							if (tagName != "") {
			                    return <span className="result_tag2">
            					<ul>
									{tagNameArr.map(function(tagName, idx) {
									return <li><a href="#" onClick={self.goTagTitle.bind(this, tagName)} ><span><img src="../images/icon_tag.png" width="14" height="14" /></span>{tagName}</a></li>
									})}
            				</ul> 
     					</span>
							}
						}
					 ).call(this)}
				</div>   
				);
			}
		});

		// empty 리스트 
		var IntegrationEmptyResultList = React.createClass({
			render: function() {
				return (
					<div/>
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