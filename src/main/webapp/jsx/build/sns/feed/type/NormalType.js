		var NormalFeedElement = React.createClass({displayName: "NormalFeedElement",

			getInitialState: function() {
        		return {
						ogValidate		  : '',
						targetInfoList    : []
				};

        	},			

			getLinks : function(text) {
				var expression = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
           		return (text.match(expression));
			},

			componentDidMount: function () {
				
				$('#feedContentsInput').val(this.props.keepContents);
				
				var self = this;
				$('.feedContentsInput').mentionsInput({
            		showAtCaret: true,
					source: function(request, response) {
						if(request.term.length > 1) {
       	    	 			$.ajax({
                					url	    : _NormalType_BASE_MENTIONS+'/'+request.term,
       	         					type    : "get",
        	        				success : function(data) {
											var array = [];
											data.forEach(function(member){
												if(member.id != _NormalType_session_memberId) {
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

				$(".feedContentsInput").keypress(function(e){

					if( e.keyCode === 13 || e.keyCode === 32 ){
						var mentionVal = $(this).mentionsInput('getMentions');
						var fromGroupInfo = [];
						if(self.props.fromGroupInfo !== undefined) {
							fromGroupInfo = self.props.fromGroupInfo;
						}
						self.props.addFollowerList(mentionVal, fromGroupInfo, self.props.targetInfoList);
					}

				});

				$(".feedContentsInput").keyup(function(e){
					if(this.value !='') {
						self.props.btnElement.css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
					} else if(this.value =='') {
						self.props.btnElement.css('cursor','initial').removeClass('btn-attention').addClass('btn-default');
					}
				});
				
				$(".feedContentsInput").bind('keydown', function(e){
				
					var keycode = (e.keyCode ? e.keyCode : e.which);
					
					if(_Grobal_isEnterKeyReg == 1) {
					
							var v = $(this).val();
							if(keycode === 13 && e.ctrlKey) { // 컨트롤과 엔터함께누를경우
								
								var el = document.getElementById('feedContentsInput'),
						            allText = $(this).val(),
						            currentPos = getCaret(el),
						            beforeText = allText.substr(0, currentPos) + '\n',
						            afterText = allText.substr(currentPos);
						
								
						
						        $(this).val(beforeText + afterText);
						        
						        setCaretPosition(el, currentPos);
								
								if(self.state.ogValidate != 'true') {
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
														self.props.ogSetting(data, 'true');
								    			}.bind(this),
			      								error: function(xhr, status, err) {
													self.state.ogValidate = 'false';
			        								self.props.ogSetting('', 'false');
			      								}.bind(this)
			    						});	
									}
								}
						
							} else if(keycode === 13) {
								$('#addFeed').click();
							} else {
								//alert(GetIEVersion());
							}
							
						}
				});

				$(".feedContentsInput").bind('input keyup paste', function(e){
				//$(".feedContentsInput").keypress(function(e){
				
					var keycode = (e.keyCode ? e.keyCode : e.which);
					if( (keycode === 13 || keycode === 32)  && 
					    self.state.ogValidate != 'true') {

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
												self.props.ogSetting(data, 'true');
						    			}.bind(this),
	      								error: function(xhr, status, err) {
											self.state.ogValidate = 'false';
	        								self.props.ogSetting('', 'false');
	      								}.bind(this)
	    						});	
							}
						}
						
						/*
						if(_Grobal_isEnterKeyReg == 1) {
							
							if(keycode === 13 && e.ctrlKey) {
								var v = $(this).val();
								$(this).val(v + '\n');
							} else {
								$('#addFeed').click();
							}
						}
						*/
					}

					e.stopPropagation();
				});
				
				_getLengthCheckCommand($('#feedContentsInput'));
								
				var parent = $(React.findDOMNode(this.refs.main_feed_area));
				parent.children('.mentions-input').css('height', '');

			},

			fileLayout: function() {
				this.props.fileLayout();
			},	
			
			render: function() {
	        	return (
						React.createElement("div", {ref: "main_feed_area"}, 
                            React.createElement("textarea", {onClick: this.props.textareaClick, style: {'width':'94%', 'padding':'1% 4% 2% 2%', 'height':'32px', 'borderBottom':'none', 'borderLeft':'none','borderRight':'none','borderTop':'none', 'resize':'none'}, className: "feedContentsInput", id: "feedContentsInput", ref: "feedContents", placeholder: _FEED_NormalType_MSG_WHATRUWORKINGONMSG}), 
							React.createElement("span", {onClick: this.fileLayout, className: "pp plus_file2"})
						)
	           	);
			}
		});
		
		var FeedModifyElement = React.createClass({displayName: "FeedModifyElement",

			getInitialState: function() {
        		return {
						orgContents		  : ''
				};

        	},			

			componentDidMount: function () {
				var self = this;
				$(React.findDOMNode(this.refs.modifyFeedContentsInput)).mentionsInput({
					contents   : self.props.contents,
            		showAtCaret: true,
					source: function(request, response) {
						if(request.term.length > 1) {
       	    	 			$.ajax({
                					url	    : _NormalType_BASE_MENTIONS+'/'+request.term,
       	         					type    : "get",
        	        				success : function(data) {
											var array = [];
											data.forEach(function(member){
												if(member.id != _NormalType_session_memberId) {
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

				$(React.findDOMNode(this.refs.modifyFeedContentsInput)).bind('keydown', function(e){
				
					var keycode = (e.keyCode ? e.keyCode : e.which);
					
					if(_Grobal_isEnterKeyReg == 1) {
					
							var v = $(this).val();
							if(keycode === 13 && e.ctrlKey) { // 컨트롤과 엔터함께누를경우
								
								var el = document.getElementById('feedContentsInput'),
						            allText = $(this).val(),
						            currentPos = getCaret(el),
						            beforeText = allText.substr(0, currentPos) + '\n',
						            afterText = allText.substr(currentPos);
						
						        $(this).val(beforeText + afterText);
						        
						        setCaretPosition(el, currentPos);
						
							} else if(keycode === 13) {
								$('#addFeed').click();
							} else {
								//alert(GetIEVersion());
							}
							
						}
				});
				
				_getLengthCheckCommand($('#modifyFeedContentsInput'));
								
				var parent = $(React.findDOMNode(this.refs.modify_feed_area));
				parent.children('.mentions-input').css('height', '');
				this.initialSetting(parent.children('.mentions-input'));
				$(React.findDOMNode(this.refs.modifyFeedContentsInput)).focus();
				var feedAreaId = 'feed_'+this.props.feedId;
				window.scroll(0, this.getOffsetTop(document.getElementById(feedAreaId)));
			},

			getOffsetTop: function(el) {
				var top = 0;
				if(el.offsetParent) {
					do {
						top += el.offsetTop;
					} while (el = el.offsetParent);
					return [top];
				}
			},
				
			initialSetting: function(element) {
				this.mentionContents(element, this.props.contents);
			},	
			
			mentionContents: function(element, contents) {
        		var regexpWithWhiteSpaceEn = /@\[(\w+\s+\w+)\]\(([0-9]+)\)/g;
        		var regexpWithWhiteSpaceKo = /@\[(\S+\s+\S+)\]\(([0-9]+)\)/g;
        		var regexpWithNoramal = /@\[(\S+)\]\(([0-9]+)\)/g;
        		var textareaContents = '';
        		if(regexpWithNoramal.test(contents)){
        			textareaContents = contents.replace(regexpWithNoramal, '$1');
        		}
        		$(React.findDOMNode(this.refs.modifyFeedContentsInput)).val(textareaContents);
        		textareaContents = textareaContents.replace("\n", "<br/>");
        		if(textareaContents == '')textareaContents = contents;
        		element.find('.commentBox').children('div').html(textareaContents);
        		
        		var convertContents = '';
        		if(regexpWithNoramal.test(contents)){
        			convertContents = contents.replace(regexpWithNoramal, '<strong style="color: rgb(163, 188, 234); padding-right: 0px; display: inline-block; background-color: rgb(163, 188, 234);">$1</strong>');
        		}
        		if(convertContents == '') {
        			convertContents = contents;
        			$(React.findDOMNode(this.refs.modifyFeedContentsInput)).val(contents);	
        		}	
        		element.children('.highlighter').children('.highlighter-content').html(convertContents);
			},
			
			cancelModify:function() {
				this.props.cancelModify();
			},
			
			feedUpdate:function() {
				var contents = $(React.findDOMNode(this.refs.modifyFeedContentsInput)).mentionsInput('getValue');
				var mentions = $(React.findDOMNode(this.refs.modifyFeedContentsInput)).mentionsInput('getMentions');
				var tags = contents.match(/#\S+/g);
				this.props.feedUpdate(contents, mentions, tags);
			},
			
			render: function() {
	        	return (
	        			React.createElement("div", null, 
							React.createElement("div", {ref: "modify_feed_area"}, 
                            	React.createElement("textarea", {style: {'width':'99%', 'padding':'1% 4% 2% 2%', 'height':'32px', 'right':'10px', 'border':'1px solid #e0e0e0', 'resize':'none'}, className: "modifyFeedContentsInput", id: "modifyFeedContentsInput", ref: "modifyFeedContentsInput"})
							), 
							React.createElement("div", {style: {'margin':'0px 7px 0 0px'}}, 
								React.createElement("button", {style: {'float':'right','cursor':'initial'}, type: "button", id: "feedUpdate", ref: "feedUpdate", className: "btn-m btn-m btn-attention", onClick: this.feedUpdate}, _FEED_NormalType_UPDATEDBUTTON), 
								React.createElement("button", {style: {'float':'right', 'marginRight':'5px', 'cursor':'initial'}, type: "button", id: "cancelModify", ref: "cancelModify", className: "btn-m btn-m btn-attention", onClick: this.cancelModify}, _FEED_NormalType_CANCELBUTTON)
								)
						)
	           	);
			}
		});