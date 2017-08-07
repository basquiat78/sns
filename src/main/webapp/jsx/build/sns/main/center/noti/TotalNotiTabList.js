		var gTtllNotiObj = null;
		var TotalNotiTab  = React.createClass({displayName: "TotalNotiTab",
			componentWillMount: function() {

			},
			
			componentWillUnmount: function() {
				//Observer.unregisterObserver(this);
     			//Reloader.unregisterReloader(this);
			},
			
			componentDidMount: function() {
				
				//Observer.registerObserver(this);
				//Reloader.registerReloader(this);
			
				$(window).off('scroll');
				noticeId = 0;
				
				$('#selectTabBySession').hide();
			
				this.selTab = 'totalNoti';
				this.goTabList();
				
				$(window).scroll(function () {
     				if($TOTALNOTI_SCROLLING_ONOFF == 'ON') {
     					if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
							$(".notiLoadingTrTmpClass").remove();
							gTtllNotiObj.goTabList();
	     				}
     				}
	     				
    			});
			},
			
			goNotiDetail : function(itemType, itemId) {
			
			 	if(viewType != 'PERSON') {
					getMemberInfo(_RecentAct_SESSION_MEMBERID, _RecentAct_SESSION_MEMBERNAME, 'fromRecentAct');
				}
				
				selectedTab = 'RECENT_ACT';
				var feedType = itemType;
				var feedId = itemId;
				if (feedType == 'FEED') {
					var baseurl = contextpath + _RecentAct_BASE_FEED + '/' + feedId;
					ajaxGet(baseurl, {}, getOneNotiFeedDetailResult);
					
				} else {
					
					//getGroupDetailResult 함수를 호출한다.
					var baseurl = contextpath + _RecentAct_BASE_GROUP + '/' + feedId;
					ajaxGet(baseurl, {}, getGroupDetailResult);
				}
				openMainBody('TN');
				$("#toTalNotiBack").show();
			},

			goTabList: function(){
				
				var g = this.props.g;
				
				//var noticeId = $('#totalNotiTab tr:last').attr("id") == undefined ? 0 : $('#totalNotiTab tr:last').attr("id");
				var param = {"syncKey": _sns_userSyncKey, "noticeId" : noticeId};
				
				if(g !== '' && g !== 0)
					param = {"syncKey": _sns_userSyncKey, "noticeId" : noticeId, "itemType" : 'GROUP', "itemId" : g };
					//param = {};
				
				var trStr =  "<tr class='notiLoadingTrTmpClass' style='height:3em;'>";
					trStr += "	<td colSpan='4' style='text-align:center;'><img src='../images/img_feedmore.gif' width='25' height='4' /></td>";
	            	trStr += "</tr>";      
				$('#totalNotiTab tr:last').after(trStr);
				
				ajaxPost(_TotalNotiTabList_NOTI_TOTAL_BYUSERID , param, this.getTabList);
				if (noticeId == 0) {
					var dataArr = [];
					if ($("#TotalNotiTabList").length) React.unmountComponentAtNode(document.getElementById('TotalNotiTabList'));
					React.render(React.createElement(TotalNotiSearchResult, {dataArr: dataArr, goNotiDetail: this.goNotiDetail}), document.getElementById("TotalNotiTabList"));
				}
			},
			
			getTabList: function(dataList){
					$(".notiLoadingTrTmpClass").remove();
					//var noticeId = $('#totalNotiTab tr:last').attr("id") == undefined ? 0 : $('#totalNotiTab tr:last').attr("id");
					var totalNoticeCnt = 0;
					if (noticeId == 0) {
						var dataArr = [];
						if (dataList.length == 0) {
							dataArr.push(React.createElement(TotalNotiEmptyResultList, null));
						} else {
							totalNoticeCnt = dataList[0].totalNoticeCnt;
							var tab = this.selTab;
							switch (tab){
							  case "totalNoti":
							  		dataArr.push(React.createElement(TotalNotiDataList, {dataList: dataList}));
							    break;
	  						default:
	    						dataArr.push(React.createElement(TotalNotiDataList, {dataList: dataList}));
	    						break;
							}  
						}
						React.render(React.createElement(TotalNotiSearchResult, {goNotiDetail: this.goNotiDetail, dataArr: dataArr}), document.getElementById("TotalNotiTabList"));
					} else {
						var trStr = "";
						dataList.map(function(dataRow, idx) {
							var regdate = null;
							var timeago = null;
							if (dataRow.regDttm != undefined) {
								regdate = new Date(dataRow.regDttm).toLocaleString();
								timeago = new Date(dataRow.regDttm).toISOString();
							}
							var noticeContent = null;
				    		switch (langset) {
				    			case 'ko' : noticeContent = dataRow.noticeContentKo; break;
				    			case 'en' : noticeContent = dataRow.noticeContentEn; break;
				    			case 'zh' : noticeContent = dataRow.noticeContentZh; break;
				    			default : noticeContent = dataRow.noticeContentKo;
				    		}
				    		
				    		noticeContent = strip(noticeContent);
				    		totalNoticeCnt = dataRow.totalNoticeCnt;
				    		
				    		noticeId = dataRow.noticeId;

				    		trStr += '<tr style="height:3em;" key="ttlNotiTr_'+ dataRow.noticeId + '" id="' + dataRow.noticeId + '">';
				    		trStr += '	<td style="text-align:left;padding-left:5px;" key="ttlNotiTd1_'+ dataRow.noticeId + '"><a href="#" key="ttlNotiAtag_'+ dataRow.noticeId + '" onclick="javascript:gTtllNotiObj.goNotiDetail(\'' + dataRow.itemType + '\', \'' + dataRow.itemId + '\');">' + noticeContent + '</a></td>';
				    		trStr += '	<td key="ttlNotiTd2_'+ dataRow.noticeId + '">' + dataRow.fromMemberName + '</td>';
				    		trStr += '	<td key="ttlNotiTd3_'+ dataRow.noticeId + '"><span class="data-date"><abbr class="timeago" title="' + timeago + '">' + regdate + '</abbr></span></td>';
				    		trStr += '</tr>';
						 });
						
						$('#totalNotiTab tr:last').after(trStr);
					}
					
					if (dataList.length == 0) {
						$(window).off('scroll');					
					}
					
					$('.timeago').timeago();
			},
			
			render: function() {
				gTtllNotiObj = this;
				return (
					React.createElement("div", {className: "feed_wrap"}, 
						React.createElement("div", {id: "TotalNotiTabList"})
					)
				);
			}
		});

		var TotalNotiSearchResult = React.createClass({displayName: "TotalNotiSearchResult",
			getItgTabHeader: function() {
					var tabHeadStr = "";
					tabHeadStr += "        				<ul class=\"malgun13\">";
					tabHeadStr += "            				<li id='totalNotiLi' class='tab_on last_tab' style='color:#fe630f;'><strong>"+ _TotalNotiTabList_MSG_TOTALNOTITITLE +"</strong></li>";
					tabHeadStr += "            			</ul>";
				return tabHeadStr;
       		 },
			render: function() {
				var dataArr = this.props.dataArr;
				return (
					React.createElement("span", null, 
						React.createElement("div", {style: {'marginTop':'20px'}, dangerouslySetInnerHTML: {__html: this.getItgTabHeader()}}
					
		        		), 
						React.createElement("span", {id: "totalNotiDataSpan"}, 
							dataArr
						), 
						React.createElement("span", {id: "totNotiMoreSpan", onClick: gTtllNotiObj.goTabList, className: "btn_feedmore2", style: {'marginTop':'50px', 'display':'none'}}, _FEED_Feed_MSG_MORETEXT), 
						React.createElement("span", {id: "loadingNotiSpan", className: "img_feedmore2", style: {'marginTop':'50px', 'display':'none'}}, React.createElement("img", {src: "../images/img_feedmore.gif", width: "25", height: "4"}))
					)
				);
			}
		});


		//total noti 리스트  
		var TotalNotiDataList = React.createClass({displayName: "TotalNotiDataList",
			componentDidMount: function() {
				
			},
			render: function() {
				var dataList = this.props.dataList;
				return (
			        React.createElement("div", {className: "tnTableBox"}, 
			            React.createElement("table", {id: "totalNotiTab", border: "0", cellSpacing: "0", cellPadding: "0", style: {'tableLayout':'fixed'}}, 
			                React.createElement("caption", null, "테이블컨텐츠"), 
			                React.createElement("colgroup", null, 
			                    React.createElement("col", {width: "*"}), 
			                    React.createElement("col", {width: "15%"}), 
			                    React.createElement("col", {width: "15%"})
			                ), 
			                     React.createElement("thead", null, 
			                          React.createElement("th", null, _TotalNotiTabList_MSG_SEARCHRESULTTEXT1), 
			                          React.createElement("th", null, _TotalNotiTabList_MSG_SEARCHRESULTTEXT2), 
			                          React.createElement("th", {style: {'borderRight':'0'}}, _TotalNotiTabList_MSG_SEARCHRESULTTEXT3)
			                     ), 
			                               
			                     React.createElement("tbody", null, 
									dataList.map(function(dataRow, idx) {
									
										var regdate = null;
										var timeago =  null;
										if (dataRow.regDttm != undefined) {
											regdate = new Date(dataRow.regDttm).toLocaleString();
											timeago = new Date(dataRow.regDttm).toISOString();
										}
										
										var noticeContent = null;
							    		switch (langset) {
							    			case 'ko' : noticeContent = dataRow.noticeContentKo; break;
							    			case 'en' : noticeContent = dataRow.noticeContentEn; break;
							    			case 'zh' : noticeContent = dataRow.noticeContentZh; break;
							    			default : noticeContent = dataRow.noticeContentKo;
							    		}
							    		
							    		noticeId = dataRow.noticeId;
							    		
										return  React.createElement("tr", {style: {"height": "3em"}, id: dataRow.noticeId}, 
			                           		React.createElement("td", {style: {"textAlign": "left", "paddingLeft":"5px", "overflow":"hidden", "whiteSpace":"nowrap"}}, React.createElement("a", {href: "#", onClick: gTtllNotiObj.goNotiDetail.bind(this, dataRow.itemType, dataRow.itemId)}, noticeContent)), 
			                           		React.createElement("td", null, dataRow.fromMemberName), 
			                           		React.createElement("td", null, React.createElement("span", {className: "data-date"}, React.createElement("abbr", {className: "timeago", title: timeago}, regdate)))
			                       		)
									 })
			                    )
			           )
			        )
				);
			}
		});

		// empty 리스트 
		var TotalNotiEmptyResultList = React.createClass({displayName: "TotalNotiEmptyResultList",
			render: function() {
				return (
					React.createElement("div", null)
				);
			}
		});
		
		function checkNotiMoreBtn(totalNoticeCnt) {
			var tabRowCnt = $('#totalNotiTab tr').length;
			if (tabRowCnt >= totalNoticeCnt) {
				$("#totNotiMoreSpan").hide();
			} else {
				$('#totNotiMoreSpan').show();
			}
		}
