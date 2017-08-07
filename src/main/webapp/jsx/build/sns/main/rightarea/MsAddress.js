//SideNav 최근활동
	var MsAddress  = React.createClass({displayName: "MsAddress",

        componentDidMount: function() {
			React.unmountComponentAtNode(document.getElementById('MsAddressWrapper'));
			React.render(React.createElement(OutlookAddress, {changeTab: this.changeTab}
				)
				, document.getElementById('MsAddressWrapper'));
		},

		changeTab: function(tabId){
			React.unmountComponentAtNode(document.getElementById('MsAddressWrapper'));
			if(tabId == 'LyncAddressWrapper'){
				React.render(React.createElement(LyncAddress, {changeTab: this.changeTab})
				, document.getElementById('MsAddressWrapper'));
			}else if(tabId == 'OutlookAddressWrapper'){
				React.render(React.createElement(OutlookAddress, {changeTab: this.changeTab})
				, document.getElementById('MsAddressWrapper'));
			}
		},
		
		render: function() {
	    	return (
					React.createElement("div", {id: "MsAddressWrapper"})
			);
		}
	});
	
var LyncAddress = React.createClass({displayName: "LyncAddress",
		getInitialState : function () {
			return {lyncData : []};
        },

		lyncAjaxCallback:function(callbackData) {
			this.setState({ lyncData : callbackData.contactList });
		},

        componentDidMount: function() {
			this.loadLyncAddressFromServer();
		},

    	loadLyncAddressFromServer : function() {
    		ajaxGet(contextpath + _MsAddress_oarMA_GW_CONTACT_LYNC +'/'+ _MsAddress_userId, '', this.lyncAjaxCallback);
    	},
    	
    	changeTab1:function(){
    		this.props.changeTab('LyncAddressWrapper');
    	},
    	changeTab2:function(){
    		this.props.changeTab('OutlookAddressWrapper');
    	},
    	
		render : function() {
			return (
				React.createElement("div", {id: "LyncAddressWrapper"}, 
					React.createElement("dl", {className: "rightarea_gate", style: {'borderBottom':'none', 'marginTop':'19px', 'marginBottom':'0px'}}, 
	                    React.createElement("dt", {className: "malgun13"}), 
	                    React.createElement("dd", {className: "malgun14 menu_line", style: {'color':'#333', 'cursor':'pointer'}}, React.createElement("strong", null, _MsAddress_MSG_LYNCTABTEXT)), 
	                    React.createElement("dd", {className: "malgun14 menu_line menu_click", onClick: this.changeTab2, style: {'cursor':'pointer'}}, _MsAddress_MSG_OUTLOOKTABTEXT)
	                ), 
					React.createElement("dl", {className: "select_tab lync"}, 
						React.createElement("dt", null), 
						React.createElement(LyncAddressList, {lyncData: this.state.lyncData})
	                )
                )
			);
		}
	});
	
	var LyncAddressMember = React.createClass({displayName: "LyncAddressMember",

		componentDidMount : function () {

			var self = this;

			$(React.findDOMNode(this.refs.drags)).draggable({
				helper		: function() {
    							var clone = $(this).clone();
    							$(clone).removeAttr('data-reactid');
    							$(clone).children('input').removeAttr('data-reactid');
    							$(clone).children('.feed_name').removeAttr('data-reactid');
    							$(clone).children('.feed_name').children('span').removeAttr('data-reactid');
    							$(clone).children('.feed_name2').removeAttr('data-reactid');
    							$(clone).children('.feed_name2').children('span').removeAttr('data-reactid');
    							return clone;
				},
				containment : 'document',
				drag		: function(event, ui){
								$('.showApp').show();
							 }
			});

       		$(React.findDOMNode(this.refs.drags)).bind("dragstop", function(event, ui) {
				$('.notice_target').removeClass('drag-hover');
				event.stopPropagation();
				return;
       		});
       		
			$(React.findDOMNode(this.refs.drags)).bind("drag", function(event, ui) {
       			$('.notice_target').addClass('drag-hover');
        	});
	    },

		render : function() {
				var	memberName 	  = this.props.memberInfo.displayName;
				var	teamName 	  = this.props.memberInfo.department;
				var	email  = this.props.memberInfo.imAddress1.replace('@hanwha.com', '');
				var dragUserId = 'dragUser_'+email.replace('@hanwha.com', '');
				var hiddenValue = email+';'+memberName+';ADDR';
				return (
					React.createElement("dl", {className: "mb_space drag-box", ref: "drags", id: dragUserId}, 
						React.createElement("input", {type: "hidden", value: hiddenValue}), 
                    	React.createElement("dd", {className: "feed_name"}, React.createElement("span", null, memberName)), 
                    	React.createElement("dd", {className: "feed_name2"}, React.createElement("span", null, teamName))
                	)
				);
		}
	});
	
	var LyncAddressList = React.createClass({displayName: "LyncAddressList",

		componentDidMount : function () {
		},

		render : function() {
			var lyncMemberList = this.props.lyncData.map(function (lync, index) {
				var key = 'lync_'+index;
				if (lync.imAddress1.indexOf("@hanwha.com") >= 0) {
					return (React.createElement(LyncAddressMember, {key: key, memberInfo: lync}));
				}
			});

			return (
				React.createElement("div", {className: "group_person"}, 
					React.createElement("div", {className: "scroll_area_address"}, 
						lyncMemberList
					)
				)	
			);
		}
	});

