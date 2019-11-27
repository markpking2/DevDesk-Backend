exports.up = function(knex) {
    return knex.schema.createTable('tickets_comments', tbl => {
        tbl.increments();
        tbl.integer('ticket_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('tickets')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
            tbl.integer('comment_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('comments')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tickets_comments');
};
