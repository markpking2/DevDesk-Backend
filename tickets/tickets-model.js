const db = require("../data/db-config");

module.exports = {
    findOpen,
    findResolved,
    findStudentOpenTickets,
    findStudentResolvedTickets,
    findTicketByQuery,
    openTicket,
    update,
    remove,
    resolve,
    updateSolution,
    findById,
    findTicketComments,
    addComment,
    deleteComment,
    addReply,
    deleteReply,
    updateComment,
    updateReply,
    findCommentById,
    findReplyById,
    reopenTicket,
    findMine
};

function findOpen() {
    return db("authors_tickets as s")
        .join("tickets as t", "s.ticket_id", "t.id")
        .join("users as u", "s.author_id", "u.id")
        .leftJoin("profile_pictures as p", "s.author_id", "p.user_id")
        .select(
            "t.*",
            "u.name as author_name",
            "s.author_id",
            "p.url as author_image",
            db.raw("? as status", ["open"])
        );
}

function findResolved() {
    return db("tickets as t")
        .join("resolved_tickets as r", "t.id", "r.ticket_id")
        .leftJoin("users as s", "s.id", "r.author_id")
        .leftJoin("profile_pictures as sp", "s.id", "sp.user_id")
        .select(
            "t.*",
            "s.name as author_name",
            "sp.url as author_image",
            "r.author_id",
            "r.resolved_at",
            db.raw(
                "? as status",
                ["resolved"],
                "r.solution_comment_id",
                "r.solution_reply_id"
            )
        );
}

function findStudentOpenTickets(id) {
    return db("authors_tickets as s")
        .where({ "s.author_id": id })
        .join("tickets as t", "s.ticket_id", "t.id")
        .leftJoin("users as u", "s.author_id", "u.id")
        .leftJoin("profile_pictures as p", "s.author_id", "p.user_id")
        .select(
            "t.*",
            "u.name as author_name",
            "s.author_id",
            "p.url as author_image",
            db.raw("? as status", ["open"])
        );
}

function findStudentResolvedTickets(id) {
    return db("resolved_tickets as r")
        .where({ "r.author_id": id })
        .join("tickets as t", "r.ticket_id", "t.id")
        .leftJoin("users as u", "r.author_id", "u.id")
        .leftJoin("profile_pictures as sp", "r.author_id", "sp.user_id")
        .select(
            "t.*",
            "r.resolved_at",
            "u.name as author_name",
            "sp.url as author_image",
            "r.author_id",
            db.raw(
                "? as status",
                ["resolved"],
                "r.solution_comment_id",
                "r.solution_reply_id"
            )
        );
}

function findBy(value) {
    return db("tickets")
        .where(value)
        .first();
}

async function openTicket(ticket, author_id) {
    const id = await db.transaction(async trx => {
        try {
            const [ticket_id] = await trx("tickets").insert(ticket, "id");
            await trx("authors_tickets").insert({ author_id, ticket_id }, "id");
            return ticket_id;
        } catch (err) {
            throw err;
        }
    });

    return findBy({ id });
}

async function reopenTicket(id) {
    try {
        return await db.transaction(async trx => {
            const { author_id } = await trx("resolved_tickets")
                .where({ ticket_id: id })
                .first();
            if (!author_id) throw "author_id undefined";
            const deleted = await trx("resolved_tickets")
                .where({ ticket_id: id })
                .del();
            if (deleted) {
                const inserted = await trx("authors_tickets").insert({
                    ticket_id: id,
                    author_id
                });
                if (inserted) {
                    return true;
                }
            } else {
                throw "Ticket could not be removed from resolved tickets";
            }
        });
    } catch (err) {
        throw err;
    }
}

function update(id, ticket) {
    return db("tickets")
        .where({ id })
        .update({ ...ticket });
}

