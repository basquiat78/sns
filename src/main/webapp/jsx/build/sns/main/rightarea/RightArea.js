// 화면 오른 영역
	var RightContentArea  = React.createClass({displayName: "RightContentArea",
		componentDidMount: function() {
				
			if(this.props.mainType=='main') {
				React.render(React.createElement(MsAddress, null), document.getElementById('RightUpLevel'));
			} else if(this.props.mainType=='group') {
				React.render(React.createElement(MyGroupFollower, {groupId: this.props.groupId}), document.getElementById('RightUpLevel'));
			}
			React.render(React.createElement(RecommendGroup, null), document.getElementById('RecommendGroup'));
			React.render(React.createElement(NewGroup, null), document.getElementById('NewGroup'));
		},

		componentWillUnmount: function() {
			React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
			React.unmountComponentAtNode(document.getElementById('RecommendGroup'));
			React.unmountComponentAtNode(document.getElementById('NewGroup'));
		},

		render: function() {
			return (
				React.createElement("div", null, 
					React.createElement("div", {id: "RightUpLevel", className: "rightarea"}), 
					React.createElement("div", {id: "RecommendGroup", className: "rightarea"}), 
					React.createElement("div", {id: "NewGroup", className: "rightarea"})
				)
			);
		}
	}); 