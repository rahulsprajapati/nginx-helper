/* @author: Prabuddha Chakraborty */
global.urlp;
module.exports = {
  'Step One : Configure nginx-helpers settings from dashboard ': function(browser) {
    var data = browser.globals;
    browser
      .maximizeWindow()
      .wplogin()
      .nginxSettings()
      .pause(2000)
      .getAttribute('#enable_purge', "checked", function(result) {
        if (result.value) {
          console.log('check box is already enabled');
        } else {

          browser.click('#enable_purge');
          browser.click('#smart_http_expire_save');
        }
      })
      .enableAllPurgeCheckbox()
      .pause(1000)
      .click('#purge_method_get_request')
      .click('#smart_http_expire_save')
      .pause(1000)
},
  'step two: Create page & check on frontend test ': function(browser) {
    var data = browser.globals;
    browser
      .goToAddNewPage()
      .clearValue('#title')
      .setValue('#title', 'test-page')
      .execute('tinyMCE.activeEditor.setContent("test page created for testing");')
      .pause(1000)
      .click('#publish')
      .pause(2000)
      .getText("#editable-post-name", function(result) {
        urlp = result.value;
        console.log('From steps 2 - ulrp value = ' + data.URLS.LOGIN + urlp);
        browser
        .wplogout()
        .pause(500)
        .url(data.URLS.LOGIN + urlp)
        .assert.containsText(".entry-content", "test page created for testing")
      })

  },

  'Step three : Update Content in Page & check on frontend': function(browser) {
    var data = browser.globals;

    browser

      .wplogin()
      .url(data.URLS.LOGIN + urlp)
      .click('.post-edit-link')
      .clearValue('#title')
      .setValue('#title', "test page title updated")
      .click('#publish')
      .pause(2000)
      .wplogout()
      .url(data.URLS.LOGIN + urlp)
      .verify.containsText(".entry-title", "TEST PAGE TITLE UPDATED")
      .verify.containsText(".entry-content", "test page created for testing")

},

  'Step four : Page comment check ': function(browser) {
    var data = browser.globals;
    browser
      // .wplogin(data.URLS.LOGIN, data.TESTADMINUSERNAME, data.TESTADMINPASSWORD)
      .wplogin()
      .url(data.URLS.LOGIN + urlp)
      .click('.post-edit-link')
      .getAttribute('#comment_status', "checked", function(result) {
        if (result.value) {
          console.log('check box is already enabled');
        } else {
          browser.click('#comment_status');
          browser.click('#publish');
        }
      })

      .url(data.URLS.LOGIN + urlp)
      .setValue('textarea[name="comment"]', 'this is a demo test comment on page')
      .click('input[value="Post Comment"]')
      .assert.containsText("#main", "this is a demo test comment on page")
      .wplogout()
      .url(data.URLS.LOGIN + urlp)
      .assert.containsText("#main", "this is a demo test comment on page")
},

  'Step five : Move to trash test ': function(browser) {
    var data = browser.globals;
    browser
      .wplogin()

      .url(data.URLS.LOGIN + urlp)
      .click('.post-edit-link')
      .click('xpath', '//a[text()="Move to Trash"]')
      .pause(2500)
      .wplogout()
      .url(data.URLS.LOGIN + urlp);
      browser.expect.element('#main').text.to.not.contain("this is a demo test comment on page");
      browser.end();
  }


};
