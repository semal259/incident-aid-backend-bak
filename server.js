var _ = require('underscore');
var bodyParser = require('body-parser');
var querystring = require('query-string');
var express = require('express');
var request = require('request');
var url = require('url');

var crud = require('./crud');
var models = require('./models');
var twilio = require('./twilio');


var app = express();
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/front-end'));

/*
 * COMMANDER DASHBOARD
 */
app.get('/', function(req, res, next) {
   res.sendfile('front-end/index.html');
});

app.get('/jaunt', function(req, res, next) {
  res.sendfile('jaunt/index.html');
});



/*
 * TWILIO SMS ROUTE HANDLER
 */

//Temporary Route

//1
app.post('/twilio_send_sms', function(req, res, next) {
  console.log('twilio send sms');
  var alert = req.body.alert;
  var placeholder_event = {
    'user_n': 'rahul',
    'tp': 1,
    'm': 1,
    'lt': 0,
    'lg': 0,
    'tk': '%$#',
    'ts': _.now().toString()
  };
  //var people = ['+12062257744', '+16509961201', '+16503530259'];
  //var people = ['+16503530259'];
  //var people = ['+18586633468', '+17604696535', '+16503530259'];
  var people = ['+16503808284', '+16503530259'];
  _.each(people, function(number) {
    twilio.send_sms(number, alert);
  });
  crud._create.create_event(placeholder_event, res);
});

//2
app.post('/twilio_receive_sms', function(req, res, next) {
  console.log('twilio receive sms');
  console.log('req.body', req.body);
  var _m = req.body.Body;
  var _from = req.body.From;
  var placeholder_event = {
    'user_n': 'rahul',
    'job_role': 'firefighter',
    'tp': 1,
    'm':  0,
    'lt': 0,
    'lg': 0,
    'tk': '%$#',
    'ts': _.now().toString()
  };
  crud._create.create_event(placeholder_event, res);
});

//3
app.post('/event_sms', function(req, res, next) {
  console.log('req.body', req.body);
  var event = req.body;
  var incident_name = event.incident_name;
  var user_n = event.user_n;
  var role = event.role;
  var tp = event.tp;
  var m = event.m;
  models.Incident.find({incident_name: incident_name}, function(err, docs) {
    if(err) { res.send(400); }
    else {
      var incident = crud._helper.extract_incident(docs[0]);
      models.User.find({ user_n: user_n }, function(err, docs) {
        if(err) { res.send(400); }
        else {
          if(role === 'firefighter') {
            var commander_user_name = incident.commander;
            var commander = docs[0];
            if(tp === 2) {
              twilio.send_sms(commander.contact, tp);
            } else {
              twilio.send_sms(commander.contact, m);
            }
          } else if(role === 'commander') {
            var firefighter_user_names = incident.firefighters;
            //var firefighters = [];
            models.User.find( {user_n: { $in: firefighter_user_names } }, function(err, docs) {
              if(err) { res.send(400); }
              else {
                var firefighters = docs;
                _.each(firefighters, function(firefighter) {
                  twilio.send_sms(firefighter.contact, m);
                });
              }
            });
          } else {
            throw new Error('not firefighter or commander');
          }
          //milestone2: make event for all
          //the commander responses
          crud._create.create_event(event);
          res.send(200);
        }
      });
    }
  });
});



/*
 * CREATE ROUTE HANDLERS
 */

//1
app.post('/create_user', function(req, res, next) {
  console.log('POST /create_user', req.body);
  var user = req.body;
  user.ts = _.now();
  crud._create.create_user(user, res);
});

//2
app.post('/create_event', function(req, res, next) {
  console.log('POST /create_event', req.body);
  var _event = req.body;
  crud._create.create_event(_event, res);
});

//3
app.post('/create_incident', function(req, res, next) {
  console.log('POST /create_incident', req.body);
  var incident = req.body;
  incident.ts = _.now().toString();
  crud._create.create_incident(incident, res);
});

