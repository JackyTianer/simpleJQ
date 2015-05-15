/**
 * Created by jackytianer on 15/5/15.
 */
'use strict';

var $;

function ajax(url, method, param, success, error) {
    var  xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            success(xhr.response, xhr);
        }else {
            error(xhr.response, xhr);
        }
    };
    xhr.open(method, url,  true);
}

$.ajax = ajax;
