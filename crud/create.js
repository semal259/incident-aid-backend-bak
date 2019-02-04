var _ = require('underscore');

var models = require('../models');

exports.create_user = function(_user, res) {
	var mongoose = require('mongoose');
console.log(mongoose.connection.readyState);
  var user = new models.User(_user);
  user.save(function(err, user) {
    if(err) {
      res.status(400);
    } else {
      res.status(200);
    }
  });
};

exports.create_event = function(_event, res) {
  console.log('_event', _event);
  models.Incident.find({end_time: "empty"}, function(err, docs) {
    if(err) {
      console.log('error in finding recent incident');
    } else {
      var _incident_id = docs[0]._id;
      _event._incident_id = _incident_id;
      var event = new models.Event(_event);
      event.save(function(err, event) {
        if(err) {
          res.send(400);
        } else {
          res.send(200);
        }
      });
    }
  });

};

exports.create_incident = function(_incident, res) {
  var incident = new models.Incident(_incident);
  incident.save(function(err, incident) {
    if(err) {
      res.send(400);
    } else {
      res.send(200);
    }
  });
};

exports.create_engine = function(_engine, res) {
  var engine = new models.Engine(_engine);
  engine.save(function(err, engine) {
    if(err) {
      res.send(400);
    } else {
      res.send(200);
    }
  });
};

exports.create_image = function(_image, res) {
  models.Incident.find({end_date: 'empty'}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      if(_.isEmpty(docs)) {
        res.send(400);
      } else {
        _image.incident_id = docs[0].id;
        var image = new models.Image(_image);
        image.save(function(err, image) {
          if(err) {
            res.send(400);
          } else {
            res.send(200);
          }
        });
      }
    }
  });
};