async function findMine(id) {
    console.log('od is: ', id);
    const result = await Promise.all([
        db("authors_tickets as a")
            .where({ author_id: id })
            .join("tickets as t", "t.id", "a.ticket_id")
            .join("users as u", "u.id", "a.author_id")
            .leftJoin("profile_pictures as p", "p.user_id", "u.id")
            .leftJoin("tickets_videos as tv", "t.id", "tv.ticket_id")
            .select(
                "t.*",
                "tv.url as open_video",
                "p.url as author_image",
                "u.name as author_name",
                "u.id as author_id",
                db.raw("? as status", ["open"])
            ),

        db("resolved_tickets as r")
            .where({ author_id: id })
            .join("tickets as t", "t.id", "r.ticket_id")
            .join("users as u", "u.id", "r.author_id")
            .leftJoin("profile_pictures as p", "p.user_id", "u.id")
            .leftJoin("tickets_videos as tv", "t.id", "tv.ticket_id")
            .leftJoin("tickets_solutions_videos as sv", "t.id", "sv.ticket_id")
            .select(
                "t.*",
                "tv.url as open_video",
                "sv.url as resolved_video",
                "p.url as author_image",
                "u.name as author_name",
                "u.id as author_id",
                db.raw("? as status", ["resolved"]),
                "r.resolved_at",
                "r.solution_comment_id",
                "r.solution_reply_id",
                "r.solution"
            ),

        //#region
        // bug here??? rt.author_id is not null?
        // bug here?? remove else null? it is getting nulled on resolved tickets that have a comment
        // db('comments as c')
        //     .distinct('t.id')
        //     .where({'c.author_id': id})
        //     .join('tickets_comments as tc', 'c.id', 'tc.comment_id')
        //     .join('tickets as t', 'tc.ticket_id', 't.id')
        //     .leftJoin('authors_tickets as st', 't.id', 'st.ticket_id')
        //     .leftJoin('resolved_tickets as rt', 't.id', 'rt.ticket_id')
        //     .leftJoin('users as su', 'st.author_id', 'su.id')
        //     .leftJoin('users as rsu', 'rt.author_id', 'rsu.id')
        //     .leftJoin('profile_pictures as sp', 'st.author_id', 'sp.user_id')
        //     .leftJoin('profile_pictures as rsp', 'rt.author_id', 'sp.user_id')
        //     .leftJoin('tickets_videos as dv', 't.id', 'dv.ticket_id')
        //     .leftJoin('tickets_solutions_videos as sv', 't.id', 'sv.ticket_id')
        //     .select('t.*', 'dv.url as open_video', 'sv.url as resolved_video', 'rt.solution as solution', 'rt.solution_comment_id', 'rt.solution_reply_id',
        //     db.raw(`CASE
        //         WHEN st.author_id IS NOT NULL THEN sp.url
        //         WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsp.url
        //         ELSE NULL
        //         END AS author_image`),
        //     db.raw(`CASE
        //         WHEN su.name IS NOT NULL THEN su.name
        //         WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsu.name
        //         ELSE NULL
        //         END AS author_name`),
        //     db.raw(`CASE
        //         WHEN su.name IS NOT NULL THEN su.id
        //         WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsu.id
        //         ELSE NULL
        //         END AS author_id`),
        //     db.raw(`CASE
        //         WHEN su.name IS NOT NULL THEN 'open'
        //         ELSE 'resolved'
        //         END AS status`),
        //     db.raw(`CASE
        //         WHEN rt.id IS NOT NULL THEN rt.resolved_at ELSE NULL
        //         END as resolved_at`)),
        //#endregion
        db("comments as c")
            .where({ "c.author_id": id })
            .whereNot({'at.author_id': id})
            .orWhereNot({'rt.author_id': id})
            .join("tickets_comments as tc", "tc.comment_id", "c.id")
            .join('tickets as t', 't.id', 'tc.id')
            .leftJoin('authors_tickets as at', 'at.ticket_id', 'tc.ticket_id')
            .leftJoin('resolved_tickets as rt', 'rt.ticket_id', 'tc.ticket_id')
            .select("tc.ticket_id")
            .distinct('tc.ticket_id'),

        db("comments_replies as cr")
            .where({ "cr.author_id": id })
            .whereNot({'at.author_id': id})
            .orWhereNot({'rt.author_id': id})
            .join('comments as c', 'c.id', 'cr.comment_id')
            .join("tickets_comments as tc", "tc.comment_id", "c.id")
            .join('tickets as t', 't.id', 'tc.id')
            .leftJoin('authors_tickets as at', 'at.ticket_id', 'tc.ticket_id')
            .leftJoin('resolved_tickets as rt', 'rt.ticket_id', 'tc.ticket_id')
            .select("tc.ticket_id")
            .distinct('tc.ticket_id'),
        // #region
        // db("comments_replies as cr")
        //     .distinct("t.id")
        //     .where({ "cr.author_id": id })
        //     .join("tickets_comments as tc", "cr.comment_id", "tc.comment_id")
        //     .join("tickets as t", "tc.ticket_id", "t.id")
        //     .leftJoin("authors_tickets as st", "t.id", "st.ticket_id")
        //     .leftJoin("resolved_tickets as rt", "t.id", "rt.ticket_id")
        //     .leftJoin("users as su", "st.author_id", "su.id")
        //     .leftJoin("users as rsu", "rt.author_id", "rsu.id")
        //     .leftJoin("profile_pictures as sp", "st.author_id", "sp.user_id")
        //     .leftJoin("profile_pictures as rsp", "rt.author_id", "sp.user_id")
        //     .leftJoin("tickets_videos as dv", "t.id", "dv.ticket_id")
        //     .leftJoin("tickets_solutions_videos as sv", "t.id", "sv.ticket_id")
        //     .select(
        //         "t.*",
        //         "dv.url as open_video",
        //         "sv.url as resolved_video",
        //         "rt.solution as solution",
        //         "rt.solution_comment_id",
        //         "rt.solution_reply_id",
        //         db.raw(`CASE 
        //         WHEN st.author_id IS NOT NULL THEN sp.url
        //         WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsp.url
        //         ELSE NULL 
        //         END AS author_image`),
        //         db.raw(`CASE 
        //         WHEN su.name IS NOT NULL THEN su.name
        //         WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsu.name
        //         ELSE NULL 
        //         END AS author_name`),
        //         db.raw(`CASE 
        //         WHEN su.name IS NOT NULL THEN su.id
        //         WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsu.id
        //         ELSE NULL 
        //         END AS author_id`),
        //         db.raw(`CASE 
        //         WHEN su.name IS NOT NULL THEN 'open' 
        //         ELSE 'resolved'
        //         END AS status`),
        //         db.raw(`CASE
        //         WHEN rt.id IS NOT NULL THEN rt.resolved_at ELSE NULL
        //         END as resolved_at`)
        // )
        //#endregion
    ]);

    //cute
    for (let i = 0; i < result.length; i++) {
        result[i] = await Promise.all(i > 1 ? result[i] :
            (result[i].map(async ticket => {
                const newTicket = {
                    ...ticket,
                    open_pictures: await db("tickets_pictures")
                        .where({ ticket_id: ticket.id })
                        .select("url"),
                    ticket_comments: await findTicketComments(ticket.id)
                };
                if (ticket.status === "resolved") {
                    newTicket["resolved_pictures"] = await db(
                        "tickets_solutions_pictures"
                    )
                        .where({ ticket_id: ticket.id })
                        .select("url");
                }
                return newTicket;
            }))
        );
    }
    const [openTickets, resolvedTickets, commentedOnTicketIds, repliedOnTicketIds] = result;

    const commentedOn = await Promise.all(commentedOnTicketIds.map(async ({ticket_id}) => {
        return await findUserLatestTicketComment(ticket_id, id);
    }));

    const repliedOn = await Promise.all(repliedOnTicketIds.map(async ({ticket_id}) => {
        return await findUserLatestTicketReply(ticket_id, id);
    }));

    return { openTickets, resolvedTickets, commentedOn: commentedOn[0] ? commentedOn : [], repliedOn: repliedOn[0] ? repliedOn : []};
}

