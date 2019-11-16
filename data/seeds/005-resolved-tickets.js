
exports.seed = function(knex) {
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