//4
app.post('/create_engine', function(req, res, next) {
  console.log('POST /create_engine', req.body);
  var engine = req.body;
  crud._create.create_engine(engine, res);
});





/*
 * READ ROUTE HANDLERS
 */
//1
app.get('/get_all_users', function(req, res, next) {
  console.log('GET /get_all_users');
  crud._read.get_all_users(res);
});

//2
app.get('/get_all_events', function(req, res, next) {
  console.log('GET /get_all_events');
  crud._read.get_all_events(res);
});

//3
app.get('/get_all_incidents', function(req, res, next) {
  console.log('GET /get_all_incidents');
  crud._read.get_all_incidents(res);
});

//4
app.get('/get_all_engines', function(req, res, next) {
  console.log('GET /get_all_engines');
  crud._read.get_all_engines(res);
});

//5
app.post('/get_user_by_user_name', function(req, res, next) {
  console.log('POST /get_user_by_user_name', req.body);
  var user_n = req.body.user_n;
  crud._read.get_user_by_user_name(user_n, res);
});

//6
app.post('/get_users_by_job_role', function(req, res, next) {
  console.log('POST /get_users_by_job_role');
  var job_role = req.body.job_role;
  crud._read.get_users_by_job_role(job_role, res);
});

//7
app.post('/get_users_by_engine_name', function(req, res, next) {
  console.log('POST /get_users_by_engine_name');
  var engine_name = req.body.engine_name;
  crud._read.get_users_by_engine_name(engine_name, res);
});

//8
app.post('/get_users_by_incident_name', function(req, res, next) {
  console.log('POST /get_users_by_incident_name', req.body);
  var incident_name = req.body.incident_name;
  crud._read.get_users_by_incident_name(incident_name, res);
});

//9
app.post('/get_events_by_incident_name', function(req, res, next) {
  console.log('POST /get_events_by_incident_name', req.body);
  var incident_name = req.body.incident_name;
  crud._read.get_events_by_incident_name(incident_name, res);
});

//10
app.post('/get_events_by_current_incident_and_user_name',
         function(req, res, next) {
  console.log('POST /get_events_by_current_incident_and_user_name', req.body);
  var user_name = req.body.user_name;
  crud._read.get_events_by_current_incident_and_user_name(user_name, res);
});

//11
app.post('/get_events_by_user_name', function(req, res, next) {
  console.log('POST /get_events_by_user_name', req.body);
  var user_n = req.body.user_n;
  crud._read.get_events_by_user_name(user_n, res);
});

//12
app.post('/get_incident_by_incident_name', function(req, res, next) {
  console.log('POST /get_incident_by_incident_name', req.body);
    var incident_name = req.body.incident_name;
    crud._read.get_incident_by_incident_name(incident_name, res);
});

app.get('/get_incident_by_incident_name', function(req, res, next) {
  console.log('GET incident_by_incident_name');
  var query_data = url.parse(req.url, true).query;
  console.log('query_data', query_data);
  if(query_data.incident) {
    console.log('query: ', query_data.incident);
    var incident_name = query_data.incident;
    crud._read.get_incident_by_incident_name(incident_name, res);
  } else { 
    res.send(400);
  }
});



//13
app.post('/get_current_incident_by_user_name', function(req, res, next) {
  console.log('POST /get_incident_by_user_name', req.body);
  var user_n = req.body.user_n;
  crud._read.get_current_incident_by_user_name(user_n, res);
});

//14
app.post('/get_incidents_by_user_name', function(req, res, next) {
  console.log('POST /get_incidents_by_user_name', req.body);
  var user_n = req.body.user_n;
  crud._read.get_incidents_by_user_name(user_n, res);
});

//15
app.post('/get_engine_by_engine_name', function(req, res, next) {
  console.log('POST /get_engine_by_engine_name', req.body);
  var engine_name = req.body.engine_name;
  crud._read.get_engine_by_engine_name(engine_name, res);
});



