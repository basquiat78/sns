
	var groupFollowerList = [];
	var feedFileVo = null;
	var followerListFromFeed = [];

	var NoMyHeavenHere = React.createClass({
		render : function() {
			return (
					<div style={{'textAlign':'center'}}>
						{_Group_spring_message_nogroup}
					</div>
			)
		}
	});		
	
var Group = React.createClass({

		getInitialState : function () {
	        return { 
				 groupId 			: this.props.data.groupId 
				,groupName 			: this.props.data.groupName
				,groupFollowerList 	: this.props.data.groupFollowerList
				,isAutoJoin			: this.props.data.isAutoJoin
				,isPublic			: this.props.data.isPublic
				,newFeedCnt			: 0
				,isGroupMng			: 0
				,isInvite 			: 0
			};
        },
	
		componentDidMount: function() {
			var varNewFeedCnt = 0;
			var varIsGroupMng = 0;
			var varIsInvite   = 0;

			this.state.groupFollowerList.map(
				function(gfvo) {
					varNewFeedCnt = gfvo.newFeedCnt;
					varIsGroupMng = gfvo.isGroupMng;
					varIsInvite   = gfvo.isInvite;
				}
			);

			this.setState({
				 newFeedCnt : varNewFeedCnt
				,isGroupMng : varIsGroupMng
				,isInvite   : varIsInvite 
			});
		},	


		groupClickTest: function() {
			
			// 오른쪽 메뉴 상단 그룹 팔로워 리스트
			if(contentsType == 'USER') {
				React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
				React.render(<MyGroupFollower groupId={this.state.groupId}/>, document.getElementById('RightUpLevel'));
			}
			
			contentsType  = 'GROUP';

			Reloader.reloadObservers({'type':'group', 'groupId':this.state.groupId, 'isGroupChange':'false'});

			// 가운데 컨텐츠 상단 부분(그룹 정보)
			React.unmountComponentAtNode(document.getElementById('head_contents'));
			React.render(<GroupHead groupId={this.state.groupId} />, document.getElementById('head_contents'));


			// 가운데 컨텐츠 상단 부분(그룹 정보)
			React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
			React.render(<FeedApp groupInfo={this.state}/>, document.getElementById('mainContentsArea'));


			// 중하단 탭 리스트 및 피드
			React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
			React.render(<GroupTabList groupId={this.state.groupId} groupInfo={this.state}/>,  document.getElementById('selectTabBySession'));
			
			ajaxUpd(contextpath + _Group_grfGroup_BASE_GFOLLOWER_ACCESS , { 'groupId' : this.state.groupId }, function(){});

			$('.my-group-item').removeClass('group-select');
			$('.data-txt').removeClass('group-select-text');
			var myGroupId = 'myGroup_'+this.state.groupId;
			var rel = $('#'+ myGroupId).attr('rel');

			if(rel == this.state.groupId) {
				$('#'+ myGroupId).addClass('group-select');
				$(React.findDOMNode(this.refs.dataTxt)).addClass('group-select-text');
			}
			
			openMainBody();
			
			//최근활동
			//React.unmountComponentAtNode(document.getElementById('recentAct'));
			//React.render(<RecentActList currGroupId={this.state.groupId} baseurl={contextpath + _Group_grfGroup_GROUP_WIDGET_ACTIVITY}/>, document.getElementById('recentAct'));
		},

		render: function() {
			var myGroupId = 'myGroup_'+this.state.groupId;
			var lockIconWrapper = this.state.isPublic == 1
				? ''
				:
				<span className='ico-img ico-lock'>Lock</span>
				;
		
			if(this.state.isAutoJoin==0 && this.state.isGroupMng==1){
				return (
					<li className='nav-item'>
						<span className='nav-anchor my-group-item' id={myGroupId} rel={this.state.groupId} onClick={this.groupClickTest} style={{'cursor':'pointer'}}>
							<span className='data-txt' ref='dataTxt'>{this.state.groupName}{lockIconWrapper}<span className='ico-img ico-master'>Master</span></span>
							<span className='data-num'>{this.state.newFeedCnt}</span>
						</span>
					</li>
				);
			}else if(this.state.isAutoJoin==0 && this.state.isGroupMng==0){
				return (
					<li className='nav-item'>
						<span className='nav-anchor my-group-item point-flag-class' id={myGroupId} rel={this.state.groupId} onClick={this.groupClickTest} style={{'cursor':'pointer'}}>
							<span className='data-txt point-flag-class' ref='dataTxt'>{this.state.groupName}{lockIconWrapper}</span>
							<span className='data-num'>{this.state.newFeedCnt}</span>
						</span>
					</li>
				);
			}else if(this.state.isAutoJoin==1 && this.state.isGroupMng==1){
				return (
					<li className='nav-item'>
						<span className='nav-anchor my-group-item point-flag-class' id={myGroupId} rel={this.state.groupId} onClick={this.groupClickTest} style={{'cursor':'pointer'}}>
							<span className='data-txt point-flag-class' ref='dataTxt'>{this.state.groupName}<span className='ico-img ico-master'>Master</span></span>
							<span className='data-num'>{this.state.newFeedCnt}</span>
						</span>
					</li>
				);
			}else {
				return (
					<li className='nav-item'>
						<span className='nav-anchor my-group-item point-flag-class' id={myGroupId} rel={this.state.groupId} onClick={this.groupClickTest} style={{'cursor':'pointer'}}>
							<span className='data-txt point-flag-class' ref='dataTxt'>{this.state.groupName}</span>
							<span className='data-num'>{this.state.newFeedCnt}</span>
						</span>
					</li>
				);
			}
		}
	});

	//SideNav 나의그룹
	var MyGroup  = React.createClass({
		getInitialState : function () {
	        return { groupNode : '', groupFollowerList: [], groupListMaxHeight : 0, groupListMinHeight : 10 };
        },

		componentDidMount: function() {
			Observer.registerObserver(this);
			Reloader.registerReloader(this);
			this.getMygroupList('init');
		},

		notify: function(data) {
			this.getMygroupList('reload');
		},
        
        reload: function(data) {
        	if(data.isGroupChange !==undefined && data.isGroupChange == 'false') {
        	
        	} else { 
				this.getMygroupList('reload');
			}
		},
        
        componentWillUnmount: function() {
     		Observer.unregisterObserver(this);
     		Reloader.unregisterReloader(this);
 		},

		fromFollowerInputSetting: function(data) {
			groupFollowerList = data;
		},

		followerHandler : function(data) {
			groupFollowerList = data;
		},

		createGroup: function(){
			var that = this;
			//openGroupCreatePopup(that);
			
			var ftype = 'normal';
			React.render(<FollowerApp fromFollowerInputSetting={that.fromFollowerInputSetting} writtenFollowerList={[]} fromFollowrSetting={that.fromFollowrSetting} followerHandler={that.followerHandler} ftype={ftype}/>
			, document.getElementById('_gflist'));
			bPopupGc = $('#element_to_pop_up').bPopup({
				modalClose: false,
	    		opacity: 0.6,
	   		 	positionStyle: 'fixed'
				, onOpen : function() {
					$("#groupName").val('');
					$("#description").val('');
					$('#grpImg').attr('src', '../images/pic_group.jpg');
					$("#grpNameChkMgs").html('');
					document.body.style.overflow = "hidden";
					$("html").css("overflow-y","hidden");
					
					$('#element_to_pop_up').draggable({ handle: "div.pop-modalwindow-header" });
				}
				, onClose : function(){
					document.body.style.overflow = "visible";
					$("html").css("overflow-y","scroll");
				}
			});
		},

		groupSearch: function(){
			React.render(<GroupSearchList/>, document.getElementById('GroupSearchPopup'));
			bGroupSearchPop = $('#GroupSearchPop').bPopup({
				modalClose: false,
            	opacity: 0.6,
            	positionStyle: 'fixed'
            	, onOpen : function() {
					document.body.style.overflow = "hidden";
					$("html").css("overflow-y","hidden");
					$('#GroupSearchPop').draggable({ handle: "div.pop-modalwindow-header" });
				}
				, onClose : function(){
					document.body.style.overflow = "visible";
					$("html").css("overflow-y","scroll");
				}
			});
		},
		
		getMygroupListResult : function(data, option){
			var groupNode = data.map(
				function (ctl) {
					var key = 'group'+ctl.groupId;
					return (
						<Group key={key} data = {ctl}/>
					);
				}
			);

			this.setState({groupNode:groupNode});
			
			if(option !== undefined && option =='init') {
				var ulHeight = $("ul.nav-lnb-sub").height();
				this.setState({groupListMaxHeight : ulHeight });
				ulHeight < 260 ?
					this.setState({groupListMinHeight : ulHeight}) : this.setState({groupListMinHeight : 260});
				
				$("ul.nav-lnb-sub").css("height", this.state.groupListMinHeight + "px");
			} else {
				$("ul.nav-lnb-sub").css("height", this.state.groupListMinHeight + "px");
			}
			
			if(data.length == 0) {
				var element = document.createElement("div");
				element.id = 'noMyHeavenHere';
				$("ul.nav-lnb-sub").css('height','10px').html(element);
				React.render(<NoMyHeavenHere />, document.getElementById('noMyHeavenHere'));
			}
		},

		getMygroupList : function(type){
			var baseurl  = contextpath + _Group_grfGroup_BASE_GROUP;
			var jsondata = {"memberId" : _Group_session_memberId};	
			ajaxGet(baseurl, jsondata, this.getMygroupListResult, type);
		},

		hoverFolder : function(){
			if('ico-img ico-folding' == $('#icoFolding').attr('class')){
				console.log('111');
				console.log(this.state.groupListMaxHeight);
				$('#icoFolding').attr('class', 'ico-img ico-unfolding');
				$("ul.nav-lnb-sub").css("height", this.state.groupListMaxHeight + "px");
			}else{
				console.log('222');
				console.log(this.state.groupListMaxHeight);
				$('#icoFolding').attr('class', 'ico-img ico-folding');
				$("ul.nav-lnb-sub").css("height", this.state.groupListMinHeight + "px");
			}
		},

		render: function() {
	
	    	return (
				<div>
					<nav className='nav-lnb'>
						<ul className='nav-lnb-root'>
							<li className='nav-item'><a className='nav-anchor' onClick={this.hoverFolder}>{_Group_spring_message_basic_mygroup}<span className='ico-img ico-folding' id='icoFolding'></span></a>
								<ul className='nav-lnb-sub active' style={{'overflow':'hidden'}}>
									{this.state.groupNode}
								</ul>
							</li>
						</ul>
					</nav>

					<div className='sub-function'>
                		<div className='sub-function-item' onClick={this.createGroup} style={{'cursor':'pointer'}}><span className='group-create' >{_Group_spring_message_basic_group_create}<span className='ico-img ico-plus'>Plus</span></span></div>
                		<div className='sub-function-item' onClick={this.groupSearch} style={{'cursor':'pointer'}}><span className='group-search' >{_Group_spring_message_basic_group_find}<span className='ico-img ico-search'>Search</span></span></div>
                	</div>
				</div>
			);
		}
	});
	
	function openGroupCreatePopup(that) {
		
		
	}
	
	function closeMakeGroupPopup(obj){
		if(obj.groupId == 0) {
			MsgPopup(_Group_js_MSG_GROUPNAMEALREADYEXISTMSG);
			return;
		}
	
		chgGroupType('inner', 'outer', _Group_SNSCodeMaster_GROUP_TYPE_INNER)
		
		var unmount = React.unmountComponentAtNode(document.getElementById('_gflist'));
		
		if(bPopupGc != null)
			bPopupGc.close();
		
		if(obj == 1){
			
		}else{
			reGroupList();
			reRenderingNewGroupList();
			if(makeFeedId > 0 ) {
				makeFeedId = 0;
				followerListFromFeed = [];
			}
			var baseurl = contextpath + _Group_grfGroup_BASE_GROUP + '/' + obj.groupId;
			ajaxGet(baseurl, {}, getGroupDetailResult);
			
		}
		
	}
	
	
	function saveGroupImage(){
		
		var formData = new FormData($('form')[0]);
		formData.append("groupimage", $("input[name=groupimage]")[0].files[0]);
		
		$.ajax({
			url: contextpath +  _Group_urfGroup_FILE_UPLOAD_AJAX,
			data:formData,
			processData:false,
			contentType:false,
			type:'POST',
			success:function(data){
				setImgSrc(data)
			},
			error : function(jqXHR, textStatus, errorThrown) {
				  if(jqXHR.status == 500) {
			    	  MsgPopup("관리자에게 문의하세요.");
				  } else if(jqXHR.status == 401) {
					  window.location.href = "/";
				  } else {
					  var resText = jQuery.parseJSON(jqXHR.responseText)
					  MsgPopup(resText.msg);
				  }
			}
			
		});
		
	}
	

	function setImgSrc(data){
		feedFileVo = data;
		var src = contextpath + _Group_grfGroup_GROUP_PIC_TEMP + '?groupTempPicUrl=' + data.fileUrl;
		$('#grpImg').attr('src', src);	
	}
	
	
	function groupNameChk(){
		if($("#groupName").val().trim() == "") {
			$("#grpNameChkMgs").html(_Group_js_MSG_GROUPNAMEREQUIREMSG);
			return false;
		}
		var baseurl = contextpath + _Group_grfGroup_BASE_GROUP_NAME;
		var jsondata = {'groupName' : $("#groupName").val()};
		ajaxGet(baseurl, jsondata, groupNameChkResult);
	}
	

	function groupNameChkResult(data){
		if($("#groupName").val() == data.groupName){
			$("#grpNameChkMgs").html(_Group_js_MSG_GROUPNAMEALREADYEXISTMSG);
			$("#groupName").focus();
		}else{
			$("#grpNameChkMgs").html(_Group_js_MSG_GROUPNAMEAVAILABLEMSG);
		}
	}
	
	
	function saveGroup(){
		if($("#groupName").val() == ''){
			MsgPopup(_Group_js_MSG_GROUPNAMEREQUIREMSG);
			$("#groupName").focus();
			return;
		}
		// follower 객체로 부터 취득한 follower리스트 세팅
		var gflist = [];
		
		groupFollowerList.forEach(function(gfvo) {
			var GroupFollowerVo = {
				"memberId": gfvo.id,
				"newFeedCnt" : 0,
				"isGroupMng" : 0,
				"isAutoJoin" : 0
			}
			gflist.push(GroupFollowerVo);
		});
		
		// 그룹 등록자
		var GroupFollowerVo = {
			"memberId": _Group_session_memberId,
			"newFeedCnt" : 0,
			"isGroupMng" : 1,
			"isAutoJoin" : 0
		}
		gflist.push(GroupFollowerVo);
		
		
		var groupImgUrl = '';
		if(feedFileVo != null){
			groupImgUrl = feedFileVo.fileUrl + '/' + feedFileVo.tempFileName;
		}
		
		
		var baseurl = contextpath + _Group_grfGroup_BASE_GROUP;
		var jsondata = {
				  "regMemberId"			: _Group_session_memberId,
			      "groupName"			: $("#groupName").val(),
			      "groupImgUrl"			: groupImgUrl,
			      "groupType"	 		: $("#groupType").val(),
			      "description"	 		: $("#description").val(),
			      "isPublic" 			: $("input[name=isPublic]:checked").val(),
			      "isAutoJoin"      	: 0,
				  "isHide"		 		: 0,
				  "groupFollowerList" 	: gflist,
				  "feedFileVo"			: feedFileVo,
				  "makeFeedId"			: makeFeedId
		};
		
		ajaxAdd(baseurl, jsondata, closeMakeGroupPopup);
		
	}
	
	
	function chgGroupType(fromclass, toclass, groupType){
		$('#'+fromclass).attr('class','group_menuon');
		$('#'+fromclass+'icon').attr('class','icon_gmon');
		$('#'+fromclass+'gm').attr('class','gm_on');
		
		$('#'+toclass).attr('class','group_menuoff');
		$('#'+toclass+'icon').attr('class','icon_gmoff');
		$('#'+toclass+'gm').attr('class','gm_off');
		
		$('#groupType').val(groupType);
		
	}
	
