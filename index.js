const express = require('express');

const app = express();

//Importing the router 
const authRoutes = require('./routes/auth');

//Using the auth middleware
app.use('/api/v1/users',authRoutes)

app.listen(3000, () => console.log('Listening in Port 3000...'));