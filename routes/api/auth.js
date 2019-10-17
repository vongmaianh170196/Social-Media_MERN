const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../Models/User');
const {check, validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

//Get api/auth
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server err")
    }
});


//Desc log inuser
router.post('/', 
//Validate using express
[
    check('email', 'Please enter an email').isEmail(),
    check('password', 'Password required').exists()
], 

async (req, res) => {
    //Validate using express
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }
    const {email, password} = req.body;

    try{
        //See if user existed 
        let user = await User.findOne({email});
        if (!user){
           return res.status(400).json({errors: [{msg: "Invalid credential"}]})
        }

        
    //return jsonwebtoken
        //check password
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({errors: [{msg: "Invalid credential"}]})
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token) => {
                if(err) return err;
                res.json({token})
            }
        );
        
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Server erro")
    }

    
});

module.exports = router;