
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'student',
          password: 'pass',
          cohort: 'WEB23',
          helper: 0,
          student: 1,
          email: 'student@test.com'
        },
        {
          username: 'helper',
          password: 'pass',
          cohort: null,
          helper: 1,
          student: 0,
          email: 'helper@test.com'
        },
        {
          username: 'helperstudent',
          password: 'pass',
          cohort: 'WEB22',
          helper: 1,
          student: 1,
          email: 'helperstudent@test.com'
        },
      ]);
    });
};
