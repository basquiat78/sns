
var GroupNameSearchisEmpty = React.createClass({
	render : function() {
		return (
				<div style={{'textAlign':'center'}}>
					{_SystemGroupSearch_MSG_TOTALSEARCHRESULTISEMPTY}
				</div>
		)
	}
});

var GroupSearchBox = React.createClass({
		
			componentDidMount: function() {
				
				$("#regDttm").datepicker({
        			buttonImage: '../images/icon_calendal.png',
        			buttonImageOnly: true,
        			showOn: 'both',
					//changeMonth: true,
        			//changeYear: true,
     			});

				$( "#regDttm" ).datepicker( "option", $.datepicker.regional[_SystemGroupSearch_locale_language] );
				$( "#regDttm" ).datepicker( "option", "dateFormat", "yy-mm-dd");
				
				$( "#regDttm" ).click(function(){
					$('#regDttm').datepicker('show');
				});
			},
			
			componentWillUnmount: function() {
				React.unmountComponentAtNode(document.getElementById('SystemGroupBox'));
			},
			
			search: function(){
				React.unmountComponentAtNode(document.getElementById('SystemGroupBox'));
				
				React.render(<SystemGroupBox 
						baseurl={contextpath + _SystemGroupSearch_smrGS_BASE_SYSTEM_GROUP} 
						groupName	= {this.refs.groupName.getDOMNode().value} 
						groupType	= {this.refs.groupType.getDOMNode().value}
						isPublic	= {this.refs.isPublic.getDOMNode().value}
						isAutoJoin	= {this.refs.isAutoJoin.getDOMNode().value}
						regMemberName = {this.refs.regMemberName.getDOMNode().value}
						regDttm		= {this.refs.regDttm.getDOMNode().value}/>
					, document.getElementById('SystemGroupBox')
				);
			},
			
			
			render: function() {
			
				return (
					<div>
						<div className="gmsub">
							<dl className="groupimg" style={{"height":"25px"}}>
				            	<dt>{_SystemGroupSearch_MSG_TAB1COLUMN1TEXT}</dt>
				                <dd className="g_name"><input ref="groupName" type="text"/></dd>
				            </dl>
				            <dl className="groupimg" style={{"height":"25px"}}>
				            	<dt>{_SystemGroupSearch_MSG_TAB1COLUMN2TEXT}</dt>
				                <dd className="g_name">
				                	<select ref="groupType" >
				                		<option value="999">{_SystemGroupSearch_MSG_TAB1COLUMN2OPTION1TEXT}</option>
				                		<option value="0">{_SystemGroupSearch_MSG_TAB1COLUMN2OPTION2TEXT}</option>
				                		<option value="SHAREPOINT">SHAREPOINT 연동</option>
				                		<option value="EMPLOYEE">임직원 서비스 연동</option>
				                		<option value="EXPERT">전문가 연동</option>
				                		<option value="ORGANIZATION">조직도 연동</option>
				                	</select>
				                </dd>
				            </dl>
				            <dl className="groupimg" style={{"height":"25px"}}>
				            	<dt>{_SystemGroupSearch_MSG_TAB1COLUMN3TEXT}</dt>
				                <dd className="g_name">
				                	<select ref="isPublic" >
				                		<option value="999">{_SystemGroupSearch_MSG_TAB1COLUMN3OPTION1TEXT}</option>
				                		<option value="0">{_SystemGroupSearch_MSG_TAB1COLUMN3OPTION2TEXT}</option>
				                		<option value="1">{_SystemGroupSearch_MSG_TAB1COLUMN3OPTION3TEXT}</option>
				                	</select>
				                </dd>
				            </dl>
				            <dl className="groupimg" style={{"height":"25px"}}>
				            	<dt>{_SystemGroupSearch_MSG_TAB1COLUMN4TEXT}</dt>
				                <dd className="g_name">
				                	<select ref="isAutoJoin" >
				                		<option value="999">{_SystemGroupSearch_MSG_TAB1COLUMN4OPTION1TEXT}</option>
				                		<option value="0">{_SystemGroupSearch_MSG_TAB1COLUMN4OPTION2TEXT}</option>
				                		<option value="1">{_SystemGroupSearch_MSG_TAB1COLUMN4OPTION3TEXT}</option>
				                	</select>
				                </dd>
				            </dl>
				            <dl className="groupimg" style={{"height":"25px"}}>
				            	<dt>{_SystemGroupSearch_MSG_TAB1COLUMN5TEXT}</dt>
				                <dd className="g_name"><input ref="regMemberName" type="text"/></dd>
				            </dl>
				            <dl className="groupimg" style={{"height":"25px"}}>
				            	<dt>{_SystemGroupSearch_MSG_TAB1COLUMN6TEXT}</dt>
				                <dd className="g_name">
				                	<input id='regDttm' ref='regDttm' style={{'color':'blue', 'fontWeight':'bold', 'width':'70%', 'marginBottom':'15px', 'borderBottom':'1px solid #e0e0e0'}} placeholder='' readOnly></input>
				                </dd>
				            </dl>
				    	</div>
				    	<div className="pop-modalwindow-btn-area">
							<button type="button" className="btn-m btn-attention" onClick={this.search}>{_SystemGroupSearch_MSG_SEARCHBTNTEXT}</button>
						</div>
						
						
						<div id='SystemGroupBox' style={{'marginTop':'20px'}}></div>
        			</div>
           		);
			}
		});
		
