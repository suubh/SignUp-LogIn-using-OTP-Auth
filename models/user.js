const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

//Defining a Schema
const userSchema = new mongoose.Schema({
    name:{                          
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{                    
        type:String,
        maxlength:32,
        trim:true
    },
    email:{                         
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    dob:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    houseNum:{
        type:String
    },
    pin:{
        type:Number,
        required:true
    },
    city:{
        type:String,
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    encry_password:{                //Which we are going to store in our DB
        type:String,
        required:true
    },
    salt: String,                   //For Password aunthetication
    upload:{
        data: Buffer,
        type: String
    }
},{timestamps:true});

userSchema.virtual("password")
    .set(function(password){
        this._password = password;  
        this.salt = uuidv1();      
        this.encry_password = this.securePassword(password) ;   //Calling the Encryption method
    })
    .get(function(){
        return this._password;
    })


userSchema.methods = {
    authenticate: function(plainpassword){  //method one
        return this.securePassword(plainpassword) === this.encry_password ;
    },

    securePassword: function(plainpassword) { //method two
        if(!plainpassword) return "";

        //Encryption Process
        try{
            return crypto.createHmac("sha256",this.salt).update(plainpassword).digest("hex");

        }catch(err){
            return "";
        }
    }

}

module.exports = mongoose.model("User",userSchema); //  User is the name which will be used to call the values or the schema.

