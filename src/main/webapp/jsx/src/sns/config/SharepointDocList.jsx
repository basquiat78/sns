
		
		var SharepointDoc  = React.createClass({
			componentDidMount: function() {
				this.goSharepointDocList();
			},
			goSharepointDocList: function() {
				var path = this.props.path;
 				var url = null;
				var mainHeadInfoVal = $("#mainHeadInfo").val();
				if (mainHeadInfoVal == "group" && path == "FILE") {
					var siteId = $("#shpTargetId").val();
					var shpFileRepoId = $("#shpFileRepoId").val();
					if (siteId == "" && shpFileRepoId == "") {
						$("#tree").html(_SharepointDocList_MSG_NOGROUPFOLDERMSG);
						return;
//						url = contextpath + "/sns/openapi/sharepoint/site/info?UserID=" + _SharepointDocList_USERID + "&SiteType=" + _SharepointDocList_SITETYPE + "&path=" + path;
					} else {
						url = contextpath + "/sns/openapi/sharepoint/folder/info/" + path + "?UserID=" + _SharepointDocList_USERID + "&SiteID=" + siteId + "&mainType=group&FolderId=" + shpFileRepoId;
					}

//					if (siteId == shpFileRepoId) {
//						url = contextpath + "/sns/openapi/sharepoint/site/info?UserID=" + _SharepointDocList_USERID + "&SiteType=" + _SharepointDocList_SITETYPE + "&path=" + path;
//					} else {
//						url = contextpath + "/sns/openapi/sharepoint/folder/info/" + path + "?UserID=" + _SharepointDocList_USERID + "&SiteID=" + siteId + "&mainType=group&FolderId=" + shpFileRepoId;
//						$("#tree").html(_SharepointDocList_MSG_NOGROUPFOLDERMSG);
//						return;
//					}
				} else {
					url = contextpath + "/sns/openapi/sharepoint/site/info?UserID=" + _SharepointDocList_USERID + "&SiteType=" + _SharepointDocList_SITETYPE + "&path=" + path;
				}

				$("#tree").dynatree({
					title: "sharepoint folder", 
					fx: { height: "toggle", duration: 200 },
					selectMode: 1,
					keyPathSeparator: "/",
					autoFocus: false, 
					initAjax: {
						url: url
					},
					onClick: function(node, event) {
						if( node.getEventTargetType(event) == "title") {
							node.toggleSelect();
						}
					},
					onKeydown: function(node, event) {
						if( event.which == 32 ) {
							node.toggleSelect();
							return false;
						}
					},
					onPostInit: function(isReloading, isError) {
						var treeLen = $("#tree").dynatree("getTree").toDict().length;
						if (treeLen == 0) {
							$("#tree").html(_SharepointDocList_MSG_NOLINKAGEFOLDERMSG);
						}
						$("#tree").dynatree("getRoot").visit(function(node){
							checkTreeNode(node);
				    		node.expand(true);
						});
			        },
					onLazyRead: function(node){
						var folderId = node.data.FolderId == undefined ? node.data.FolderID : node.data.FolderId;
						var siteId = node.data.SiteId == undefined ? node.data.SiteID : node.data.SiteId;
						var keyPaths = node.getKeyPath().substring(1);
						var lazyUrl = contextpath + "/sns/openapi/sharepoint/folder/info/" + path + "?UserID=" + _SharepointDocList_USERID + "&SiteID=" + siteId + "&FolderId=" + folderId;
						node.appendAjax({
							url: lazyUrl,
							success: function(nd) {
								checkTreeNode(node);
								nd.visit(function(n){
									checkTreeNode(n);
                        			n.expand(true);
                        		});
					        }
						});
					}
				});
	        },

			render: function() {
				return (
					<div className="feed_wrap">
						<div id="tree"/>
					</div>
					
				);
			}
		});
	

	
		var bSharepointDocPop = null;
		var gSelShpInputId = null;
		var gFileHiddenId = null;
		
		function closeSharepointDocPop(){
			var unmount = React.unmountComponentAtNode(document.getElementById('SharepointDocPopup'));
			if(bSharepointDocPop != null)
				bSharepointDocPop.close();
		}
		
		function openSharepointDocPop(shpInputId, path, fileHiddenId){
			gSelShpInputId = shpInputId == undefined ? "" : shpInputId;
			path = path == undefined ? "ALL" : path;
			gFileHiddenId = fileHiddenId == undefined ? "" : fileHiddenId;
			
			if (shpInputId != "") {
				$("#shpGrpSpan").html();
			}

			React.render(<SharepointDoc path={path}  />, document.getElementById('SharepointDocPopup'));
			
			bSharepointDocPop = $('#SharepointDocPop').bPopup({
				modalClose: false,
            	opacity: 0.6,
            	positionStyle: 'fixed'
            	, onOpen : function() {
					document.body.style.overflow = "hidden";
					$("html").css("overflow-y","hidden");
					$('#SharepointDocPop').draggable({ handle: "div.pop-modalwindow-header" });
				}
				, onClose : function(){
					//document.body.style.overflow = "visible";
					//$("html").css("overflow-y","scroll");
				}
			});
		}

		function setSelectDocInfo() {
			var selNodes = $.map($("#tree").dynatree("getSelectedNodes"), function(node) {
		          return node.tree.getSelectedNodes();
		    });
			var checkTtlVal = "";
			var keyPaths = "";
			var keyPathArr = null;
			var shpFileNameVal = null;
			var shpOwaUrlVal = null;
			var siteId = "";
			$.map(selNodes, function(node){
				keyPaths = node.getKeyPath().substring(1);
				keyPathArr = keyPaths.split("/");
				for (var idx = 0; idx < keyPathArr.length; idx++) {
					if (idx == 0) {
						checkTtlVal = $("#tree").dynatree("getTree").getNodeByKey(keyPathArr[idx]).data.title;
					} else {
						checkTtlVal += "/" + $("#tree").dynatree("getTree").getNodeByKey(keyPathArr[idx]).data.title;
					}

					if (gSelShpInputId != "") {
						if (idx == keyPathArr.length -1) {
							siteId = $("#tree").dynatree("getTree").getNodeByKey(keyPathArr[idx]).data.SiteId == undefined ? $("#tree").dynatree("getTree").getNodeByKey(keyPathArr[idx]).data.SiteID : $("#tree").dynatree("getTree").getNodeByKey(keyPathArr[idx]).data.SiteId;
						}
					} else {
						if (idx == keyPathArr.length -1) {
							shpFileNameVal = $("#tree").dynatree("getTree").getNodeByKey(keyPathArr[idx]).data.title;
							shpOwaUrlVal = $("#tree").dynatree("getTree").getNodeByKey(keyPathArr[idx]).data.OWAUrl;
						}
					}
				} 
			});
			//$("#fileRepoId").val(keyPaths);
			
			if (gSelShpInputId != "") {
				if (keyPaths.length > 0) {
					var lastKeyPath = keyPaths.substring(keyPaths.lastIndexOf("/") + 1);
					$("#" + gSelShpInputId).val(lastKeyPath);
					$("#targetType").val("SHAREPOINT");
					$("#targetId").val(siteId);
					closeSharepointDocPop();
				} else {
					MsgPopup(_SharepointDocList_MSG_NOCHOSENFOLDERMSG);
				}
			} else {
				if (keyPaths.length > 0) {
					var lastKeyPath = keyPaths.substring(keyPaths.lastIndexOf("/") + 1);
					var shpDocIdId = null;
					var shpFileNameId = null;
					var shpOwaUrlId = null;
					var spanStrTypeFirst = false;
					var filePreviewId = null;
					if (new String(gFileHiddenId).indexOf("#") == 0) {
						filePreviewId = gFileHiddenId;
						shpDocIdId = "shpDocIdSharePop"
						shpFileNameId = "shpFileNameSharePop"
						shpOwaUrlId = "shpOwaUrlSharePop";
						spanStrTypeFirst = true;
					} else {
						shpDocIdId = "shpDocId" + gFileHiddenId;
						shpFileNameId = "shpFileName" + gFileHiddenId;
						shpOwaUrlId = "shpOwaUrl" + gFileHiddenId;
						filePreviewId = "#file_preview" + gFileHiddenId;
					}
					
					
					var spanStr = "";
					if (gFileHiddenId == "" || spanStrTypeFirst) {
						spanStr += "<span id='shpSpan" + gFileHiddenId + "'>";
						spanStr += "		<div class='add_file dz-preview dz-processing dz-success dz-complete dz-image-preview'>";
						spanStr += "			<input type='hidden' id='" + shpDocIdId + "' name='" + shpDocIdId + "' value='" + lastKeyPath + "' />";
						spanStr += "			<input type='hidden' id='" + shpFileNameId + "' name='" + shpFileNameId + "' value='" + shpFileNameVal + "' />";
						spanStr += "			<input type='hidden' id='" + shpOwaUrlId + "' name='" + shpOwaUrlId + "' value='" + shpOwaUrlVal + "' />";
						spanStr += "			<dl>";
						spanStr += "				<dt>";
						spanStr += "					<img data-dz-thumbnail='' width='40' height='40' alt='file.png' src='../images/file.png' />";
						spanStr += "				</dt>";
						spanStr += "				<dd class='name_file dz-filename'>";
						spanStr += "					<strong><span data-dz-name=''>" + shpFileNameVal + "</span></strong>";
						spanStr += "				</dd>";
						spanStr += "				<dd class='upload_bar dz-progress' style='height:10px'>";
						spanStr += "					<span class='dz-upload' data-dz-uploadprogress=''";
						spanStr += "					style='width:100%'></span>";
						spanStr += "				</dd>";
						spanStr += "				<dd class='dz-error-message'>";
						spanStr += "					<span data-dz-errormessage=''></span>";
						spanStr += "				</dd>";
						spanStr += "				<dd class='dz-success-mark'>";
						spanStr += "				</dd>";
						spanStr += "				<dd class='dz-error-mark'>";
						spanStr += "				</dd>";
						spanStr += "			</dl>";
						spanStr += "			<a href='#' class='dz-remove'  onclick='javascript:deleteSharepointFile(this); return false;'  >"+ _SharepointDocList_MSG_DELETEBTNTEXT +"</a>";
						spanStr += "		</div>";
						spanStr += "	</span>";
					} else {
						spanStr += "	<span id='shpSpan" + gFileHiddenId + "'>";
						spanStr += "		<div class='add_file dz-preview dz-processing dz-success dz-complete dz-image-preview' style='padding: 0 0 10px 0;'>";
						spanStr += "			<input type='hidden' id='" + shpDocIdId + "' name='" + shpDocIdId + "' value='" + lastKeyPath + "' />";
						spanStr += "			<input type='hidden' id='" + shpFileNameId + "' name='" + shpFileNameId + "' value='" + shpFileNameVal + "' />";
						spanStr += "			<input type='hidden' id='" + shpOwaUrlId + "' name='" + shpOwaUrlId + "' value='" + shpOwaUrlVal + "' />";
						spanStr += "			<dl style='padding: 10px 15px 0 15px;'>";
						spanStr += "				<dt>";
						spanStr += "					<img data-dz-thumbnail='' width='40' height='40' alt='file.png' src='../images/file.png' >";
						spanStr += "				</dt>";
						spanStr += "				<dd class='name_file dz-filename'>";
						spanStr += "					<strong><span data-dz-name=''>" + shpFileNameVal + "</span></strong>";
						spanStr += "				</dd>";
						spanStr += "				<dd class='dz-progress progress'>";
						spanStr += "					<span class='dz-upload' data-dz-uploadprogress='' style='width: 100%;'></span>";
						spanStr += "				</dd>";
						spanStr += "				<dd class='dz-error-message'>";
						spanStr += "					<span data-dz-errormessage=''></span>";
						spanStr += "				</dd>";
						spanStr += "				<dd class='dz-success-mark'>";
						spanStr += "";
						spanStr += "				</dd>";
						spanStr += "				<dd class='dz-error-mark'>";
						spanStr += "";
						spanStr += "				</dd>";
						spanStr += "			</dl>";
						spanStr += "			<a class='dz-remove' href='#'  onclick='javascript:deleteSharepointFile(this); return false;' >"+ _SharepointDocList_MSG_DELETEBTNTEXT +"</a>";
						spanStr += "		</div>";
						spanStr += " 	</span>";
					}

//					$("#file_preview" + gFileHiddenId + " input[name='shpDocId" + gFileHiddenId + "'").each(function (index, obj) {
//						$(obj).remove();
//					});

					var isDuplFile = false;
					$(filePreviewId + " input[name='shpDocId" + gFileHiddenId + "'").each(function (index, obj) {
						if (lastKeyPath == $(obj).val()) {
							isDuplFile = true;
							return false;
						}
					});
					if (isDuplFile == true) {
						MsgPopup(_SharepointDocList_MSG_DUPLICATEFILEEXISTMSG);
						return;
					} else {
					
						if(gFileHiddenId == '')
							$("button#addFeed").css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
						else {
							var subButtonLayout = 'subButtonLayout' + gFileHiddenId;
							$("div#" + subButtonLayout).show();
							$("button#addComment" + gFileHiddenId).css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
						}
						
						$(filePreviewId).append(spanStr);

					}

					closeSharepointDocPop();
				} else {
					MsgPopup(_SharepointDocList_MSG_NOCHOSENFILEMSG);
				}
			}
		}

		function checkTreeNode(ndRef) {
			if (gSelShpInputId != "") {
				var node = $("#tree").dynatree("getTree").getNodeByKey($("#" + gSelShpInputId).val());
				if (node != null) {
					node.select(true);
				}
			} 
//			else if (ndRef != undefined) {
//				var ndRefKeyPath = ndRef.getKeyPath().substring(1);
//				var ndRefLastKeyPath = ndRefKeyPath.substring(ndRefKeyPath.lastIndexOf("/") + 1);
//				$("#file_preview" + gFileHiddenId + " input[name='shpDocId" + gFileHiddenId + "'").each(function (index, obj) {
//					if (ndRefLastKeyPath == $(obj).val()) {
//						ndRef.select(true);
//					}
//				});
//			}
		}

	
