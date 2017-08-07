		var gShpFileSiteId = "";
		var gShpFileFolderId = "";
		var gShpPageNo = 1;
		var gShpRowLimit = "30";
		var gKeyword = "";
		var gShpFirstItemID = "";
		var gShpFirstItemCreated = "";
		var gShpPagedPrev = "";
		var gShpLastItemID = "";
		var gShpLastItemCreated = "";

		var SharepointFile  = React.createClass({
			componentDidMount: function() {
				this.goSharepointFileList();
 				this.goScrollDataList();
 				this.goSearchShpFile();
			},
			goSearchShpFile: function(){
				$("#shpPopFind").on('keydown', this.handleKeyDown);
			},
			handleKeyDown: function(e) {
	            if( e.keyCode == 13 ) {
					 var keyword = $("#shpPopFind").val();
					 if (gShpFileFolderId == "") {
					 	return;
					 } else if (gShpFileSiteId != "") {
					 	goShpFileDataList(keyword);
					 } else {
					 	MsgPopup(_SharepointFileList_MSG_NOCHOOSEFOLDER);
					 }
	            }
	        },
			componentWillUnMount: function() {
	            $("#shpPopFind").off('keydown', this.handleKeyDown);
	        },
			goScrollDataList: function() {
				$("#shpFileRightDivLayer").scroll(function () {
					var div = document.getElementById('shpFileRightDivLayer');
					var scrollHeight = div.scrollHeight;
					var scrollTop = div.scrollTop;
					var height = parseInt(div.style.height);
				    if(scrollHeight - 60 <= (scrollTop + height)) 
				    {  
				    	if (gShpLastItemID != null) {
				    		$(".shpFileLoadingTrTmpClass").remove();
				    		loadingShpFileTr();
				    		goShpFileDataList();
				    	}
				    }  
				});
			},
			goSharepointFileList: function() {
				var path = this.props.path;
 				var url = contextpath + "/sns/openapi/sharepoint/site/info?UserID=" + _SharepointFileList_USERID + "&SiteType=" + _SharepointFileList_SITETYPE + "&path=" + path;

				$("#tree").dynatree({
					title: "sharepoint folder", 
					fx: { height: "toggle", duration: 200 },
					selectMode: 1,
					keyPathSeparator: "/",
					autoFocus: false, 
					initAjax: {
						url: url
					},
					onActivate: function(node) {
						setShpFileNodeInfo(node);
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
							$("#tree").html(_SharepointFileList_MSG_NOLINKAGEFOLDERMSG);
						}
						$("#tree").dynatree("getRoot").visit(function(node){
				    		node.expand(true);
						});
			        },
					onLazyRead: function(node){
						var folderId = node.data.FolderId == undefined ? node.data.FolderID : node.data.FolderId;
						var siteId = node.data.SiteId == undefined ? node.data.SiteID : node.data.SiteId;
						var keyPaths = node.getKeyPath().substring(1);
						var lazyUrl = contextpath + "/sns/openapi/sharepoint/folder/info/" + path + "?UserID=" + _SharepointFileList_USERID + "&SiteID=" + siteId + "&FolderId=" + folderId + "&checkUseYn=N";
						node.appendAjax({
							url: lazyUrl,
							success: function(nd) {
								nd.visit(function(n){
                        			n.expand(true);
                        		});
					        }
						});
					}
				});
	        },

			render: function() {
				return (
	
		     	     <div className="share_area_wrap"  style={{'border':'0px', 'width':'994px', 'height':'526px'}}>
		                <div className="left_layer_wrap">
		                    <div className="left_layer" style={{'height':'500px'}}>
		                    	<div style={{'height':'490px'}} id="tree"/>
		                    </div>
		                </div>  
		                <div  className="right_layer_wrap">
		                    <div  className="right_layer" style={{'height':'500px'}}>
		                        <span><input id="shpPopFind" name="shpPopFind" type="text" placeholder="Find" /></span>
		               			<table width="673px" border="0" cellSpacing="0" cellPadding="0">
		                          <caption></caption>
		                          <colGroup>
		                            <col width="10%" />
		                            <col width="*" />
		                            <col width="20%" />
		                            <col width="20%" />
		                          </colGroup>
		                          <thead>
		                              <tr>
		                                <th scope="col">{_SharepointFileList_MSG_COLUMN1TEXT}</th>
		                                <th scope="col">{_SharepointFileList_MSG_COLUMN2TEXT}</th>
		                                <th scope="col">{_SharepointFileList_MSG_COLUMN3TEXT}</th>
		                                <th scope="col" style={{"border-right":"none"}}>{_SharepointFileList_MSG_COLUMN4TEXT}</th>
		                              </tr>
		                          </thead> 
		                        </table>                            
		               			<div id="shpFileRightDivLayer" className="table_wrap" style={{"height":"427px", "overflow":"auto"}}>
		                            <table id="shpFileTab"  width="0" border="0" cellSpacing="0" cellPadding="0" style={{"borderTop":"none"}}>
		                              <caption></caption>
		                              <colGroup>
		                                <col width="10%" />
		                                <col width="*" />
		                                <col width="20%" />
		                                <col width="20%" />
		                              </colGroup>                        
		                              <tbody>
		                                  		                                  
		                              </tbody>
		                            </table>
		                        </div>
		                    </div>
		                </div> 
		            </div>
		            
				);
			}
		});
	

	
	
		var bSharepointFilePop = null;
		var gShpFileHiddenId = null;
		
		function closeSharepointFilePop(){
			var unmount = React.unmountComponentAtNode(document.getElementById('SharepointFilePopup'));
			if(bSharepointFilePop != null)
				bSharepointFilePop.close();
		}
		
		function openSharepointFilePop(shpFileHiddenId) {
			gShpFileHiddenId = shpFileHiddenId == undefined ? "" : shpFileHiddenId;
			
			var path = "FOLDER";
			React.render(<SharepointFile path={path}  />, document.getElementById('SharepointFilePopup'));
			
			bSharepointFilePop = $('#SharepointFilePop').bPopup({
				modalClose: false,
            	opacity: 0.6,
            	positionStyle: 'fixed'
            	, onOpen : function() {
					document.body.style.overflow = "hidden";
					$("html").css("overflow-y","hidden");
					$('#SharepointFilePop').draggable({ handle: "div.pop-modalwindow-header" });
				}
				, onClose : function(){
					document.body.style.overflow = "visible";
					$("html").css("overflow-y","scroll");
				}
			});
		}
		
		

		function setShpFileInfo() {
		
			var spanStr = "";
			var shpDocIdId = null;
			var shpFileNameId = null;
			var shpOwaUrlId = null;
			var spanStrTypeFirst = false;
			var filePreviewId = null;
			if (new String(gShpFileHiddenId).indexOf("#") == 0) {
				filePreviewId = gShpFileHiddenId;
				shpDocIdId = "shpDocIdSharePop"
				shpFileNameId = "shpFileNameSharePop"
				shpOwaUrlId = "shpOwaUrlSharePop";
				spanStrTypeFirst = true;
			} else {
				shpDocIdId = "shpDocId" + gShpFileHiddenId;
				shpFileNameId = "shpFileName" + gShpFileHiddenId;
				shpOwaUrlId = "shpOwaUrl" + gShpFileHiddenId;
				filePreviewId = "#file_preview" + gShpFileHiddenId;
			}
			
			var shpDocIdVal = null;
			var shpFileNameVal = null;
			var shpOwaUrlVal = null;
			var chkShpDocIds = "";
			if ($("input[type='checkbox']:checked").length > 0) {
				$("input[type='checkbox']:checked").each(function(){
					shpDocIdVal = $(this).parents("tr").find("#shpDocId").val();
					shpFileNameVal = $(this).parents("tr").find("#shpFileName").val();
					shpOwaUrlVal = $(this).parents("tr").find("#shpOwaUrl").val();
					chkShpDocIds += "|" + shpDocIdVal + "|";
					
					var ext = 'unknown';
					var idx = shpFileNameVal.lastIndexOf('.');
			  		if(idx > 0) {
			  	  		ext = shpFileNameVal.substring(idx+1).toLowerCase();
			  	  	}
					
					var extClassName = 'ico-ext ico-'+ext;
									
					if (gShpFileHiddenId == "" || spanStrTypeFirst) {
						spanStr += "<span id='shpSpan" + gShpFileHiddenId + "'>";
						spanStr += "		<div class='add_file dz-preview dz-processing dz-success dz-complete dz-image-preview'>";
						spanStr += "			<input type='hidden' id='" + shpDocIdId + "' name='" + shpDocIdId + "' value='" + shpDocIdVal + "' />";
						spanStr += "			<input type='hidden' id='" + shpFileNameId + "' name='" + shpFileNameId + "' value='" + shpFileNameVal + "' />";
						spanStr += "			<input type='hidden' id='" + shpOwaUrlId + "' name='" + shpOwaUrlId + "' value='" + shpOwaUrlVal + "' />";
						spanStr += "			<dl>";
						spanStr += "				<dt>";
						//spanStr += "					<img data-dz-thumbnail='' width='40' height='40' alt='file.png' src='../images/file.png' />";
						spanStr += "					<img data-dz-thumbnail='' class='"+ extClassName +"' width='40' height='40' alt='file.png' />";
						spanStr += "				</dt>";
						spanStr += "			<a class='dz-remove' href='#'  onclick='javascript:deleteSharepointFile(this); return false;' >"+ _SharepointFileList_MSG_DELETEBTNTEXT +"</a>";
						spanStr += "				<dd class='name_file dz-filename'>";
						spanStr += "					<strong><span data-dz-name=''>" + shpFileNameVal + "</span></strong>";
						spanStr += "				</dd>";
						spanStr += "				<dd class='dz-progress progress' style='height:10px'>";
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
						spanStr += "		</div>";
						spanStr += "	</span>";
					} else {
						spanStr += "	<span id='shpSpan" + gShpFileHiddenId + "'>";
						spanStr += "		<div class='add_file dz-preview dz-processing dz-success dz-complete dz-image-preview' style='padding: 0 0 10px 0;'>";
						spanStr += "			<input type='hidden' id='" + shpDocIdId + "' name='" + shpDocIdId + "' value='" + shpDocIdVal + "' />";
						spanStr += "			<input type='hidden' id='" + shpFileNameId + "' name='" + shpFileNameId + "' value='" + shpFileNameVal + "' />";
						spanStr += "			<input type='hidden' id='" + shpOwaUrlId + "' name='" + shpOwaUrlId + "' value='" + shpOwaUrlVal + "' />";
						spanStr += "			<dl style='padding: 10px 15px 0 15px;'>";
						spanStr += "				<dt>";
						//spanStr += "					<img data-dz-thumbnail='' width='40' height='40' alt='file.png' src='../images/file.png' >";
						spanStr += "					<img data-dz-thumbnail='' class='"+ extClassName +"' width='40' height='40' alt='file.png' >";
						spanStr += "				</dt>";
						spanStr += "			<a class='dz-remove' href='#'  onclick='javascript:deleteSharepointFile(this); return false;' >"+ _SharepointFileList_MSG_DELETEBTNTEXT +"</a>";
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
						spanStr += "		</div>";
						spanStr += " 	</span>";
					}
					
				});
				
				var isDuplFile = false;
				var dupIdxArr = [];
				$(filePreviewId + " input[name='shpDocId" + gShpFileHiddenId + "']").each(function (index, obj) {
					if (chkShpDocIds.indexOf("|" + $(obj).val() + "|") >= 0) {
						isDuplFile = true;
						dupIdxArr.push(index);
					}
				});
				
				var duplFileNames = "";
				var loopCnt = dupIdxArr.length > 5 ? 5 : dupIdxArr.length;
				for (var idx=0; idx < loopCnt; idx++) {
//					if (idx == 4) {
//						duplFileNames += $(filePreviewId + " input[name='shpFileName" + gShpFileHiddenId + "']:eq(" + dupIdxArr[idx] + ")").val() + "..<br>";
//					} else {
//						duplFileNames += $(filePreviewId + " input[name='shpFileName" + gShpFileHiddenId + "']:eq(" + dupIdxArr[idx] + ")").val() + "<br>";
//					}
					duplFileNames += $(filePreviewId + " input[name='shpFileName" + gShpFileHiddenId + "']:eq(" + dupIdxArr[idx] + ")").val() + "<br>";
				}
				
				if (isDuplFile == true) {
					var duplMsg = _SharepointFileList_DUPLFILE.replace("{0}", dupIdxArr.length);
					MsgPopup(duplFileNames + "<br>" + duplMsg);
					return;
				} else {
					$(filePreviewId).append(spanStr);
					
					if(gShpFileHiddenId == '')
						$("button#addFeed").css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
					else {
						var subButtonLayout = 'subButtonLayout' + gShpFileHiddenId;
						$("div#" + subButtonLayout).show();
						$("button#addComment" + gShpFileHiddenId).css('cursor','pointer').removeClass('btn-default').addClass('btn-attention');
					}
											
					closeSharepointFilePop();
				}
				
			} else {
				MsgPopup(_SharepointFileList_MSG_NOCHOSENFILEMSG);
			}
		
		}
		
		
		
		function setShpFileNodeInfo(node) {
			$("#shpFileTab tr").remove();
			loadingShpFileTr();
			
			gShpFileSiteId = node.data.SiteId == undefined ? node.data.SiteID : node.data.SiteId;
			gShpFileFolderId = node.data.FolderId == undefined ? node.data.FolderID : node.data.FolderId;
			gShpPageNo = 1;
			gShpFirstItemID = "";
			gShpFirstItemCreated = "";
			gShpPagedPrev = "";
			gShpLastItemID = "";
			gShpLastItemCreated = "";
			gKeyword = "";
			$("#shpPopFind").val("");
			
			
			var param = { "UserID" : _SharepointFileList_USERID
						, "SiteID" : gShpFileSiteId
						, "FolderID" : gShpFileFolderId
						, "PageNo" : gShpPageNo
						, "RowLimit" : gShpRowLimit
						, "FirstItemID" : gShpFirstItemID 
						, "FirstItemCreated" : gShpFirstItemCreated 
						, "PagedPrev" : gShpPagedPrev 
						, "LastItemID" : gShpLastItemID 
						, "LastItemCreated" : gShpLastItemCreated 
					};			
			
			$.ajax({
				  url : contextpath + "/sns/openapi/sharepoint/if_sv_005",
				  contentType	: "application/json",
			      type			: "post",
			      async : false,
			      cache : false,
			      data	: JSON.stringify(param),
			      success: function(data) {
			      	setShpTabTrStrInfo(data);
			      },
			      error: function (jqXHR) {
			    	  MsgPopup(_FEED_Follower_MSG_ERRORDEFAULTMSG);
		          }
			});

		}
		
		function clickShpFileTr(evt, obj) {
			if (evt.target.tagName != undefined && evt.target.tagName.toUpperCase() == "INPUT") {
				return;
			}
			var $chkObj = $(obj).find("td:first input[type='checkbox']");
			$chkObj.prop("checked", !$chkObj.prop("checked"));
		}
		
		function loadingShpFileTr() {
			var trStr =  "<tr class='shpFileLoadingTrTmpClass' style='height:3em;'>";
			trStr += "	<td colSpan='4' style='text-align:center;'><img src='../images/img_feedmore.gif' width='25' height='4' /></td>";
        	trStr += "</tr>"; 
    		if ($('#shpFileTab tr').length > 0) {
				$('#shpFileTab tr:last').after(trStr);
			} else {
				$('#shpFileTab').append(trStr);
			}
		}
		
		function setShpTabTrStrInfo(data) { 
			var dataObj = $.parseJSON(data);
			if (dataObj.FileInfo != null && dataObj.FileInfo.length > 0) {
				var trStr = "";
				var createDt = null;
				var editDt = null;
				
				dataObj.FileInfo.map(function(dataRow, idx) {
					createDt  = dataRow.CreateDT.replace(/-/g, '.');
					editDt  = dataRow.EditDT.replace(/-/g, '.')  
					trStr += '<tr onclick="javascript:clickShpFileTr(event, this);" >';
					trStr += "	<input type='hidden' id='shpDocId' name='shpDocId' value='" + dataRow.DocId + "' />";
					trStr += "	<input type='hidden' id='shpFileName' name='shpFileName' value='" + dataRow.DocName + "' />";
					trStr += "	<input type='hidden' id='shpOwaUrl' name='shpOwaUrl' value='" + dataRow.OWAUrl + "' />";
		    		trStr += '	<td><input id="shpFileChk" name="shpFileChk" type="checkbox" value="" /></td>';
		    		trStr += '	<td className="alignleft">' + dataRow.DocName + '</td>';
		    		trStr += '	<td>' + createDt + '</td>';
		    		trStr += '	<td>' + editDt + '</td>';
		    		trStr += '</tr>';
				});	
				if ($('#shpFileTab tr').length > 0) {
					$('#shpFileTab tr:last').after(trStr);
				} else {
					$('#shpFileTab').append(trStr);
				}
				
				gShpLastItemID = dataObj.LastItemID;
				gShpLastItemCreated = dataObj.LastItemCreated;
				
	    	}
	    	$(".shpFileLoadingTrTmpClass").remove();
		}
		
		
		function goShpFileDataList(keyword) { 
			if (keyword == undefined) {
				++gShpPageNo;
			} else {
				$("#shpFileTab tr").remove();
				gShpPageNo = 1;
				gKeyword = keyword;
				gShpLastItemID = "";
				gShpLastItemCreated = "";
			}
//			gShpFileFolderId = keyword == undefined ? "" : keyword;
			
			var param = { "UserID" : _SharepointFileList_USERID
						, "SiteID" : gShpFileSiteId
						, "FolderID" : gShpFileFolderId
						, "Keyword" : gKeyword
						, "PageNo" : gShpPageNo
						, "RowLimit" : gShpRowLimit
						, "FirstItemID" : gShpFirstItemID 
						, "FirstItemCreated" : gShpFirstItemCreated 
						, "PagedPrev" : gShpPagedPrev 
						, "LastItemID" : gShpLastItemID 
						, "LastItemCreated" : gShpLastItemCreated 
					};			
			
			$.ajax({
				  url : contextpath + "/sns/openapi/sharepoint/if_sv_005",
				  contentType	: "application/json",
			      type			: "post",
			      async : false,
			      cache : false,
			      data	: JSON.stringify(param),
			      success: function(data) {
			    	setShpTabTrStrInfo(data);
			      },
			      error: function (jqXHR) {
			    	  MsgPopup(_FEED_Follower_MSG_ERRORDEFAULTMSG);
		          }
			});
		}
		
		
		

	
