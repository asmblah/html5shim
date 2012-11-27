define([
    "vendor/chai/chai"
], function (
    chai
) {
    "use strict";

    var expect = chai.expect;

    describe("Object", function () {
        var obj;

        beforeEach(function () {
            obj = Object.create(Object.prototype, {});
        });

        describe("create", function () {
            it("should return an Object", function () {
                expect(Object.create(Object.prototype, {})).to.be.an("object");
            });
        });

        describe("defineProperty", function () {
            it("should throw a TypeError if given a null descriptor", function () {
                expect(function () {
                    Object.defineProperty(obj, "prop", null);
                }).to.Throw(TypeError);
            });

            it("should support 'length' property", function () {
                Object.defineProperty(obj, "length", {
                    get: function () {
                        return 7;
                    }
                });

                expect(obj.length).to.equal(7);
            });

            it("should support numeric property names", function () {
                Object.defineProperty(obj, 7, {
                    get: function () {
                        return 5;
                    }
                });

                expect(obj[7]).to.equal(5);
            });

            it("should correctly handle only configurable being specified", function () {
                Object.defineProperty(obj, "me", {
                    configurable: true
                });

                expect(Object.getOwnPropertyDescriptor(obj, "me")).to.deep.equal({
                    configurable: true,
                    enumerable: false,
                    value: undefined,
                    writable: false
                });
            });

            it("should correctly handle only enumerable being specified", function () {
                Object.defineProperty(obj, "me", {
                    enumerable: true
                });

                expect(Object.getOwnPropertyDescriptor(obj, "me")).to.deep.equal({
                    configurable: false,
                    enumerable: true,
                    value: undefined,
                    writable: false
                });
            });

            describe("for a data descriptor", function () {
                it("should default 'configurable' data descriptor attribute to false", function () {
                    Object.defineProperty(obj, "parent", {
                        value: "guardian"
                    });

                    expect(Object.getOwnPropertyDescriptor(obj, "parent").configurable).to.equal(false);
                });

                it("should default 'enumerable' data descriptor attribute to false", function () {
                    Object.defineProperty(obj, "parent", {
                        value: "guardian"
                    });

                    expect(Object.getOwnPropertyDescriptor(obj, "parent").enumerable).to.equal(false);
                });

                it("should default 'writable' data descriptor attribute to false", function () {
                    Object.defineProperty(obj, "parent", {
                        value: "guardian"
                    });

                    expect(Object.getOwnPropertyDescriptor(obj, "parent").writable).to.equal(false);
                });

                it("should work with existing DOM objects", function () {
                    var obj = document.createElement("span");

                    Object.defineProperty(obj, "prop", {
                        value: 9
                    });

                    expect(obj.prop).to.equal(9);
                });

                it("should work with property names containing symbols", function () {
                    var name = "Welcome, to @{here}!";

                    Object.defineProperty(obj, name, {
                        value: 2
                    });

                    expect(obj[name]).to.equal(2);
                });

                it("should include enumerable properties in (filtered) for..in loops", function () {
                    Object.defineProperty(obj, "enum-me", {
                        value: 3,
                        enumerable: true
                    });

                    expect((function () {
                        var name;

                        for (name in obj) {
                            if (obj.hasOwnProperty(name)) {
                                if (name === "enum-me") {
                                    return true;
                                }
                            }
                        }
                    }())).to.be["true"];
                });

                /*it("should exclude non-enumerable properties from (filtered) for..in loops", function () {
                    Object.defineProperty(obj, "dont-enum-me", {
                        value: 71,
                        enumerable: false
                    });

                    expect((function () {
                        var name;

                        for (name in obj) {
                            if (obj.hasOwnProperty(name)) {
                                if (name === "dont-enum-me") {
                                    return false;
                                }
                            }
                        }
                    }())).to.not.be["false"];
                });*/
            });

            describe("for an accessor descriptor", function () {
                /*it("should work with existing DOM objects", function () {
                    var obj = document.createElement("span");

                    Object.defineProperty(obj, "youvechosenprop", {
                        get: function () {
                            return 22;
                        }
                    });

                    expect(obj.youvechosenprop).to.equal(22);
                });*/

                it("should work with property names containing symbols", function () {
                    var name = "Welcome, to @{here}!";

                    Object.defineProperty(obj, name, {
                        get: function () {
                            return "hello";
                        }
                    });

                    expect(obj[name]).to.equal("hello");
                });

                it("should include enumerable properties in (filtered) for..in loops", function () {
                    Object.defineProperty(obj, "enum-me", {
                        get: function () {
                            return 4;
                        },
                        enumerable: true
                    });

                    expect((function () {
                        var name;

                        for (name in obj) {
                            if (obj.hasOwnProperty(name)) {
                                if (name === "enum-me") {
                                    return true;
                                }
                            }
                        }
                    }())).to.be["true"];
                });

                /*it("should exclude non-enumerable properties from (filtered) for..in loops", function () {
                    Object.defineProperty(obj, "dont-enum-me", {
                        get: function () {
                            return 9;
                        },
                        enumerable: false
                    });

                    expect((function () {
                        var name;

                        for (name in obj) {
                            if (obj.hasOwnProperty(name)) {
                                if (name === "dont-enum-me") {
                                    return false;
                                }
                            }
                        }
                    }())).to.not.be["false"];
                });*/

                it("should support throwing errors from inside a getter"/*, function () {
                    var error = new Error("Oh noes!");

                    Object.defineProperty(obj, "i'm gonna throw", {
                        get: function () {
                            throw error;
                        }
                    });

                    expect(function () {
                        obj["i'm gonna throw"];
                    }).to.Throw(error);
                }*/);

                it("should support throwing errors from inside a setter"/*, function () {
                    var error = new Error("Oh noes!");

                    Object.defineProperty(obj, "i'm gonna throw", {
                        set: function (value) {
                            throw error;
                        }
                    });

                    expect(function () {
                        obj["i'm gonna throw"] = 7;
                    }).to.Throw(error);
                }*/);
            });
        });

        describe("defineProperties", function () {
            it("should not error when given an empty hash of descriptors", function () {
                Object.defineProperties(obj, {});
            });

            it("should be able to define a single property", function () {
                var descriptor = {
                    configurable: true,
                    enumerable: true,
                    value: "Frank",
                    writable: true
                };

                Object.defineProperties(obj, {
                    name: descriptor
                });

                expect(Object.getOwnPropertyDescriptor(obj, "name")).to.deep.equal(descriptor);
            });
        });

        describe("getOwnPropertyDescriptor", function () {
            describe("for a data descriptor", function () {
                it("should return all relevant descriptor attributes", function () {
                    Object.defineProperty(obj, "parent", {
                        value: "guardian"
                    });

                    expect(Object.getOwnPropertyDescriptor(obj, "parent")).to.deep.equal({
                        configurable: false,
                        enumerable: false,
                        value: "guardian",
                        writable: false
                    });
                });

                it("should specify the value of a property defined by assignment", function () {
                    obj.a_prop = 3;

                    expect(Object.getOwnPropertyDescriptor(obj, "a_prop").value).to.equal(3);
                });
            });

            describe("for an accessor descriptor", function () {
                it("should have a 'get' attribute", function () {
                    Object.defineProperty(obj, "moon", {
                        get: function () {
                            return 7;
                        }
                    });

                    expect(Object.getOwnPropertyDescriptor(obj, "moon")).to.have.property("get");
                });
            });
        });

        describe("getOwnPropertyNames", function () {
            it("should include the name of a defined property", function () {
                obj.a = 1;

                expect(Object.getOwnPropertyNames(obj)).to.include("a");
            });

            it("should include the name of a defined numeric property", function () {
                obj[7] = 1;

                expect(Object.getOwnPropertyNames(obj)).to.include("7");
            });

            it("should not include the name of an undefined property", function () {
                obj.b = 1;

                expect(Object.getOwnPropertyNames(obj)).to.not.include("fred");
            });

            it("should include standard members for Array.prototype");

            it("should include standard members for Object.prototype");
        });

        describe("getPrototypeOf", function () {
            it("should return null for an object inheriting from null", function () {
                var obj = Object.create(null, {});

                expect(Object.getPrototypeOf(obj)).to.equal(null);
            });

            it("should return Object.prototype for an object inheriting from Object.prototype", function () {
                var obj = Object.create(Object.prototype, {});

                expect(Object.getPrototypeOf(obj)).to.equal(Object.prototype);
            });

            it("should return the prototype object for an object inheriting from an object", function () {
                var parent = {},
                    obj = Object.create(parent, {});

                expect(Object.getPrototypeOf(obj)).to.equal(parent);
            });
        });

        describe("hasOwnProperty", function () {
            it("should return true for an enumerable own property");

            it("should return true for a non-enumerable own property");

            it("should return false for an enumerable inherited property");

            it("should return false for a non-enumerable inherited property");

            it("should return true for 'appendChild' when 'appendChild' is a defined enumerable own property", function () {
                Object.defineProperty(obj, "appendChild", {
                    enumerable: true,
                    get: function () {
                        return 7;
                    }
                });

                expect(obj.hasOwnProperty("appendChild")).to.equal(true);
            });

            it("should return true for 'appendChild' when 'appendChild' is a defined non-enumerable own property", function () {
                Object.defineProperty(obj, "appendChild", {
                    enumerable: false,
                    get: function () {
                        return 7;
                    }
                });

                expect(obj.hasOwnProperty("appendChild")).to.equal(true);
            });

            it("should return false for 'appendChild' when 'appendChild' is not a defined own property", function () {
                expect(obj.hasOwnProperty("appendChild")).to.equal(false);
            });
        });

        describe("keys", function () {
            describe("for a data descriptor", function () {
                it("should return enumerable properties of the object", function () {
                    var name;

                    Object.defineProperty(obj, "enum-me", {
                        value: 1,
                        enumerable: true
                    });

                    expect(Object.keys(obj)).to.include("enum-me");
                });

                it("should not return non-enumerable properties of the object", function () {
                    var name;

                    Object.defineProperty(obj, "dont-enum-me", {
                        value: 7,
                        enumerable: false
                    });

                    expect(Object.keys(obj)).to.not.include("dont-enum-me");
                });
            });

            describe("for an accessor descriptor", function () {
                it("should return enumerable properties of the object", function () {
                    var name;

                    Object.defineProperty(obj, "enum-me", {
                        get: function () {
                            return 6;
                        },
                        enumerable: true
                    });

                    expect(Object.keys(obj)).to.include("enum-me");
                });

                it("should not return non-enumerable properties of the object", function () {
                    var name;

                    Object.defineProperty(obj, "dont-enum-me", {
                        get: function () {
                            return 21;
                        },
                        enumerable: false
                    });

                    expect(Object.keys(obj)).to.not.include("dont-enum-me");
                });
            });
        });

        describe("__proto__", function () {
            it("should handle null prototype", function () {
                obj.prototype = null;
            });

            it("should remove properties inherited from previous prototype when prototype is changed", function () {
                obj.__proto__ = {
                    test: 3
                };

                obj.__proto__ = null;

                expect(obj.test).to.be.undefined;
            });
        });

        describe("shim object behaviour", function () {
            it("should allow assigning to a property called 'parentNode'"/*, function () {
                expect(function () {
                    obj.parentNode = 8;
                }).to.not.Throw();
            }*/);

            it("should return undefined as value for property 'appendChild' by default"/*, function () {
                expect(obj.appendChild).to.be.undefined;
            }*/);

            it("should retain the specified value when assigning to a property called 'parentNode'"/*, function () {
                obj.parentNode = 4;
                expect(obj.parentNode).to.equal(4);
            }*/);
        });
    });
});
