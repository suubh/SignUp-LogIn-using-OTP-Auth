require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressHandlebars = require('express-handlebars');
const cors = require('cors');
const app=express();


const authRoutes = require('./routes/auth');


//Connecting with the Database Locally
mongoose.connect(process.env.DATABASE, {useNewUrlParser:true, useUnifiedTopology: true,useCreateIndex: true })
.then(()=> {console.log("DB CONNECTED");})
.catch(()=>{console.log("You Screwed it up ! ");})

// view engine setup
app.engine('handlebars',expressHandlebars({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ "}));
app.set('view engine','handlebars');

//static folder
app.use(express.static(__dirname + '/public'));

//MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.json());                 
app.use(cookieParser());                
app.use(cors());


app.get('/',(req,res)=>{
    res.render('login');
})
app.get('/signup',(req,res)=>{
    res.render('contact');
})
app.get('/register',(req,res)=>{
    res.render('otp');
})
app.get('/verify',(req,res)=>{
    res.render('verify');
})


//Routes
app.use('/', authRoutes);             



//Port
const port = process.env.PORT || 5000;



//Start
app.listen(port,()=>{
    console.log(`app is running at ${port}`);
});
