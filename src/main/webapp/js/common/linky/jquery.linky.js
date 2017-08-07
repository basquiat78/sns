/**
 * jquery.linky.js v0.1.8
 * https://github.com/AnSavvides/jquery.linky
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 - 2015 Andreas Savvides
 */
(function($) {

    "use strict";

    $.fn.linky = function(options) {
        return this.each(function() {
            var $el = $(this),
                linkifiedContent = _linkify($el, options);

            $el.html(linkifiedContent);
        });
    };

    $.fn.noLinky = function(options) {
        return this.each(function() {
            var $el = $(this),
                linkifiedContent = _noLinkify($el, options);

            $el.html(linkifiedContent);
        });
    };
    
    function _noLinkify($el, options) {
        var links = {
        		hanwha: {
                    baseUrl: "http://www.hawwha.co.kr",
                    hashtagSearchUrl: "javascript:findFeedTag"
                },
            },
            defaultOptions = {
                mentions: true,
                hashtags: true,
                urls: false,
                linkTo: "hanwha" // Let's default to Twitter
            },
            extendedOptions = $.extend(defaultOptions, options),
            elContent = $el.html(),
            // Regular expression courtesy of Matthew O'Riordan, see: http://goo.gl/3syEKK
            urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g,
            matches;

            // Linkifying URLs
            if (extendedOptions.urls) {
                matches = elContent.match(urlRegEx);
                if (matches) {
                    elContent = _noLinkifyUrls(matches, $el);
                }
            }

            // Linkifying mentions
            if (extendedOptions.mentions) {
                elContent = _noLinkifyMentions(elContent, links[extendedOptions.linkTo].baseUrl);
            }

            // Linkifying hashtags
            if (extendedOptions.hashtags) {
                elContent = _noLinkifyHashtags(elContent, links[extendedOptions.linkTo]);
            }

        return elContent;
    }
 // For any URLs present, unless they are already identified within
    // an `a` element, linkify them.
    function _noLinkifyUrls(matches, $el) {
        var elContent = $el.html();
        var n = 1;
        var preUrl;
        $.each(matches, function() {
            // Only linkify URLs that are not already identified as
            // `a` elements with an `href`.
            if ($el.find("a[href='" + this + "']").length === 0) {
            	var realUrl = this;
            	
            	// console.log((n++) + ":" + realUrl);
            	
            	if(preUrl == realUrl) {
            		return false;
            	}
            	preUrl = this;
            	
            	if(this.indexOf("http://") === -1 && this.indexOf("https://") === -1) {
            		realUrl = "http://" + this;
            	}
            	
                elContent = elContent.replace(this, "<span class='name_url'><strong><a href='" + realUrl + "' target='_blank'>" + realUrl + "</a></strong></span>");
            }
        });

        return elContent;
    }

    // Find any mentions (e.g. @andrs) and turn them into links that
    // refer to the appropriate social profile (e.g. twitter or instagram).
    function _noLinkifyMentions(text, baseUrl) {
        	var regexpWithWhiteSpaceEn = /(^|\s|\(|>)@\[(\w+\s+\w+)\]\(([0-9]+)\)/g;
        	var regexpWithWhiteSpaceKo = /(^|\s|\(|>)@\[(\S+\s+\S+)\]\(([0-9]+)\)/g;
        	var regexpWithNoramal = /(^|\s|\(|>)@\[(\S+)\]\(([0-9]+)\)/g;
        	
        	if(regexpWithNoramal.test(text)){
        		return text.replace(regexpWithNoramal, "<span><strong>$2</strong></span> ");
        		
        	} else if(regexpWithWhiteSpaceEn.test(text)) {
        		return text.replace(regexpWithWhiteSpaceEn, "<span><strong>$2</strong></span> ");
        		
        	} else {
        		return text.replace(regexpWithWhiteSpaceKo, "<span><strong>$2</strong></span> ");
        		
        	}
    }

    // Find any hashtags (e.g. #linkyrocks) and turn them into links that refer
    // to the appropriate social profile.
    function _noLinkifyHashtags(text, links) {
        // If there is no search URL for a hashtag, there isn't much we can do
        if (links.hashtagSearchUrl === null) return text;
        return text.replace(/(^|\s|\(|>)#((\w|[\u00A1-\uFFFF])+)/g, " <span><strong>#$2</strong></span> ");
    }
    
    
    function _linkify($el, options) {
        var links = {
        		hanwha: {
                    baseUrl: "http://www.hawwha.co.kr",
                    hashtagSearchUrl: "javascript:findFeedTag"
                },
            },
            defaultOptions = {
                mentions: true,
                hashtags: true,
                urls: true,
                linkTo: "hanwha" , // Let's default to Twitter
                tooltipId: ""
            },
            extendedOptions = $.extend(defaultOptions, options),
            elContent = $el.html(),
            // Regular expression courtesy of Matthew O'Riordan, see: http://goo.gl/3syEKK
            urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g,
            matches;

            // Linkifying URLs
            if (extendedOptions.urls) {
                matches = elContent.match(urlRegEx);
                if (matches) {
                    elContent = _linkifyUrls(matches, $el);
                }
            }

            // Linkifying mentions
            if (extendedOptions.mentions) {
                elContent = _linkifyMentions(elContent, links[extendedOptions.linkTo].baseUrl, extendedOptions.tooltipId);
            }

            // Linkifying hashtags
            if (extendedOptions.hashtags) {
                elContent = _linkifyHashtags(elContent, links[extendedOptions.linkTo]);
            }

        return elContent;
    }

    // For any URLs present, unless they are already identified within
    // an `a` element, linkify them.
    function _linkifyUrls(matches, $el) {
        var elContent = $el.html();
        var n = 1;
        var preUrl;
        $.each(matches, function() {
            // Only linkify URLs that are not already identified as
            // `a` elements with an `href`.
            if ($el.find("a[href='" + this + "']").length === 0) {
            	var realUrl = this;
            	
            	// console.log((n++) + ":" + realUrl);
            	
            	if(preUrl == realUrl) {
            		return false;
            	}
            	preUrl = this;
            	
            	if(this.indexOf("http://") === -1 && this.indexOf("https://") === -1) {
            		realUrl = "http://" + this;
            	}
            	
                elContent = elContent.replace(this, "<span class='name_url'><strong><a href='" + realUrl + "' target='_blank'>" + realUrl + "</a></strong></span>");
            }
        });

        return elContent;
    }

    // Find any mentions (e.g. @andrs) and turn them into links that
    // refer to the appropriate social profile (e.g. twitter or instagram).
    function _linkifyMentions(text, baseUrl, tooltipId) {
        	var regexpWithWhiteSpaceEn = /@\[(\w+\s+\w+)\]\(([0-9]+)\)/g;
        	var regexpWithWhiteSpaceKo = /@\[(\S+\s+\S+)\]\(([0-9]+)\)/g;
        	var regexpWithNoramal = /@\[(\S+)\]\(([0-9]+)\)/g;
        	
        	if(regexpWithNoramal.test(text)){
        		return text.replace(regexpWithNoramal, "<span class='name_url'><strong style='cursor:pointer' onMouseover='OpenLyncMenuName($2, this)' onMouseout='hideLyncMenu()' onClick='getMemberInfo($2, \"$1\")'>$1</strong></span> ");
        		
        	} else if(regexpWithWhiteSpaceEn.test(text)) {
        		return text.replace(regexpWithWhiteSpaceEn, "<span class='name_url'><strong style='cursor:pointer' onMouseover='OpenLyncMenuName($2, this)' onMouseout='hideLyncMenu()' onClick='getMemberInfo($2, \"$1\")'>$1</strong></span> ");
        		
        	} else {
        		return text.replace(regexpWithWhiteSpaceKo, "<span class='name_url'><strong style='cursor:pointer' onMouseover='OpenLyncMenuName($2, this)' onMouseout='hideLyncMenu()' onClick='getMemberInfo($2, \"$1\")'>$1</strong></span> ");
        		
        	}
    }

    // Find any hashtags (e.g. #linkyrocks) and turn them into links that refer
    // to the appropriate social profile.
    function _linkifyHashtags(text, links) {
        // If there is no search URL for a hashtag, there isn't much we can do
        if (links.hashtagSearchUrl === null) return text;
        return text.replace(/(^|\s|\(|>)#((\w|[\u00A1-\uFFFF])+)/g, " <span class='name_url'><strong><a href='" + links.hashtagSearchUrl + "(\"$2\");' target='_self'>#$2</a></strong></span> ");
    }

    
}(jQuery));
