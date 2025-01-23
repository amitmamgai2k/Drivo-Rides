const userModel = require('../models/user.model.js');
module.exports.createUser = async ({email,password,firstname,lastname,mobileNumber,ProfilePicture}) => {
  if(!email || !password || !firstname ) throw new Error('Missing required fields');
  const user  = userModel.create({
    fullname:{
        firstname,
        lastname
    },
    email,
    password,
    mobileNumber,
    ProfilePicture
})
return user;

}

