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

    // Try using window.scrollBy(0, 0) to force behavior downloads?

    return function (html5shim) {
        var PROTOTYPE = "__proto__",
            global = util.global,
            document = global.document,
            has = {}.hasOwnProperty,
            hostPropertyNames = [
                "accessKey", "align", "all", "ariaActivedescendant", "ariaBusy", "ariaChecked", "ariaControls", "ariaDescribedBy", "ariaDisabled", "ariaExpanded", "ariaFlowto", "ariaHaspopup", "ariaHidden", "ariaInvalid", "ariaLabelledby", "ariaLevel", "ariaLive", "ariaMultiselectable", "ariaOwns", "ariaPosinset", "ariaPressed", "ariaReadonly", "ariaRelevant", "ariaRequired", "ariaSecret", "ariaSelected", "ariaSetsize", "ariaValuemax", "ariaValuemin", "ariaValuenow", "attributes", "behaviorUrns", "canHaveChildren", "canHaveHTML", "childNodes", "children", "className", "clientHeight", "clientLeft", "clientTop", "clientWidth", "constructor", "contentEditable", "currentStyle", "dataFld", "dataFormatAs", "dataSrc", "dir", "disabled", "document", "filters", "firstChild", "hideFocus", "id", "innerHTML", "innerText", "isContentEditable", "isDisabled", "isMultiLine", "isTextEdit", "lang", "language", "lastChild", "nextSibling", "nodeName", "nodeType", "nodeValue", "noWrap", "offsetHeight", "offsetLeft", "offsetParent", "offsetTop", "offsetWidth", "outerHTML", "outerText", "ownerDocument", "parentElement", "parentNode", "parentTextEdit", "previousSibling", "readyState", "recordNumber", "role", "runtimeStyle", "scopeName", "scrollHeight", "scrollLeft", "scrollTop", "scrollWidth", "sourceIndex", "style", "tabIndex", "tagName", "tagUrn", "title", "uniqueID", "uniqueNumber"
            ],
            hostMethodNames = [
                "addBehavior", "addFilter", "appendChild", "applyElement", "attachEvent", "blur", "clearAttributes", "click", "cloneNode", "componentFromPoint", "contains", "createControlRange", "detachEvent", "doScroll", "dragDrop", "FireEvent", "focus", "getAdjacentText", "getAttribute", "getAttributeNode", "getBoundingClientRect", "getClientRects", "getElementsByTagName", "getExpression", "hasAttribute", "hasAttributes", "hasChildNodes", "insertAdjacentElement", "insertAdjacentHTML", "insertAdjacentText", "insertBefore", "mergeAttributes", "normalize", "querySelector", "querySelectorAll", "releaseCapture", "removeAttribute", "removeAttributeNode", "removeBehavior", "removeChild", "removeExpression", "removeFilter", "removeNode", "replaceAdjacentText", "replaceChild", "replaceNode", "scrollIntoView", "setActive", "setAttribute", "setAttributeNode", "setCapture", "setExpression", "swapNode", "toString"
            ],
            hostEventNames = [
                "activate", "afterupdate", "beforeactivate", "beforecopy", "beforecut", "beforedeactivate", "beforeeditfocus", "beforepaste", "beforeupdate", "blur", "cellchange", "click", "contextmenu", "controlselect", "copy", "cut", "dataavailable", "datasetchanged", "datasetcomplete", "dblclick", "deactivate", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "errorupdate", "filterchange", "focus", "focusin", "focusout", "help", "keydown", "keypress", "keyup", "layoutcomplete", "losecapture", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "move", "moveend", "movestart", "page", "paste", "propertychange", "readystatechange", "resize", "resizeend", "resizestart", "rowenter", "rowexit", "rowsdelete", "rowsinserted", "scroll", "selectstart"
            ],
            namespaceName = "accessorIE",
            needsAccessorShim = has.call(global, "execScript"),
            sandbox,
            toString = {}.toString,
            transportName = "__transport__",
            undef;

        function createSandbox() {
            var ifm = document.createElement("<iframe style='position:absolute;left:-10000em;width:0;height:0;' />"),
                htcPath = html5shim.getBaseURI() + "shims/es5/Object/Object.htc";

            document.appendChild(ifm);
            sandbox = ifm.contentWindow.document;

            sandbox.write(
                "<head>" +
                    "<?import namespace='" + namespaceName + "' />" +
                    "<script>document.namespaces['" + namespaceName + "'].doImport('" + htcPath + "');<\/script>" +
                "<\/head><body><\/body>"
            );
            sandbox.close();

            function cleanUp() {
                global.detachEvent("onunload", cleanUp);

                sandbox = null;
            }

            global.attachEvent("onunload", cleanUp);
        }

        // NB: This will not handle inheriting now-unshadowed properties for shimmed objects
        function deleteProperty(object, name) {
            var transport = object[transportName];

            if (transport) {
                if (has.call(transport.descriptors, name)) {
                    transport.elements[name].removeNode(true);
                    delete transport.descriptors[name];
                    delete transport.inheriteds[name];
                    delete transport.elements[name];
                }
            } else {
                delete object[name];
            }
        }

        function isDataDescriptor(descriptor) {
            return has.call(descriptor, "value") ||
                has.call(descriptor, "writable") ||
                (!has.call(descriptor, "get") && !has.call(descriptor, "set"));
        }

        function methodfy(fn) {
            if (fn === Array.prototype.push) {
                return function () {
                    var index,
                        length = arguments.length,
                        arrayLength = this.length || 0;

                    for (index = 0; index < length; index += 1) {
                        this[arrayLength] = arguments[index];
                        arrayLength += 1;
                    }

                    this.length = arrayLength;
                };
            }
            if (fn === Array.prototype.pop) {
                return function () {
                    var arrayLength = this.length || 0;

                    if (arrayLength > 0) {
                        try {
                            delete this[arrayLength];
                        } catch (error) {
                            this[arrayLength] = undefined;
                        }

                        this.length = arrayLength - 1;
                    }
                };
            }

            return fn;
        }

        function normalizeDescriptor(descriptor) {
            descriptor.configurable = descriptor.configurable || false;
            descriptor.enumerable = descriptor.enumerable || false;

            if (isDataDescriptor(descriptor)) {
                delete descriptor.get;
                delete descriptor.set;
                if (!has.call(descriptor, "value")) {
                    descriptor.value = undefined;
                }
                descriptor.writable = descriptor.writable || false;
            } else {
                delete descriptor.value;
                delete descriptor.writable;
            }
        }

        if (!needsAccessorShim) {
            throw new Error("accessorIE should not be used by non-IE browsers: use a conditional comment");
        }

        if (Object.create) {
            throw new Error("accessorIE should not be used by IE >= v9: use a conditional comment");
        }

        if (!Object.create || !Object.defineProperty || !Object.getOwnPropertyNames) {
            createSandbox();

            util.defineProperty(Object, "create", function (prototype, descriptors) {
                var attachEvent,
                    object,
                    transport;

                if (descriptors) {
                    object = sandbox.createElement(namespaceName + ":object");
                    // Element behaviors would work detached, allowing for garbage collection,
                    //  but then events would not fire, including the needed onpropertychange event
                    sandbox.appendChild(object);
                    transport = object[transportName];

                    if (!transport) {
                        throw new Error("Shim not loaded");
                    }

                    attachEvent = object.attachEvent;

                    Object.defineProperty(object, PROTOTYPE, {
                        get: function () {
                            return transport.prototype;
                        },

                        set: function (prototype) {
                            var name;

                            for (name in transport.inheriteds) {
                                if (has.call(transport.inheriteds, name)) {
                                    deleteProperty(object, name);
                                }
                            }

                            // TODO: Go up entire prototype chain
                            if (prototype !== null && prototype !== undef) {
                                util.each(Object.getOwnPropertyNames(prototype), function (name) {
                                    if (!has.call(transport.descriptors, name) && name !== PROTOTYPE) {
                                        Object.defineProperty(object, name, Object.getOwnPropertyDescriptor(prototype, name));
                                        transport.inheriteds[name] = true;
                                    }
                                });
                            }

                            transport.prototype = prototype;
                        }
                    });

                    if (prototype) {
                        object[PROTOTYPE] = prototype;
                    }

                    Object.defineProperties(object, descriptors);

                    // MSDN docs state that this event is not synchronous, but it appears to be,
                    // which is great for intercepting dynamic property additions
                    attachEvent("onpropertychange", function (evt) {
                        var name = evt.propertyName;

                        if (!has.call(transport.descriptors, name)) {
                            Object.defineProperty(object, name, {
                                value: object[name]
                            });
                        }
                    });

                    return object;
                }

                function Fn() {}
                Fn.prototype = prototype;
                return new Fn();
            });

            util.defineProperty(Object, "defineProperties", function (object, descriptors) {
                util.each(descriptors, function (descriptor, name) {
                    Object.defineProperty(object, name, descriptor);
                }, { keys: true });

                return object;
            });

            util.defineProperty(Object, "defineProperty", function (object, name, descriptor) {
                var document,
                    element,
                    id,
                    transport;

                if (typeof descriptor !== "object" || descriptor === null) {
                    throw new TypeError("Property description must be an object: " + descriptor);
                }

                transport = object[transportName];

                if (transport) {
                    id = transport.nextID;
                    transport.nextID += 1;

                    deleteProperty(object, name);

                    normalizeDescriptor(descriptor);

                    transport.descriptors[name] = descriptor;

                    if (typeof descriptor.value === "function") {
                        object[name] = methodfy(descriptor.value);
                    } else if (descriptor.method) {
                        object[name] = function () {
                            return methodfy(descriptor.get().apply(this, arguments));
                        };
                    } else {
                        // TODO: "writable" properties
                        if (isDataDescriptor(descriptor)) {
                            descriptor = {
                                get: function () {
                                    return transport.descriptors[name].value;
                                },

                                set: function (value) {
                                    transport.descriptors[name].value = value;
                                }
                            };
                        }

                        document = transport.document;
                        element = document.createElement("<public:property name='" + name + "' get='get_" + id + "' put='put_" + id + "' />");
                        transport.define("get_" + id, descriptor.get);
                        transport.define("put_" + id, descriptor.set);

                        transport.elements[name] = element;

                        document.firstChild.appendChild(element);
                    }
                } else {
                    if (!has.call(descriptor, "value")) {
                        throw new Error("Object.defineProperty() :: Only data descriptors supported on JScript objects");
                    }

                    object[name] = descriptor.value;
                }

                return object;
            });

            util.defineProperty(Object, "getOwnPropertyDescriptor", function (object, name) {
                var transport = object[transportName];

                if (transport) {
                    return has.call(transport.inheriteds, name) ? undef : transport.descriptors[name];
                }

                return has.call(object, name) ? {
                    configurable: true,
                    enumerable: true,
                    value: object[name],
                    writable: true
                } : undef;
            });

            util.defineProperty(Object, "getOwnPropertyNames", function (object) {
                var descriptors,
                    names = [],
                    name,
                    transport;

                if (typeof object !== "object" || object === null) {
                    throw new TypeError("Object.getOwnPropertyNames called on non-object");
                }

                transport = object[transportName];

                if (transport) {
                    descriptors = transport.descriptors;
                    for (name in descriptors) {
                        if (has.call(descriptors, name) && name !== PROTOTYPE) {
                            names.push(name);
                        }
                    }
                } else {
                    for (name in object) {
                        if (has.call(object, name) && name !== PROTOTYPE) {
                            names.push(name);
                        }
                    }
                }

                if (object === Array.prototype) {
                    util.each([
                        "shift", "sort", "concat", "filter",
                        "map", "join", "toString", "push",
                        "reduceRight", "toLocaleString", "constructor", "forEach",
                        "lastIndexOf", "some", "slice", "every",
                        "reverse", "indexOf", "unshift",
                        "reduce", "pop", "splice"
                    ], function (name) {
                        // TODO: Only include members once
                        if (has.call(object, name)) {
                            names.push(name);
                        }
                    });
                } else if (object === Object.prototype) {
                    util.each([
                        /*"constructor", */"toString", "toLocaleString", "valueOf",
                        "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable"
                    ], function (name) {
                        // TODO: Only include members once
                        if (has.call(object, name)) {
                            names.push(name);
                        }
                    });
                }

                return names;
            });

            util.defineProperty(Object, "getPrototypeOf", function (object) {
                var transport = object[transportName];

                return transport ? transport.prototype : (object.constructor ? object.constructor.prototype : null);
            });

            util.defineProperty(Object.prototype, "hasOwnProperty", function (name) {
                var transport = this[transportName];

                if (transport) {
                    return has.call(transport.descriptors, name) && !has.call(transport.inheriteds, name);
                }

                return has.call(this, name);
            });

            util.defineProperty(Object, "keys", function (object) {
                var descriptors,
                    names = [],
                    name,
                    transport = object[transportName];

                if (transport) {
                    descriptors = transport.descriptors;
                    for (name in descriptors) {
                        if (has.call(descriptors, name) && descriptors[name].enumerable) {
                            names.push(name);
                        }
                    }
                } else {
                    for (name in object) {
                        if (has.call(object, name)) {
                            names.push(name);
                        }
                    }
                }

                return names;
            });
        }

        // IE8 does actually provide TypeError, but it behaves oddly, so override it anyway
        (function (TypeError) {
            global.TypeError = function (message) {
                this.message = message;
            };
            global.TypeError.prototype = Object.create(TypeError.prototype);
        }(global.TypeError || global.Error));
    };
});
