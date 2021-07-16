const express = require("express");
const https = require("https");// no need to 'npm install' since this is included in node
const bodyParser= require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use('/static',express.static('static'));// every file that has to be served publically has to be made static
app.use(express.urlencoded());

app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");

})

app.post("/",function(req,res){

const query = req.body.city;
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&appid=db800bd280d542caf2933c114db304e5&units=metric";
  https.get(url , function(response){ // method to get info from the given url
    console.log(response.statusCode);

    response.on("data",function(data){// .on is used to capture the data
      const weatherData = JSON.parse(data);// the content returned by the url is in json format.
      const icon = weatherData.weather[0].icon;


      res.write("<h1 style = 'text-align:center'>The temperature in "+query+" is "+weatherData.main.temp+" degree Celsius.</h1>");// send data stored in weatherData->main->temp;
      res.write("<p style = 'text-align:center'>Weather description: "+weatherData.weather[0].description+" <img src=http://openweathermap.org/img/w/"+icon+".png ></p>");

      //There can be only one res.send command in one js file
      res.send();


    })
  })

})

app.listen(3000,function(){
  console.log("server");
})
