const express=require('express')
const mongooe =require('mongoose')
const morgan = require('morgan')
const cors =require('cors')
const app=express();
const jwt =require("jsonwebtoken");
require('dotenv').config();
app.use(morgan("dev"));
app.use(cors());
require("./db/mongodb");

const path = require('path'); 
app.use(express.static(path.join(__dirname,'/build')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

const user=require('./routes/UserRoute');

app.use('/api',user)
const employee=require('./routes/Employee');

app.use('/api',employee)
const PORT=process.env.PORT;

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
 });
app.listen(5000,()=>{
    console.log(`sERVER RUNNING ON port 5000`);
});