async function findById(id) {
    return await db("tickets as t")
        .where({ "t.id": id })
        .leftJoin("authors_tickets as st", "t.id", "st.ticket_id")
        .leftJoin("resolved_tickets as rt", "t.id", "rt.ticket_id")
        .leftJoin("users as su", "st.author_id", "su.id")
        .leftJoin("users as rsu", "rt.author_id", "rsu.id")
        .leftJoin("profile_pictures as sp", "st.author_id", "sp.user_id")
        .leftJoin("profile_pictures as rsp", "rt.author_id", "sp.user_id")
        .leftJoin("tickets_videos as dv", "t.id", "dv.ticket_id")
        .leftJoin("tickets_solutions_videos as sv", "t.id", "sv.ticket_id")
        .select(
            "t.*",
            "dv.id as open_video_id",
            "dv.url as open_video",
            "sv.url as resolved_video",
            "rt.solution as solution",
            "rt.solution_comment_id",
            "rt.solution_reply_id",
            db.raw(`CASE 
                WHEN st.author_id IS NOT NULL THEN sp.url
                WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsp.url
                ELSE NULL 
                END AS author_image`),
            db.raw(`CASE 
                WHEN su.name IS NOT NULL THEN su.name
                WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsu.name
                ELSE NULL 
                END AS author_name`),
            db.raw(`CASE 
                WHEN su.name IS NOT NULL THEN su.id
                WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsu.id
                ELSE NULL 
                END AS author_id`),
            db.raw(`CASE 
                WHEN su.name IS NOT NULL THEN 'open' 
                ELSE 'resolved'
                END AS status`),
            db.raw(`CASE
                WHEN rt.id IS NOT NULL THEN rt.resolved_at ELSE NULL
                END as resolved_at`)
        );
}

