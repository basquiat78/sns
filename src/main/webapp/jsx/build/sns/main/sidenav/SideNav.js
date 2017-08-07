	function reGroupList(){
		var unmount = React.unmountComponentAtNode(document.getElementById('mygrp'));
		if(unmount)
			React.render(React.createElement(MyGroup, null), document.getElementById('mygrp'));
	}

	function reTodoList(){
		var unmount = React.unmountComponentAtNode(document.getElementById('myTodoList')); 
		if(unmount)
			React.render(React.createElement(TodoList, null), document.getElementById('myTodoList'));
	}

	function reTagCountList(){
		var unmount = React.unmountComponentAtNode(document.getElementById('tagCloudList')); 
		if(unmount)
			React.render(React.createElement(TagCloudList, null), document.getElementById('tagCloudList'));
	}

	//Feed 오른쪽 영역
	var SideNav  = React.createClass({displayName: "SideNav",
		getInitialState : function () {
	        return { gList : null, groupFollowerList: [] };
        },

		getSideMenuList: function(){

			React.render(React.createElement(MyGroup, null), document.getElementById('mygrp'));
			if(this.props.mainType=='main') {
				React.render(React.createElement(RecentActList, {baseurl: contextpath + _SideNav_MEMBER_WIDGET_ACTIVITY}), document.getElementById('recentAct'));
			} else if(this.props.mainType=='group') {
				console.log(this.props.currGroupId);
				if(this.props.currGroupId !== undefined)
					React.render(React.createElement(RecentActList, {currGroupId: this.props.currGroupId, baseurl: contextpath + _SideNav_GROUP_WIDGET_ACTIVITY}), document.getElementById('recentAct'));
				
			}

			React.render(React.createElement(TodoList, null), document.getElementById('myTodoList'));
			React.render(React.createElement(TagCloudList, null), document.getElementById('tagCloudList'));
		},

		componentWillUnmount: function() {
			React.unmountComponentAtNode(document.getElementById('mygrp'));
			React.unmountComponentAtNode(document.getElementById('recentAct'));
			React.unmountComponentAtNode(document.getElementById('myTodoList'));
			React.unmountComponentAtNode(document.getElementById('tagCloudList'));
		},

		componentDidMount: function() {
			this.getSideMenuList();
		},

		openMemberConfigPop:function(){
			openMemberConfigPop();
		},
		openFeedFavoritePop : function() {
			viewType='FAVORITE';
			
			$('#FavoriteListBack').hide();
			$('#todoFeedBackBtn').remove();
			$("#selectTabBySystem").hide();
			$("#toTalNotiBack").hide();
			
			$TODO_SIMPLE_WORKING_ON = 'OFF';
			$FEED_SCROLLING_ONOFF = 'OFF';
			
			/*React.unmountComponentAtNode(document.getElementById('selectTabByIntegration'));
			React.unmountComponentAtNode(document.getElementById('selectTabByNoti'));
			React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));*/
			
			$('.btn_feedfavoritemore').hide();
			$('#feed_favorite_back_btn').remove();
			$("#feedGate").hide();
			$("#selectTabBySession").hide();
			$("#selectTabByNoti").hide();
			$("#selectTabByIntegration").hide();
			
			//React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			
			$('#selectTabByFavorite').show();
			
			$FAVORITE_WORKING_ON = 'ON';
			$FAVORITE_SCROLLING_ONOFF === 'ON'
			
			React.unmountComponentAtNode(document.getElementById('selectTabByFavorite'));
			React.render(React.createElement(FeedFavoriteTab, null), document.getElementById('selectTabByFavorite'));
			
		},

		comeBackHome: function(){
			gSMainType = "main";
			openMainBody();
			//React.unmountComponentAtNode(document.getElementById('WholeScreen'));
			//React.unmountComponentAtNode(document.getElementById('Container'));
			React.unmountComponentAtNode(document.getElementById('SideNav'));
			React.unmountComponentAtNode(document.getElementById('MainContents'));
			React.unmountComponentAtNode(document.getElementById('RightContentArea'));
			loadDttm = new Date().getTime();
			//React.render(<HomeSNS mainType={'main'}/>, document.getElementById('WholeScreen'));
			initSns();
		},

		openSystemMenu: function(){
			
		},

		render: function() {
			var isSysAdmin = this.props.currMemberInfo.isSysAdmin, sysAdmPart = '';
			isSysAd = isSysAdmin;
			sysAdmPart = (isSysAdmin == '1') ?
				React.createElement("a", {className: "anchor-ico", title: _SideNav_MSG_SYSMGRHOVERTITLE}, React.createElement("span", {className: "ico-img ico-system", onClick: this.openSystemMenu}, "Settings"))
				: '';
	    	return (
				React.createElement("div", {className: "lay-snb", id: "div_lay_snb"}, 
					React.createElement("div", {className: "snb-content"}, 
                    	React.createElement("div", {className: "depth1-header"}, 
                        	"/* ", React.createElement("h2", {className: "depth1-menu-title"}, "Social Network"), " */"
                    	), 

                    	React.createElement("div", {className: "menu-page-set"}, 
                        	React.createElement("a", {className: "anchor-ico", title: "home"}, React.createElement("span", {className: "ico-img ico-home", onClick: this.comeBackHome}, "Home")), 
	                        React.createElement("a", {className: "anchor-ico active", title: _SideNav_MSG_FAVORITEHOVERTITLE}, React.createElement("span", {className: "ico-img ico-favorite", onClick: this.openFeedFavoritePop}, "Favorite")), 
    	                    React.createElement("a", {className: "anchor-ico", title: _SideNav_MSG_CONFIGLINKHOVERTITLE}, React.createElement("span", {className: "ico-img ico-setting", onClick: this.openMemberConfigPop}, "Settings")), 
							sysAdmPart
        	            ), 
						
						React.createElement("div", {id: "mygrp"}), 
						React.createElement("div", {id: "recentAct"}), 
						React.createElement("div", {id: "myTodoList"}), 
						React.createElement("div", {id: "tagCloudList", style: {'marginBottom':'10px'}}), 
						

            		 	React.createElement("a", {className: "banner", target: "_blank", href: "http://sncsp.eagleoffice.co.kr/G/G00015/D00001/SNSWeb.pdf?Web=1"}, React.createElement("span", {className: "banner-manualnguide"}, _SideNav_basic_manual, " Go"))
            		), 
					React.createElement(Footer, null)
        		)
			);
		}
	}); 