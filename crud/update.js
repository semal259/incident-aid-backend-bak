var models = require('../models');
var _ = require('underscore');

//1
exports.update_user_by_user_name = function(_user_n, _password, _job_role,
                                            _r,  _contact, _engine_name,
                                            res) {
  var update_object = {};
  if(_user_n) {update_object.user_n = _user_n;}
  if(_password) {update_object.password = _password;}
  if(_job_role) {update_object.job_role = _job_role;}
  if(_r) {update_object.r = _r;}
  if(_contact) {update_object.contact = _contact;}
  if(_engine_name) {update_object.engine_name = _engine_name;}

  models.User.update({user_n: _user_n}, update_object,
                    function(err) {
    if(err) {
      res.send(400);
    } else {
      res.send(200);
    }
  });
};

//2
exports.update_incident_by_incident_name = function(_incident_name, _commander, _firefighters,
                                   _lt, _lg, _street, _city, _state,
                                   _zip, _start_time, _end_time, _time_stamp,
                                   res) {
  var update_object = {};
  if(_incident_name) {update_object.incident_name = _incident_name;}
  if(_firefighters) {update_object.firefighters = _firefighters;}
  if(_lt) {update_object.lt = _lt;}
  if(_lg) {update_object.lg = _lg;}
  if(_street) {update_object.street = _street;}
  if(_city) {update_object.city = _city;}
  if(_state) {update_object.state = _state;}
  if(_zip) {update_object.zip = _zip;}
  if(_start_time) {update_object.start_time = _start_time;}
  if(_end_time) {update_object.end_time = _end_time;}
  if(_time_stamp) {update_object.time_stamp = _time_stamp;}
  if(_commander) {update_object.commander = _commander;}

  models.Incident.update({incident_name: _incident_name}, update_object, function(err) {
    if(err) {
      res.send(400);
    } else {
      res.send(200);
    }
  });
};

//3
exports.update_incident_commander = function(_incident_name, _user_n, res) {
  var _firefighters;
  models.Incident.find({incident_name: _incident_name}, function(err, docs) {
    _firefighters = docs[0].firefighters.slice();
    _firefighters.push(docs[0].commander);
    models.Incident.update({incident_name: _incident_name},
                          {commander: _user_n, firefighters: _firefighters},
                          function(err) {
      if(err) {
        res.send(400);
      } else {
        res.send(200);
      }
    });
  });
};

//4
exports.update_engine_by_engine_name = function(_engine_name, _hotspot_name, res) {
  var update_object = {};
  if(_engine_name) {update_object.engine_name = _engine_name;}
  if(_hotspot_name) {update_object.hotspot_name = _hotspot_name;}
  models.Engine.update({engine_name: _engine_name}, update_object,
                      function(err) {
      if(err) {
        res.send(400);
      } else {
        res.send(200);
      }
  });
};




exports.authenticate_user = function(_user_n, _password, _contact, _engine_name, res) {
  console.log('_user_n: ', _user_n);
  console.log('_password: ', _password);
  console.log('_contact: ', _contact);
  console.log('_engine_name: ', _engine_name);
  models.User.find({user_n: _user_n}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      try {
        var user = docs[0];
        if(user.user_n == _user_n &&
           user.password == _password) {
           models.User.update({user_n: _user_n},
                             {contact: _contact, engine_name: _engine_name},
                             function(err) {
            if(err) {
              res.send(400);
            } else {
              res.send(200);
            }
          });
        } else {
          res.send(400);
        }
     } catch(err) {
       res.send(400);
     }
    }
  });
};
