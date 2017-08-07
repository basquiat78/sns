		var MainFeedDropzoneComponent = React.createClass({
		
   			getDjsConfig: function () {
	   			var options,
           		defaults = {
               		url: this.props.config.postUrl,
               		headers: {
                   		'Access-Control-Allow-Credentials': true,
                   		'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-PINGOTHER, X-File-Name, Cache-Control',
                   		'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS',
                   		'Access-Control-Allow-Origin': '*'
               		},
               		withCredentials: false, // 순차 또는 한번에 올리는 옵션 
					dictDefaultMessage: " 파일을 여기로 끌어서 놓습니다. ",
 					thumbnailWidth: 60,
   					thumbnailHeight: 60,
					previewsContainer: document.getElementById('file_preview'),
					clickable: true,
					clickArea: 'mainAttach',
           		};

       			if(this.props.config.allowedFiletypes && this.props.config.allowedFiletypes.length > 0) {
           			defaults.acceptedFiled = this.props.config.allowedFiletypes;
       			}

       			if(this.props.djsConfig) {
           			options = Helpers.extend(true, {}, defaults, this.props.djsConfig);
       			} else {
       				options = defaults;
       			}

   				return options;

    		},
	
	    	getInitialState: function () {
	        	return {files: [], 
						feedFileVo:[],
						feedType:'',
						allFollowerList:[], 
						writtenFollowerList:[], 
						fromFollowerInputList:[],
						dropFollowerList:[],
						targetInfoList:[],
						textClick:'false'
						}
	    	},

    		componentDidMount: function () {

				var self = this;
				$('.showApp').hide();
            	options = this.getDjsConfig();

        		if(!this.props.config.postUrl && !this.props.eventHandlers.drop) {
            		console.info('Neither postUrl nor a "drop" eventHandler specified, the React-Dropzone component might misbehave.');
        		}

				if(this.props.existFeedTitle !== undefined && this.props.existFeedTitle == 'y') {
					this.textareaClick();
				}

        		Dropzone.autoDiscover = false;
        		this.dropzone = new Dropzone(React.findDOMNode(self.refs.feedElementDiv), options);
				this.dropzone.forceEnable($('.fileClass'));
        		this.setupEvents();
				var btnElement = $(React.findDOMNode(this.refs.postup));
				
				var sessionMe = _Dropzone_session_memberId;
				var targetSessionId = _Dropzone_target_memberId;
				if(this.props.targetId !== undefined) {
					targetSessionId = this.props.targetId
				}
				var targetFollower = [];
				var fromGroupInfo = [];
				var targetFollowerVo = [];
				if(sessionMe !== targetSessionId && this.state.textClick === 'false') {

					var targetName = _Dropzone_target_memberName;
					if(this.props.targetName !== undefined) {
						targetName = this.props.targetName;
					}

					var targetMentionVo = {
							"name": targetName,
							"uid" : targetSessionId
					};

					var follower = {
									label : targetName,
									value : targetName,
									id	  : targetSessionId,
									email : '',
									type  : 'MEMBER',
									pic   : ''
								};

					this.state.targetInfoList = this.state.targetInfoList.concat(follower); 
					targetFollower.push(targetMentionVo);

					if(this.props.fromGroupInfo.length>0) {
						fromGroupInfo = this.props.fromGroupInfo;
						targetFollower = [];
					}

					this.state.textClick = 'true';
					this.addFollowerList(targetFollower, fromGroupInfo, targetFollowerVo);
				} else {
					if(this.props.fromGroupInfo.length>0 && this.state.textClick === 'false') {

						this.addFollowerList(targetFollower, this.props.fromGroupInfo, []);
						this.state.textClick = 'true';
					}

				}
				
				React.render(<NormalFeedElement btnElement={btnElement} ogSetting={this.ogSetting} targetInfoList={this.state.targetInfoList} fromGroupInfo={this.props.fromGroupInfo} addFollowerList={this.addFollowerList} textareaClick={this.textareaClick} fileLayout={this.fileLayout}/>, document.getElementById('feedElementDiv'));
				React.render(<FollowerApp dropFollowerSetting={this.dropFollowerSetting} removeDropFollower={this.removeDropFollower} fromFollowerInputSetting={this.fromFollowerInputSetting} writtenFollowerList={[]} fromFollowrSetting={this.fromFollowrSetting}  followerHandler={this.followerHandler}/>, document.getElementById('followerApp'));
				React.render(<TagApp tagHandler={this.tagHandler}/>, document.getElementById('tagApp'));
    		},

			updateFeedFileVo: function(file, responseFileVo, e) {
				var feedFiles = this.state.feedFileVo;
				responseFileVo.regMemberId = _Dropzone_session_memberId;
				
				if(feedFiles.length === 0) {
					feedFiles.push(responseFileVo);
					
				} else {
					var isDuplicated = false;
					for(var i=0; i<feedFiles.length; i++) {
						if(feedFiles[i].fileUrl === responseFileVo.fileUrl &&  feedFiles[i].fileName === responseFileVo.fileName) {
							isDuplicated = true;		
						   	break;
						}
        			}
					if(!isDuplicated) feedFiles.push(responseFileVo);
					
					
				}
				
				$(React.findDOMNode(this.refs.postup)).css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
				
				this.props.fileHandler(feedFiles);
				this.setState({feedFileVo: feedFiles});

			},				

			componentDidUpdate: function() {
				this.dropzone.on('success', this.updateFeedFileVo);
			},

			tagHandler: function(tagsList) {
				this.props.tagHandler(tagsList);
			},

			followerHandler: function(followerList) {
				this.props.followerHandler(followerList);
			},

			fromFollowrSetting: function(followerList){
				this.state.allFollowerList = followerList;
			},

			fromFollowerInputSetting: function(follower) {
				var duplicated = false;
				for(var i=0; i<this.state.fromFollowerInputList.length; i++) {
					if(this.state.fromFollowerInputList[i].id == follower.id && follower.type=='MEMBER') {
						duplicated = true;
						break;
					}
				}
				if(!duplicated) {
					this.state.fromFollowerInputList = this.state.fromFollowerInputList.concat(follower);
				}
			},

			dropFollowerSetting: function(follower) {
			},

			ogSetting:function(data, ogValidate) {
				this.props.ogSetting(data, ogValidate);
			},

			removeDropFollower:function(follower) {
				var index = -1;	

				for(var j = 0; j < this.state.fromFollowerInputList.length; j++ ) {
    				if(this.state.fromFollowerInputList[j].id == follower.id && this.state.fromFollowerInputList[j].type == follower.type ) {
    					index = j;
    					break;
    				}
    			}				

				if(index > -1) {
    				this.state.fromFollowerInputList.splice(index, 1);
				}	

				this.state.fromFollowerInputList = this.state.fromFollowerInputList;
			},

			addFollowerList: function(mentionVal, groupInfo, targetInfo) {
				var wfl = [];

				for(var i=0; i<mentionVal.length; i++) {
					mentionVo = {
									label : mentionVal[i].name,
									value : mentionVal[i].name,
									id	  : mentionVal[i].uid,
									email : '',
									type  : 'MEMBER',
									pic   : ''
								};

					wfl.push(mentionVo);

				}

				for(var k=0; k<this.state.fromFollowerInputList.length; k++) {
					wfl.push(this.state.fromFollowerInputList[k]);
				}

				var mentionList = [];

    			for(var j = 0; j < wfl.length; j++){
					if(j===0) {
					mentionList.push(wfl[0]);
					} else {
						var isDup = false;
						for(var k=0; k<mentionList.length; k++){
							if(mentionList[k].id === wfl[j].id) {
								isDup = true;
								break;
							}
						}
						if(!isDup)mentionList.push(wfl[j]);			
					}
    			}

				this.state.writtenFollowerList = mentionList;

				
				if(targetInfo !==undefined && targetInfo.length>0) {
					this.state.writtenFollowerList = this.state.writtenFollowerList.concat(targetInfo);
				}

				if(groupInfo.length>0) {
					groupVo = {
									label : groupInfo[0].followerName,
									value : groupInfo[0].followerName,
									id	  : groupInfo[0].followerId,
									email : '',
									type  : groupInfo[0].followerType,
									pic   : ''
								};
					
					this.state.writtenFollowerList = this.state.writtenFollowerList.concat(groupVo);
				}

				React.unmountComponentAtNode(document.getElementById('followerApp'));
				React.render(<FollowerApp dropFollowerSetting={this.dropFollowerSetting} dropFollowerSetting={this.dropFollowerSetting} removeDropFollower={this.removeDropFollower} removeDropFollower={this.removeDropFollower} fromFollowerInputSetting={this.fromFollowerInputSetting} writtenFollowerList={this.state.writtenFollowerList} fromFollowrSetting={this.fromFollowrSetting} followerHandler={this.followerHandler}/>, document.getElementById('followerApp'));		

			},

			reset:function() {
				this.retouchingFeedTypeStlye('updateFeed');
				this.setState({files: [], feedFileVo:[], allFollowerList:[], dropFollowerList:[], writtenFollowerList:[], fromFollowerInputList:[], textClick:'false'});
				$('#feedContentsInput').prev().children('div').html('');
				$('#feedContentsInput').next().val('');
				$('#feedContentsInput').next().next().next().html('');
				$('#ogArea').empty();
				$('#file_preview').empty();
				$('#feedContentsInput').css('height','34px').val('');

				$('#feedElementDiv').empty();
				var btnElement = $(React.findDOMNode(this.refs.postup));
				React.unmountComponentAtNode(document.getElementById('feedElementDiv'));
				React.render(<NormalFeedElement btnElement={btnElement} ogSetting={this.ogSetting} targetInfoList={this.state.targetInfoList} fromGroupInfo={this.props.fromGroupInfo} addFollowerList={this.addFollowerList} textareaClick={this.textareaClick} fileLayout={this.fileLayout}/>, document.getElementById('feedElementDiv'));
				React.unmountComponentAtNode(document.getElementById('followerApp'));
				React.render(<FollowerApp dropFollowerSetting={this.dropFollowerSetting} removeDropFollower={this.removeDropFollower} fromFollowerInputSetting={this.fromFollowerInputSetting} writtenFollowerList={[]} fromFollowrSetting={this.fromFollowrSetting}  followerHandler={this.followerHandler}/>, document.getElementById('followerApp'));
			
				React.unmountComponentAtNode(document.getElementById('tagApp'));
				React.render(<TagApp tagHandler={this.tagHandler}/>, document.getElementById('tagApp'));
				$(React.findDOMNode(this.refs.postup)).css('cursor','initial').removeClass('btn-attention').addClass('btn-default');
				$('.showApp').hide();
			},

			feedAdd: function() {
				if(this.state.feedType == 'NOTICE') {
					if($('#noticeTitle').val() ==''){
						return;
					}
				} else {
					if($('#feedContentsInput').val() == '') {
						
						var spfilelength = $('#file_preview > span').length;
						
						if(this.state.feedFileVo.length > 0 || spfilelength > 0) {
							
						} else return;
					}
				}


				if(this.state.feedType == 'POLL') {
					var questCnt = 0;
					var questInputClass = $('.questions');
					for(var i=0; i<questInputClass.length; i++) {
						var inputVal = questInputClass[i].value;
						if(inputVal != '') {
							questCnt++;
						}
					}
				
					if(questCnt < 2) return;

				}
				this.props.feedAdd();
				this.reset();

			},

	    	componentWillUnmount: function () {
	        	try{this.dropzone.destroy();}catch(e){console.log(e)};
    		},

			retouchingFeedTypeStlye:function(className) {
				if(className === 'update') {
					if( $('.update').hasClass('icon_update_on') ) {
						return;
					} else {
						$('.update').removeClass('icon_update_off').addClass('icon_update_on');
						$('.update').children('span').addClass('onHover');
						$('.doing').removeAttr('class').attr('class','icon_feeddoing_off doing');
						$('.doing').children('span').removeClass('onHover');
						$('.survay').removeAttr('class').attr('class','icon_feedsurvay_off survay');
						$('.survay').children('span').removeClass('onHover');
					}
				} else if(className === 'doing') {
					if( $('.doing').hasClass('icon_feeddoing_on') ) {
						return;
					} else {
						$('.doing').removeClass('icon_feeddoing_off').addClass('icon_feeddoing_on');
						$('.doing').children('span').addClass('onHover');
						$('.update').removeAttr('class').attr('class','icon_update_off update');
						$('.update').children('span').removeClass('onHover');
						$('.survay').removeAttr('class').attr('class','icon_feedsurvay_off survay');
						$('.survay').children('span').removeClass('onHover');
					}
				} else if(className === 'survay') {
					if( $('.survay').hasClass('icon_feedsurvay_on') ) {
						return;
					} else {
						$('.survay').removeClass('icon_feedsurvay_off').addClass('icon_feedsurvay_on');
						$('.survay').children('span').addClass('onHover');
						$('.update').removeAttr('class').attr('class','icon_update_off update');
						$('.update').children('span').removeClass('onHover');
						$('.doing').removeAttr('class').attr('class','icon_feeddoing_off doing');
						$('.doing').children('span').removeClass('onHover');
					}
				}

			},

			updateFeed: function() {
				var keepContents = $('#feedContentsInput').val();
				this.retouchingFeedTypeStlye('update');
				this.props.checkFeedType('GENERAL');
				this.state.feedType = 'GENERAL';
				var btnElement = $(React.findDOMNode(this.refs.postup));
				React.unmountComponentAtNode(document.getElementById('feedElementDiv'));
				React.render(<NormalFeedElement btnElement={btnElement} keepContents={keepContents} ogSetting={this.ogSetting} targetInfoList={this.state.targetInfoList} fromGroupInfo={this.props.fromGroupInfo} addFollowerList={this.addFollowerList} textareaClick={this.textareaClick} fileLayout={this.fileLayout}/>, document.getElementById('feedElementDiv'));
				$(React.findDOMNode(this.refs.postup)).css('cursor','initial').removeClass('btn-attention').addClass('btn-default').show();
				$('.showApp').show();
			},

			feedToDo: function() {
				var keepContents = $('#feedContentsInput').val();
				this.retouchingFeedTypeStlye('doing');				
				this.props.checkFeedType('GENERAL');
				this.state.feedType = 'GENERAL';
				var btnElement = $(React.findDOMNode(this.refs.postup));
				React.unmountComponentAtNode(document.getElementById('feedElementDiv'));
				React.render(<ToDoElement keepContents={keepContents} btnElement={btnElement} targetInfoList={this.state.targetInfoList} fromGroupInfo={this.props.fromGroupInfo} addFollowerList={this.addFollowerList} textareaClick={this.textareaClick} fileLayout={this.fileLayout}/>, document.getElementById('feedElementDiv'));
				$(React.findDOMNode(this.refs.postup)).css('cursor','initial').removeClass('btn-attention').addClass('btn-default').show();
				$('.showApp').show();

			},
	
			textareaClick: function() {
				$('.showApp').show();
				$(React.findDOMNode(this.refs.mainAddButton)).show();
				//$('#feedElementDiv').css('margin-bottom', '17px');
				var sessionMe = _Dropzone_session_memberId;
				var targetSessionId = _Dropzone_target_memberId;
				if(this.props.targetId !== undefined) {
					targetSessionId = this.props.targetId
				}
				var targetFollower = [];
				var fromGroupInfo = [];
				var targetFollowerVo = [];
				if(sessionMe !== targetSessionId && this.state.textClick === 'false') {

					var targetName = _Dropzone_target_memberName;
					if(this.props.targetName !== undefined) {
						targetName = this.props.targetName;
					}

					var targetMentionVo = {
							"name": targetName,
							"uid" : targetSessionId
					};

					var follower = {
									label : targetName,
									value : targetName,
									id	  : targetSessionId,
									email : '',
									type  : 'MEMBER',
									pic   : ''
								};

					if(this.state.targetInfoList.length == 0) {
						this.state.targetInfoList = this.state.targetInfoList.concat(follower); 
						targetFollower.push(targetMentionVo);
					} else {
						targetFollower.push(targetMentionVo);
					}
					
					if(this.props.fromGroupInfo.length>0) {
						fromGroupInfo = this.props.fromGroupInfo;
						targetFollower = [];
					}

					this.state.textClick = 'true';
					this.addFollowerList(targetFollower, fromGroupInfo, targetFollowerVo);
				} else {
					if(this.props.fromGroupInfo.length>0 && this.state.textClick === 'false') {

						this.addFollowerList(targetFollower, this.props.fromGroupInfo, []);
						this.state.textClick = 'true';
					}

				}
			},

			feedSurvey: function() {
				this.props.removeOGTag();
				var keepContents = $('#feedContentsInput').val();
				this.retouchingFeedTypeStlye('survay');
				this.props.checkFeedType('POLL');
				this.state.feedType = 'POLL';
				var btnElement = $(React.findDOMNode(this.refs.postup));
				React.unmountComponentAtNode(document.getElementById('feedElementDiv'));
				React.render(<PullElement btnElement={btnElement} keepContents={keepContents} targetInfoList={this.state.targetInfoList} fromGroupInfo={this.props.fromGroupInfo} addFollowerList={this.addFollowerList} textareaClick={this.textareaClick} fileLayout={this.fileLayout}/>, document.getElementById('feedElementDiv'));
				$(React.findDOMNode(this.refs.postup)).css('cursor','initial').removeClass('btn-attention').addClass('btn-default').show();
				$('.showApp').show();
			},

			feedNotice: function() {
				var keepContents = $('#feedContentsInput').val();
				this.retouchingFeedTypeStlye('feedNotice');	
				this.props.checkFeedType('NOTICE');
				this.state.feedType = 'NOTICE';
				var btnElement = $(React.findDOMNode(this.refs.postup));
				React.unmountComponentAtNode(document.getElementById('feedElementDiv'));
				React.render(<NoticeElement btnElement={btnElement} keepContents={keepContents} targetInfoList={this.state.targetInfoList} fromGroupInfo={this.props.fromGroupInfo} addFollowerList={this.addFollowerList} textareaClick={this.textareaClick} titleContentsSetting={this.titleContentsSetting} fileLayout={this.fileLayout}/>, document.getElementById('feedElementDiv'));
				$(React.findDOMNode(this.refs.postup)).css('cursor','initial').removeClass('btn-attention').addClass('btn-default').show();
				$('.showApp').show();
			},

			titleContentsSetting:function(title, contents) {
				this.props.titleContentsSetting(title, contents);
			},

			uploadPcToSns: function () {
				console.log('uploadPcToSns');
			},

			uploadPcToSharePoint: function () {
				console.log('uploadPcToSharePoint');
			},
		
			uploadFromSharePoint: function () {
				console.log('uploadFromSharePoint');

				openSharepointFilePop();
			},

			fileLayout: function () {

				mainSelectFileLayout = true;
				
				$('#selectFileLayout').show();
				$('.showApp').show();
				//$(React.findDOMNode(this.refs.mainAddButton)).show();
				
				this.textareaClick();
			},

			deleteSharepointFile: function () {
				deleteSharepointFile();
			},

			showTag: function() {
				$('#tag_dl').show();
				$(React.findDOMNode(this.refs.mainAddButton)).css('border-top','1px solid #dde0e6');
			},

	    	render: function () {
	           		var self = this;
					var files = this.state.files,
            		config = this.props.config,
            		className = 'filepicker dropzone';

				return (
						<div className='drag-area plus_title'>
							<div className='feed_select2' id='selectFileLayout' style={{'display':'none'}}>
                        		<ul>
                            		<li onClick={this.uploadPcToSns} className='icon_fs fileClass'><img src='../images/btn_snssave.png' width='14' height='16' /></li>
                                	<li onClick={this.uploadPcToSns} className='txt_fs fileClass'>{Feed_Dropzone_MSG_CHOOSEFILEFROMPC}<input type='hidden' id='mainAttach'/></li>
                                	<li onClick={this.uploadFromSharePoint} style={{'marginTop':'0'}} className='nextline icon_fs'><img src='../images/btn_share.png' width='16' height='16' /></li>
                                	<li onClick={this.uploadFromSharePoint} className='txt_fs2'>{Feed_Dropzone_MSG_CHOOSEFILEFROMSP}</li>
                        		</ul>
                        	</div>
                        	<div className='feed_tab'>
		                        <ul>
		                        	<li className='icon_update_on update' onClick={this.updateFeed}><span className='onHover'>{Feed_Dropzone_MSG_FEEDTABNEWFEEDTEXT}</span></li>                                           
	                                <li className='icon_feeddoing_off doing' onClick={this.feedToDo}><span>{Feed_Dropzone_MSG_FEEDTABTODOTEXT}</span></li> 
	                                <li className='icon_feedsurvay_off survay' onClick={this.feedSurvey}><span className='ifs_off'>{Feed_Dropzone_MSG_FEEDTABPOLLTEXT}</span></li>
	                        	</ul>
                        	</div>
							<div id='feedElementDiv' className='feedElementDiv' ref='feedElementDiv' style={{'clear':'both'}}></div>                 

							<div className='feed_select hidden' style={{'display':'none'}}>
       							<ul>
            						<li className='icon_fs'><img src='../images/icon_doregister.gif' width='16' height='15' /></li>
               						<li className='txt_fs ignore' onClick={this.clickEvent}>
										<input type='hidden' id='datepicker'/>
 										<div className='trigger'>{Feed_Dropzone_MSG_REGISTERTODO}</div>
									</li>
									<li style={{'marginTop':'0'}} className='nextline icon_fs'><img src='../images/icon_survay.png' width='16' height='16' /></li>
                                   	<li className='txt_fs2'>{Feed_Dropzone_MSG_REGISTERPOLL}</li>
	           						<li className='nextline icon_fs' style={{'marginTop': '0px'}}><img src='../images/icon_notice.gif' width='16' height='14' /></li>
									<li className='txt_fs2'>{Feed_Dropzone_MSG_REGISTERNOTI}</li>
	       						</ul>
	       					</div>

							<div id='ogArea'></div>
							<div id='file_preview'></div>
							<div id='followerApp' className='showApp' style={{'borderTop':'1px solid #e0e0e0'}}></div>
							<div id='tagApp' className='showApp'></div>
							<div className="buttonWrapper showApp" style={{'display':'none', 'textAlign':'right', 'background':'#f5f5f5', 'height':'39px', 'paddingRight':'18px', 'borderTop':'none'}} ref='mainAddButton'>
								<span className='icon_tag2' onClick={this.showTag}></span>
								<button style={{'float':'right', 'marginTop':'5px', 'cursor':'initial'}} type='button' id='addFeed' ref='postup' className='btn-m btn-default' onClick={this.feedAdd}>{Feed_Dropzone_MSG_FEEDWRITEBTNTEXT}</button>
							</div>
						</div>
	        		);
	    		},
	    
			setupEvents: function () {

	        	var eventHandlers = this.props.eventHandlers;
	
	        	if(!this.dropzone || !eventHandlers) {
	            		return;
        		}
	
	        	for(var eventHandler in eventHandlers) {
	            	if(eventHandlers.hasOwnProperty(eventHandler) && eventHandlers[eventHandler]) {
	                	if(Object.prototype.toString.call(eventHandlers[eventHandler]) === '[object Array]') {
	                   		for(var i = 0; i < eventHandlers[eventHandler].length; i = i + 1) {
	                       		if(eventHandler === 'init') {
	                           		eventHandlers[eventHandler][i](this.dropzone);
	                       		} else {
                            		this.dropzone.on(eventHandler, eventHandlers[eventHandler][i]);
                        		}
                    		}
                		} else {
                    		if(eventHandler === 'init') {
	                       		eventHandlers[eventHandler](this.dropzone);
	                   		} else {
	                       		this.dropzone.on(eventHandler, eventHandlers[eventHandler]);
	                  	 	}
	               		}
	           		}
	        	}
				
	       		this.dropzone.on('addedfile', function(file)  {
            		if(file) {
	                	var files = this.state.files;
	                	if(!files) {
		                   	files = [];
	    	            }
	        	        files.push(file)
	    	            this.setState({files: files});
						$('.showApp').show();
	        	    }
        		}.bind(this));	

	        	this.dropzone.on('removedfile', function(file)  {
	            	if(file) {
                		var files = this.state.files;
						var feedFiles = this.state.feedFileVo;
                		if(files && files.length > 0) {
	                   		for(var i = 0; i < files.length; i++) {
	                       		if(files[i].name === file.name && files[i].size === file.size) {
	                           		files.splice(i, 1);
									feedFiles.splice(i,1);
	                       		}
	                   		}
							this.props.fileHandler(feedFiles);
	                    	this.setState({files: files, feedFileVo: feedFiles});
							removeDrawTopLine();
	               		}
	            	}	
	        	}.bind(this));
	    	}
		});

	
	
	

		var CommentDropzoneComponent = React.createClass({
    		getDjsConfig: function () {
				var previewsContainerId = 'file_preview' + this.props.feedId;
				var clickAreaId = 'clickArea' + this.props.feedId;
				var options,
            		defaults = {
            	    		url: this.props.config.postUrl,
            	    		headers: {
            	        		'Access-Control-Allow-Credentials': true,
            	        		'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-PINGOTHER, X-File-Name, Cache-Control',
            	        		'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS',
            	        		'Access-Control-Allow-Origin': '*'
            	    		},
            	    		withCredentials: false, //순차 또는 한번에 올리는 옵션 
							dictDefaultMessage: "파일을 여기로 끌어서 놓습니다.",
 							thumbnailWidth: 60,
      						thumbnailHeight: 60,
							previewsContainer: document.getElementById(previewsContainerId),
							previewTemplate: "<div class=\"add_file dz-preview dz-file-preview\" style=\"padding:0 0 10px 0;padding:0 0 10px 0;margin-top:-1px; margin-left: 54px; border-left:1px solid #e0e0e0; border-right:1px solid #e0e0e0; border-bottom:none;\">\n <dl style=\"padding:10px 0 0 0;\">\n	<dt><img data-dz-thumbnail width=\"40\" height=\"40\"/></dt>\n  <dd class=\"name_file dz-filename\"><strong><span data-dz-name></span></strong></dd>\n <dd class=\"dz-progress progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></dd>\n <dd class=\"dz-error-message\"><span data-dz-errormessage></span></dd>\n <dd class=\"dz-success-mark\">\n <svg width=\"19\" height=\"20\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n <title>Check</title>\n <defs></defs>\n <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </dd>\n <dd class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n 	</dd>\n </dl>	</div>",
            				clickArea: clickAreaId,	
				};

        		if(this.props.config.allowedFiletypes && this.props.config.allowedFiletypes.length > 0) {
	   				defaults.acceptedFiled = this.props.config.allowedFiletypes;
   				}

        		if(this.props.djsConfig) {
       				options = Helpers.extend(true, {}, defaults, this.props.djsConfig);
   				} else {
					options = defaults;
   				}

       			return options;

    		},

			getInitialState: function () {
	       		return {
					feedFollowerList : [], 
					ogContents: '', 
					files: [], 
					feedFileVo:[], 
					ogValidate:'false', 
					allFollowerList:[], 
					writtenFollowerList:[], 
					fromFollowerInputList:[],
				}
	    	},

			componentWillReceiveProps: function (nextProps) {
  			},

			followerHandler: function(followerList) {
				var totalFollowerList = [];
				followerList.forEach(function(follower) {
					var followerVo = {
								"itemId"    	 : '14',
								"itemType"  	 : 'FEED',
								"followerId"     : follower.id,
								"followerType"   : follower.type,
								"followerName"   : follower.label,
								"followerEmail"  : follower.email,
								"followerImgUrl" : follower.pic
						}
					totalFollowerList.push(followerVo);
				});
	
				this.state.feedFollowerList = totalFollowerList;
				if(totalFollowerList.length > 0) {
						$('#'+this.props.addCommentId).css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
				} else if(totalFollowerList.length == 0) {
						$('#'+this.props.addCommentId).css('cursor','initial').removeClass('btn-attention').addClass('btn-default');
				}
			},
	
			reset: function() {
				this.refs.feedContents.getDOMNode().value='';
				var commentId = this.props.commentId;

				this.setState({
								feedFollowerList : [], 
								ogContents: '', 
								files: [], 
								feedFileVo:[], 
								ogValidate:'false', 
								allFollowerList:[], 
								writtenFollowerList:[], 
								fromFollowerInputList:[]
								});
								
				$('#'+commentId).mentionsInput('destroy');
				$('#'+commentId).removeAttr('style');
				$('#'+commentId).attr('style', 'border:currentColor; border-image:none; width:100%; height:20px; overflow:hidden; resize:none;');
				var pppId = 'ppp' + this.props.feedId;
				$('#'+pppId).removeAttr('style');

/**/
        		var self = this;

				var commentId = this.props.commentId;
				var addCommentId = this.props.addCommentId;
				$('#'+commentId).mentionsInput({
            		showAtCaret: true,
       				source: function(request, response) {
						if(request.term.length > 1) {
       	    	 			$.ajax({
                					url	    : _Dropzone_BASE_MENTIONS+'/'+request.term,
       	         					type    : "get",
        	        				success : function(data) {
											var array = [];
											data.forEach(function(member){
												if(member.id != _Dropzone_session_memberId) {
													var mentionVo = {
														value : member.name,
														uid	  :	member.id,
														dept  : member.deptFullPath
													};
													array.push(mentionVo);
												}

											});
											response(array);

        	        				},
        	        				error	: function(jqXHR, textStatus, errorThrown){
        	            	 			console.log( textStatus);
        	        				}
        	    			});
						}
        			}
        		}).elastic();

				$('#'+commentId).keyup(function(e){
					if(this.value !='') {
						$(React.findDOMNode(self.refs.postup)).css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
					} else if(this.value =='') {
						$(React.findDOMNode(self.refs.postup)).css('cursor','initial').removeClass('btn-attention').addClass('btn-default');
					}

				});

				$('#'+commentId).keypress(function(e){

					if( e.keyCode === 13 || e.keyCode === 32 ){
						var mentionVal = $(this).mentionsInput('getMentions');
						self.addFollowerList(mentionVal);
					}

				});
				
				$('#'+commentId).bind('keydown', function(e){
					var keycode = (e.keyCode ? e.keyCode : e.which);
					if(_Grobal_isEnterKeyReg == 1) {
					
							var v = $(this).val();
							if(keycode === 13 && e.ctrlKey) { // 컨트롤과 엔터함께누를경우
								
								var el = document.getElementById(commentId),
						            allText = $(this).val(),
						            currentPos = getCaret(el),
						            beforeText = allText.substr(0, currentPos) + '\n',
						            afterText = allText.substr(currentPos);
						
								
						
						        $(this).val(beforeText + afterText);
						        
						        setCaretPosition(el, currentPos);
								
								/*
								var lastChar = ($(this).val()).slice(-1);
								if (escape(lastChar).length < 4) {
									$(this).val(v + '\r\n');
								}
								*/
						
							} else if(keycode === 13) {
								$('#'+addCommentId).click();
							} else {
								//alert(GetIEVersion());
							}
							
						}
				});

				$('#'+commentId).bind('input keyup paste', function(e){
					var keycode = (e.keyCode ? e.keyCode : e.which);
					if( (keycode === 13 || keycode === 32)  && 
					    self.state.ogValidate != 'true' && 
						(self.state.feedType !== 'NOTICE' || self.state.feedType !== 'POLL') ) {

						// 엔터키 등록을 하지 않을 경우만 링크 정보 읽어옴.
						if(_Grobal_isEnterKeyReg == 0) {
							var urlStr = this.value.trim();
							var urlArray = self.getLinks(urlStr);
							if(urlArray !=null && urlArray.length>0) {
								var url = urlArray[0].replace("http://","").replace("https://","");
								$.ajax({
	      								url: contextpath + '/opengraph',
	      								dataType: 'json',
										type : 'POST',
										data : { url : url},
	      								cache: false,
	      								success: function(data) {
												self.state.ogContents = JSON.stringify(data);
												self.state.ogValidate = 'true';
												self.OGTrigger(data);
						    			}.bind(this),
	      								error: function(xhr, status, err) {
											self.state.ogValidate = 'false';
	        								console.error(urlStr, status, err.toString());
	      								}.bind(this)
	    						});	
							}
						}
					}
				});

				$('#'+addCommentId).click(function() {
					var mentionVal = $('#'+commentId).mentionsInput('getValue');

					
					if(mentionVal.trim().length === 0) {
					
						var spfilelength = $('#file_preview' + self.props.feedId + ' > span').length;
					
						if(self.state.files.length <= 0 && spfilelength <= 0) {
							return false;
						}
							
					}
					
					//피드 해쉬태그 캐치
					var addTagArray = [];
					var writtenTagArray = mentionVal.match(/#\S+/g);
					
					if(self.props.parentTagList !== undefined) {
						self.props.parentTagList.forEach(function(tag){
							if(writtenTagArray !==null) {
								for(var j=0; j<writtenTagArray.length; j++) {
									if(writtenTagArray[j].replace('#','').toLowerCase() === tag.tagName.toLowerCase()) {
										writtenTagArray.splice(j, 1);
									}
								}
							}


		
						});
					}
	
					if(writtenTagArray !==null && writtenTagArray.length > 0 ) {
						writtenTagArray.forEach(function(str){
							var tagName = str.replace('#', '');
							var tagVo = {
									"tagName": tagName
									}
	
							addTagArray.push(tagVo);
						});
					}

					self.props.setFeedTitleNContents(mentionVal, 
													 self.state.ogContents, 
													 self.refs.pFeedId.getDOMNode().value.trim(), 
													 self.refs.contentsType.getDOMNode().value.trim(),
													 self.state.feedFollowerList,	
													 addTagArray
													 );

					self.reCreate(cfId);
					self.props.addComment();
					self.reset();
  				});
								
				_getLengthCheckCommand($('#'+commentId));
				
				$('.commentff .mentions-input .highlighter').css('height', '21px');
				$('.commentff .mentions-input textarea').css('height', '21px');
				
				$(React.findDOMNode(this.refs.feedContents)).keydown(function(e){
					var height = $(this).height();
					var parent = $(React.findDOMNode(self.refs.commentff));
					if($(this).val() == '') {
						height = 21;
						$(this).css('height', height+'px');
					}
					var mentionInput = parent.children('.mentions-input').css('height', (height+7)+'px');
					var highliter = mentionInput.children('.highlighter').css('height', height+'px');
					
					
				}).keyup(function(e){
					var height = $(this).height();
					var parent = $(React.findDOMNode(self.refs.commentff));
					if($(this).val() == '') {
						height = 21;
						$(this).css('height', height+'px');
					}
					var mentionInput = parent.children('.mentions-input').css('height', (height+7)+'px');
					var highliter = mentionInput.children('.highlighter').css('height', height+'px');
					
					
				});
				



/**/

				var filePreviewId = 'file_preview'+this.props.feedId;
				this.removeOGTag();
				$('#'+filePreviewId).empty();
				var cfId = 'cf' + this.props.feedId;
				var unmount = React.unmountComponentAtNode(document.getElementById(cfId));
				React.render(<CommentFollowerApp pFeedId				  =	{this.props.feedId} 
												 fromFollowerInputSetting = {this.fromFollowerInputSetting} 
												 writtenFollowerList	  = {[]} 
												 followerHandler		  = {this.followerHandler}
												 removeDropFollower       = {this.removeDropFollower}
								/>
							 , document.getElementById(cfId)
				);
				$(React.findDOMNode(this.refs.commentFollowerArea)).hide();
				$(React.findDOMNode(this.refs.commentButtonArea)).hide();
			},

			getLinks : function(text) {
            	var expression = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
            	return (text.match(expression));
        	},

			OGTrigger: function(data) {
				var commentOgId = 'commentOg' + this.props.feedId;
				var showRemove = 'true';
				React.render(<CommentOG data={data} removeOG={this.removeOGTag} showRemove={showRemove}/>, document.getElementById(commentOgId));
			},

			removeOGTag:function() {
				var commentOgId = 'commentOg' + this.props.feedId;
				this.state.ogContents = '';
				this.state.ogValidate = 'false';
				React.unmountComponentAtNode(document.getElementById(commentOgId));
				$('#'+commentOgId).empty();
			},

			reCreate:function(cfId) {
				var unmount = React.unmountComponentAtNode(document.getElementById(cfId));
				React.render(<CommentFollowerApp pFeedId	 			 = {this.props.feedId} 
												 fromFollowerInptSetting = {this.fromFollowerInputSetting} 
					  							 writtenFollowerList	 = {this.state.writtenFollowerList} 
												 followerHandler 		 = {this.followerHandler}
												 removeDropFollower       = {this.removeDropFollower}
							 />
							, document.getElementById(cfId)
				);
			},

			fromFollowrSetting: function(followerList){
				this.state.allFollowerList = followerList;
			},

			fromFollowerInputSetting: function(follower) {
				var duplicated = false;
				for(var i=0; i<this.state.fromFollowerInputList.length; i++) {
					if(this.state.fromFollowerInputList[i].id === follower.id && follower.type==='MEMBER') {
						duplicated = true;
						break;
					}
				}
				if(!duplicated) {
					this.state.fromFollowerInputList = this.state.fromFollowerInputList.concat(follower);
				}
			},

			removeDropFollower:function(follower) {
				var index = -1;	

				for(var j = 0; j < this.state.fromFollowerInputList.length; j++ ) {
    				if(this.state.fromFollowerInputList[j].id == follower.id && this.state.fromFollowerInputList[j].type == follower.type ) {
    					index = j;
    					break;
    				}
    			}				

				if(index > -1) {
    				this.state.fromFollowerInputList.splice(index, 1);
				}	

				this.state.fromFollowerInputList = this.state.fromFollowerInputList;
			},

			addFollowerList: function(mentionVal) { 

				var wfl = [];

				for(var i=0; i<mentionVal.length; i++) {
					if(mentionVal[i].uid != _Dropzone_session_memberId){
						mentionVo = {
										label : mentionVal[i].name,
										value : mentionVal[i].name,
										id	  : mentionVal[i].uid,
										email : '',
										type  : 'MEMBER',
										pic   : ''
									};
	
						wfl.push(mentionVo);
					}
				}

				for(var k=0; k<this.state.fromFollowerInputList.length; k++) {
					wfl.push(this.state.fromFollowerInputList[k]);
				}

				var mentionList = [];

    			for(var j = 0; j < wfl.length; j++){
					if(j===0) {
					mentionList.push(wfl[0]);
					} else {
						var isDup = false;
						for(var k=0; k<mentionList.length; k++){
							if(mentionList[k].id === wfl[j].id) {
								isDup = true;
								break;
							}
						}
						if(!isDup)mentionList.push(wfl[j]);			
					}
    			}

				this.state.writtenFollowerList = mentionList;

				var cfId = 'cf' + this.props.feedId;
				React.unmountComponentAtNode(document.getElementById(cfId));
				React.render(<CommentFollowerApp pFeedId				  = {this.props.feedId} 
										  		 fromFollowerInputSetting = {this.fromFollowerInputSetting} 
												 writtenFollowerList	  = {this.state.writtenFollowerList} 
												 followerHandler		  = {this.followerHandler}
												 removeDropFollower       = {this.removeDropFollower}	
							  />, document.getElementById(cfId));		

			},

			textclick: function() {
				$(React.findDOMNode(this.refs.commentFollowerArea)).show();
				$(React.findDOMNode(this.refs.commentButtonArea)).show();
			},

    		componentDidMount: function () {

				this.props.fileHandler([]);
        		var self = this;
				var cfId = 'cf' + this.props.feedId;
            	options = this.getDjsConfig();
				var memberPicUrl = _Dropzone_MEMBER_PIC + '?memberId=' + _Dropzone_session_memberId;
				$(React.findDOMNode(this.refs.commentPicture)).css("background", 'url('+ memberPicUrl + ') no-repeat').css("background-size", 'cover');

        		if(!this.props.config.postUrl && !this.props.eventHandlers.drop) {
            		console.info('Neither postUrl nor a "drop" eventHandler specified, the React-Dropzone component might misbehave.');
        		}
	
        		Dropzone.autoDiscover = false;
        		this.dropzone = new Dropzone(React.findDOMNode(self.refs.commentff), options);
        		this.setupEvents();

				var commentId = this.props.commentId;
				var addCommentId = this.props.addCommentId;
				$('#'+commentId).mentionsInput({
            		showAtCaret: true,
       				source: function(request, response) {
						if(request.term.length > 1) {
       	    	 			$.ajax({
                					url	    : _Dropzone_BASE_MENTIONS+'/'+request.term,
       	         					type    : "get",
        	        				success : function(data) {
											var array = [];
											data.forEach(function(member){
												if(member.id != _Dropzone_session_memberId) {
													var mentionVo = {
														value : member.name,
														uid	  :	member.id,
														dept  : member.deptFullPath
													};
													array.push(mentionVo);
												}

											});
											response(array);

        	        				},
        	        				error	: function(jqXHR, textStatus, errorThrown){
        	            	 			console.log( textStatus);
        	        				}
        	    			});
						}
        			}
        		}).elastic();

				$('#'+commentId).keyup(function(e){
					if(this.value !='') {
						$(React.findDOMNode(self.refs.postup)).css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
					} else if(this.value =='') {
						$(React.findDOMNode(self.refs.postup)).css('cursor','initial').removeClass('btn-attention').addClass('btn-default');
					}

				});

				$('#'+commentId).keypress(function(e){

					if( e.keyCode === 13 || e.keyCode === 32 ){
						var mentionVal = $(this).mentionsInput('getMentions');
						self.addFollowerList(mentionVal);
					}

				});
				
				$('#'+commentId).bind('keydown', function(e){
				
					var keycode = (e.keyCode ? e.keyCode : e.which);
					
					if(_Grobal_isEnterKeyReg == 1) {
					
							var v = $(this).val();
							if(keycode === 13 && e.ctrlKey) { // 컨트롤과 엔터함께누를경우
								
								var el = document.getElementById(commentId),
						            allText = $(this).val(),
						            currentPos = getCaret(el),
						            beforeText = allText.substr(0, currentPos) + '\n',
						            afterText = allText.substr(currentPos);
						
								
						
						        $(this).val(beforeText + afterText);
						        
						        setCaretPosition(el, currentPos);
								
								/*
								var lastChar = ($(this).val()).slice(-1);
								if (escape(lastChar).length < 4) {
									$(this).val(v + '\r\n');
								}
								*/
						
							} else if(keycode === 13) {
								$('#'+addCommentId).click();
							} else {
								//alert(GetIEVersion());
							}
							
						}
				});

				$('#'+commentId).bind('input keyup paste', function(e){

				
					var keycode = (e.keyCode ? e.keyCode : e.which);
					if( (keycode === 13 || keycode === 32)  && 
					    self.state.ogValidate != 'true' && 
						(self.state.feedType !== 'NOTICE' || self.state.feedType !== 'POLL') ) {

						// 엔터키 등록을 하지 않을 경우만 링크 정보 읽어옴.
						if(_Grobal_isEnterKeyReg == 0) {
							var urlStr = this.value.trim();
							var urlArray = self.getLinks(urlStr);
							if(urlArray !=null && urlArray.length>0) {
								var url = urlArray[0].replace("http://","").replace("https://","");
								$.ajax({
	      								url: contextpath + '/opengraph',
	      								dataType: 'json',
										type : 'POST',
										data : { url : url},
	      								cache: false,
	      								success: function(data) {
												self.state.ogContents = JSON.stringify(data);
												self.state.ogValidate = 'true';
												self.OGTrigger(data);
						    			}.bind(this),
	      								error: function(xhr, status, err) {
											self.state.ogValidate = 'false';
	        								console.error(urlStr, status, err.toString());
	      								}.bind(this)
	    						});	
							}
						}
					}
				});

				var self = this;				

				$('#'+addCommentId).click(function() {
					var mentionVal = $('#'+commentId).mentionsInput('getValue');

					
					if(mentionVal.trim().length === 0) {
					
						var spfilelength = $('#file_preview' + self.props.feedId + ' > span').length;
					
						if(self.state.files.length <= 0 && spfilelength <= 0) {
							return false;
						}
							
					}
					
					//피드 해쉬태그 캐치
					var addTagArray = [];
					var writtenTagArray = mentionVal.match(/#\S+/g);
					
					if(self.props.parentTagList !== undefined) {
						self.props.parentTagList.forEach(function(tag){
							if(writtenTagArray !==null) {
								for(var j=0; j<writtenTagArray.length; j++) {
									if(writtenTagArray[j].replace('#','').toLowerCase() === tag.tagName.toLowerCase()) {
										writtenTagArray.splice(j, 1);
									}
								}
							}


		
						});
					}
	
					if(writtenTagArray !==null && writtenTagArray.length > 0 ) {
						writtenTagArray.forEach(function(str){
							var tagName = str.replace('#', '');
							var tagVo = {
									"tagName": tagName
									}
	
							addTagArray.push(tagVo);
						});
					}

					self.props.setFeedTitleNContents(mentionVal, 
													 self.state.ogContents, 
													 self.refs.pFeedId.getDOMNode().value.trim(), 
													 self.refs.contentsType.getDOMNode().value.trim(),
													 self.state.feedFollowerList,	
													 addTagArray
													 );

					self.reCreate(cfId);
					self.props.addComment();
					self.reset();
  				});

        		Dropzone.autoDiscover = false;
				this.dropzone.forceEnable($(React.findDOMNode(this.refs.subAttatchId)));
        		this.setupEvents();
				React.render(<CommentFollowerApp pFeedId				  = {this.props.feedId} 
												 fromFollowerInputSetting = {this.fromFollowerInputSetting} 
												 writtenFollowerList	  = {this.state.writtenFollowerList} 
												 followerHandler		  = {this.followerHandler}
												 removeDropFollower       = {this.removeDropFollower}
								/>, document.getElementById(cfId));
								
				_getLengthCheckCommand($('#'+commentId));
				
				//$('.commentff .mentions-input').css('height', '29px');
				$('.commentff .mentions-input .highlighter').css('height', '21px');
				$('.commentff .mentions-input textarea').css('height', '21px');
				
				$(React.findDOMNode(this.refs.feedContents)).keydown(function(e){
					var height = $(this).height();
					var parent = $(React.findDOMNode(self.refs.commentff));
					if($(this).val() == '') {
						height = 21;
						$(this).css('height', height+'px');
					}
					var mentionInput = parent.children('.mentions-input').css('height', (height+7)+'px');
					var highliter = mentionInput.children('.highlighter').css('height', height+'px');
					
					
				}).keyup(function(e){
					var height = $(this).height();
					var parent = $(React.findDOMNode(self.refs.commentff));
					if($(this).val() == '') {
						height = 21;
						$(this).css('height', height+'px');
					}
					var mentionInput = parent.children('.mentions-input').css('height', (height+7)+'px');
					var highliter = mentionInput.children('.highlighter').css('height', height+'px');
					
					
				});
				
	    	},

			updateFeedFileVo: function(file, responseFileVo, e) {
				var feedFiles = this.state.feedFileVo;
				responseFileVo.regMemberId = _Dropzone_session_memberId;
				if(feedFiles.length === 0) {
					feedFiles.push(responseFileVo);
				} else {

					var isDuplicated = false;
					for(var i=0; i<feedFiles.length; i++) {
						if(feedFiles[i].fileUrl === responseFileVo.fileUrl &&  feedFiles[i].fileName === responseFileVo.fileName) {
							isDuplicated = true;		
						   	break;
						}
          			}

					if(!isDuplicated) feedFiles.push(responseFileVo);
					
					$(React.findDOMNode(this.refs.postup)).css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');

				}

				var answerTagId = 'answerTag' + this.props.feedId;
				if($('#'+answerTagId).html().length ===0) {
					this.props.answerTag();
				}
				this.props.fileHandler(feedFiles);
				this.setState({feedFileVo: feedFiles});

			},				

			componentDidUpdate: function() {
				this.dropzone.on('success', this.updateFeedFileVo);
			},

	    	componentWillUnmount: function () {
	       		try{this.dropzone.destroy();}catch(e){console.log(e)};
	   		},

			uploadPcToSns: function () {
				console.log('uploadPcToSns');
			},

			uploadPcToSharePoint: function () {
				console.log('uploadPcToSharePoint');
			},
		
			uploadFromSharePoint: function () {
				console.log('uploadFromSharePoint');

				openSharepointFilePop(this.props.feedId);
			},

			fileLayout: function () {
				var answerTagId = 'answerTag' + this.props.feedId;
				if($('#'+answerTagId).html().length ===0) {
					this.props.answerTag();
				}

				var subFileLayoutId = 'subFileLayout' + this.props.feedId;

				subSelectFileLayout = true;
				subSelectFileLayoutId = subFileLayoutId;

				$('#'+subFileLayoutId).show();

			},

			render: function() {
				var previewsContainerId = 'file_preview' + this.props.feedId;
				var clickAreaId = 'clickArea' + this.props.feedId;
				var commentOgId = 'commentOg' + this.props.feedId;
				var answerTagId = 'answerTag' + this.props.feedId;
				var pppId = 'ppp' + this.props.feedId;
				var subFileLayout = 'subFileLayout' + this.props.feedId;
				var subButtonLayout = 'subButtonLayout' + this.props.feedId;
				var cfId = 'cf' + this.props.feedId;
	           	var files = this.state.files,
	           		config = this.props.config,
	           		className = 'filepicker dropzone';
				var sessionMemberName = _Dropzone_session_memberName;
				var sessionMemberPositionName = _Dropzone_session_member_PosName;
				var opinionStyle = {'marginLeft':'0px'};
				if(this.props.feedType==='APPROVAL' && this.props.approvalStatus === undefined) {
					opinionStyle = {'paddingTop':'1px solid #dde0e6', 'display':'none'};
				}	
				return (
						<div className='my_opinion' style={opinionStyle}>
							<input type='hidden' ref='pFeedId' value={this.props.feedId} />
							<input type='hidden' ref='contentsType' value='COMMENT' />

							<span className='answer_peo' id={answerTagId}></span>
							
               				<div className='big_wrap'>
               				
	               				<span className='pic_small' ref='commentPicture'>pic</span>
	               				<div className='add_peo commentff feed_comment' ref='commentff' style={{'overflow':'hidden', 'marginRight':'0px'}}>
									<div style={{'border':'1px solid #e0e0e0', 'background':'#ffffff'}} ref='comment_feed_area'>
										<textarea id={this.props.commentId} onClick={this.textclick} style={{'border':'currentColor', 'borderImage':'none', 'width':'100%', 'height':'20px', 'overflow':'hidden', 'resize':'none'}} cols='' rows='' ref='feedContents' placeholder={Feed_Dropzone_MSG_COMMENTAREADEFAULTMSG}></textarea>
									</div>
								</div>
								<span className='cliparea' id={pppId} onClick={this.fileLayout}></span>
                                <div id={previewsContainerId}></div>
	           					<div className='add_peo' style={{'borderBottom':'none', 'marginLeft':'54px', 'paddingTop':'0'}}>
									<div id={commentOgId}></div>
	      						</div>
								<div id={cfId} className='width100' style={{'marginLeft':'45px', 'display':'none'}} ref='commentFollowerArea'></div>
							</div>
								

							<div className='feed_select3' id={subFileLayout} style={{'display':'none'}}>
                            	<ul>
                                	<li onClick={this.uploadPcToSns} className='icon_fs'><img src='../images/btn_snssave.png' width='14' height='16' /></li>
                                    <li onClick={this.uploadPcToSns} ref='subAttatchId' className='txt_fs subFileClass'>{Feed_Dropzone_MSG_CHOOSEFILEFROMPC}<input type='hidden' id={clickAreaId}/></li>
                                    <li onClick={this.uploadFromSharePoint} style={{'marginTop':'2px'}} className='nextline icon_fs'><img src='../images/btn_share.png' width='16' height='16' /></li>
                                    <li onClick={this.uploadFromSharePoint} className='txt_fs2 subFileClass'>{Feed_Dropzone_MSG_CHOOSEFILEFROMSP}</li>
                                </ul>
                            </div>
							<div className="buttonWrapper" id={subButtonLayout} style={{'display':'none', 'textAlign':'right','marginTop':'10px'}} ref='commentButtonArea'>
								<button style={{'cursor':'initial', 'marginTop':'0px', 'marginBottom':'0px'}} type='button' id={this.props.addCommentId} ref='postup' className='btn-m btn-default' onClick={this.feedAdd}>{Feed_Dropzone_MSG_FEEDWRITEBTNTEXT}</button>
							</div>
						</div>
	        	);

    		},

			setupEvents: function () {

        		var eventHandlers = this.props.eventHandlers;
				var self = this;
        		if(!this.dropzone || !eventHandlers) {
            		return;
        		}
	
        		for(var eventHandler in eventHandlers) {
            		if(eventHandlers.hasOwnProperty(eventHandler) && eventHandlers[eventHandler]) {
                		if(Object.prototype.toString.call(eventHandlers[eventHandler]) === '[object Array]') {
                    		for(var i = 0; i < eventHandlers[eventHandler].length; i = i + 1) {
                        		if(eventHandler === 'init') {
                            		eventHandlers[eventHandler][i](this.dropzone);
                        		} else {
                            		this.dropzone.on(eventHandler, eventHandlers[eventHandler][i]);
                        		}
                    		}
	               		} else {
	                    	if(eventHandler === 'init') {
	                       		eventHandlers[eventHandler](this.dropzone);
	                    	} else {
	                       		this.dropzone.on(eventHandler, eventHandlers[eventHandler]);
	                   		}
	                	}
            		}
        		}
	
	       		this.dropzone.on('addedfile', function(file)  {
	           		if(file) {
                		var files = this.state.files;
                		if(!files) {
	                    	files = [];
    	            	}
        	        	files.push(file)
    	            	this.setState({files: files});
						$(React.findDOMNode(self.refs.commentFollowerArea)).show();
						$(React.findDOMNode(self.refs.commentButtonArea)).show();
        	    	}
        		}.bind(this));
	
        		this.dropzone.on('removedfile', function(file)  {
            		if(file) {
                		var files = this.state.files;
						var feedFiles = this.state.feedFileVo;
	
                		if(files && files.length > 0) {
                    		for(var i = 0; i < files.length; i++) {
                        		if(files[i].name === file.name && files[i].size === file.size) {
                            		files.splice(i, 1);
									feedFiles.splice(i,1);
                        		}
                    		}

							this.props.fileHandler(feedFiles);
                    		this.setState({files: files, feedFileVo: feedFiles});

                		}
	            	}	
	        	}.bind(this));
	   		}

		});

	

	
	
		var ShareFeedDropzoneComponent = React.createClass({
		
   			getDjsConfig: function () {
	   			var options,
           		defaults = {
               		url: this.props.config.postUrl,
               		headers: {
                   		'Access-Control-Allow-Credentials': true,
                   		'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-PINGOTHER, X-File-Name, Cache-Control',
                   		'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS',
                   		'Access-Control-Allow-Origin': '*'
               		},
               		withCredentials: false, //순차 또는 한번에 올리는 옵션 
					dictDefaultMessage: "파일을 여기로 끌어서 놓습니다.",
 					thumbnailWidth: 60,
   					thumbnailHeight: 60,
					previewsContainer: document.getElementById('file_previewShp'),
					clickable: true,
					clickArea: 'mainAttachShpPop',
           		};

       			if(this.props.config.allowedFiletypes && this.props.config.allowedFiletypes.length > 0) {
           			defaults.acceptedFiled = this.props.config.allowedFiletypes;
       			}

       			if(this.props.djsConfig) {
           			options = Helpers.extend(true, {}, defaults, this.props.djsConfig);
       			} else {
       				options = defaults;
       			}

   				return options;

    		},
	
	    	getInitialState: function () {
	        	return {files: [], 
						feedFileVo:[], 
						allFollowerList:[], 
						writtenFollowerList:[], 
						fromFollowerInputList:[]
						}
	    	},

    		componentDidMount: function () {

				var self = this;

				$('.shareContentsInput').mentionsInput({
            		showAtCaret: true,
					source: function(request, response) {
						if(request.term.length > 1) {
       	    	 			$.ajax({
                					url	    : _Dropzone_BASE_MENTIONS+'/'+request.term,
       	         					type    : "get",
        	        				success : function(data) {
											var array = [];
											data.forEach(function(member){
												if(member.id != _Dropzone_session_memberId) {
													var mentionVo = {
														value : member.name,
														uid	  :	member.id,
														dept  : member.deptFullPath
													};
													array.push(mentionVo);
												}			
											});
											response(array);

        	        				},
        	        				error	: function(jqXHR, textStatus, errorThrown){
        	            	 			console.log( textStatus);
        	        				}
        	    			});
						}
        			}
        		}).elastic();

				$('.shareContentsInput').keyup(function(e){
					if(this.value !='') {
						$(React.findDOMNode(self.refs.shareup)).css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
					} else if(this.value =='') {
						$(React.findDOMNode(self.refs.shareup)).css('cursor','initial').removeClass('btn-attention').addClass('btn-default');
					}

				});

				$(".shareContentsInput").keypress(function(e){

					if( e.keyCode === 13 || e.keyCode === 32 ){
						var mentionVal = $(this).mentionsInput('getMentions');
						self.addFollowerList(mentionVal);
					}

				});

            	options = this.getDjsConfig();

        		if(!this.props.config.postUrl && !this.props.eventHandlers.drop) {
            		console.info('Neither postUrl nor a "drop" eventHandler specified, the React-Dropzone component might misbehave.');
        		}

        		Dropzone.autoDiscover = false;
        		this.dropzone = new Dropzone(React.findDOMNode(self), options);
				this.dropzone.forceEnable($('.shareFileClass'));
        		this.setupEvents();
				
				React.render(<ShareFollowerApp fromFollowerInputSetting={this.fromFollowerInputSetting} writtenFollowerList={this.state.writtenFollowerList} fromFollowrSetting={this.fromFollowrSetting}  followerHandler={this.followerHandler}/>, document.getElementById('shareFollowerApp'));
    		},

			updateFeedFileVo: function(file, responseFileVo, e) {
				var feedFiles = this.state.feedFileVo;
				responseFileVo.regMemberId = _Dropzone_session_memberId;
				
				if(feedFiles.length === 0) {
					feedFiles.push(responseFileVo);
					
				} else {
					var isDuplicated = false;
					for(var i=0; i<feedFiles.length; i++) {
						if(feedFiles[i].fileUrl === responseFileVo.fileUrl &&  feedFiles[i].fileName === responseFileVo.fileName) {
							isDuplicated = true;		
						   	break;
						}
        			}
					if(!isDuplicated) feedFiles.push(responseFileVo);
					
				}
				
				this.props.fileHandler(feedFiles);
				this.setState({feedFileVo: feedFiles});

			},				

			componentDidUpdate: function() {
				this.dropzone.on('success', this.updateFeedFileVo);
			},

			followerHandler: function(followerList) {
				this.props.followerHandler(followerList);
			},

			fromFollowrSetting: function(followerList){
				this.state.allFollowerList = followerList;
			},

			fromFollowerInputSetting: function(follower) {
				var duplicated = false;
				for(var i=0; i<this.state.fromFollowerInputList.length; i++) {
					if(this.state.fromFollowerInputList[i].id === follower.id && follower.type==='MEMBER') {
						duplicated = true;
						break;
					}
				}
				if(!duplicated) {
					this.state.fromFollowerInputList = this.state.fromFollowerInputList.concat(follower);
				}
			},

			addFollowerList: function(mentionVal) {
				var wfl = [];

				for(var i=0; i<mentionVal.length; i++) {
					mentionVo = {
									label : mentionVal[i].name,
									value : mentionVal[i].name,
									id	  : mentionVal[i].uid,
									email : '',
									type  : 'MEMBER',
									pic   : ''
								};

					wfl.push(mentionVo);

				}

				for(var k=0; k<this.state.fromFollowerInputList.length; k++) {
					wfl.push(this.state.fromFollowerInputList[k]);
				}

				var mentionList = [];

    			for(var j = 0; j < wfl.length; j++){
					if(j===0) {
					mentionList.push(wfl[0]);
					} else {
						var isDup = false;
						for(var k=0; k<mentionList.length; k++){
							if(mentionList[k].id === wfl[j].id) {
								isDup = true;
								break;
							}
						}
						if(!isDup)mentionList.push(wfl[j]);			
					}
    			}

				this.state.writtenFollowerList = mentionList;

				React.unmountComponentAtNode(document.getElementById('shareFollowerApp'));
				React.render(<ShareFollowerApp fromFollowerInputSetting={this.fromFollowerInputSetting} writtenFollowerList={this.state.writtenFollowerList} fromFollowrSetting={this.fromFollowrSetting} followerHandler={this.followerHandler}/>, document.getElementById('shareFollowerApp'));		

			},

			shareFeed: function() {
				//if(this.refs.shareContents.getDOMNode().value == '') return;
				this.props.shareFeed();
			},

	    	componentWillUnmount: function () {
	        	try{this.dropzone.destroy();}catch(e){console.log(e)};
    		},

			uploadPcToSns: function () {
				console.log('uploadPcToSns');
			},

			uploadPcToSharePoint: function () {
				console.log('uploadPcToSharePoint');
			},
		
			uploadFromSharePoint: function () {
				console.log('uploadFromSharePoint');
				openSharepointFilePop("#share_popup #file_previewShp");
			},

			fileLayout: function () {

				shareSelectFileLayout = true;
				$('#shareSelectFileLayout').show();

			},

	    	render: function () {
	           	var files = this.state.files,
            		config = this.props.config,
            		className = 'filepicker dropzone';

				return (
						<div className='drag-area'>
							<div className='share_select' id='shareSelectFileLayout' style={{'display':'none'}}>
                        		<ul>
                            		<li onClick={this.uploadPcToSns} className='icon_fs shareFileClass'><img src='../images/btn_snssave.png' width='14' height='16' /></li>
                                	<li onClick={this.uploadPcToSns} className='txt_fs shareFileClass'>{Feed_Dropzone_MSG_CHOOSEFILEFROMPC}<input type='hidden' id='mainAttachShpPop'/></li>
                                	<li onClick={this.uploadFromSharePoint} style={{'marginTop':'0'}} className='nextline icon_fs'><img src='../images/btn_share.png' width='16' height='16' /></li>
                                	<li onClick={this.uploadFromSharePoint} className='txt_fs2'>{Feed_Dropzone_MSG_CHOOSEFILEFROMSP}</li>
                        		</ul>
                        	</div>
							<div className='ff' id='shareArea'>
								<div id='feedElementDiv' style={{'clear':'both'}}>
                            		<span onClick={this.fileLayout} className='sharepp'><img src='../images/plus_file_on.png' width='43' height='42' /></span>
                            		<textarea style={{'width':'90%', 'padding':'10px 5%', 'border':'1px solid #e0e0e0', 'resize':'none'}} className='shareContentsInput' id='shareContentsInput' ref='shareContents'></textarea>
								</div>                 
								<div className='add_file_wrap'>
									<div id='file_previewShp'></div>
									<div id='shareFollowerApp'></div>
								</div>
								<div className="buttonWrapper">
									<button style={{'float':'right', 'cursor':'initial', 'marginTop':'5px'}} type='button' id='addShare' ref='shareup' className='btn-m btn-default' onClick={this.shareFeed}>{Feed_Dropzone_MSG_SHAREBTNTEXT}</button>
								</div>
							</div>
						</div>
	        		);
	    		},
	    
			setupEvents: function () {

	        	var eventHandlers = this.props.eventHandlers;
	
	        	if(!this.dropzone || !eventHandlers) {
	            		return;
        		}
	
	        	for(var eventHandler in eventHandlers) {
	            	if(eventHandlers.hasOwnProperty(eventHandler) && eventHandlers[eventHandler]) {
	                	if(Object.prototype.toString.call(eventHandlers[eventHandler]) === '[object Array]') {
	                   		for(var i = 0; i < eventHandlers[eventHandler].length; i = i + 1) {
	                       		if(eventHandler === 'init') {
	                           		eventHandlers[eventHandler][i](this.dropzone);
	                       		} else {
                            		this.dropzone.on(eventHandler, eventHandlers[eventHandler][i]);
                        		}
                    		}
                		} else {
                    		if(eventHandler === 'init') {
	                       		eventHandlers[eventHandler](this.dropzone);
	                   		} else {
	                       		this.dropzone.on(eventHandler, eventHandlers[eventHandler]);
	                  	 	}
	               		}
	           		}
	        	}
	
	       		this.dropzone.on('addedfile', function(file)  {
            		if(file) {
	                	var files = this.state.files;
	                	if(!files) {
		                   	files = [];
	    	            }
	        	        files.push(file)
	    	            this.setState({files: files});
	    	            
	        	    }
        		}.bind(this));
	
	        	this.dropzone.on('removedfile', function(file)  {
	            	if(file) {
                		var files = this.state.files;
						var feedFiles = this.state.feedFileVo;
                		if(files && files.length > 0) {
	                   		for(var i = 0; i < files.length; i++) {
	                       		if(files[i].name === file.name && files[i].size === file.size) {
	                           		files.splice(i, 1);
									feedFiles.splice(i,1);
	                       		}
	                   		}
							this.props.fileHandler(feedFiles);
	                    	this.setState({files: files, feedFileVo: feedFiles});
	               		}
	            	}	
	        	}.bind(this));
	    	}
		});

	
	
	
	
		var MessageFeedDropzoneComponent = React.createClass({
		
   			getDjsConfig: function () {
	   			var options,
           		defaults = {
               		url: this.props.config.postUrl,
               		headers: {
                   		'Access-Control-Allow-Credentials': true,
                   		'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-PINGOTHER, X-File-Name, Cache-Control',
                   		'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS',
                   		'Access-Control-Allow-Origin': '*'
               		},
               		withCredentials: false, //순차 또는 한번에 올리는 옵션 
					dictDefaultMessage: "파일을 여기로 끌어서 놓습니다.",
 					thumbnailWidth: 60,
   					thumbnailHeight: 60,
					previewsContainer: document.getElementById('file_preview'),
					clickable: true,
					clickArea: 'sendAttach',
           		};

       			if(this.props.config.allowedFiletypes && this.props.config.allowedFiletypes.length > 0) {
           			defaults.acceptedFiled = this.props.config.allowedFiletypes;
       			}

       			if(this.props.djsConfig) {
           			options = Helpers.extend(true, {}, defaults, this.props.djsConfig);
       			} else {
       				options = defaults;
       			}

   				return options;

    		},
	
	    	getInitialState: function () {
	        	return {files: [], 
						feedFileVo:[],
						feedType:'',
						allFollowerList:[], 
						writtenFollowerList:[], 
						fromFollowerInputList:[],
						dropFollowerList:[],
						targetInfoList:[],
						textClick:'false'
						}
	    	},

    		componentDidMount: function () {

				var self = this;

            	options = this.getDjsConfig();

        		if(!this.props.config.postUrl && !this.props.eventHandlers.drop) {
            		console.info('Neither postUrl nor a "drop" eventHandler specified, the React-Dropzone component might misbehave.');
        		}

        		Dropzone.autoDiscover = false;
        		this.dropzone = new Dropzone(React.findDOMNode(self.refs.feedElementDiv), options);
				this.dropzone.forceEnable($('.fileClass'));
        		this.setupEvents();
				var btnElement = $(React.findDOMNode(this.refs.postup));
				React.render(<NormalFeedElement btnElement={btnElement} ogSetting={this.ogSetting} targetInfoList={this.state.targetInfoList} fromGroupInfo={this.props.fromGroupInfo} addFollowerList={this.addFollowerList} textareaClick={this.textareaClick} fileLayout={this.fileLayout}/>, document.getElementById('feedElementDiv'));
				React.render(<FollowerApp dropFollowerSetting={this.dropFollowerSetting} removeDropFollower={this.removeDropFollower} fromFollowerInputSetting={this.fromFollowerInputSetting} writtenFollowerList={[]} fromFollowrSetting={this.fromFollowrSetting}  followerHandler={this.followerHandler}/>, document.getElementById('followerApp'));
				React.render(<TagApp tagHandler={this.tagHandler}/>, document.getElementById('tagApp'));
    		},

			updateFeedFileVo: function(file, responseFileVo, e) {
				var feedFiles = this.state.feedFileVo;
				responseFileVo.regMemberId = _Dropzone_session_memberId;
				
				if(feedFiles.length === 0) {
					feedFiles.push(responseFileVo);
					
				} else {
					var isDuplicated = false;
					for(var i=0; i<feedFiles.length; i++) {
						if(feedFiles[i].fileUrl === responseFileVo.fileUrl &&  feedFiles[i].fileName === responseFileVo.fileName) {
							isDuplicated = true;		
						   	break;
						}
        			}
					if(!isDuplicated) feedFiles.push(responseFileVo);
					
				}
				
				this.props.fileHandler(feedFiles);
				this.setState({feedFileVo: feedFiles});

			},				

			componentDidUpdate: function() {
				this.dropzone.on('success', this.updateFeedFileVo);
			},

			tagHandler: function(tagsList) {
				this.props.tagHandler(tagsList);
			},

			followerHandler: function(followerList) {
				this.props.followerHandler(followerList);
			},

			fromFollowrSetting: function(followerList){
				this.state.allFollowerList = followerList;
			},

			fromFollowerInputSetting: function(follower) {
				var duplicated = false;
				for(var i=0; i<this.state.fromFollowerInputList.length; i++) {
					if(this.state.fromFollowerInputList[i].id == follower.id && follower.type=='MEMBER') {
						duplicated = true;
						break;
					}
				}
				if(!duplicated) {
					this.state.fromFollowerInputList = this.state.fromFollowerInputList.concat(follower);
				}
			},

			dropFollowerSetting: function(follower) {
			},

			ogSetting:function(data, ogValidate) {
				this.props.ogSetting(data, ogValidate);
			},

			removeDropFollower:function(follower) {
				var index = -1;	

				for(var j = 0; j < this.state.fromFollowerInputList.length; j++ ) {
    				if(this.state.fromFollowerInputList[j].id == follower.id && this.state.fromFollowerInputList[j].type == follower.type ) {
    					index = j;
    					break;
    				}
    			}				

				if(index > -1) {
    				this.state.fromFollowerInputList.splice(index, 1);
				}	

				this.state.fromFollowerInputList = this.state.fromFollowerInputList;
			},

			addFollowerList: function(mentionVal, groupInfo, targetInfo) {
				var wfl = [];

				for(var i=0; i<mentionVal.length; i++) {
					mentionVo = {
									label : mentionVal[i].name,
									value : mentionVal[i].name,
									id	  : mentionVal[i].uid,
									email : '',
									type  : 'MEMBER',
									pic   : ''
								};

					wfl.push(mentionVo);

				}

				for(var k=0; k<this.state.fromFollowerInputList.length; k++) {
					wfl.push(this.state.fromFollowerInputList[k]);
				}

				var mentionList = [];

    			for(var j = 0; j < wfl.length; j++){
					if(j===0) {
					mentionList.push(wfl[0]);
					} else {
						var isDup = false;
						for(var k=0; k<mentionList.length; k++){
							if(mentionList[k].id === wfl[j].id) {
								isDup = true;
								break;
							}
						}
						if(!isDup)mentionList.push(wfl[j]);			
					}
    			}

				this.state.writtenFollowerList = mentionList;

				
				if(targetInfo !==undefined && targetInfo.length>0) {
					this.state.writtenFollowerList = this.state.writtenFollowerList.concat(targetInfo);
				}

				if(groupInfo.length>0) {
					groupVo = {
									label : groupInfo[0].followerName,
									value : groupInfo[0].followerName,
									id	  : groupInfo[0].followerId,
									email : '',
									type  : groupInfo[0].followerType,
									pic   : ''
								};
					
					this.state.writtenFollowerList = this.state.writtenFollowerList.concat(groupVo);
				}

				React.unmountComponentAtNode(document.getElementById('followerApp'));
				React.render(<FollowerApp dropFollowerSetting={this.dropFollowerSetting} dropFollowerSetting={this.dropFollowerSetting} removeDropFollower={this.removeDropFollower} removeDropFollower={this.removeDropFollower} fromFollowerInputSetting={this.fromFollowerInputSetting} writtenFollowerList={this.state.writtenFollowerList} fromFollowrSetting={this.fromFollowrSetting} followerHandler={this.followerHandler}/>, document.getElementById('followerApp'));		

			},

			reset:function() {
				this.retouchingFeedTypeStlye('updateFeed');
				this.setState({files: [], feedFileVo:[], allFollowerList:[], dropFollowerList:[], writtenFollowerList:[], fromFollowerInputList:[], targetInfoList:[], textClick:'false'});
				$('#feedContentsInput').prev().children('div').html('');
				$('#feedContentsInput').next().val('');
				$('#feedContentsInput').next().next().next().html('');
				$('#ogArea').empty();
				$('#file_preview').empty();
				$('#feedContentsInput').css('height','34px').val('');

				$('#feedElementDiv').empty();
				var btnElement = $(React.findDOMNode(this.refs.postup));
				React.unmountComponentAtNode(document.getElementById('feedElementDiv'));
				React.render(<NormalFeedElement btnElement={btnElement} ogSetting={this.ogSetting} targetInfoList={this.state.targetInfoList} fromGroupInfo={this.props.fromGroupInfo} addFollowerList={this.addFollowerList} textareaClick={this.textareaClick} fileLayout={this.fileLayout}/>, document.getElementById('feedElementDiv'));
				React.unmountComponentAtNode(document.getElementById('followerApp'));
				React.render(<FollowerApp dropFollowerSetting={this.dropFollowerSetting} removeDropFollower={this.removeDropFollower} fromFollowerInputSetting={this.fromFollowerInputSetting} writtenFollowerList={[]} fromFollowrSetting={this.fromFollowrSetting}  followerHandler={this.followerHandler}/>, document.getElementById('followerApp'));
			
				React.unmountComponentAtNode(document.getElementById('tagApp'));
				React.render(<TagApp tagHandler={this.tagHandler}/>, document.getElementById('tagApp'));
				$(React.findDOMNode(this.refs.postup)).css('cursor','initial').removeClass('btn-attention').addClass('btn-default').hide();
				$('.hide-area').hide();
				
				
			},

			feedAdd: function() {
				if(this.state.feedType == 'NOTICE') {
					if($('#noticeTitle').val() ==''){
						return;
					}
				} else {
					if($('#feedContentsInput').val() == '') return;
				}


				if(this.state.feedType == 'POLL') {
					var questCnt = 0;
					var questInputClass = $('.questions');
					for(var i=0; i<questInputClass.length; i++) {
						var inputVal = questInputClass[i].value;
						if(inputVal != '') {
							questCnt++;
						}
					}
				
					if(questCnt < 2) return;

				}
				this.props.feedAdd();
				this.reset();

			},

	    	componentWillUnmount: function () {
	        	try{this.dropzone.destroy();}catch(e){console.log(e)};
    		},
	
			textareaClick: function() {
				$('.showApp').show();
				$('#addFeed').show();
				var sessionMe = _Dropzone_session_memberId;
				var targetSessionId = _Dropzone_target_memberId;
				if(this.props.targetId !== undefined) {
					targetSessionId = this.props.targetId
				}
				var targetFollower = [];
				var fromGroupInfo = [];
				var targetFollowerVo = [];
				if(sessionMe !== targetSessionId && this.state.textClick === 'false') {

					var targetName = _Dropzone_target_memberName;
					if(this.props.targetName !== undefined) {
						targetName = this.props.targetName;
					}

					var targetMentionVo = {
							"name": targetName,
							"uid" : targetSessionId
					};

					var follower = {
									label : targetName,
									value : targetName,
									id	  : targetSessionId,
									email : '',
									type  : 'MEMBER',
									pic   : ''
								};

					this.state.targetInfoList = this.state.targetInfoList.concat(follower); 
					targetFollower.push(targetMentionVo);

					if(this.props.fromGroupInfo.length>0) {
						fromGroupInfo = this.props.fromGroupInfo;
						targetFollower = [];
					}

					this.state.textClick = 'true';
					this.addFollowerList(targetFollower, fromGroupInfo, targetFollowerVo);

				} else {
					if(this.props.fromGroupInfo.length>0 && this.state.textClick === 'false') {

						this.addFollowerList(targetFollower, this.props.fromGroupInfo, []);
						this.state.textClick = 'true';

					}

				}
			},

			titleContentsSetting:function(title, contents) {
				this.props.titleContentsSetting(title, contents);
			},

			uploadPcToSns: function () {
				console.log('uploadPcToSns');
			},

			uploadPcToSharePoint: function () {
				console.log('uploadPcToSharePoint');
			},
		
			uploadFromSharePoint: function () {
				console.log('uploadFromSharePoint');

				openSharepointFilePop();
			},

			fileLayout: function () {

				mainSelectFileLayout = true;
				$('#selectFileLayout').show();

			},

			deleteSharepointFile: function () {
				deleteSharepointFile();
			},

	    	render: function () {
	           		var self = this;
					var files = this.state.files,
            		config = this.props.config,
            		className = 'filepicker dropzone';

				return (
						<div className='drag-area'>
							<div className='feed_select2' id='selectFileLayout' style={{'display':'none'}}>
                        		<ul>
                            		<li onClick={this.uploadPcToSns} className='icon_fs fileClass'><img src='../images/btn_snssave.png' width='14' height='16' /></li>
                                	<li onClick={this.uploadPcToSns} className='txt_fs fileClass'>{Feed_Dropzone_MSG_CHOOSEFILEFROMPC}<input type='hidden' id='sendAttach'/></li>
                                	<li onClick={this.uploadFromSharePoint} style={{'marginTop':'0'}} className='nextline icon_fs'><img src='../images/btn_share.png' width='16' height='16' /></li>
                                	<li onClick={this.uploadFromSharePoint} className='txt_fs2'>{Feed_Dropzone_MSG_CHOOSEFILEFROMSP}</li>
                        		</ul>
                        	</div>
							<div className='ff' id='sendFeedArea'>
								<div id='feedElementDiv' className='feedElementDiv' ref='feedElementDiv' style={{'clear':'both'}}>
								</div>                 
								<div className='feed_select hidden' style={{'display':'none'}}>
	        							<ul>
		            						<li className='icon_fs'><img src='../images/icon_doregister.gif' width='16' height='15' /></li>
	                						<li className='txt_fs ignore' onClick={this.clickEvent}>
												<input type='hidden' id='datepicker'/>
 												<div className='trigger'>{Feed_Dropzone_MSG_REGISTERTODO}</div>
											</li>
											<li style={{'marginTop':'2px'}} className='nextline icon_fs'><img src='../images/icon_survay.png' width='16' height='16' /></li>
                                        	<li className='txt_fs2'>{Feed_Dropzone_MSG_REGISTERPOLL}</li>
	                						<li className='nextline icon_fs' style={{'marginTop': '0px'}}><img src='../images/icon_notice.gif' width='16' height='14' /></li>
											<li className='txt_fs2'>{Feed_Dropzone_MSG_REGISTERNOTI}</li>
	            						</ul>
	        					</div>
								<div className='add_file_wrap hide-area'>
									<div id='ogArea'></div>
									<div id='file_preview'></div>
									<div id='followerApp'></div>
									<div id='tagApp'></div>
								</div>
								<div className="buttonWrapper">
									<button style={{'float':'right', 'cursor':'initial'}} type='button' id='addFeed' ref='postup' className='btn-m btn-default' onClick={this.feedAdd}>{Feed_Dropzone_MSG_FEEDWRITEBTNTEXT}</button>
								</div>
							</div>
						</div>
	        		);
	    		},
	    
			setupEvents: function () {

	        	var eventHandlers = this.props.eventHandlers;
	
	        	if(!this.dropzone || !eventHandlers) {
	            		return;
        		}
	
	        	for(var eventHandler in eventHandlers) {
	            	if(eventHandlers.hasOwnProperty(eventHandler) && eventHandlers[eventHandler]) {
	                	if(Object.prototype.toString.call(eventHandlers[eventHandler]) === '[object Array]') {
	                   		for(var i = 0; i < eventHandlers[eventHandler].length; i = i + 1) {
	                       		if(eventHandler === 'init') {
	                           		eventHandlers[eventHandler][i](this.dropzone);
	                       		} else {
                            		this.dropzone.on(eventHandler, eventHandlers[eventHandler][i]);
                        		}
                    		}
                		} else {
                    		if(eventHandler === 'init') {
	                       		eventHandlers[eventHandler](this.dropzone);
	                   		} else {
	                       		this.dropzone.on(eventHandler, eventHandlers[eventHandler]);
	                  	 	}
	               		}
	           		}
	        	}
	        	
	        	/*
	
	       		this.dropzone.on('addedfile', function(file)  {
            		if(file) {
	                	var files = this.state.files;
	                	if(!files) {
		                   	files = [];
	    	            }
	        	        files.push(file)
	    	            this.setState({files: files});
						$('.showApp').show();
						$('#addFeed').show();
	        	    }
        		}.bind(this));

				*/
				
	       		this.dropzone.on('addedfile', function(file)  {
            		if(file) {
	                	var files = this.state.files;
	                	if(!files) {
		                   	files = [];
	    	            }
	        	        files.push(file)
	    	            this.setState({files: files});
						$('.showApp').show();
						$('#addFeed').show();
						
						
	        	    }
        		}.bind(this));	

	        	this.dropzone.on('removedfile', function(file)  {
	            	if(file) {
                		var files = this.state.files;
						var feedFiles = this.state.feedFileVo;
                		if(files && files.length > 0) {
	                   		for(var i = 0; i < files.length; i++) {
	                       		if(files[i].name === file.name && files[i].size === file.size) {
	                           		files.splice(i, 1);
									feedFiles.splice(i,1);
	                       		}
	                   		}
							this.props.fileHandler(feedFiles);
	                    	this.setState({files: files, feedFileVo: feedFiles});
	               		}
	            	}	
	        	}.bind(this));
	    	}
		});	