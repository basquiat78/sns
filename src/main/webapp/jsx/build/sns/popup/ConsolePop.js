var approveFlag = false;
		var ConfirmPop = React.createClass({displayName: "ConfirmPop",
			
			approveRequest : function(){
				approveFlag = true;
				if(MessagePopup != null)
					MessagePopup.close();
			},
			
			refuseRequest : function(){
				approveFlag = false;
				if(MessagePopup != null)
					MessagePopup.close();
			},

			render: function() {
				var btnTextArr = this.props.okcancel !== undefined ?
					[_MainLayer_COMMON_MSG_ConsoleBtnConfirm , _MainLayer_COMMON_MSG_ConsoleBtnCancel] 
					: [_MainLayer_COMMON_MSG_ConsoleBtnApprove, _MainLayer_COMMON_MSG_ConsoleBtnRefuse]
				return (
					React.createElement("div", null, 
						React.createElement("div", {className: ""}, 
			            	React.createElement("span", {id: "cfrmPopMsgId", className: "set_txt", style: {'margin':'10px 0px 70px 0px'}})
			            ), 
			            
			            React.createElement("div", {className: "set_wrap"}, 
			            	React.createElement("div", {className: "btn_gslist"}, 
						    	React.createElement("button", {className: "btn-m btn-attention", style: {'marginRight':'20px'}, onClick: this.approveRequest}, 
						    		btnTextArr[0]
						    	), 
						        React.createElement("button", {className: "btn-m btn-attention", onClick: this.refuseRequest}, 
						        	btnTextArr[1]
						        )
						    )
			            )
		            )
				);
			}
		});
		
var MsgPop = React.createClass({displayName: "MsgPop",
			render: function() {
				return (
					React.createElement("div", null, 
						React.createElement("div", {className: ""}, 
			            	React.createElement("span", {id: "msgPopId", className: "set_txt", style: {'margin':'10px 0px 70px 0px'}})
			            )
		            )
				);
			}
		});
		
var MessagePopup = null;
		var approveFlag = false;
		
		function closeMessagePopup(){
			var unmount = React.unmountComponentAtNode(document.getElementById('MsgPop'));
			
			if(MessagePopup != null)
				MessagePopup.close();
		}
		
		
		function closeMessagePopup(arpFlag){
			approveFlag = arpFlag;
			var unmount = React.unmountComponentAtNode(document.getElementById('MsgPop'));
			
			if(MessagePopup != null)
				MessagePopup.close();
				
			approveFlag = false;
				
		}
		
		function MsgPopup(msg){
			var selfMsg = msg;
			MessagePopup = $('#MsgPop').bPopup({
				modalClose: false,
            	opacity: 0.6,
            	positionStyle: 'fixed',
            	autoClose: 2000,
            	onOpen: function(msg) {
	                React.render(React.createElement(MsgPop, {msg: selfMsg}), document.getElementById('MsgPopup'));
	            }
			});
			
			$("#msgPopId").html(selfMsg);		
		}
		
		function ConfirmPopup(msg, obj, x){
			var selfMsg = msg;
			MessagePopup = $('#MsgPop').bPopup({
				modalClose: false,
            	opacity: 0.6,
            	positionStyle: 'fixed',
            	onOpen: function(msg) {
            		if(x !== undefined)
	                	React.render(React.createElement(ConfirmPop, {msg: selfMsg, okcancel: 'x'}), document.getElementById('MsgPopup'));
	                else
	                	React.render(React.createElement(ConfirmPop, {msg: selfMsg}), document.getElementById('MsgPopup'));
	                	
	                $('#MsgPop').draggable({ handle: "div.pop-modalwindow-header" });
	            },
	            onClose: function() {
	            	if(approveFlag){
	            		obj();
	            		approveFlag = false;
	            	}
	            }
			});
			
			$("#cfrmPopMsgId").html(selfMsg);
		}