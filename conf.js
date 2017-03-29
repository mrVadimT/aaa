exports.config = {

    onPrepare: function() {
        global.dvr = browser.driver;
        global.isAngularSite = function(flag) {
            browser.ignoreSynchronization = !flag;
        };
    },

    capabilities: {
        'browserName': 'chrome'
    },

    specs: ['tests.js'],

    jasmineNodeOpts: {
        defaultTimeoutInterval: 120000,
        showColors: true
    }
};

