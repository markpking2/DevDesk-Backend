exports.up = function(knex) {
    return knex.schema.createTable('comments', tbl => {
        tbl.increments();
        tbl.string('description', 1000)
            .notNullable();
        tbl.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments');
};
