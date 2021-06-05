const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4002;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const sql = require('mssql')

const config = {
    user: 'sa',
    password: 'mercedezebenz@porsche#conquerer',
    //server: '', 
    server:'lenovo-pc2\\sqlexpress',
    port : 1433,
    database: 'smsv2',
    options: {
        encrypt: false// Use this if you're on Windows Azure
    }


}
var conn = new sql.ConnectionPool(config);

 conn.connect()
 // Successfull connection
 .then(function () {

   // Create request instance, passing in connection instance
   var req = new sql.Request(conn);

   // Call mssql's query method passing in params
   req.query("select * from users")
   .then(function (recordset) {
     console.dir(recordset);
     conn.close();
   })
   // Handle sql statement execution errors
   .catch(function (err) {
     console.log(err);
     conn.close();
   })
 })
 // Handle connection errors
 .catch(function (err) {
   console.log(err);
   conn.close();
 });

//  const sql2 = require('mssql')

//  async () => {
//      try {
//          // make sure that any items are correctly URL encoded in the connection string
//          await sql2.connect('Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true')
//          const result = await sql.query`select * from mytable where id = ${value}`
//          console.dir(result)
//      } catch (err) {
//          // ... error checks
//      }
//  }

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});
