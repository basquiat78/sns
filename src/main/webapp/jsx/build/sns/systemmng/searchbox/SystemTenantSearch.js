var SystemTenantList = React.createClass({displayName: "SystemTenantList",
		
			getInitialState : function () {
		        return {tenantList :[]};
	        },
	        
			componentDidMount : function() {
				ajaxGet(contextpath + _SystemTenantSearch_smrSTS_BASE_SYSTEM_TENANT, {}, this.tenantRender);
			},
			
			componentWillUnmount: function() {
				closeTenantConfigPop();
			},
			
			openTenantConfigPop : function() {
				openTenantConfigPop(0);
			},
			
			tenantRender : function(data){
				
				$('.img_feedmore').show(0).delay(500).hide(0);
				
				var systemTenantNodes = null;
				
				if(data.length > 0){
					systemTenantNodes = data.map(
		        		function (tenantdata, index) {
							return (
			               			React.createElement(SystemTenant, {
			               				key: index, 
										tenantId: tenantdata.tenantId, 
										tenantName: tenantdata.tenantName, 
										tenantDomain: tenantdata.tenantDomain, 
										logoUrl: tenantdata.logoUrl, 
										mobileDomain: tenantdata.mobileDomain, 
										isNetwork: tenantdata.isNetwork, 
										networkApiUrl: tenantdata.networkApiUrl, 
										networkAuthIp: tenantdata.networkAuthIp, 
										networkAuthToken: tenantdata.networkAuthToken}
									)
		           			);
		           		}
		        	);
				}
				
				this.setState({tenantList: systemTenantNodes});
			},

			render: function() {
				
	        	return (
	        		React.createElement("div", null, 
	        			React.createElement("div", {className: "gmsub", style: {'border':'0px solid #e4e3e3'}}), 
	        			
		        		React.createElement("div", {style: {"paddingBottom":"0"}}, 
		                    React.createElement("div", {className: "search_tabstyle", style: {"marginBottom":"10px", "paddingLeft":"0", "borderBottom":"0", "height":"30px"}}, 
		                        React.createElement("div", {className: "pop-modalwindow-btn-area", style: {"textAlign":"right"}}, 
									React.createElement("button", {type: "button", style: {'marginRight':'20px'}, className: "btn-m btn-attention", onClick: this.openTenantConfigPop}, _SystemTenantSearch_MSG_CREATETENANTBTNTEXT)
								)
		                	)	
		                ), 
						React.createElement("div", {className: "tableBox"}, 
	                        React.createElement("table", {border: "0", cellSpacing: "0", cellPadding: "0"}, 
	                            React.createElement("caption", null, "테이블컨텐츠"), 
	                            React.createElement("colgroup", null, 
	                                React.createElement("col", {width: "20%"}), 
	                                React.createElement("col", {width: "*"}), 
	                                React.createElement("col", {width: "20%"}), 
	                                React.createElement("col", {width: "20%"}), 
	                                React.createElement("col", {width: "20%"})
	                            ), 
	                            React.createElement("thead", null, 
	                       			React.createElement("th", null, _SystemTenantSearch_MSG_COLUMN1TEXT), 
	                                React.createElement("th", null, _SystemTenantSearch_MSG_COLUMN2TEXT), 
	                                React.createElement("th", null, _SystemTenantSearch_MSG_COLUMN3TEXT), 
	                                React.createElement("th", null, _SystemTenantSearch_MSG_COLUMN4TEXT), 
	                                React.createElement("th", {style: {"borderRight":"0"}}, _SystemTenantSearch_MSG_COLUMN5TEXT)
	                            ), 
	                                       
	                            React.createElement("tbody", null, 
	                        	this.state.tenantList
	                            )
	                       	)
	                    )
	            	)
				);
			}
		});
		
