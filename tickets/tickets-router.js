const router = require('express').Router();

const ticketsDb = require('./tickets-model');

const db = require('../data/db-config');



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

router.get('/students/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const tickets = await ticketsDb.findStudentTickets(id);
        res.status(200).json(tickets);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error retrieving open tickets'});
    }
});

module.exports = router;