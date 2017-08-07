		//SideNav 해쉬태그
		var TagCloud  = React.createClass({
			componentDidMount: function() {},
			
			componentWillUnmount: function() {
			//	React.unmountComponentAtNode(document.getElementById('IntegrationTabPopup'));
			},		
			
			tagCloud: function() {
			
				findFeedTag(this.props.tagCloudVo.tagName, 'go');
				/*			
				$("#pItgSch").val(this.props.tagCloudVo.tagName);
				openIntegrationBody();
				*/
				
			},
			
			render: function() {
				var className = "item-anchor-Tag1";
				if(this.props.tagCloudVo.tagCount > 1){
					className = "item-anchor-Tag2"
				}
			
	    		return (
						<li className='webpart-item li-select-hover' onClick={this.tagCloud} style={{'cursor':'pointer'}}>
							<span className={className}>{this.props.tagCloudVo.tagName}</span>
						</li>
				);
			}

		});
		
		var TagCloudList = React.createClass({
			getInitialState : function () {
		        return { tagCountList : []};
	        },
	        
	        
			notify: function(data) {
				this.ajaxCallByComponent();
			},
			
			reload: function(data) {
				this.ajaxCallByComponent();
			},
        	
        	ajaxCallByComponent: function() {
				var baseurl = contextpath + _TagCloud_TAG_COUNT;
				var jsondata = {};	
				ajaxGet(baseurl, jsondata, this.resultTagCountList);
        	},
        
        	componentWillUnmount: function() {
     			Observer.unregisterObserver(this);
     			Reloader.unregisterReloader(this);
 			},
	        
	        componentDidMount: function() {
				Observer.registerObserver(this);
				Reloader.registerReloader(this);
				this.ajaxCallByComponent();
			},
			
			resultTagCountList: function(data){
	        	this.setState({tagCountList:data});
	        },
			
			render: function() {
				var tagcloud = this.state.tagCountList.map(
	        		function(tagCloudVo, index){
						var key = 'tagCloud'+index;
	        			return ( <TagCloud  key={key} tagCloudVo={tagCloudVo} /> );
	        		}
	        	);
	        	
				return (
					<div>
					<div className='webpart-header'>
						<p className='webpart-left'><span className='webpart-title'>{_TagCloud_BASIC_HASHTAG}</span></p>
					</div>
					
					<div className='webpart-body'>
						<ul className='webpart-content-list-hash'>
						{tagcloud}
						</ul>
					</div>
					</div>
				);
			}
		});
		
