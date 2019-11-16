
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('username', 255)
            .notNullable()
            .unique();
        tbl.string('password', 255)
            .notNullable();
        tbl.string('email', 255)
            .unique();
        tbl.string('cohort', 255);
        tbl.boolean('helper')
            .notNullable();
        tbl.boolean('student')
            .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
