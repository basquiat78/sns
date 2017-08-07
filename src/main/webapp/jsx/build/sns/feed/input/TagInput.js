		var TagInput = React.createClass({displayName: "TagInput",

			eventHandler: function(e) {
			
				var keycode = (e.keyCode ? e.keyCode : e.which);
			
				if (keycode == 13) {
					var tagValue = this.refs.tag.getDOMNode().value.trim();
					if(tagValue.length < 1) {
						this.refs.tag.getDOMNode().value ='';
						return;
					}
					this.props.keyDown(this.refs.tag.getDOMNode().value);
					this.refs.tag.getDOMNode().value ='';
				}
			},
		
			render: function() {
				return(
						React.createElement("dd", {className: "none_attribute"}, 
							React.createElement("input", {type: "text", placeholder: _FEED_TagInput_MSG_ADDTAG, ref: "tag", id: "mainTagInput", className: "ignore", onKeyDown: this.eventHandler})
						)
				);
			}
		});
	
	
	
		var TagList = React.createClass({displayName: "TagList",
		
			removeHandler: function(tag) {
				this.props.removeTag(tag);
			},		

			handleKeyDown: function(tag) {
				this.props.keyDown(tag);
			},	

			focuson: function() {
				$('#mainTagInput').focus();
			},

			render: function() {
				var tags = [];
				var that = this; //because react Object Confliction
	
				this.props.tList.forEach(function(tag, index) {
					var key = 'feedTag'+index;
	    			tags.push(React.createElement(Tag, {key: key, tag: tag, removeEvent: that.removeHandler}));
  				});
	
				return(
					React.createElement("dl", {onClick: this.focuson, id: "tag_dl", style: {'display':'none', 'border':'none', 'paddingTop':'0px', 'left':'0', 'right':'0', 'marginLeft':'6px'}}, 
						tags, 
						React.createElement(TagInput, {keyDown: this.handleKeyDown})
					)
				);
			}

		});
	
	
	
		var Tag  = React.createClass({displayName: "Tag",
		
			removed: function() {
				this.props.removeEvent(this.props.tag);
			},
	
			render: function() {
				return(
					React.createElement("dd", {style: {'marginBottom':'5px'}}, 
						React.createElement("span", null, React.createElement("img", {src: "../images/icon_tag.png", width: "14", height: "14", style: {'marginTop':'3px', 'marginLeft':'-3px'}})), 
			   			React.createElement("span", {style: {'marginLeft':'5px'}}, this.props.tag), 
						React.createElement("span", {classNmae: "space_left"}, 
							React.createElement("img", {src: "../images/icon_delete.png", width: "8", height: "8", onClick: this.removed, style: {'marginBottom':'2px', 'marginLeft':'5px'}})
						)
					)
				);
			}
		});
	

		var TagApp = React.createClass({displayName: "TagApp",

			handleKeyDown: function(tag) {

				var duplicatedTag = false;
				this.state.tagList.forEach(function(value) {
	    			if(tag === value) {
						MsgPopup(_FEED_TagInput_MSG_TOPICISALREADYADDEDMSG);
						duplicatedTag = true;
					}
  				});
				if(duplicatedTag) return;
	
				this.setState({tagList: this.state.tagList.concat(tag)});
				
			},

			removeTag: function(tag) {

				var index = -1;	
 				var tagLength = this.state.tagList.length;
				for(var i = 0; i < tagLength; i++ ) {
						if(this.state.tagList[i] === tag ) {
						index = i;
						break;
					}
				}
				this.state.tagList.splice(index, 1);	
				this.setState( {tagList: this.state.tagList} );

			},
			
			getInitialState: function() {
	  			return {tagList: []};
			},
	
			render: function() {
				this.props.tagHandler(this.state.tagList);
    			return (
	    	    	React.createElement("div", {className: "tag_area"}, 
						React.createElement(TagList, {tList: this.state.tagList, removeTag: this.removeTag, keyDown: this.handleKeyDown})
		      		)
    	    	);
    		}
    	});
		
		var TagEditableApp = React.createClass({displayName: "TagEditableApp",
			
			getInitialState: function() {
	  			return {tagList: []};
			},
			
			handleKeyDown: function(tagValue) {
				var duplicatedTag = false;
				this.state.tagList.forEach(function(tag) {
	    			if(tagValue == tag.tagName) {
						MsgPopup(_FEED_TagInput_MSG_TOPICISALREADYADDEDMSG);
						duplicatedTag = true;
					}
  				});
  				
				if(duplicatedTag) return;
				
				var baseurl = _FEED_TagInput_BASE_TAG;
				var tagVo = {"feedId":this.props.feedId, "regMemberId":0, "tagName":tagValue, "regDttm":null};
				ajaxAdd(baseurl, tagVo, this.addTagComplete);

			},

			addTagComplete:function(data) {
				console.log(data);
				this.props.addEditTag(data);
				this.setState({tagList: this.state.tagList.concat(data)});
			},

			removeTag: function(tag) {
				var baseurl = _FEED_TagInput_BASE_TAG;
				var jsondata = {"feedId":this.props.feedId, "tagName":tag, "regMemberId":_FEED_TagInput_session_memberId};
				ajaxDelByJson(baseurl, jsondata, this.removeComplete);
			},
			
			removeComplete: function(data) {
				var index = -1;	
 				var tagLength = this.state.tagList.length;
				for(var i = 0; i < tagLength; i++ ) {
						if(this.state.tagList[i].tagName == data.tagName ) {
						index = i;
						break;
					}
				}
				this.state.tagList.splice(index, 1);
				this.props.removeEditTag(data);
				this.setState( {tagList: this.state.tagList} );
			},
			
			completeTagEdit: function() {
				this.props.completeTagEdit();
			},
	
			componentDidMount: function () {
				this.setState({tagList:this.props.data});
			},
	
			render: function() {
    			return (
	    	    	React.createElement("div", {className: "tag_area", style: {'borderTop':'1px solid #d8d8d8'}}, 
						React.createElement(TagEditableList, {tList: this.state.tagList, removeTag: this.removeTag, keyDown: this.handleKeyDown}), 
						React.createElement("div", {style: {'marginBottom':'28px', 'marginRight':'10px'}}, 
							React.createElement("button", {style: {'float':'right', 'cursor':'initial', 'height':'22px'}, type: "button", className: "btn-m btn-default", onClick: this.completeTagEdit}, _FEED_TagInput_MSG_EDITCOMP)
						)
		      		)
    	    	);
    		}
    	});
    	
		var TagEditableInput = React.createClass({displayName: "TagEditableInput",

			eventHandler: function(e) {
			
				var keycode = (e.keyCode ? e.keyCode : e.which);
			
				if (keycode == 13) {
					var tagValue = this.refs.tag.getDOMNode().value.trim();
					if(tagValue.length < 1) {
						this.refs.tag.getDOMNode().value ='';
						return;
					}
					this.props.keyDown(this.refs.tag.getDOMNode().value);
					this.refs.tag.getDOMNode().value ='';
				}
			},
		
			componentDidMount: function () {
				$(React.findDOMNode(this.refs.tag)).focus();
			},
		
			render: function() {
				return(
						React.createElement("dd", {className: "none_attribute"}, 
							React.createElement("input", {type: "text", placeholder: _FEED_TagInput_MSG_ADDTAG, ref: "tag", id: "TagEditableInput", className: "ignore", onKeyDown: this.eventHandler})
						)
				);
			}
		});
	
	
	
		var TagEditableList = React.createClass({displayName: "TagEditableList",
		
			removeHandler: function(tag) {
				this.props.removeTag(tag);
			},		

			handleKeyDown: function(tag) {
				this.props.keyDown(tag);
			},	

			render: function() {
				var tags = [];
				var that = this; //because react Object Confliction
				this.props.tList.forEach(function(tag, index) {
					var key = 'feedTag'+index;
	    			tags.push(React.createElement(Tag, {key: key, tag: tag.tagName, removeEvent: that.removeHandler}));
  				});
	
				return(
					React.createElement("dl", {onClick: this.focuson, style: {'border':'none', 'paddingTop':'0px', 'left':'0', 'right':'0', 'marginLeft':'6px'}}, 
						tags, 
						React.createElement(TagEditableInput, {keyDown: this.handleKeyDown})
					)
				);
			}

		});	
	
		// result Tag
		var ResultTag = React.createClass({displayName: "ResultTag",
		
			findTagFeed: function() {
				findFeedTag(this.props.resultTag.tagName);
			},
		
			// 팔로워 참조  렌더링
			render: function() {
				return (
       	        	React.createElement("li", {onClick: this.findTagFeed}, 
						React.createElement("span", null, React.createElement("img", {src: "../images/icon_tag.png", width: "14", height: "14"})), this.props.resultTag.tagName
					)
				);
			}
		});
	

	
		// result Tag List
		var ResultTagList = React.createClass({displayName: "ResultTagList",
			
			addEditTag: function(data) {
				this.props.addEditTag(data);
			},
			
			removeEditTag: function(data) {
				this.props.removeEditTag(data);
			},
			
			completeTagEdit:function() {
				this.props.completeTagEdit();
			},
			
			render: function() {
				var rtArray = []
				var data = this.props.rtList;
				if(this.props.editable == 'false' || this.props.editable === undefined){
					if(data != null && data.length>0) {
						data.forEach(function(resultTag, index){
							var key = 'resultTag'+index;
							rtArray.push(React.createElement(ResultTag, {key: key, resultTag: resultTag}));
						});
			
						return (
								React.createElement("span", {className: "result_tag reply-layout", style: {'marginLeft':'84px','marginRight':'20px'}}, 
	           						React.createElement("ul", null, 
		               					rtArray
	           						)
	      						)
						);
					} else {
						return (React.createElement("div", {className: "reply-layout"}));
					}
				} else if(this.props.editable == 'true'){
					if(data != null && data.length>0) {
						data = data;
					} else {
						data = [];
					}
					return (React.createElement(TagEditableApp, {data: data, feedId: this.props.feedId, addEditTag: this.addEditTag, removeEditTag: this.removeEditTag, completeTagEdit: this.completeTagEdit}));
				}				
				
			}
		});