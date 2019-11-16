const db = require('../data/db-config');

module.exports = {

};

function findOpen() {
    db('students_tickets as s')
    .join('tickets as t', 's.ticket_id', 't.id')
    .select('t.*');
}