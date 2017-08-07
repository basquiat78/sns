<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title><spring:message code="basic.title" htmlEscape="true" /> (${pageContext.response.locale.language})</title>
	
	<script>var contextpath = '${pageContext.request.contextPath}';</script>
	
	<style type="text/css">
		body {
			margin: 0;
			padding: 0;
			font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
			font-size: 14px;
		}
	
		#script-warning {
			display: none;
			background: #eee;
			border-bottom: 1px solid #ddd;
			padding: 0 10px;
			line-height: 40px;
			text-align: center;
			font-weight: bold;
			font-size: 12px;
			color: red;
		}
	
		#loading {
			display: none;
			position: absolute;
			top: 10px;
			right: 10px;
		}
	
		#calendar {
			max-width: 900px;
			margin: 40px auto;
			padding: 0 10px;
		}
		
    </style>
    <!-- 한화 공통 css -->
    <link href="../css/common.css" rel="stylesheet" type="text/css" />
	<link href="../css/hhsc-gnb.css" rel="stylesheet" type="text/css" />
	<link href="../css/board.css" rel="stylesheet" type="text/css" />
	<!-- 한화 공통 css -->
	
   	<link href="../css/layout.css" rel="stylesheet" type="text/css" />
   	<!-- <link href="../css/scroll.css" rel="stylesheet" type="text/css" /> -->
   	
	<link href="../css/dropzone/dropzone.min.css" rel="stylesheet" type="text/css" />
	<link href="../css/jquery/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />
	<link href="../css/dropzone/filemain.css" rel="stylesheet" type="text/css" />
	<link href="../css/dropzone/filepicker.css" rel="stylesheet" type="text/css" />
    <link href="../css/bpopup/bpopup.css" rel="stylesheet" type="text/css"/>
    <link href="../css/fullcalendar/fullcalendar.css" rel="stylesheet" />
	<link href="../css/fullcalendar/fullcalendar.print.css" rel="stylesheet" media="print" />
	<link href="../css/mentions/jquery.mentions.css" rel="stylesheet" media="print" />
	
    <script src="../js/common/react/react.js"></script>
    <script src="../js/common/react/JSXTransformer.js"></script>
    <script src="../js/common/react/dropzone/dropzone.js"></script>
    <script src="../js/common/react/dropzone/Helpers.js"></script>
    
    <!-- 한화 공통 js -->
    <script type="text/javascript" src="../js/common/jquery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="../js/common/jquery/jquery-ui.min.js"></script>
	<script type="text/javascript" src="../js/common/jquery/jquery.form.js"></script>
	<script type="text/javascript" src="../js/common/jquery/jquery.resize.js"></script>
	<script type="text/javascript" src="../js/common/jquery.gnb.js"></script>
    <!-- 한화 공통 js -->
    
    <script src="../js/common/jquery/jquery.bpopup.min.js"></script>
    <script src="../js/common/underscore/underscore.js"></script>
    <script src="../js/common/jquery/jquery.elastic.js"></script>
    <script src="../js/common/jquery/timeago/jquery.timeago.js"></script>
    <script src="../js/common/mentions/jquery.events.input.js"></script>
    
	<script src="../js/common/fullcalendar/moment.min.js"></script>
	<script src="../js/common/fullcalendar/fullcalendar.js"></script>
    <script src="../js/common/linky/jquery.linky.js"></script>
    <script src="../js/common/util/ajaxutil.js" charset="UTF-8"></script>
	<script src="../js/common/mentions/jquery.mentions.js" charset="UTF-8"></script>
	
    <script src="../js/common/jquery/i18n/datepicker-${pageContext.response.locale.language}.js"></script>
    <script src="../js/common/jquery/timeago/locales/jquery.timeago.${pageContext.response.locale.language}.js"></script>
	<script src='../js/common/fullcalendar/lang/${pageContext.response.locale.language}.js'></script>
	
	<script src="../js/common/unitegallery/js/ug-common-libraries.js"></script>
    <script src="../js/common/unitegallery/js/ug-functions.js"></script>       
    <script src="../js/common/unitegallery/js/ug-thumbsgeneral.js"></script>   
    <script src="../js/common/unitegallery/js/ug-thumbsstrip.js"></script>     
    <script src="../js/common/unitegallery/js/ug-touchthumbs.js"></script>     
    <script src="../js/common/unitegallery/js/ug-panelsbase.js"></script>      
    <script src="../js/common/unitegallery/js/ug-strippanel.js"></script>      
    <script src="../js/common/unitegallery/js/ug-gridpanel.js"></script>       
    <script src="../js/common/unitegallery/js/ug-thumbsgrid.js"></script>      
    <script src="../js/common/unitegallery/js/ug-tiles.js"></script>           
    <script src="../js/common/unitegallery/js/ug-tiledesign.js"></script>      
    <script src="../js/common/unitegallery/js/ug-avia.js"></script>            
    <script src="../js/common/unitegallery/js/ug-slider.js"></script>          
	<script src="../js/common/unitegallery/js/ug-sliderassets.js"></script>    
	<script src="../js/common/unitegallery/js/ug-touchslider.js"></script>     
	<script src="../js/common/unitegallery/js/ug-zoomslider.js"></script>	     
    <script src="../js/common/unitegallery/js/ug-video.js"></script>           
    <script src="../js/common/unitegallery/js/ug-gallery.js"></script>         
	<script src="../js/common/unitegallery/js/ug-lightbox.js"></script>        
  	<script src="../js/common/unitegallery/js/ug-carousel.js"></script>        
    <script src="../js/common/unitegallery/js/ug-api.js"></script>             
	
	
	<link rel="stylesheet" href="../js/common/unitegallery/css/unite-gallery.css" type="text/css" />
	
	<script type="text/javascript" src="../js/common/unitegallery/themes/default/ug-theme-default.js"></script>
	<link rel="stylesheet" href="../js/common/unitegallery/themes/default/ug-theme-default.css" type="text/css" />
	
	
	
	<jsp:include page="../config/MemberConfigTabList.jsp" flush="true"/>
	<jsp:include page="../config/GroupConfigTabList.jsp" flush="true"/>
	<jsp:include page="../feed/FeedFavorite.jsp" flush="true"/>
	<jsp:include page="../integration/IntegrationTabList.jsp" flush="true"/>
	<jsp:include page="../feed/FeedNotice.jsp" flush="true"/>
	<jsp:include page="../feed/FeedApp.jsp" flush="true"/>
	<jsp:include page="../feed/Feed.jsp" flush="true"/>
	
	<%@include file="../systemmng/SystemMngTabList.jsp"%>
	<%@include file="../popup/ConsolePop.jsp"%>
	<%@include file="sidenav/SideNav.jsp"%>
	<%@include file="center/MainContents.jsp"%>
	<%@include file="rightarea/RightArea.jsp"%>
	<%@include file="MultiFileUpload.jsp"%>
	<jsp:include page="../footer/footer.jsp" flush="true"/>
	
	<script type="text/jsx" >
	//통합 페이지 Container
	var Container = React.createClass({
		componentDidMount: function() {
			React.render(<SideNav/>, document.getElementById('SideNav'));
			React.render(<MainContents/>, document.getElementById('MainContents'));
			React.render(<RightContentArea/>, document.getElementById('RightContentArea'));
		},

		componentWillUnmount: function() {
			React.unmountComponentAtNode(document.getElementById('SideNav'));
			React.unmountComponentAtNode(document.getElementById('MainContents'));
			React.unmountComponentAtNode(document.getElementById('RightContentArea'));
		},

		render: function() {
	    	return (
				<div className='lay-container-wrap' style={{'height':'1300px'}}>
					<div id='SideNav'></div>
					<div className='lay-content lay-static-content'>
            			<div className='lay-col1' id='div_lay_col1'>
            				<div className='lay-contents-area lay-contents-margin'>
								<div id='MainContents' style={{'borderTop':'0'}}></div>
							</div>
						</div>

						<div className='lay-col2' id='div_lay_col2'>
							<div id='RightContentArea' className='rightarea_wrap'></div>
            			</div>
					</div>
				</div>
			);
		}
	});
	</script>
	
	<script type="text/jsx" >
	//통합 페이지 상당
	var HomeSNS = React.createClass({
		componentDidMount: function() {
			React.render(<Container/>, document.getElementById('Container'));
		},

		componentWillUnmount: function() {
			React.unmountComponentAtNode(document.getElementById('Container'));
		},

		render: function() {
	    	return (<div id='Container'></div>);
		}
	});
	
	$( document ).ready(function() {
		React.render(<HomeSNS/>, document.getElementById('WholeScreen'));
	});
	</script>	
		
		
	<script>
		function abc(){
			var jsondata = {
						"feedId"		: '3378',
	    	    		"approvalStatus"			: 'APPROVAL',
	    	    		"feedMemberSyncKey"		: 'jaeyun',
	    	    		"approvalComment"		: '111111'
	    	};
			
			ajaxAdd('/feeds/interface/approval/complete', jsondata, '');
		}
	</script>
	
