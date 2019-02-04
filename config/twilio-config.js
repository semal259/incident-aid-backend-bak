var credentials = {
  'accountSid': 'AC6e67167da97b698a4646ea300dff5018',
  'authToken': '96381d96e1fc719d3cf6e53ed0e77946'
};

exports.endpoint = 'https://api.twilio.com/2010-04-01';
exports.from = '+16503810885';
exports.client = require('twilio')(credentials.accountSid,
                                   credentials.authToken);
