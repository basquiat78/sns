<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<spring:eval var="opMode" expression="@conf.getProperty('operation.mode')" />
<c:choose>
	<c:when  test="${opMode eq 'stage'}">
		<c:redirect context="/" url="/"/>
	</c:when >
	<c:otherwise>
		
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	
	<title>uEngineSolutions SNS</title>
	
	<link rel="shortcut icon" href="../images/favicon.ico" />
	
<script>var contextpath = '${pageContext.request.contextPath}';</script>
<script src="<c:url value='/js/common/jquery/jquery-1.11.3.min.js' />"></script>
<script src="<c:url value='/js/common/jquery/jquery-ui.min.js' />"></script>
<script src="<c:url value='/js/common/util/ajaxutil.js' />" charset="UTF-8"></script>

	<script>
	
	</script>
</head>


<body>

<br/><br/><br/>
	<form id="frm" name="frm" action="${pageContext.request.contextPath}/login.do" method="post">

<table>
<tr>
	<td>
		Login ID &nbsp;: <input type="text" name="loginId" value="" placeholder="본인 이름을 입력하세요." size="30" />
	</td>
</tr>
<tr>
	<td>
		Password : <input type="password" name="loginPassword" value="" placeholder="Default Password 는 1 입니다." size="30" />
	</td>
</tr>
<tr>
	<td>
		<input type="button" value="login" onclick="submit()" />
	</td>
</tr>
</table>
	</form>
	opMode : ${opMode} ,
	uiMode : ${uiMode} ,
	language : ${pageContext.response.locale} ,
	short language : ${pageContext.response.locale.language} ,
	https : ${pageContext.request.secure}
</body>

</html>

	</c:otherwise>
</c:choose>