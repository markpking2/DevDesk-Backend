
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resolved_tickets').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resolved_tickets').insert([
        {
          student_id: 8,
          helper_id: 9,
          ticket_id: 10,
        },
        {
          student_id: 1,
          helper_id: 11,
          ticket_id: 9,
        }
      ]);
    });
};
