		//SideNav 해쉬태그
		var TagCloud  = React.createClass({displayName: "TagCloud",
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
						React.createElement("li", {className: "webpart-item li-select-hover", onClick: this.tagCloud, style: {'cursor':'pointer'}}, 
							React.createElement("span", {className: className}, this.props.tagCloudVo.tagName)
						)
				);
			}

		});
		
		var TagCloudList = React.createClass({displayName: "TagCloudList",
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
	        			return ( React.createElement(TagCloud, {key: key, tagCloudVo: tagCloudVo}) );
	        		}
	        	);
	        	
				return (
					React.createElement("div", null, 
					React.createElement("div", {className: "webpart-header"}, 
						React.createElement("p", {className: "webpart-left"}, React.createElement("span", {className: "webpart-title"}, _TagCloud_BASIC_HASHTAG))
					), 
					
					React.createElement("div", {className: "webpart-body"}, 
						React.createElement("ul", {className: "webpart-content-list-hash"}, 
						tagcloud
						)
					)
					)
				);
			}
		});
		