var moreGroupId = 0
		// 피드 박스 DIV
		var SystemGroupBox = React.createClass({
		
			componentWillMount: function() {
				$(window).off('scroll');
			},
		
			componentDidMount: function() {
				// 더보기 관련 데이터 초기화
				
				curMoreDivId = '';
				divIdNum = 0;
				moreGroupId = 0;
				$('.btn_feedmore').hide();
				snsCommLoadingObj({s : 'o'});
				this.getGroupList();
				
				var self = this;
				$(window).scroll(function () {
     				if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
						$('.btn_feedmore').hide();
						snsCommLoadingObj({s : 'o'});
						self.getGroupList();
     				}
    			});
			},
			
			componentWillUnmount: function() {
				$(window).off('scroll');
				React.unmountComponentAtNode(document.getElementById('group_wholebox'));
			},			

			getGroupList : function(){
				var element = document.createElement("div");
				divIdNum = parseInt(divIdNum) + 1;
				element.id = 'groupLine' + divIdNum;
				curMoreDivId = element.id;
				document.getElementById('group_wholebox').appendChild(element);
				
				var jsondata = {
					'groupId' 		: moreGroupId,
					"groupName" 	: this.props.groupName,
					"groupType" 	: this.props.groupType,
					"isPublic"  	: this.props.isPublic,
					"isAutoJoin" 	: this.props.isAutoJoin,
					"regMemberName" : this.props.regMemberName,
					"regDttm"		: this.props.regDttm
				};
				
				ajaxGet(this.props.baseurl, jsondata, this.groupRender);
			},
			
			groupRender:function(data){
				$('.btn_feedmore').hide();
				snsCommLoadingObj({s : 'x'});
				if(data !== undefined && data.length > 0) {
					React.render(<SystemGroupList data={data} />, document.getElementById(curMoreDivId));
				} else {
					
					var element = document.createElement("div");
					element.id = 'noMoreFeedGroupSearchResultIsHere';
					document.getElementById('groupLine' + divIdNum).appendChild(element);
					if(divIdNum == 1)
						React.render(<GroupNameSearchisEmpty />, document.getElementById('noMoreFeedGroupSearchResultIsHere'));
					else
						$('#' + curMoreDivId).html('<div class="last_contents">&nbsp;</div>');
					
					$(window).off('scroll');
					
				}
				
				eventFeedHeight('sysadmingroup');
			},
			
			render: function() {
		    	return (
		    		<div>
		    			<div className="feed_wrap"> 
		        			<div className="tableBox" >
		                        <div id="group_wholebox"></div>
		                    </div>
		        		</div>
						
						<span onClick={this.getGroupList} className="btn_feedmore"  style={{'marginTop':'50px'}} >{_SystemGroupSearch_MSG_MOREBTNTEXT}</span>
						<span className="img_feedmore_" style={{'marginTop':'50px'}}></span>
					</div>
				);
			}
		});
		
var SystemGroupList = React.createClass({

			render: function() {
				var systemGroupNodes;
				
				if(this.props.data.length > 0){
					systemGroupNodes = this.props.data.map(
		        		function (groupdata, index) {
							return (
			               			<SystemGroup
			               				key 			  = {index}
										groupId           = {groupdata.groupId}
										groupName         = {groupdata.groupName}
										groupType         = {groupdata.groupType}
										isPublic          = {groupdata.isPublic}
										isAutoJoin        = {groupdata.isAutoJoin}
										regDttm           = {groupdata.regDttm}
										regMemberName	  = {groupdata.regMemberName}
									/>
		           			);
		           		}
		        	);
				}
				
	        	return (<div style={{'borderTop':'1px solid #e0e0e0'}}>{systemGroupNodes}</div>);
			}
		});
		
var SystemGroup = React.createClass({
			openGroupConfigPop : function() {
				openGroupConfigPop(this.props);
			},
			
			render: function() {
				moreGroupId = this.props.groupId;
				var src = contextpath + _SystemGroupSearch_grfGS_GROUP_PIC + '?groupId=' + this.props.groupId;
				
				var groupType = '';
				if(this.props.groupType == '0') {
					groupType = _SystemGroupSearch_MSG_GROUPTYPE1;
				} else if(this.props.groupType == '1') {		// 외부그룹 보안문제로 삭제됨
					groupType = _SystemGroupSearch_MSG_GROUPTYPE2;
				} else if(this.props.groupType == 'ORGANIZATION') {	// 숨김그룹
					groupType = '팀';
				} else if(this.props.groupType == 'SHAREPOINT') {
					groupType = 'Collaboration';
				} else {
					groupType = this.props.groupType;
				}
				
				var isPublic = _SystemGroupSearch_MSG_ISPUBLIC1;
				if(this.props.isPublic == 1) isPublic = _SystemGroupSearch_MSG_ISPUBLIC2;
				
	   			return (
	   				<table className="sysGroupSearchTbl" style={{'tableLayout':'fixed'}} border="0" cellSpacing="0" cellPadding="0">
                        <colgroup> 
                            <col width="10%" />
                            <col width="*" />
                            <col width="10%" />
                            <col width="15%" />
                            <col width="20%" />                                      
                        </colgroup>
                        <tbody>
		   				<tr>
		                   	<td className='group_pic'><img src={src} width="50" height="50"/></td>
		                   	<td style={{'textAlign':'left'}}>{this.props.groupName}</td>
		                   	<td>{groupType}</td>
		                   	<td>{isPublic}</td>
		                   	<td className="btn_gjoin">
		                   		<div className="pop-modalwindow-btn-area">
									<button type="button" className="btn-m btn-attention" onClick={this.openGroupConfigPop}>{_SystemGroupSearch_MSG_CONFIGBTNTEXT}</button>
						   		</div>
		                	</td>
		            	</tr>
		            	</tbody>
			    	</table>
	   			);
			}
		});