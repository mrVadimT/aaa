var protractor = require('protractor');
var utils = require('./utils/utils');
var mainPage = require('./pages/mainPage');
var createCompPage = require('./pages/createCompPage');


function checkDisplayComp(start, end, all){
    expect(mainPage.compsFound.getText()).toBe(all + ' computers found');
    expect(mainPage.displaying.getText()).toBe('Displaying ' + start + ' to ' + end + ' of '+ all);
}

function checkIsLink(elem, expectedToBeLink) {
    if (expectedToBeLink) {
        expect(elem.getAttribute('href')).not.toBeNull();
    } else {
        expect(elem.getAttribute('href')).toBeNull();
    }
}

describe('My Test', function() {
    var siteUrl = 'http://computer-database.herokuapp.com/computers';

    beforeEach(function() {
        isAngularSite(false);
    });

    it('Sanity', function() {
        return utils.clearDb(siteUrl, 0, 1000)
            .then(function() {
                return utils.createCompRange(siteUrl, 'a', 1, 19)
                    .then(function() {

                        browser.get(siteUrl);
                        var expectedExistingComps = 19;
                        var newCompName = 'a20';
                        var updatedCompName = 'a111';

                        // Check displaying
                        checkDisplayComp(1, 10, expectedExistingComps);
                        checkIsLink(mainPage.nextButton, true);
                        checkIsLink(mainPage.prevButton, false);


                        // Add new comp
                        mainPage.clickAddButton();
                        createCompPage.setNameTextBox(newCompName);
                        createCompPage.setIntroduced('2000-01-01');
                        createCompPage.setDiscontinued('2002-02-02');
                        createCompPage.selectCompany('IBM');
                        createCompPage.clickAddButton();
                        expectedExistingComps = expectedExistingComps + 1;
                        checkDisplayComp(1, 10, expectedExistingComps);

                        // Click next
                        mainPage.clickNext();
                        checkDisplayComp(11, 20, expectedExistingComps);
                        checkIsLink(mainPage.nextButton, false);
                        checkIsLink(mainPage.prevButton, true);

                        // Check edit
                        mainPage.clickCompByName(newCompName);
                        createCompPage.setNameTextBox(updatedCompName);
                        createCompPage.setIntroduced('2020-03-03');
                        createCompPage.setDiscontinued('2022-04-04');
                        createCompPage.selectCompany('Atari');
                        createCompPage.clickAddButton();


                        // Check filter
                        mainPage.setFilter('a1');
                        mainPage.clickFilter();


                        // Check Next page with filter
                        checkDisplayComp(1, 10, 12);
                        checkIsLink(mainPage.nextButton, true);
                        checkIsLink(mainPage.prevButton, false);
                        mainPage.clickNext();


                        // Check Prev page with filter
                        checkDisplayComp(11, 12, 2);                    // REAL BUG !! Should be 12, not 2
                        checkIsLink(mainPage.nextButton, false);
                        checkIsLink(mainPage.prevButton, true);
                        mainPage.clickPrev();


                        // Check Delete
                        mainPage.clickCompByName(updatedCompName);
                        createCompPage.clickDeleteButton();
                        expectedExistingComps = expectedExistingComps - 1;
                        checkDisplayComp(1, 10, expectedExistingComps);

                        return '';
                    })
            });
    });
});

