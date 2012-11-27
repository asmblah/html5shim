require({
    paths: {
        "js": "/../../../js",
        "bdd": ".",
        "vendor": "../../vendor"
    }
}, [
    "bdd/shims/es5/ObjectTest"
], function () {
    "use strict";

    mocha.run();
});
