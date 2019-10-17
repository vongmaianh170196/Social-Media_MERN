const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const User = require('../../Models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


//Post api/users
//Desc register user
router.post('/', 
//Validate using express
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter an email').isEmail(),
    check('password', 'Please enter a password with min 6 character').isLength({min: 6})
], 

async (req, res) => {
    //Validate using express
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }
    const {name, email, password} = req.body;

    try{
        //See if user existed 
        let user = await User.findOne({email});
        if (user){
           return res.status(400).json({errors: [{msg: "User is already existed"}]})
        }

        //Get user gravatar
        const avatar = gravatar.url(email, {
            size: '200',
            rating: 'pg',
            default: 'mm'
        })
        user = new User({
            name,
            email,
            avatar, 
            password
        })

    //Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

    //return jsonwebtoken
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