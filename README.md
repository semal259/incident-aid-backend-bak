#INCIDENT AID SERVER
##RESTFUL API INTERFACE

###GENERAL
1. The server is hosted on Digital Ocean
2. https://cloud.digitalocean.com/droplets/2289696
3. host address: 104:131:135:109:3000

###SERVER LOGIN
1. `ssh root@104.131.135.109`
2. password: _DIGI..._
3. check if the node process is already running
   1. `ps -a` (check for a node process)
   2. whatsapp the team and ask if someone is using it
   3. `kill -9 <pid>` (process id)
4. `node server.js` ===> IAS server is running on port 3000

###MONGO HQ LOGIN
1. url: _www.mongohq.com_
2. login: _cecile.peraire@sv.cmu.edu_
3. password: _MONG..._
4. database name: _fire logs_

###SCHEMA TRANSLATION
```javascript
{
 user_n: 'Joe123', (String)
 r: 1,  (Number: 1-commander, 2-responder)
 tp: 1, (Number: 1-REQ, 2-ACK, 3-COP)
 m: 1,  (Number: 1-Vacate, 2-Mayday, 3-Par, 4-RescueInProg,
                 5-UtilitiesOff, 6-UtilitiesOn, 7-VertVent,
                 8-CrossVent, 9-AllClear, 10-LifeHaz)
 lt: 40.00001, (Number)
 lg: -70.00001, (Number)
 tk: '0x1234', (Number)
 ts: '1405669256973' (String)
}
```

1. job_role = `['firefighter', 'commander']`
2. contact = `'+16503530259'`
3. IAS server auto-generates `ts`, no need to `POST`
4. IAS server returns empty objects `{}` if there is nothing that matches
   the query.
5. All non return type endpoints return `200` on success
6. All endpoints return `400` on failure

###SCHEMAS

####User
```javascript
{
 user_n: String,
 password: String,
 job_role: String,
 r: Number,
 contact: String,
 engine_name: String
}
```

####Event
```javascript
{
 user_n: String,
 r: Number,
 tp: Number,
 m: Number,
 lt: Number,
 lg: Number,
 tk: String,
 ts: String
}
```

####Incident
```javascript
{
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
}
```

####Engine
```javascript
{
  engine_name: String,
  hotspot_name: String
}
```

####Image
```
{
  incident_id: mongoose.Types.ObjectId() //hidden
  contentType: String, ('jpeg')
  data: Buffer
}
```

###COMMANDER DASHBOARD
**/**
`GET`


###SMS-TWILIO
1. **/twilio_send_sms** _POST_ expects
```javascript
{
  user_n: String,
  r: Number,
  tp: Number,
  m: Number,
  lt: Number,
  lg: Number,
  tk: String
}
```
2. **/twilio_receive_sms**
   (Invisible to the user, handled by the server)

1. If the job role is a commander, the message will be sent to the
   firefighters in that particular incident.
2. If the incident role is a firefighter, the message will be sent to the
   commander in that particular incident.

###CREATE
1. **/create_user**  `POST` _TESTED_ expects
```javascript
{
  user_n: String,
  password: String
}
```

2. **/create_event** `POST` _TESTED_ expects
```javascript
{
  user_n: String,
  r: Number,
  tp: Number,
  m: Number,
  lt: Number,
  lg: Number,
  tk: String,
  ts: String
}
```

3. **/create_incident** `POST` _TESTED_ expects
```javascript
{
  incident_name: 'greer',
  commander: 'jason',
  firefighters: ['rahul', 'yaz', 'gerard'],
  street: 'Maiden Lane',
  city: 'San Francisco',
  state: 'CA',
  zip: '94303',
  start_time: '10',
  end_time: 'empty',
  lt: 0,
  lg: 0,
  ts: '140566925697'
}
```

4. **/create_engine** `POST` _TESTED_ expects
```javascript
{
  engine_name: 'clifford',
  hotspot: 'truck #4'
}
```



###READ
1. **/get_all_users** `GET` _TESTED_ 
   1. Returns `[{user}, {user}, {user}, ...]`
   2. user object => refert to _User_ schema ^

2. **/get_all_events** `GET` _TESTED_ 
   1. Returns `[{event}, {event}, {event}, ...]`
   2. event object ==> refer to _Event_ schema ^

3. **/get_all_incidents** `GET` _TESTED_ 
   1. Returns `[{incident}, {incident}, {incident}, ...]`
   2. incident object ==> refer to _Incident_ schema ^

4. **/get_all_engines** `GET` _TESTED_
   1. Returns `[{engine}, {engine}, ...]`
   2. engine object ==> refer to _Engine_ schema ^

5. **/get_user_by_user_name** `POST` _TESTED_
   1. Expects `{user_n: 'john'}`
   2. Returns `{user}`
   3. user object ==> refer to _User_ schema ^

