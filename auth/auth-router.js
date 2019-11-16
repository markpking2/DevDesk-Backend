const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../data/db-config.js');
const userDb = require('../users/users-model');
const {generateToken} = require('./token.js');

router.post('/register', async (req, res) => {
    const user = {username, password, helper, student, email, cohort} = req.body;

    try{
        const [id] = await userDb.add({...user, password: bcrypt.hashSync(password, 8)});

        const response = await db('users').select('id', 'username').where({id}).first();

        res.status(201).json({id :response.id, username: response.username});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Server could not add user'});
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if(username && password){
        const user = await userDb.findBy({username});
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user);
            res.status(200).json({message: `Welcome ${username}`, token});
        }else{
            res.status(403).json({message: 'Invalid username or password'});
        }
    }else{
        res.status(400).json({message: 'Please provide a username and password'});
    }
});

module.exports = router;