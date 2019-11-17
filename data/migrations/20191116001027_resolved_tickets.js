
exports.up = function(knex) {
    return knex.schema.createTable('resolved_tickets', tbl => {
        tbl.increments();
        tbl.integer('student_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.integer('helper_id')
            .unsigned()
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
        tbl.timestamp('resolved_at')
            .notNullable()
            .defaultTo(knex.fn.now());
        // tbl.string('solution', 255)
        //     .notNullable();
        tbl.unique(['helper_id', 'student_id']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('resolved_tickets');
};