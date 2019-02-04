var domain = 'mongodb://';
var user = 'incidentaiduser';
var password = 'FireEmergency';
var extension = '@indidentaid-shard-00-00-2dc7g.mongodb.net:27017,indidentaid-shard-00-01-2dc7g.mongodb.net:27017,indidentaid-shard-00-02-2dc7g.mongodb.net:27017/test?ssl=true&replicaSet=indidentaid-shard-0&authSource=admin&retryWrites=true';
var extension2 = '@indidentaid-2dc7g.mongodb.net/test?retryWrites=true';
var extension3 = '@indidentaid-shard-00-00-2dc7g.mongodb.net:27017,indidentaid-shard-00-01-2dc7g.mongodb.net:27017,indidentaid-shard-00-02-2dc7g.mongodb.net:27017/test?ssl=true&replicaSet=indidentaid-shard-0&authSource=admin&retryWrites=true/fire_logs'

exports.dbURL = domain + user + ':' + password + extension3;
//exports.dbURL = 'mongodb://localhost:27017/exampleDb'
