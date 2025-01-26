const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profilePic : String,
    role : String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    loginAttempts: { type: Number, default: 0 },
    lastLoginAttempt: { type: Date, default: Date.now },
    isLocked: { type: Boolean, default: false },
    

},{
    timestamps : true
})

userSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
  };
const userModel =  mongoose.model("user",userSchema)

module.exports = userModel






