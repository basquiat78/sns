/**
 * 
 */

var _lengthInUtf8Bytes = function(str) {
	var m = encodeURIComponent(str).match(/%[89ABab]/g);
		return str.length + (m ? m.length : 0);
};

var _getLengthCheckCommand = function(x) {
	var self = this;
	var maxLimit = 4000;
	
	if(x.parent().find(".cntBox").length == 0) {
		x.before('<span class="cntBox" style="display:none;"></span>');
	}
	
	x.bind('input keyup paste', function(e){
		
		var countField = $(this).parent().find(".cntBox");
		var temp_str = $(this).val();
		var inputTextLength = self._lengthInUtf8Bytes(temp_str);
		countField.html(maxLimit - inputTextLength);
		if(countField.html() * 1 <= 0) {
			temp_str = temp_str.substring(0, temp_str.length-(countField.html() * -1));
				$(this).val(temp_str);
				$(this).next().val(temp_str);
			countField.html(maxLimit - self._lengthInUtf8Bytes(temp_str));
		}
		
		
	});
};

var mozillaForceKeyup = function(targetId) {
	var isIntervalRunning, target;
	if (jQuery.browser.mozilla) {
		isIntervalRunning = null;
		target = '#' + targetId;
		$(target).bind('keydown', function(e) {
		var forceKeyup;
		if (e.which === 229) {
		forceKeyup = function() {
		return $(target).trigger('keyup');
		};
		if (!isIntervalRunning) {
		return isIntervalRunning = setInterval(forceKeyup, 100);
		}
		}
		});
		return $(target).bind('blur', function(e) {
		if (isIntervalRunning) {
		clearInterval(isIntervalRunning);
		return isIntervalRunning = null;
		}
		});
	}
};

function ShowSelection(id)
{
  var textComponent = document.getElementById(id);
  var selectedText;
  // IE version
  if (document.selection != undefined)
  {
    textComponent.focus();
    var sel = document.selection.createRange();
    selectedText = sel.text;
  }
  // Mozilla version
  else if (textComponent.selectionStart != undefined)
  {
    var startPos = textComponent.selectionStart;
    var endPos = textComponent.selectionEnd;
    selectedText = textComponent.value.substring(startPos, endPos)
  }
  alert("You selected: " + selectedText);
}

function getCaret(el) { 
	  if (el.selectionStart) { 
	    return el.selectionStart; 
	  } else if (document.selection) { 
	    el.focus(); 

	    var r = document.selection.createRange(); 
	    if (r == null) { 
	      return 0; 
	    } 

	    var re = el.createTextRange(), 
	        rc = re.duplicate(); 
	    re.moveToBookmark(r.getBookmark()); 
	    rc.setEndPoint('EndToStart', re); 

	    return rc.text.length; 
	  }  
	  return 0; 
	}

function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

function GetIEVersion() {
	  var sAgent = window.navigator.userAgent;
	  var Idx = sAgent.indexOf("MSIE");

	  // If IE, return version number.
	  if (Idx > 0) 
	    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

	  // If IE 11 then look for Updated user agent string.
	  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
	    return 11;

	  else
	    return 0; //It is not IE
}

var matched, browser;

jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};

if ( !jQuery.browser ) {
	matched = jQuery.uaMatch( navigator.userAgent );
	browser = {};
	
	if ( matched.browser ) {
	    browser[ matched.browser ] = true;
	    browser.version = matched.version;
	}
	
	// Chrome is Webkit, but Webkit is also Safari.
	if ( browser.chrome ) {
	    browser.webkit = true;
	} else if ( browser.webkit ) {
	    browser.safari = true;
	}
	
	if(navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
	     //If so, then this is Internet Explorer
		browser.ie = true;
	}
	
	jQuery.browser = browser;
}

function leadingZeros (n, digits) {
	var zero = '';
    n = n.toString();
    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

function strip(html)
{
	var tmp = document.createElement("DIV");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText;
}

function stripHTML(dirtyString) {
	  var container = document.createElement('div');
	  var text = document.createTextNode(dirtyString);
	  container.appendChild(text);
	  return container.innerHTML; // innerHTML will be a xss safe string
	}

function isValidDate(s) {
	  var bits = s.split('-');
	  var d = new Date(bits[0] + '/' + bits[1] + '/' + bits[2]);
	  return !!(d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[2]));
	}