const router = require('express').Router();

const ticketsDb = require('./tickets-model');

router.get('/open', async (req, res) => {
    try{
        const tickets = await ticketsDb.findOpen();
        res.status(200).json(tickets);
    }catch(err){
        res.status(500).json({message: 'Error retrieving open tickets'});
    }
});

router.get('/resolved', async (req, res) => {
    try{
        const tickets = await ticketsDb.findResolved();
        res.status(200).json(tickets);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error retrieving open tickets'});
    }
});

module.exports = router;