<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

	<script>
	var componentConfig = {
			allowedFiletypes: ['.jpg', '.png', '.gif'],
			showFiletypeIcon: false,
			postUrl: contextpath + '/sns/common/util/ajaxupload'
	};
	</script>

<script type="text/javascript">
var _MultiFileUpload_MSG_REMOVEFILEBTNTEXT = '<spring:message code="basic.main.MultiFileUpload.REMOVEFILEBTNTEXT"/>';
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/main/MultiFileUpload.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/main/MultiFileUpload.jsx"></script>
  </c:otherwise>
</c:choose>
