		var ChangeDueDate = React.createClass({displayName: "ChangeDueDate",
			render: function() {
				var id = 'duedate'+this.props.feedId;
				if(this.props.option !== undefined && this.props.option =='mount') {
					return (
							React.createElement("div", {id: id, className: "duedate"}, this.props.dateText)
	           		);
				} else {				
	        		return (
	        				React.createElement("div", null, 
								React.createElement("input", {className: "duedate", id: id, value: this.props.dateText, readOnly: true})
							)	
	           		);
	           	}
	           	
			}
		});