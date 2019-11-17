const db = require('../data/db-config');

module.exports = {
    findOpen,
    findResolved,
    findStudentTickets,
    findHelperTickets,
    openTicket,
    assignTicket
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

            await trx('students_tickets').insert({student_id, ticket_id});
            return findBy({id: ticket_id});
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