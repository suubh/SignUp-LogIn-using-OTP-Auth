
const expressHandler = require('express-handlebars');
const User = require("../models/user");         //My model to save the user in DB  
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: "YOUR_API_KEY",
    apiSecret: "YOUR_API_SECRET"
});

exports.login = (req,res)=>{
    if(User.findOne({ email: req.body.email }) && User.findOne({ password: req.body.password })){
        return res.send("User Logged In Successfully !");
    } else{
        return res.send("Invalid User");
    }
    //Proper Implementation can be done with time.
}

exports.signup = (req, res)=>{
    const user = new User(req.body);           
    user.save((err, user)=>{                                       
        if(err){
            return res.status(400).json({
                err: "Not able to Save user in DataBase"
            });
        }
        res.render('otp');
    }); 
};

exports.register = (req,res)=>{
    let phoneNumber = req.body.number;
    console.log(phoneNumber);
    nexmo.verify.request({number: phoneNumber,brand: 'Shubham Singh'},(err,result)=>{
        if(err){
            res.sendStatus(500);
        }
        else{
            let requestId = result.request_id;
            if(result.status == '0'){
                res.render('verify',{requestId: requestId});
                console.log(requestId);
            } else{
                res.status(401).send(result.error_text);
            }
        }
    });
}

exports.verify = (req,res)=>{
    let pin = req.body.pin;
    console.log(pin);
    let requestId = req.body.requestId;

    nexmo.verify.check({request_id: requestId, code: pin},(err,result)=>{
        if(err){
            res.send('Server Error');
        }
        else{
            if(result && result.status == '0'){
                res.status(200).send('Account Verified !');
                res.render('login',{message: "Account Verified,Please Login"});
            } else{
                res.send('Try Again');
            }
        }
    });
}




