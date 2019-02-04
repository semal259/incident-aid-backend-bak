var request = require('request');
var _ = require('underscore');

var options = {};
options.url = 'http://ec2-54-202-157-179.us-west-2.compute.amazonaws.com:3000/create_incident';
options.method = 'POST';
options.json = {
  incident_name: 'I4',
  commander: 'nelson',
  firefighters: ['gerard', 'rahul', 'vicky'],
  street: 'Maiden Lane',
  city: 'San Francisco',
  state: 'CA',
  zip: '94301',
  start_time: '10',
  end_time: 'empty',
  lt: 37.3507616,
  lg: -121.9363926,
  ts: _.now().toString()
};

request(options, function(err, response, body) {
  if (!err && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log('error', err);
  }
});