async function findTicketByQuery(query) {
    const { course, unit, week, day } = query;
    let filteredQuery = {};
    if (course) {
        filteredQuery = { ...filteredQuery, "t.course": course };
    }
    if (unit) {
        filteredQuery = { ...filteredQuery, "t.unit": unit };
    }
    if (week) {
        filteredQuery = { ...filteredQuery, "t.week": week };
    }
    if (day) {
        filteredQuery = { ...filteredQuery, "t.day": day };
    }
    console.log("filteredQuery", filteredQuery, "og query", query);
    return await db("tickets as t")
        .where(filteredQuery)
        .leftJoin("authors_tickets as st", "t.id", "st.ticket_id")
        .leftJoin("resolved_tickets as rt", "t.id", "rt.ticket_id")
        .leftJoin("users as su", "st.author_id", "su.id")
        .leftJoin("users as rsu", "rt.author_id", "rsu.id")
        .leftJoin("profile_pictures as sp", "st.author_id", "sp.user_id")
        .leftJoin("profile_pictures as rsp", "rt.author_id", "sp.user_id")
        .leftJoin("tickets_videos as dv", "t.id", "dv.ticket_id")
        .leftJoin("tickets_solutions_videos as sv", "t.id", "sv.ticket_id")
        .select(
            "t.*",
            "dv.url as open_video",
            "sv.url as resolved_video",
            "rt.solution as solution",
            "rt.solution_comment_id",
            "rt.solution_reply_id",
            db.raw(`CASE 
                WHEN st.author_id IS NOT NULL THEN sp.url
                WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsp.url
                ELSE NULL 
                END AS author_image`),
            db.raw(`CASE 
                WHEN su.name IS NOT NULL THEN su.name
                WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsu.name
                ELSE NULL 
                END AS author_name`),
            db.raw(`CASE 
                WHEN su.name IS NOT NULL THEN su.id
                WHEN su.name IS NULL AND rsu.name IS NOT NULL THEN rsu.id
                ELSE NULL 
                END AS author_id`),
            db.raw(`CASE 
                WHEN su.name IS NOT NULL THEN 'open' 
                ELSE 'resolved'
                END AS status`),
            db.raw(`CASE
                WHEN rt.id IS NOT NULL THEN rt.resolved_at ELSE NULL
                END as resolved_at`)
        );
}

async function remove(id) {
    return await db.transaction(async trx => {
        try {
            const ticketsDeleted = await trx("tickets")
                .where({ id })
                .del();

            if (!ticketsDeleted) {
                throw "Error removing ticket from tickets";
            }

            const resolvedFound = await trx("resolved_tickets")
                .where({ ticket_id: id })
                .first();

            const resolvedDeleted = await trx("resolved_tickets")
                .where({ ticket_id: id })
                .del();

            if (resolvedFound && !resolvedDeleted) {
                throw "Error removing ticket from resolved_tickets";
            }
            return true;
        } catch (err) {
            return false;
        }
    });
}

async function resolve(ticket_id, user_id, solution, comment_id, reply_id) {
    try {
        const [user] = await db("users").where({ id: user_id });

        const author = await db("authors_tickets")
            .where({ ticket_id })
            .first()
            .select("author_id");

        const author_id = author && author.author_id;
        if (author_id) {
            if (user.id === author_id) {
                const values = { author_id, ticket_id, solution };
                Object.keys(values).forEach(
                    key => values[key] === undefined && delete values[key]
                );

                return await db.transaction(async trx => {
                    try {
                        if (reply_id) {
                            const response = await trx("comments_replies")
                                .where({ id: reply_id })
                                .first();

                            if (response) {
                                values.solution = response.description;
                                values["solution_reply_id"] = reply_id;
                            } else {
                                throw "Reply description not found";
                            }
                        } else if (comment_id) {
                            const response = await trx("comments")
                                .where({ id: comment_id })
                                .first();

                            if (response) {
                                values.solution = response.description;
                                values["solution_comment_id"] = comment_id;
                            } else {
                                throw "Comment description not found";
                            }
                        }
                        const resolved = await trx("resolved_tickets").insert(
                            values
                        );
                        if (resolved) {
                            const deleted = await trx("authors_tickets")
                                .where({ ticket_id })
                                .del();
                            if (deleted) {
                                const resolvedTicket = await trx("tickets as t")
                                    .where({ "t.id": ticket_id })
                                    .join(
                                        "resolved_tickets as r",
                                        "t.id",
                                        "r.ticket_id"
                                    )
                                    .select(
                                        "t.*",
                                        "r.resolved_at",
                                        "r.solution",
                                        "r.solution_comment_id",
                                        "r.solution_reply_id"
                                    );
                                return resolvedTicket;
                            } else {
                                throw "Ticket was not removed from open queue";
                            }
                        } else {
                            throw "Ticket was not resolved";
                        }
                    } catch (err) {
                        throw err;
                    }
                });
            } else {
                throw 1;
            }
        } else {
            throw 2;
        }
    } catch (err) {
        throw err;
    }
}

