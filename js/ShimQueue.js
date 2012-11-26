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

    function ShimQueue(require) {
        this.queue = [];
        this.require = require;
    }

    util.extend(ShimQueue.prototype, {
        enqueue: function (name, requirementTest) {
            this.queue.push({ name: name, requirementTest: requirementTest });
        },

        dequeue: function (whenDone) {
            var shimQueue = this,
                task = shimQueue.queue[0];

            if (!task) {
                if (whenDone) {
                    whenDone();
                }
                return;
            }

            if (task.requirementTest()) {
                this.require([
                    "../shims/" + task.name
                ], function () {
                    shimQueue.queue.shift();
                    shimQueue.dequeue(whenDone);
                });
            } else {
                shimQueue.queue.shift();
                shimQueue.dequeue(whenDone);
            }
        }
    });

    return ShimQueue;
});
