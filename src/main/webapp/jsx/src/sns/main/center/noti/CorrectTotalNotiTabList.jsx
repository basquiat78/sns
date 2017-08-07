var TotalNotiTab  = React.createClass({
	
	getInitialState: function() {
    	return {};
    },
    
    componentWillMount : function(){
    	$TOTALNOTI_SCROLLING_ONOFF = 'ON';
		$(window).off('scroll');
	},
    
	componentWillUnmount: function() {
		$('#selectTabBySession').show();
		React.unmountComponentAtNode(document.getElementById('totalNotiTab'));
	},
	
    componentDidMount: function() {
    	$(window).off('scroll');
    	
    	// 더보기 관련 데이터 초기화
		curMoreDivId = '';
		divIdNum = 0;
		noticeId = 0;
		
		$TOTALNOTI_SCROLLING_ONOFF = 'ON';
		
		snsCommLoadingObj({s : 'o'});
		this.getTotalNotiList();
		
		var self = this;
		$(window).scroll(function () {
			
			if($TOTALNOTI_SCROLLING_ONOFF === 'ON') {
				if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {		
					snsCommLoadingObj({s : 'o'});
					self.getTotalNotiList();
				}
			}	
		});
    },
    getTotalNotiList : function(){
    	var g = this.props.g;
		var self = this;
		var element = document.createElement("tbody");
		divIdNum = parseInt(divIdNum) + 1;
		element.id = 'feedTotalNotiLine' + divIdNum;
		curMoreDivId = element.id;
		document.getElementById('totalNotiTab').appendChild(element);

		var param = {"syncKey": _sns_userSyncKey, "noticeId" : noticeId};
		
		if(g !== '' && g !== 0)
			param = {"syncKey": _sns_userSyncKey, "noticeId" : noticeId, "itemType" : 'GROUP', "itemId" : g };
		
		ajaxGet(_TotalNotiTabList_NOTI_TOTAL_BYUSERID , param, self.TotalNotiFeedRender);
	},
	
	TotalNotiFeedRender : function(data) {
		
		snsCommLoadingObj({s : 'x'});
		
		if( typeof data == "undefined" || data.length == 0) {
			$(window).off('scroll');
			$("div.last_contents").remove();
			$("#totalNotiTab").after('<div class="last_contents">&nbsp;</div>');
			//$('#feedTotalNotiLine' + divIdNum).html('<div class="last_contents">&nbsp;</div>');
		} else {
			React.render(<TotalNotiElemList key={'justice'} data={data} />, document.getElementById(curMoreDivId));
		}
		
		eventFeedHeight('totalNoti');
	},
	render : function() {
		return (
				<div className="feed_wrap">
					<div id='TotalNotiTabList'>
						<ul id="totalnoti_malgun" className="malgun13" style={{'marginBottom':'20px'}}>
							<li className="tab_on" style={{'color':'#fe630f', 'fontWeight':'bold'}}>{_TotalNotiTabList_MSG_TOTALNOTITITLE}</li>
						</ul>
						<div className="tnTableBox">
							<div id="feed_noti"></div>
							<table id="totalNotiTab" border="0" cellSpacing="0" cellPadding="0" style={{'tableLayout':'fixed'}}>
				            	<caption>테이블컨텐츠</caption>                
				                <colgroup>
				                    <col width="*" />
				                    <col width="15%" />
				                    <col width="15%" />
				                </colgroup>
			                    <thead>
			                     	<th>{_TotalNotiTabList_MSG_SEARCHRESULTTEXT1}</th>                      
			                        <th>{_TotalNotiTabList_MSG_SEARCHRESULTTEXT2}</th> 
			                        <th style={{'borderRight':'0'}}>{_TotalNotiTabList_MSG_SEARCHRESULTTEXT3}</th>
			                    </thead>
				        </table>
						</div>
					</div>
				</div>
			);
	}

});
			
var TotalNotiElem = React.createClass({
	
	componentDidMount: function() {
		$('.timeago').timeago();
	},
	
	render : function() {
		
		var trStr = "";
		var tnData = this.props.tnData;
		var regdate = null;
		var timeago = null;
		if (tnData.regDttm != undefined) {
			regdate = new Date(tnData.regDttm).toLocaleString();
			timeago = new Date(tnData.regDttm).toISOString();
		}
		var noticeContent = null;
		switch (langset) {
			case 'ko' : noticeContent = tnData.noticeContentKo; break;
			case 'en' : noticeContent = tnData.noticeContentEn; break;
			case 'zh' : noticeContent = tnData.noticeContentZh; break;
			default : noticeContent = tnData.noticeContentKo;
		}
		
		noticeContent = strip(noticeContent);
		
		trStr += '	<td style="text-align:left;padding-left:5px;" key="ttlNotiTd1_'+ tnData.noticeId + '"><a href="#" key="ttlNotiAtag_'+ tnData.noticeId + '" onclick="javascript:goNotiDetail(\'' + tnData.itemType + '\', \'' + tnData.itemId + '\');">' + noticeContent + '</a></td>';
		trStr += '	<td key="ttlNotiTd2_'+ tnData.noticeId + '">' + tnData.fromMemberName + '</td>';
		trStr += '	<td key="ttlNotiTd3_'+ tnData.noticeId + '"><span class="data-date"><abbr class="timeago" title="' + timeago + '">' + regdate + '</abbr></span></td>';
		
		var key = 'ttlNotiTr_'+ tnData.noticeId;
		
		return (
			<tr id={tnData.noticeId} key={key} style={{'height':'3em'}} dangerouslySetInnerHTML={{__html: trStr }}>
			
			</tr>
		);
	}
});
			
var TotalNotiElemList = React.createClass({
	
	getInitialState: function() {
  		return {};
	},
	
	componentDidMount: function() {
		
	},
	
	render: function() {
		var FeedTotalNotiElemNodes;
		var that = this;
		
		$('.timeago').timeago();
		
		if(this.props.data.length > 0){
			FeedTotalNotiElemNodes = this.props.data.map(
        		function (feeddata, index) {
			
					//해당 피드를 등록한 사람의 정보
					var key = 'ff_' + feeddata.noticeId;
					
					noticeId = feeddata.noticeId;
					
					return (
						<TotalNotiElem 
							tnData = {feeddata}
						/>
					);
				
           		}
        	);
		}
    	return (<div>{FeedTotalNotiElemNodes}</div>);
	}
});

function goNotiDetail(itemType, itemId) {
	if(viewType != 'PERSON') {
		getMemberInfo(_RecentAct_SESSION_MEMBERID, _RecentAct_SESSION_MEMBERNAME, 'fromRecentAct');
	}
	
	selectedTab = 'RECENT_ACT';
	var feedType = itemType;
	var feedId = itemId;
	if (feedType == 'FEED') {
		var baseurl = contextpath + _RecentAct_BASE_FEED + '/' + feedId;
		
		if(ajaxGetNoCall(baseurl, {}))
			ajaxGet(baseurl, {}, getOneNotiFeedDetailResult);
		else
			return false;
		
	} else {
		
		//getGroupDetailResult 함수를 호출한다.
		var baseurl = contextpath + _RecentAct_BASE_GROUP + '/' + feedId;
		
		if(ajaxGetNoCall(baseurl, {}))
			ajaxGet(baseurl, {}, getGroupDetailResult);
		else
			return false;
	}
	openMainBody('TN');
	$("#toTalNotiBack").show();
}