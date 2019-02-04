var request = require('request');

var options = {};
options.url = 'http://ec2-54-202-157-179.us-west-2.compute.amazonaws.com:3000/create_engine';
options.method = 'POST';
options.json = {
  engine_name: 'F3',
  hotspot_name: 'hydrant'
};

var mongoose = require('mongoose');
console.log(mongoose.connection.readyState);


request(options, function(err, response, body) {
  if (!err && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log('error', err);
  }
});
