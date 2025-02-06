
const userModel = require('../models/user.model.js');
const SupportModel = require('../models/support.model.js');
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
module.exports.createMessage = async({name,email,message,mobileNumber})=>{
    if(!name || !email || !message || !mobileNumber) throw new Error('Missing required fields');
    const support= await SupportModel.create({
      name,
      email,
      message,
      mobileNumber
    })
    return support;

}

