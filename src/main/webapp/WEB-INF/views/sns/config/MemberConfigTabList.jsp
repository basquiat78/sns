<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<% 
	org.uengine.sns.noticeconfig.NoticeConfigRestful ncr = new org.uengine.sns.noticeconfig.NoticeConfigRestful(); 
	org.uengine.sns.group.GroupRestful grf = new org.uengine.sns.group.GroupRestful();
	org.uengine.sns.member.MemberRestful mrf = new org.uengine.sns.member.MemberRestful();
	org.uengine.sns.openapi.OpenAPIRestful oprf = new org.uengine.sns.openapi.OpenAPIRestful();
	org.uengine.sns.group.GroupRestful grfGroupSearch = new org.uengine.sns.group.GroupRestful();
%>

<script type="text/javascript">

var _MemberConfigTabList_BASE_NOTI_CONFIG =  '<%=ncr.BASE_NOTI_CONFIG%>'   ;
var _MemberConfigTabList__SESSION_MEMBERID = '<%=session.getAttribute("memberId")%>';
var _MemberConfigTabList_GFOLLOWER_BYSELF_URL =  '<%=grf.GFOLLOWER_BYSELF_URL%>'   ;
var _MemberConfigTabList_GROUP_PIC =  '<%=grfGroupSearch.GROUP_PIC%>'   ;
var _MemberConfigTabList_BASE_GROUP_MYLIST =  '<%=grf.BASE_GROUP_MYLIST%>'   ;
var _MemberConfigTabList_EXTMAPPINGLIST =  '<%=oprf.EXTMAPPINGLIST %>'   ;
var _MemberConfigTabList_MEMBERINFOFOREXTLINKAGE =  '<%=oprf.MEMBERINFOFOREXTLINKAGE %>'   ;
var _MemberConfigTabList_EXTFOLLOWINGLIST =  '<%=oprf.EXTFOLLOWINGLIST %>'   ;
var _MemberConfigTabList_BASE_MEMBER =  '<%=mrf.BASE_MEMBER%>'   ;
var _MemberConfigTabList_BASE_GFOLLOWER_ACCESS = '<%=grf.BASE_GFOLLOWER_ACCESS%>';

var _MemberConfigTabList_MSG_TITLE = '<spring:message code="member.config.title"/>';
var _MemberConfigTabList_MSG_MAINTITLE = '<spring:message code="member.config.maintitle"/>';
var _MemberConfigTabList_MSG_TABTITLE1 = '<spring:message code="member.config.TABTITLE1"/>';
var _MemberConfigTabList_MSG_TABTITLE2 = '<spring:message code="member.config.TABTITLE2"/>';
var _MemberConfigTabList_MSG_TABTITLE3 = '<spring:message code="member.config.TABTITLE3"/>';
var _MemberConfigTabList_MSG_TAB1LIST1TITLE = '<spring:message code="member.config.TAB1LIST1TITLE"/>';
var _MemberConfigTabList_MSG_TAB1LIST2TITLE = '<spring:message code="member.config.TAB1LIST2TITLE"/>';
var _MemberConfigTabList_MSG_TAB1LIST1SUBTITLE1 = '<spring:message code="member.config.TAB1LIST1SUBTITLE1"/>';
var _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE1 = '<spring:message code="member.config.TAB1LIST2SUBTITLE1"/>';
var _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE2 = '<spring:message code="member.config.TAB1LIST2SUBTITLE2"/>';
var _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE3 = '<spring:message code="member.config.TAB1LIST2SUBTITLE3"/>';
var _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE4 = '<spring:message code="member.config.TAB1LIST2SUBTITLE4"/>';
var _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE5 = '<spring:message code="member.config.TAB1LIST2SUBTITLE5"/>';
var _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE6 = '<spring:message code="member.config.TAB1LIST2SUBTITLE6"/>';
var _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE7 = '<spring:message code="member.config.TAB1LIST2SUBTITLE7"/>';
var _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE8 = '<spring:message code="member.config.TAB1LIST2SUBTITLE8"/>';
var _MemberConfigTabList_MSG_TAB1LIST2SUBTITLE9 = '<spring:message code="member.config.TAB1LIST2SUBTITLE9"/>';
var _MemberConfigTabList_MSG_TAB1SAVEBTNTEXT = '<spring:message code="member.config.TAB1SAVEBTNTEXT"/>';
var _MemberConfigTabList_MSG_LEAVEBTNTEXT = '<spring:message code="member.config.LEAVEBTNTEXT"/>';
var _MemberConfigTabList_MSG_SELECTBTNTEXT = '<spring:message code="member.config.SELECTBTNTEXT"/>';

var _MemberConfigTabList_MSG_TAB2LIST1TITLE = '<spring:message code="member.config.TAB2LIST1TITLE"/>';
var _MemberConfigTabList_MSG_TAB2LIST1COLUMN1 = '<spring:message code="member.config.TAB2LIST1COLUMN1"/>';
var _MemberConfigTabList_MSG_TAB2LIST1COLUMN2 = '<spring:message code="member.config.TAB2LIST1COLUMN2"/>';
var _MemberConfigTabList_MSG_TAB2LIST1COLUMN3 = '<spring:message code="member.config.TAB2LIST1COLUMN3"/>';
var _MemberConfigTabList_MSG_TAB2LIST1COLUMN4 = '<spring:message code="member.config.TAB2LIST1COLUMN4"/>';

