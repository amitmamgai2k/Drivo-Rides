const mongoose = require('mongoose');
const crypto = require('crypto')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
        type: String,
        required: true,
        minlength: [3,'First name must be at least 3 characters long'],
        maxlength: 50

        },
        lastname:{
            type: String,
            minlength: [3,'Last name must be at least 3 characters long'],
            maxlength: 50
        }
    },
    email:{
    type: String,
    required: true,
    unique: true,
    minlength: [3,'Email must be at least 5 characters long'],
    },
    // mobileNumber:{
    //     type: Number,
    //     required: true
    // },
    // profileImage:{
    //     type: String,
    //     required: true
    // },
    password:{
        type: String,
        required: true,
        select: false

    },
    otp:{
      type: Number
    },
    socketId:{
        type: String
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date

})
userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
    },
 process.env.REFRESH_TOKEN_SECRET,
 {
    expiresIn:'10d'
 }
)
}
userSchema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password,this.password);
    return isMatch;
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
userSchema.methods.generatePasswordResetToken = function() {
    // Generate a random token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it to the user's schema
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now

    return crypto.createHash('sha256').update(resetToken).digest('hex'); // Return the hashed token
};
const userModel = mongoose.model('user',userSchema);
module.exports = userModel