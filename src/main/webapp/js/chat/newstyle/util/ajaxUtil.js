	function ajaxPOST(url, jsonData, callback, option) {
		$.ajax({
			url					: url,
		    type				: "POST",
		    contentType		: "application/json",
		    async				: false,
		    data				: JSON.stringify(jsonData),
		    success: function(data) {
		    	if(option != null) {
		    		callback(data, option);
		    	} else {
		    		callback(data);
		    	}
		    },
		    error: function (jqXHR, textStatus, errorThrown) {
		  	  console.log(errorThrown);
		    }
		});
	}

	function ajaxGET(url, value, callback, option){
		var nowDate = new Date();
		var callUrl = url.indexOf('?') < 0 ? url + '?tempStr=' + nowDate.getTime() : url + '&tempStr=' + nowDate.getTime();
		$.ajax({
		      url			: callUrl,
		      type			: "GET",
		      async		: false,
		      data			: value,
		      success: function(data) {
		    	  if(option != null) {
		    		  callback(data, option);
		    	  } else {
		    		  callback(data);
		    	  }
		      },
		      error: function (jqXHR, textStatus, errorThrown) {
		    	  console.log(errorThrown);
	          }
		});
	}
	
	function ajaxGETByData(url, jsonData, callback, option){
		var nowDate = new Date();
		var callUrl = url.indexOf('?') < 0 ? url + '?tempStr=' + nowDate.getTime() : url + '&tempStr=' + nowDate.getTime();
		$.ajax({
		      url					: callUrl,
		      type					: "GET",
		      contentType		: "application/json",
		      async				: false,
		      data					: JSON.stringify(jsonData),
		      success: function(data) {
		    	  if(option != null) {
		    		  callback(data, option);
		    	  } else {
		    		  callback(data);
		    	  }
		      },
		      error: function (jqXHR, textStatus, errorThrown) {
		    	  console.log(errorThrown);
	          }
		});
	}
	
	function ajaxUPDATEById(baseurl, value, callback, option){
		$.ajax({
		      url			: baseurl,
		      type			: "PUT",
		      data			: value,
		      async		: false,
		      success: function(data) {
		    	  if(option != null) {
		    		  callback(data, option);
		    	  } else {
		    		  callback(data);
		    	  }
		      },
		      error: function (jqXHR, textStatus, errorThrown) {
		    	  console.log(errorThrown);
	          }
		});
	}
	
	function ajaxUPDATEByData(url, jsonData, callback, option){
		$.ajax({
		      url					: url,
		      type					: "PUT",
		      contentType		: "application/json",
		      data					: JSON.stringify(jsonData),
		      async				: false,
		      success: function(data) {
		    	  if(option != null) {
		    		  callback(data, option);
		    	  } else {
		    		  callback(data);
		    	  }
		      },
		      error: function (jqXHR, textStatus, errorThrown) {
		    	  console.log(errorThrown);
	          }
		});
	}
	
	function ajaxDELETEById(baseurl, value, callback, option){
		$.ajax({
		      url			: baseurl,
		      type			: "DELETE",
		      data			: value,
		      async		: false,
		      success: function(data) {
		    	  if(option != null) {
		    		  callback(data, option);
		    	  } else {
		    		  callback(data);
		    	  }
		      },
		      error: function (jqXHR, textStatus, errorThrown) {
		    	  console.log(errorThrown);
	          }
		});
	}
	
	function ajaxDELETEByData(url, jsonData, callback, option){
		$.ajax({
		      url					: url,
		      type					: "DELETE",
		      contentType		: "application/json",
		      data					: JSON.stringify(jsonData),
		      async				: false,
		      success: function(data) {
		    	  if(option != null) {
		    		  callback(data, option);
		    	  } else {
		    		  callback(data);
		    	  }
		      },
		      error: function (jqXHR, textStatus, errorThrown) {
		    	  console.log(errorThrown);
	          }
		});
	}
