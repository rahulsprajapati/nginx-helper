exports.command = function() {
  var client = this;
  var data = client.globals;
  var loginurl = data.URLS.LOGIN + 'wp-admin';
  var username = data.TESTADMINUSERNAME;
  var password = data.TESTADMINPASSWORD;

  client
    .url(loginurl)
    .pause(500)
    .waitForElementVisible('body', 2000)
    .pause(800)
    .setValue('input[id="user_login"]', username)
    .setValue('input[id="user_pass"]', password)
    .click('input[type=submit]')
    .pause(5000);

  return this;
};
