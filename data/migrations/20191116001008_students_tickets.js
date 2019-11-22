
exports.up = function(knex) {
    return knex.schema.createTable('students_tickets', tbl => {
        tbl.increments();
        tbl.integer('student_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.integer('ticket_id')
            .unsigned()
            .notNullable()
            .unique()
            .references('id')
            .inTable('tickets')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('students_tickets');
};