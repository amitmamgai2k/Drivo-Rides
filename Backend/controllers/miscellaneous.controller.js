const { validationResult } = require('express-validator');
const userService = require('../services/user.service');
// const CuponModel = require('../models/cuponcode.model.js');
module.exports.sendMessage = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    try {
        const {name,email,message,mobileNumber} = req.body;
        if(!name || !email || !message || !mobileNumber){
            return res.status(400).json({ error: "Missing required fields" });
        }
        const messageData = await userService.createMessage({name,email,message,mobileNumber});
        res.status(200).json({ messageData });

    } catch (error) {

    }
}
module.exports.getCuponCode = async(req,res)=>{
    try {
        // const cuponCode = await CuponModel.find().limit(1);
        // console.log(cuponCode);
console.log('cupocdoe');

        // res.status(200).json({ cuponCode });


    } catch (error) {

    }
}

