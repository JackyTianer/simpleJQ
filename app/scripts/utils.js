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

function getBower() {
  var engine = {
    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,
    ver: null
  };
  var browser = {
    //浏览器
    ie: 0,
    firefox: 0,
    safari: 0,
    kong: 0,
    opera: 0,
    chrome: 0,
    //version
    version: null
  };

  var system = {
    win: false,
    mac: false,
    x11: false,

    //移动设备
    iphone: false,
    ipad: false,
    ios: false,
    android: false,
    nokiaN: false,
    winMobile: false
  };

  var ua = navigator.userAgent;
  console.log(ua);
  if (window.opera) {
    engine.ver = browser.ver = window.opera.version();
    engine.opera = browser.opera = parseFloat(engine.ver);
  } else if (/AppleWebKit\/(\S+)/.test(ua)) {
    engine.ver = RegExp.$1;
    engine.webkit = parseFloat(engine.ver);
    // 确定是chrome or safari
    if (/Chrome\/(\S+)/.test(ua)) {
      browser.ver = RegExp.$1;
      browser.chrome = parseFloat(browser.ver);
    } else if (/Version\/(\S+)/.test(ua)) {
      browser.ver = RegExp.$1;
      browser.safari = parseFloat(browser.ver);
    } else {
      var safariVersion = 1;
      if (engine.webkit < 100) {
        safariVersion = 1;
      } else if (engine.webkit < 312) {
        safariVersion = 1.2;
      } else if (engine.webkit < 412) {
        safariVersion = 1.3;
      } else {
        safariVersion = 2;
      }
      browser.safari = browser.ver = safariVersion;
    }
  } else if (/KHTML\/(\S+)/.test(ua) || /Kongqueror\/([^;]+)/.test(ua)) {
    engine.ver = RegExp.$1;
    engine.webkit = parseFloat(engine.ver);
  } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
    engine.ver = RegExp.$1;
    engine.webkit = parseFloat(engine.ver);
    if (/Firefox\/(\S+)/.test(ua)) {
      browser.ver = RegExp.$1;
      browser.firefox = parseFloat(browser.ver);
    }
  } else if (/MSIE ([^;]+)/.test(ua)) {
    engine.ver = RegExp.$1;
    engine.ie = parseFloat(engine.ver);
  }
  browser.ie = engine.ie;
  browser.opera = engine.opera;

  var p = navigator.platform;
  system.win = p.indexOf('Win') === 0;
  system.mac = p.indexOf('Mac') === 0;
  system.x11 = (p === 'X11') || (p.indexOf('Linux') === 0);

  if (system.win) {
    if (/Win(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
      if (RegExp.$1 === 'NT') {
        switch (RegExp.$2) {
          case '5.0':
            system.win = '2000';
            break;
          case '5.1':
            system.win = 'xp';
            break;
          case '6.0':
            system.win = 'Vista';
            break;
          case '6.1':
            system.win = '7';
            break;
          default :
            system.win = 'NT';
            break;
        }
      } else {
        system.win = RegExp.$1;
      }
    }
  }

  system.iphone = ua.indexOf('iPhone') > -1;
  system.iPad = ua.indexOf('iPad') > -1;
  system.nokiaN = ua.indexOf('nokiaN') > -1;

  if (system.win === 'CE') {
    system.winMobile = system.win;
  } else if (system.win === 'Ph') {
    if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
      system.win = 'Phone';
      system.winMobile = parseFloat(RegExp.$1);
    }
  }

  if (system.mac && ua.indexOf('Mobile') > -1) {
    if (/CPU (?:iPhone)?OS (\d+_\d+)/.test(ua)) {
      system.ios = parseFloat(RegExp.$1.replace('_', '.'));
    } else {
      system.ios = 4;
    }
  }
  if (/Android (\d+\.\d+)/.test(ua)) {
    system.android = parseFloat(RegExp.$1);
  }

  return {
    engine: engine,
    browser: browser,
    system: system
  };
}
$.getBower = getBower;

