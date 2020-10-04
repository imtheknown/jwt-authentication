const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Mongoose Connection
const mongooseConfig = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
//Connecting to Database
mongoose.connect(process.env.MONGO_URI, mongooseConfig, () => {
    console.log('Connected To DB');
});
//End Mongoose Connection

app.use(express.json());

//Importing the router 
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

//Using the auth middleware
app.use('/api/v1/user', authRoutes)
app.use('/api/v1/posts', postsRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening in Port ${PORT}...`));