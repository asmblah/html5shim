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
        document = global.document;

    util.each([
        "audio",
        "canvas",
        "video"
    ], function (nodeName) {
        document.createElement(nodeName);
    });
});
