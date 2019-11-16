
exports.seed = function(knex) {
      return knex('students_tickets').insert([
        {
          student_id: 1,
          ticket_id: 1
        },
        {
          student_id: 2,
          ticket_id: 2
        },
        {
          student_id: 1,
          ticket_id: 3
        },
        {
          student_id: 12,
          ticket_id: 4
        },
        {
          student_id: 2,
          ticket_id: 5
        },
        {
          student_id: 1,
          ticket_id: 6
        },
        {
          student_id: 3,
          ticket_id: 7
        },
        {
          student_id: 8,
          ticket_id: 8
        },
      ]);
};
