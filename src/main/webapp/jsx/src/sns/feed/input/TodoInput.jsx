		var ChangeDueDate = React.createClass({
			render: function() {
				var id = 'duedate'+this.props.feedId;
				if(this.props.option !== undefined && this.props.option =='mount') {
					return (
							<div id={id} className='duedate'>{this.props.dateText}</div>
	           		);
				} else {				
	        		return (
	        				<div>
								<input className='duedate' id={id} value={this.props.dateText} readOnly/>
							</div>	
	           		);
	           	}
	           	
			}
		});