
exports.seed = function(knex) {
      return knex('authors_tickets').insert([
        {
          author_id: 1,
          ticket_id: 1
        },
        {
          author_id: 2,
          ticket_id: 2
        },
        {
          author_id: 3,
          ticket_id: 3
        },
        {
          author_id: 4,
          ticket_id: 4
        },
        {
          author_id: 5,
          ticket_id: 5
        },
        {
          author_id: 6,
          ticket_id: 6
        },
        {
          author_id: 7,
          ticket_id: 7
        },
        {
          author_id: 8,
          ticket_id: 8
        },
        {
          author_id: 9,
          ticket_id: 9
        },
        {
          author_id: 10,
          ticket_id: 10
        },
        {
          author_id: 11,
          ticket_id: 11
        },
        {
          author_id: 12,
          ticket_id: 12
        },
        {
          author_id: 13,
          ticket_id: 13
        },
        {
          author_id: 14,
          ticket_id: 14
        },
        {
          author_id: 15,
          ticket_id: 15
        },
        {
          author_id: 16,
          ticket_id: 16
        },
        {
          author_id: 17,
          ticket_id: 17
        },
        {
          author_id: 18,
          ticket_id: 18
        },
        
        
      ], 'id');
};
