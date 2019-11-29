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
        console.log(err);
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

router.get('/authors/author/open', async (req, res) => {
    const {id} = req.user;
    try{
        const tickets = await ticketsDb.findStudentOpenTickets(id);
        if(tickets.length){
            res.status(200).json(tickets);
        }else{
            res.send({message: `No open tickets found for user with id ${id}`});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: `Error retrieving open tickets for user with id ${id}`});
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const [ticket] = await ticketsDb.findById(id);
        const ticket_comments = await ticketsDb.findTicketComments(id);
        
        if(ticket){
            const open_pictures = await db('tickets_pictures').where({ticket_id: id}).select('url');
            const resolved_pictures = await db('tickets_solutions_pictures').where({ticket_id: id}).select('url');
            res.status(200).json({ticket_details: ticket, ticket_comments, open_pictures, resolved_pictures});
        }else{
            res.status(404).json({message: `No tickets found with id ${id}`})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error retrieving ticket information.'});
    }
})

router.get('/authors/author/resolved', async (req, res) => {
    const {id} = req.user;
    try{
        const tickets = await ticketsDb.findStudentResolvedTickets(id);
        if(tickets.length){
            res.status(200).json(tickets);
        }else{
            res.send({message: `No resolved tickets found for author with id ${id}`})
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({message: `Error retrieving resolved tickets for student with id ${id}`});
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

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const result = await db('authors_tickets as s')
            .where({'s.ticket_id': id})
            .select('s.author_id');
        
        if(result.length){
            const [{author_id}] = result;
            if(author_id === req.user.id){
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

        const  open = await db('authors_tickets')
        .where({ticket_id: id})
        .first()
        .select('author_id');

        const  resolved = await db('resolved_tickets')
        .where({ticket_id: id})
        .first()
        .select('author_id');
        
        if(found){
            if((open && open.author_id === req.user.id) || (resolved && resolved.author_id === req.user.id)){
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
            res.status(403).json({message: `Error resolving ticket with id ${id}. You did not create this ticket.`});
        }else{
            console.log(err);
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
            res.status(403).json({message: `Error resolving ticket with id ${id}. You did not create this ticket. `});
        }else if(err === 2){
            res.status(404).json({message: `There are no resolved tickets with id ${id}.`});
        }else{
            console.log(err);
            res.status(500).json({message: `Error updating solution for ticket with id ${id}`});
        }
    }
});

//comments
router.post('/:id/comments', async (req, res) => {
    const {id} = req.params;
    const {description} = req.body;
    try{
        const comment_id = await ticketsDb.addComment(req.user.id, id, description);
        res.status(201).json(comment_id);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding comment'});
    }
});

router.put('/comments/:id', async (req, res) => {
    const {id} = req.params;
    const {description} = req.body;
    try{
        const reply_id = await ticketsDb.updateComment(id, description);
        res.status(200).json(reply_id);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error updating comment.'});
    }
});


router.delete('/comments/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const deleted = await ticketsDb.deleteComment(id);
        if(deleted){
            res.status(200).json({message: `Comment with id ${id} successfully deleted.`});
        }else{
            throw 'Comment was not deleted';
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error deleting comment.'});
    }
});

//replies
router.post('/comments/:id/replies', async (req, res) => {
    const {id} = req.params;
    const {description} = req.body;
    try{
        const reply_id = await ticketsDb.addReply(req.user.id, id, description);
        res.status(201).json(reply_id);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding reply.'});
    }
});

router.put('/comments/replies/:id', async (req, res) => {
    const {id} = req.params;
    const {description} = req.body;
    try{
        const reply_id = await ticketsDb.updateReply(id, description);
        res.status(200).json(reply_id);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error updating reply.'});
    }
});


router.delete('/comments/replies/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const deleted = await ticketsDb.deleteReply(id);
        if(deleted){
            res.status(200).json({message: `Reply with id ${id} successfully deleted.`});
        }else{
            throw 'Reply was not deleted';
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error deleting reply.'});
    }
});

//add pictures

async function addPictures(tableName, images, insert){
    const uploads = [];
    try{
        for(let key in images){
            const file = images[key];
            uploads.push(cloudinary.uploader.upload(file.tempFilePath, (err, result) => {}));
        }
        const results = await axios.all(uploads)

        const urls = results.map(result => result.secure_url);
        const inserts = [];
        
        for(url of urls){
            inserts.push(    
                db(tableName)
                .insert({...insert, url})
            )
        }
        await Promise.all(inserts);
        return urls;
    }catch(err){
        throw err;
    }
}

router.post('/:id/pictures/open', async (req, res) => {
    const {id} = req.params;
    const images = req.files;
    try{
        const urls = await addPictures('tickets_pictures', images, {ticket_id: id});
        res.status(200).json(urls);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding images'});
    }
});

router.post('/:id/pictures/resolved', async (req, res) => {
    const {id} = req.params;
    const images = req.files;
    try{
        const urls = await addPictures('tickets_solutions_pictures', images, {ticket_id: id});
        res.status(200).json(urls);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding images'});
    }
});

router.post('/comments/:id/pictures', async (req, res) => {
    const {id} = req.params;
    const images = req.files;
    try{
        const urls = await addPictures('comments_pictures', images, {comment_id: id});
        res.status(200).json(urls);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding images'});
    }
});

router.post('/comments/replies/:id/pictures', async (req, res) => {
    const {id} = req.params;
    const images = req.files;
    try{
        const urls = await addPictures('comments_replies_pictures', images, {reply_id: id});
        res.status(200).json(urls);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding images'});
    }
});

//add videos

async function addVideo(tableName, video, insert){
    try{
        return await cloudinary.uploader.upload(video.tempFilePath, { resource_type: "video" }, async (err, result) => {
            await db(tableName)
                .insert({...insert, url: result.url});
        });
    }catch(err){
        throw err;
    }
}

router.post('/:id/video/open', async (req, res) => {
    const {id} = req.params;
    const {video} = req.files;
    try{
        const response = await addVideo('tickets_videos', video, {ticket_id: id});
        res.status(200).json(response.secure_url);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding video.'});
    }
});

router.post('/:id/video/resolved', async (req, res) => {
    const {id} = req.params;
    const {video} = req.files;
    try{
        const response = await addVideo('tickets_solutions_videos', video, {ticket_id: id});
        res.status(200).json(response.secure_url);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding video.'});
    }
});

router.post('/comments/:id/video', async (req, res) => {
    const {id} = req.params;
    const {video} = req.files;
    try{
        const response = await addVideo('comments_videos', video, {comment_id: id});
        res.status(200).json(response.secure_url);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding video.'});
    }
});

router.post('/comments/replies/:id/video', async (req, res) => {
    const {id} = req.params;
    const {video} = req.files;
    try{
        const response = await addVideo('comments_replies_videos', video, {reply_id: id});
        res.status(200).json(response.secure_url);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error adding video.'});
    }
});

module.exports = router;