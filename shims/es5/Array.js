/**
 * HTML5Shim library v0.0.1
 * http://html5shim.com/
 *
 * Copyright 2012 html5shim.com
 * Released under the MIT license
 * http://html5shim.com/license
 */

define([
    "../../js/util"
], function (
    util
) {
    "use strict";

    return function (html5shim) {
        var undef;

        // ES5 9.9
        // http://es5.github.com/#x9.9
        function toObject(obj) {
            if (obj === null || obj === undef) {
                throw new TypeError("can't convert " + obj + " to object");
            }

            // IE < v9 doesn't support by-index access of string characters
            if (typeof obj === "string" && obj) {
                return obj.split("");
            }

            return Object(obj);
        }

        if (!Array.isArray) {
            util.defineProperty(Array, "isArray", function (obj) {
                return toString.call(obj) === "[object Array]";
            });
        }

        if (!Array.prototype.forEach) {
            util.defineProperty(Array.prototype, "forEach", function (callback, thisObj) {
                var index,
                    length = this.length;

                thisObj = thisObj || this;

                for (index = 0; index < length; index += 1) {
                    callback.call(thisObj, this[index], index, this);
                }
            });
        }

        if (!Array.prototype.indexOf) {
            util.defineProperty(Array.prototype, "indexOf", function (value) {
                var index,
                    length = this.length;

                for (index = 0; index < length; index += 1) {
                    if (this[index] === value) {
                        return index;
                    }
                }

                return -1;
            });
        }

        // ES5 15.4.4.19
        // http://es5.github.com/#x15.4.4.19
        // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
        if (!Array.prototype.map) {
            util.defineProperty(Array.prototype, "map", function map(callback, thisArg) {
                var self = toObject(this),
                    length = self.length >>> 0,
                    result = new Array(length),
                    index;

                // If no callback function or if callback is not a callable function
                if (toString.call(callback) !== "[object Function]") {
                    throw new TypeError(callback + " is not a function");
                }

                for (index = 0; index < length; index += 1) {
                    if (index in self) {
                        result[index] = callback.call(thisArg, self[index], index, self);
                    }
                }

                return result;
            });
        }

        // ES5 15.4.4.21
        // http://es5.github.com/#x15.4.4.21
        // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
        if (!Array.prototype.reduce) {
            util.defineProperty(Array.prototype, "reduce", function reduce(callback, initial) {
                var self = toObject(this),
                    length = self.length >>> 0,
                    index = 0,
                    result;

                // If no callback function or if callback is not a callable function
                if (toString.call(callback) != "[object Function]") {
                    throw new TypeError(callback + " is not a function");
                }

                // no value to return if no initial value and an empty array
                if (!length && arguments.length == 1) {
                    throw new TypeError('reduce of empty array with no initial value');
                }

                if (arguments.length >= 2) {
                    result = initial;
                } else {
                    do {
                        if (index in self) {
                            result = self[index++];
                            break;
                        }

                        // if array contains no values, no initial value to return
                        if (++index >= length) {
                            throw new TypeError('reduce of empty array with no initial value');
                        }
                    } while (true);
                }

                for (; index < length; index += 1) {
                    if (index in self) {
                        result = callback.call(undef, result, self[index], index, self);
                    }
                }

                return result;
            });
        }
    };
});
