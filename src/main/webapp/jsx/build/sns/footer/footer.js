//SideNav footer
	var Footer  = React.createClass({displayName: "Footer",
		render: function() {
	    	return (
					React.createElement("footer", {className: "lay-footer"}, 
                    	React.createElement("p", {className: "footer-logo"}, "uEngine"), 
                       	React.createElement("p", {className: "copyright"}, "© 2000-2016 uengine.org.", React.createElement("br", null), "ALL RIGHTS RESERVED.")
                    )
			);
		}
	});