function getGroupDetailResult(groupdata){

		
		// 오른쪽 메뉴 상단 그룹 팔로워 리스트
	React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
	React.render(<MyGroupFollower groupId={groupdata.groupId}/>, document.getElementById('RightUpLevel'));
			
		contentsType  = 'GROUP';

		Reloader.reloadObservers({'type':'group', 'groupId':groupdata.groupId, 'isGroupChange':'false'});

		// 가운데 컨텐츠 상단 부분(그룹 정보)
		React.unmountComponentAtNode(document.getElementById('head_contents'));
		React.render(<GroupHead groupId={groupdata.groupId} />, document.getElementById('head_contents'));


		// 가운데 컨텐츠 상단 부분(그룹 정보)
		React.unmountComponentAtNode(document.getElementById('mainContentsArea'));
		React.render(<FeedApp groupInfo={groupdata}/>, document.getElementById('mainContentsArea'));


		// 중하단 탭 리스트 및 피드
		React.unmountComponentAtNode(document.getElementById('selectTabBySession'));
		React.render(<GroupTabList groupId={groupdata.groupId} groupInfo={groupdata}/>,  document.getElementById('selectTabBySession'));
			
		openMainBody();
		

		// 최근활동
		//React.unmountComponentAtNode(document.getElementById('recentAct'));
		//React.render(<RecentActList currGroupId={groupdata.groupId} baseurl={contextpath + _Group_grfGroup_GROUP_WIDGET_ACTIVITY}/>, document.getElementById('recentAct'));

	}