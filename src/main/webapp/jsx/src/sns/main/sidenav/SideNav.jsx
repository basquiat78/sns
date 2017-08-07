	function reGroupList(){
		var unmount = React.unmountComponentAtNode(document.getElementById('mygrp'));
		if(unmount)
			React.render(<MyGroup/>, document.getElementById('mygrp'));
	}

	function reTodoList(){
		var unmount = React.unmountComponentAtNode(document.getElementById('myTodoList')); 
		if(unmount)
			React.render(<TodoList/>, document.getElementById('myTodoList'));
	}

	function reTagCountList(){
		var unmount = React.unmountComponentAtNode(document.getElementById('tagCloudList')); 
		if(unmount)
			React.render(<TagCloudList/>, document.getElementById('tagCloudList'));
	}

	//Feed 오른쪽 영역
	var SideNav  = React.createClass({
		getInitialState : function () {
	        return { gList : null, groupFollowerList: [] };
        },

		getSideMenuList: function(){

			React.render(<MyGroup/>, document.getElementById('mygrp'));
			if(this.props.mainType=='main') {
				React.render(<RecentActList baseurl={contextpath + _SideNav_MEMBER_WIDGET_ACTIVITY}/>, document.getElementById('recentAct'));
			} else if(this.props.mainType=='group') {
				console.log(this.props.currGroupId);
				if(this.props.currGroupId !== undefined)
					React.render(<RecentActList currGroupId={this.props.currGroupId} baseurl={contextpath + _SideNav_GROUP_WIDGET_ACTIVITY}/>, document.getElementById('recentAct'));
				
			}

			React.render(<TodoList/>, document.getElementById('myTodoList'));
			React.render(<TagCloudList/>, document.getElementById('tagCloudList'));
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
			React.render(<FeedFavoriteTab/>, document.getElementById('selectTabByFavorite'));
			
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
				<a className='anchor-ico' title={_SideNav_MSG_SYSMGRHOVERTITLE}><span className='ico-img ico-system' onClick={this.openSystemMenu}>Settings</span></a>
				: '';
	    	return (
				<div className='lay-snb' id='div_lay_snb'>
					<div className='snb-content'>
                    	<div className='depth1-header'>
                        	/* <h2 className='depth1-menu-title'>Social Network</h2> */
                    	</div>

                    	<div className='menu-page-set'>
                        	<a className='anchor-ico' title='home'><span className='ico-img ico-home' onClick={this.comeBackHome}>Home</span></a>
	                        <a className='anchor-ico active' title={_SideNav_MSG_FAVORITEHOVERTITLE}><span className='ico-img ico-favorite' onClick={this.openFeedFavoritePop}>Favorite</span></a>
    	                    <a className='anchor-ico' title={_SideNav_MSG_CONFIGLINKHOVERTITLE}><span className='ico-img ico-setting' onClick={this.openMemberConfigPop}>Settings</span></a>
							{sysAdmPart}
        	            </div>
						
						<div id='mygrp'></div>
						<div id='recentAct'></div>
						<div id='myTodoList'></div>
						<div id='tagCloudList' style={{'marginBottom':'10px'}}></div>
						

            		 	<a className='banner' target='_blank' href='http://sncsp.eagleoffice.co.kr/G/G00015/D00001/SNSWeb.pdf?Web=1'><span className='banner-manualnguide'>{_SideNav_basic_manual} Go</span></a>
            		</div>
					<Footer/>
        		</div>
			);
		}
	}); 