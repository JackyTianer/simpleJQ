function $(selector) {
    'use strict';
    var idRep = /^[#](\w)+?/,
        tagRep = /^\w+?$/ig,
        classRep = /^\.(\w)+?/,
        dataRep = /^\[(\w+?-\w+)\]$/,
        dataValueRep = /^\[(\w+?-\w+)\]\s*?[=]\s*?['|"]*?(\w+?)['|"]*?$/g;
    var attr, i, allEle;

    if (idRep.test(selector)) {
        var id = selector.replace(idRep, '$1');
        return document.getElementById(id);
    } else if (tagRep.test(selector)) {
        return document.getElementsByTagName(selector)[0];
    } else if (classRep.test(selector)) {
        var className = selector.replace(classRep, '$1');
        return document.getElementsByClassName(className)[0];
    } else if (dataRep.test(selector)) {
        attr = selector.replace(dataRep, '$1');
        // get all element
        allEle = document.getElementsByTagName('*');
        for (i = 0; i < allEle.length; i++) {
            // attr in the element
            if (allEle[i].hasAttribute(attr)) {
                return allEle[i];
            }
        }
    } else if (dataValueRep.test(selector)) {
        attr = selector.replace(dataValueRep, '$1');
        var attrValue = selector.replace(dataValueRep, '$2');
        allEle = document.getElementsByTagName('*');
        for (i = 0; i < allEle.length; i++) {
            if (allEle[i].hasAttribute(attr) && allEle[i].getAttribute(attr) === attrValue) {
                return allEle[i];
            }
        }
    }
}
