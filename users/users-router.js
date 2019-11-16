const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userDb = require('./users-model');

const db = require('../data/db-config');

router.put('/user', async (req, res) => {
    const {username, email, cohort} = req.body;
    const newValues = {username, email, cohort};
    Object.keys(newValues).forEach(key => newValues[key] === undefined && delete newValues[key])
    const {password} = req.body;
    try{
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
                throw 1
            }
        }else{
            throw 2
        }
    }catch(err){
        switch(err){
            case 2: 
                res.status(400).json({message: 'Invalid credentials.'});
                break;
            default:  res.status(500).json({message: 'Error updating user.'});
        }
    }
});


module.exports = router;