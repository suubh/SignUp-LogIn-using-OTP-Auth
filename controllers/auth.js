//Route and Controller name should be same to avoid confusion
//All the auth method are in auth controller
const expressHandler = require('express-handlebars');
const User = require("../models/user");         //My model to save the user in DB       



exports.signup = (req, res)=>{
    const user = new User(req.body);            //Consider 'user' as an object of 'User' ,and User is from mongoose schema so we
    user.save((err, user)=>{                    //can use mongoose property i.e     user.save() -> Give us tow objects back i.e err and user itself
                            
        if(err){
            return res.status(400).json({
                err: "Not able to Save user in DataBase"
            });
        }
        //res.json(user); -> Will show us the entire model .
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });

    }); 
};



exports.signout = (req, res)=>{
    res.json({
        message:"User Singout"
    });
};
