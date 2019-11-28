
exports.seed = function(knex) {
      return knex('comments').insert([
        {description: 'this is a comment', author_id: 1},
        {description: 'this is a comment', author_id: 1},
        {description: 'this is a comment', author_id: 2},
        {description: 'this is a comment', author_id: 2},
        {description: 'this is a comment', author_id: 3},
        {description: 'this is a comment', author_id: 3},
        {description: 'this is a comment', author_id: 4},
        {description: 'this is a comment', author_id: 4},
        {description: 'this is a comment', author_id: 5},
        {description: 'this is a comment', author_id: 5},
        {description: 'this is a comment', author_id: 6},
        {description: 'this is a comment', author_id: 6},
        {description: 'this is a comment', author_id: 7},
      ]);
};