var _MemberConfigTabList_MSG_TAB3LIST1TITLE = '<spring:message code="member.config.TAB3LIST1TITLE"/>';
var _MemberConfigTabList_MSG_TAB3LIST1COLUMN1 = '<spring:message code="member.config.TAB3LIST1COLUMN1"/>';
var _MemberConfigTabList_MSG_TAB3LIST2COLUMN1 = '<spring:message code="member.config.TAB3LIST2COLUMN1"/>';
var _MemberConfigTabList_MSG_TAB3BOTTOMMSG = '<spring:message code="member.config.TAB3BOTTOMMSG"/>';

var _MemberConfigTabList_MSG_DEFAULTSAVEMSG = '<spring:message code="member.config.DEFAULTSAVEMSG"/>';

var _MemberConfigTabList_MSG_GROUPLEAVECONFIRMMSG = '<spring:message code="member.config.GROUPLEAVECONFIRMMSG"/>';
var _MemberConfigTabList_MSG_GROUPLEAVECONFIRMMSG_FORMGR = '<spring:message code="member.config.GROUPLEAVECONFIRMMSG_FORMGR"/>';
var _MemberConfigTabList_MSG_MGRMUSTBEEXISTMSG = '<spring:message code="group.config.MGRMUSTBEEXISTMSG"/>';

var _MemberConfigTabList_MSG_INNERGROUPTEXT = '<spring:message code="member.config.INNERGROUPTEXT"/>';
var _MemberConfigTabList_MSG_OUTERGROUPTEXT = '<spring:message code="member.config.OUTERGROUPTEXT"/>';
var _MemberConfigTabList_MSG_EXFOLLOWITMISALREADYEXISTMSG = '<spring:message code="member.config.EXFOLLOWITMISALREADYEXISTMSG"/>';
var _MemberConfigTabList_MSG_IHAVENOHEAVEN			= '<spring:message code="basic.msg.nogroup"/>';
var _MemberConfigTabList_MSG_MYFOLLOWINGLISTISEMPTY = '<spring:message code="basic.msg.myfollowinglistisEmpty"/>';

</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
        <script type="text/javascript" src="../jsx/build/sns/config/MemberConfigTabList.js"></script>
  </c:when >
  <c:otherwise>
        <script type="text/jsx" src="../jsx/src/sns/config/MemberConfigTabList.jsx"></script>
  </c:otherwise>
</c:choose>

	
<style type="text/css">
div#MemberConfigTabInterface div.list_wrap {margin-left:20px;}

div#MemberConfigTabInterface div.list_wrap div.elt_list_wrap_sub {
	display:inline-block; vertical-align:top; }
div#MemberConfigTabInterface div.list_wrap div.elt_list_wrap_sub div.extlink_list_title {
	font-weight:bold; padding:10px;
	background-color:#f2f2f2; color:#222;
}
div#MemberConfigTabInterface div.list_wrap div.elt_list_wrap_sub div.extlink_list_title.elt_r {
	
}
div#MemberConfigTabInterface div.list_wrap div.elt_list_wrap_sub div.outside_list 
, div#MemberConfigTabInterface div.list_wrap div.elt_list_wrap_sub div.fallow_list
{
	width:250px; height:360px;
}

div#MemberConfigTabInterface div.list_wrap div.elt_list_wrap_sub.elws_mid {
	width:230px; text-align:center;
}
div#MemberConfigTabInterface div.list_wrap div.elt_list_wrap_sub.elws_mid span.btn_select {
	float:none; margin-top:200px; width:100%; display:block;
}

ul.setBox {margin:10px 0 0 50px;}
dl#externallist dd {float : none; display:block; overflow: hidden;}
dl#externallist dd.select_list {background-color : #7f756f; color:#fff; }
dl#externallist dd.lidd-child { padding-left:30px; 
	background-image:url('../images/config/f_stem.png');
	background-repeat: no-repeat;
	background-position-x : 10px;
	line-height:20px;
}
dl#externallist dd.lidd-child-last {
	background-image:url('../images/config/f_stem_end.png');
}
dl#externallist dd.list_icon span.config_folder_close { background-image:url('../images/config/bbs_folder_close.png');
	display:inline-block; margin-right:5px; width:13px; height:16px;
}

dl#externallist dd.list_icon {margin-left:0px; padding-left:10px;}
dl#externallist dd.select_list span.config_folder_close { background-image:url('../images/config/bbs_folder_open.png');
	display:inline-block; margin-right:5px; width:13px; height:16px;
}

div#followinglist dd.list_icon {display:block; float : none; overflow: hidden; padding-left:10px; margin-left:0px;}
div#followinglist dd.list_icon:hover {background-color:#c5c7d0 }
div#followinglist dd.list_icon img._delbtn {margin-left:5px;}
div#followinglist dd.list_icon.selected {background-color:#7f756f; color:#fff;}
</style>

	<div class="click_popup_wrap ,hidden" style="display: none;" id='MemberConfigPop'>
		<div class="pop-modalwindow-header" style="cursor:move;">
			<div class="pop-modalwindow-title"><spring:message code="member.config.maintitle"/></div>
	        <div class="pop-modalwindow-header-option">
	        	<a class="ico-anchor"><span class="ico-img ico-close" onclick="closeMemberConfigPop()">닫기</span></a>
	    	</div>
		</div>
		<!-- <h3 style="line-height:36px; width:830px;">환경설정<span class="btn_close"><img src="../images/btn_close.png" width="13" height="13" onclick="closeMemberConfigPop()" /></span></h3>
		 -->
		<div class="click_popup" style="width:824px; overflow:auto;">
			<div class='gmsub' style="overflow:visible; border:0;">
				<div id='MemberConfigTabPopup' class='lay-contents-area lay-conteont-margin' style='height:580px; border:0;'></div>
			</div>
		</div>
	</div>