//
//function ajaxGetNoCall(baseurl, data){
//	var nowDate = new Date();
//	var x = false;
//	var callUrl = baseurl.indexOf('?') < 0 ? baseurl + '?tempStr=' + nowDate.getTime() : baseurl + '&tempStr=' + nowDate.getTime();
//	$.ajax({
//	      url			: callUrl,
//	      type			: "get",
//	      data			: data,
//	      async			: false,
//	      success: function(data) {
//	          x = true;
//	      },
//	      error: function (jqXHR, textStatus, errorThrown) {
//	    	  //callback(data);	// 에러시 빈 값으로 초기화
//	    	  errorAjax(jqXHR, textStatus, errorThrown);
//	    	  x = false;
//          }
//	});
//	
//	return x;
//}
//
//// get이지만 객체로 넘겨야 하는 경우
//function ajaxPost(baseurl, jsondata, callback){
//	$.ajax({
//	      url			: baseurl,
//	      type			: "post",
//	      contentType	: "application/json",
//	      data			: JSON.stringify(jsondata),
//	      
//	      success: function(data) {
//	          if(callback == ''){
//	        	  MsgPop("수정되었습니다.");
//	          }else {
//	        	  callback(data);
//	          }
//	      },
//	      error: function (jqXHR, textStatus, errorThrown) {
//	    	  errorAjax(jqXHR, textStatus, errorThrown);
//          }
//	});
//}
//
//function ajaxAdd(baseurl, jsondata, callback){
//	$.ajax({
//	      url			: baseurl,
//	      method		: "post",
//	      type			: "json",
//	      contentType	: "application/json",
//	      data			: JSON.stringify(jsondata),
//	      async			: false,
//	      
//	      success: function(data) {
//	          if(callback == ''){
//	        	  MsgPop("등록되었습니다.");
//	          }else {
//	        	  callback(data);
//	          }
//	      },
//	      error: function (jqXHR, textStatus, errorThrown) {
//	    	  errorAjax(jqXHR, textStatus, errorThrown);
//          }
//	});
//}
//
//
//function ajaxDelById(baseurl, id, callback){
//	$.ajax({
//	      url			: baseurl + "/" + id,
//	      method		: "delete",
//	      type			: "json",
//	      contentType	: "application/json",
//	      async			: false,
//	      
//	      success: function(data) {
//	          if(callback == ''){
//	        	  MsgPop("삭제되었습니다.");
//	          }else {
//	        	  callback(data);
//	          }
//	      },
//	      error: function (jqXHR, textStatus, errorThrown) {
//	    	  errorAjax(jqXHR, textStatus, errorThrown);
//          }
//  	});
//}
//
//function ajaxDelByJson(baseurl, jsondata, callback){
//	$.ajax({
//		  url			: baseurl,
//	      method		: "DELETE",
//	      type			: "json",
//	      contentType	: "application/json",
//	      data			: JSON.stringify(jsondata),
//	      async			: false,
//	      
//	      success: function(data) {
//	          if(callback == ''){
//	        	  MsgPop("등록되었습니다.");
//	          }else {
//	        	  callback(data);
//	          }
//	      },
//	      error: function (jqXHR, textStatus, errorThrown) {
//	    	  errorAjax(jqXHR, textStatus, errorThrown);
//        }
//	});
//}
//
//function ajaxGetForSync(baseurl, data, callback, option){
//	$.ajax({
//	      url			: baseurl,
//	      type			: "get",
//	      data			: data,
//	      async			: false,
//	      success: function(data) {
//	          if(callback == ''){
//	        	  MsgPop("수정되었습니다.");
//	          }else {
//	        	  callback(data, option);
//	          }
//	      },
//	      error: function (jqXHR, textStatus, errorThrown) {
//	    	  errorAjax(jqXHR, textStatus, errorThrown);
//          }
//	});
//}
//
//function errorAjax(jqXHR, textStatus, errorThrown) {
//	  if(jqXHR.status == 500) {
//    	  MsgPopup("관리자에게 문의하세요.(HTTP code : 500)");
//	  } else if(jqXHR.status == 401) {
//		  window.location.href = "/";
//	  } else {
//		  var resText = '';
//		  try {
//			  resText = jQuery.parseJSON(jqXHR.responseText).msg;
//		  } catch(e) {
//			  resText = '관리자에게 문의하세요. (HTTP code : ' + jqXHR.status + ')';
//		  }
//		  MsgPopup(resText);
//	  }
//}