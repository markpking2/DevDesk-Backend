
exports.seed = function(knex) {
      return knex('comments').insert([
        {description: 'this is a comment'},
        {description: 'this is a comment'},
        {description: 'this is a comment'},
        {description: 'this is a comment'},
        {description: 'this is a comment'},
        {description: 'this is a comment'},
        {description: 'this is a comment'},
        {description: 'this is a comment'},
        {description: 'this is a comment'},
        {description: 'this is a comment'},
        {description: 'this is a comment'},
        {description: 'this is a comment'},
        {description: 'this is a comment'},
      ]);
};
