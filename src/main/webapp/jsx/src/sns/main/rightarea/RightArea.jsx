// 화면 오른 영역
	var RightContentArea  = React.createClass({
		componentDidMount: function() {
				
			if(this.props.mainType=='main') {
				React.render(<MsAddress/>, document.getElementById('RightUpLevel'));
			} else if(this.props.mainType=='group') {
				React.render(<MyGroupFollower groupId={this.props.groupId}/>, document.getElementById('RightUpLevel'));
			}
			React.render(<RecommendGroup/>, document.getElementById('RecommendGroup'));
			React.render(<NewGroup/>, document.getElementById('NewGroup'));
		},

		componentWillUnmount: function() {
			React.unmountComponentAtNode(document.getElementById('RightUpLevel'));
			React.unmountComponentAtNode(document.getElementById('RecommendGroup'));
			React.unmountComponentAtNode(document.getElementById('NewGroup'));
		},

		render: function() {
			return (
				<div>
					<div id='RightUpLevel' className='rightarea'></div>
					<div id='RecommendGroup' className='rightarea'></div>
					<div id='NewGroup' className='rightarea'></div>
				</div>
			);
		}
	}); 