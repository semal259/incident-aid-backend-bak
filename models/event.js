var mongoose = require('mongoose');


try {
  module.exports = mongoose.model('Event');
} catch(err) {
  module.exports = mongoose.model('Event', {
    _incident_id: mongoose.Schema.Types.ObjectId,
    user_n: String,
    r: Number,
    tp: Number,
    m: Number,
    lt: Number,
    lg: Number,
    tk: String,
    ts: String
  });
}
