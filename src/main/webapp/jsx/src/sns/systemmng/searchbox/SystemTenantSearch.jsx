var SystemTenantList = React.createClass({
		
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
			               			<SystemTenant
			               				key				 = {index}
										tenantId         = {tenantdata.tenantId}
										tenantName       = {tenantdata.tenantName}
										tenantDomain     = {tenantdata.tenantDomain}
										logoUrl          = {tenantdata.logoUrl}
										mobileDomain     = {tenantdata.mobileDomain}
										isNetwork        = {tenantdata.isNetwork}
										networkApiUrl    = {tenantdata.networkApiUrl}
										networkAuthIp	 = {tenantdata.networkAuthIp}
										networkAuthToken = {tenantdata.networkAuthToken}
									/>
		           			);
		           		}
		        	);
				}
				
				this.setState({tenantList: systemTenantNodes});
			},

			render: function() {
				
	        	return (
	        		<div>
	        			<div className="gmsub" style={{'border':'0px solid #e4e3e3'}}></div>
	        			
		        		<div style={{"paddingBottom":"0"}}>
		                    <div className="search_tabstyle" style={{"marginBottom":"10px", "paddingLeft":"0", "borderBottom":"0", "height":"30px"}}>
		                        <div className="pop-modalwindow-btn-area" style={{"textAlign":"right"}}>
									<button type="button" style={{'marginRight':'20px'}} className="btn-m btn-attention" onClick={this.openTenantConfigPop}>{_SystemTenantSearch_MSG_CREATETENANTBTNTEXT}</button>
								</div>
		                	</div>  	
		                </div>
						<div className="tableBox" >
	                        <table border="0" cellSpacing="0" cellPadding="0">
	                            <caption>테이블컨텐츠</caption>                
	                            <colgroup> 
	                                <col width="20%" />
	                                <col width="*" />
	                                <col width="20%" />
	                                <col width="20%" />
	                                <col width="20%" />                                      
	                            </colgroup>
	                            <thead>
	                       			<th>{_SystemTenantSearch_MSG_COLUMN1TEXT}</th>                      
	                                <th>{_SystemTenantSearch_MSG_COLUMN2TEXT}</th>
	                                <th>{_SystemTenantSearch_MSG_COLUMN3TEXT}</th>
	                                <th>{_SystemTenantSearch_MSG_COLUMN4TEXT}</th>
	                                <th style={{"borderRight":"0"}}>{_SystemTenantSearch_MSG_COLUMN5TEXT}</th>                                              
	                            </thead>
	                                       
	                            <tbody>
	                        	{this.state.tenantList}                                                       
	                            </tbody>
	                       	</table>
	                    </div>
	            	</div>
				);
			}
		});
		
var SystemTenant = React.createClass({
		
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
	   				<tr>
                        <td className="nobottom" style={{"textAlign":"center", "marginRight":"20px"}}>{this.props.tenantName}</td>
                        <td className="nobottom">{this.props.networkApiUrl}</td>
                        <td className="nobottom">{this.props.networkAuthIp}</td>
                        <td className="nobottom">{this.props.networkAuthToken}</td>
                    	<td className="btn_gjoin , nobottom" >
                    		<div className="pop-modalwindow-btn-area">
							  <button type="button" className="btn-m btn-attention" onClick={this.openTenantConfigPop}>{_SystemTenantSearch_MSG_CONFIGBTNTEXT}</button>
							</div>
                    	</td>
                	</tr>      
	   			);
			}
		});
		
var tenantId = 0;
		var companyId=0;
		var tenantPopup;
		
		function openTenantConfigPop(tntId){
			React.unmountComponentAtNode(document.getElementById('companyList'));
			tenantId = tntId;
			React.render(<SystemCompany tenantId={tntId}/>, document.getElementById('companyList'));
			
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
			React.render(<SystemTenantList />, document.getElementById('SystemSearchBox'));
		}
		
		function deleteTenant(){
			ajaxDelByJson(contextpath + _SystemTenantSearch_smrSTS_BASE_SYSTEM_TENANT, {"tenantId":tenantId}, '');
			React.unmountComponentAtNode(document.getElementById('SystemSearchBox'));
			React.render(<SystemTenantList />, document.getElementById('SystemSearchBox'));
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
		
var SystemCompany = React.createClass({
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
						<div>
							<span style={{"width":"150px", "display":"inlineBlock", "float":"left", "lineHeight":"26px", "marginLeft":"5px"}}>{_SystemTenantSearch_MSG_COLUMN1OPTION1TEXT}</span>
              				<span style={{"width":"400px", "display":"inlineBlock", "float":"left"}}>
								<ul className="calendal_area" style={{"marginLeft":"4px"}}>
									<select style={{"width":"360px"}} ref='company' onChange={this.selectHandler}>
										{this.state.companyList.map(function(systemVo, idx) { 
										   return (<option value={systemVo.companyId}>{systemVo.companyName}</option>)
										})}
									</select>
								</ul>
							</span>
						</div>
					);
					
				} else {
					return(
						<div>
							<span style={{"width":"150px", "display":"inlineBlock", "float":"left", "lineHeight":"26px", "marginLeft":"5px"}}>{_SystemTenantSearch_MSG_POPUPCOLUMN1TEXT}</span>
							<span style={{"width":"400px", "display":"inlineBlock", "float":"left"}}>{this.state.tenantName}</span>
						</div>
					);
				}
			}
		});