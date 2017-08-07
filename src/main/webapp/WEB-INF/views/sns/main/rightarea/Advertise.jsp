<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
	<c:when  test="${uiMode eq 'js'}">
		<script type="text/javascript" src="../jsx/build/sns/main/rightarea/Advertise.js"></script>
	</c:when >
	<c:otherwise>
		<script type="text/jsx" src="../jsx/src/sns/main/rightarea/Advertise.jsx"></script>
	</c:otherwise>
</c:choose>