var IamALonely = React.createClass({displayName: "IamALonely",
	render : function() {
		return (
				React.createElement("div", {style: {'textAlign':'center'}}, 
					_MsAddress_MSG_IAMAOUTCAST
				)
		)
	}
});			
			
var OutlookAddress = React.createClass({displayName: "OutlookAddress",
		getInitialState : function () {
			return {outLookData : ''};
        },

		lyncAjaxCallback:function(callbackData) {
			
			if(callbackData.length == 0) {
				var element = document.createElement("div");
				element.id = 'noMyPeopleHere';
				$("#MsAddressWrapper").after(element);
				React.render(React.createElement(IamALonely, null), document.getElementById('noMyPeopleHere'));
			}
			
			this.setState({ outLookData : callbackData });
		},

        componentDidMount: function() {
			this.loadOutlookAddressFromServer();
		},

    	loadOutlookAddressFromServer : function() {
    		ajaxGet(contextpath + _MsAddress_oarMA_GW_CONTACT_FOLDER +'/'+ _MsAddress_userId, '', this.lyncAjaxCallback);
    	},

    	changeTab1:function(){
    		this.props.changeTab('LyncAddressWrapper');
    	},
    	changeTab2:function(){
    		this.props.changeTab('OutlookAddressWrapper');
    	},

		showFolder:function(id){
			$('.outlookDiv').hide();
			$('#'+id).show();

		},

		render : function() {

			var outlookFolderList = [];
			if(this.state.outLookData !=='') {
				var defaultKey = 'default_folder';
				outlookFolderList.push(React.createElement(OutlookFolder, {
													showFolder: this.showFolder, 
													key: defaultKey, 
													data: this.state.outLookData.DefaultFolder, 
													type: 'default'}
										));
				
				var contactFoldersLength = this.state.outLookData.ContactFolders.length;
				var self = this;
				this.state.outLookData.ContactFolders.forEach(function(folder, index){
					var pos = 'middle';
					if(index == contactFoldersLength-1) pos = 'bottom';
					var contactKey = 'contact_folder_'+index;
					outlookFolderList.push(React.createElement(OutlookFolder, {
														showFolder: self.showFolder, 
														key: contactKey, 
														data: folder, 
														type: 'contact', 
														pos: pos}
											));
				});
			}

			return (
				React.createElement("div", {id: "OutlookAddressWrapper"}, 
					React.createElement("dl", {className: "rightarea_gate", style: {'marginTop':'19px', 'marginBottom':'0px'}}, 
	                    React.createElement("dt", {className: "malgun13"}, _MsAddress_MSG_OUTLOOKTABTEXT), 
	                    React.createElement("dd", {className: "malgun1 menu_line menu_click", onClick: this.changeTab1, style: {'cursor':'pointer', 'display':'none'}}, _MsAddress_MSG_LYNCTABTEXT), 
	                    React.createElement("dd", {className: "malgun14 menu_line", style: {'color':'#333',  'cursor':'pointer', 'display':'none'}}, React.createElement("strong", null, _MsAddress_MSG_OUTLOOKTABTEXT))
	                ), 
	                React.createElement("dl", {className: "select_tab outlook"}, 
						React.createElement("dt", null), 
						outlookFolderList
	                )
                )
			);
		}
	});

	var OutlookAddressList = React.createClass({displayName: "OutlookAddressList",

		getInitialState : function () {
			return {outLookMemberList : []};
        },

		outLookMemberListByFolderId:function(data) {
			var x = 0;
			var y = [];
			data.contactList.map(function(member, index){
				if(member.imAddress1 !='' && member.imAddress1.indexOf("@hanwha.com") >= 0) {
					var key = index;
					x+=1;
					y.push(React.createElement(OutlookAddressMember, {key: key, memberInfo: member}));
				}
			});
			
			if(x == 0) y = [React.createElement("dl", {style: {'textAlign':'center'}}, React.createElement("dd", null, _MsAddress_MSG_IAMAOUTCAST))];		
					
			this.setState({outLookMemberList : y});
		},

		componentDidMount: function() {
			$('.addrOff').hide();
			var folderId = this.props.folderId;
			var gwVo = {"userId": _MsAddress_userId , "folderId":folderId};
			ajaxPost(contextpath + _MsAddress_oarMA_GW_CONTACT_LIST , gwVo ,this.outLookMemberListByFolderId)
		},

		render : function() {
			var tabClass = 'group_person outlookDiv addrOn';
			if(this.props.onTab == 'off') tabClass = 'group_person outlookDiv addrOff';
			
			/*var outLookMemberList = null;
			var x = 0;
			
			outLookMemberList = this.state.outLookMemberList.map(function(member, index){
				if(member.imAddress1 !='' && member.imAddress1.indexOf("@hanwha.com") >= 0) {
					var key = index;
					x+=1;
					return (<OutlookAddressMember key={key} memberInfo={member}/>);
				}
			});
					
			if(x == 0)
				outLookMemberList = <dl style={{'textAlign':'center'}}><dd>{_MsAddress_MSG_IAMAOUTCAST}</dd></dl>;
		*/
			return (
					React.createElement("div", {className: tabClass, id: this.props.hexId, style: {'marginTop':'0px'}}, 
						React.createElement("div", {className: "scroll_area_address"}, 
							this.state.outLookMemberList
						)
					)
			);
		}
	});	

	var OutlookAddressMember = React.createClass({displayName: "OutlookAddressMember",

		componentDidMount : function () {

			var self = this;
			$(React.findDOMNode(this.refs.drags)).draggable({
				helper		: function() {
      							var clone = $(this).clone();
    							$(clone).removeAttr('data-reactid');
    							$(clone).children('input').removeAttr('data-reactid');
    							$(clone).children('.feed_name').removeAttr('data-reactid');
    							$(clone).children('.feed_name').children('span').removeAttr('data-reactid');
    							$(clone).children('.feed_name2').removeAttr('data-reactid');
    							$(clone).children('.feed_name2').children('span').removeAttr('data-reactid');
    							return clone;
				},
				containment : 'document',
				drag		: function(event, ui){
								$('.showApp').show();
							 }
			});

       		$(React.findDOMNode(this.refs.drags)).bind("dragstop", function(event, ui) {
				$('.notice_target').removeClass('drag-hover');
				event.stopPropagation();
				return;
       		});
       		
			$(React.findDOMNode(this.refs.drags)).bind("drag", function(event, ui) {
       			$('.notice_target').addClass('drag-hover');
        	});

	    },

		render : function() {
				var	memberName 	  = this.props.memberInfo.displayName;
				var	teamName 	  = this.props.memberInfo.department;
				var	email  = this.props.memberInfo.imAddress1.replace('@hanwha.com', '');
				var dragUserId = 'dragUser_'+email.replace('@hanwha.com', '');
				var hiddenValue = email+';'+memberName+';ADDR';
				return (
					React.createElement("dl", {className: "mb_space drag-box", ref: "drags", id: dragUserId}, 
						React.createElement("input", {type: "hidden", value: hiddenValue}), 
                    	React.createElement("dd", {className: "feed_name"}, React.createElement("span", null, memberName)), 
                    	React.createElement("dd", {className: "feed_name2"}, React.createElement("span", null, teamName))
                	)
				);
		}
	});

	var OutlookFolder = React.createClass({displayName: "OutlookFolder",

		getInitialState : function () {
			return {outlookFolderList : []};
        },
        
		showFolder:function() {
		
			var outlookFolderList = [];
			if($(React.findDOMNode(this.refs.outlook)).hasClass('on_tab')) {
				
				$('.on_tab').removeClass('on_tab').addClass('off_tab');
				$('.selectImage').attr('src','../images/icon_arrowoff.gif').attr('width','6').attr('height','12');
				
				//outlookFolderList = [];
				//this.setState({outlookFolderList : outlookFolderList});
				$('div.group_person.outlookDiv.addrOn').hide();
				
				return;
			}
		
			if(this.props.type == 'default') {
				outlookFolderList.push(React.createElement(OutlookAddressList, {key: 'DefaultFolder', hexId: this.props.data.hexId, folderId: this.props.data.id}));
				this.setState({outlookFolderList : outlookFolderList});
			} else {
				outlookFolderList.push(React.createElement(OutlookAddressList, {key: this.props.data.hexId, hexId: this.props.data.hexId, folderId: this.props.data.id}));
				this.setState({outlookFolderList : outlookFolderList});
			}
			
			this.props.showFolder(this.props.data.hexId);
			
			if($(React.findDOMNode(this.refs.outlook)).hasClass('off_tab')) {
				$('.on_tab').removeClass('on_tab').addClass('off_tab');   	
				$(React.findDOMNode(this.refs.outlook)).removeClass('off_tab').addClass('on_tab');
				$('.selectImage').attr('src','../images/icon_arrowoff.gif').attr('width','6').attr('height','12');
				$(React.findDOMNode(this.refs.selectImage)).attr('src', '../images/icon_arrowon.gif').attr('width','8').attr('height','8');
			}

		},

		render : function() {
			
			if(this.props.type == 'default') {
				return (
					React.createElement("div", null, 
						React.createElement("dd", {className: "off_tab default", onClick: this.showFolder, ref: "outlook"}, React.createElement("span", null, React.createElement("img", {ref: "selectImage", className: "selectImage", src: "../images/icon_arrowoff.gif", width: "6", height: "12"}), this.props.data.displayName)), 
						this.state.outlookFolderList
					)
				);
			} else {
				var tabClassName = 'off_tab '+this.props.pos;
				return (
					React.createElement("div", null, 
						React.createElement("dd", {className: tabClassName, onClick: this.showFolder, ref: "outlook"}, React.createElement("span", null, React.createElement("img", {ref: "selectImage", className: "selectImage", src: "../images/icon_arrowoff.gif", width: "6", height: "12"}), this.props.data.displayName)), 
						this.state.outlookFolderList
					) 
				);
			}
		}
	});