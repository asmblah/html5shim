/**
 * HTML5Shim library v0.0.1
 * http://html5shim.com/
 *
 * Copyright 2012 html5shim.com
 * Released under the MIT license
 * http://html5shim.com/license
 */

define([
    "require",
    "module",
    "js/util",
    "js/ShimQueue"
], function (
    require,
    module,
    util,
    ShimQueue
) {
    "use strict";

    var whenDone = module.defer(),
        shimQueue = new ShimQueue(require);

    require([
        "../shims"
    ], function (
        shims
    ) {
        util.each(shims, function (requirementTest, name) {
            shimQueue.enqueue(name, requirementTest);
        });

        shimQueue.dequeue(whenDone);
    });
});
