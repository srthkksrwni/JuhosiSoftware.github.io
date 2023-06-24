var conn = require('./connection');

var express = require('express');
var app = express();

var bodyparser = require('body-parser');

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:true}));

// for fetch the data view engine
app.set('view engine','ejs');

//route define
app.get('/',function(req, res)
{
    res.sendFile(__dirname+'/login.html');
});



app.get('/index',function(req, res)
{
    res.sendFile(__dirname+'/index.html');
});

//post into database
app.post('/login', function(request, response, next){

  var user_id = request.body.id;

  var user_password = request.body.password;

  if(user_id && user_password)
  {
      query = `
      SELECT * FROM login 
      WHERE userId = "${user_id}"
      `;

      conn.query(query, function(error, data){

          if(data.length > 0)
          {
              for(var count = 0; count < data.length; count++)
              {
                  if(data[count].password == user_password && data[count].userId == 'admin')
                  {

                      response.redirect("/admin");
                  }
                  else if(data[count].userId == 'customer1' || data[count].userId == 'customer2' &&  data[count].password == user_password )
                  {
                      response.redirect("/index");
                  }
                  else{
                    response.get("Incorrect fields")
                  }
              }
          }
          else
          {
              response.send('Incorrect Email Address');
          }
          response.end();
      });
  }
  else
  {
      response.send('Please Enter Email Address and Password Details');
      response.end();
  }

});

app.post('/save',function(req, res)
{
  console.log(req.body);
  var name = req.body.Cname;
  var date = req.body.date;
  var company = req.body.company;
  var owner = req.body.owner;
  var item = req.body.item;
  var quantity = req.body.quantity;
  var weight = req.body.weight;
  var req_Ship = req.body.req_Ship;
  var track_id = req.body.track_id;
  var ship_size = req.body.ship_size;
  var box_count = req.body.box_count;
  var specification = req.body.specification;
  var check_list = req.body.check_list;


    var sql = "INSERT INTO customer(Order_Date, Customer_name,	Comapny, Owner, Item, Quantity, Weight, Req_Shipment, Tracking_Id, Shipment_Size, Box_count, Specification, Check_list) VALUES('"+date+"','"+name+"','"+company+"','"+owner+"','"+item+"','"+quantity+"','"+weight+"','"+req_Ship+"','"+track_id+"','"+ship_size+"','"+box_count+"','"+specification+"','"+check_list+"')";

    console.log("query : ",sql)
    conn.query(sql,function(error,result)
    {
        if(error) throw error;
        res.send('Order form saved..');
    })
  });


app.get('/admin',function(req, res)
{
  

    var sql = "SELECT Customer_name,quantity, weight, box_count FROM customer WHERE Customer_name IN ('customer1', 'customer2');";

    conn.query(sql,function(error,result)
    {
      if(error) console.log(error);
      console.log(result);
      res.render("admin",{admin:result})
    });
  // });
});


app.listen(8000); 