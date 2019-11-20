const router = require('express').Router();
const request = require('request');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;

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

router.get('/students/student/open', async (req, res) => {
    const {id} = req.user;
    try{
        const tickets = await ticketsDb.findStudentOpenTickets(id);
        if(tickets.length){
            res.status(200).json(tickets);
        }else{
            res.send(`No open tickets found for student with id ${id}`);
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({message: `Error retrieving open tickets for student with id ${id}`});
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const ticket = await db('tickets as t')
            // .where({'t.id': id})
            .leftJoin('students_tickets as st', 't.id', 'st.ticket_id')
            .leftJoin('helpers_tickets as ht', 't.id', 'ht.ticket_id')
            .leftJoin('resolved_tickets as rt', 't.id', 'rt.ticket_id')
            .leftJoin('users as su', 'st.student_id', 'su.id')
            .leftJoin('users as hu', 'ht.helper_id', 'hu.id')
            .leftJoin('users as rsu', 'rt.student_id', 'rsu.id')
            .leftJoin('users as rhu', 'rt.helper_id', 'rhu.id')
            .leftJoin('description_videos as dv', 't.id', 'dv.ticket_id')
            .leftJoin('solution_videos as sv', 't.id', 'sv.ticket_id')
            .select('t.*', 'dv.url as open_video', 'sv.url as resolved_video',
            db.raw(`CASE 
                WHEN su.name IS NOT NULL THEN su.name
                WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsu.name
                ELSE NULL 
                END AS student_name`),
            db.raw(`CASE 
                WHEN hu.name IS NOT NULL THEN hu.name
                WHEN hu.name IS NULL AND rhu.name IS NOT NULL THEN rhu.name
                ELSE NULL 
                END AS helper_name`),
            db.raw(`CASE 
                WHEN su.name IS NOT NULL AND hu.name IS NULL THEN 'open' 
                WHEN su.name IS NOT NULL AND hu.name IS NOT NULL THEN 'assigned'
                ELSE 'resolved'
                END AS status`),
            db.raw(`CASE
                WHEN rt.id IS NOT NULL THEN rt.resolved_at ELSE NULL
                END as resolved_at`));
        
        const open_pictures = await db('description_pictures').where({ticket_id: id}).select('url');
        const resolved_pictures = await db('solution_pictures').where({ticket_id: id}).select('url');

        res.status(200).json({...ticket, open_pictures, resolved_pictures});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error retrieving ticket information.'});
    }
})

router.get('/students/student/resolved', async (req, res) => {
    const {id} = req.user;
    try{
        const tickets = await ticketsDb.findStudentResolvedTickets(id);
        if(tickets.length){
            res.status(200).json(tickets);
        }else{
            res.send(`No resolved tickets found for student with id ${id}`)
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({message: `Error retrieving resolved tickets for student with id ${id}`});
    }
});

router.get('/helpers/open', async (req, res) => {
    const {id} = req.user;
    try{
        const tickets = await ticketsDb.findHelperTickets(id);
        if(tickets.length){
            res.status(200).json(tickets);
        }else{
            res.send(`No open tickets found for helper with id ${id}`);
        }

    }catch(err){
        console.log(err);
        res.status(500).json({message: `Error retrieving open tickets for helper with id ${id}`});
    }
});

router.get('/helpers/resolved', async (req, res) => {
    const {id} = req.user;
    try{
        const tickets = await ticketsDb.findHelperResolvedTickets(id);
        if(tickets.length){
            res.status(200).json(tickets);
        }else{
            res.send(`No resolved tickets found for helper with id ${id}`);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: `Error retrieving resolved tickets for helper with id ${id}`});
    }
});

router.post('/', async (req, res) => {
    try {
        const {category, title, description} = req.body;
        const ticket = await ticketsDb.openTicket({category, title, description}, req.user.id);

        const message = `Hey! \nA user just opened a ticket in category ${ticket.category}\nTicket title: ${ticket.title}\nDescription: ${ticket.description} \n :hotdog:\n`

        var data = {form: {
            token: process.env.SLACK_AUTH_TOKEN,
            channel: "#generall",
            text: message,
            blocks: JSON.stringify([
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": `Ticket id: ${ticket.id}`
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "A new ticket has been opened:\n <https://lambdadevdesk.now.sh/|Click here to view.>"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Category:*\n${ticket.category}\n*Title:*\n${ticket.title}\n*Description:*\n${ticket.description}`
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": "https://res.cloudinary.com/duoz4fpzs/image/upload/v1574148471/ssetylq8etg7svhvnulq.png",
                        "alt_text": "computer thumbnail"
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": `Ticket created on: ${ticket.created_at}`
                        }
                    ]
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Help Student"
                            },
                            "action_id": "assign_ticket",
                            "style": "primary",
                            "value": "click_me_123"
                        },
                    ]
                }
            ])
          }};
  
        request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {});
        

        res.status(201).json(ticket);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error opening ticket'});
    }
});

router.post('/:id/help', async (req, res) => {
    const {slack, user_id} = req.body;
    try {
        const ticket = await ticketsDb.assignTicket(req.params.id, req.user.id);
        if(slack && user_id){
            var data = {form: {
                token: process.env.SLACK_AUTH_TOKEN,
                user: user_id
                }
            };
            
            const id = await request.post('https://slack.com/api/im.open', data, async function (error, response, body) {
                const {id} = (JSON.parse(body).channel);
                data = {form: {
                    token: process.env.SLACK_AUTH_TOKEN,
                    channel: id,
                    text: `You have successfully been assigned to ticket with id ${req.params.id}`
                    }
                }
    
                await request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {});
            });
        }
        res.status(201).json(ticket);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error assigning ticket'});
    }
});

router.delete('/:id/queue', async (req, res) => {
    try {
        const {id} = req.params;
        const returned = await ticketsDb.returnToQueue(id);
        if(returned){
            res.status(200).json({message: `Ticket with id ${id} returned to the queue.`});
        }else{
            res.send(`Ticket with id ${id} not found.`);
        }
    }catch(err){
        res.status(500).json({message: 'Server could not return the ticket to the queue.'});
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const result = await db('students_tickets as s')
            .where({'s.ticket_id': id})
            .select('s.student_id');
        
        if(result.length){
            const [{student_id}] = result;
            if(student_id === req.user.id){
                const {category, title, description} = req.body;
                const ticket = {category, title, description};
                Object.keys(ticket).forEach(key => ticket[key] === undefined && delete ticket[key])
                const updated = await ticketsDb.update(id, ticket);
                
                if(updated){
                    const ticket = await db('tickets')
                        .where({id})
                        .first();
                    res.status(200).json(ticket);
                }else{
                    throw 'Ticket could not be updated.'
                }
            }else{
                res.status(403).json({message: `You are not the author of the ticket with id ${id}`});
            }
        }else{
            throw 'Empty result'
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error updating ticket.'});
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const found = await db('tickets')
        .where({id})
        .first();

        const  open = await db('students_tickets')
        .where({ticket_id: id})
        .first()
        .select('student_id');

        const  resolved = await db('resolved_tickets')
        .where({ticket_id: id})
        .first()
        .select('student_id');
        
        if(found){
            if((open && open.student_id === req.user.id) || (resolved && resolved.student_id === req.user.id)){
                const deleted = await ticketsDb.remove(id);
                if(deleted){
                    res.status(200).json({message: `Ticket with id ${id} successfully deleted.`});
                }
            }else{
                res.status(403).json({message: `You are not the author of the ticket with id ${id}`});
            }
        }else{
            res.status(404).json({message: `Ticket with id ${id} not found.`});
        }
        
    }catch(err){
        res.status(500).json({message: `Error deleting ticket with id ${id}`});
    }
});

router.post('/:id/resolve', async (req, res) => {
    const {id} = req.params;
    const {solution} = req.body;
    try{
    const ticket = await ticketsDb.resolve(parseInt(id), req.user.id, solution);
    res.status(201).json(ticket);
    }catch(err){
        if(err === 1){
            res.status(403).json({message: `Error resolving ticket with id ${id}. If you are a student you did not open this ticket. If you are a helper you are not assigned to it.`});
        }else{
            res.status(500).json({message: `Error resolving ticket with id ${id}`});
        }
    }
});

router.put('/resolved/:id', async (req, res) => {
    const {id} = req.params;
    const {solution} = req.body;
    try{
        const ticket = await ticketsDb.updateSolution(id, req.user.id, solution);
        res.status(200).json({ticket});
    }catch(err){
        if(err === 1){
            res.status(403).json({message: `Error resolving ticket with id ${id}. If you are a student you did not open this ticket. If you are a helper you are not assigned to it.`});
        }else if(err === 2){
            res.status(404).json({message: `There are no resolved tickets with id ${id}.`});
        }else{
            console.log(err);
            res.status(500).json({message: `Error updating solution for ticket with id ${id}`});
        }
    }
});

//ticket pictures
router.post('/:id/pictures', async (req, res) => {
    const {id} = req.params;
    const {open} = req.body;
    const images = req.files;
    const uploads = [];
    try{
        for(let key in images){
            const file = images[key];
            uploads.push(cloudinary.uploader.upload(file.tempFilePath, (err, result) => {}));
        }
        const results = await axios.all(uploads)
        // console.log(results);
        const urls = results.map(result => result.url);
        const inserts = [];
        
        for(url of urls){
            if(open){
                inserts.push(    
                    db('description_pictures')
                    .insert({ticket_id: id, url})
                )
            }else{
                inserts.push(    
                    db('solution_pictures')
                    .insert({ticket_id: id, url})
                )
            }
        }
        await Promise.all(inserts);
        res.status(200).json(urls);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding images'});
    }
});

router.post('/:id/video', async (req, res) => {
    const {id} = req.params;
    const {open} = req.body;
    const {video} = req.files;
    try{
        await uploads.push(cloudinary.uploader.upload(video.tempFilePath, { resource_type: "video" }, async (err, result) => {
            if(open){
                inserts.push(    
                    await db('description_videos')
                        .insert({ticket_id: id, url: result.url})
                )
            }else{
                inserts.push(    
                    await db('solution_videos')
                        .insert({ticket_id: id, url: result.url})
                )
            }
            res.status(200).json(result.url);
        }));
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding video.'});
    }
});

module.exports = router;