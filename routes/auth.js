const router = require('express').Router();
const User = require('../model/user');
const { registerValidation } = require('../middlewares/validation');
const bcrypt = require('bcryptjs');

router.post('/register', async (req,res)=>{

    //Validate the user
    const { error } = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    //Check if the user exists
    const emailExists = await User.findOne({
        email: req.body.email
    });
    if(emailExists){
        return res.status(400).send('Email Already Exists');
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create an user from schema
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });
    
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(error){
        res.status(400).send(error);
    }
});

module.exports = router;