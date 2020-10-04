const router = require('express').Router();
const User = require('../model/user');
const { registerValidation, loginValidation } = require('../middlewares/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    //Validate the user
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //Check if the user exists
    const emailExists = await User.findOne({
        email: req.body.email
    });
    if (emailExists) {
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

    try {
        const user = await user.save();
        res.send({ user: user._id });
    } catch (error) {
        res.status(400).send(error);
    }
});



router.post('/login', async (req, res) => {
    //Validate login
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //Check if the Email exists
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        return res.status(400).send('Email not found');
    }

    //Validate the password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send('Password is wrong');
    }

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
});

module.exports = router;