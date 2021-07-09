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
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,               //Extra attributes to make db more efficient.
    useUnifiedTopology: true,
    useCreateIndex: true 
}).then(()=> {                          //In JavaScript -> run().then().catch()
    console.log("DB CONNECTED");
}).catch(()=>{
    console.log("You Screwed it up ! ");
})
// view engine setup
app.engine('handlebars',expressHandlebars({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ "}));
app.set('view engine','handlebars');

//<----------MIDDLEWARE------------>
app.use(express.json());                //req.body 
app.use(cookieParser());                //req.cookies
app.use(cors());
//<----------MIDDLEWARE------------>
app.get('/',(req,res)=>{
    res.render('contact');
})

//<----------Routes---------------->
app.use('/', authRoutes);             //prefixing /api in all the routes which is mentioned in authRoutes i.e auth.js



//<----------Routes---------------->


//Port
const port = process.env.PORT || 5000;



//Start
app.listen(port,()=>{
    console.log(`app is running at ${port}`);
});
