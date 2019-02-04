var twilio_config = require('../config').twilio_config;
var twilio_client = twilio_config.client;

exports.send_sms = function(_to, _body) {
console.log('trying to send SMS')
  twilio_client.sms.messages.post({
    to: _to,
    from: twilio_config.from,
    body: _body
  }, function(err, text) {
    if(err) {
      console.log('Sending sms error');
    } else {
      console.log('Status', text.status);
      console.log('Message', text.body);
    }
  });
};