6. **/get_users_by_job_role**  `POST` _TESTED_
   1. Expects `{job_role: 'firefighter'} or `{job_role: 'commander'}`
   2. Returns `[{user}, {user}, {user}, ...]`
   3. user object ==> refer to _User_ schema ^

7. **/get_users_by_engine_name** `POST` _TESTED_
   1. Expects `{engine_name: 'F1'}`
   2. Returns `[{user}, {user}, ...]`
   3. user object ==> refer to _User_ schema ^

8. **/get_users_by_incident_name** `POST` _TESTED_
   1. Expects `{incident_name: <incident_name>}`
   2. Returns `[{user}, {user}, {user}, ...]`
   3. user object ==> refer to _User_ schema ^

9. **/get_events_by_incident_name** `POST` _TESTED_
   1. Expects `{incident_name: <incident_name>}`
   2. Returns `[{event}, {event}, {event}, ...]`
   3. event object ==> refer to _Event_ schema ^

10. **/get_events_by_current_incident_and_user_name `POST`

   1. Expects `{user_n: 'rahul'}`
   2. Returns `[{event}, {event}, {event}, ...]`
   3. event object ==> refer to _Event_ schema ^

11. **/get_events_by_user_name** `POST` _TESTED_
   1. Expects`{user_n: 'rahul'}`
   2. Returns `[{event}, {event}, {event}, ...]`
   3. event object ==> refer to _Event_ schema ^

12. **/get_incident_by_incident_name** `POST` _TESTED_
   1. Expects `{incident_name: <incident_name>}`
   2. Returns `{incident}`
   3. incident object ==> refer to _Incident_ schema ^

13. **/get_current_incident_by_user_name** `POST` _TESTED_
   1. Expects `{user_n: <user_name>}`
   2. Returns the the most recent `{incident}`
   3. incident object ==> refer to _Incident_ schema ^

14. **/get_incidents_by_user_name** `POST` _TESTED_
   1. Expects `{user_n:'rahul'}`
   2. Returns `[{incident}, {incident}, ... ]`
   3. incident object ==> refer to _Incident_ schema ^

15. **/get_engine_by_engine_name** _TESTED_
   1. Expects `{engine_name: 'F1'}`
   2. Returns `{engine}`
   3. engine object ==> refer to _Engine_ schema ^


###COP
1. **/get_current_cop_image** __NOT TESTED__
   1. returns (jpeg file)

2. **/post_cop_image_by_current_incident** __NOT TESTED__
   1. Expects `{file_name: String, data: Buffer}`
   2. Returns success or fail

###DELETE
1. **/delete_user_by_user_name** `POST` _TESTED_
   1. Expects `{user_n: 'rahul'}`
   2. Returns `200` on success, `400` on failure

2. **/delete_events_by_incident_name** `POST` _TESTED_
   1. Expects  `{incident_name: 'fire_1'}`
   2. Returns `200` on success, `400` on failure

3. **/delete_incident_by_incident_name** `POST` _TESTED_
   1. Expects `{incident_name: 'homer'}`
   2. Returns `200` on success, `400` on failure

4. **/delete_engine_by_engine_name** `POST` _TESTED_
   1. Expects `{engine_name: 'F2'}`
   2. Returns `200` on success, `400` on failure

###UPDATE
1. **/update_user_by_user_name** `POST` _TESTED_
   1. Does not update user_name
   1. Replaces the fields that are passed and leaves the fields that
      already exist in the database untouched
   2. Expects `{user_n: 'john', contact: '+16503530259', ...}`
   3. Returns `200` on success, `400` on failure

2. **/update_incident_by_incident_name** `POST` _TESTED_
   1. Does not update incident_name.
   2. Replaces the fields that are passed and leaves the fields that
      already exist in the database untouched.
   3. Expects `{incident_name: 'homer', end_time: '13:30', 'lg': 34, 'lt': 23, ..}`
   4. Returns `200` on success, `400` on failure.

3. **/update_incident_commander** `POST`  _TESTED_
   1. Moves the old commander into the firefighters array.
   2. Replaces the old commander with the commander passed.
   3. Expects `{incident_name: 'fire 3', user_n: 'rahul'}`
   4. Returns `200` on success, `400` on failure.

4. **/update_engine_by_engine_name** `POST` _TESTED_
   1. Replaces the fields that are passed and leaves the fields that
      already exist in the database untouched.
   2. Expects `{engine_name: 'clifford', hotspot_name: 'truck #4'}`

###AUTHENTICATE
1. **/authenticate_user** `POST` _TESTED_
   1. expects `{user_n: 'rahul', password: 'pwd123', engine_name:
      'clifford', contact: '+16503530259'}`
   2. updates user with contact information for an incident, this means
      that any firefighter can use any phone
   3. returns `200` on success, `400` on failure
