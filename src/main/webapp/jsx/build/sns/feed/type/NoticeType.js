		var NoticeElement = React.createClass({displayName: "NoticeElement",

			componentDidMount: function () {
			
				$('#feedContentsInput').val(this.props.keepContents);
				var self = this;

				$('.feedContentsInput').elastic();

				$(React.findDOMNode(this.refs.noticeTitle)).keyup(function(e){
					if(this.value !='') {
						self.props.btnElement.css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
					} else if(this.value =='' || self.state.questCnt < 1) {
						self.props.btnElement.css('cursor','initial').removeClass('btn-attention').addClass('btn-default');
					}
				});

			},


			fileLayout: function() {
				this.props.fileLayout();
			},	

			render: function() {
	        	return (
						React.createElement("div", {className: "plus_title"}, 
                        	React.createElement("span", {className: "pp", onClick: this.fileLayout}, React.createElement("img", {src: "../images/plus_file_on.png", width: "43", height: "42"})), 
                            React.createElement("input", {style: {'width':'94%', 'padding':'10px 5% 10px 1%', 'marginBottom':'15px', 'borderBottom':'1px solid #e0e0e0'}, cols: "", rows: "", placeholder: "", id: "noticeTitle", ref: "noticeTitle"}), 
                            React.createElement("textarea", {onClick: this.props.textareaClick, style: {'width':'94%', 'padding':'10px 5% 10px 1%', 'border':'none', 'resize':'none'}, className: "feedContentsInput", id: "feedContentsInput", ref: "feedContents", cols: "", rows: "2", placeholder: ""})
                        )
	           	);
			}
		});