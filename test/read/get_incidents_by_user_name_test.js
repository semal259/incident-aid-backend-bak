var request = require('request');

var options = {};
options.url = 'http://107.170.238.227:3000/get_incidents_by_user_name';
options.method = 'POST';
options.json = {
  user_name: 'rahul'
};

request(options, function(err, response, body) {
  if (!err && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log('error', err);
  }
});
