
		var MemberHead = React.createClass({
			
			getInitialState : function () {
		        return { 
					 memberId			: '' 
					,memberName 		: ''
					,memberSyncKey		: ''
					,thisTimer			:null
					,timeoutTime		:800
					,insidePopup		:false
				};
	        },
/*
			tooltipPosition: function() {
				var pos = $('.headTooltipPop').offset();
				var width = $('.headTooltipPop').width();
				$('.over_feed_gate').css({
	    			left: pos.left + 'px',
	    			top: pos.top - 180 + 'px'
				});

			},
			
			tooltipRender: function(data) {
				React.render(<FollowerTooltip followerInfo={data} itemId={'head'}/>, document.getElementById('sns-tooltip'));
				this.tooltipPosition();
			},

			getFollowerInfo: function(info) {
				var infoArray = info.split(';');
				var followerType = infoArray[0];
				var followerId = infoArray[1];
				var baseurl = contextpath + _HeadInfo_BASE_FOLLOWER + '/members/'+followerId;
				if(followerType ==='GROUP') {
					baseurl = contextpath + _HeadInfo_BASE_GROUP + '/'+followerId;
				}
				ajaxGet(baseurl, '',  this.tooltipRender);

			},
*/
			componentDidMount: function() {
				$("#feedGate").show();
				var self = this;
				/*
				$("#sns-tooltip").mouseenter(function(){
					self.state.insidePopup = true;
				}).mouseleave(function(){
                   	self.state.insidePopup = false;
                   	$(this).hide();
                });

				$('.headTooltipPop').mouseenter(function(event) {
					var thisElm = $(this);
					clearTimeout(self.state.thisTimer);
					self.state.thisTimer = setTimeout(function() {
						var rel = thisElm.attr('rel');
						var targetFollowerInfo = self.getFollowerInfo(rel);
						$('#sns-tooltip').show();
						clearTimeout(self.state.thisTimer);
    				}, self.state.timeoutTime);

				}).mouseleave(function(event) {
					clearTimeout(self.state.thisTimer);
    				self.state.thisTimer = setTimeout(function(){
						if(!self.state.insidePopup) {
							$("#sns-tooltip").hide();
							React.unmountComponentAtNode(document.getElementById('sns-tooltip'));
						}
        				clearTimeout(self.state.thisTimer);
    				}, self.state.timeoutTime);
				});
				*/
				var baseurl  = contextpath + _HeadInfo_BASE_MEMBER  + '/' + this.props.memberId;
				var jsondata = {};
				ajaxGet(baseurl, jsondata, this.getHeadInfo);
							
				//Lync Presence setting
				//initLyncStatus();
				//this.getLyncStatus();
				window.scrollTo(0,0);
			},
			
			getHeadInfo : function(data){
				var mapping = data.tenantMappingList[0]===undefined?[]:data.tenantMappingList[0];
				var partName = mapping.partName===undefined ? ' ' : mapping.partName;
				var position = mapping.positionName===undefined?'':mapping.positionName;
				this.setState({
					 memberId			: data.memberId 
					,memberName 		: data.memberName
					,memberSyncKey		: data.syncKey
					,memberPartName		: partName
					,memberPosition		: position
					,imgurl				: data.memberPicUrl
				});
				
				$("dt#member_pic_big").css(
						"background", 'url('+ contextpath +_HeadInfo_MEMBER_PIC + '?memberId=' + this.state.memberId + ') no-repeat')
							.css("background-size", 'cover');
			},

			getLyncStatus: function() {
    			if(!nameCtrl) {
	        		return;
    			}
			},
	
			openLyncMenuImg: function() {
				openLyncMenu(this.state.memberSyncKey, React.findDOMNode(this.refs.ffImg),'','-560','-100');
			},
			
			openLyncMenuName: function() {
				openLyncMenu(this.state.memberSyncKey, React.findDOMNode(this.refs.ffName),'','-560','-100');
			},
		
			hideLyncMenu: function() {
				hideLyncMenu();
			},
			
			render: function() {
				gTab = "";
				$("#mainHeadInfo").val("member");
				$('#currGroupInfo').val("");
				$("#shpFileRepoId").val("");
				$("#shpTargetId").val("");
				var tooltipInfo = 'MEMBER;'+this.props.memberId;
				
				return (
       	 	    	<dl>
	       				<dt className='pic_big' id='member_pic_big' rel={tooltipInfo} style={{'cursor':'pointer','borderRadius':'50%'}} ref='ffImg' onMouseOver={this.openLyncMenuImg} onMouseOut={this.hideLyncMenu} >pic</dt>	
                        <dd className='malgun22 left_space'><span className='headTooltipPop' rel={tooltipInfo} ref='ffName' onMouseOver={this.openLyncMenuName} onMouseOut={this.hideLyncMenu}>{this.state.memberName} {this.state.memberPosition}</span></dd>
                        <dd><span className='join_icon'>{this.state.memberPartName}</span></dd>
           			</dl>
	        	);
	        }
		});

		var GroupHead = React.createClass({
			
			getInitialState : function () {
		        return { 
					 groupId			: '' 
					,groupName 			: ''
					,description		: ''
					,imgurl				: ''
					//,groupFollowerList 	: []
					,isPublic			: _HeadInfo_MSG_CLOSEDGROUP
					//,isJoinStatus		: _HeadInfo_MSG_JOINSTATUSNO
					,isJoinStatus		: ''
					,groupType			: ''
					,thisTimer			:null
					,timeoutTime		:800
					,insidePopup		:false
					,regMemberId		: ''
					,isGroupMng			:false
					,groupFollower		: []
				};
	        },
			
			tooltipPosition: function() {
				var pos = $('.groupTooltipPop').offset();
				var width = $('.groupTooltipPop').width();
				$('.over_feed_gate').css({
	    			left: pos.left + 'px',
	    			top: pos.top - 160 + 'px'
				});

			},

			tooltipRender: function(data) {
				React.render(<FollowerTooltip followerInfo={data} itemId={'group'}/>, document.getElementById('sns-tooltip'));
				this.tooltipPosition();
			},

			getFollowerInfo: function(info) {
				var infoArray = info.split(';');
				var followerType = infoArray[0];
				var followerId = infoArray[1];
				var baseurl = contextpath + _HeadInfo_BASE_FOLLOWER + '/members/'+followerId;
				if(followerType ==='GROUP') {
					baseurl = contextpath + _HeadInfo_BASE_GROUP + '/'+followerId;
				}
				
				ajaxGet(baseurl, '',  this.tooltipRender);

			},
			componentDidMount: function() {
				$("#feedGate").show();
				this.getGroupInfo();
				var self = this;
				$("#sns-tooltip").mouseenter(function(){
					self.state.insidePopup = true;
				}).mouseleave(function(){
                   	self.state.insidePopup = false;
                   	$(this).hide();
                });

				$('.groupTooltipPop').mouseenter(function(event) {
					var thisElm = $(this);
					clearTimeout(self.state.thisTimer);
					self.state.thisTimer = setTimeout(function() {
						var rel = thisElm.attr('rel');
						var targetFollowerInfo = self.getFollowerInfo(rel);
						$('#sns-tooltip').show();
						clearTimeout(self.state.thisTimer);
    				}, self.state.timeoutTime);

				}).mouseleave(function(event) {
					clearTimeout(self.state.thisTimer);
    				self.state.thisTimer = setTimeout(function(){
        				if(!self.state.insidePopup) {
							$("#sns-tooltip").hide();
							React.unmountComponentAtNode(document.getElementById('sns-tooltip'));
						}
        				clearTimeout(self.state.thisTimer);
    				}, self.state.timeoutTime);
				});
				window.scrollTo(0,0);
			},
			
			getGroupInfo: function(){
				var baseurl  = contextpath + _HeadInfo_BASE_GROUP + '/' + this.props.groupId;
				var jsondata = {};
				var that = this;
				var nowDate = new Date();
				var callUrl = baseurl.indexOf('?') < 0 ? baseurl + '?tempStr=' + nowDate.getTime() : baseurl + '&tempStr=' + nowDate.getTime();
				$.ajax({
				      url			: callUrl,
				      type			: "get",
				      data			: jsondata,
				      
				      success: function(data) {
				          that.getHeadInfo(data);
				      },
				      error: function (jqXHR, textStatus, errorThrown) {
				    	  
				    	  if(jqXHR.status == 500) {
				        	  MsgPopup("관리자에게 문의하세요.");
				    	  } else if(jqXHR.status == 401) {
				    		  window.location.href = "/";
				    	  } else {
				    		  var resText = jQuery.parseJSON(jqXHR.responseText)
				    		  MsgPopup(resText.msg);
				    		  $(".join_icon, .btn_fgjoin").hide();
				    	  }
			          }
				});
				
			},
			
			checkGroupManagerAndJoinStatus : function(data) {
				var isGroupMng = false;
				var isJoin = '';
				
				if(typeof data == "undefined") {
					isGroupMng = false;
					isJoin = 'NOTAMEMBER';
				} else if(data.length == 0) {
					isGroupMng = false;
					isJoin = 'NOTAMEMBER';
				} else {
					data.map(
						function (groupFollower) {
							
							if(groupFollower.isGroupMng == '1'){
								isGroupMng = true;
							}
							
							if(groupFollower.joinStatus == null || groupFollower.joinStatus == '') {
								isJoin = '';
							} else if (groupFollower.joinStatus == 'COMPLETE') {
								isJoin = 'COMPLETE';
							} else if (groupFollower.joinStatus == 'REJECT') {
								isJoin = 'REJECT';
							}
						
						}
					);
				}
				
				this.setState({
					isGroupMng : isGroupMng
					, isJoinStatus : isJoin
				});
			},
			
			getGroupFollowerList : function (data) {
				this.setState({groupFollower : data});
			},
			
			getHeadInfo : function(data){
				$('#currGroupInfo').val(data.groupId);
			
				if(data.isPublic == 1){
					this.setState({isPublic			: _HeadInfo_MSG_OPENGROUP });
				} else {
					this.setState({isPublic			: _HeadInfo_MSG_CLOSEDGROUP });
				}
				
				this.setState({
					 groupId			: data.groupId 
					,groupName 			: data.groupName
					,description		: data.description
					,imgurl				: data.groupImgUrl
					,groupType			: data.groupType
					,regMemberId		: data.regMemberId
				});
				
				ajaxGet(contextpath + _HeadInfo_BASE_GFOLLOWER_URL
						, {"groupId" : data.groupId}
						, this.getGroupFollowerList);
				
				ajaxGet(contextpath + _HeadInfo_BASE_GFOLLOWER_URL
					, {"groupId" : data.groupId, "memberId" : _HeadInfo_session_memberId}
					, this.checkGroupManagerAndJoinStatus);
				
				var nowDate = new Date().getTime();
				var group_pic_url = contextpath + _HeadInfo_GROUP_PIC + '?groupId=' + data.groupId + '#'+ nowDate;
				if(data.groupImgUrl != undefined) {
					$("dt#group_pic_big").css(
						"background", 'url(' + group_pic_url + ') no-repeat')
							.css("background-size", '80px');
				}
				
			},
			
			openGroupConfigPop : function() {
				openGroupConfigPop(this.state);
			},
			
			
			joinout: function(){
				
				var self = this;
				var jsondata = {
        			"groupId" : this.props.groupId,
					"regMemberId" : _HeadInfo_session_memberId
        		};
				var groupMemberArr = [];
				var groupManagerArr = [];
				this.state.groupFollower.map(function (v) {
					if(v.joinStatus == 'COMPLETE') {
						if(v.isGroupMng == '1') {
							groupManagerArr.push(v);
						} else {
							groupMemberArr.push(v);
						}
					}
				});
				
				var GROUPLEAVECONFIRMMSG = _HeadInfo_MSG_LEAVEGROUPCONFIRMMSG;
				
				if(groupMemberArr.length > 0 && groupManagerArr.length == 1
					&& _HeadInfo_session_memberId == groupManagerArr[0].memberId
					) {
					GROUPLEAVECONFIRMMSG = _HeadInfo_MSG_MGRMUSTBEEXISTMSG;
					MsgPopup(GROUPLEAVECONFIRMMSG);
					return;
				} else if(groupMemberArr.length == 0 && groupManagerArr.length == 1) {
					GROUPLEAVECONFIRMMSG = _HeadInfo_MSG_GROUPLEAVECONFIRMMSG_FORMGR;
				}
	        	
				ConfirmPopup(GROUPLEAVECONFIRMMSG , function(){
					ajaxDelByJson(contextpath + _HeadInfo_GFOLLOWER_BYSELF_URL, jsondata, self.joinoutResult);
				}, 'okcancel');
			},
			
			joinoutResult: function(data){
				
				var isJoin = 'NOTAMEMBER';
			
				this.setState({ isJoinStatus: isJoin });
				reGroupList();
			},
			
			
			join: function(){
				var jsondata = {
        			"groupId" : this.props.groupId,
					"regMemberId" : _HeadInfo_session_memberId
        		};
				
				var self = this;
				ConfirmPopup(_HeadInfo_MSG_JOINGROUPCONFIRMMSG , function(){
					ajaxAdd(contextpath + _HeadInfo_BASE_GFOLLOWER_URL, jsondata, self.joinResult);
				}, 'okcancel');
				
			},
			
			joinResult: function(data){
				
				if(data.joinStatus == 'COMPLETE') {
					this.setState({ isJoinStatus: 'COMPLETE' });
				} else if(data.joinStatus == null || data.joinStatus == '') {
					this.setState({ isJoinStatus: '' });
				}
				
				reGroupList();
			},
			
			rejoin : function(){
				var jsondata = {
        			"groupId" : this.props.groupId,
					"memberId" : _HeadInfo_session_memberId
        		};
        		
        		var self = this;
        		ConfirmPopup(_HeadInfo_MSG_REJOINYNMSG , function(){
					ajaxUpd(contextpath + _HeadInfo_BASE_FOLLOWERREJOIN, jsondata, self.joinResult);
				}, 'okcancel');
			},
			
			rejoinResult : function(data) {
				
			},

        	componentWillUnmount: function() {
        		$('.group-select').removeClass('group-select');
        		$('.group-select-text').removeClass('group-select-text');
        	
 			},
 			
			render: function() {
				gTab = "";
				$("#mainHeadInfo").val("group");
				ajaxGet(contextpath + _HeadInfo_BASE_GROUP+ '/' + this.props.groupId , {}, function(data){
					if (data.fileRepoId == undefined || data.fileRepoId == null) {
						$("#shpFileRepoId").val("");
						$("#shpTargetId").val("");
					} else {
						$("#shpFileRepoId").val(data.fileRepoId);
						$("#shpTargetId").val(data.targetId);
					}
				});


				var tooltipInfo = 'GROUP;'+this.props.groupId;
				var groupConfigBtn =
				(this.state.isGroupMng || _HeadInfo_isSysAdmin == 1)
				? <dd className='icon_set left_space' title='설정' onClick={this.openGroupConfigPop}>설정</dd>
				: '';
				
				var joinStatusTEXT = '';
				switch (this.state.isJoinStatus) {
					case '' : joinStatusTEXT = _HeadInfo_MSG_JOINSTATUSSTANDBY; break;
					case 'COMPLETE' : joinStatusTEXT = _HeadInfo_MSG_JOINSTATUSYES; break;
					case 'REJECT' : joinStatusTEXT = _HeadInfo_MSG_JOINSTATUSREJECTED; break;
					case 'NOTAMEMBER' : joinStatusTEXT = _HeadInfo_MSG_JOINSTATUSNO; break;
				}
				
				var description = this.state.description
				;//== '' ? <div style={{'height':'5px'}}>　</div> : this.state.description;
				
				if(joinStatusTEXT == _HeadInfo_MSG_JOINSTATUSSTANDBY || joinStatusTEXT == _HeadInfo_MSG_JOINSTATUSYES){
					return (
		       	 	    	<dl className='header-group' style={{'marginRight':'40px'}}>
			       				<dt className='pic_group_big groupTooltipPop' id="group_pic_big" rel={tooltipInfo} style={{'cursor':'pointer'}}>pic</dt>	
		                        <dd className='malgun22 left_space' style={{'whiteSpace':'nowrap', 'textOverflow':'ellipsis', 'overflow':'hidden'}}>
		                        	<span rel={tooltipInfo} className='groupTooltipPop'>{this.state.groupName}</span></dd>
		                        {groupConfigBtn}
		                        <dd className='fg_explan left_space'>{description}</dd>
		                        <dd className='fg_belong left_space'>{this.state.isPublic}| </dd>
		                        <dd className='join_icon' onClick={this.joinout}><img src="../images/icon_check.gif" style={{"width":"11", "height":"11"}}/></dd>
		                       	<dd className="btn_fgjoin" onClick={this.joinout}>{joinStatusTEXT}</dd>
		           			</dl>
		      	    );
		      	    
		      	} else if(joinStatusTEXT == _HeadInfo_MSG_JOINSTATUSREJECTED) {
		      		return (
		       	 	    	<dl className='header-group' style={{'marginRight':'40px'}}>
			       				<dt className='pic_group_big groupTooltipPop' id="group_pic_big" rel={tooltipInfo} style={{'cursor':'pointer'}}>pic</dt>	
		                        <dd className='malgun22 left_space' style={{'whiteSpace':'nowrap', 'textOverflow':'ellipsis', 'overflow':'hidden'}}><span rel={tooltipInfo} className='groupTooltipPop'>{this.state.groupName}</span></dd>
		                        {groupConfigBtn}
		                        <dd className='fg_explan left_space'>{description}</dd>
		                        <dd className='fg_belong left_space'>{this.state.isPublic}| </dd>
		                        <dd className='join_icon' onClick={this.joinout}><img src="../images/icon_check.gif" style={{"width":"11", "height":"11"}}/></dd>
		                       	<dd className="btn_fgjoin" onClick={this.rejoin}>{joinStatusTEXT}</dd>
		           			</dl>
		      	    );
		      	} else {
					return (
		       	 	    	<dl className='header-group' style={{'marginRight':'40px'}}>
			       				<dt className='pic_group_big groupTooltipPop' id="group_pic_big" rel={tooltipInfo} style={{'cursor':'pointer'}}>pic</dt>	
		                        <dd className='malgun22 left_space' style={{'whiteSpace':'nowrap', 'textOverflow':'ellipsis', 'overflow':'hidden'}}><span rel={tooltipInfo} className='groupTooltipPop'>{this.state.groupName}</span></dd>
		                        {groupConfigBtn}
		                        <dd className='fg_explan left_space'>{description}</dd>
		                        <dd className='fg_belong left_space'>{this.state.isPublic}| </dd>
		                        <dd className='nojoin_icon' onClick={this.join}><img src="../images/icon_check.gif" style={{"width":"11", "height":"11"}}/></dd>
		                       	<dd className="btn_fgjoin" onClick={this.join}>{joinStatusTEXT}</dd>
		           			</dl>
		      	    );
				}
	       	}
		});
