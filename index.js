const express = require('express');
const mongoose = require('mongoose');

const app = express();

const mongooseConfig = {
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
};
//Connecting to Database
mongoose.connect('mongodb+srv://theknown:Kiran_72001@cluster0.tdnzm.mongodb.net/<dbname>?retryWrites=true&w=majority',mongooseConfig,()=>{
    console.log('Connected To DB');
});
//Importing the router 
const authRoutes = require('./routes/auth');

//Using the auth middleware
app.use('/api/v1/user',authRoutes)

app.listen(3000, () => console.log('Listening in Port 3000...'));