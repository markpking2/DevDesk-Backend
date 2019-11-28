exports.up = function(knex) {
    return knex.schema.createTable('tickets_solutions_videos', tbl => {
        tbl.increments();
        tbl.integer('ticket_id')
            .notNullable()
            .unsigned()
            .unique()
            .references('id')
            .inTable('resolved_tickets')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.varchar('url', 255)
            .notNullable()
            .unique();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tickets_solutions_videos');
};
