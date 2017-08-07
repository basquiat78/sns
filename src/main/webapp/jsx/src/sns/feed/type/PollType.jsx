	
		var Poll = React.createClass({

			render: function() {
				var pollNum = this.props.pollNum;
				var id = 'poll_'+pollNum;
	        	return (
                        <li><label><span>{pollNum}</span><input type='text' onKeyUp={this.props.addLi} id={id} placeholder={_FEED_PollType_MSG_ANSWERTEXT} className='questions ignore'/></label></li>
	           	);
			}
		});
	
	
	
		var PullElement = React.createClass({

			getInitialState : function () {
				return { moreQuestions : [], questCnt: 0};
        	},

			addLi: function() {
				
				var questInputClass = $('.questions');
				var questCnt = 0;
				for(var j=0; j<questInputClass.length; j++) {
					var inputVal = questInputClass[j].value;
					if(inputVal != '') questCnt++;
				}

				this.state.questCnt = questCnt;

				if($('.feedContentsInput').val() !='' && questCnt > 1) {
					this.props.btnElement.css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
				} else {
					this.props.btnElement.css('cursor','initial').removeClass('btn-attention').addClass('btn-default');
				}

				for(var i=0; i<questInputClass.length; i++) {
					var inputVal = questInputClass[i].value;
					if(inputVal == '') return;
				}



				var liElm = [];
				var classLength = $('.questions').length;
				var key = parseInt(classLength) + 1;
				liElm.push(<Poll key={key} addLi={this.addLi} pollNum={key}/>);

				this.setState({moreQuestions: this.state.moreQuestions.concat(liElm)});
			},

			componentDidMount: function () {
			
				$('#feedContentsInput').val(this.props.keepContents);
				var self = this;
				$('.feedContentsInput').mentionsInput({
            		showAtCaret: true,
					source: function(request, response) {
						if(request.term.length > 1) {
       	    	 			$.ajax({
                					url	    : _PollType_BASE_MENTIONS+'/'+request.term,
       	         					type    : "get",
        	        				success : function(data) {
											var array = [];
											data.forEach(function(member){
												if(member.id != _PollType_session_memberId) {
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

				$(".feedContentsInput").keyup(function(e){
					if(this.value !='' && self.state.questCnt > 1) {
						self.props.btnElement.css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
					} else if(this.value =='' || self.state.questCnt < 1) {
						self.props.btnElement.css('cursor','initial').removeClass('btn-attention').addClass('btn-default');
					}
				});

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

			},

			fileLayout: function() {
				this.props.fileLayout();
			},	

			textareaClick:function() {
				this.props.textareaClick();
			},

			render: function() {
	        	return (
						<div>
                            <textarea onClick={this.textareaClick} style={{'width':'94%', 'padding':'1% 4% 2% 2%', 'border':'none', 'resize':'none'}} className='feedContentsInput' placeholder={_FEED_PollType_MSG_WHATISYOURQUESTIONMSG} id='feedContentsInput' ref='feedContents'></textarea>
							<span onClick={this.fileLayout} className='pp plus_file2'></span>
							<ul className='survayarea'>
								<li><span>1</span><input type='text' onKeyUp={this.addLi} id='poll_1' placeholder={_FEED_PollType_MSG_ANSWERTEXT} className='questions ignore'/></li>
                            	<li><span>2</span><input type='text' onKeyUp={this.addLi} id='poll_2' placeholder={_FEED_PollType_MSG_ANSWERTEXT} className='questions ignore'/></li>
                            	<li><span>3</span><input type='text' onKeyUp={this.addLi} id='poll_3' placeholder={_FEED_PollType_MSG_ANSWERTEXT} className='questions ignore'/></li>
								{this.state.moreQuestions}
							</ul>
						</div>
	           	);
			}
		});
	