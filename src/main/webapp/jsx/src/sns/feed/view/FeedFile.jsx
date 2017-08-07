	
		var NoFileFeed = React.createClass({
			render: function() {
	        	return (
						<tr>
							<td colSpan='5'>{_FEED_FeedFile_MSG_NOFILEMSG}</td>
						</tr>
	           	);
			}
		});
	
		var FileForFeedFile = React.createClass({
		
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
						<tr>
                        	<td style={{'color':'#09F', 'fontWeight':'600', 'paddingLeft':'4px'}}>{file.repositoryType}</td>
                        	<td><img className={extClassName} width='19' height='20' /></td>
                        	<td style={{'textAlign':'left', 'paddingLeft':'10px', 'overflow':'hidden','whiteSpace':'nowrap'}}><a href={downLink} target='_blank'>{file.fileName}</a></td>
                        	<td>{file.regMemberName} {file.regMemberPositionName}</td>
                        	<td>
                        		<span className='data-date'><abbr className='timeago' title={timeago}>{regdate}</abbr></span>
                        	</td>
                        </tr>
				);
			}
		});
	
	
	
		var FileArray = React.createClass({

			render: function() {
			
				var fileNodes;
				
				if(this.props.files.length > 0){
					
					fileNodes = this.props.files.map(function(file, index){
						
						moreFeedId = file.fileId;
						console.log(moreFeedId);
						return (<FileForFeedFile file={file} key={index}/>);
					});
				}
				return (
						<div>{fileNodes}</div>
				);
			}
		});
	
	
	
		var FileFeedList = React.createClass({

			NoFileListNoti:function() {
				var element = document.createElement("tbody");
				element.id = 'noFile';
				document.getElementById('feedFileArea').appendChild(element);
				React.render(<NoFileFeed/>, document.getElementById('noFile'));
			},

			fileListRender:function(data) {
				
				if(data.length == 0) {
					this.NoFileListNoti();
				} else {
					snsCommLoadingObj({s : 'x'});
					React.render(<FileArray files={data}/>, document.getElementById(curMoreDivId));
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
					React.render(<FileArray files={data}/>, document.getElementById(curMoreDivId));
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
						<div className='tableBox' >
            				<span style={{'display':'block', 'margin': '20px 0 20px 0px', 'fontSize': '14px'}}>
			    				{_FEED_FeedFile_MSG_WHATTOSHOWTEXT_FILETAB}
			    			</span>
            				<table border='0' cellSpacing='0' cellPadding='0' id='feedFileArea' style={{'borderBottom':'none','tableLayout':'fixed'}}>
                				<caption>테이블컨텐츠</caption>                
                				<colgroup>
                    				<col width='12%'/>
                    				<col width='7%'/>  
                    				<col width='*'/>
                    				<col width='20%'/>
                    				<col width='15%'/>
                				</colgroup>
                     			<thead>
                          			<th colSpan='3'>{_FEED_FeedFile_MSG_COLUMN1TEXT}</th>                      
                          			<th>{_FEED_FeedFile_MSG_COLUMN2TEXT}</th>
                          			<th style={{'borderRight':'none'}}>{_FEED_FeedFile_MSG_COLUMN3TEXT}</th>
                     			</thead>
           					</table>
        				</div>
	           	);
			}
		});