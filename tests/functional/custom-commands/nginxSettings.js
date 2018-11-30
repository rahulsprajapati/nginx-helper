/* @author: Prabuddha Chakraborty */

exports.command = function(url, username, password) {
  var client = this;
  var data = client.globals;
  var dash = data.URLS.LOGIN + 'wp-admin/options-general.php?page=nginx'
  client
    .pause(1000)
    .url(dash)
    .getTitle(function(title) {
      // console.log("We are in nginx settings Page :" + title);
      console.log("Nginx Helper ‹ nginx — WordPress" + title);
    })

  return this;
};
