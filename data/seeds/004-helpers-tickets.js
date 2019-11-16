
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('helpers_tickets').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('helpers_tickets').insert([
        {
          helper_id: 4,
          ticket_id: 2
        },
        {
          helper_id: 5,
          ticket_id: 3
        },
        {
          helper_id: 6,
          ticket_id: 6
        }
      ]);
    });
};
