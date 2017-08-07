<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="now" value="<%=new java.util.Date()%>" />
<% 
	org.uengine.sns.group.GroupRestful grfGroup = new org.uengine.sns.group.GroupRestful(); 
	org.uengine.sns.member.MemberRestful mrf = new org.uengine.sns.member.MemberRestful();
	org.uengine.sns.feed.FeedRestful frfFollower = new org.uengine.sns.feed.FeedRestful();
	org.uengine.sns.common.util.UtilRestful urf = new org.uengine.sns.common.util.UtilRestful();
%>

<script type="text/javascript">


var _GroupConfigTabList_NOW =  '<fmt:formatDate pattern="yyyy-MM-dd" value="${now}" />'   ;
var _GroupConfigTabList_GFOLLOWER_BYSELF_URL = '<%=grfGroup.GFOLLOWER_BYSELF_URL%>'    ;
var _GroupConfigTabList_GFOLLOWER_BYMNG_URL = '<%=grfGroup.GFOLLOWER_BYMNG_URL%>'   
var _GroupConfigTabList_BASE_MEMBER =  '<%=mrf.BASE_MEMBER%>'   ;
var _GroupConfigTabList_BASE_AUTO_FOLLOWER = '<%= frfFollower.BASE_AUTO_FOLLOWER%>'   ;
var _GroupConfigTabList_GROUP_WIDGET_MEMBER = '<%=grfGroup.GROUP_WIDGET_MEMBER%>'    ;

var _GroupConfigTabList_BASE_GFOLLOWER_URL =  '<%=grfGroup.BASE_GFOLLOWER_URL%>'   ;
var _GroupConfigTabList_SESSION_MEMBERID = '<%=session.getAttribute("memberId")%>';
var _GroupConfigTabList_GFOLLOWER_INVITE_WITHEMAIL =  '<%=grfGroup.GFOLLOWER_INVITE_WITHEMAIL%>'    ;
var _GroupConfigTabList_BASE_GFOLLOWER_URL_WITHLIST =  '<%=grfGroup.BASE_GFOLLOWER_URL_WITHLIST %>'   ;
var _GroupConfigTabList_GROUP_WIDGET_MEMBER_OK =  '<%=grfGroup.GROUP_WIDGET_MEMBER_OK%>'   ;
var _GroupConfigTabList_FILE_UPLOAD_AJAX =  '<%=urf.IMGFILE_UPLOAD_AJAX%>'   ;
var _GroupConfigTabList_GROUP_PIC_TEMP =  '<%=grfGroup.GROUP_PIC_TEMP%>'   ;
var _GroupConfigTabList_BASE_GROUP =  '<%=grfGroup.BASE_GROUP%>'   ;
var _GroupConfigTabList_GROUP_PIC =   '<%=grfGroup.GROUP_PIC%>'  ;
var _GroupConfigTabList_BASE_GROUP_NAME =  '<%=grfGroup.BASE_GROUP_NAME%>'   ;
var _GroupConfigTabList_GFOLLOWER_FEED_DOWNLOAD =  '<%=grfGroup.GFOLLOWER_FEED_DOWNLOAD%>'   ;
var _GroupConfigTabList_GFOLLOWER_FEED_DOWNLOAD2 = '<%=frfFollower.FEED_DOWNLOAD_URL%>';

var _GroupConfigTabList_isSysAdmin = '${Member.isSysAdmin}';
var _GroupConfigTabList_session_memberId = '<%=session.getAttribute("memberId")%>';

