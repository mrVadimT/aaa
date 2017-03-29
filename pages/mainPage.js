var utils = require('../utils/utils');

var mainPage = {};

mainPage.compsFound = element(by.xpath("//body/*[@id='main']/h1"));
mainPage.filterTextBox = element(by.id('searchbox'));
mainPage.filterButton = element(by.id('searchsubmit'));
mainPage.addButton = element(by.id('add'));
mainPage.displaying = element(by.className('current')).element(by.tagName('a'));
// mainPage.nextButton = element(by.className('next'));
mainPage.nextButton = element(by.partialLinkText('Next'));
mainPage.prevButton = element(by.partialLinkText('Previous'));
mainPage.compTable = element(by.tagName('tbody'));

mainPage.clickCompByName = function(compName) {
    utils.clickOn(element(by.partialLinkText(compName)));
};

mainPage.getAllCompByName = function(compName) {
    return mainPage.compTable.all(by.partialLinkText(compName));
};

mainPage.setFilter = function(input) {
    utils.sendKeys(mainPage.filterTextBox, input);
};

mainPage.clickFilter = function() {
    utils.clickOn(mainPage.filterButton);
};

mainPage.clickAddButton = function () {
    utils.clickOn(mainPage.addButton);
};

mainPage.clickNext = function() {
    utils.clickOn(mainPage.nextButton);
};

mainPage.clickPrev = function() {
    utils.clickOn(mainPage.prevButton);
};


module.exports = mainPage;