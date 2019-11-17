const db = require('../data/db-config');

module.exports = {
    findBy,
    add,
    update,
    remove
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

async function remove(id){
    await db.transaction(async trx => {
        try{
            console.log(1);
            const [user] = await trx('users')
            .where({id});
            console.log(2);
            const userDeleted = await trx('users')
            .where({id})
            .del();
            
            if(!userDeleted){
                throw 'Error deleting user'
            }
            console.log(3);
            if(user.helper){
                await trx('resolved_tickets')
                .where({helper_id: id})
                .update({helper_id: null});
            }
            console.log(4);
            if(user.student){
                await trx('resolved_tickets')
                .where({student_id: id})
                .update({student_id: null});
            }

            return true;
        }catch(err){
            throw err;
        }
    });
}