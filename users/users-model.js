const db = require('../data/db-config');

module.exports = {
    findBy,
    add,
    update
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

function update(id, user){
    return db('users')
    .where({id})
    .update({...user});
}