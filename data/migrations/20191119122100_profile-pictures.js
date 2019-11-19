
exports.up = function(knex) {
    return knex.schema.createTable('profile_pictures', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .notNullable()
            .unsigned()
            .unique()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.varchar('url', 255)
            .notNullable()
            .unique();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('profile_pictures');
};
