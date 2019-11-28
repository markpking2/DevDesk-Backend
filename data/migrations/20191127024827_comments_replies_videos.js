exports.up = function(knex) {
    return knex.schema.createTable('comments_replies_videos', tbl => {
        tbl.increments();
        tbl.integer('reply_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('comments_replies')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.varchar('url', 255)
            .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments_replies_videos');
};
