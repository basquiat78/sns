	
		var NoFileFeed = React.createClass({displayName: "NoFileFeed",
			render: function() {
	        	return (
						React.createElement("tr", null, 
							React.createElement("td", {colSpan: "5"}, _FEED_FeedFile_MSG_NOFILEMSG)
						)
	           	);
			}
		});
	
		var FileForFeedFile = React.createClass({displayName: "FileForFeedFile",
		
			componentDidMount: function () {
				jQuery("abbr.timeago").timeago();
			},

			render: function() {

				var file = this.props.file;
				
				var regdate = null;
				var timeago =  null;
				if (file.regDttm != undefined) {

					regdate = new Date(file.regDttm).toLocaleString();
					timeago = new Date(file.regDttm).toISOString();
				}
				//var regdate = moment(file.regDttm).format('LL');
				var downLink = contextpath + '/common/files/'+file.fileId;
				var repositoryType = file.repositoryType;
				if(repositoryType == 'SHAREPOINT') downLink= file.fileUrl;
				
				var ext = 'unknown';
				var idx = file.fileName.lastIndexOf('.');
    	  		if(idx > 0) {
        	  		ext = file.fileName.substring(idx+1).toLowerCase();
        	  	}
				
				var extClassName = 'ico-ext ico-'+ext;
				
				return (
						React.createElement("tr", null, 
                        	React.createElement("td", {style: {'color':'#09F', 'fontWeight':'600', 'paddingLeft':'4px'}}, file.repositoryType), 
                        	React.createElement("td", null, React.createElement("img", {className: extClassName, width: "19", height: "20"})), 
                        	React.createElement("td", {style: {'textAlign':'left', 'paddingLeft':'10px', 'overflow':'hidden','whiteSpace':'nowrap'}}, React.createElement("a", {href: downLink, target: "_blank"}, file.fileName)), 
                        	React.createElement("td", null, file.regMemberName, " ", file.regMemberPositionName), 
                        	React.createElement("td", null, 
                        		React.createElement("span", {className: "data-date"}, React.createElement("abbr", {className: "timeago", title: timeago}, regdate))
                        	)
                        )
				);
			}
		});
	
	
	
		var FileArray = React.createClass({displayName: "FileArray",

			render: function() {
			
				var fileNodes;
				
				if(this.props.files.length > 0){
					
					fileNodes = this.props.files.map(function(file, index){
						
						moreFeedId = file.fileId;
						console.log(moreFeedId);
						return (React.createElement(FileForFeedFile, {file: file, key: index}));
					});
				}
				return (
						React.createElement("div", null, fileNodes)
				);
			}
		});
	
	
	
		var FileFeedList = React.createClass({displayName: "FileFeedList",

			NoFileListNoti:function() {
				var element = document.createElement("tbody");
				element.id = 'noFile';
				document.getElementById('feedFileArea').appendChild(element);
				React.render(React.createElement(NoFileFeed, null), document.getElementById('noFile'));
			},

			fileListRender:function(data) {
				
				if(data.length == 0) {
					this.NoFileListNoti();
				} else {
					snsCommLoadingObj({s : 'x'});
					React.render(React.createElement(FileArray, {files: data}), document.getElementById(curMoreDivId));
				}
				
				eventFeedHeight('filelist');
			},

			getFileFeedList: function(arg) {
				var that = this;
				
				var element = document.createElement("tbody");
					divIdNum = parseInt(divIdNum) + 1;
					element.id = 'tbody' + divIdNum;
					curMoreDivId = element.id;
					document.getElementById('feedFileArea').appendChild(element);
				
				if(this.props.callType == 'GROUP') {
				
					var jsondata = {'fileId' : moreFeedId, 'groupId' : this.props.groupId};	
					if(arg === 'init') {
						ajaxGet(_FeedFile_BASE_GROUP_FILE, jsondata, that.fileListRender);
					} else {
						ajaxGet(_FeedFile_BASE_GROUP_FILE, jsondata, that.fileFeedMoreRender);
					}
				
				} else {
					var jsondata;
					
					if(_FeedFile_session_memberId === this.props.memberId)
						jsondata = {'fileId' : moreFeedId, 'memberId' : this.props.memberId};
					else
						jsondata = {'fileId' : moreFeedId, 'memberId' : this.props.memberId, 'extMemberId' : _FeedFile_session_memberId};
					
					if(arg === 'init') {
						ajaxGet(_FeedFile_BASE_PERSON_FILE, jsondata, this.fileListRender);
					} else {
						ajaxGet(_FeedFile_BASE_PERSON_FILE, jsondata, this.fileFeedMoreRender);
					}
				}
			},

			fileFeedMoreRender: function(data) {
				
				if( typeof data == "undefined" || data.length == 0) {
					$(window).off('scroll');
					//$('#tbody' + divIdNum).html('<div class="last_contents">&nbsp;</div>');
					$("#feedFileArea").after('<div class="last_contents">&nbsp;</div>');
				} else {
					snsCommLoadingObj({s : 'x'});
					React.render(React.createElement(FileArray, {files: data}), document.getElementById(curMoreDivId));
				}
				
				eventFeedHeight('filelist');
			},

			componentWillUnmount: function() {
				$(window).off('scroll');
			},

			componentDidMount: function () {
				
				snsCommLoadingObj({s : 'o'});
			
				$(window).off('scroll');

				// 더보기 관련 데이터 초기화
				curMoreDivId = '';
				divIdNum = 0;
				moreFeedId = 0;
				this.getFileFeedList('init');	
				var self = this;
				$(window).scroll(function () {
     				if($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
						self.getFileFeedList('more');
						snsCommLoadingObj({s : 'o'});
     				} 
    			});
			},
			
			render: function() {
	        	return (
						React.createElement("div", {className: "tableBox"}, 
            				React.createElement("span", {style: {'display':'block', 'margin': '20px 0 20px 0px', 'fontSize': '14px'}}, 
			    				_FEED_FeedFile_MSG_WHATTOSHOWTEXT_FILETAB
			    			), 
            				React.createElement("table", {border: "0", cellSpacing: "0", cellPadding: "0", id: "feedFileArea", style: {'borderBottom':'none','tableLayout':'fixed'}}, 
                				React.createElement("caption", null, "테이블컨텐츠"), 
                				React.createElement("colgroup", null, 
                    				React.createElement("col", {width: "12%"}), 
                    				React.createElement("col", {width: "7%"}), 
                    				React.createElement("col", {width: "*"}), 
                    				React.createElement("col", {width: "20%"}), 
                    				React.createElement("col", {width: "15%"})
                				), 
                     			React.createElement("thead", null, 
                          			React.createElement("th", {colSpan: "3"}, _FEED_FeedFile_MSG_COLUMN1TEXT), 
                          			React.createElement("th", null, _FEED_FeedFile_MSG_COLUMN2TEXT), 
                          			React.createElement("th", {style: {'borderRight':'none'}}, _FEED_FeedFile_MSG_COLUMN3TEXT)
                     			)
           					)
        				)
	           	);
			}
		});