var approveFlag = false;
		var ConfirmPop = React.createClass({
			
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
					<div>
						<div className="">  
			            	<span id="cfrmPopMsgId" className="set_txt" style={{'margin':'10px 0px 70px 0px'}}></span>  
			            </div>
			            
			            <div className="set_wrap">  
			            	<div className="btn_gslist">
						    	<button className="btn-m btn-attention" style={{'marginRight':'20px'}} onClick={this.approveRequest}>
						    		{btnTextArr[0]}
						    	</button> 
						        <button className="btn-m btn-attention" onClick={this.refuseRequest}>
						        	{btnTextArr[1]}
						        </button>
						    </div>
			            </div>
		            </div>
				);
			}
		});
		
var MsgPop = React.createClass({
			render: function() {
				return (
					<div>
						<div className="">  
			            	<span id="msgPopId" className="set_txt" style={{'margin':'10px 0px 70px 0px'}}></span>  
			            </div>
		            </div>
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
	                React.render(<MsgPop msg={selfMsg}/>, document.getElementById('MsgPopup'));
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
	                	React.render(<ConfirmPop msg={selfMsg} okcancel={'x'} />, document.getElementById('MsgPopup'));
	                else
	                	React.render(<ConfirmPop msg={selfMsg}/>, document.getElementById('MsgPopup'));
	                	
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