var Dummy = React.createClass({displayName: "Dummy",
	render: function() {
		return (
			React.createElement("div", null)
		);}
});

var SystemMngTabList = React.createClass({displayName: "SystemMngTabList",
		
			componentDidMount: function() {
				$('.btn_feedmore').hide();
				
				$(window).off('scroll');

				React.unmountComponentAtNode(document.getElementById('selectTabByFavorite'));
				React.unmountComponentAtNode(document.getElementById('selectTabByIntegration'));
				React.unmountComponentAtNode(document.getElementById('selectTabByNoti'));
				React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
				
				React.render(React.createElement(FeedSearchBox, null), document.getElementById('SystemSearchBox'));
			},
			
			componentWillUnmount: function() {
				//$('#selectTabBySession').show();
				React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
			},	

			feedTab: function() {
				React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
				React.render(React.createElement(FeedSearchBox, null), document.getElementById('SystemSearchBox'));
				retouchStyle('#feedTab');
			},

			groupTab: function() {
				React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
				React.render(React.createElement(GroupSearchBox, null), document.getElementById('SystemSearchBox'));
				retouchStyle('#groupTab');
			},

			tenantTab: function() {
				React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
				React.render(React.createElement(SystemTenantList, null), document.getElementById('SystemSearchBox'));
				retouchStyle('#tenantTab');
			},


			render: function() {
				return (
					React.createElement("div", null, 
						React.createElement("div", {id: "systemMng", className: "malgun13", style: {'fontWeight':'bold', 'color':'#131313', 'fontSize':'20px'}}, 
							_SystemMgrTabList_MSG_TITLE
						), 
						React.createElement("div", {className: "search_tabstyle"}, 
							React.createElement("ul", {className: "malgun13"}, 
	            				React.createElement("li", {id: "feedTab", 	 onClick: this.feedTab, 	className: "tab_on", style: {'color':'#fe630f', 'fontWeight':'bold'}}, _SystemMgrTabList_MSG_TAB1TEXT), 
	            				React.createElement("li", {id: "groupTab", 	 onClick: this.groupTab, 	className: "tab_off"}, _SystemMgrTabList_MSG_TAB2TEXT), 
	            				React.createElement("li", {id: "tenantTab", 	 onClick: this.tenantTab, 	className: "tab_off last_tab"}, _SystemMgrTabList_MSG_TAB3TEXT)
	        				), 
	        				React.createElement("div", {id: "SystemSearchBox"})
	        			)
	        		)
           		);
			}
		});