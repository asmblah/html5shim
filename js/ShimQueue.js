/**
 * HTML5Shim library v0.0.1
 * http://html5shim.com/
 *
 * Copyright 2012 html5shim.com
 * Released under the MIT license
 * http://html5shim.com/license
 */

define([
    "./util"
], function (
    util
) {
    "use strict";

    function ShimQueue(html5shim) {
        this.html5shim = html5shim;
        this.queue = [];
    }

    util.extend(ShimQueue.prototype, {
        enqueue: function (name, requirementTest) {
            this.queue.push({ name: name, requirementTest: requirementTest });
        },

        dequeue: function (whenDone) {
            var shimQueue = this,
                html5shim = this.html5shim,
                task = shimQueue.queue[0];

            if (!task) {
                if (whenDone) {
                    whenDone();
                }
                return;
            }

            if (task.requirementTest()) {
                html5shim.require([
                    "./shims/" + task.name
                ], function (
                    shim
                ) {
                    shim(html5shim);
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
