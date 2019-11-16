const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      return knex('users').insert([
        {
          username: 'michael',
          password: bcrypt.hashSync('pass', 8),
          name: 'Michael Scott',
          cohort: 'WEB23',
          helper: 0,
          student: 1,
          email: 'michael@dundermifflin.com'
        },
        {
          username: 'dwight',
          password: bcrypt.hashSync('pass', 8),
          name: 'Dwight Schrute',
          cohort: 'WEB23',
          helper: 0,
          student: 1,
          email: 'dwight@dundermifflin.com'
        },
        {
          username: 'jim',
          password: bcrypt.hashSync('pass', 8),
          name: 'Jim Halpert',
          cohort: 'WEB23',
          helper: 0,
          student: 1,
          email: 'jim@dundermifflin.com'
        },
        {
          username: 'creed',
          password: bcrypt.hashSync('pass', 8),
          name: 'Creed Bratton',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'creed@dundermifflin.com'
        },
        {
          username: 'pam',
          password: bcrypt.hashSync('pass', 8),
          name: 'Pam Beesly',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'pam@dundermifflin.com'
        },
        {
          username: 'kelly',
          password: bcrypt.hashSync('pass', 8),
          name: 'Kelly Kapoor',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'kelly@dundermifflin.com'
        },
        {
          username: 'darryl',
          password: bcrypt.hashSync('pass', 8),
          name: 'Darryl Philbin',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'darryl@dundermifflin.com'
        },
        {
          username: 'stanley',
          password: bcrypt.hashSync('pass', 8),
          name: 'Stanley Hudson',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'stanley@dundermifflin.com'
        },
        {
          username: 'narddog',
          password: bcrypt.hashSync('pass', 8),
          name: 'Andy Bernard',
          cohort: 'WEB23',
          helper: 1,
          student: 0,
          email: 'andy@dundermifflin.com'
        },
        {
          username: 'kevin',
          password: bcrypt.hashSync('pass', 8),
          name: 'Kevin Malone',
          cohort: 'WEB23',
          helper: 1,
          student: 1,
          email: 'kevin@dundermifflin.com'
        },
        {
          username: 'toby',
          password: bcrypt.hashSync('pass', 8),
          name: 'Toby Flenderson',
          cohort: 'WEB23',
          helper: 1,
          student: 1,
          email: 'toby@dundermifflin.com'
        },
        {
          username: 'angela',
          password: bcrypt.hashSync('pass', 8),
          name: 'Angela Martin',
          cohort: 'WEB23',
          helper: 1,
          student: 1,
          email: 'angela@dundermifflin.com'
        },
        {
          username: 'ryan',
          password: bcrypt.hashSync('pass', 8),
          name: 'Ryan Howard',
          cohort: 'WEB23',
          helper: 1,
          student: 1,
          email: 'ryan@dundermifflin.com'
        },
      ]);
};
