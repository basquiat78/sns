<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful   frfTodoCalendar = new  org.uengine.sns.feed.FeedRestful();%>
<% org.uengine.sns.group.GroupRestful grfTodoCalendar = new  org.uengine.sns.group.GroupRestful();%>
<% org.uengine.sns.member.MemberRestful mrfTodoCalendar = new  org.uengine.sns.member.MemberRestful();%>

<style type="text/css">
	div.h_stdf_wrapper_table {}
	div.h_stdf_wrapper_table #h_stdf_simplelist_header th {
		border-top:1px solid #ddd; border-left : 1px solid #ddd; padding:10px 5px; 
		border-bottom:1px solid #ddd; 
		background-color:#f5f5f5;
		text-align:center;
		white-space : nowrap; overflow: hidden;
	}
	div.h_stdf_wrapper_table #h_stdf_simplelist_header th.h_stdf_feedtitle {
		
	}
	div.h_stdf_wrapper_table #h_stdf_simplelist_header th.h_stdf_todoType {
		width : 40px;
	}
	
	div.h_stdf_wrapper_table #h_stdf_simplelist_header th.h_stdf_membername {
		border-right:1px solid #ddd;
	}
	div.h_stdf_wrapper_table #h_stdf_simplelist_header th.h_stdf_duedate {
		width : 80px;
	}
	div.h_stdf_wrapper_table #h_stdf_simplelist_header th.h_stdf_feedfollower {
		
	}
	
	div.h_stdf_wrapper_table table {
		width : 100%;
		table-layout : fixed;
	}
	
	div.h_stdf_wrapper_table td#h_stdf_simplelist_table table {
		border-left:1px solid #ddd;
		border-right:1px solid #ddd;
		border-bottom:1px solid #ddd;
		table-layout : fixed;
	}
	div.h_stdf_wrapper_table td#h_stdf_simplelist_table table td {
		padding:10px 5px 3px; white-space : nowrap; overflow: hidden;
	}
	div.h_stdf_wrapper_table td#h_stdf_simplelist_table td.stdf_feedtitle {  color:#333;}
	div.h_stdf_wrapper_table td#h_stdf_simplelist_table td.stdf_todoType {  text-align:center; 
		width : 40px;
	}
	div.h_stdf_wrapper_table td#h_stdf_simplelist_table td.stdf_membername {  text-align:center;  }
	div.h_stdf_wrapper_table td#h_stdf_simplelist_table td.stdf_duedate {  text-align:center;  
		width : 80px;
	}
	div.h_stdf_wrapper_table td#h_stdf_simplelist_table td.stdf_feedfollower {  text-align:left; }
	
	div.h_stdf_wrapper_table td#h_stdf_simplelist_table td.stdf_feedfollower span.call_target {
		margin-left: 5px;
	}
</style>

<script type="text/javascript">
	var _TodoCalendar_session_memberId  		= '${memberId}';
	var _TodoCalendar_pageContext_lang = '${pageContext.response.locale.language}';
	var _TodoCalendar_target_memberId  = '<%=request.getAttribute("targetMemberId")%>';
	var _TodoCalendar_FOLLOWER_TYPE_MEMBER    	 = '<%=org.uengine.sns.common.code.SNSCodeMaster.FOLLOWER_TYPE.MEMBER.toString()%>';
	var _TodoCalendar_FOLLOWER_TYPE_OTHER_MEMBER = '<%=org.uengine.sns.common.code.SNSCodeMaster.FOLLOWER_TYPE.OTHER_MEMBER.toString()%>';

	var _TodoCalendar_BASE_FEED		   = contextpath + '<%=frfTodoCalendar.BASE_FEED%>';
	var _TodoCalendar_BASE_GROUP_FEED  = contextpath + '<%=grfTodoCalendar.BASE_GROUP_FEED%>';
	var _TodoCalendar_BASE_MEMBER_FEED = contextpath + '<%=mrfTodoCalendar.BASE_MEMBER_FEED%>';
	
	var _FEED_TodoCalendar_MSG_WHATTOSHOWTEXT = '<spring:message code="feed.todocalendar.WHATTOSHOWTEXT"/>';
	var _FEED_TodoCalendar_MSG_SCHEDULESTEP1 = '<spring:message code="feed.todocalendar.SCHEDULESTEP1"/>';
	var _FEED_TodoCalendar_MSG_SCHEDULESTEP2 = '<spring:message code="feed.todocalendar.SCHEDULESTEP2"/>';
	var _FEED_TodoCalendar_MSG_SCHEDULESTEP3 = '<spring:message code="feed.todocalendar.SCHEDULESTEP3"/>';
	var _FEED_TodoCalendar_MSG_SHOWSCHEDULEWHENHOVER = '<spring:message code="feed.todocalendar.SHOWSCHEDULEWHENHOVER"/>';
	var _FEED_TodoCalendar_MSG_FEED = '<spring:message code="feed.todocalendar.FEED"/>';
	var _FEED_TodoCalendar_MSG_CALENDAR = '<spring:message code="feed.todocalendar.CALENDAR"/>';
	var _FEED_TodoCalendar_MSG_SIMPLEFEED = '<spring:message code="feed.todocalendar.SIMPLEFEED"/>';
	var _FEED_TodoCalendar_MSG_DAYCOMPLETETASK = '<spring:message code="feed.todocalendar.DAYCOMPLETETASK"/>';
	
	var _FEED_TodoCalendar_MSG_BASIC_TODO_MYTODO = '<spring:message code="basic.todo.mytodo" htmlEscape="true" />';
	var _FEED_TodoCalendar_MSG_BASIC_TODO_WHODO = '<spring:message code="basic.todo.whodo" htmlEscape="true" />';
	var _FEED_TodoCalendar_MSG_BASIC_TODO_SENDTODO = '<spring:message code="basic.todo.sendtodo" htmlEscape="true" />';
	var _FEED_TodoCalendar_MSG_BASIC_TODO_DELAY = '<spring:message code="basic.todo.delay" htmlEscape="true" />';
	var _FEED_TodoCalendar_MSG_BASIC_ISONGOING = '<spring:message code="basic.todo.isongoing" htmlEscape="true" />';
	
	var _FEED_TodoCalendar_MSG_SIMPLELISTCOL1TEXT = '<spring:message code="feed.todocalendar.SIMPLELISTCOL1TEXT"/>';
	var _FEED_TodoCalendar_MSG_SIMPLELISTCOL2TEXT = '<spring:message code="feed.todocalendar.SIMPLELISTCOL2TEXT"/>';
	var _FEED_TodoCalendar_MSG_SIMPLELISTCOL3TEXT = '<spring:message code="feed.todocalendar.SIMPLELISTCOL3TEXT"/>';
	var _FEED_TodoCalendar_MSG_SIMPLELISTCOL4TEXT = '<spring:message code="feed.todocalendar.SIMPLELISTCOL4TEXT"/>';
	
	var _FEED_TodoCalendar_MSG_NOTODO = '<spring:message code="basic.msg.notodo"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/view/TodoCalendarList.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/view/TodoCalendarList.jsx"></script>
  </c:otherwise>
</c:choose>
