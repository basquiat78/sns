	
		var Slider = React.createClass({displayName: "Slider",

			getInitialState: function() {
    			return {imageFileList: []};
  			},

			componentDidMount: function () {
				if(this.state.imageFileList.length>0) {
				
					var gallery_move_id = this.props.feedtype+this.props.feedId;
					
					$(React.findDOMNode(this.refs.galleryId)).unitegallery({
						gallery_width:404,	 
						gallery_height:300,					 
						gallery_min_width: 350,						 
						gallery_min_height: 300,					 
						gallery_theme:"default",					
						gallery_skin:"default",
						gallery_control_keyboard: false,
						slider_control_zoom:false,
						gallery_move_id:gallery_move_id
						, slider_scale_mode : "fit"
					});
				}
			},

			render: function() {
				var fileList = this.props.fileList;
				var imageFileList = [];
				if(fileList != null) {
					for(var i=0; i<fileList.length; i++) {
						if(fileList[i].fileContentType !== undefined){
							var fileContentType = fileList[i].fileContentType.split('/');
							if(fileContentType[0] === 'image' && fileList[i].repositoryType == 'LOCAL') {
								imageFileList.push(fileList[i]);
							}
						}
					}
				}

				this.state.imageFileList = imageFileList;

				if(imageFileList.length > 0) {
					var sliderImage = imageFileList.map(
						function (file) {
							var key = 'slider'+file.fileId;
							return (
									React.createElement(SliderImage, {key: key, file: file})
							);
						}
					);

					var galleryId = 'gallery'+this.props.feedId;

					return (
							React.createElement("div", {ref: "galleryId", id: galleryId, style: {'display':'none', 'marginTop':'10px'}}, 
								sliderImage
							)
					);
							
				} else {
					return (
							React.createElement("div", null)
					);
				}

			}
		});
	

	
		var SliderImage = React.createClass({displayName: "SliderImage",
			render: function() {
				var imageUrl = contextpath + '/common/files/info?fileId='+this.props.file.fileId;
				return (
						React.createElement("img", {src: imageUrl, "data-image": imageUrl})
				);
			}
		});
	