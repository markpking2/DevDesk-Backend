
exports.seed = function(knex) {
      return knex('tickets_comments').insert([
        {ticket_id: 1, comment_id: 1},
        {ticket_id: 1, comment_id: 2},
        {ticket_id: 1, comment_id: 3},
        {ticket_id: 1, comment_id: 4},
        {ticket_id: 1, comment_id: 5},
        {ticket_id: 1, comment_id: 6},
        {ticket_id: 1, comment_id: 7},
        {ticket_id: 1, comment_id: 8},
        {ticket_id: 1, comment_id: 9},
        {ticket_id: 1, comment_id: 10},
        {ticket_id: 1, comment_id: 11},
        {ticket_id: 1, comment_id: 12},
        {ticket_id: 1, comment_id: 13},
      ]);

};
