/**
 * HTML5Shim library v0.0.1
 * http://html5shim.com/
 *
 * Copyright 2012 html5shim.com
 * Released under the MIT license
 * http://html5shim.com/license
 */

/*
 * NB: Shims will be loaded in the order specified here. This may need revising
 *     if more complex dependency chains are ever required.
 */
define({
    // https://developer.mozilla.org/en-US/docs/DOM/Document.querySelectorAll
    "selectorsAPI": function () { return !document.querySelectorAll || !document.querySelector; },

    // https://developer.mozilla.org/en-US/docs/DOM/Document.getElementsByClassName
    "getElementsByClassName": function () { return !document.getElementsByClassName; },

    "html5Elements": function () { return !document.createElement("canvas").getContext; },

    "es5/Array": function () { return !Array.isArray; },

    "es5/Object": function () { return !Object.create || !Object.defineProperty || !Object.getOwnPropertyNames; }
});
