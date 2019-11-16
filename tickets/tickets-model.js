const db = require('../data/db-config');

module.exports = {
    findOpen,
    findResolved,
    findStudentTickets
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
    .where({'s.id': id})
    .join('tickets as t', 's.ticket_id', 't.id')
    .select('t.*');
}