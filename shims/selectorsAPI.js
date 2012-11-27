/**
 * HTML5Shim library v0.0.1
 * http://html5shim.com/
 *
 * Copyright 2012 html5shim.com
 * Released under the MIT license
 * http://html5shim.com/license
 */

define([
    "../js/util"
], function (
    util
) {
    "use strict";

    return function (html5shim) {
        var global = util.global,
            document = global.document,
            head = document.getElementsByTagName("head")[0],
            querySelectorAll = (function () {
                var STORE_NAME = "__queryResult__",
                    PROP_NAME = "-x-queryExpression",
                    nextIndex = 0;

                return function (selectors) {
                    var context = this,
                        id,
                        index,
                        prefix,
                        result,
                        store,
                        style = document.createElement("style");

                    if (!context || !context.getAttribute) {
                        context = document;
                    }

                    head.appendChild(style);

                    index = nextIndex;
                    nextIndex += 1;

                    if (context !== document) {
                        id = context.getAttribute("id") || context.uniqueID;
                        prefix = "#" + id + " ";
                        selectors = prefix + selectors.replace(/,/g, ", " + prefix);
                    }

                    result = [];
                    // We need a unique store each time to prevent results from previous queries from leaking through
                    store = STORE_NAME + index;
                    document[store] = result;
                    style.styleSheet.cssText = selectors + "{" + PROP_NAME + ":expression(document." + store + " && document." + store + ".push(this))}";
                    global.scrollBy(0, 0);
                    if (result.length === 0) {
                        document.recalc();
                    }

                    head.removeChild(style);
                    document[STORE_NAME + index] = undefined;

                    return result;
                };
            }()),
            querySelector = function (selectors) {
                return querySelectorAll.call(this, selectors)[0];
            };

        // https://developer.mozilla.org/en-US/docs/DOM/Document.querySelectorAll
        if (!document.querySelectorAll) {
            util.defineProperty(document, "querySelectorAll", querySelectorAll);
        }

        // https://developer.mozilla.org/en-US/docs/DOM/Document.querySelector
        if (!document.querySelector) {
            util.defineProperty(document, "querySelector", querySelector);
        }
    };
});
