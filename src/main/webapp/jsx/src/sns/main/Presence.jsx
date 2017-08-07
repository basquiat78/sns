	var Presence  = React.createClass({
		render: function() {
			var presenceId = this.props.presenceId;
			var presenceClass = 'presence-status '+ presenceId;
	    	return (
					<span className={presenceClass} id={presenceId}>_</span>
			);
		}
	});