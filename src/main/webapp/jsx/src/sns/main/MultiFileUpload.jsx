
	var FileUpload  = React.createClass({
		getInitialState : function () {
	        return { url : null, option: [],  previewid: null};
        },
        
        componentDidMount: function () {
        	Dropzone.autoDiscover = false;
			this.dropzone = new Dropzone('#'+this.props.previewid, this.props.dropzoneoption);
			this.setupEvents();
		},
		
		setupEvents: function () {
			this.dropzone.on("addedfile", function(file, response) {
				var removeButton = Dropzone.createElement("<button>"+ _MultiFileUpload_MSG_REMOVEFILEBTNTEXT +"</button>");
				var _this = this;

				removeButton.addEventListener("click", function(e) {
             		e.preventDefault();
              		e.stopPropagation();

              		_this.removeFile(file);
            	});
            });
            
            
            $("#button").click(function(){
                var source = $("#"+this.props.previewid).attr("src");
            });
		
		},

		render: function() {
	    	return (
					<div id={this.props.previewid} className="dropzone" style={{'width':'100%', 'height':'100px', 'overflow':'auto', 'backgroundColor':'white'}}></div>
			);
		}
	});