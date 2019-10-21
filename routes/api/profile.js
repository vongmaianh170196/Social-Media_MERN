const express = require("express");
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const Profile = require('../../Models/Profile')
const User = require('../../Models/User');
const {check, validationResult} = require('express-validator/check');

//Get api/profile/me
//Desc get current user profile
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({msg: 'Profile could not be found'})
        }
        res.json(profile)
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error')
    }
});


//Post api/profile
//Desc create, update user profile

router.post('/',
[
    auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are not empty').not().isEmpty(),

    ]
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    const{
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;
    //Build progile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    //Build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try{
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
            //Update
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            )
            return res.json(profile)
        }
        //Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile)

    }catch(err){
        console.log(err.message)
        res.status(500).send('Server error')
    }
    res.send('Hello')
});

//Get api/profile
//desc get all profiles

router.get('/', async(req, res) => {
    try{
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles);
    }catch(err){
        console.log(err.message)
        res.status(500).send("server err")
    }
})

//Get api/profile/user/:user_id
//desc get profile by id

router.get('/user/:user_id', async(req, res) => {
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile) return res.status(400).json({msg: "Profile not found"})
        res.json(profile);
    }catch(err){
        console.log(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: "Profile not found"})

        }
        res.status(500).send("server err")
    }
})

//Delete api/profile
//desc delete profile, user, posts

router.delete('/', auth, async(req, res) => {
    try{
        //Remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        //Remove user
        await User.findOneAndRemove({_id: req.user.id});
        
       res.json({msg: "Remove"})
    }catch(err){
        console.log(err.message)
        res.status(500).send("server err")
    }
})

//Put api.profile.experience
//desc add profile experience

router.put('/experience', [
    auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),
    ]
    ], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errs: errors.array()});
        }

        const{
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }
        try{
            const profile = await Profile.findOne({user: req.user.id});
            profile.experience.unshift(newExp);
            await profile.save();
            res.json(profile)
        }catch(err){
            console.log(err.message)
            res.status(500).send('server error')
        }
})
//Update api/profile/profile/experience/:exp_id
//Desc update experience
router.put('/experience/:exp_id', auth, async(req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id});
        const{
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }
        const editIndex = profile.experience.findIndex(expid => expid._id == req.params.exp_id);
        profile.experience[editIndex] = newExp;
        profile.save()
        res.json(profile)
    }catch(err){
        console.log(err.message)
    }
})

//Delete api/profile/experience/:exp_id
//Desc delete experience from profile

router.delete('/experience/:exp_id', auth, async(req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id});
        //Get remove index
        const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.log(err.message)
        res.status(500).send('Server err')
    }
})
//Put api/profile/education
//Add education
router.put('/education', [
    auth,
    [
        check('school', 'School is required').not().isEmpty(),
        check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),
    ]
    ], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errs: errors.array()});
        }

        const{
            school,
            fieldOfStudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            school,
            fieldOfStudy,
            from,
            to,
            current,
            description
        }
        try{
            const profile = await Profile.findOne({user: req.user.id});
            profile.education.unshift(newExp);
            await profile.save();
            res.json(profile)
        }catch(err){
            console.log(err.message)
            res.status(500).send('server error')
        }
})


//Delete api/profile/education/:edu_id
//Desc delete education from profile

router.delete('/education/:edu_id', auth, async(req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id});
        //Get remove index
        const removeIndex = profile.education.map(item => item._id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.log(err.message)
        res.status(500).send('Server err')
    }
})

//Get api/profile/github/:username
//Desc get user repos from github

router.get('/github/:username', (req, res)=> {
    try{
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5
            &sort=created:asc
            &client_id=${config.get('githubClientId')}
            &client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        };

        request(options, (error, response, body) => {
            if(error) console.log(error)
            if(response.statusCode !== 200){
                return res.status(404).json({err: "No github profile found"});
            }
            res.json(JSON.parse(body))
        })
    }catch(err){
        console.log(err.message)
    }
})
module.exports = router;