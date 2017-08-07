<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfTagCloud = new  org.uengine.sns.feed.FeedRestful();%>


<script type="text/javascript">


var _TagCloud_TAG_COUNT  = '<%=frfTagCloud.TAG_COUNT%>';
var _TagCloud_BASIC_HASHTAG  = '<spring:message code="basic.hashtag" htmlEscape="true" />';

</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
  		<script type="text/javascript" src="../jsx/build/sns/main/sidenav/TagCloud.js"></script>
  </c:when >
  <c:otherwise>
        <script type="text/jsx" src="../jsx/src/sns/main/sidenav/TagCloud.jsx"></script>
  </c:otherwise>
</c:choose>
