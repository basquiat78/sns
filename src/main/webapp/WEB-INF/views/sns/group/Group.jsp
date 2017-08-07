<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% 
	org.uengine.sns.group.GroupRestful grfGroup = new org.uengine.sns.group.GroupRestful(); 
	org.uengine.sns.common.util.UtilRestful urfGroup = new org.uengine.sns.common.util.UtilRestful();
%>
	<%@include file="GroupFollower.jsp"%>
	
	<style>
	ul.nav-lnb-sub li.nav-item span span.data-num {
		display : none;
	}
	
	/* li.nav-item .nav-anchor.my-group-item:hover{font-weight:bold; color:#fff;background-color: rgba( 254, 99, 15, 0.4 )} */
	li.nav-item .nav-anchor.my-group-item.group-select:hover{font-weight:bold; color:#fff;background-color: #7f756f;}
	</style>
	
<script type="text/javascript">
var _Group_grfGroup_GROUP_WIDGET_ACTIVITY = '<%=grfGroup.GROUP_WIDGET_ACTIVITY%>';
var _Group_grfGroup_BASE_GROUP = '<%=grfGroup.BASE_GROUP%>';
var _Group_session_memberId = '<%=session.getAttribute("memberId")%>';
var _Group_SNSCodeMaster_GROUP_TYPE_INNER = '<%=org.uengine.sns.common.code.SNSCodeMaster.GROUP_TYPE_INNER%>';
var _Group_urfGroup_FILE_UPLOAD_AJAX = '<%=urfGroup.IMGFILE_UPLOAD_AJAX%>';
var _Group_grfGroup_GROUP_PIC_TEMP = '<%=grfGroup.GROUP_PIC_TEMP%>';
var _Group_grfGroup_BASE_GROUP_NAME = '<%=grfGroup.BASE_GROUP_NAME%>';
var _Group_grfGroup_BASE_GFOLLOWER_ACCESS = '<%=grfGroup.BASE_GFOLLOWER_ACCESS%>';

var _Group_spring_message_basic_mygroup = '<spring:message code="basic.mygroup" htmlEscape="true" />';
var _Group_spring_message_basic_group_create = '<spring:message code="basic.group.create" htmlEscape="true" />';
var _Group_spring_message_basic_group_find = '<spring:message code="basic.group.find" htmlEscape="true" />';
var _Group_spring_message_nogroup			= '<spring:message code="basic.msg.nogroup" htmlEscape="true" />';

var _Group_js_MSG_GROUPNAMEALREADYEXISTMSG = '<spring:message code="group.create.GROUPNAMEALREADYEXISTMSG" htmlEscape="true" />';
var _Group_js_MSG_GROUPNAMEREQUIREMSG = '<spring:message code="group.create.GROUPNAMEREQUIREMSG" htmlEscape="true" />';
var _Group_js_MSG_GROUPNAMEAVAILABLEMSG = '<spring:message code="group.create.GROUPNAMEAVAILABLEMSG" htmlEscape="true" />';

var makeFeedId = 0;
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/group/Group.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/group/Group.jsx"></script>
	</c:otherwise>
</c:choose>

	<div id="element_to_pop_up" class="click_popup_wrap ,hidden" style="display: none">
		<div class="pop-modalwindow-header" style="cursor:move;">
			<div class="pop-modalwindow-title"><spring:message code="group.create.title"/></div>
            <div class="pop-modalwindow-header-option">
            	<a class="ico-anchor"><span class="ico-img ico-close" onclick="closeMakeGroupPopup(1)">닫기</span></a>
            </div>
        </div>
	    <div class="click_popup" style="width:624px;">
	    	<input type="hidden" value="0" id="groupType" name="groupType" />
	      	<div class="group_menu_wrap" style="display:none;">
	            <dl class="group_menuon" id="inner" onclick="chgGroupType('inner', 'outer', '<%=org.uengine.sns.common.code.SNSCodeMaster.GROUP_TYPE_INNER%>')">
	                <dt class="icon_gmon" id='innericon'>
	                	<img src="../images/icon_in.gif" width="41" height="34" id="groupImg" />
	                </dt>
	                <dd class="gm_on" id='innergm'><span><spring:message code="group.create.groupSUBTITLE1"/></span><br /><spring:message code="group.create.groupSUBTITLE1DETAILTEXT"/></dd>
	            </dl>
	            <dl class="group_menuoff" id="outer" onclick="chgGroupType('outer', 'inner', <%=org.uengine.sns.common.code.SNSCodeMaster.GROUP_TYPE_OUTER%>)">
	                <dt class="icon_gmoff" id='outericon'>
	                	<img src="../images/icon_out.gif" width="35" height="34" />
	                </dt>
	                <dd class="gm_off" id='outergm'><span><spring:message code="group.create.groupSUBTITLE2"/></span><br /><spring:message code="group.create.groupSUBTITLE2DETAILTEXT"/></dd>
	            </dl>
	        </div>
	        <div class="gmsub">
	        	<form enctype="multipart/form-data">
	            <dl class="groupimg">
	                <dt><spring:message code="group.create.groupLIST1COLUMN1"/></dt>
	                <dd class="g_name"><img src="../images/pic_group.jpg" width="80" style="height:auto !important; max-height: 80px;" id="grpImg" /></dd>
	                <dd class="file_txt"><spring:message code="group.create.groupLIST1COLUMN1TEXT1"/> <input type="file" name="groupimage" id="groupimage" onchange='saveGroupImage()'/></dd>
	            </dl>
	            </form>
	            <dl class="groupimg" style="height:25px;">
	            	<dt><spring:message code="group.create.groupLIST1COLUMN2"/></dt>
	                <dd class="g_name"><input name="groupName" id="groupName" type="text" onchange="groupNameChk()"/></dd>
	                <dd class="g_txt" id="grpNameChkMgs"></dd>
	            </dl>
	            <dl class="groupimg" style="height:25px;">
	            	<dt><spring:message code="group.create.groupLIST1COLUMN3"/></dt>
	                <dd class="g_name"><textarea name="description" id="description" cols="" rows="3"></textarea></dd>
	            </dl>    
	            <dl class="groupimg" style="height:25px;" id="gflistDl">
	            	<dt><spring:message code="group.create.groupLIST1COLUMN4"/></dt>
	                <dd class="g_name">
	                   <div id="_gflist"></div>                 
	                </dd>
	            </dl>
	            <dl class="groupimg" style="height:50px;">
	            	<dt style="margin-right:20px;"><spring:message code="group.create.groupLIST1COLUMN5"/></dt>  
	                <dd style="margin-top:5px;"><input name="isPublic" id="isPublic1" type="radio" value="1" />
	                	<label for="isPublic1"><span class="g_name" style="margin-left:5px; font-size:13px; line-height:24px;"><spring:message code="group.create.groupLIST1COLUMN5ETC1"/></span></label>
	                </dd>
	                <dd style="margin-left:150px;"><input name="isPublic" id="isPublic0" type="radio" value="0" checked="checked" />
	                	<label for="isPublic0"><span class="g_name" style="margin-left:5px;  font-size:13px; "><spring:message code="group.create.groupLIST1COLUMN5ETC2"/></span></label>
	                </dd>
	            </dl>                                  
	        </div>
			<div class="pop-modalwindow-btn-area">
			  <button type="button" class="btn-m btn-attention" onclick="saveGroup()"><spring:message code="group.create.GROUPADDBTNTEXT"/></button>
			</div>
	    </div>
	</div>