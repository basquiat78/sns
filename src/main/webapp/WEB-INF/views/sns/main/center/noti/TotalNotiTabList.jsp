<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% org.uengine.sns.notice.NoticeRestful noticeRestFul =  new org.uengine.sns.notice.NoticeRestful();%>

<style>

.tnTableBox {claer:both; position:relative;}
.tnTableBox table {border:1px solid #e0e0e0; width:100%; margin-top:20px;}
.tnTableBox table thead {height:30px; background:#f5f5f5;  }
/*0908수정_height 값 추가*/
.tnTableBox table thead th {border-right:1px solid #e0e0e0; border-bottom:1px solid #e0e0e0; height:29px;}
/*0908수정_height 값 추가*/
.tnTableBox table tbody td {line-height:60px; text-align:center; border-bottom:1px solid #e0e0e0;}
/*0909수정_vertical-align, margin-right 값 추가*/
.tnTableBox table tbody td span.pic_small {border-radius:50%;display:inline-block; text-align:left; text-indent:-9999px; background:url(../images/pic_small.png) no-repeat; width:40px; height:40px; vertical-align:middle; margin-right:10px;}
/*0909수정_vertical-align, margin-right 값 추가*/
.tnTableBox table tbody td.pic_name { cursor:pointer; text-align:left;}
.tnTableBox table tbody td.pic_name:hover {text-decoration:underline; color:#333;}
.tnTableBox table tbody td.pic_email {cursor:pointer; text-align:left; padding-left:20px;}
.tnTableBox table tbody td.pic_email:hover {text-decoration:underline; color:#333;}
.tnTableBox table tbody td.nobottom {border-bottom:0;}
/*0909수정 text-align -> vertical-align으로 수정*/
.tnTableBox table tbody td span.btn_join {display:inline-block; background:url(../images/btn_join_off.png) no-repeat; width:68px; height:27px; cursor:pointer; text-indent:-9999px; vertical-align:middle;}
/*0909수정 text-align -> vertical-align으로 수정*/
.tnTableBox table tbody td span.btn_join:hover {background:url(../images/btn_join_over.png) no-repeat; width:68px; height:27px;}

.tnTableBox table tbody tr td.malgun13 {} 
.tnTableBox table tbody tr td.malgun13 ul { float:left; width:100%; text-align:center; cursor:pointer; }
.tnTableBox table tbody tr td.malgun13 ul li.icon_plus {vertical-align:middle; display:inline-block; width:18px; height:18px; line-height:24px;  background:url(../images/btn_feedselect_off.png) left top no-repeat; margin-right:5px;}
.tnTableBox table tbody tr td.malgun13 ul li.admini_txt {vertical-align:middle; display:inline-block; line-height:24px; color:#a9a4a4;}
.tnTableBox table tbody tr td.malgun13 ul li.admini_txt:hover {color:#878484;}

.tnTableBox table tbody td {line-height : 0px; padding:10px 0;}
</style>

<script type="text/javascript">
	var _TotalNotiTabList_MSG_TOTALNOTITITLE = '<spring:message code="total.noti.TOTALNOTITITLE"/>';
	var _TotalNotiTabList_MSG_SEARCHRESULTTEXT1 = '<spring:message code="total.noti.COLUMN1TEXT"/>';
	var _TotalNotiTabList_MSG_SEARCHRESULTTEXT2 = '<spring:message code="total.noti.COLUMN2TEXT"/>';
	var _TotalNotiTabList_MSG_SEARCHRESULTTEXT3 = '<spring:message code="total.noti.COLUMN3TEXT"/>';
	var _TotalNotiTabList_NOTI_TOTAL_BYUSERID  = contextpath + '<%=noticeRestFul.NOTI_TOTAL_BYUSERID%>';
	var noticeId = 0;
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/main/center/noti/CorrectTotalNotiTabList.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/main/center/noti/CorrectTotalNotiTabList.jsx"></script>
	</c:otherwise>
</c:choose>
