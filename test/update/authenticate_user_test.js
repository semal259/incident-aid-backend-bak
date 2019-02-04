var request = require('request');

var options = {};
options.url = 'http://107.170.238.227:5000/authenticate_user';
options.method = 'POST';
options.json = {
  'user_n': 'yaztester1',
  'password': 'qwerty',
  'engine_name': 'T1',
  'contact': '1234'
};

request(options, function(err, response, body) {
  if(!err && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log('error', err);
  }
});
