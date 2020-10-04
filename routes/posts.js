const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/',verify, (req,res)=>{
    res.json({
        title:"my first post",
        description:"Data is accessed by authenticated users only",
    })
});

module.exports = router;