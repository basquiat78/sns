		var MainOG = React.createClass({

			goPage: function() {
				var url = this.state.link;

				if( url.indexOf(OpenGraph_BASE_FEED) == 0 ) {
					var baseurl = url;
					var jsondata = {};	
					ajaxGet(baseurl, jsondata, getFeedDetailResult);

				} else {
					var openNewWindow = window.open('about:blank');
					openNewWindow.location.href = url;
				}
			},

			getInitialState: function() {
    			return {link: ''};
  			},

			componentDidMount: function() {
				var self = this;
				$('#removeOG').bind('click', function(){
					self.props.removeOG();
				});
				$(React.findDOMNode(this.refs.og_url)).noLinky();
			},

			render: function() {
				var showRemove = this.props.showRemove;
				if(showRemove === 'false') {
					if(this.props.data.LINK !=undefined && this.props.data.LINK.url.indexOf(OpenGraph_BASE_FEED) == 0 ) {
						this.state.link = this.props.data.LINK.url;

						return (	
							<div className='af_list_wrap'>
                   				<div className='af_list' style={{'height':'72px'}}>
                   		    		<dl>
                   		        		<dt className='img_url'><img src={this.props.data.LINK.image} width='88' height='88'/></dt>
                   		        		<dd className='name_url og_url' ref='og_url' style={{'float':'none', 'display':'block', 'fontSize':'13px', 'textOverflow':'ellipsis', 'overflow':'hidden', 'whiteSpace':'nowrap', 'height':'15px'}} onClick={this.goPage} >{this.props.data.LINK.title}<br /></dd>
                   		        		<dd className='mod_cle' style={{'display':'none'}}></dd>
                   		        		<dd className='sub_txt' style={{'marginLeft':'0'}}>{this.props.data.LINK.description}</dd> 
                   		        		<dd className='sub_txt' style={{'marginLeft':'0', 'color':'#333', 'cursor':'pointer'}} onClick={this.goPage}>{_FEED_OpenGraph_MSG_MOVETOONEFEEDTEXT}</dd>                     
                   		    		</dl>
               					</div>      
           					</div>                                              
	      	    		)

					} else if(this.props.data.LINK !=undefined && this.props.data.LINK.url.indexOf(OpenGraph_BASE_FEED) == -1 ) { // og url 일 경우
						this.state.link = this.props.data.LINK.url;
						var arr = (this.props.data.LINK.url).split("/");
						var onlyDomain = arr[0] + "//" + arr[2];
						console.log(onlyDomain);
						var fullImgPath = '';
						if(this.props.data.LINK.image == undefined || this.props.data.LINK.image != '') {
							fullImgPath = (this.props.data.LINK.image).indexOf('http')==-1 ? 
									onlyDomain + this.props.data.LINK.image : this.props.data.LINK.image;
						} else {
							fullImgPath = '';
						}
						return (	
							<div className='af_list_wrap'>
                   				<div className='af_list' style={{'height':'72px'}} onClick={this.goPage}>
                   		    		<dl>
                   		        		<dt className='img_url'><img src={fullImgPath} width='88' height='88'/></dt>
                   		        		<dd className='name_url og_url' style={{'float':'none', 'display':'block', 'fontSize':'13px', 'textOverflow':'ellipsis', 'overflow':'hidden', 'whiteSpace':'nowrap', 'height':'15px'}} ><strong>{this.props.data.LINK.title}</strong><br /></dd>
                   		        		<dd className='mod_cle' style={{'display':'none'}}></dd>
                   		        		<dd className='sub_txt' style={{'marginLeft':'0', 'marginTop':'15px'}}>{this.props.data.LINK.description}</dd>  
                   		        		<dd className='sub_txt' style={{'marginLeft':'110px', 'marginTop':'15px', 'color':'#333', 'cursor':'pointer', 'wordBreak':'break-all'}}>&nbsp;</dd>                     
                   		    		</dl>
               					</div>      
           					</div>                                              
	      	    		)


					} else if(this.props.data.NOTICE !=undefined) {
						var content = this.props.data.NOTICE.contents.replace(/<br[^>]*>/g, "\n");
						return (	
								<div className='feed_notice'>
                                	<span><strong>{_FEED_OpenGraph_MSG_NOTICETEXT}</strong></span>
                                    <dl>
                                        <dd style={{'color':'#386cbb', 'fontSize':'14px', 'whiteSpace':'pre-line', 'wordBreak':'break-all'}} className='nostyle'>{content}</dd>
                                    </dl>
                                </div>                                             
	      	    		)
					}
				} else {
	       	    	return (	
                   			<div className='af_list' style={{'height':'72px','borderRight':'none','borderLeft':'none','borderBottom':'none'}}>
                   	    		<dl>
               	        			<dt className='img_url'><img src={this.props.data.LINK.image} width='88' height='88'/></dt>
               	        			<dd className='mod_cle' id='removeOG'>{_FEED_OpenGraph_MSG_DELETEBTNTEXT}</dd>
               	        			<dd className='name_url' style={{'float':'none', 'display':'block', 'fontSize':'14px'}}><strong>{this.props.data.LINK.title}</strong><br /></dd>
               	        			<dd className='sub_txt' style={{'marginLeft':'0', 'width':'80%', 'marginTop':'15px'}}>{this.props.data.LINK.description}</dd>  
               	        			<dd className='sub_txt2' style={{ 'marginTop':'15px'}}>&nbsp;</dd>                     
               	    			</dl>
               				</div>           
	       	    	);
				}
			}
		});
	
	
	
		
		var CommentOG = React.createClass({

			goPage: function() {
				var url = this.state.link;
				var openNewWindow = window.open('about:blank');
				openNewWindow.location.href = url;
			},

			getInitialState: function() {
    			return {link: this.props.data.LINK.url};
  			},

			componentDidMount: function() {
				var self = this;
				$(React.findDOMNode(this.refs.removeOG)).bind('click', function(){
					self.props.removeOG();
				});
			},

			render: function() {
				var showRemove = this.props.showRemove;
				if(showRemove === 'false') {
					this.state.link = this.props.data.LINK.url;
					var arr = (this.props.data.LINK.url).split("/");
					var onlyDomain = arr[0] + "//" + arr[2];
					console.log(onlyDomain);
					var fullImgPath = '';
					if(this.props.data.LINK.image == undefined || this.props.data.LINK.image != '') {
						fullImgPath = (this.props.data.LINK.image).indexOf('http')==-1 ? 
								onlyDomain + this.props.data.LINK.image : this.props.data.LINK.image;
					} else {
						fullImgPath = '';
					}
					return (	
                   			<div className='af_list' style={{'height':'72px', 'margin':'4px 7px 0 0', 'borderBottom':''}} >
                   	    		<dl>
                   	        		<dt className='img_url'><img src={fullImgPath} width='88' height='88'/></dt>
                   	        		<dd className='name_url' style={{'float':'none', 'display':'block', 'fontSize':'14px'}} onClick={this.goPage}><strong>{this.props.data.LINK.title}</strong><br /></dd>
                   	        		<dd className='mod_cle' style={{'display':'none'}}></dd>
                   	        		<dd className='sub_txt' style={{'marginLeft':'0', 'marginTop':'15px'}}>{this.props.data.LINK.description}</dd>  
                   	        		<dd className='sub_txt' style={{'marginLeft':'0', 'marginTop':'15px', 'color':'#333', 'cursor':'pointer'}}>&nbsp;</dd>                     
                   	    		</dl>
               				</div>      
         
	      	    	)
				} else {
	       	    	return (	
                   			<div className='af_list' style={{'marginTop':'4px 7px 0 0', 'padding':'0 0 22px 0'}}>
                   	    		<dl style={{'paddingLeft':'7px', 'paddingTop':'10px'}}>
                   	        		<dt className='img_url'><img src={this.props.data.LINK.image} width='88' height='88'/></dt>
                   	        		<dd className='mod_cle' ref='removeOG'>{_FEED_OpenGraph_MSG_DELETEBTNTEXT}</dd>
                   	        		<dd className='name_url' style={{'float':'none', 'display':'block', 'fontSize':'14px'}}><strong>{this.props.data.LINK.title}</strong><br /></dd>
                   	        		<dd className='sub_txt' style={{'marginLeft':'0', 'marginTop':'15px'}}>{this.props.data.LINK.description}</dd>  
                   	        		<dd className='sub_txt2' style={{'marginTop':'15px'}}>&nbsp;</dd>                     
                   	    		</dl>
               				</div>           
    
	       	    	);
				}
			}
		});