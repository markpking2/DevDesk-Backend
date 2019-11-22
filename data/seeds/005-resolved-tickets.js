
exports.seed = function(knex) {
      return knex('resolved_tickets').insert([
        {
          student_id: 1,
          helper_id: 10,
          ticket_id: 7,
          solution: 'Resolved'
        }
        
        

      ]);
};