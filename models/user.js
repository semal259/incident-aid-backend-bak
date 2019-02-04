var mongoose = require('mongoose');


try {
  module.exports = mongoose.model('User');
} catch(err) {
  module.exports = mongoose.model('User', {
    user_n: String,
    password: String,
    job_role: String,
    r: String,
    contact: String,
    engine_name: String,
  });
}