async function updateSolution(
    ticket_id,
    user_id,
    solution,
    comment_id,
    reply_id
) {
    try {
        const values = { solution };
        const found = await db("resolved_tickets")
            .where({ ticket_id })
            .first();

        if (!found) {
            throw 2;
        }

        const { author_id } = found;
        const [user] = await db("users").where({ id: user_id });

        if (reply_id) {
            const { description } = await db("comments_replies")
                .where({ id: reply_id })
                .first();
            if (description) {
                solution = description;
                values["solution_reply_id"] = reply_id;
                values["solution_comment_id"] = null;
            } else {
                throw "Reply description not found";
            }
        } else if (comment_id) {
            const { description } = await db("comments")
                .where({ id: comment_id })
                .first();
            if (description) {
                solution = description;
                values["solution_comment_id"] = comment_id;
                values["solution_reply_id"] = null;
            } else {
                throw "Comment description not found";
            }
        } else {
            values["solution_comment_id"] = null;
            values["solution_reply_id"] = null;
        }

        if (user.id === author_id) {
            const updated = await db("resolved_tickets")
                .where({ ticket_id })
                .update({ ...values });

            if (updated) {
                return await db("tickets as t")
                    .where({ "t.id": ticket_id })
                    .join("resolved_tickets as r", "t.id", "r.ticket_id")
                    .select(
                        "t.*",
                        "r.resolved_at",
                        "r.solution",
                        "r.solution_comment_id",
                        "r.solution_reply_id"
                    );
            } else {
                throw "Error updating solution.";
            }
        } else {
            throw 1;
        }
    } catch (err) {
        throw err;
    }
}

//comments
async function findUserLatestTicketComment(ticket_id, user_id) {
    const [result] = await db("tickets_comments as tc")
        .where({ "tc.ticket_id": ticket_id, "c.author_id": user_id })
        .leftJoin('authors_tickets as at', 'tc.ticket_id', 'at.ticket_id')
        .leftJoin('resolved_tickets as rt', 'rt.ticket_id', 'tc.ticket_id')
        .leftJoin("users as ou", "ou.id", "at.author_id")
        .leftJoin("users as ru", "ru.id", "rt.author_id")
        .join("comments as c", "c.id", "tc.comment_id")
        .join('tickets as t', 't.id', 'tc.ticket_id')
        .leftJoin("profile_pictures as p", "p.user_id", "c.author_id")
        .select(
            "c.*",
            "p.url as author_image",
            "tc.ticket_id",
            't.title as ticket_title',
             db.raw(`CASE 
                WHEN at.author_id IS NOT NULL THEN ou.name
                WHEN at.author_id IS NULL AND rt.author_id IS NOT NULL THEN ru.name
                END AS author_name`),
            db.raw(`CASE 
                WHEN ou.name IS NOT NULL THEN 'open' 
                ELSE 'resolved'
                END AS ticket_status`),                
        )
        .limit(1)
        .orderBy("c.created_at", "desc");
    return result;
}

async function findTicketComments(ticket_id) {
    const comments = await db("tickets_comments as tc")
        .where({ ticket_id })
        .join("comments as c", "tc.comment_id", "c.id")
        .join("users as u", "c.author_id", "u.id")
        .leftJoin("profile_pictures as p", "p.user_id", "u.id")
        .select(
            "c.*",
            "u.id as author_id",
            "u.name as author_name",
            "p.url as author_image",
            db.raw("TRUE as collapsed")
        )
        .orderBy("tc.id", "asc");

    return Promise.all(
        comments.map(async comment => {
            return {
                ...comment,
                comment_pictures: await findCommentPictures(comment.id),
                comment_videos: await findCommentVideos(comment.id),
                comment_replies: await findCommentReplies(comment.id)
            };
        })
    );
}

