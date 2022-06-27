
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const myConnection = require('express-myconnection');
const cors = require("cors");	
const app = express();
const mongoose = require("mongoose")


//import routers
const assignRoute = require('./routers/assignments-router');

//settings
app.set('port',process.env.PORT || 3000);
app.use(cors());
app.use(morgan('dev')); 

var doesNotModifyBody = function(request, response, next) {
    request.params = {
      a: "b"
    };
    // calls next because it hasn't modified the header
    next();
  };
  
  // middleware that modify the response body
  var doesModifyBody = function(request, response, next) {
    response.setHeader("Content-Type", "application/json");
    response.end();
    // doesn't call next()
  };

app.use(express.urlencoded({extended:false}));

//routes
app.use('/api/assignments',assignRoute);

app.use(doesNotModifyBody);
app.use(doesModifyBody);

//static files (img,javascript,css ,...)
app.set(express.static(path.join(__dirname,'public')));


mongoose
	.connect("mongodb://localhost:27017/justo-db", { useNewUrlParser: true })
	.then(() => {
    //start serve
    app.listen(9093, () =>{
      console.log("Serve up");
    });
	})