
exports.up = function(knex) {
    return knex.schema.createTable('tickets', tbl => {
        tbl.increments();
        tbl.string('title', 255)
            .notNullable();
        tbl.string('category', 255)
            .notNullable();
        tbl.string('description', 255)
            .notNullable();
        tbl.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tickets');
};