</head>
	
<body onclick="eventLayoutControll();">
	<% org.uengine.sns.feed.FeedRestful frfFollower = new  org.uengine.sns.feed.FeedRestful();%>
	<% org.uengine.sns.group.GroupRestful grfFollower = new org.uengine.sns.group.GroupRestful(); %>
	<div class="lay-wrap">
		<jsp:include page="../header/GNB.jsp" flush="true"/>
		<script type="text/jsx">
		var MaidInput = React.createClass({

			/* componentWillReceiveProps: function (nextProps) {
				if(nextProps.dropFollower.length>0) {
					var selectedFollower = this.state.selectedFollower;	
					var dropFollower = nextProps.dropFollower[0];
					var duplictedUser = false;
					for(var i=0; i<selectedFollower.length; i++) {
						if(selectedFollower[i].id == dropFollower.id) {
							duplictedUser = true;
							break;
						}
					}
					if(!duplictedUser) {
						this.state.selectedFollower = this.state.selectedFollower.concat(dropFollower);
						this.selectHandler(dropFollower);
					}
				}
  			}, */

			selectHandler: function(maid) {
					this.props.selectFollower(maid);
					this.refs.maid.getDOMNode().value ='';

			},

			getInitialState: function() {

          		return {cache: [], selectedFollower:[], writtenfeedFollower:[]};

        	},

			componentDidMount: function() {

				var self = this;
				var initJson = function(request, response) {
					var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
					if(self.state.cache.length>0) {
						var initArray = self.state.cache.error ? [] : $.map(self.state.cache, function(m) {
							var searchKey = m.followerName;
							if( searchKey && ( !request.term || matcher.test(searchKey) ) ) {
									return {
											label : m.followerName,
											value : m.followerName,
											id	  : m.followerId,
											email : m.followerEmail,
											type  : m.followerType,
											pic   : m.followerImgUrl
									};
							}
						});

						if(request.term.length>0) {
							var setValue = "";
							if(request.term.indexOf("@")>-1){
								setValue = request.term;
							} else {
								setValue = request.term + "@hanwha.com";
							}
					
							other = {
									label : setValue,
									value : setValue,
									id    : 0,
									email : setValue,
									type  : 'MEMBER',
									pic   : ''
								
									}

							initArray.push(other);

						}
					
						var finalArray = [];
						initArray.forEach(function(item){
							if(item.type === 'GROUP') {
								var hasGroup = 'false';
								self.state.selectedFollower.forEach(function(follower){
									if(follower.type === 'GROUP') {
										hasGroup = 'true';
									}
								});

								if(hasGroup === 'false') {
									finalArray.push(item);
								}
							} else if(item.type === 'MEMBER') {
								var isDuplicated = 'false';
								self.state.selectedFollower.forEach(function(follower){
									if(follower.type==='MEMBER' && follower.id === item.id && follower.id != 0) {
										isDuplicated = 'true';
									}
								});

								if(isDuplicated === 'false') {
									finalArray.push(item);
								}

							}
						});

						response(finalArray);

					} else {
						$.getJSON(contextpath + "<%= frfFollower.BASE_AUTO_FOLLOWER%>", 
							function(json) {
								self.setState({cache: json});
								var array = json.error ? [] : $.map(json, function(m) {
									var searchKey = m.followerName;
									if ( searchKey && ( !request.term || matcher.test(searchKey) ) ) {
										return {
											label : m.followerName,
											value : m.followerName,
											id	  :	m.followerId,
											email : m.followerEmail,
											type  : m.followerType,
											pic   : m.followerImgUrl
										};
									}
								
								});
						
								response(array);
							});
						}
					} 

        		$(".maid_add_input").autocomplete({
      			  	minLength: 2,
    		    	source: initJson,
    		    	select: function (event, ui) {
       		        	event.preventDefault();
    		        	this.value = ui.item.value;
						self.selectHandler(ui.item);
            		},
        		}).focus(function(){            
       	 			$(this).autocomplete("search");
        		}).data('ui-autocomplete')._renderItem = function (ul, item) {
          				var $a = $("<a></a>");
					$("<img style='height:15px;width:15px' src='"+item.pic+"'/>").appendTo($a);
					$("<span class='m-id'></span>").text(item.label).appendTo($a);
					return $("<li></li>").append($a).appendTo(ul);
           		};

			},

			render: function() {

				this.state.selectedFollower = this.props.fList;

				return(
						<dd className='none_attribute'>
							<input type='text' placeholder='인풋 테스트입니다.' className='maid_add_input ignore' ref='maid'/>
						</dd>
				);
			}

		});
		
		var MaidList = React.createClass({

			removeHandler: function(follower) {

				this.props.removeFollower(follower);

			},		

			selectHandler: function(follower) {

				this.props.selectFollower(follower);

			},	

			focuson: function() {

				$('.maid_add_input').focus();

			},

			render: function() {
				var followers = [];
				var that = this; //because react Object Confliction
				this.props.fList.forEach(function(follower) {
					if(follower.type === 'GROUP') {
						var key = 'maid'+follower.type+follower.id;
    	   				followers.push(<Maid key={key} follower={follower} removeEvent={that.removeHandler}/>);
					}
        		});

				this.props.fList.forEach(function(follower) {
					if(follower.type === 'MEMBER') {
						var key = 'follower'+follower.type+follower.id;
           				followers.push(<Maid key={key} follower={follower} removeEvent={that.removeHandler}/>);
					}
        		});

				return (
						<dl onClick={this.focuson}>
							{followers}
							<MaidInput fList={this.props.fList} 
										   writtenfeedFollower={this.props.writtenfeedFollower} 
										   selectFollower={this.selectHandler}
										   dropFollower={this.props.dropFollower}
							/>
						</dl>
						);
			}

		});
		
				var Maid  = React.createClass({

					removed: function() {

						this.props.removeEvent(this.props.follower);

					},

					render: function() {
						var style;
						var src;
						if(this.props.follower.type==='GROUP') { 
							src = '../images/icon_lock.png';
						} else {
							style= {
									'display':'none'
									};
						}

						return(
								<dd className='lock_group'>
									<span><img src={src} width='9' height='11' style={style}/></span>
								   	{this.props.follower.label}
									<span className='space_left'><img src='../images/icon_delete.png' width='8' height='8' onClick={this.removed}/></span>
								</dd>
							);
					}

				});
				
				var MaidApp = React.createClass({

					selectFollower: function(follower) {
						var followerList = this.state.followerList;
						var isDup = false;
						for(var i=0; i<followerList.length; i++){
							if(followerList[i].id === follower.id && follower.type==='MEMBER') {
								isDup = true;
								break;
							}
						}
						if(!isDup) {
							followerList.push(follower);
							//if(this.props.fromFollowerInputSetting !==undefined) {			
							//	this.props.fromFollowerInputSetting(follower);
							//}

							followerList = followerList.concat(follower);
						}
						this.setState({followerList: followerList});
					},

					removeFollower: function(follower) {
						var index = -1;	
		       			var followerLength = this.state.followerList.length;
		    			for(var i = 0; i < followerLength; i++ ) {
		    				if(this.state.followerList[i].id === follower.id ) {
		    					index = i;
		    					break;
		    				}
		    			}

		    			this.state.followerList.splice(index, 1);	
		    			this.setState( {followerList: this.state.followerList} );

					},
						
					getInitialState: function() {

		       			return {followerList: [], dropFollower:[], droppedFollowerList:[]};

		       		},

					componentDidMount: function() {
						var self = this;
						
					},

					render: function() {
						this.state.followerList = this.props.writtenFollowerList;
						//this.props.followerHandler(this.state.followerList);
						if(this.props.ftype == 'normal'){
							return (
			        	    	<div className='notice_target mainDrop-area'>
									<MaidList writtenfeedFollower={this.props.writtenfeedFollower} 
												  fList={this.state.followerList} 
												  removeFollower={this.removeFollower} 
												  selectFollower={this.selectFollower}
												  dropFollower={this.state.dropFollower}	
									/>
			        	      	</div>
				        	    );
						}else{
							return (
			        	    	<div className='notice_target mainDrop-area'>
									<MaidList writtenfeedFollower={this.props.writtenfeedFollower} 
												  fList={this.state.followerList} 
												  removeFollower={this.removeFollower} 
												  selectFollower={this.selectFollower}
												  dropFollower={this.state.dropFollower}
									/>
			        	      	</div>
				        	);
						}
			        }
				});
				
				React.render(<MaidApp fromFollowerInputSetting={[]} writtenFollowerList={[]} fromFollowrSetting={[]}  followerHandler={[]}/>, document.getElementById('dummyContainer'));
				
		</script>
		<div id="dummyContainer"></div>
		<div class="lay-container" id="WholeScreen"></div>
	</div>
</body>
</html>