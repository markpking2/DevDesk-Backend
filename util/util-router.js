const router = require('express').Router();
const authenticate = require('../auth/authenticate-middleware');

const userDb = require('../users/users-model');

//check if username is taken
router.get('/username', async (req, res) => {
    console.log(req.body);
    const {username} = req.body;
    try{
        const found = await userDb.findBy({username});

        if(found){
            res.status(200).json(true);
        }else{
            res.status(422).json(false);
        }
    }catch(err){
        console.log(err);
    }
    
    
    
});

//check if token is valid
router.get('/token', authenticate, (req, res) => {
    console.log('hello');
    res.status(200).json({valid: true});
});

module.exports = router;