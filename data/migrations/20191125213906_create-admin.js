
exports.up = function(knex) {
    return knex.schema.createTable('admins', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unique()
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('admins');
};
