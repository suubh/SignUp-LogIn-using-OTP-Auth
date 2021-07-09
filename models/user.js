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
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{                //Which we are going to store in out DB
        type:String,
        required:true
    },
    salt: String,                   //For Password aunthetication
    role:{
        type:Number,
        default:0,                  //Higher the Number ,higher is the role.
    },
    purchases:{ 
        type:Array,
        default:[]
    },
},{timestamps:true});

userSchema.virtual("password")
    .set(function(password){
        this._password = password;  //_Private Variable, In case we have to use the actual password set by the user.
        this.salt = uuidv1();       //Populating the Salt value, Which will give something like this - '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'.
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


//Now using the above created Schema to make Model to use in the Application.
module.exports = mongoose.model("User",userSchema); //  User is the name which will be used to call the values or the schema.

