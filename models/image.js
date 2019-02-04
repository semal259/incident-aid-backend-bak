var mongoose = require('mongoose');


try {
  module.exports = mongoose.model('Image');
} catch(err) {
  module.exports = mongoose.model('Image', {
    incident_id: mongoose.Types.ObjectId,
    contentType: String,
    full: Buffer
  });
}
