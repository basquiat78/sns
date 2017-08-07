	function initSns(option) {
		var baseurl = contextpath + _GroupWidget_BASE_MEMBER + '/' + _GroupWidget_session_memberId;
		
		ajaxGet(baseurl, {} , getSNSCurrMemberInfo, option);
	}
	
	function renderSideNavigator(data, type, option) {
	
		unmountSideNavigator();
		
		var isSysAdmin = data.isSysAdmin;
		isSysAd = isSysAdmin;
		if(isSysAdmin == '1') {
			$('#anchorSystemAdmin').remove();
			var anchorLinkHtml = '<a class="anchor-ico" id="anchorSystemAdmin" title="' + _SideNav_MSG_SYSMGRHOVERTITLE + '"><span class="ico-img ico-system" onClick="openSystemMenu()">Settings</span></a>';
			$('#menu-page-set').append(anchorLinkHtml);
		}
		
		//React.render(<RecentActList baseurl={contextpath + _SideNav_MEMBER_WIDGET_ACTIVITY}/>, document.getElementById('recentAct'));
		React.render(<RecentActList currGroupId={_GroupWidget_group_groupId} baseurl={contextpath + _SideNav_GROUP_WIDGET_ACTIVITY}/>, document.getElementById('recentAct'));
		
		React.render(<TodoList/>, document.getElementById('myTodoList'));
		React.render(<TagCloudList/>, document.getElementById('tagCloudList'));
		React.render(<MyGroup/>, document.getElementById('mygrp'));
		
		Reloader.reloadObservers({'type':'group', 'groupId' : _GroupWidget_group_groupId, 'isGroupChange':'false'});
		
	}
	
	function unmountSideNavigator(option) {
	
		_.map([1,2,3,4], function(num){
			switch (num) {
  				case 1 : 
  						React.unmountComponentAtNode(document.getElementById('mygrp'));
               			break;
  				case 2 : 
  						React.unmountComponentAtNode(document.getElementById('recentAct'));
               			break;
  				case 3 : 
  						React.unmountComponentAtNode(document.getElementById('myTodoList'));
               			break;
               	case 4 : 
  						React.unmountComponentAtNode(document.getElementById('tagCloudList'));
               			break;		
			}		
		});
	}

	function renderRightLevel(type, option) {
		if(option !== undefined && option == 'init') {
			React.render(<RightContentArea mainType={type}/>, document.getElementById('RightContentArea'));
		} else {
			if(contentsType == 'USER') {
				//contentsType = 'USER';
				React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				React.render(<MsAddress/>, document.getElementById('RightUpLevel'));
				
				Reloader.reloadObservers('reload');
			} else if (contentsType == 'GROUP') {
				React.unmountComponentAtNode(document.getElementById('RightContentArea'));
				React.render(<RightContentArea mainType={type} groupId={_GroupWidget_group_groupId}/>, document.getElementById('RightContentArea'));
			}
			
			//Reloader.reloadObservers('reload');
		}
	}
	
	function getSNSCurrMemberInfo(data, option) {
		//console.log(data);
		var group = {"groupId": _GroupWidget_group_groupId, "groupName":_GroupWidget_group_groupName}
		//var type = 'main';
		var type = '';
		if(contentsType == 'GROUP') {
			type = 'group';
		} else {
			type = 'main';
		}
		
		//var type = option;
		_.map([1,2,3], function(num){
			switch (num) {
  				case 1 : 
  						renderSideNavigator(data, type, option);
  						$('#menu-page-set').show();
  						$('.banner').show();
  						$('.lay-footer').show();
               			break;
  				case 2 :
  						renderRightLevel(type, option); 
               			break;
  				case 3 : 
  						React.render(<MainContents mainType={type} detailFeedId={'0'} groupInfo={group} />, document.getElementById('MainContents'));
               			break;
			}		
		});
		
	}
	
	function comeBackHome(){
		contentsType = 'USER';
		gSMainType = "main";
		openMainBody();
		React.unmountComponentAtNode(document.getElementById('MainContents'));
		loadDttm = new Date().getTime();
		initSns('home');
		//initSns('main');
	}
	
	function openSystemMenu (){
	
			$('#feed_favorite_back_btn').remove();
			$("#feedGate").hide();
			$("#selectTabByNoti").hide();
			$("#selectTabByIntegration").hide();
			$("#selectTabByFavorite").hide();
			$("#pItgSch").val("");

			viewType='SYSTEM';
			
			React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			React.render(<Dummy/>, document.getElementById('selectTabBySession'));
			$("#selectTabBySession").hide();
			
			React.unmountComponentAtNode(document.getElementById('selectTabBySystem'));
			$('#selectTabBySystem').show();
			uninstall('sysmgr');
			React.render(<SystemMngTabList/>, document.getElementById('selectTabBySystem'));
	}
	
	function openFeedFavorite() {
	
		viewType='FAVORITE';
		openIntegrationBody();
			
		$('.btn_feedfavoritemore').hide();
		$('.img_feedfavoritemore').hide();
		$('#feed_favorite_back_btn').remove();
		$("#feedGate").hide();
		$("#selectTabBySession").hide();
		$('#selectTabBySystem').hide();
		$("#selectTabByNoti").hide();
		$("#selectTabByIntegration").hide();
			
		React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			
		$('#selectTabByFavorite').show();
		$FAVORITE_WORKING_ON = 'ON';
		$FAVORITE_SCROLLING_ONOFF === 'ON'
			
		React.unmountComponentAtNode(document.getElementById('selectTabByFavorite'));
		React.render(<FeedFavoriteTab/>, document.getElementById('selectTabByFavorite'));		
	}
	
	$( document ).ready(function() {
		//contentsType = 'USER';
		contentsType = 'GROUP';
		loadDttm = new Date().getTime();
		//initSns('init');
		initSns('group');
	});