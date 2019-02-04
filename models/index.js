var mongoose = require('mongoose');
mongoose.connect('mongodb://incidentaiduser:FireEmergency@indidentaid-shard-00-00-2dc7g.mongodb.net:27017,indidentaid-shard-00-01-2dc7g.mongodb.net:27017,indidentaid-shard-00-02-2dc7g.mongodb.net:27017/test?ssl=true&replicaSet=indidentaid-shard-0&authSource=admin&retryWrites=true', function(err){
if (err) throw err;
console.log('successfully connected');
});

console.log(mongoose.connection.readyState+'connecting state');

module.exports = {
  'Engine': require('./engine'),
  'Event': require('./event'),
  'Incident': require('./incident'),
  'User': require('./user')
};
