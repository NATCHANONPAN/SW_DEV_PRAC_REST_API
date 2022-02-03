const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path:'./config/config.env'});

const app = express();

app.get('/api/v1/hospitals', (req,res) =>{
    res.status(200).json({success:true,msg : 'Show all hospitals'});
});

app.get('/api/v1/hospitals/:id', (req,res) =>{
    res.status(200).json({success:true,msg : `Show hospitals ${req.params.id}` });
});

app.post('/api/v1/hospitals' , (req,res) =>{
    res.status(200).json({success:true , msg :'Create new hospitals'});
})

app.put('/api/v1/hospitals/:id', (req,res) => {
    res.status(200).json({success:true,msg:`Update hospital ${req.params.id}`});
})

app.delete('/api/v1/hospitals/:id', (req,res) =>{
    res.status(200).json({success:true,msg : `Delete hospital ${req.params.id}`})
});

const PORT = process.env.PORT;
app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode one port ', PORT)); //server run แล้วนะ รอ connection