		var TagInput = React.createClass({

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
						<dd className='none_attribute'>
							<input type='text' placeholder={_FEED_TagInput_MSG_ADDTAG} ref='tag' id='mainTagInput' className='ignore' onKeyDown={this.eventHandler}/>
						</dd>
				);
			}
		});
	
	
	
		var TagList = React.createClass({
		
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
	    			tags.push(<Tag key={key} tag={tag} removeEvent={that.removeHandler}/>);
  				});
	
				return(
					<dl onClick={this.focuson} id='tag_dl' style={{'display':'none', 'border':'none', 'paddingTop':'0px', 'left':'0', 'right':'0', 'marginLeft':'6px'}}>
						{tags}
						<TagInput keyDown={this.handleKeyDown}/>
					</dl>
				);
			}

		});
	
	
	
		var Tag  = React.createClass({
		
			removed: function() {
				this.props.removeEvent(this.props.tag);
			},
	
			render: function() {
				return(
					<dd style={{'marginBottom':'5px'}}>
						<span><img src='../images/icon_tag.png' width='14' height='14' style={{'marginTop':'3px', 'marginLeft':'-3px'}}/></span>
			   			<span style={{'marginLeft':'5px'}}>{this.props.tag}</span>
						<span classNmae='space_left'>
							<img src='../images/icon_delete.png' width='8' height='8' onClick={this.removed} style={{'marginBottom':'2px', 'marginLeft':'5px'}}/>
						</span>
					</dd>
				);
			}
		});
	

		var TagApp = React.createClass({

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
	    	    	<div className='tag_area'>
						<TagList tList={this.state.tagList} removeTag={this.removeTag} keyDown={this.handleKeyDown}/>
		      		</div>
    	    	);
    		}
    	});
		
		var TagEditableApp = React.createClass({
			
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
	    	    	<div className='tag_area' style={{'borderTop':'1px solid #d8d8d8'}}>
						<TagEditableList tList={this.state.tagList} removeTag={this.removeTag} keyDown={this.handleKeyDown}/>
						<div style={{'marginBottom':'28px', 'marginRight':'10px'}}>
							<button style={{'float':'right', 'cursor':'initial', 'height':'22px'}} type='button' className='btn-m btn-default' onClick={this.completeTagEdit}>{_FEED_TagInput_MSG_EDITCOMP}</button>
						</div>
		      		</div>
    	    	);
    		}
    	});
    	
		var TagEditableInput = React.createClass({

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
						<dd className='none_attribute'>
							<input type='text' placeholder={_FEED_TagInput_MSG_ADDTAG} ref='tag' id='TagEditableInput' className='ignore' onKeyDown={this.eventHandler}/>
						</dd>
				);
			}
		});
	
	
	
		var TagEditableList = React.createClass({
		
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
	    			tags.push(<Tag key={key} tag={tag.tagName} removeEvent={that.removeHandler}/>);
  				});
	
				return(
					<dl onClick={this.focuson} style={{'border':'none', 'paddingTop':'0px', 'left':'0', 'right':'0', 'marginLeft':'6px'}}>
						{tags}
						<TagEditableInput keyDown={this.handleKeyDown}/>
					</dl>
				);
			}

		});	
	
		// result Tag
		var ResultTag = React.createClass({
		
			findTagFeed: function() {
				findFeedTag(this.props.resultTag.tagName);
			},
		
			// 팔로워 참조  렌더링
			render: function() {
				return (
       	        	<li onClick={this.findTagFeed}>
						<span><img src='../images/icon_tag.png' width='14' height='14'/></span>{this.props.resultTag.tagName}
					</li>
				);
			}
		});
	

	
		// result Tag List
		var ResultTagList = React.createClass({
			
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
							rtArray.push(<ResultTag key={key} resultTag={resultTag}/>);
						});
			
						return (
								<span className='result_tag reply-layout' style={{'marginLeft':'84px','marginRight':'20px'}}>
	           						<ul>
		               					{rtArray}
	           						</ul> 
	      						</span>
						);
					} else {
						return (<div className='reply-layout'></div>);
					}
				} else if(this.props.editable == 'true'){
					if(data != null && data.length>0) {
						data = data;
					} else {
						data = [];
					}
					return (<TagEditableApp data={data} feedId={this.props.feedId} addEditTag={this.addEditTag} removeEditTag={this.removeEditTag} completeTagEdit={this.completeTagEdit}/>);
				}				
				
			}
		});