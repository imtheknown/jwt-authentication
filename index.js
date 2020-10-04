const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const mongooseConfig = {
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
};
//Connecting to Database
mongoose.connect(process.env.MONGO_URI,mongooseConfig,()=>{
    console.log('Connected To DB');
});

app.use(express.json());

//Importing the router 
const authRoutes = require('./routes/auth');

//Using the auth middleware
app.use('/api/v1/user',authRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening in Port ${PORT}...`));