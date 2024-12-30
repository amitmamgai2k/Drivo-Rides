const mongoose = require('mongoose');
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
    password:{
        type: String,
        required: true,
        select: false

    },
    socketID:{
        type: String
    }

})
userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
}
userSchema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password,this.password);
    return isMatch;
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
const userModel = mongoose.model('user',userSchema);
module.exports = userModel