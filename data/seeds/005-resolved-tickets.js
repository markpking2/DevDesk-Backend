
exports.seed = function(knex) {
      return knex('resolved_tickets').insert([
        {
          student_id: 8,
          helper_id: 9,
          ticket_id: 10,
          solution: 'resolved'
        },
        {
          student_id: 1,
          helper_id: 11,
          ticket_id: 9,
          solution: 'resolved'
        },
        {
          student_id: 1,
          helper_id: 10,
          ticket_id: 11,
          solution: 'resolved'
        },
        {
          student_id: 11,
          helper_id: null,
          ticket_id: 12,
          solution: 'resolved'
        },
        {
          student_id: null,
          helper_id: null,
          ticket_id: 13,
          solution: 'resolved'
        },
        {
          student_id: null,
          helper_id: null,
          ticket_id: 14,
          solution: 'resolved'
        },
        {
          student_id: null,
          helper_id: 10,
          ticket_id: 15,
          solution: 'resolved'
        },
        {
          student_id: null,
          helper_id: 12,
          ticket_id: 16,
          solution: 'resolved'
        },
        {
          student_id: null,
          helper_id: 13,
          ticket_id: 17,
          solution: 'resolved'
        },
        {
          student_id: 1,
          helper_id: 13,
          ticket_id: 18,
          solution: 'resolved'
        },
        {
          student_id: null,
          helper_id: 12,
          ticket_id: 19,
          solution: 'resolved'
        },
        {
          student_id: null,
          helper_id: null,
          ticket_id: 20,
          solution: 'resolved'
        },
        
        

      ]);
};