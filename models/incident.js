var mongoose = require('mongoose');


try {
  module.exports = mongoose.model('Incident');
} catch(err) {
  module.exports = mongoose.model('Incident', {
    incident_name: String,
    commander: String,
    firefighters: [String],
    lt: Number,
    lg: Number,
    street: String,
    city: String,
    state: String,
    zip: String,
    start_time: String,
    end_time: String,
    ts: String
  });
}
