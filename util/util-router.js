const router = require('express').Router();
const authenticate = require('../auth/authenticate-middleware');

const userDb = require('../users/users-model');

//check if username is taken
router.post('/username', async (req, res) => {
    const {username} = req.body;
    try{
        const found = await userDb.findBy({username});

        if(found){
            res.status(200).json(false); //not available
        }else{
            res.status(200).json(true); //available
        }
    }catch(err){
        res.status(500).json({message: 'Error checking username'})
        console.log(err);
    }
});

//check if token is valid
router.get('/token', authenticate, (req, res) => {
    console.log('hello');
    res.status(200).json({valid: true});
});

module.exports = router;