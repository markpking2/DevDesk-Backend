const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userDb = require('./users-model');
const cloudinary = require('cloudinary').v2;

const db = require('../data/db-config');

router.put('/user', async (req, res) => {
    const {username, email, cohort, name} = req.body;
    const newValues = {username, email, cohort, name};
    Object.keys(newValues).forEach(key => newValues[key] === undefined && delete newValues[key])
    
    for(let val in newValues){
        if(typeof newValues[val] === 'string'){
            newValues[val] = newValues[val].toLowerCase();
        } 
    };

    let {password} = req.body;
    const {newPassword} = req.body;

    try{
        if(username){
            if(!(/^[a-z][a-z0-9_]*$/i.test(username))){
                throw 1
            }
            const foundUsername = await db('users')
            .where({username: newValues.username})
            .first();

            if(foundUsername && foundUsername.username !== newValues.username){
                throw 2
            }
        }

        if(email){
            const foundEmail = await db('users')
            .where({email: newValues.email})
            .first();

            if(foundEmail && foundEmail.email !== newValues.email){
                throw 3
            }
        }

        const user = await db('users')
            .where({id: req.user.id})
            .first();

        if(user && bcrypt.compareSync(password, user.password)){
            if(newPassword){
                password = bcrypt.hashSync(newPassword, 8);
            }
            const updated = await userDb.update(req.user.id, newPassword ? {...newValues, password} : {...newValues});
            if(updated){
                const updatedUser = await userDb
                .findBy({id: req.user.id})
                .select('id', 'username', 'email', 'name', 'cohort');
                
                res.status(200).json({...updatedUser});
            }else{
                throw 'User could not be updated'
            }
        }else{
            throw 4
        }
    }catch(err){
        console.log(err);
        switch(err){
            case 1:
                res.status(400).json({message: 'Username must only contain characters A-Z, _, and 0-9. Username must start with a letter.'});
                break;
            case 2: 
                res.status(422).json({message: `Username '${username}' is already in use.`});
                break;
            case 3: 
                res.status(422).json({message: `There is already an account associated with that email`});
                break;                
            case 4: 
                res.status(403).json({message: 'Invalid credentials.'});
                break;
            default:  res.status(500).json({message: 'Error updating user.'});
        }
    }
});

router.get('/user', async (req, res) => {
    try{
        const user = await db('users as u')
            .where({'u.id': req.user.id})
            .leftJoin('profile_pictures as p', 'u.id', 'p.user_id')
            .select('u.id', 'u.username', 'u.name', 'u.email', 'u.cohort', 'p.url as profile_picture')
            .first();
        if(user){
            res.status(200).json(user)
        }else{
            console.log('hmmm', user);
            res.status(404).json({message: `User with id ${req.user.id} not found.`});
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({nessage: 'Error getting user information.'});
    }
});

router.delete('/user', async (req, res) => {
    const {password} = req.body;

    try{
        if(password){
            const user = await db('users')
            .where({id: req.user.id})
            .first();

            if(user && bcrypt.compareSync(password, user.password)){
                await userDb.remove(req.user.id);
                res.status(200).json({message: 'User successfully deleted'});
            }else{
                throw 1
            }
        }else{
            throw 2
        }
    }catch(err){
        if(err === 1){
            res.status(403).json({message: 'Invalid credentials.'});
        }else if(err === 2){
            res.status(400).json({message: 'Please provide password.'});
        }
        res.status(500).json({message: 'Error deleting user.'});
    }
});

//upload profile pictures to cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/user/picture', (req, res) => {
    console.log(req.files);
    const file = req.files.image;
    
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        try{
            const image = await userDb.addProfilePic({url: result.url, user_id: req.user.id});
            if(image){
                res.status(201).json({url: result.url});
            }else{
                throw 'Image could not added'
            }
        }catch(err){
            res.status(500).json({message: 'Error adding image'});
        }
    });
});

router.put('/user/picture', (req, res) => {
    const file = req.files.image;
    
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        try{
            const image = await userDb.updateProfilePic({url: result.url, user_id: req.user.id});
            if(image){
                res.status(201).json({url: result.url});
            }else{
                throw 'Image could not be updated'
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Error adding image'});
        }
    });
});

router.delete('/user/picture', async (req, res) => {
    try{
        const deleted = await db('profile_pictures')
        .where({user_id: req.user.id})
        .del();

        if(!deleted){
            res.status(200).json({message: `Profile picture for user id ${req.user.id} successfully deleted`});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error deleting profile picture.'})
    }
});

router.get('/:id', async (req, res) => {
    try{
        const user = await userDb.findById(req.params.id);
        if(user){
            res.status(200).json(user);
        }else{
            throw 404;
        }
    }catch(err){
        console.log(err);
        switch(err){
            case 404: res.status(404).json({message: 'User with specified ID not found'});
                break;
            default: res.status(500).json({message: 'Error getting user information'});
                break;
        }
    }
});

module.exports = router;