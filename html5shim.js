/**
 * HTML5Shim library v0.0.1
 * http://html5shim.com/
 *
 * Copyright 2012 html5shim.com
 * Released under the MIT license
 * http://html5shim.com/license
 */

(function () {
    "use strict";

    /*
     * HTML5Shim initial load bootstrap.
     * Downloads Modular (if required), configuring synchronous transport if needed.
     */

    var whenDone = function () {},
        baseURI = null,
        global = new [Function][0]("return this;")(), // Keep JSLint happy
        document = global.document,
        has = {}.hasOwnProperty,
        head = document.getElementsByTagName("head")[0],
        loadSync = document.scripts[document.scripts.length - 1].readyState === "interactive",
        version = global.execScript && (function () {
            var div = document.createElement("div");

            version = 4;

            do {
                version += 1;
                div.innerHTML = "<!--[if gt IE " + version + "]><div></div><![endif]-->";
            } while (div.firstChild);

            return version;
        }()),
        xhr;

    function each(obj, callback, options) {
        var key,
            length;

        if (!obj) {
            return;
        }

        options = options || {};

        if (has.call(obj, "length") && !options.keys) {
            for (key = 0, length = obj.length; key < length; key += 1) { // Keep JSLint happy with "+= 1"
                if (callback.call(obj[key], obj[key], key) === false) {
                    break;
                }
            }
        } else {
            for (key in obj) {
                if (has.call(obj, key)) {
                    if (callback.call(obj[key], obj[key], key) === false) {
                        break;
                    }
                }
            }
        }
    }

    function loadScript(path, whenDone) {
        var script;

        whenDone = whenDone || function () {};

        if (loadSync) {
            if (!xhr) {
                xhr = global.XMLHttpRequest ?
                    new global.XMLHttpRequest() :
                    new global.ActiveXObject("Microsoft.XMLHTTP");
            }

            // Make a synchronous request, as we need to block until complete (in this mode)
            xhr.open("GET", baseURI + path + ".js", false);
            xhr.send();

            global.execScript(xhr.responseText);
            whenDone();
        } else {
            script = document.createElement("script");
            script.onreadystatechange = function () {
                if (/loaded|complete/.test(this.readyState)) {
                    whenDone();
                }
            };
            head.appendChild(script);
        }
    }

    // When loaded as an AMD module asynchronously, defer marking as loaded until all shims have loaded
    if (!loadSync && global.define) {
        global.define([
            "module"
        ], function (
            module
        ) {
            whenDone = module.defer();
        });
    }

    if (!global.console) {
        global.console = {
            log: function () {}
        };
    }

    // IE version < v6 not supported
    if (!version || version < 6) {
        whenDone();
        return;
    }

    each(document.getElementsByTagName("script"), function () {
        var path = this.src,
            parts;

        if (this.readyState === "interactive" || /html5shim\.js$/.test(path)) {
            parts = path.split("/");
            parts.splice(parts.length - 1, 1);
            baseURI = parts.join("/") + "/";

            return false;
        }
    });

    if (baseURI === null) {
        global.console.log("HTML5Shim html5shims.js :: Could not find html5shims.js script to determine base URI");
        whenDone();
        return;
    }

    loadScript("vendor/modular/modular", function () {
        if (!global.require) {
            global.console.log("HTML5Shim html5shims.js :: Modular failed to load");
            whenDone();
            return;
        }

        global.require([
            "modular"
        ], function (
            modular
        ) {
            var util = modular.util;

            if (loadSync) {
                (function () {
                    var defaultConfig = global.require.config(),
                        nextCallback;

                    global.require.config({
                        "defineAnonymous": function (args) {
                            nextCallback(args);
                        },
                        "transport": function (callback, module) {
                            nextCallback = callback;
                            loadScript(module.getID());
                        }
                    });
                }());
            } else {
                global.require.config({
                    "baseUrl": baseURI
                });
            }

            global.require([
                "js/main"
            ], whenDone);
        });
    });
}());
