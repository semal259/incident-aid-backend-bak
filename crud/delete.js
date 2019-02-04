var models = require('../models');

//1
exports.delete_user = function(_user_n, res) {
  models.User.remove({user_n: _user_n}, function(err) {
    if(err) {
      if(res) { res.send(400); }
      else { return false; }
    } else {
      if(res) { res.send(200); }
      else { return true; }
    }
  });
};

//2
exports.delete_event = function(_id, res) {
  models.Event.remove({_id: _id}, function(err) {
    if(err) {
      if(res) { res.send(400); }
      else { return false; }
    } else {
      if(res) { res.send(200); }
      else { return true; }
    }
  });
};

//3
exports.delete_incident = function(_incident_name, res) {
  models.Incident.remove({incident_name: _incident_name}, function(err) {
    if(err) {
      if(res) { res.send(400); }
      else { return false; }
    } else {
      if(res) { res.send(200); }
      else { return true; }
    }
  });
};

//4
exports.delete_engine = function(_engine_name, res) {
  models.Engine.remove({engine_name: _engine_name}, function(err) {
    if(err) {
      if(res) { res.send(400); }
      else { return false; }
    } else {
      if(res) { res.send(200); }
      else { return true; }
    }
  });
};
