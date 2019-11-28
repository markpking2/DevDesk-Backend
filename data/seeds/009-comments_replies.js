
exports.seed = function(knex) {
  return knex('comments_replies').insert([
    {description: 'this is a reply', comment_id: 1, author_id: 1},
    {description: 'this is a reply', comment_id: 1, author_id: 2},
    {description: 'this is a reply', comment_id: 2, author_id: 3},
    {description: 'this is a reply', comment_id: 2, author_id: 4},
    {description: 'this is a reply', comment_id: 3, author_id: 5},
    {description: 'this is a reply', comment_id: 3, author_id: 6},
    {description: 'this is a reply', comment_id: 4, author_id: 7},
    {description: 'this is a reply', comment_id: 4, author_id: 8},
    {description: 'this is a reply', comment_id: 5, author_id: 9},
    {description: 'this is a reply', comment_id: 5, author_id: 10},
    {description: 'this is a reply', comment_id: 6, author_id: 11},
    {description: 'this is a reply', comment_id: 6, author_id: 12},
    {description: 'this is a reply', comment_id: 7, author_id: 13},
  ]);

};
