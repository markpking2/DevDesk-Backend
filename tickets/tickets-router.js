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
        if(tickets.length){
            res.status(200).json(tickets);
        }else{
            res.status(404).json({message: `No tickets found for student with id ${id}`})
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({message: `Error retrieving tickets for student with id ${id}`});
    }
});

router.get('/helpers/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const tickets = await ticketsDb.findHelperTickets(id);
        if(tickets.length){
            res.status(200).json(tickets);
        }else{
            res.status(404).json({message: `No tickets found for helper with id ${id}`});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({message: `Error retrieving tickets for helper with id ${id}`});
    }
});

router.post('/', async (req, res) => {
    try {
        const {category, title, description} = req.body;
        const ticket = await ticketsDb.openTicket({category, title, description}, req.user.id);
        
        res.status(201).json(ticket);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error opening ticket'});
    }

});

module.exports = router;