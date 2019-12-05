const db = require('../data/db-config');

module.exports = {
    findBy,
    findById,
    add,
    update,
    remove,
    addProfilePic,
    updateProfilePic
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

function findById(id){
    return db('users as u')
    .where({'u.id': id})
    .leftJoin('profile_pictures as p', 'u.id', 'p.user_id')
    .select('u.id', 'u.username', 'u.name', 'u.email', 'u.cohort', 'p.url as profile_picture')
    .first();
}

function update(id, user){
    return db('users')
    .where({id})
    .update({...user});
}

async function remove(id){
    await db.transaction(async trx => {
        try{
             await trx('users')
            .where({id});

            const userDeleted = await trx('users')
            .where({id})
            .del();
            
            if(!userDeleted){
                throw 'Error deleting user'
            }
            
            await trx('resolved_tickets')
            .where({author_id: id})
            .update({author_id: null});

            return true;
        }catch(err){
            throw err;
        }
    });
}

function addProfilePic(image){
    return db('profile_pictures')
        .insert(image);
}

function updateProfilePic(image){
    return db.transaction(async trx => {
        try{
            const deleted = await trx('profile_pictures')
            .where({user_id: image.user_id})
            .del()

            if(deleted){
                await trx('profile_pictures')
                    .insert(image);
                return 'success';
            }else{
                throw 'Profile picture could not be deleted'
            }
        }catch(err){
            throw err
        }
    })
}