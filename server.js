const express = require("express");
const app = express();
const PORT = 8080;
const ex_hbs = require("express-handlebars");
const axios = require("axios");
const API_K='15bdcb0ea368f090a24135bb7311599c';

app.set("view engine", "hbs");
app.engine("hbs",ex_hbs({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: __dirname + "/views/partials",

  })
);


app.use(express.static("public"));
app.get("/", (req, res) => {
    if(req.query.city){
        
     axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${API_K}`)
    .then( (resp)=> {
        let lonLet=`Longitude: ${resp.data.coord.lon} ,Latitude: ${resp.data.coord.lat} `
        res.render("content", {
        title: "Home",
        weather: true,
        coord:lonLet,
        par:'Geolocation coordinates:',
        text:"Enter your city name"
            
    });})
    .catch( (err)=> {
        let lonLet=`Error: You must provide a city name `
        res.render("content", {
        title: "Home",
        weather: true,
        coord:lonLet,
        par:'404',
        text:"try again"
            
    });
    })
    .then( ()=> {});

    }
  
 else{
res.render("content", {
    title: "Home",
    weather: true,
    par:'Geolocation coordinates:',
    text:"Enter your city name"
        
});
}

  });


app.get("/About", (req, res) => {
  res.render("content", {
    title: "About",
    par:'by BRANO ASAYA',
    text:"The Maestro",
    pic:true,


  });
});
app.get("/Help", (req, res) => {
  res.render("content", {
    title: "Help",
    par:'More Help',
    text:"Contact Us"

  });
});




app.listen(PORT);