/*
 * COP Route Handlers
 */

//1 only returns the first one
app.get('/get_current_cop_image', function(req, res, next) {
  console.log('GET /get_current_cop_image');
  crud._read.get_current_cop_image(res);
});

app.post('/post_cop_image_by_current_incident', function(req, res, next) {
  console.log('POST /post cop image by current incident');
  var image = req.body;
  crud._create.post_cop_image_by_current_incident(image, res);
});


/*
 * DELETE ROUTE HANDLERS
 */

//1
app.post('/delete_user_by_user_name', function(req, res, next) {
  console.log('POST /delete_user', req.body);
  var user_n = req.body.user_n;
  crud._delete.delete_user(user_n, res);
});

//2
app.post('/delete_events_by_incident_name', function(req, res, next) {
  console.log('POST /delete_event', req.body);
  var incident_name = req.body.incident_name;
  crud._delete.delete_event(incident_name, res);
});

//3
app.post('/delete_incident_by_incident_name', function(req, res, next) {
  console.log('POST /delete_incident', req.body);
  var incident_name = req.body.incident_name;
  crud._delete.delete_incident(incident_name, res);
});

//4
app.post('/delete_engine_by_engine_name', function(req, res, next) {
  console.log('POST /delete_engine', req.body);
  var engine_name = req.body.engine_name;
  crud._delete.delete_engine(engine_name, res);
});




/*
 * UPDATE ROUTE HANDLERS
 */

//1.
app.post('/update_user_by_user_name', function(req, res, next) {
  console.log('POST /update_user_contact_by_user_name', req.body);
  var user_n = req.body.user_n || null;
  var password = req.body.password || null;
  var job_role = req.body.job_role || null;
  var r = req.body.r || null;
  var contact = req.body.contact || null;
  var engine_name = req.body.engine_name || null;
  crud._update.update_user_by_user_name(user_n, password, job_role,
                                   r, contact, engine_name, res);
});

//2.
app.post('/update_incident_by_incident_name', function(req, res, next) {
  console.log('POST /update_incident_by_incident_name', req.body);
  var incident_name = req.body.incident_name || null;
  var commander = req.body.commander || null;
  var firefighters = req.body.firefighters || null;
  var lt = req.body.lt || null;
  var lg = req.body.lg || null;
  var street = req.body.street || null;
  var city = req.body.city || null;
  var state = req.body.state || null;
  var zip = req.body.zip || null;
  var start_time = req.body.start_time || null;
  var end_time = req.body.end_time || null;
  var ts = req.body.ts || null;
  var user_n = req.body.user_n || null;
  crud._update.update_incident_by_incident_name(incident_name, commander, firefighters, lt,
                               lg, street, city, state, zip, start_time,
                               end_time, ts, res);
});

//3.
app.post('/update_incident_commander', function(req, res, next) {
  console.log('POST /update_incident_commander', req.body);
  var incident_name = req.body.incident_name || null;
  var user_n = req.body.user_n || null;
  crud._update.update_incident_commander(incident_name, user_n, res);
});


//4.
app.post('/update_engine_by_engine_name', function(req, res, next) {
  console.log('POST /update_engine_by_engine_name', req.body);
  var engine_name = req.body.engine_name || null;
  var hotspot_name = req.body.hotspot_name || null;
  crud._update.update_engine_by_engine_name(engine_name, hotspot_name, res);
});




/*
 * AUTHENTICATE ROUTE HANDLER
 */

//1
app.post('/authenticate_user', function(req, res, next) {
  console.log('POST /authenticate_user', req.body);
  var user_n = req.body.user_n;
  var password = req.body.password;
  var engine_name = req.body.engine_name;
  var contact = req.body.contact;
  crud._update.authenticate_user(user_n, password, contact, engine_name, res);
});


/*
 * LAUNCH SERVER
 */
var server = app.listen(3000, function() {
  console.log('IAS Server listening on port: ' + 3000);
});
