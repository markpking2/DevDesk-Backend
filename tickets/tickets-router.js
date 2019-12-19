const router = require("express").Router();
const request = require("request");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const ticketsDb = require("./tickets-model");
const db = require("../data/db-config");

router.get("/open", async (req, res) => {
    try {
        const tickets = await ticketsDb.findOpen();
        res.status(200).json(tickets);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving open tickets" });
    }
});

router.get("/resolved", async (req, res) => {
    try {
        const tickets = await ticketsDb.findResolved();
        res.status(200).json(tickets);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving open tickets" });
    }
});

router.get("/authors/author/open", async (req, res) => {
    const { id } = req.user;
    try {
        const tickets = await ticketsDb.findStudentOpenTickets(id);
        if (tickets.length) {
            res.status(200).json(tickets);
        } else {
            res.send({
                message: `No open tickets found for user with id ${id}`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Error retrieving open tickets for user with id ${id}`
        });
    }
});

router.get("/mine", async (req, res) => {
    try {
        const tickets = await ticketsDb.findMine(req.user.id);
        res.status(200).json(tickets);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Error retrieving tickets associated with user id ${req.user.id}`
        });
    }
});

router.get("/all/query", async (req, res) => {
    const { course, unit, week, day } = req.query;
    console.log("Req.Query", req.query);
    console.log("Req.Query Destructured: ", course, unit, week, day);
    try {
        if (!course && (unit || week || day)) {
            throw "No course query string provided";
        } else if (
            (unit && isNaN(unit)) ||
            (week && isNaN(week)) ||
            (day && isNaN(day))
        ) {
            throw "Invalid unit, week, or day";
        }
        if (course && unit && week && day) {
            const result = await ticketsDb.findTicketByQuery(req.query);
            if (!result) throw "Not found";
            res.status(200).json(result);
        } else if (course && unit && week) {
            const result = await ticketsDb.findTicketByQuery(req.query);
            if (!result) throw "Not found";
            res.status(200).json(result);
        } else if (course && unit) {
            const result = await ticketsDb.findTicketByQuery(req.query);
            if (!result) throw "Not found";
            res.status(200).json(result);
        } else if (course) {
            const result = await ticketsDb.findTicketByQuery(req.query);
            if (!result) throw "Not found";
            res.status(200).json(result);
        } else {
            const result = await ticketsDb.findTicketByQuery(req.query);
            res.status(200).json(result);
        }
    } catch (err) {
        if (err === "Not found") {
            res.status(404).json({
                message: `No result found using specified query parameters`
            });
        } else if (err === "No course query string provided") {
            res.status(400).json({ message: err });
        } else if (err === "Invalid unit, week, or day") {
            res.status(400).json({
                message:
                    "Invalid query string. Unit, week, and day must be a number"
            });
        } else {
            console.log(err);
            res.status(500).json({
                message: "Error retrieving course information"
            });
        }
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [ticket] = await ticketsDb.findById(id);
        const ticket_comments = await ticketsDb.findTicketComments(id);

        if (ticket) {
            const open_pictures = await db("tickets_pictures")
                .where({ ticket_id: id })
                .select("id", "url", "width", "height", "filename");
            const resolved_pictures = await db("tickets_solutions_pictures")
                .where({ ticket_id: id })
                .select("id", "url", "width", "height", "filename");
            res.status(200).json({
                ticket_details: ticket,
                ticket_comments,
                open_pictures,
                resolved_pictures
            });
        } else {
            res.status(404).json({ message: `No tickets found with id ${id}` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error retrieving ticket information."
        });
    }
});

router.get("/authors/author/resolved", async (req, res) => {
    const { id } = req.user;
    try {
        const tickets = await ticketsDb.findStudentResolvedTickets(id);
        if (tickets.length) {
            res.status(200).json(tickets);
        } else {
            res.send({
                message: `No resolved tickets found for author with id ${id}`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Error retrieving resolved tickets for student with id ${id}`
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            category,
            title,
            description,
            course,
            unit,
            week,
            day
        } = req.body;
        const ticket = await ticketsDb.openTicket(
            { category, title, description, course, unit, week, day },
            req.user.id
        );

        const message = `Hey! \nA user just opened a ticket in category ${ticket.category}\nTicket title: ${ticket.title}\nDescription: ${ticket.description} \n :hotdog:\n`;

        var data = {
            form: {
                token: process.env.SLACK_AUTH_TOKEN,
                channel: "#general",
                text: message,
                blocks: JSON.stringify([
                    {
                        type: "context",
                        elements: [
                            {
                                type: "mrkdwn",
                                text: `Ticket id: ${ticket.id}`
                            }
                        ]
                    },
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text:
                                "A new ticket has been opened:\n <https://lambdadevdesk.now.sh/|Click here to view.>"
                        }
                    },
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: `*Category:*\n${ticket.category}\n*Title:*\n${ticket.title}\n*Description:*\n${ticket.description}`
                        },
                        accessory: {
                            type: "image",
                            image_url:
                                "https://res.cloudinary.com/duoz4fpzs/image/upload/v1574148471/ssetylq8etg7svhvnulq.png",
                            alt_text: "computer thumbnail"
                        }
                    },
                    {
                        type: "context",
                        elements: [
                            {
                                type: "mrkdwn",
                                text: `Ticket created on: ${ticket.created_at}`
                            }
                        ]
                    },
                    {
                        type: "actions",
                        elements: [
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    emoji: true,
                                    text: "Resolve"
                                },
                                action_id: "resolve_ticket",
                                style: "primary",
                                value: `${ticket.id}`
                            }
                        ]
                    }
                ])
            }
        };

        request.post(
            "https://slack.com/api/chat.postMessage",
            data,
            async function(error, response, body) {
                try {
                    await db("ticket_timestamps").insert({
                        ticket_id: ticket.id,
                        timestamp: JSON.parse(body).ts
                    });
                } catch (err) {
                    throw err;
                }
            }
        );

        res.status(201).json(ticket);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error opening ticket" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db("authors_tickets as s")
            .where({ "s.ticket_id": id })
            .select("s.author_id");

        if (result.length) {
            const [{ author_id }] = result;
            if (author_id === req.user.id) {
                const { category, title, description } = req.body;
                const ticket = { category, title, description };
                Object.keys(ticket).forEach(
                    key => ticket[key] === undefined && delete ticket[key]
                );
                const updated = await ticketsDb.update(id, ticket);

                if (updated) {
                    const ticket = await db("tickets")
                        .where({ id })
                        .first();
                    res.status(200).json(ticket);
                } else {
                    throw "Ticket could not be updated.";
                }
            } else {
                res.status(403).json({
                    message: `You are not the author of the ticket with id ${id}`
                });
            }
        } else {
            throw "Empty result";
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating ticket." });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const found = await db("tickets")
            .where({ id })
            .first();

        const open = await db("authors_tickets")
            .where({ ticket_id: id })
            .first()
            .select("author_id");

        const resolved = await db("resolved_tickets")
            .where({ ticket_id: id })
            .first()
            .select("author_id");

        if (found) {
            if (
                (open && open.author_id === req.user.id) ||
                (resolved && resolved.author_id === req.user.id)
            ) {
                const deleted = await ticketsDb.remove(id);
                if (deleted) {
                    res.status(200).json({
                        message: `Ticket with id ${id} successfully deleted.`
                    });
                }
            } else {
                res.status(403).json({
                    message: `You are not the author of the ticket with id ${id}`
                });
            }
        } else {
            res.status(404).json({
                message: `Ticket with id ${id} not found.`
            });
        }
    } catch (err) {
        res.status(500).json({
            message: `Error deleting ticket with id ${id}`
        });
    }
});

router.post("/:id/resolve", async (req, res) => {
    const { id } = req.params;
    const { solution, comment_id, reply_id } = req.body;

    try {
        const result = await db("ticket_timestamps")
            .where({ ticket_id: id })
            .first();
        const ticket = await ticketsDb.resolve(
            parseInt(id),
            req.user.id,
            solution,
            comment_id,
            reply_id
        );
        if (result && result.timestamp) {
            var data = {
                form: {
                    token: process.env.SLACK_AUTH_TOKEN,
                    channel: "CQQ7CQC14",
                    ts: result.timestamp
                }
            };

            request.post(
                "https://slack.com/api/chat.delete",
                data,
                async function(error, response, body) {
                    try {
                        await db("ticket_timestamps")
                            .where({ ticket_id: id })
                            .del();
                    } catch (err) {
                        throw err;
                    }
                }
            );
        }
        res.status(201).json(ticket);
    } catch (err) {
        if (err === 1) {
            res.status(403).json({
                message: `Error resolving ticket with id ${id}. You did not create this ticket.`
            });
        }
        if (err === 2) {
            res.status(404).json({ message: `No open ticket with id ${id}.` });
        } else {
            console.log(err);
            res.status(500).json({
                message: `Error resolving ticket with id ${id}`
            });
        }
    }
});

router.post("/:id/reopen", async (req, res) => {
    const { id } = req.params;
    const reopened = await ticketsDb.reopenTicket(id);
    if (reopened) {
        res.status(200).json({
            message: `Ticket with id ${id} successfully reopened`
        });
    } else {
        res.status(500).json({ message: "Error reopening ticket" });
    }
});

router.put("/resolved/:id", async (req, res) => {
    const { id } = req.params;
    const { solution, comment_id, reply_id } = req.body;
    try {
        const ticket = await ticketsDb.updateSolution(
            id,
            req.user.id,
            solution,
            comment_id,
            reply_id
        );
        res.status(200).json({ ticket });
    } catch (err) {
        if (err === 1) {
            res.status(403).json({
                message: `Error resolving ticket with id ${id}. You did not create this ticket. `
            });
        } else if (err === 2) {
            res.status(404).json({
                message: `There are no resolved tickets with id ${id}.`
            });
        } else {
            console.log(err);
            res.status(500).json({
                message: `Error updating solution for ticket with id ${id}`
            });
        }
    }
});

//comments
router.get("/comments/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await ticketsDb.findCommentById(id);
        if (comment) {
            if (comment.id) {
                res.status(200).json({ ...comment, collapsed: true });
            } else {
                res.status(404).json({
                    message: `Could not find comment with id: ${id}`
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error getting comment" });
    }
});
router.post("/:id/comments", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    try {
        const comment_id = await ticketsDb.addComment(
            req.user.id,
            id,
            description
        );
        const comment = await ticketsDb.findCommentById(comment_id);
        res.status(201).json({ ...comment, collapsed: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding comment" });
    }
});
router.put("/comments/:id", async (req, res) => {
    const { id } = req.params;
    const { description, collapsed } = req.body;
    try {
        const updated = await ticketsDb.updateComment(id, description);
        if (updated) {
            const comment = await ticketsDb.findCommentById(id);
            res.status(200).json({
                ...comment,
                collapsed: typeof collapsed !== "undefined" ? collapsed : true
            });
        } else {
            throw "Comment was not updated.";
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating comment." });
    }
});

router.delete("/comments/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await ticketsDb.deleteComment(id);
        if (deleted) {
            res.status(200).json({
                message: `Comment with id ${id} successfully deleted.`
            });
        } else {
            throw "Comment was not deleted";
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting comment." });
    }
});

//replies
router.get("/replies/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const reply = await ticketsDb.findReplyById(id);
        if (reply) {
            if (reply.id) {
                res.status(200).json({ ...reply });
            } else {
                res.status(404).json({
                    message: `Could not find reply with id: ${id}`
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error getting reply" });
    }
});
router.post("/comments/:id/replies", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    try {
        const reply_id = await ticketsDb.addReply(req.user.id, id, description);
        const reply = await ticketsDb.findReplyById(reply_id);
        res.status(201).json(reply);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding reply." });
    }
});
router.put("/comments/replies/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    try {
        const reply_id = await ticketsDb.updateReply(id, description);
        const reply = await ticketsDb.findReplyById(reply_id);
        res.status(200).json(reply);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating reply." });
    }
});




router.put("/:id/sendall", async (req, res) => {
    console.log(req.body);
    try {
        const { id } = req.params;
        const files = req.files;
        const promises = [];
        let images = [];
        const video = req.files && req.files.video;
        const { title } = req.body;
        const { category } = req.body;
        const { description } = req.body;

        let ticketObj = '';
        if (title)
        {
            ticketObj = {...ticketObj, title};
        }
        if (category)
        {
            ticketObj = {...ticketObj, category};
        }
        if (description)
        {
            ticketObj = {...ticketObj, description};
        }
        console.log('ticket obj: ', ticketObj);
        console.log('files: ', files);
        // console.log('files length thing ', Object.keys(files).length);

        files !== null && Object.keys(files).map(key => {
            if(key.includes('image')){
                images.push(files[key]);
            }
        });

        db("tickets_videos")
        .where({ ticket_id: id })
        .first()
        .then(hasVideo => {
            if(req.files && req.files.images && req.files.images.length){
                images = {...req.files.images};
            }
            
            if (files !== null && Object.keys(images).length) {
                promises.push(addPictures("tickets_pictures", images, {
                    ticket_id: id
                }));
            } else {
                promises.push(Promise.resolve('No images were provided.'));
            }
            
            if (files !== null && video) {
                if (hasVideo) {
                    promises.push(
                    db("tickets_videos")
                        .where({ ticket_id: id })
                        .del()
                        .then(deleted => {
                            if(deleted){
                                return addVideo("tickets_videos", video, {
                                    ticket_id: id
                                }).then(result => {
                                    return result;
                                })
                                .catch(err => {
                                    throw err;
                                })
                            }else{
                                return Promise.resolve('Video was not deleted.');
                            }
                        })
                    )
                } else {
                    promises.push(
                        addVideo("tickets_videos", video, {
                            ticket_id: id
                        }).catch(e => e)
                    );
                }
            } else {
                promises.push(Promise.resolve('No video was provided.'));
            }

            if (ticketObj) {
                promises.push(ticketsDb.update(id, ticketObj).catch(e => e));
            } else {
                promises.push(Promise.resolve('No description was provided.'));
            }

            Promise.all(promises).then(result => {
                async function getTicket() {
                    try {
                        const [ticket] = await ticketsDb.findById(id);
                        const ticket_comments = await ticketsDb.findTicketComments(id);
                
                        if (ticket) {
                            const open_pictures = await db("tickets_pictures")
                                .where({ ticket_id: id })
                                .select("id", "url", "width", "height", "filename");
                            const resolved_pictures = await db("tickets_solutions_pictures")
                                .where({ ticket_id: id })
                                .select("id", "url", "width", "height", "filename");
                            res.status(200).json({
                                ticket_details: ticket,
                                ticket_comments,
                                open_pictures,
                                resolved_pictures
                            });
                        } else {
                            res.status(404).json({ message: `No tickets found with id ${id}` });
                        }
                    } catch (err) {
                        console.log(err);
                        res.status(500).json({
                            message: "Error retrieving ticket information."
                        });
                    }
                }
                getTicket();
                // ticketsDb.findById(id).then(result => {
                //     res.status(200).json({
                //         ticket: result
                //     })
                // })
                // .catch(err => {
                //     throw err;
                // })
            })
            .catch(err => {
                throw err;
            });
        })
        .catch(err => {
            throw err;
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Oh no!" });
    }
});
router.put("/comments/:id/sendall", async (req, res) => {
    console.log(req.body);
    try {
        const { id } = req.params;
        const files = req.files;
        const promises = [];
        let images = [];
        const video = req.files && req.files.video;
        const { description, collapsed } = req.body;
        
        files !== null && Object.keys(files).map(key => {
            if(key.includes('image')){
                images.push(files[key]);
            }
        });

        db("comments_videos")
        .where({ comment_id: id })
        .first()
        .then(hasVideo => {
            if(req.files && req.files.images && req.files.images.length){
                images = {...req.files.images};
            }
            
            if (files !== null && Object.keys(images).length) {
                promises.push(addPictures("comments_pictures", images, {
                    comment_id: id
                }));
            } else {
                promises.push(Promise.resolve('No images were provided.'));
            }
            
            if (description) {
                promises.push(ticketsDb.updateComment(id, description).catch(e => e));
            } else {
                promises.push(Promise.resolve('No description was provided.'));
            }
            
            if (files !== null && video) {
                if (hasVideo) {
                    promises.push(
                    db("comments_videos")
                        .where({ comment_id: id })
                        .del()
                        .then(deleted => {
                            if(deleted){
                                return addVideo("comments_videos", video, {
                                    comment_id: id
                                }).then(result => {
                                    return result;
                                })
                                .catch(err => {
                                    throw err;
                                })
                            }else{
                                return Promise.resolve('Video was not deleted.');
                            }
                        })
                    )
                } else {
                    promises.push(
                        addVideo("comments_videos", video, {
                            comment_id: id
                        }).catch(e => e)
                    );
                }
            } else {
                promises.push(Promise.resolve('No video was provided.'));
            }

            Promise.all(promises).then(result => {
                ticketsDb.findCommentById(id).then(result => {
                    res.status(200).json({
                        comment: {...result,
                        collapsed: collapsed}
                    })
                })
                .catch(err => {
                    throw err;
                })
            })
            .catch(err => {
                throw err;
            });
        })
        .catch(err => {
            throw err;
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Oh no!" });
    }
});
router.put("/comments/replies/:id/sendall", async (req, res) => {
    console.log(req.body);
    try {
        const { id } = req.params;
        const files = req;
        const promises = [];
        let images = [];
        const video = req.files && req.files.video;
        const { description } = req.body;

        files !== null && Object.keys(files).map(key => {
            if(key.includes('image')){
                images.push(files[key]);
            }
        });
        console.log('files', files);
        console.log('images', images);

        db("comments_replies_videos")
        .where({ reply_id: id })
        .first()
        .then(hasVideo => {
            if(req.files && req.files.images && req.files.images.length){
                images = {...req.files.images};
            }
            
            if (files !== null && Object.keys(images).length) {
                promises.push(addPictures("comments_replies_pictures", images, {
                    reply_id: id
                }));
            } else {
                promises.push(Promise.resolve('No images were provided.'));
            }
            
            if (description) {
                promises.push(ticketsDb.updateReply(id, description).catch(e => e));
            } else {
                promises.push(Promise.resolve('No description was provided.'));
            }
            
            if (files !== null && video) {
                if (hasVideo) {
                    promises.push(
                    db("comments_replies_videos")
                        .where({ reply_id: id })
                        .del()
                        .then(deleted => {
                            if(deleted){
                                return addVideo("comments_replies_videos", video, {
                                    reply_id: id
                                }).then(result => {
                                    return result;
                                })
                                .catch(err => {
                                    throw err;
                                })
                            }else{
                                return Promise.resolve('Video was not deleted.');
                            }
                        })
                    )
                } else {
                    promises.push(
                        addVideo("comments_replies_videos", video, {
                            reply_id: id
                        }).catch(e => e)
                    );
                }
            } else {
                promises.push(Promise.resolve('No video was provided.'));
            }

            Promise.all(promises).then(result => {
                ticketsDb.findReplyById(id).then(result => {
                    res.status(200).json({
                        reply: result
                    })
                })
                .catch(err => {
                    throw err;
                })
            })
            .catch(err => {
                throw err;
            });
        })
        .catch(err => {
            throw err;
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Oh no!" });
    }
});




router.delete("/comments/replies/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await ticketsDb.deleteReply(id);
        if (deleted) {
            res.status(200).json({
                message: `Reply with id ${id} successfully deleted.`
            });
        } else {
            throw "Reply was not deleted";
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting reply." });
    }
});

//add pictures
async function addPictures(tableName, images, insert) {
    const uploads = [];
    try {
        for (let key in images) {
            const file = images[key];
            uploads.push(
                cloudinary.uploader.upload(
                    file.tempFilePath,
                    (err, result) => {}
                )
            );
        }
        const results = await axios.all(uploads);

        const imgs = results.map(result => {
            console.log("Adding Picture to :", tableName, result);
            return {
                id: result.id,
                url: result.secure_url,
                width: result.width,
                height: result.height,
                filename: result.original_filename
            };
        });

        const inserts = [];

        for (img of imgs) {
            inserts.push(db(tableName).insert({ ...insert, ...img }));
        }
        await Promise.all(inserts);
        return imgs;
    } catch (err) {
        throw err;
    }
}
router.post("/:id/pictures/open", async (req, res) => {
    const { id } = req.params;
    const images = req.files;
    try {
        const urls = await addPictures("tickets_pictures", images, {
            ticket_id: id
        });
        res.status(200).json(urls);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding images" });
    }
});
router.post("/:id/pictures/resolved", async (req, res) => {
    const { id } = req.params;
    const images = req.files;
    try {
        const urls = await addPictures("tickets_solutions_pictures", images, {
            ticket_id: id
        });
        res.status(200).json(urls);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding images" });
    }
});
router.post("/comments/:id/pictures", async (req, res) => {
    const { id } = req.params;
    const images = req.files;
    try {
        const urls = await addPictures("comments_pictures", images, {
            comment_id: id
        });
        res.status(200).json(urls);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding images" });
    }
});
router.post("/comments/replies/:id/pictures", async (req, res) => {
    const { id } = req.params;
    const images = req.files;
    try {
        const urls = await addPictures("comments_replies_pictures", images, {
            reply_id: id
        });
        res.status(200).json(urls);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding images" });
    }
});

//add videos
async function addVideo(tableName, video, insert) {
    try {
        return await cloudinary.uploader.upload(
            video.tempFilePath,
            { resource_type: "video" },
            async (err, result) => {
                await db(tableName).insert({ ...insert, url: result.url });
            }
        );
    } catch (err) {
        console.log(err);
        throw err;
    }
}
router.post("/:id/video/open", async (req, res) => {
    const { id } = req.params;
    const { video } = req.files;
    try {
        const response = await addVideo("tickets_videos", video, {
            ticket_id: id
        });
        res.status(200).json({ id: response.id, url: response.secure_url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding video." });
    }
});
router.post("/:id/video/resolved", async (req, res) => {
    const { id } = req.params;
    const { video } = req.files;
    try {
        const response = await addVideo("tickets_solutions_videos", video, {
            ticket_id: id
        });
        res.status(200).json({ id: response.id, url: response.secure_url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding video." });
    }
});
router.post("/comments/:id/video", async (req, res) => {
    const { id } = req.params;
    const { video } = req.files;
    try {
        const response = await addVideo("comments_videos", video, {
            comment_id: id
        });
        res.status(200).json({ id: response.id, url: response.secure_url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding video." });
    }
});
router.post("/comments/replies/:id/video", async (req, res) => {
    const { id } = req.params;
    const { video } = req.files;
    try {
        const response = await addVideo("comments_replies_videos", video, {
            reply_id: id
        });
        res.status(200).json({ id: response.id, url: response.secure_url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding video." });
    }
});

//delete pictures
router.delete("/picture/open/:id", async (req, res) => {
    try {
        const deleted = await db("tickets_pictures")
            .where({ id: req.params.id })
            .del();

        if (deleted) {
            res.status(200).json({
                message: `Ticket picture id: ${req.params.id} successfully deleted`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting ticket picture." });
    }
});
router.delete("/picture/resolved/:id", async (req, res) => {
    try {
        const deleted = await db("tickets_solutions_pictures")
            .where({ id: req.params.id })
            .del();

        if (deleted) {
            res.status(200).json({
                message: `Ticket picture id: ${req.params.id} successfully deleted`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting ticket picture." });
    }
});
router.delete("/comments/picture/:id", async (req, res) => {
    try {
        const deleted = await db("comments_pictures")
            .where({ id: req.params.id })
            .del();

        if (deleted) {
            res.status(200).json({
                message: `Comment picture id: ${req.params.id} successfully deleted`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting comment picture." });
    }
});
router.delete("/comments/replies/picture/:id", async (req, res) => {
    try {
        const deleted = await db("comments_replies_pictures")
            .where({ id: req.params.id })
            .del();

        if (deleted) {
            res.status(200).json({
                message: `Reply picture id: ${req.params.id} successfully deleted`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting reply picture." });
    }
});

//delete videos
router.delete("/video/open/:id", async (req, res) => {
    try {
        const deleted = await db("tickets_videos")
            .where({ id: req.params.id })
            .del();

        if (deleted) {
            res.status(200).json({
                message: `Ticket video id: ${req.params.id} successfully deleted`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting ticket video." });
    }
});
router.delete("/video/resolved/:id", async (req, res) => {
    try {
        const deleted = await db("tickets_solutions_videos")
            .where({ id: req.params.id })
            .del();

        if (deleted) {
            res.status(200).json({
                message: `Ticket video id: ${req.params.id} successfully deleted`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting ticket video." });
    }
});
router.delete("/comments/video/:id", async (req, res) => {
    try {
        const deleted = await db("comments_videos")
            .where({ id: req.params.id })
            .del();

        if (deleted) {
            res.status(200).json({
                message: `Comment video id: ${req.params.id} successfully deleted`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting comment video." });
    }
});
router.delete("/comments/replies/video/:id", async (req, res) => {
    try {
        const deleted = await db("comments_replies_videos")
            .where({ id: req.params.id })
            .del();

        if (deleted) {
            res.status(200).json({
                message: `Reply video id: ${req.params.id} successfully deleted`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting reply video." });
    }
});

module.exports = router;