var _GroupConfigTabList_MSG_TITLE = '<spring:message code="group.config.title"/>';
var _GroupConfigTabList_MSG_GROUPMEMBERDELMSG = '<spring:message code="group.config.groupMemberDelMsg"/>';
var _GroupConfigTabList_MSG_ADDGROUPUSERTEXT = '<spring:message code="group.config.ADDGROUPUSERTEXT"/>';
var _GroupConfigTabList_MSG_CONFIRMBTNTEXT = '<spring:message code="group.config.CONFIRMBTNTEXT"/>';
var _GroupConfigTabList_MSG_MOVETOGROUPUSERMSG = '<spring:message code="group.config.MOVETOGROUPUSERMSG"/>';
var _GroupConfigTabList_MSG_ADDGROUPMANAGERWITHDRAGTEXT = '<spring:message code="group.config.ADDGROUPMANAGERWITHDRAGTEXT"/>';
var _GroupConfigTabList_MSG_ADDGROUPUSERWITHDRAGTEXT = '<spring:message code="group.config.ADDGROUPUSERWITHDRAGTEXT"/>';
var _GroupConfigTabList_MSG_MOVETOGROUPMANAGERMSG = '<spring:message code="group.config.MOVETOGROUPMANAGERMSG"/>';
var _GroupConfigTabList_MSG_SENDEMAILRESULTMSG = '<spring:message code="group.config.SENDEMAILRESULTMSG"/>';
var _GroupConfigTabList_MSG_ADDUSERRESULTMSG = '<spring:message code="group.config.ADDUSERRESULTMSG"/>';
var _GroupConfigTabList_MSG_TABTITLE1 = '<spring:message code="group.config.TABTITLE1"/>';
var _GroupConfigTabList_MSG_TABTITLE2 = '<spring:message code="group.config.TABTITLE2"/>';
var _GroupConfigTabList_MSG_TABTITLE3 = '<spring:message code="group.config.TABTITLE3"/>';
var _GroupConfigTabList_MSG_SUBTABTITLE1 = '<spring:message code="group.config.SUBTABTITLE1"/>';
var _GroupConfigTabList_MSG_SUBTABTITLE2 = '<spring:message code="group.config.SUBTABTITLE2"/>';
var _GroupConfigTabList_MSG_GUBUN1 = '<spring:message code="group.config.GUBUN1"/>';
var _GroupConfigTabList_MSG_GUBUN2 = '<spring:message code="group.config.GUBUN2"/>';
var _GroupConfigTabList_MSG_TAB1COLUMN1 = '<spring:message code="group.config.TAB1COLUMN1"/>';
var _GroupConfigTabList_MSG_TAB1COLUMN2 = '<spring:message code="group.config.TAB1COLUMN2"/>';
var _GroupConfigTabList_MSG_TAB1COLUMN3 = '<spring:message code="group.config.TAB1COLUMN3"/>';
var _GroupConfigTabList_MSG_MEMCHOOSEAPPROVEMSG = '<spring:message code="group.config.MEMCHOOSEAPPROVEMSG"/>';
var _GroupConfigTabList_MSG_MEMCHOOSEREFUSEMSG = '<spring:message code="group.config.MEMCHOOSEREFUSEMSG"/>';
var _GroupConfigTabList_MSG_MEMCHOOSERESULTMSG1 = '<spring:message code="group.config.MEMCHOOSERESULTMSG1"/>';
var _GroupConfigTabList_MSG_MEMCHOOSERESULTMSG2 = '<spring:message code="group.config.MEMCHOOSERESULTMSG2"/>';
var _GroupConfigTabList_MSG_SUBTABTITLE3 = '<spring:message code="group.config.SUBTABTITLE3"/>';
var _GroupConfigTabList_MSG_TAB1SUBTAB1COLUMN1 = '<spring:message code="group.config.TAB1SUBTAB1COLUMN1"/>';
var _GroupConfigTabList_MSG_TAB1SUBTAB1COLUMN2 = '<spring:message code="group.config.TAB1SUBTAB1COLUMN2"/>';
var _GroupConfigTabList_MSG_TAB1SUBTAB1COLUMN3 = '<spring:message code="group.config.TAB1SUBTAB1COLUMN3"/>';
var _GroupConfigTabList_MSG_TAB1SUBTAB1COLUMN4 = '<spring:message code="group.config.TAB1SUBTAB1COLUMN4"/>';
var _GroupConfigTabList_MSG_TAB1SUBTAB1COLUMN5 = '<spring:message code="group.config.TAB1SUBTAB1COLUMN5"/>';
var _GroupConfigTabList_MSG_CONFIRMDELGROUPMSG = '<spring:message code="group.config.CONFIRMDELGROUPMSG"/>';
var _GroupConfigTabList_MSG_DELGROUPRESULTMSG = '<spring:message code="group.config.DELGROUPRESULTMSG"/>';
var _GroupConfigTabList_MSG_CHKGROUPNAMEMSG = '<spring:message code="group.config.CHKGROUPNAMEMSG"/>';
var _GroupConfigTabList_MSG_GROUPSAVERESULTMSG = '<spring:message code="group.config.GROUPSAVERESULTMSG"/>';
var _GroupConfigTabList_MSG_CHKGROUPNAMEISNULLMSG = '<spring:message code="group.config.CHKGROUPNAMEISNULLMSG"/>';
var _GroupConfigTabList_MSG_GROUPNAMEISEXISTMSG = '<spring:message code="group.config.GROUPNAMEISEXISTMSG"/>';
var _GroupConfigTabList_MSG_GROUPNAMEISNOTEXISTMSG = '<spring:message code="group.config.GROUPNAMEISNOTEXISTMSG"/>';
var _GroupConfigTabList_MSG_DELGROUPBTNTEXT = '<spring:message code="group.config.DELGROUPBTNTEXT"/>';
var _GroupConfigTabList_MSG_CONFIRMGROUPCHANGEBTNTEXT = '<spring:message code="group.config.CONFIRMGROUPCHANGEBTNTEXT"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN1 = '<spring:message code="group.config.TAB2COLUMN1"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN2 = '<spring:message code="group.config.TAB2COLUMN2"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN3 = '<spring:message code="group.config.TAB2COLUMN3"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN4 = '<spring:message code="group.config.TAB2COLUMN4"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN5 = '<spring:message code="group.config.TAB2COLUMN5"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN6 = '<spring:message code="group.config.TAB2COLUMN6"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN1TEXT1 = '<spring:message code="group.config.TAB2COLUMN1TEXT1"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN2TEXT1 = '<spring:message code="group.config.TAB2COLUMN2TEXT1"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN3TEXT1 = '<spring:message code="group.config.TAB2COLUMN3TEXT1"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN4TEXT1 = '<spring:message code="group.config.TAB2COLUMN4TEXT1"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN4TEXT2 = '<spring:message code="group.config.TAB2COLUMN4TEXT2"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN5TEXT1 = '<spring:message code="group.config.TAB2COLUMN5TEXT1"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN5TEXT2 = '<spring:message code="group.config.TAB2COLUMN5TEXT2"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN6TEXT1 = '<spring:message code="group.config.TAB2COLUMN6TEXT1"/>';
var _GroupConfigTabList_MSG_TAB2COLUMN6TEXT2 = '<spring:message code="group.config.TAB2COLUMN6TEXT2"/>';
var _GroupConfigTabList_MSG_DATECHOOSEERRMSG1 = '<spring:message code="group.config.DATECHOOSEERRMSG1"/>';
var _GroupConfigTabList_MSG_DATECHOOSEERRMSG2 = '<spring:message code="group.config.DATECHOOSEERRMSG2"/>';
var _GroupConfigTabList_MSG_TAB3COLUMN1TEXT1 = '<spring:message code="group.config.TAB3COLUMN1TEXT1"/>';
var _GroupConfigTabList_MSG_TAB3COLUMN1TEXT2 = '<spring:message code="group.config.TAB3COLUMN1TEXT2"/>';
var _GroupConfigTabList_MSG_TAB3DOWNLOADBTNTEXT = '<spring:message code="group.config.TAB3DOWNLOADBTNTEXT"/>';
var _GroupConfigTabList_MSG_APPROVALBTNTEXT		= '<spring:message code="group.config.approvalbtntext"/>';
var _GroupConfigTabList_MSG_REFUSALBTNTEXT		= '<spring:message code="group.config.refusalbtntext"/>';
var _GroupConfigTabList_MSG_DELETEBTNTEXT		= '<spring:message code="group.config.deletebtntext"/>';
var _GroupConfigTabList_MSG_MGRMUSTBEEXISTMSG = '<spring:message code="group.config.MGRMUSTBEEXISTMSG"/>';
var _GroupConfigTabList_MSG_NOREQUESTMEMBERMSG = '<spring:message code="basic.msg.iamaoutcast"/>';
</script>



