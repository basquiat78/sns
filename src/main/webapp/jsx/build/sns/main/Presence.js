	var Presence  = React.createClass({displayName: "Presence",
		render: function() {
			var presenceId = this.props.presenceId;
			var presenceClass = 'presence-status '+ presenceId;
	    	return (
					React.createElement("span", {className: presenceClass, id: presenceId}, "_")
			);
		}
	});