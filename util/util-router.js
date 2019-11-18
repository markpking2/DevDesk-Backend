const router = require('express').Router();

const userDb = require('../users/users-model');

//check if username is available
router.get('/username', async (req, res) => {
    const {username} = req.body;
    const available = await userDb.findBy({username});
    
    if(available){
        res.status(200).json(true);
    }else{
        res.status(422).json(false);
    }
});

module.exports = router;