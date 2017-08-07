		var ToDoElement = React.createClass({displayName: "ToDoElement",

			getInitialState: function() {
        		return {
						ogValidate		  : ''
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
                					url	    : _TodoType_BASE_MENTIONS+'/'+request.term,
       	         					type    : "get",
        	        				success : function(data) {
											var array = [];
											data.forEach(function(member){
												if(member.id != _TodoType_session_memberId) {
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

				$( "#datepicker" ).datepicker({
					 onClose: function(calDate) {
			         	if($('.feed_select').hasClass('hidden')) {
							$('.feed_select').removeClass('hidden').show();
						} else {
							$('.feed_select').addClass('hidden').hide();
						}
           			 }	
				});
				
				$( "#dueDate" ).click(function(){
					$('#dueDate').datepicker('show');
				});

				$("#dueDate").datepicker({
        			buttonImage: '../images/icon_calendal.png',
        			buttonImageOnly: true,
        			showOn: 'both',
					//changeMonth: true,
        			//changeYear: true,
     			});

				$( "#dueDate" ).datepicker( "option", $.datepicker.regional[_TodType_pageContext] );
				$( "#dueDate" ).datepicker( "option", "dateFormat", _TodType_basic_date +" : "+"yy-mm-dd");
			},

			fileLayout: function() {
				this.props.fileLayout();
			},	

			render: function() {
	        	return (
						React.createElement("div", null, 
                            React.createElement("strong", null, React.createElement("input", {id: "dueDate", ref: "dueDate", style: {'color':'blue', 'fontWeight':'bold', 'width':'150px', 'padding':'10px 5% 10px 1%', 'marginBottom':'15px', 'borderBottom':'1px solid #e0e0e0'}, placeholder: "", readOnly: true})), 
                            React.createElement("textarea", {onClick: this.props.textareaClick, style: {'width':'94%', 'padding':'1% 4% 2% 2%', 'border':'none', 'resize':'none'}, cols: "", rows: "2", placeholder: _Todo_BASIC_TODO_TODOTEXTAREAMSG, className: "feedContentsInput", id: "feedContentsInput", ref: "feedContents"}), 
                        	React.createElement("span", {className: "pp plus_file2", onClick: this.fileLayout})
						)
	           	);
			}
		});