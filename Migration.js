var mysql = require('mysql');
var migration = require('mysql-migrations');


//DEVELOPMENT SERVER
var connection = mysql.createPool({
  connectionLimit : 10,
  host: "localhost",
  user: "root",
  database: "distance_learning",
  password: "lytvynskyi"
});

migration.init(connection, __dirname + '/db/migrations', function() {
  console.log("MIGRATION FINISHED!");
});