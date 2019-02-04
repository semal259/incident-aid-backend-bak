var request = require('request');
var _ = require('underscore');

var options = {};
options.url = 'http://ec2-54-202-157-179.us-west-2.compute.amazonaws.com:3000/create_event';
options.method = 'POST';
options.json = {
  user_n: 'nelson',
  r: 1,
  tp: 1,
  m: 1,
  lt: 0,
  lg: 0,
  tk: 'asdf',
  ts: _.now().toString()
};

request(options, function(err, response, body) {
  if (!err && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log('error', err);
  }
});
