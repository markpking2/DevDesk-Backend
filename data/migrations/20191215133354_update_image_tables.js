
exports.up = function(knex) {
    knex.schema.table('tickets_pictures', function(table) {
        table.integer('width').notNull()
        table.integer('height').notNull()
        tbl.varchar('filename', 255)
    })
    .table('tickets_solutions_pictures', function(table) {
        table.integer('width').notNull()
        table.integer('height').notNull()
        tbl.varchar('filename', 255)
    })
    .table('comments_pictures', function(table) {
        table.integer('width').notNull()
        table.integer('height').notNull()
        tbl.varchar('filename', 255)
    })
    .table('comments_replies_pictures', function(table) {
        table.integer('width').notNull()
        table.integer('height').notNull()
        tbl.varchar('filename', 255)
    })
    .table('profile_pictures', function(table) {
        table.integer('width').notNull()
        table.integer('height').notNull()
        tbl.varchar('filename', 255)
    })
};

exports.down = function(knex) {
    knex.schema.table('profile_pictures', function(table) {
        table.dropColumn('filename')
        table.dropColumn('height')
        table.dropColumn('width')
    })
    .table('comments_replies_pictures', function(table) {
        table.dropColumn('filename')
        table.dropColumn('height')
        table.dropColumn('width')
    })
    .table('comments_pictures', function(table) {
        table.dropColumn('filename')
        table.dropColumn('height')
        table.dropColumn('width')
    })
    .table('tickets_solutions_pictures', function(table) {
        table.dropColumn('filename')
        table.dropColumn('height')
        table.dropColumn('width')
    })
    .table('tickets_pictures', function(table) {
        table.dropColumn('filename')
        table.dropColumn('height')
        table.dropColumn('width')
    })
};