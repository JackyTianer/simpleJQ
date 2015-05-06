///**
// * Created by jackytianer on 15/4/28.
// */
define(function(require) {
    'use strict';

    var $ = require('selector');

    function addClass(element, newClassName) {
        return element.className.concat(' ', newClassName);
    }
    // 移除element中的样式oldClassName
    function removeClass(element, oldClassName) {
        return element.className.replace(oldClassName, '');
    }

    $.prototype.addClass = addClass;
    $.prototype.removeClass = removeClass;
});