var SystemTenant = React.createClass({displayName: "SystemTenant",
		
			openTenantConfigPop : function() {
				openTenantConfigPop(this.props.tenantId);
			},
			
			componentWillUnmount: function() {
				closeTenantConfigPop();
			},
			
			render: function() {
				
				var isNetwork = _SystemTenantSearch_MSG_INNERTEXT;
				if(this.props.isNetwork == 1) isNetwork = _SystemTenantSearch_MSG_OUTERTEXT;
				
	   			return (
	   				React.createElement("tr", null, 
                        React.createElement("td", {className: "nobottom", style: {"textAlign":"center", "marginRight":"20px"}}, this.props.tenantName), 
                        React.createElement("td", {className: "nobottom"}, this.props.networkApiUrl), 
                        React.createElement("td", {className: "nobottom"}, this.props.networkAuthIp), 
                        React.createElement("td", {className: "nobottom"}, this.props.networkAuthToken), 
                    	React.createElement("td", {className: "btn_gjoin , nobottom"}, 
                    		React.createElement("div", {className: "pop-modalwindow-btn-area"}, 
							  React.createElement("button", {type: "button", className: "btn-m btn-attention", onClick: this.openTenantConfigPop}, _SystemTenantSearch_MSG_CONFIGBTNTEXT)
							)
                    	)
                	)      
	   			);
			}
		});
		
var tenantId = 0;
		var companyId=0;
		var tenantPopup;
		
		function openTenantConfigPop(tntId){
			React.unmountComponentAtNode(document.getElementById('companyList'));
			tenantId = tntId;
			React.render(React.createElement(SystemCompany, {tenantId: tntId}), document.getElementById('companyList'));
			
			if(tenantId != 0) $( "#tenantDeleteBtn" ).show();
			else $( "#tenantDeleteBtn" ).hide();
			
			tenantPopup = $('#tenant_to_pop_up').bPopup({
	   		 	modalClose: false,
	   	    	opacity: 0.6
	   	    	,positionStyle: 'fixed'
	   	    	, onOpen : function() {
	   				document.body.style.overflow = "hidden";
	   				$("html").css("overflow-y","hidden");
	   				$('#tenant_to_pop_up').draggable({ handle: "div.pop-modalwindow-header" });
	   			}
	   			, onClose : function(){
	   				document.body.style.overflow = "visible";
	   				$("html").css("overflow-y","scroll");
	   			}
			});
		}
		
		function closeTenantConfigPop(){
			React.unmountComponentAtNode(document.getElementById('companyList'));
			
			$("input:text[name='networkApiUrl']").val('');
			$("input:text[name='networkAuthIp']").val('');
			$("input:text[name='networkAuthToken']").val('');
			$("input:checkbox[name='isNetwork']").attr("checked", false);
			chgCheck();
			
			if(tenantPopup != null)
				tenantPopup.close();
		}
		
		function saveTenant(){
			var isNetwork = $("input:checkbox[name='isNetwork']").is(":checked")?1:0;
			
			if(tenantId == 0){
				var jsondata = {
					 "companyId" : companyId
					,"isNetwork" : isNetwork
					,"networkApiUrl" : $("input:text[name='networkApiUrl']").val()
					,"networkAuthIp" : $("input:text[name='networkAuthIp']").val()
					,"networkAuthToken" : $("input:text[name='networkAuthToken']").val()
				};
				
				ajaxAdd(contextpath + _SystemTenantSearch_smrSTS_BASE_SYSTEM_TENANT, jsondata, saveTenantResult);
				
			}else{
				var jsondata = {
					 "tenantId"  : tenantId
					,"companyId" : companyId
					,"isNetwork" : isNetwork
					,"networkApiUrl" : $("input:text[name='networkApiUrl']").val()
					,"networkAuthIp" : $("input:text[name='networkAuthIp']").val()
					,"networkAuthToken" : $("input:text[name='networkAuthToken']").val()
				};
				
				ajaxUpd(contextpath + _SystemTenantSearch_smrSTS_BASE_SYSTEM_TENANT, jsondata, saveTenantResult);
			}
			
		}
		
		function saveTenantResult(data){
			React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
			React.render(React.createElement(SystemTenantList, null), document.getElementById('SystemSearchBox'));
		}
		
		function deleteTenant(){
			ajaxDelByJson(contextpath + _SystemTenantSearch_smrSTS_BASE_SYSTEM_TENANT, {"tenantId":tenantId}, '');
			React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
			React.render(React.createElement(SystemTenantList, null), document.getElementById('SystemSearchBox'));
		}
		
		function chgCheck(){
			if($("input:checkbox[name='isNetwork']").is(":checked")){
				$("input[name=networkApiUrl]").attr("disabled",false);
				$("input[name=networkAuthIp]").attr("disabled",false);
				$("input[name=networkAuthToken]").attr("disabled",false);
			}else{
				$("input[name=networkApiUrl]").attr("disabled",true);
				$("input[name=networkAuthIp]").attr("disabled",true);
				$("input[name=networkAuthToken]").attr("disabled",true);
			}
		}
		
