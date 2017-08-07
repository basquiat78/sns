<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<% org.uengine.sns.feed.FeedRestful frfFF = new org.uengine.sns.feed.FeedRestful();%>
<script type="text/javascript">
	
	var _FeedFavorite_session_memberId  = '<%=session.getAttribute("memberId")%>';
	var _FeedFavorite_BASE_FEED  		= contextpath + '<%=frfFF.BASE_FEED%>';
	
	var _FEED_FeedFavorite_MSG_TITLE = '<spring:message code="feed.bookmark.TITLE"/>';
	var _FEED_FeedFavorite_MSG_MORE = '<spring:message code="feed.bookmark.MORE"/>';
	
</script>

<spring:eval var="uiMode" expression="@conf.getProperty('ui.run.mode')" />
<c:choose>
  <c:when  test="${uiMode eq 'js'}">
	<script type="text/javascript" src="../jsx/build/sns/feed/FeedFavorite.js"></script>
  </c:when >
  <c:otherwise>
	<script type="text/jsx" src="../jsx/src/sns/feed/FeedFavorite.jsx"></script>
  </c:otherwise>
</c:choose>

<div class="click_popup_wrap ,hidden" style="display: none;" id='FeedFavoritePop'>
	<div class="pop-modalwindow-header">
		<div class="pop-modalwindow-title"><spring:message code="feed.bookmark.TITLE"/></div>
        <div class="pop-modalwindow-header-option">
        	<a class="ico-anchor"><span class="ico-img ico-close" onclick="closeFeedFavoritePop()"><spring:message code="feed.bookmark.CLOSEBTNTEXT"/></span></a>
    	</div>
	</div>
	<div class="click_popup" style="width:824px;">
		<div>
			<div id='FeedFavoriteTabPopup' class='lay-contents-area lay-conteont-margin' style='height:650px; overflow-y:auto;'></div>
		</div>
	</div>
</div>
