exports.up = function(knex) {
    return knex.schema.createTable('comments_pictures', tbl => {
            tbl.increments();
            tbl.integer('comment_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('comments')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.varchar('url', 255)
                .notNullable()
                .unique();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments_pictures');
};
