
	var Container = React.createClass({displayName: "Container",
		getInitialState : function() {
			return { currMemberInfo : null };
		},

		componentWillUnmount: function() {
			React.unmountComponentAtNode(document.getElementById('Container'));
		},
	
		getCurrMemberInfo : function(data) {
			this.setState({currMemberInfo : data});
			React.render(React.createElement(SideNav, {mainType: 'main', currMemberInfo: this.props.currMemberInfo}), document.getElementById('SideNav'));
			React.render(React.createElement(MainContents, {mainType: 'main', detailFeedId: '0'}), document.getElementById('MainContents'));
			React.render(React.createElement(RightContentArea, {mainType: 'main'}), document.getElementById('RightContentArea'));
			React.render(React.createElement(Container, {currMemberInfo: this.state.currMemberInfo}), document.getElementById('Container'));
		},
	
		componentDidMount: function() {
			
			var baseurl = contextpath + _MemberWidget_BASE_MEMBER + '/' + _MemberWidget_session_memberId;
			ajaxGet(baseurl, {} , this.getCurrMemberInfo);
		
		},

		componentWillUnmount: function() {
			React.unmountComponentAtNode(document.getElementById('SideNav'));
			React.unmountComponentAtNode(document.getElementById('MainContents'));
			React.unmountComponentAtNode(document.getElementById('RightContentArea'));
		},

		render: function() {
	    	return (
				React.createElement("div", {className: "lay-container-wrap", style: {'height':'100%'}}, 
					React.createElement("div", {id: "SideNav"}), 
					React.createElement("div", {className: "lay-content lay-static-content"}, 
            			React.createElement("div", {className: "lay-col1", id: "div_lay_col1"}, 
            				React.createElement("div", {className: "lay-contents-area lay-contents-margin"}, 
								React.createElement("div", {id: "MainContents", style: {'borderTop':'0'}})
							)
						), 

						React.createElement("div", {className: "lay-col2", id: "div_lay_col2"}, 
							React.createElement("div", {id: "RightContentArea", className: "rightarea_wrap"})
            			)
					)
				)
			);
		}
	});

	var HomeSNS = React.createClass({displayName: "HomeSNS",
		getInitialState : function() {
			return { currMemberInfo : null };
		},

		componentDidMount: function() {
			var baseurl = contextpath + _MemberWidget_BASE_MEMBER + '/' + _MemberWidget_session_memberId;
			ajaxGet(baseurl, {} , this.getCurrMemberInfo);
			
		},

		componentWillUnmount: function() {
			React.unmountComponentAtNode(document.getElementById('Container'));
		},

		getCurrMemberInfo : function(data) {
			this.setState({
				currMemberInfo : data
			});
			React.render(React.createElement(Container, {currMemberInfo: this.state.currMemberInfo}), document.getElementById('Container'));
		},

		render: function() {
	    	return (React.createElement("div", {id: "Container"}));
		}
	});
	
	function initSns(option) {
		var baseurl = contextpath + _MemberWidget_BASE_MEMBER + '/' + _MemberWidget_session_memberId;
		ajaxGet(baseurl, {} , getSNSCurrMemberInfo, option);
	}
	
	function renderSideNavigator(data, type, option) {
	
		if(option !== undefined && option == 'init') {
			unmountSideNavigator();
	
			var isSysAdmin = data.isSysAdmin;
			isSysAd = isSysAdmin;
			if(isSysAdmin == '1') {
				$('#anchorSystemAdmin').remove();
				var anchorLinkHtml = '<a class="anchor-ico" id="anchorSystemAdmin" title="' + _SideNav_MSG_SYSMGRHOVERTITLE + '"><span class="ico-img ico-system" onClick="openSystemMenu()">Settings</span></a>';
				$('#menu-page-set').append(anchorLinkHtml);
			}
			
			React.render(React.createElement(RecentActList, {baseurl: contextpath + _SideNav_MEMBER_WIDGET_ACTIVITY}), document.getElementById('recentAct'));
			React.render(React.createElement(TodoList, null), document.getElementById('myTodoList'));
			React.render(React.createElement(TagCloudList, null), document.getElementById('tagCloudList'));
			React.render(React.createElement(MyGroup, null), document.getElementById('mygrp'));
		} else {
			//Reloader.reloadObservers('reload');
		}
		
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
			React.render(React.createElement(RightContentArea, {mainType: type}), document.getElementById('RightContentArea'));
		} else {
			if(contentsType == 'GROUP') {
				contentsType = 'USER';
				React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				React.render(React.createElement(MsAddress, null), document.getElementById('RightUpLevel'));
			}
			
			Reloader.reloadObservers('reload');
		}
	}
	
	function getSNSCurrMemberInfo(data, option) {
		
		var type = 'main';
		var MCtype = 'main';
		if(gSMainType == 'totalNoti')
			MCtype = 'totalNoti';
		else MCtype = 'main';
		
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
  						React.render(React.createElement(MainContents, {mainType: MCtype, detailFeedId: '0'}), document.getElementById('MainContents'));
               			break;
			}		
		});
		
	}
	
	function comeBackHome(){
		gSMainType = "main";
		openMainBody();
		React.unmountComponentAtNode(document.getElementById('MainContents'));
		loadDttm = new Date().getTime();
		initSns('home');
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
			React.render(React.createElement(Dummy, null), document.getElementById('selectTabBySession'));
			$("#selectTabBySession").hide();
			
			React.unmountComponentAtNode(document.getElementById('selectTabBySystem'));
			$('#selectTabBySystem').show();
			uninstall('sysmgr');
			React.render(React.createElement(SystemMngTabList, null), document.getElementById('selectTabBySystem'));
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
		React.render(React.createElement(FeedFavoriteTab, null), document.getElementById('selectTabByFavorite'));
			
	}
	
	
	$( document ).ready(function() {
		contentsType = 'USER';
		loadDttm = new Date().getTime();
		
		var v = 'init';
		
		initSns(v);
	});