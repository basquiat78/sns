<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

	<jsp:include page="../config/MemberConfigTabList.jsp" flush="true"/>
	<jsp:include page="../config/GroupConfigTabList.jsp" flush="true"/>
	<jsp:include page="../feed/FeedFavorite.jsp" flush="true"/>
	<jsp:include page="../feed/FeedTag.jsp" flush="true"/>
	<jsp:include page="../integration/IntegrationTabList.jsp" flush="true"/>
	<jsp:include page="../feed/FeedNotice.jsp" flush="true"/>
	<jsp:include page="../feed/FeedApp.jsp" flush="true"/>
	<jsp:include page="../feed/Feed.jsp" flush="true"/>
	<jsp:include page="../config/SharepointDocList.jsp" flush="true"/>
	<jsp:include page="../config/SharepointFileList.jsp" flush="true"/>
	<jsp:include page="../main/center/noti/TotalNotiTabList.jsp" flush="true"/>
	
	
	<script type="text/javascript">
	var _MainLayer_COMMON_MSG_ConsoleBtnApprove = '<spring:message code="main.common.consolebtn.Approve"/>';
	var _MainLayer_COMMON_MSG_ConsoleBtnRefuse = '<spring:message code="main.common.consolebtn.Refuse"/>';
	var _MainLayer_COMMON_MSG_ConsoleBtnConfirm = '<spring:message code="main.common.consolebtn.Confirm"/>';
	var _MainLayer_COMMON_MSG_ConsoleBtnCancel = '<spring:message code="main.common.consolebtn.Cancel"/>';
	</script>
	
	<%@include file="../systemmng/SystemMngTabList.jsp"%>
	<%@include file="../popup/ConsolePop.jsp"%>
	<%@include file="sidenav/SideNav.jsp"%>
	<%@include file="center/MainContents.jsp"%>
	<%@include file="rightarea/RightArea.jsp"%>
	<%@include file="MultiFileUpload.jsp"%>
	<jsp:include page="../footer/footer.jsp" flush="true"/>
	