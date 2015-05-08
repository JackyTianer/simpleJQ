    'use strict';

    var $;

    //对象是否是数组
    function isArray(arr) {
        return arr instanceof Array;
    }

    $.isArray = isArray;

    //对象是否是函数
    function isFunc(fn) {
        return fn instanceof Function;
    }

    $.isFunc = isFunc;

    //对象是否是Object
    function isObject(obj) {
        return obj instanceof Object;
    }

    $.isObject = isObject;

    //对象是否为 Date
    function isDate(obj) {
        return obj instanceof Date;
    }

    $.isDate = isDate;

    //克隆一个obj类型的值
    function cloneObject(src) {
        var newObj = {};
        for (var i in src) {
            if (src.hasOwnProperty(i)) {
                if (isArray(src[i])) {
                    var temp = [];
                    for (var j = 0; j < src[i].length; j++) {
                        temp.push(src[i][j]);
                    }
                    newObj[i] = temp;
                } else if (isDate(src[i])) {
                    newObj[i] = new Date(src[i]);
                } else if (isObject(src[i])) {
                    newObj[i] = cloneObject(src[i]);
                } else {
                    newObj[i] = src[i];
                }
            }
        }
        return newObj;
    }

    $.cloneObject = cloneObject;

    // 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
    function uniqArray(arr) {
        var result = [];
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            //判断obj中 该属性值是否存在
            if (!obj[arr[i]]) {
                result.push(arr[i]);
                obj[arr[i]] = 1;
            }
        }
        return result;
    }

    $.uniqArray = uniqArray;

    // 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
    // 先暂时不要简单的用一句正则表达式来实现
    function trim(str) {
        return str.trim();
    }

    $.trim = trim;

    // 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
    function each(arr, fn) {
        for (var i = 0; i < arr.length; i++) {
            fn(arr[i], i);
        }
    }

    $.each = each;

    // 获取一个对象里面第一层元素的数量，返回一个整数
    function getObjectLength(obj) {
        var count = 0;
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                count++;
            }
        }
        return count;
    }

    $.getObjectLength = getObjectLength;

    // 判断是否为邮箱地址
    function isEmail(emailStr) {
        var regx = /^\w+?@/;
        return regx.test(emailStr);
    }
    $.isEmail = isEmail;

    // 判断是否为手机号
    function isMobilePhone(phone) {
        var regx = /^[1]\d{10}/;
        return regx.test(phone);
    }
    $.isMobilePhone = isMobilePhone;

