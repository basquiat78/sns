<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfFeed = new  org.uengine.sns.feed.FeedRestful();%>
<% org.uengine.sns.member.MemberRestful mrfFeed = new  org.uengine.sns.member.MemberRestful();%>
<% org.uengine.sns.group.GroupRestful mrfGroup = new  org.uengine.sns.group.GroupRestful();%>
<% org.uengine.sns.openapi.OpenAPIRestful oarFeed =  new org.uengine.sns.openapi.OpenAPIRestful();%>
<% org.uengine.sns.notice.NoticeRestful ntFeed =  new org.uengine.sns.notice.NoticeRestful();%>
<%@include file="CommentFeed.jsp"%>
<%@include file="input/FeedAnswer.jsp"%>
<%@include file="input/FeedShare.jsp"%>
<jsp:include page="../feed/input/MessageFeed.jsp" flush="true"/>
<jsp:include page="../feed/view/TodoCalendar.jsp" flush="true"/>
<jsp:include page="../feed/view/Slider.jsp" flush="true"/>
<jsp:include page="../feed/view/FeedFile.jsp" flush="true"/>
<jsp:include page="../feed/view/PollView.jsp" flush="true"/>

<style type="text/css">
.feed_contents dl dd.feed_name {cursor : default;}
.feed_contents dl dd.feed_name span:first-child { cursor : pointer; }
.feed_contents dl dd.icon_lock {cursor : default;}
.ug-slider-control.ug-zoompanel {display:none;}
div.fanaticlist {
	position : absolute; background-color:#fff; border : 1px solid #ddd;
	overflow-y : hidden; overflow-x : hidden; z-index : 1000000;
}
div.fanaticlist ul {padding:10px;}
div.fanaticlist ul li {
	margin: 2px 0;
	border-bottom:1px solid #efefef;
}
</style>

