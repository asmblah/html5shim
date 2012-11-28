/**
 * HTML5Shim library v0.0.1
 * http://html5shim.com/
 *
 * Copyright 2012 html5shim.com
 * Released under the MIT license
 * http://html5shim.com/license
 */

define([
    "./util",
    "./ShimQueue"
], function (
    util,
    ShimQueue
) {
    "use strict";

    function HTML5Shim(require, baseURI) {
        this.baseURI = baseURI;
        this.require = require;
    }

    util.extend(HTML5Shim.prototype, {
        getBaseURI: function () {
            return this.baseURI;
        },

        loadShims: function (whenDone) {
            var shimQueue = new ShimQueue(this, this.baseURI);

            this.require([
                "./shims"
            ], function (
                shims
            ) {
                util.each(shims, function (requirementTest, name) {
                    shimQueue.enqueue(name, requirementTest);
                });

                shimQueue.dequeue(whenDone);
            });
        }
    });

    return HTML5Shim;
});
