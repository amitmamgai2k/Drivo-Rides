const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const connectToDB = require('./db/db.js');
const userRoutes = require('./routes/user.routes.js');
connectToDB();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    console.log('Request Received ');

    res.send("Hekllo world");
});
app.use('/users',userRoutes)
module.exports = app;