<style>
img.ui-datepicker-trigger {
	width: 16px;
    height: 16px;
    margin-left: 8px;
    margin-top: 10px;
    vertical-align: top;
    float: left;
}
div.groupset_tab {margin:15px 0 34px 0;height:25px;}
div.tblboxsub {margin:0;}
div#GroupConfigPop .gmsub {width: 100%; }
div#GroupConfigPop div#GroupConfigTabPopup {padding:0 20px;}
div#GroupConfigPop div#GroupConfigTabPopup div.table_wrap2 {
	border:1px solid #e0e0e0;
}
div#GroupConfigTabBase div.tableBox span.set_txt {
	margin:10px 0; border:0; padding: 0 0 0 15px;
}
</style>
<script type="text/javascript" src="../js/common/util/combodate.js"></script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/config/GroupConfigTabList.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/config/GroupConfigTabList.jsx"></script>
  </c:otherwise>
</c:choose>

<div class="click_popup_wrap ,hidden" style="display: none;" id='GroupConfigPop'>
	<div class="pop-modalwindow-header" style="cursor:move;">
		<div class="pop-modalwindow-title"><spring:message code="group.config.MAINTITLE"/></div>
        <div class="pop-modalwindow-header-option">
        	<a class="ico-anchor"><span class="ico-img ico-close" onclick="closeGroupConfigPop()">닫기</span></a>
    	</div>
	</div>
	<div class="click_popup" style="width:824px;padding:0;">
		<div class='gmsub' style="overflow:auto; border:0;">
			<div id='GroupConfigTabPopup' class='lay-contents-area lay-conteont-margin' style='height:580px; border:0;'></div>
		</div>
	</div>
</div>