var SystemCompany = React.createClass({displayName: "SystemCompany",
			getInitialState : function () {
		        return {
		        	 companyList :null
		        	,tenantId : 0
		        	,tenantName : _SystemTenantSearch_MSG_COLUMN1OPTION2TEXT
		        	,companyId: ''
		        };
	        },
	        
			componentDidMount : function() {
				if(this.props.tenantId == 0){
					ajaxGet(contextpath + _SystemTenantSearch_smrSTS_BASE_SYSTEM_COMPANY, {}, this.companyListResult);
				}else{
					ajaxGet(contextpath + _SystemTenantSearch_smrSTS_BASE_SYSTEM_TENANT + '/'+this.props.tenantId, {}, this.tenantResult);
				}
			},
			
			tenantResult: function(data){
				this.setState({
					 tenantId   : data.tenantId
					,tenantName : data.tenantName
				});
				
				console.log(data.isNetwork);
				if(data.isNetwork == 0) {
					$("input:checkbox[name='isNetwork']").attr("checked", false);
				} else {
					$("input:checkbox[name='isNetwork']").attr("checked", true);
				}
				
				chgCheck();
				$("input:text[name='networkApiUrl']").val(data.networkApiUrl);
				$("input:text[name='networkAuthIp']").val(data.networkAuthIp);
				$("input:text[name='networkAuthToken']").val(data.networkAuthToken);
			},
			
			companyListResult : function(data) {
				this.setState({companyList : data});
			},
			
			selectHandler : function(){
				companyId = this.refs.company.getDOMNode().value;
			},
			
			render: function() {
				if(this.state.companyList != null){
					return (
						React.createElement("div", null, 
							React.createElement("span", {style: {"width":"150px", "display":"inlineBlock", "float":"left", "lineHeight":"26px", "marginLeft":"5px"}}, _SystemTenantSearch_MSG_COLUMN1OPTION1TEXT), 
              				React.createElement("span", {style: {"width":"400px", "display":"inlineBlock", "float":"left"}}, 
								React.createElement("ul", {className: "calendal_area", style: {"marginLeft":"4px"}}, 
									React.createElement("select", {style: {"width":"360px"}, ref: "company", onChange: this.selectHandler}, 
										this.state.companyList.map(function(systemVo, idx) { 
										   return (React.createElement("option", {value: systemVo.companyId}, systemVo.companyName))
										})
									)
								)
							)
						)
					);
					
				} else {
					return(
						React.createElement("div", null, 
							React.createElement("span", {style: {"width":"150px", "display":"inlineBlock", "float":"left", "lineHeight":"26px", "marginLeft":"5px"}}, _SystemTenantSearch_MSG_POPUPCOLUMN1TEXT), 
							React.createElement("span", {style: {"width":"400px", "display":"inlineBlock", "float":"left"}}, this.state.tenantName)
						)
					);
				}
			}
		});