/**
 * HTML5Shim library v0.0.1
 * http://html5shim.com/
 *
 * Copyright 2012 html5shim.com
 * Released under the MIT license
 * http://html5shim.com/license
 */

define([
    "js/util"
], function (
    util
) {
    "use strict";

    var global = util.global,
        document = global.document,
        getElementsByClassName = function (className) {
            return document.querySelector.call(this, "." + className);
        };

    // https://developer.mozilla.org/en-US/docs/DOM/Element.getElementsByClassName
    if (global.Element && global.Element.prototype) {
        if (!global.Element.prototype.getElementsByClassName) {
            global.Element.prototype.getElementsByClassName = getElementsByClassName;
        }
    }

    // https://developer.mozilla.org/en-US/docs/DOM/Document.getElementsByClassName
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = getElementsByClassName;
    }
});
