const db = require('../data/db-config');

module.exports = {
    findOpen,
    findResolved,
    findStudentTickets,
    findHelperTickets,
    openTicket,
    assignTicket,
    returnToQueue,
    update,
    remove,
    resolve
};

function findOpen() {
    return db('students_tickets as s')
    .join('tickets as t', 's.ticket_id', 't.id')
    .select('t.*');
}

function findResolved() {
    return db('resolved_tickets as r')
    .join('tickets as t', 'r.ticket_id', 't.id')
    .select('t.*', 'r.resolved_at');
}

function findStudentTickets(id){
    return db('students_tickets as s')
    .where({'s.student_id': id})
    .join('tickets as t', 's.ticket_id', 't.id')
    .select('t.*');
}

function findHelperTickets(id){
    return db('helpers_tickets as h')
    .where({'h.helper_id': id})
    .join('tickets as t', 'h.ticket_id', 't.id')
    .select('t.*');
}

function findBy(value){
    return db('tickets')
        .where(value)
        .first();
}

async function openTicket(ticket, student_id){
    const id = await db.transaction(async trx => {
        try{
            const [ticket_id] = await trx('tickets')
                .insert(ticket, 'id');
            await trx('students_tickets').insert({student_id, ticket_id}, 'id');
            return ticket_id;
        }catch(err){
            throw err;
        }
    });

    return findBy({id});
}

async function assignTicket(ticket_id, helper_id){
    try{
        const [id] = await db('helpers_tickets')
            .insert({ticket_id, helper_id}, 'id');
        
        return findBy({id: ticket_id});
    }catch(err){
        throw err;
    }
}

function returnToQueue(id){
    return db('helpers_tickets')
    .where({ticket_id: id})
    .del();
}

function update(id, ticket){
    return db('tickets')
    .where({id})
    .update({...ticket});
}

function remove(id){
    return db('tickets')
    .where({id})
    .del();
}

async function resolve(ticket_id, user_id, solution){
    try {
        const [user] = await db('users')
        .where({id: user_id});

        const student = await db('students_tickets')
        .where({ticket_id})
        .first()
        .select('student_id');

        const helper = await db('helpers_tickets')
        .where({ticket_id})
        .first()
        .select('helper_id');

        const helper_id = helper && helper.helper_id;
        const student_id = student && student.student_id;
        
        if((user.helper && user.id === helper_id) || (user.student && user.id === student_id)){
            const values = {student_id, helper_id, ticket_id, solution};
            Object.keys(values).forEach(key => values[key] === undefined && delete values[key]);
            const resolved = await db('resolved_tickets').insert(values);
            
            if(resolved){
                const resolvedTicket = await db('tickets as t')
                .where({'t.id': ticket_id})
                .join('resolved_tickets as r', 't.id', 'r.ticket_id')
                .select('t.*', 'r.resolved_at', 'r.solution');

                return resolvedTicket;
            }else{
                throw 'Error inserting into resolved_tickets';
            }
        }else{
            throw 1
        }
    }catch(err){
        throw err;
    }
}

// function findStudentTickets(id){
//     return db('students_tickets as s')
//     .where({'s.student_id': id})
//     .join('tickets as t', 's.ticket_id', 't.id')
//     .select('t.*');
// }