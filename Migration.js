var mysql = require('mysql');
var migration = require('mysql-migrations');


//DEVELOPMENT SERVER
var connection = mysql.createPool({
  connectionLimit : 10,
  host: "remotemysql.com",
  user: "asGr29M9g5",
  password: "ORIqpQdpwj",
  database: "asGr29M9g5"
});

migration.init(connection, __dirname + '/db/migrations', function() {
  console.log("MIGRATION FINISHED!");
});