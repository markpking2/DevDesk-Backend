
exports.seed = function(knex) {
  return knex('comments_replies').insert([
    {description: 'this is a reply', comment_id: 1},
    {description: 'this is a reply', comment_id: 1},
    {description: 'this is a reply', comment_id: 2},
    {description: 'this is a reply', comment_id: 2},
    {description: 'this is a reply', comment_id: 3},
    {description: 'this is a reply', comment_id: 3},
    {description: 'this is a reply', comment_id: 4},
    {description: 'this is a reply', comment_id: 4},
    {description: 'this is a reply', comment_id: 5},
    {description: 'this is a reply', comment_id: 5},
    {description: 'this is a reply', comment_id: 6},
    {description: 'this is a reply', comment_id: 6},
    {description: 'this is a reply', comment_id: 7},
  ]);

};