async function findUserLatestTicketReply(ticket_id, user_id) {
    const [result] = await db("comments_replies as cr")
        .where({ "tc.ticket_id": ticket_id, "cr.author_id": user_id })
        .join('tickets_comments as tc', 'tc.comment_id', 'cr.comment_id')
        .join('tickets as t', 't.id', 'tc.ticket_id')
        .leftJoin('authors_tickets as at', 'at.ticket_id', 'tc.ticket_id')
        .leftJoin('resolved_tickets as rt', 'rt.ticket_id', 'tc.ticket_id')
        .leftJoin("users as ou", "ou.id", "at.author_id")
        .leftJoin("users as ru", "ru.id", "rt.author_id")
        .leftJoin("profile_pictures as p", "p.user_id", "cr.author_id")
        .select(
            "cr.*",
            "p.url as author_image",
            "tc.ticket_id",
            't.title as ticket_title',
            db.raw(`CASE 
                WHEN at.author_id IS NOT NULL THEN ou.name
                WHEN at.author_id IS NULL AND rt.author_id IS NOT NULL THEN ru.name
                END AS author_name`),
            db.raw(`CASE 
                WHEN ou.name IS NOT NULL THEN 'open' 
                ELSE 'resolved'
                END AS ticket_status`),
        )
        .limit(1)
        .orderBy("cr.created_at", "desc");
            console.log(result);
        return result;
}

async function findCommentReplies(comment_id) {
    const replies = await db("comments_replies as cr")
        .where({ comment_id })
        .join("users as u", "cr.author_id", "u.id")
        .leftJoin("profile_pictures as p", "p.user_id", "u.id")
        .select(
            "cr.*",
            "u.id as author_id",
            "u.name as author_name",
            "p.url as author_image"
        )
        .orderBy("cr.id", "asc");

    return Promise.all(
        replies.map(async reply => {
            return {
                ...reply,
                reply_pictures: await findReplyPictures(reply.id),
                reply_videos: await findReplyVideos(reply.id)
            };
        })
    );
}

function findCommentPictures(comment_id) {
    return db("comments_pictures").where({ comment_id });
}

function findCommentVideos(comment_id) {
    return db("comments_videos").where({ comment_id });
}

async function addComment(author_id, ticket_id, description) {
    return await db.transaction(async trx => {
        try {
            const [comment_id] = await trx("comments").insert(
                { author_id, description },
                "id"
            );
            await trx("tickets_comments").insert(
                { ticket_id, comment_id },
                "id"
            );
            return comment_id;
        } catch (err) {
            throw err;
        }
    });
}

function updateComment(id, description) {
    return db("comments")
        .where({ id })
        .update({ description });
}

function deleteComment(id) {
    return db("comments")
        .where({ id })
        .del();
}

async function findCommentById(id) {
    // console.log(id);
    const comment = await db("comments as c")
        .where({ "c.id": id })
        .join("users as u", "c.author_id", "u.id")
        .leftJoin("profile_pictures as p", "u.id", "p.user_id")
        .select("c.*", "p.url as author_image", "u.name as author_name")
        .first();

    return {
        ...comment,
        comment_pictures: await findCommentPictures(id),
        comment_videos: await findCommentVideos(id),
        comment_replies: await findCommentReplies(id)
    };
}

//replies
async function addReply(author_id, comment_id, description) {
    const [reply_id] = await db("comments_replies").insert(
        { author_id, comment_id, description },
        "id"
    );
    return reply_id;
}

async function updateReply(id, description) {
    return db("comments_replies")
        .where({ id })
        .update({ description });
}

function deleteReply(id) {
    return db("comments_replies")
        .where({ id })
        .del();
}

async function findReplyById(id) {
    const reply = await db("comments_replies as cr")
        .where({ "cr.id": id })
        .join("users as u", "cr.author_id", "u.id")
        .leftJoin("profile_pictures as p", "u.id", "p.user_id")
        .select("cr.*", "p.url as author_image", "u.name as author_name")
        .first();
    // console.log('reply:', reply);

    return {
        ...reply,
        reply_pictures: await findReplyPictures(id),
        reply_videos: await findReplyVideos(id)
    };
}

function findReplyPictures(reply_id) {
    return db("comments_replies_pictures").where({ reply_id });
}

function findReplyVideos(reply_id) {
    return db("comments_replies_videos").where({ reply_id });
}
