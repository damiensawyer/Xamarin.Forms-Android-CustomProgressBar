if (typeof (xamarin) === 'undefined') var xamarin = {};

xamarin.storeUrl = '';

if (window.location.host.indexOf('xamarin.com') >= 0)
    xamarin.storeUrl = "https://store.xamarin.com";
else if (window.location.host.indexOf('xamstage.com') >= 0)
    xamarin.storeUrl = "https://taco.xamstage.com";
else xamarin.storeUrl = "https://taco.xamdev.com";


// http://mths.be/placeholder v2.0.7 by @mathias
// https://github.com/mathiasbynens/jquery-placeholder/blob/master/LICENSE-MIT.txt
(function(e,t,n){function l(e){var t={};var r=/^jQuery\d+$/;n.each(e.attributes,function(e,n){if(n.specified&&!r.test(n.name)){t[n.name]=n.value}});return t}function c(e,t){var r=this;var i=n(r);if(r.value==i.attr("placeholder")&&i.hasClass("placeholder")){if(i.data("placeholder-password")){i=i.hide().next().show().attr("id",i.removeAttr("id").data("placeholder-id"));if(e===true){return i[0].value=t}i.focus()}else{r.value="";i.removeClass("placeholder");r==p()&&r.select()}}}function h(){var e;var t=this;var r=n(t);var i=this.id;if(t.value==""){if(t.type=="password"){if(!r.data("placeholder-textinput")){try{e=r.clone().attr({type:"text"})}catch(s){e=n("<input>").attr(n.extend(l(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":r,"placeholder-id":i}).bind("focus.placeholder",c);r.data({"placeholder-textinput":e,"placeholder-id":i}).before(e)}r=r.removeAttr("id").hide().prev().attr("id",i).show()}r.addClass("placeholder");r[0].value=r.attr("placeholder")}else{r.removeClass("placeholder")}}function p(){try{return t.activeElement}catch(e){}}var r="placeholder"in t.createElement("input");var i="placeholder"in t.createElement("textarea");var s=n.fn;var o=n.valHooks;var u=n.propHooks;var a;var f;if(r&&i){f=s.placeholder=function(){return this};f.input=f.textarea=true}else{f=s.placeholder=function(){var e=this;e.filter((r?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":c,"blur.placeholder":h}).data("placeholder-enabled",true).trigger("blur.placeholder");return e};f.input=r;f.textarea=i;a={get:function(e){var t=n(e);var r=t.data("placeholder-password");if(r){return r[0].value}return t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,t){var r=n(e);var i=r.data("placeholder-password");if(i){return i[0].value=t}if(!r.data("placeholder-enabled")){return e.value=t}if(t==""){e.value=t;if(e!=p()){h.call(e)}}else if(r.hasClass("placeholder")){c.call(e,true,t)||(e.value=t)}else{e.value=t}return r}};if(!r){o.input=a;u.value=a}if(!i){o.textarea=a;u.value=a}n(function(){n(t).delegate("form","submit.placeholder",function(){var e=n(".placeholder",this).each(c);setTimeout(function(){e.each(h)},10)})});n(e).bind("beforeunload.placeholder",function(){n(".placeholder").each(function(){this.value=""})})}})(this,document,jQuery)


$(function() {

    // Cookies Manipulation
    
    function createCookie(name, value, hours) {
        if (hours) {
            var date = new Date();
            date.setTime(date.getTime()+(hours*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+encodeURIComponent(value)+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }
    
    // Email Validation
    var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/;


    // Fill user area

    var globalHeader = $('#global-header');
    var userArea = globalHeader.find('.user');
    
    var fillUserArea = function(userData) {
        xamarin.XamUser = userData;
        
        if (userData['loggedIn'] == true) {

            if (typeof analytics !== 'undefined') {
                analytics.identify (userData['email'], {
                    email: userData['email'],
                    firstName: userData['firstName'],
                    lastName: userData['lastName']
                });
            }
        
            userArea.addClass('dropdown');
            var userAreaHtml = '<a class="#" data-toggle=""> \
                                <img src="' + userData['avatar'] + '" alt="" />' + userData['firstName'] + '</a>';
            
            userAreaHtml += '<ul role="menu"> \
                                <li class="user-details"> \
                                    <strong>' + userData['firstName'] + ' ' + userData['lastName'] + '</strong> \
                                    <span class="email">' + userData['email'] + '</span> \
                                </li>';
             
             $.each(userData['actions'], function(key, value) {
                userAreaHtml += '<li><a href="' + value['url'] +'">' + value['label'] + '</a></li>';
             });
             userAreaHtml += '</ul>';
             
         } else {
             userArea.removeClass('dropdown');
             var userAreaHtml = '<a href="https://xamarin.com/account/login?returnUrl=' + encodeURIComponent(window.location.href) + '">Sign In</a>';
         }

         if (userArea.html() != userAreaHtml) {
            userArea.html(userAreaHtml);
         }
         return;
    };
    
    if (readCookie("xamarin-account") != null) {
        try {
            var userCachedData = JSON.parse(readCookie('xamarin-account'));
            fillUserArea(userCachedData);
        } catch (e) {
            fillUserArea({'loggedIn': false});
        }
        
    } else {
        fillUserArea({'loggedIn': false});
    }
    
    // Update cached data

    xamarin.getXamIdent = function () {
    
        janky({ url: xamarin.storeUrl + '/xamIdent?t=' + (new Date().getTime()),
                data: {
                    'url': window.location.href,
                    isJanky: true
                },
                method: "post",
                success: function(data) {
                    fillUserArea(data);
                    createCookie('xamarin-account', JSON.stringify(data), 6);
                },
                error: function() {
                    var data = {'loggedIn': false};
                    fillUserArea(data);
                    createCookie('xamarin-account', JSON.stringify(data), 6);
                }
        });        
    }

    xamarin.getXamIdent ();

});

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/*
 * jQuery MD5 Plugin 1.2.1
 * https://github.com/blueimp/jQuery-MD5
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://creativecommons.org/licenses/MIT/
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*jslint bitwise: true */
/*global unescape, jQuery */
(function(e){"use strict";function t(e,t){var n=(e&65535)+(t&65535),r=(e>>16)+(t>>16)+(n>>16);return r<<16|n&65535}function n(e,t){return e<<t|e>>>32-t}function r(e,r,i,s,o,u){return t(n(t(t(r,e),t(s,u)),o),i)}function i(e,t,n,i,s,o,u){return r(t&n|~t&i,e,t,s,o,u)}function s(e,t,n,i,s,o,u){return r(t&i|n&~i,e,t,s,o,u)}function o(e,t,n,i,s,o,u){return r(t^n^i,e,t,s,o,u)}function u(e,t,n,i,s,o,u){return r(n^(t|~i),e,t,s,o,u)}function a(e,n){e[n>>5]|=128<<n%32;e[(n+64>>>9<<4)+14]=n;var r,a,f,l,c,h=1732584193,p=-271733879,d=-1732584194,v=271733878;for(r=0;r<e.length;r+=16){a=h;f=p;l=d;c=v;h=i(h,p,d,v,e[r],7,-680876936);v=i(v,h,p,d,e[r+1],12,-389564586);d=i(d,v,h,p,e[r+2],17,606105819);p=i(p,d,v,h,e[r+3],22,-1044525330);h=i(h,p,d,v,e[r+4],7,-176418897);v=i(v,h,p,d,e[r+5],12,1200080426);d=i(d,v,h,p,e[r+6],17,-1473231341);p=i(p,d,v,h,e[r+7],22,-45705983);h=i(h,p,d,v,e[r+8],7,1770035416);v=i(v,h,p,d,e[r+9],12,-1958414417);d=i(d,v,h,p,e[r+10],17,-42063);p=i(p,d,v,h,e[r+11],22,-1990404162);h=i(h,p,d,v,e[r+12],7,1804603682);v=i(v,h,p,d,e[r+13],12,-40341101);d=i(d,v,h,p,e[r+14],17,-1502002290);p=i(p,d,v,h,e[r+15],22,1236535329);h=s(h,p,d,v,e[r+1],5,-165796510);v=s(v,h,p,d,e[r+6],9,-1069501632);d=s(d,v,h,p,e[r+11],14,643717713);p=s(p,d,v,h,e[r],20,-373897302);h=s(h,p,d,v,e[r+5],5,-701558691);v=s(v,h,p,d,e[r+10],9,38016083);d=s(d,v,h,p,e[r+15],14,-660478335);p=s(p,d,v,h,e[r+4],20,-405537848);h=s(h,p,d,v,e[r+9],5,568446438);v=s(v,h,p,d,e[r+14],9,-1019803690);d=s(d,v,h,p,e[r+3],14,-187363961);p=s(p,d,v,h,e[r+8],20,1163531501);h=s(h,p,d,v,e[r+13],5,-1444681467);v=s(v,h,p,d,e[r+2],9,-51403784);d=s(d,v,h,p,e[r+7],14,1735328473);p=s(p,d,v,h,e[r+12],20,-1926607734);h=o(h,p,d,v,e[r+5],4,-378558);v=o(v,h,p,d,e[r+8],11,-2022574463);d=o(d,v,h,p,e[r+11],16,1839030562);p=o(p,d,v,h,e[r+14],23,-35309556);h=o(h,p,d,v,e[r+1],4,-1530992060);v=o(v,h,p,d,e[r+4],11,1272893353);d=o(d,v,h,p,e[r+7],16,-155497632);p=o(p,d,v,h,e[r+10],23,-1094730640);h=o(h,p,d,v,e[r+13],4,681279174);v=o(v,h,p,d,e[r],11,-358537222);d=o(d,v,h,p,e[r+3],16,-722521979);p=o(p,d,v,h,e[r+6],23,76029189);h=o(h,p,d,v,e[r+9],4,-640364487);v=o(v,h,p,d,e[r+12],11,-421815835);d=o(d,v,h,p,e[r+15],16,530742520);p=o(p,d,v,h,e[r+2],23,-995338651);h=u(h,p,d,v,e[r],6,-198630844);v=u(v,h,p,d,e[r+7],10,1126891415);d=u(d,v,h,p,e[r+14],15,-1416354905);p=u(p,d,v,h,e[r+5],21,-57434055);h=u(h,p,d,v,e[r+12],6,1700485571);v=u(v,h,p,d,e[r+3],10,-1894986606);d=u(d,v,h,p,e[r+10],15,-1051523);p=u(p,d,v,h,e[r+1],21,-2054922799);h=u(h,p,d,v,e[r+8],6,1873313359);v=u(v,h,p,d,e[r+15],10,-30611744);d=u(d,v,h,p,e[r+6],15,-1560198380);p=u(p,d,v,h,e[r+13],21,1309151649);h=u(h,p,d,v,e[r+4],6,-145523070);v=u(v,h,p,d,e[r+11],10,-1120210379);d=u(d,v,h,p,e[r+2],15,718787259);p=u(p,d,v,h,e[r+9],21,-343485551);h=t(h,a);p=t(p,f);d=t(d,l);v=t(v,c)}return[h,p,d,v]}function f(e){var t,n="";for(t=0;t<e.length*32;t+=8){n+=String.fromCharCode(e[t>>5]>>>t%32&255)}return n}function l(e){var t,n=[];n[(e.length>>2)-1]=undefined;for(t=0;t<n.length;t+=1){n[t]=0}for(t=0;t<e.length*8;t+=8){n[t>>5]|=(e.charCodeAt(t/8)&255)<<t%32}return n}function c(e){return f(a(l(e),e.length*8))}function h(e,t){var n,r=l(e),i=[],s=[],o;i[15]=s[15]=undefined;if(r.length>16){r=a(r,e.length*8)}for(n=0;n<16;n+=1){i[n]=r[n]^909522486;s[n]=r[n]^1549556828}o=a(i.concat(l(t)),512+t.length*8);return f(a(s.concat(o),512+128))}function p(e){var t="0123456789abcdef",n="",r,i;for(i=0;i<e.length;i+=1){r=e.charCodeAt(i);n+=t.charAt(r>>>4&15)+t.charAt(r&15)}return n}function d(e){return unescape(encodeURIComponent(e))}function v(e){return c(d(e))}function m(e){return p(v(e))}function g(e,t){return h(d(e),d(t))}function y(e,t){return p(g(e,t))}e.md5=function(e,t,n){if(!t){if(!n){return m(e)}else{return v(e)}}if(!n){return y(t,e)}else{return g(t,e)}}})(typeof jQuery==="function"?jQuery:this)