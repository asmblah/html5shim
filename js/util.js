/**
 * HTML5Shim library v0.0.1
 * http://html5shim.com/
 *
 * Copyright 2012 html5shim.com
 * Released under the MIT license
 * http://html5shim.com/license
 */

define([
    "modular"
], function (
    modular
) {
    "use strict";

    var support = {
            defineProperty: (function () {
                var object = {};

                if (!Object.defineProperty) {
                    return false;
                }

                try {
                    Object.defineProperty(object, "test", {
                        get: function () {
                            return 7;
                        }
                    });

                    return object.test === 7;
                } catch (error) {
                    return false;
                }
            }())
        },
        util = modular.util.extend({}, modular.util, {
            defineProperty: (support.defineProperty ?
                    function (object, name, value) {
                        Object.defineProperty(object, name, {
                            get: value
                        });
                    } :
                    function (object, name, value) {
                        object[name] = value;
                    }),
            support: support
        });

    return util;
});
