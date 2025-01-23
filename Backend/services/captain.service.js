const captainModel = require('../models/captain.model');
module.exports.createCaptain = async ({email,password,firstname,lastname,color,plate,capacity,vehicleType,model,ProfilePicture,mobileNumber}) => {
    if(!email || !password || !firstname || !color || !plate || !capacity || !vehicleType || !model || !ProfilePicture) {
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
            model
        },
        ProfilePicture,
        mobileNumber
    });

    return captain;
}