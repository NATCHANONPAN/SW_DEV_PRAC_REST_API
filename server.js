const express = require('express');
const dotenv = require('dotenv');
const hospital = require('./routes/hospitals');
const connectDB  = require('./config/db');

dotenv.config({path:'./config/config.env'});

//Connect to Database
connectDB();



const app = express();

//Body parse
app.use(express.json());

app.use('/api/v1/hospitals',hospital);

const PORT = process.env.PORT;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode one port ', PORT)); //server run แล้วนะ รอ connection

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);

    server.close(()=>process.exit(1));
})