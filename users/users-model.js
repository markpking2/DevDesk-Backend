const db = require('../data/db-config');

module.exports = {
    findBy,
    add
}

function findBy(value){
    return db('users')
        .where(value)
        .first();
}

function add(user){
    return db('users')
    .insert(user, 'id');
}