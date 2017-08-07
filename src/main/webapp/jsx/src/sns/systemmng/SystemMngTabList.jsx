var Dummy = React.createClass({
	render: function() {
		return (
			<div/>
		);}
});

var SystemMngTabList = React.createClass({
		
			componentDidMount: function() {
				$('.btn_feedmore').hide();
				
				$(window).off('scroll');

				React.unmountComponentAtNode(document.getElementById('selectTabByFavorite'));
				React.unmountComponentAtNode(document.getElementById('selectTabByIntegration'));
				React.unmountComponentAtNode(document.getElementById('selectTabByNoti'));
				React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
				
				React.render(<FeedSearchBox />, document.getElementById('SystemSearchBox'));
			},
			
			componentWillUnmount: function() {
				//$('#selectTabBySession').show();
				React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
			},	

			feedTab: function() {
				React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
				React.render(<FeedSearchBox />, document.getElementById('SystemSearchBox'));
				retouchStyle('#feedTab');
			},

			groupTab: function() {
				React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
				React.render(<GroupSearchBox />, document.getElementById('SystemSearchBox'));
				retouchStyle('#groupTab');
			},

			tenantTab: function() {
				React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
				React.render(<SystemTenantList />, document.getElementById('SystemSearchBox'));
				retouchStyle('#tenantTab');
			},


			render: function() {
				return (
					<div>
						<div id="systemMng" className="malgun13" style={{'fontWeight':'bold', 'color':'#131313', 'fontSize':'20px'}}>
							{_SystemMgrTabList_MSG_TITLE}
						</div>
						<div className='search_tabstyle'>
							<ul className='malgun13'>
	            				<li id='feedTab' 	 onClick={this.feedTab} 	className='tab_on' style={{'color':'#fe630f', 'fontWeight':'bold'}}>{_SystemMgrTabList_MSG_TAB1TEXT}</li>
	            				<li id='groupTab' 	 onClick={this.groupTab} 	className='tab_off'>{_SystemMgrTabList_MSG_TAB2TEXT}</li>
	            				<li id='tenantTab' 	 onClick={this.tenantTab} 	className='tab_off last_tab'>{_SystemMgrTabList_MSG_TAB3TEXT}</li>
	        				</ul>
	        				<div id='SystemSearchBox'></div>
	        			</div>
	        		</div>
           		);
			}
		});