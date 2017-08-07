/*
1. �⑦궎吏� �좎뼵 愿���
- �ㅻⅨ 怨녹뿉�� 以묐났 �좎뼵�쒖뿉�� 臾몄젣媛� �녿룄濡�  typeof 泥댄궧�� �� �� �좎뼵�⑸땲��.

2. �곸닔 愿���
- 媛앹껜 �앹꽦 �놁씠 �ъ슜�� �� �덈룄濡� json �앺깭濡� �뺤쓽 �⑸땲��. 
- �⑦궎吏� 援щ텇�� �섎릺 吏㏃� �ㅼ엫�ㅽ럹�댁뒪瑜� 媛�吏� �� �덈룄濡� alias瑜� �뺤쓽�⑸땲��.

3. 怨듯넻 �좏떥由ы떚 �뺤쓽
- 媛앹껜 �앹꽦 �놁씠 �ъ슜�� �� �덈룄濡� json �앺깭濡� �뺤쓽�⑸땲��.
- �⑦궎吏� 援щ텇�� �섎릺 吏㏃� �ㅼ엫�ㅽ럹�댁뒪瑜� 媛�吏� �� �덈룄濡� alias瑜� �뺤쓽�⑸땲��.
*/

/* 釉뚮씪�곗� �댁옣 媛앹껜�� ����  prototype �뺤옣 */
String.prototype.trim = function() {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

// MERGE DATE : 2013-01-15
// MERGE WORKER : gw012
// MERGE DESCRIPTION : 硫붿꽌�� 異붽� 
Array.prototype.remove = function(name, value) { 
    var rest = $.grep(this, function(item){    
        return (item[name] !== value);
    });

    this.length = 0;
    this.push.apply(this, rest);
    return this;
};

/* �⑦궎吏� �좎뼵 */
if (typeof hanwha == "undefined") {
   function hanwha(){}
}
if (typeof hanwha.ewt == "undefined") {
   hanwha.ewt = function(){}
}
if (typeof hanwha.ewt.commons == "undefined") {
   hanwha.ewt.commons = function(){}
}

/* 怨듯넻 �좏떥由ы떚 �뺤쓽 */
hanwha.ewt.commons.Utils = Util = {
	isNull : function(strVal) {
		return ( ( strVal == null )
			|| ( strVal == "undefined" )
			|| ( strVal == "null" )
			|| ( strVal == "[]" )
			|| ( strVal.trim() == "" ) );
	},
	escapeFileName: function(name) {
		return name
			.replace(/['']/gi, "��")
			.replace(/[""]/gi, "��")
			.replace(/[&]/gi, "竊�")
			.replace(/[<]/gi, "竊�")
			.replace(/[>]/gi, "竊�")
			.replace(/[*]/gi, "竊�")
			.replace(/[:]/gi, "竊�")
			.replace(/[|]/gi, "�")
			.replace(/[\\]/gi, "占�")
			.replace(/[/]/gi, "竊�")
			.replace(/[?]/gi, "竊�")
			.replace(/[#]/gi, "竊�");
	},
	escapeScript: function(text) {
		return text
			.replace(/[<]/gi, "&lt;")
			.replace(/[>]/gi, "&gt;")
			.replace(/[(]/gi, "&#40;")
			.replace(/[)]/gi, "&#41;")
			.replace(/[#]/gi, "&#35;")
			.replace(/[&]/gi, "&#38;");
	},
	escapeScriptForPersonalInfo: function(text) { // 臾몄옄�댁뿉 <, >, #, & 媛� �덈뒗吏� 泥댄겕�섏뿬 寃곌낵 由ы꽩
		if(text.indexOf("<") != -1
			|| text.indexOf(">") != -1 
			|| text.indexOf("&") != -1 
			|| text.indexOf("#") != -1){
			return false;
		}
		return true;
	},
	password:function(input) {
		return this.Base64Encoding(input);
	},
	Base64Encoding: function(input) {
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        //input = Base64._utf8_encode(input);
        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } 
            else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + 
			  _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			  _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;		
	},
	Base64Decoding: function(input) {
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        //output = Base64._utf8_decode(output);
        return output;
	}
	
}

/* 怨듯넻 XML �좏떥由ы떚 �뺤쓽 */
if (window.DOMParser &&
	window.XMLSerializer &&
	window.Node && Node.prototype && Node.prototype.__defineGetter__) {

	Document.prototype.loadXML = function (s) {

		// parse the string to a new doc
		var doc2 = (new DOMParser()).parseFromString(s, "text/xml");

		// remove all initial children
		while (this.hasChildNodes())
			this.removeChild(this.lastChild);

		// insert and import nodes
		for (var i = 0; i < doc2.childNodes.length; i++) {
			this.appendChild(this.importNode(doc2.childNodes[i], true));
		}
	};

	Document.prototype.__defineGetter__("xml", function () {
		return (new XMLSerializer()).serializeToString(this);
	});
	
	Element.prototype.__defineGetter__("xml", function () {
		return (new XMLSerializer()).serializeToString(this);
	});
}
hanwha.ewt.commons.XMLUtils = XMLUtil = {

	/**
	 * @function
	 *    createXML() { return object }
	 * @brief
	 *    Dom 媛앹껜瑜� �몄텧�쒕떎.
	 * @usage
	 *    xmlDocument = XMLUtil.createXML();
	 */
	createXML : function() {
	// MERGE DATE : 2013-01-15
	// MERGE WORKER : gw012
	// MERGE DESCRIPTION : 湲곗〈 �댁슜 二쇱꽍 泥섎━ 諛� �좉퇋 �댁슜 異붽�
	/*
	if (document.implementation && document.implementation.createDocument) {
		xmlDoc = document.implementation.createDocument("","",null);
	}
	// Internet Explorer
	else if (typeof ActiveXObject != "undefined") {
		try {
			xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
		} catch (e) {
			xmlDoc = new ActiveXObject("Msxml.DOMDocument");
		}
	}
	*/
	
	// Internet Explorer
	if ($.browser.msie) {
		try {
			xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
		} catch (e) {
			xmlDoc = new ActiveXObject("Msxml.DOMDocument");
		}
	} else if (document.implementation && document.implementation.createDocument) {
		xmlDoc = document.implementation.createDocument("","",null);
	}

		return xmlDoc;
	},
	/**
	 * @function
	 *    loadXMLDoc(string) { return object }
	 * @brief
	 *    XML �뚯씪濡� 遺��� DOM 媛앹껜瑜� �앹꽦�쒕떎.
	 * @usage
	 *    xmlDocument = XMLUtil.loadXMLDoc("http://w3schools.com/dom/books.xml");
	 *     or
	 *    xmlDocument = XMLUtil.loadXMLDoc("./books.xml");
	 */
	loadXMLDoc : function(dname) {
		if (window.XMLHttpRequest) {
			xhttp = new XMLHttpRequest();
		}
		// Internet Explorer 5/6
		else {
			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.open("GET", dname, false);
		xhttp.send("");

		return xhttp.responseXML;
	},
	/**
	 * @function
	 *    loadXMLString(string) { return object }
	 * @brief
	 *    XML 臾몄옄�대줈遺��� DOM 媛앹껜瑜� �앹꽦�쒕떎.
	 * @usage
	 *    text = "<bookstore><book>name</book></bookstore>";
	 *    xmlDocument = XMLUtil.loadXMLString(text);
	 */
	loadXMLString : function(text) {
		// MERGE DATE : 2013-01-15
		// MERGE WORKER : gw012
		// MERGE DESCRIPTION : 湲곗〈 �댁슜 二쇱꽍 泥섎━ 諛� �좉퇋 �댁슜 異붽�
		/*
		if (window.DOMParser) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(text, "text/xml");
		}
		// Internet Explorer
		else {
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
			xmlDoc.loadXML(text);
		}
		*/
		if ( $.browser.msie ) {
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
			xmlDoc.loadXML(text);
		} else if (window.DOMParser) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(text, "text/xml");
		}
		return xmlDoc;
	},
	/**
	 * @function
	 *    selectNodes(obj, obj, string) { return string }
	 * @brief
	 *    XPath �쒗쁽�앹쓣 �댁슜�섏뿬, XML �몃뱶瑜� 寃��됲빀�덈떎.
	 * @usage
	 *    targetNode = XMLUtil.selectNodes(xmlDocument, rootElement, "//flow[@id='0']");
	 * 寃��됰맂 �몃뱶 異붿텧 諛⑸쾿 1 - IE
	 *	for (i=0;i<xmlNode.length;i++){				
	 *		alert("xmlNode = "+ xmlNode[i].xml);
	 *	}
	 * 寃��됰맂 �몃뱶 異붿텧 諛⑸쾿 2 - 湲고� 釉뚮씪�곗�
	 *	for ( var i=0 ; i < xmlNode.snapshotLength; i++ ){
  	 *		alert( xmlNode.snapshotItem(i).textContent );
	 *	}
	 */
	selectNodes : function(xml, xmlDoc, elementPath) {
		// MERGE DATE : 2013-01-15
		// MERGE WORKER : gw012
		// MERGE DESCRIPTION : 湲곗〈 �댁슜 二쇱꽍 泥섎━ 諛� �좉퇋 �댁슜 異붽�
		/*
		if (document.implementation && document.implementation.createDocument) {
			var xpe = new XPathEvaluator();
            var nsResolver = xpe.createNSResolver( xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
			xmlNode = xpe.evaluate(elementPath, xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);			
		}
		// Internet Explorer
		else if (typeof ActiveXObject != "undefined") {
			xmlNode = xmlDoc.selectNodes(elementPath);
		}
		*/
		
		// Internet Explorer
//		if (typeof ActiveXObject != "undefined") {
/*		if (window.ActiveXObject || "ActiveXObject" in window) {
			xmlNode = xmlDoc.selectNodes(elementPath);
		} else if (document.implementation && document.implementation.createDocument) {
			var xpe = new XPathEvaluator();
            var nsResolver = xpe.createNSResolver( xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
			xmlNode = xpe.evaluate(elementPath, xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);			
		}
*/		
//		if (window.DOMParser) {
		if (!$.browser.msie) {
			xmlNode = xmlDoc.evaluate(elementPath, xmlDoc, null, XPathResult.ANY_TYPE, null);
		} else {
			xmlNode =  xmlDoc.selectNodes(elementPath); 
		}
		
		return xmlNode;
	},
	/**
	 * @function
	 *    selectSingleNode(obj, obj, string) { return string }
	 * @brief
	 *    XPath �쒗쁽�앹쓣 �댁슜�섏뿬, XML �몃뱶瑜� 寃��됲빀�덈떎.
	 * @usage
	 *    targetNode = XMLUtil.selectSingleNode(xmlDocument, rootElement, "//flow[@id='0']");
	 */
	selectSingleNode : function(xml, xmlDoc, elementPath) {
		// MERGE DATE : 2013-01-15
		// MERGE WORKER : gw012
		// MERGE DESCRIPTION : 湲곗〈 �댁슜 二쇱꽍 泥섎━ 諛� �좉퇋 �댁슜 異붽�
		/*
		if (document.implementation && document.implementation.createDocument) {
			var xpe = new XPathEvaluator();
            var nsResolver = xpe.createNSResolver( xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
            var results = xpe.evaluate(elementPath,xmlDoc,nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            xmlNode =  results.singleNodeValue; 
		}
		// Internet Explorer
		else if (typeof ActiveXObject != "undefined") {
			xmlNode = xmlDoc.selectSingleNode(elementPath);
		}
		*/
		
		// Internet Explorer
//		if (typeof ActiveXObject != "undefined") {
/*		if (window.ActiveXObject || "ActiveXObject" in window) {
			xmlNode = xmlDoc.selectSingleNode(elementPath);
		} else if (document.implementation && document.implementation.createDocument) {
			var xpe = new XPathEvaluator();
            var nsResolver = xpe.createNSResolver( xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
            var results = xpe.evaluate(elementPath,xmlDoc,nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            xmlNode =  results.singleNodeValue; 
		}

		return xmlNode;
		*/
		
		if (!$.browser.msie) {
	        var nodes = xmlDoc.evaluate(elementPath, xmlDoc, null, XPathResult.ANY_TYPE, null);
	        var results = nodes.iterateNext();
	        return results;
	    } else {
	        return xmlDoc.selectSingleNode(elementPath); 
	    }
	    
		//return xmlDoc.selectSingleNode(elementPath);

	},
	/**
	 * @function
	 *    toXML(obj) { return string }
	 * @brief
	 *    XML �댁슜�� 異쒕젰�섍린 �꾪빐 XML 臾몄옄�댁쓣 �쎌뼱�⑤떎.
	 * @usage
	 *    alert(XMLUtil.toXML(xmlDocument));
	 *     or
	 *    alert(XMLUtil.toXML(rootElement));
	 */
	toXML : function(obj) {
		// MERGE DATE : 2013-01-15
		// MERGE WORKER : gw012
		// MERGE DESCRIPTION : 湲곗〈 �댁슜 二쇱꽍 泥섎━ 諛� �좉퇋 �댁슜 異붽�
		/*
		if (document.implementation && document.implementation.createDocument) {
			text = (new XMLSerializer()).serializeToString(obj);
		}
		// Internet Explorer
		else if (typeof ActiveXObject != "undefined") {
			text = obj.xml;
		}
		*/
		
		// Internet Explorer
//		if (typeof ActiveXObject != "undefined") {
		if (window.ActiveXObject || "ActiveXObject" in window) {
			text = obj.xml;
		} else if (document.implementation && document.implementation.createDocument) {
			text = (new XMLSerializer()).serializeToString(obj);
		}
		return text;
	}
	
}

/* 
怨듯넻 �먮즺援ъ“ �뺤쓽

---------------------
ArrayList �ъ슜 ��
---------------------

var list = new ArrayList();
list.add("k");
list.add(3);

for(var i=0; i<list.size(); i++) {
	alert( list.get(i) );
}

for(var i=list.iterator(); i.hasNext(); ) {
	alert( i.next() );
}

alert( list.toJSON() );

list.remove(0);

for(var i=0; i<list.size(); i++) {
	alert( list.get(i) );
}


---------------------
Hashtable �ъ슜 ��
---------------------

var h = new HashMap();
h.put("k", "dddd");
h.put(3, 4444);

alert( h.get("k") );

for(var i=h.keyIterator(); i.hasNext(); ) {
	var key = i.next();
	var value = h.get(key);
	alert( "key:" + key + ",value : " + value );
}

alert( h.toJSON() );

h.remove("k");

for(var i=h.keyIterator(); i.hasNext(); ) {
	var key = i.next();
	var value = h.get(key);
	alert( "key:" + key + ",value : " + value );
}

*/


/* ArrayList */
function ArrayList() {
	this.array = new Array();
}
ArrayList.prototype = {
	add : function(obj) {
		this.array[this.array.length] = obj;
	},
	size : function (){
		return this.array.length;
	},
	get : function (index){
		return this.array[index];
	},
	addAll : function (obj) {
		if (obj instanceof Array){
			for (var i=0;i<obj.length;i++) {
				this.add(obj[i]);
			}
		} else if (obj instanceof ArrayList){
			for (var i=0;i<obj.length();i++) {
				this.add(obj.get(i));
			}
		}
	},
	remove : function (index) {
		if ( this.size() > 0 && index > -1 && index < this.size() )  {
			switch(index) {
				case 0:
					this.array.shift();
					break;
				case this.size() - 1:
					this.array.pop();
					break;
				default:
					var head   = this.array.slice(0, index);
					var tail   = this.array.slice(index+1);
					this.array = head.concat(tail);
					break;
			}
		}
	},
	iterator : function (){
		return new Iterator(this);
	},
	toJSON : function() {
		if ( this.size() == 0 ) return "";
		return $.toJSON(this.array);
	},
	contains : function(obj) {
		var result = 0;
		for(var i=0; i<this.array.length; i++) {
			if( this.array[i] === obj ) {
				result = 1;
				break;
			}
		}
		return result;
	},
	clear : function() {
		this.array = new Array();
	}	
}

/* Iterator */
function Iterator (arrayList){
	this.arrayList = arrayList;
	this.index = 0;
}
Iterator.prototype = {
	hasNext : function () {
		return this.index < this.arrayList.size();
	},
	next : function() {
		return this.arrayList.get(this.index++);
	}
}

/* Hashtable */
function HashMap() {
	this.keys = new ArrayList();
	this.values = new ArrayList();
}

HashMap.prototype = {
	get : function(key){
		for (var index=0; index < this.keys.size(); index++){
			if (key==this.keys.get(index)){
				return this.values.get(index);
			}
		}
		return null;
	},
	put : function(key, value){
		if(this.get(key) != null){
			this.remove(key);
		}
		this.keys.add(key);
		this.values.add(value);
	},
	containsKey : function(key){
		for (var index=0; index < this.keys.size(); index++){
			if (key==this.keys.get(index)){
				return true;
			}
		}
		return false;
	},
	size : function(){
		return this.keys.size();
	},
	containsValue : function(values){
		for (var index=0; index < this.values.size(); index++){
			if (values==this.values.get(index)){
				return true;
			}
		}
		return false;
	},
	getKeys : function() {
		return this.keys;
	},
	getValues : function() {
		return this.values;
	},
	keyIterator : function() {
		return new Iterator(this.keys);
	},
	valueIterator : function() {
		return new Iterator(this.values);
	},
	remove : function(key) {
		for (var index=0; index < this.keys.size(); index++){
			if (key==this.keys.get(index)){
				this.keys.remove(index);
				this.values.remove(index);
				break;
			}
		}
	},
	toJSON : function() {
		if ( this.size() == 0 ) return ""; 
		var ret = [];
		for(var mIter=this.keyIterator(); mIter.hasNext(); ) {
			var key = mIter.next();
			var value = this.get(key);
			var type = typeof(key);

			var name = "";
		    if (type == "number")
		        name = '"' + key + '"';
		    else if (type == "string")
		        name = $.quoteString(key);
		    else
		        continue;

		    var val = $.toJSON(value);
		    if (typeof(val) != "string") {
		        continue;
		    }

		    ret.push(name + ":" + val);
		}
		return "{" + ret.join(", ") + "}";
	}	
}