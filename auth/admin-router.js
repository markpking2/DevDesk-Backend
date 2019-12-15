const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userDb = require('../users/users-model');
const db = require('../data/db-config');
const cloudinary = require('cloudinary').v2;

router.put('/users/:id', async (req, res) => {
    const {id} = req.params;
    const {username, email, cohort, name} = req.body;
    const newValues = {username, email, cohort, name};
    Object.keys(newValues).forEach(key => newValues[key] === undefined && delete newValues[key])
    
    for(let val in newValues){
        if(typeof newValues[val] === 'string'){
            newValues[val] = newValues[val].toLowerCase();
        } 
    };

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

        const updated = await userDb.update(id, {...newValues});
        if(updated){
            const updatedUser = await userDb
            .findBy({id})
            .select('id', 'username', 'email', 'name', 'cohort');
            
            res.status(200).json({...updatedUser});
        }else{
            throw 'User could not be updated'
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
            default:  res.status(500).json({message: 'Error updating user.'});
        }
    }
});

router.delete('/users/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const deleted = await db('users')
            .where({id})
            .del();
        if(deleted){
            res.status(200).json({message: `User with id ${id} successfully deleted.`});
        }else{
            throw 'User not found'
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error deleting user with specified id'});
    }
});

//add/update/delete user profile pictures
router.post('/user/:id/picture', (req, res) => {
    const {id} = req.params;

    const file = req.files.image;
    
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        try{
            const image = await userDb.addProfilePic({
                user_id: id, 
                url: result.url, 
                width: result.width,
                height: result.height,
                filename: result.original_filename,
            });
            if(image){
                res.status(201).json({profile_picture: result.url});
            }else{
                throw 'Image could not be added'
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Error adding profile picture'});
        }
    });
});
router.put('/user/:id/picture', (req, res) => {
    const {id} = req.params;

    const file = req.files.image;
    
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        try{
            const image = await userDb.updateProfilePic({
                user_id: id, 
                url: result.url, 
                width: result.width,
                height: result.height,
                filename: result.original_filename,
            });
            if(image){
                res.status(201).json({profile_picture: result.url});
            }else{
                throw 'Image could not be updated'
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Error updating profile picture'});
        }
    });
});

router.delete('/user/:id/picture', async (req, res) => {
    const {id} = req.params;

    try{
        const deleted = await db('profile_pictures')
        .where({user_id: id})
        .del();

        if(!deleted){
            res.status(200).json({message: `Profile picture for user id ${id} successfully deleted`});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error deleting profile picture.'})
    }
});

module.exports = router;