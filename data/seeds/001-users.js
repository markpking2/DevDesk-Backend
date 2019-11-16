
exports.seed = function(knex) {
      return knex('users').insert([
        {
          username: 'michael',
          password: 'pass',
          name: 'Michael Scott',
          cohort: 'WEB23',
          helper: 0,
          student: 1,
          email: 'michael@dundermifflin.com'
        },
        {
          username: 'dwight',
          password: 'pass',
          name: 'Dwight Schrute',
          cohort: 'WEB23',
          helper: 0,
          student: 1,
          email: 'dwight@dundermifflin.com'
        },
        {
          username: 'jim',
          password: 'pass',
          name: 'Jim Halpert',
          cohort: 'WEB23',
          helper: 0,
          student: 1,
          email: 'jim@dundermifflin.com'
        },
        {
          username: 'creed',
          password: 'pass',
          name: 'Creed Bratton',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'creed@dundermifflin.com'
        },
        {
          username: 'pam',
          password: 'pass',
          name: 'Pam Beesly',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'pam@dundermifflin.com'
        },
        {
          username: 'kelly',
          password: 'pass',
          name: 'Kelly Kapoor',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'kelly@dundermifflin.com'
        },
        {
          username: 'darryl',
          password: 'pass',
          name: 'Darryl Philbin',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'darryl@dundermifflin.com'
        },
        {
          username: 'stanley',
          password: 'pass',
          name: 'Stanley Hudson',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'stanley@dundermifflin.com'
        },
        {
          username: 'narddog',
          password: 'pass',
          name: 'Andy Bernard',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'andy@dundermifflin.com'
        },
        {
          username: 'kevin',
          password: 'pass',
          name: 'Kevin Malone',
          cohort: 'WEB23',
          helper: 1,
          student: 1,
          email: 'kevin@dundermifflin.com'
        },
        {
          username: 'toby',
          password: 'pass',
          name: 'Toby Flenderson',
          cohort: 'WEB23',
          helper: 1,
          student: 1,
          email: 'toby@dundermifflin.com'
        },
        {
          username: 'angela',
          password: 'pass',
          name: 'Angela Martin',
          cohort: 'WEB23',
          helper: 1,
          student: 1,
          email: 'angela@dundermifflin.com'
        },
        {
          username: 'ryan',
          password: 'pass',
          name: 'Ryan Howard',
          cohort: 'WEB23',
          helper: 1,
          student: 1,
          email: 'ryan@dundermifflin.com'
        },
        
      ]);
    });
};
