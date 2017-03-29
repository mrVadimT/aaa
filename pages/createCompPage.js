var utils = require('../utils/utils');

var createCompPage = {};

createCompPage.nameTextBox = element(by.id('name'));
createCompPage.introducedTextBox = element(by.id('introduced'));
createCompPage.discontinuedTextBox = element(by.id('discontinued'));
createCompPage.companyCombo = element(by.id('company'));
createCompPage.createButton = element(by.className('btn primary'));
createCompPage.cancelButton = element(by.className('btn'));
createCompPage.deleteButton = element(by.className('btn danger'));

createCompPage.getNameTextBox = function () {
    utils.waitForElement(createCompPage.nameTextBox);
    return createCompPage.nameTextBox.getText();
};

createCompPage.setNameTextBox = function (input, shouldClear) {
    utils.sendKeys(createCompPage.nameTextBox, input, shouldClear);
};

createCompPage.setIntroduced = function(input, shouldClear) {
    utils.sendKeys(createCompPage.introducedTextBox, input, shouldClear);
};

createCompPage.setDiscontinued = function(input, shouldClear) {
    utils.sendKeys(createCompPage.discontinuedTextBox, input, shouldClear);
};

createCompPage.clickAddButton = function () {
    utils.clickOn(createCompPage.createButton);
};

createCompPage.clickCancelButton = function () {
    utils.clickOn(createCompPage.cancelButton);
};

createCompPage.clickDeleteButton = function () {
    utils.clickOn(createCompPage.deleteButton);
};

createCompPage.clickCompmanyCombo = function () {
    utils.clickOn(createCompPage.companyCombo);
};

createCompPage.selectCompany = function (companyName) {
    createCompPage.clickCompmanyCombo();

    createCompPage.companyCombo.all(by.tagName('option')).filter(function (companyNameOption){
        return companyNameOption.getText().then(function(text){
            return text === companyName;
        });
    }).then(function (filteredElements) {
        utils.clickOn(filteredElements[0]);
    });
};

createCompPage.selectCompanyRandom = function () {
    function randomInt(min, max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    createCompPage.clickCompmanyCombo();

    createCompPage.companyCombo.all(by.tagName('option')).filter(function (companyNameOption){
        return companyNameOption.getAttribute('value').then(function(val){
            return val.length > 0;
        });
    }).then(function (filteredElements) {
        utils.clickOn(filteredElements[randomInt(0, filteredElements.length-1)]);
    });
};



module.exports = createCompPage;

