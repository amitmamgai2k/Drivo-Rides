const nodemailer = require('nodemailer')

//create a transporter object using SMTP
const sendMail = async function (email, subject, message) {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });
//Setup email data

    let mailDetails = {
        from: "amit.mamgai2002@gmail.com",
        to: email,
        subject: subject,
        html: message,
    };

    // send mail
    await mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            console.log("Email sent successfully",data.response);
        }
    });
};
module.exports =  sendMail;

