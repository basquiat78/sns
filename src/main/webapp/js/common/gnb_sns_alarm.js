/**
 * 
 */
var onOpenSocialAlarmUrl = window.location.protocol+"//"+_sns_domain+"/sns/notices/members/synckey/" + _sns_userSyncKey;
var getSocialAlarmCntUrl = window.location.protocol+"//"+_sns_domain+"/sns/notices/cnt/synckey/" + _sns_userSyncKey;
var updateSocialAlarmCntUrl = window.location.protocol+"//"+_sns_domain+"/sns/notices";
var onOpenSNSTotalNotiUrl = window.location.protocol+"//"+_sns_domain+"/sns/main/totalNoti";

var gotoU = function(a,b) {
	if(b == "FEED") window.location.href = window.location.protocol+"//"+_sns_domain+"/sns/feeddetail/" + a;
	else window.location.href = window.location.protocol+"//"+_sns_domain+"/sns/group/" + a;
};

function __strip(html)
{
	var tmp = document.createElement("DIV");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText;
}

var goTotalNotiListUrl = function() {
	window.location.href = onOpenSNSTotalNotiUrl;
}

var onOpenSocialAlarm = function() {
	var $container = $("ul.hhsc-sociallist");
	
	$.ajax({
		url			: onOpenSocialAlarmUrl ,
		dataType	: "jsonp",
		method		: "get",
		success: function(data) {
			if (data != null) {
				
				$container.html("");
				
				var html = '';
				var loopCnt = data.length > 10 ? 10 :  data.length;		// ADD 2015.11.06 j.h kim  10개로 제한 
		    	for(var i=0; i< loopCnt; i++) {
		    		var timeago = new Date(data[i].regDttm).toISOString();
		    		var a = 
		    		
		    		html += (i > 9) ? 
		    				'<li class="hhsc-sociallist-item hhsc-sociallist-item-more" onclick="gotoU(\''+ data[i].itemId +'\', \''+ data[i].itemType +'\');">'
		    				: '<li class="hhsc-sociallist-item" onclick="gotoU(\''+ data[i].itemId +'\', \''+ data[i].itemType +'\');">';
		    		html += '<span class="hhsc-user-pic"><span class="hhsc-user-img"><img src="'+window.location.protocol+'//'+_sns_domain+'/sns/members/imgs?memberId='+data[i].fromMemberId+'"></span></span>';
		    		html += '<p class="hhsc-social-info">';
		    		
		    		//html += '<b class="hhsc-user">'+ data[i].fromMemberName +'</b>님이 '
		    		//html += (data[i].itemTitle == undefined ? '' : data[i].itemTitle) + '(을/를) 등록하였습니다.';
		    		
		    		var ls = '';
		    		switch (langset) {
		    		case 'ko' : ls = data[i].noticeContentKo; break;
		    		case 'en' : ls = data[i].noticeContentEn; break;
		    		case 'zh' : ls = data[i].noticeContentZh; break;
		    		default : ls = data[i].noticeContentKo;
		    		}
		    		
		    		html += ls == undefined ? __strip(data[i].noticeContent) : __strip(ls);
		    		html += '</p>';
		    		html += '<p class="hhsc-date">';
		    		html += '<abbr class="timeago" title="'+ timeago +'"></abbr>';
		    		html += '</p>';
		    		//html += '<a class="hhsc-ico-anchor" href="#"><span class="hhsc-ico-img hhsc-ico-delete">Delete</span></a>';
		    		html += '</li>';
		    		
		    		//updateSocialAlarmCnt(data[i].noticeId);
		    	}
		    	
		    	//html += '<li class="hhsc-sociallist-item" id="hhsc-sociallist-item-morebtn" style="cursor:pointer;" onclick="javascript:goTotalNotiList(0 ,{g:0});">more</li>';
		    	html += '<li class="hhsc-sociallist-item" id="hhsc-sociallist-item-morebtn" style="cursor:pointer;" onclick="javascript:goTotalNotiListUrl();">more</li>';
		    	
		    	$container.html(html);
		    	$container.find("li.hhsc-sociallist-item-more").hide();
		    	
		    	$container.find("li#hhsc-sociallist-item-morebtn").on('click', function(e){
		    		$(this).remove();
		    		$container.find("li.hhsc-sociallist-item-more").show();
		    		e.stopPropagation();
		    	});
		    	
		    	try {
			    	$container.find('.timeago').timeago();
		    	} catch(e) {
		    	}
				
		    	//getSocialAlarmCnt();
		    	
		    	_initSnsGnbAlarm();
			}
		}
	});
	
};

/*
var getSocialAlarmCnt = function() {
	//NOTICNT_CNT
	$.ajax({
		url			: getSocialAlarmCntUrl
		,dataType	: "jsonp"
		,type		: "get"
		,data		: {}
		,success: function(data) {
			//NOTI_SCNT
			//alert(data.noticeCnt);
			var noticeCnt =  data.noticeCnt;
			noticeCnt = noticeCnt > 99 ? new String('99+') : new String(noticeCnt);		// ADD 2015.11.06 j.h kim  최대 99개까지 제한 
			$("span#_id_noti_cnt").html(noticeCnt);
		}
	});
};
*/
/*
var updateSocialAlarmCnt = function(v) {
	$.ajax({
		url			: updateSocialAlarmCntUrl
		,dataType	: "jsonp"
		,type		: "put"
		,data		: {"noticeId" : v, "isRead" : "1"}
		,success: function(data) {
			
		}
	});
};
*/

function _initSnsGnbAlarm() {
	//ajaxUpd(getSocialAlarmCntUrl, '', function(){});

	$.ajax({
		url			: getSocialAlarmCntUrl
		,dataType	: "jsonp"
		,type		: "put"
		,data		: {}
		,success: function(data) {
			
		}
	});

	$("#_id_noti_cnt").html("0");
	$("#_id_noti_cnt").css("display", "none");
}