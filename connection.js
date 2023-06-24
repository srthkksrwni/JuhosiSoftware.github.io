var mysql = require("mysql");

var conn = mysql.createConnection(
    {
        host:"localhost",
        id:"root",
        password:"",
        database:"juhosi"
    }
);


conn.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});


module.exports = conn;