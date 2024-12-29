const userModel = require('../models/user.model.js');
module.exports.createUser = async ({email,password,firstname,lastname}) => {
  if(!email || !password || !firstname) throw new Error('Missing required fields');
  const user  = userModel.create({
    fullname:{
        firstname,
        lastname
    },
    email,
    password
})
return user;

}

