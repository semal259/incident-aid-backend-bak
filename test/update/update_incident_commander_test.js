var request = require('request');

var options = {};
options.url = 'http://107.170.238.227:3000/update_incident_commander';
options.method = 'POST';
options.json = {
  'incident_name': 'fire 3',
  'user_name': 'ahmed'
};

request(options, function(err, response, body) {
  if(!err && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log('error', err);
  }
});
