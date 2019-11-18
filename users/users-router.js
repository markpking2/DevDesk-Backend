const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userDb = require('./users-model');

const db = require('../data/db-config');

router.put('/user', async (req, res) => {
    const {username, email, cohort} = req.body;
    const newValues = {username, email, cohort};
    Object.keys(newValues).forEach(key => newValues[key] === undefined && delete newValues[key])
    
    for(let val in newValues){
        if(typeof newValues[val] === 'string'){
            newValues[val] = newValues[val].toLowerCase();
        } 
    };

    const {password} = req.body;

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
            const updated = await userDb.update(req.user.id, {...newValues});
            if(updated){
                const updatedUser = await userDb
                .findBy({id: req.user.id})
                .select('id', 'username', 'email', 'helper', 'student', 'cohort');
                
                res.status(200).json({...updatedUser});
            }else{
                throw 'User could not be updated'
            }
        }else{
            throw 4
        }
    }catch(err){
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
        const user = await userDb.findBy({id: req.user.id})
            .select('id', 'username', 'email', 'helper', 'student', 'cohort');
        res.status(200).json(user)
    }catch(err){
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
})


module.exports = router;