const rp = require('request-promise');
var Promise = require('bluebird');
var _ = require('lodash');
var utils = {};
const myTimeout = 30000;

utils.sendKeys = function(elem, keys, shouldClear){
    var clear = shouldClear || true;
    utils.waitForElement(elem);
    if(clear){
        elem.clear()
    }
    elem.sendKeys(keys);
};

utils.waitForElement = function(elem, t){
    var timeout = t || myTimeout;
    dvr.wait(function() {
        return protractor.until.elementIsVisible(elem);
    }, timeout, "Element wasn't found");
};

utils.waitForElementToBeClickable = function(elem, t) {
    var timeout = t || myTimeout;
    var EC = protractor.ExpectedConditions;
    utils.waitForElement(elem, timeout);
    browser.wait(EC.elementToBeClickable(elem), timeout,"  >>>  >>>    Element "+elem+" was not clickable after "+t+ "    <<<  <<<  ");
};

utils.clickOn = function(elem, t){
    utils.waitForElementToBeClickable(elem,t);
    elem.click().then(
        function() {
        },
        function() {
            throw "  >>>  >>>    Element "+elem+" was not clickable  <<<  <<<  ";
        }
    );
};

utils.selectFromCombo= function(id,text){
    element(by.id(id)).click();
    element(by.id(id)).element(by.cssContainingText("*",text)).click();
};

utils.clearDb= function (url, from, to) {
    to = to + 1;
    const arr = _.range(from, to);
    console.log('start deletion' + arr);
    return Promise.all(arr.map(
        function(element) {
            var options = {
                method: 'POST',
                uri: url + '/' + element + '/delete',
                form: {

                },
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Set automatically
                }
            };
            return rp(options)
            // return axios.post(url + '/' + element + '/delete')
                .then(function(){
                    return element.name;
                })
                .catch(function (err) {
                    // POST failed...
                    return err;
                })
                .finally(function () {
                    console.log('finish deleted comp ' + element);
                });
        })
    );
};

utils.createCompRange = function (url, name, from, to) {
    to = to + 1;
    const arr = _.range(from, to);
    const data = _.map(arr, function (n) {
        return {'name': name+n, 'introduced': '2000-10-01', 'discontinued': '2020-10-10', 'company': n % 20};
    });

    return Promise.all(data.map(
        function(element) {
            console.log('start adding comp ' + element.name);
            var options = {
                method: 'POST',
                uri: url,
                form: element,
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Set automatically
                }
            };
            return rp(options)
                .then(function () {
                    return element.name;
                })
                .catch(function (err) {
                    // POST failed...
                    return err;
                })
                .finally(function () {
                    console.log('finish add comp ' + element.name);
                });
        }))
};


module.exports = utils;