<script>

	var _FEED_Feed_MSG_ILIKETHISONEMSG = '<spring:message code="feed.feed.ILIKETHISONEMSG"/>';
	var _FEED_Feed_MSG_APPROVALOPINION = '<spring:message code="feed.feed.APPROVALOPINION"/>';
	var _FEED_Feed_MSG_INPUTOPINIONMSG = '<spring:message code="feed.feed.INPUTOPINIONMSG"/>';
	var _FEED_Feed_MSG_INPUTPASSWORDMSG = '<spring:message code="feed.feed.INPUTPASSWORDMSG"/>';
	var _FEED_Feed_MSG_INPUTRETURNOPINIONMSG = '<spring:message code="feed.feed.INPUTRETURNOPINIONMSG"/>';
	var _FEED_Feed_MSG_RETURN = '<spring:message code="feed.feed.RETURN"/>';
	var _FEED_Feed_MSG_APPROVAL = '<spring:message code="feed.feed.APPROVAL"/>';
	var _FEED_Feed_MSG_NEWREPLYMSG = '<spring:message code="feed.feed.NEWREPLYMSG"/>';
	var _FEED_Feed_MSG_FOLLOWEDMSG = '<spring:message code="feed.feed.FOLLOWEDMSG"/>';
	var _FEED_Feed_MSG_UNFOLLOWEDMSG = '<spring:message code="feed.feed.UNFOLLOWEDMSG"/>';
	var _FEED_Feed_MSG_MADEKNOWLEDGEMSG = '<spring:message code="feed.feed.MADEKNOWLEDGEMSG"/>';
	var _FEED_Feed_MSG_MADEKNOWLEDGECLEARMSG = '<spring:message code="feed.feed.MADEKNOWLEDGECLEARMSG"/>';
	var _FEED_Feed_MSG_FROMTO1TEXT = '<spring:message code="feed.feed.FROMTO1TEXT"/>';
	var _FEED_Feed_MSG_FROMTO2TEXT = '<spring:message code="feed.feed.FROMTO2TEXT"/>';
	var _FEED_Feed_MSG_MADENEWSCHEDULEMSG = '<spring:message code="feed.feed.MADENEWSCHEDULEMSG"/>';
	var _FEED_Feed_MSG_COMPLETESCHEDULEMSG = '<spring:message code="feed.feed.COMPLETESCHEDULEMSG"/>';
	var _FEED_Feed_MSG_INCOMPLETESCHEDULEMSG = '<spring:message code="feed.feed.INCOMPLETESCHEDULEMSG"/>';
	var _FEED_Feed_MSG_FEEDWASDELETEDMSG = '<spring:message code="feed.feed.FEEDWASDELETEDMSG"/>';
	var _FEED_Feed_MSG_APPROVALCOMPLETEMSG = '<spring:message code="feed.feed.APPROVALCOMPLETEMSG"/>';
	var _FEED_Feed_MSG_RETURNCOMPLETEMSG = '<spring:message code="feed.feed.RETURNCOMPLETEMSG"/>';
	var _FEED_Feed_MSG_PREVIOUSCOMMENT1 = '<spring:message code="feed.feed.PREVIOUSCOMMENT1"/>';
	var _FEED_Feed_MSG_PREVIOUSCOMMENT2 = '<spring:message code="feed.feed.PREVIOUSCOMMENT2"/>';
	var _FEED_Feed_MSG_LIKEMSG = '<spring:message code="feed.feed.LIKEMSG"/>';
	var _FEED_Feed_MSG_CANCELLIKEMSG = '<spring:message code="feed.feed.CANCELLIKEMSG"/>';
	var _FEED_Feed_MSG_KNOWLEDGEHOVERTITLE = '<spring:message code="feed.feed.KNOWLEDGEHOVERTITLE"/>';
	var _FEED_Feed_MSG_BOOKMARKHOVERTITLE = '<spring:message code="feed.feed.BOOKMARKHOVERTITLE"/>';
	var _FEED_Feed_MSG_SECRETHOVERTITLE = '<spring:message code="feed.feed.SECRETHOVERTITLE"/>';
	var _FEED_Feed_MSG_COMMENTTEXT = '<spring:message code="feed.feed.COMMENTTEXT"/>';
	var _FEED_Feed_MSG_SHARETEXT = '<spring:message code="feed.feed.SHARETEXT"/>';
	var _FEED_Feed_MSG_MORETEXT = '<spring:message code="feed.feed.MORETEXT"/>';
	var _FEED_Feed_MSG_LAYOUTFOLLOW = '<spring:message code="feed.feed.LAYOUTFOLLOW"/>';
	var _FEED_Feed_MSG_LAYOUTUNFOLLOW = '<spring:message code="feed.feed.LAYOUTUNFOLLOW"/>';
	var _FEED_Feed_MSG_LAYOUTBOOKMARK = '<spring:message code="feed.feed.LAYOUTBOOKMARK"/>';
	var _FEED_Feed_MSG_LAYOUTCLEARBOOKMARK = '<spring:message code="feed.feed.LAYOUTCLEARBOOKMARK"/>';
	var _FEED_Feed_MSG_LAYOUTKNOWLEDGE = '<spring:message code="feed.feed.LAYOUTKNOWLEDGE"/>';
	var _FEED_Feed_MSG_LAYOUTCLEARKNOWLEDGE = '<spring:message code="feed.feed.LAYOUTCLEARKNOWLEDGE"/>';
	var _FEED_Feed_MSG_LAYOUTCOMPLETE = '<spring:message code="feed.feed.LAYOUTCOMPLETE"/>';
	var _FEED_Feed_MSG_LAYOUTINCOMPLETE = '<spring:message code="feed.feed.LAYOUTINCOMPLETE"/>';
	var _FEED_Feed_MSG_LAYOUTCHANGEDATE = '<spring:message code="feed.feed.LAYOUTCHANGEDATE"/>';
	var _FEED_Feed_MSG_LAYOUTDELETE = '<spring:message code="feed.feed.LAYOUTDELETE"/>';
	var _FEED_Feed_MSG_TAGEDIT		= '<spring:message code="feed.feed.TAGEDIT"/>';
	var _FEED_Feed_MSG_LAYOUTMODIFY = '<spring:message code="feed.feed.LAYOUTMODIFY"/>';
	var _FEED_Feed_MSG_MESSAGECNTMSG = '<spring:message code="feed.feed.MESSAGECNTMSG"/>';
	var _FEED_Feed_MSG_MOREFEEDCONTENTSTEXT = '<spring:message code="feed.feed.MOREFEEDCONTENTSTEXT"/>';
	var _FEED_Feed_MSG_LESSFEEDCONTENTSTEXT = '<spring:message code="feed.feed.LESSFEEDCONTENTSTEXT"/>';
	var _FEED_Feed_MSG_WHATTOSHOWTEXT_PERSON_TOTAL = '<spring:message code="feed.feed.WHATTOSHOWTEXT.PERSON_TOTAL"/>';
	var _FEED_Feed_MSG_WHATTOSHOWTEXT_PERSON = '<spring:message code="feed.feed.WHATTOSHOWTEXT.PERSON"/>';
	var _FEED_Feed_MSG_WHATTOSHOWTEXT_GROUP_TOTAL = '<spring:message code="feed.feed.WHATTOSHOWTEXT.GROUP_TOTAL"/>';
	var _FEED_Feed_MSG_WHATTOSHOWTEXT_APPROVAL = '<spring:message code="feed.feed.WHATTOSHOWTEXT.APPROVAL"/>';
	var _FEED_Feed_MSG_WHATTOSHOWTEXT_BOARD = '<spring:message code="feed.feed.WHATTOSHOWTEXT.BOARD"/>';
	var _FEED_Feed_MSG_WHATTOSHOWTEXT_GROUP_KNWLDG = '<spring:message code="feed.feed.WHATTOSHOWTEXT.GROUP_KNWLDG"/>';
	var _FEED_Feed_MSG_DUEDATE = '<spring:message code="feed.todocalendar.TODODAY"/>';
	
	var _FEED_Feed_MSG_TODOISCOMPLETEDTEXT = '<spring:message code="feed.todocalendar.TODOISCOMPLETEDTEXT"/>'; // 완료
	var _FEED_Feed_MSG_TODOISDELAYTEXT = '<spring:message code="feed.todocalendar.TODOISDELAYTEXT"/>'; // 지연
	var _FEED_Feed_MSG_TOTOISNOWONGOINGTEXT = '<spring:message code="feed.todocalendar.TOTOISNOWONGOINGTEXT"/>'; // 진행중
	var _FEED_Feed_MSG_TOTALNOTITITLE = '<spring:message code="total.noti.TOTALNOTITITLE"/>';
	
	var _FEED_Feed_MSG_NOMESSAGE = '<spring:message code="basic.msg.nomessage"/>';
	var _FEED_Feed_MSG_DATECHOOSEERRMSG2 = '<spring:message code="group.config.DATECHOOSEERRMSG2"/>';
	
	var _Feed_session_memberId  		= '${memberId}';
	var _Feed_session_UserId  			= '${userId}';
	var _Feed_session_memberName  		= '${memberName}';
	var _Feed_MEMBER_PIC  				= contextpath + '<%=mrfFeed.MEMBER_PIC%>';
	var _Feed_BASE_FEED  				= contextpath + '<%=frfFeed.BASE_FEED%>';
	var _Feed_FEED_BEFORE_COMMENT		= contextpath + '<%=frfFeed.FEED_BEFORE_COMMENT%>';
	var _Feed_BASE_BOOKMARK     		= contextpath + '<%=mrfFeed.BASE_BOOKMARK%>';
	var _Feed_GW_APPROVAL_APPROVE   	= contextpath + '<%=oarFeed.GW_APPROVAL_APPROVE%>';
	var _Feed_GW_APPROVAL_REJECT    	= contextpath + '<%=oarFeed.GW_APPROVAL_REJECT%>';
	var _Feed_FEED_TYPE_COMMENT     	= contextpath + '<%=frfFeed.FEED_TYPE_COMMENT%>';
	var _Feed_FEED_COMMENT_BY_REGDTTM   = contextpath + '<%=frfFeed.FEED_COMMENT_BY_REGDTTM%>';
	var _Feed_BASE_LIKEIT 				= contextpath + '<%=frfFeed.BASE_LIKEIT%>';
	var _Feed_BASE_FOLLOWER 			= contextpath + '<%=frfFeed.BASE_FOLLOWER%>';
	var _Feed_BASE_KNWLDG_URL 			= contextpath + '<%=mrfGroup.BASE_KNWLDG_URL%>';
	var _Feed_SET_DUEDATE 				= contextpath + '<%=frfFeed.SET_DUEDATE%>';
	var _Feed_TODO_COMPLETE 			= contextpath + '<%=frfFeed.TODO_COMPLETE%>';
	var _Feed_TODO_INCOMPLETE 			= contextpath + '<%=frfFeed.TODO_INCOMPLETE%>';
	var _Feed_BASE_POLL_RESULT 			= contextpath + '<%=frfFeed.BASE_POLL_RESULT%>';
	var _Feed_MEMBER_WIDGET_ACTIVITY 	= contextpath + '<%=mrfFeed.MEMBER_WIDGET_ACTIVITY%>';
	var _Feed_GROUP_WIDGET_ACTIVITY 	= contextpath + '<%=mrfGroup.GROUP_WIDGET_ACTIVITY%>';
	var _Feed_BASE_GROUP				= contextpath + '<%=mrfGroup.BASE_GROUP%>';
	var _Feed_NOTI_BY_REGDTTM 			= contextpath + '<%=ntFeed.NOTI_BY_REGDTTM%>';
	var _Feed_basic_notiheader			= '<spring:message code="basic.notiheader"/>';
	var _Feed_basic_date				= '<spring:message code="feed.todocalendar.TODODAY"/>';
	var _Feed_AND_COMMENT				= contextpath + '<%=frfFeed.FEED_AND_COMMENT%>';
	
	//피드 포커싱 ID 보고 있는 피드 영역을 클릭한 경우 해당 피드 아이디를 이 변수에 담는다.
	var focusFeedId = '';
	
	// 로드되는 순간의 timestamp를 담는 변수
	var loadDttm = 0;
	
	var selectedTab = '';
	var feedHeight = 0;
	// 웹 소켓 노티로 나타나는 메세지 클릭시 이 부분을 true로 바꿔준다.
	// 이 값을 통해서 내가 보고 있는 화면에서 노티로 그려낸 피드 라인이 있음을 감지하고 차후 unmounted를 해줘야 한다.
	var clickNoti = false;
	var notiDiv = 0;
	// 더보기 이벤트시 렌더링할 DIV ID
	var curMoreDivId = '';
	// 더보기 렌더링하기 위해 생성할 DIV ID 넘버링
	var divIdNum = 0;
	// 더보기 데이터를 취득하기 위해 현재 화면에서 최하단에 위치한 피드 아이디 - 최초에 0으로 값을 던지면 필터링 조건에서 제외한다.
	var moreFeedId = 0;
	var viewType = 'PERSON';
	var onClickFrom = '';
	
	var isFeedMoreLayout = false;
	var fmlId = '';
	var notiData = [];
	var isCommentMoreLayout = false;
	var cmlId = '';
	
	var mainSelectFileLayout = false;
	var mainSelectFileLayoutId = 'selectFileLayout';
	
	var shareSelectFileLayout = false;
	var shareSelectFileLayoutId = 'shareSelectFileLayout';
	
	var subSelectFileLayout = false;
	var subSelectFileLayoutId = '';
	
	function eventLayoutControll() {
		
		if(subSelectFileLayout) {
			$('#'+subSelectFileLayoutId).hide();
			subSelectFileLayout = false;
			subSelectFileLayoutId = '';
		}
		
		if(shareSelectFileLayout) {
			$('#shareSelectFileLayout').hide();
			shareSelectFileLayout = false;
		}
		
		if(mainSelectFileLayout) {
			$('#selectFileLayout').hide();
			mainSelectFileLayout = false;
		}
		
		if(isCommentMoreLayout) {
			$('#'+cmlId).hide();
			isCommentMoreLayout = false;
			cmlId = '';
		}
		
		if(isFeedMoreLayout) {
			$('#'+fmlId).hide();
			isFeedMoreLayout = false;
			fmlId = '';
		}
	}
	
	function eventFeedHeight(param) {
		//console.log(feedHeight);
		//console.log($('#feed_wholebox').height());
		//var _autoHeight = feedHeight + 1000;
		var elemId = '';
		var heightOption = 0;
		
		switch (param) {
		case 'favorite' : elemId = 'favorite_feed_wholebox'; heightOption = 150;
			break;
		case 'totalNoti' : elemId = 'TotalNotiTabList'; heightOption = 100;
			break;
		case 'simpleTodo' : elemId = 'MemberFeedBox'; heightOption = 350;
			break;
		case 'filelist' : elemId = 'MemberFeedBox'; heightOption = 350;
			break;
		case 'hashtaglist' : elemId = 'tag_feed_wholebox'; heightOption = 150;
			break;
		case 'totalSearch' : elemId = 'IntegrationTabList';
			break;
		case 'sysadmin' : elemId = 'system_feed_wholebox'; heightOption = 500;
			break;
		case 'sysadmingroup' : elemId = 'group_wholebox'; heightOption = 600;
			break;
		default : elemId = 'feed_wholebox'; heightOption = 400;
		}

		var _autoHeight = $('#' + elemId).height();
		_autoHeight = (_autoHeight < 600) ? 1300 : $('#' + elemId).height() + heightOption;
		
		//console.log("sum : " + _autoHeight);
		try {
			$(".lay-content").css("height", _autoHeight+"px");
			$(".lay-snb").css("height", _autoHeight+"px");
			$("#div_lay_col2").css("height", _autoHeight+"px");
			
		} catch(e) {
		}
	}
	
	var fileoption = {
		url: "/sns/common/util/ajaxupload",
        headers: {
        	'Access-Control-Allow-Credentials': true,
        	'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-PINGOTHER, X-File-Name, Cache-Control',
        	'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS',
        	'Access-Control-Allow-Origin': '*'
        },
        withCredentials: false,
		dictDefaultMessage: "<spring:message code="feed.feed.FILETOHERETEXT"/>",
 		thumbnailWidth: 60,
      	thumbnailHeight: 60,
		previewsContainer: document.getElementById('preview_'),
		previewTemplate: "<div class=\"add_file dz-preview dz-file-preview\" style=\"padding:0 0 10px 0;\">\n <dl style=\"padding:10px 15px 0 15px;\">\n	<dt><img data-dz-thumbnail width=\"40\" height=\"40\"/></dt>\n  <dd class=\"name_file dz-filename\"><strong><span data-dz-name></span></strong></dd>\n <dd class=\"upload_bar dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></dd>\n <dd class=\"dz-error-message\"><span data-dz-errormessage></span></dd>\n <dd class=\"dz-success-mark\">\n <svg width=\"19\" height=\"20\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n <title>Check</title>\n <defs></defs>\n <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </dd>\n <dd class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n 	</dd>\n </dl>	</div>",
        clickArea: "preview_123",
        success: function(data, response) {
			setFileList(response);
		}
	};

	</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/Feed.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/Feed.jsx"></script>
  </c:otherwise>
</c:choose>
<div id='sns-tooltip' style='display:none'></div>
