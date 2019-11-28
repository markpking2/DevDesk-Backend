exports.up = function(knex) {
    return knex.schema.createTable('comments_replies', tbl => {
        tbl.increments();
        tbl.integer('comment_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('comments')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.string('description', 1000)
            .notNullable();
        tbl.integer('author_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments_replies');
};
