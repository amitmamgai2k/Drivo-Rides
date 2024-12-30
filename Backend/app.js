const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const connectToDB = require('./db/db.js');
const userRoutes = require('./routes/user.routes.js');
const captainRoutes = require('./routes/captain.routes.js');

connectToDB();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.get('/',(req,res)=>{
    console.log('Request Received ');

    res.send("Hello world");
});
app.use('/users',userRoutes)
app.use('/captains',captainRoutes)
module.exports = app;