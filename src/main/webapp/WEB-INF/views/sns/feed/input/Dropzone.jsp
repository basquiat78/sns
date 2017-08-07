<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.member.MemberRestful mrfFeedDropzone = new  org.uengine.sns.member.MemberRestful();%>

<script type="text/javascript">
var Feed_Dropzone_MSG_CHOOSEFILEFROMPC = '<spring:message code="feed.dropzone.CHOOSEFILEFROMPC"/>';
var Feed_Dropzone_MSG_CHOOSEFILEFROMSP = '<spring:message code="feed.dropzone.CHOOSEFILEFROMSP"/>';
var Feed_Dropzone_MSG_FEEDTABTODOTEXT = '<spring:message code="feed.dropzone.FEEDTABTODOTEXT"/>';
var Feed_Dropzone_MSG_FEEDTABPOLLTEXT = '<spring:message code="feed.dropzone.FEEDTABPOLLTEXT"/>';
var Feed_Dropzone_MSG_FEEDTABNOTITEXT = '<spring:message code="feed.dropzone.FEEDTABNOTITEXT"/>';
var Feed_Dropzone_MSG_FEEDTABNEWFEEDTEXT = '<spring:message code="feed.dropzone.FEEDTABNEWFEEDTEXT"/>';

var Feed_Dropzone_MSG_REGISTERTODO = '<spring:message code="feed.dropzone.REGISTERTODO"/>';
var Feed_Dropzone_MSG_REGISTERPOLL = '<spring:message code="feed.dropzone.REGISTERPOLL"/>';
var Feed_Dropzone_MSG_REGISTERNOTI = '<spring:message code="feed.dropzone.REGISTERNOTI"/>';
var Feed_Dropzone_MSG_FEEDWRITEBTNTEXT = '<spring:message code="feed.dropzone.FEEDWRITEBTNTEXT"/>';
var Feed_Dropzone_MSG_COMMENTAREADEFAULTMSG = '<spring:message code="feed.dropzone.COMMENTAREADEFAULTMSG"/>';
var Feed_Dropzone_MSG_SHAREBTNTEXT = '<spring:message code="feed.dropzone.SHAREBTNTEXT"/>';
</script>

<script type="text/javascript">

	var _Dropzone_session_memberId   	 = '<%=session.getAttribute("memberId")%>';
	var _Dropzone_session_memberName 	 = '${memberName}';
	var _Dropzone_session_member_PosName = '${Member.tenantMappingList[0].positionName}';
	var _Dropzone_target_memberId    	 = '${targetMemberId}';
	var _Dropzone_target_memberName  	 = '${targetMemberName}';
	
	var _Dropzone_BASE_MENTIONS			 = contextpath + '<%= mrfFeedDropzone.BASE_MENTIONS%>';
	var _Dropzone_MEMBER_PIC		 	 = contextpath +'<%=mrfFeedDropzone.MEMBER_PIC%>';
	
	function deleteSharepointFile(obj) {
		$(obj).parents("span[id^='shpSpan']").remove();
	}
	
	function setSharepointFileInfo(jsonFileArr, feedId, memberId, shpType) {
		feedId = feedId == undefined ? "" : feedId;
		shpType = shpType == undefined ? "" : shpType;
		
		var shpDocIdArr = null;
		var shpFileNameArr = null;
		var shpOwaUrlArr = null;
		if (shpType == "SHAREPOP") {
			shpDocIdArr = document.getElementsByName("shpDocIdSharePop");
			shpFileNameArr = document.getElementsByName("shpFileNameSharePop");
			shpOwaUrlArr = document.getElementsByName("shpOwaUrlSharePop");
			
		} else {
			shpDocIdArr = document.getElementsByName("shpDocId" + feedId);
			shpFileNameArr = document.getElementsByName("shpFileName" + feedId);
			shpOwaUrlArr = document.getElementsByName("shpOwaUrl" + feedId);
		}
		
		var shpDocId = null;
		   var shpFileName = null;
		var shpOwaUrl = null;
		var fileExt = null;		
		for(idx=0; idx < shpDocIdArr.length; idx++){
			shpDocId = shpDocIdArr[idx].value;
			shpFileName = shpFileNameArr[idx].value;
			shpOwaUrl = shpOwaUrlArr[idx].value;
			fileExt =  shpFileName.substring(shpFileName.lastIndexOf(".") + 1);
			
			var shpFileJsonObj = {
				"feedId" : feedId,
				"fileName" : shpFileName,
				"fileExt" : fileExt,
				"fileUrl" : shpOwaUrl,
				"repositoryType" : "SHAREPOINT",
				"regMemberId" : memberId
			}
			jsonFileArr.push(shpFileJsonObj);
		}
	
	}
	
	// dropzone 관련 기본 설정 변수
	var componentConfig = {
		allowedFiletypes: ['.jpg', '.png', '.gif'],
		showFiletypeIcon: false,
		postUrl: contextpath + '/sns/common/util/ajaxupload'
	};
	
	var djsConfig = {
		addRemoveLinks: true
	};
	
	var eventHandlers = {
		drop: drop,
		dragstart: null,
		dragend: null,
		dragenter: null,
		dragover: null,
		dragleave: null,
		addedfile: addCallBack,
		removedfile: removeCallBack,
		thumbnail: null,
		error: null,
		processing: null,
		uploadprogress: null,
		sending: null,
		success: null,
		complete: completeCallback,
		canceled: null,
		maxfilesreached: null,
		maxfilesexceeded: null,
		processingmultiple: null,
		sendingmultiple: null,
		successmultiple: null,
		completemultiple: null,
		canceledmultiple: null,
		totaluploadprogress: null,
		reset: null,
		queuecompleted: null
	}
	
	
	$.event.props.push('dataTransfer');

	$(window).on('dragleave drop dragover', function(event) {
			if (event.type == 'dragover' || event.type == 'mouseup') {
			  $('.feedElementDiv').addClass('dz-drag-hover');
			  $('.commentff').addClass('dz-drag-hover');
			  $('.highlighter').hide();
			} else {
			  $('.feedElementDiv').removeClass('dz-drag-hover');
			  $('.commentff').removeClass('dz-drag-hover');
			  $('.highlighter').show();
			}


			event.preventDefault();

	});

	var drop = function() {		
			console.log('drop');
	};

	var completeCallback = function() {
		console.log('completed!!!!!');
	};
	
	var addCallBack = function (file) {
		console.log('ddd');
	};

	var removeCallBack = function () {
	};
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/input/Dropzone.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/input/Dropzone.jsx"></script>
  </c:otherwise>
</c:choose>
