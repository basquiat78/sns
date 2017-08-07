<%--
	response.reset();
	response.setHeader("Content-type","application/xls");
	response.setHeader("Content-Disposition", "attachment; filename=feeddownload.xls");
	response.setHeader("Content-Description", "Generated Data");
--%>
<%@ page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="application/vnd.ms-excel;charset=UTF-8">
<%
	response.setHeader("Content-type","application/xls");
	response.setHeader("Content-Disposition", "inline; filename=feeddownload_" +new java.sql.Date(System.currentTimeMillis()) + "_.xls");   
	response.setHeader("Content-Description", "JSP Generated Data");
%>
<title></title>
<style type="text/css">
	body {padding : 20px;}
	div#totalWrapper h2 {text-align:center;}
	table {border-top:1px solid #000; border-right:1px solid #000; width:100%; margin:20px auto;}
	table tr td, table tr th {border-bottom : 1px solid #000; border-left:1px solid #000; padding:5px;}
	table thead th {background-color:#FE630F; color:#FFF; }
	table thead th.writer {width: 100px;}
	table thead th.writedate {width : 200px;}
	table thead th.follower {width:150px;}
	table tbody tr td {background-color:#eee;}
	table tbody tr.parent td {background-color:#FFF; }
</style>
</head>
<body>
<div id="totalWrapper">
	<h2>${groupName}</h2>
	<table cellpadding='0' cellspacing='0'>
		<thead>
			<tr>
				<th>&nbsp;<spring:message code="feed.download.TITLE"/></th>
				<th class="writer"><spring:message code="feed.download.WRITER"/></th>
				<th class="writedate"><spring:message code="feed.download.WRITEDATE"/></th>
				<th class="follower"><spring:message code="feed.download.FOLLOWERS"/></th>
			</tr>
		</thead>
		<tbody>
			<c:choose>
				<c:when test="${empty feeddownloadlist}">
					<tr>
						<td colspan="4" style="text-align:center;"><spring:message code="feed.download.NOFEEDMSG"/></td>
					</tr>
				</c:when>
				<c:when test="${not empty feeddownloadlist}">
					<c:forEach var="fdl" items="${feeddownloadlist}" varStatus="status">
						<tr <c:if test="${fdl.FEED_PER_SEQ == '0'}">class="parent"</c:if>>
							<td>${fdl.FEED_TITLE}</td>
							<td>${fdl.MEMBER_NAME}</td>
							<td>${fdl.REGDTTM}</td>
							<td>${fdl.MEMBERFOLLOWLIST}</td>
						</tr>
					</c:forEach>
				</c:when>
			</c:choose>
		</tbody>
	</table>
</div>
</body>
</html>