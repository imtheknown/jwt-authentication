const router = require('express').Router();
const User = require('../model/user');
const { registerValidation } = require('../middlewares/validation');

router.post('/register', async (req,res)=>{

    //Validate the user
    const { error } = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    //Check if the user exists
    const emailExists = User.findOne({
        email: req.body.email
    });
    if(emailExists){
        return res.status(400).send('Email Already Exists')
    }
    
    //Create an user from schema
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(error){
        res.status(400).send(error);
    }
});

module.exports = router;