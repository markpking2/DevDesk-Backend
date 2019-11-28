const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      return knex('users').insert([
        {
          username: 'kevinafable',
          password: bcrypt.hashSync('pass', 8),
          name: 'Kevin Afable',
          cohort: 'WEB23',
          email: 'kevinafable@fake.com'
        },
        {
          username: 'justinbrandley',
          password: bcrypt.hashSync('pass', 8),
          name: 'Justin Brandley',
          cohort: 'WEB23', 
          email: 'justinbrandley@fake.com'
        },
        {
          username: 'nolanallen',
          password: bcrypt.hashSync('pass', 8),
          name: 'Nolan Allen',
          cohort: 'WEB23',
          email: 'nolanallen@fake.com'
        },
        {
          username: 'joshuaholtsclaw',
          password: bcrypt.hashSync('pass', 8),
          name: 'Joshua Holtsclaw',
          cohort: 'WEB23',
          email: 'joshuaholtsclaw@fake.com'
        },
        {
          username: 'vanesaflores',
          password: bcrypt.hashSync('pass', 8),
          name: 'Vanesa Flores',
          cohort: 'WEB23',
          email: 'vanesflores@fake.com'
        },
        {
          username: 'dalepancho',
          password: bcrypt.hashSync('pass', 8),
          name: 'Dale Pancho',
          cohort: 'WEB23',
          email: 'dalepancho@fake.com'
        },
        {
          username: 'brittanymoyers',
          password: bcrypt.hashSync('pass', 8),
          name: 'Brittany Moyers',
          cohort: 'WEB23',
          email: 'brittanymoyers@fake.com'
        },
        {
          username: 'coristernberg',
          password: bcrypt.hashSync('pass', 8),
          name: 'Cori Sternberg',
          cohort: 'WEB23',
          email: 'coristernberg@fake.com'
        },
        {
          username: 'leonardwinkler',
          password: bcrypt.hashSync('pass', 8),
          name: 'Leonard Winkler',
          cohort: 'WEB23',
          email: 'leonardwinkler@fake.com'
        },
        {
          username: 'louisgelinas',
          password: bcrypt.hashSync('pass', 8),
          name: 'Louis Gelinas',
          cohort: 'WEB23',
          email: 'louisgelinas@fake.com'
        },
        {
          username: 'justinnichols',
          password: bcrypt.hashSync('pass', 8),
          name: 'Justin Nichols',
          cohort: 'WEB23',
          email: '@fake.com'
        },
       {
        username: 'jmiller',
        password: bcrypt.hashSync('pass', 8),
        name: 'Jordan Miller',
        cohort: 'Web24',
        email: 'jMiller@fakeemail.com',
       },
       {
        username: 'mdegregori',
        password: bcrypt.hashSync('pass', 8),
        name: 'Mauricio Degregori',
        cohort: 'Web24',
        email: 'mDegregori@fakeemail.com',
       },
       {
        username: 'cwetzel',
        password: bcrypt.hashSync('pass', 8),
        name: 'Chelsea Wetzel',
        cohort: 'Web24',
        email: 'cWetzel@fakeemail.com',
       },
       {
        username: 'rrenteria',
        password: bcrypt.hashSync('pass', 8),
        name: 'Ryan Renteria',
        cohort: 'Web24',
        email: 'rRenteria@fakeemail.com',
       },
       {
        username: 'sallen',
        password: bcrypt.hashSync('pass', 8),
        name: 'Sam Allen',
        cohort: 'Web24',
        email: 'sAllen@fakeemail.com',
       },
       {
        username: 'jcooper',
        password: bcrypt.hashSync('pass', 8),
        name: 'Jessica G Cooper',
        cohort: 'Web24',
        email: 'jCooper@fakeemail.com',
       },
       {
        username: 'jogles',
        password: bcrypt.hashSync('pass', 8),
        name: 'Jackson Ogles',
        cohort: 'Web24',
        email: 'jOgles@fakeemail.com',
       },
       {
        username: 'aclements',
        password: bcrypt.hashSync('pass', 8),
        name: 'April M. Clements',
        cohort: 'Web24', 
        email: 'aClements@fakeemail.com',
       },
       {
        username: 'nolanpicini',
        password: bcrypt.hashSync('pass', 8),
        name: 'Nolan Picini',
        cohort: 'Web26',
        email: 'nolanpic@gmail.com',
       },
       {
        username: 'jadonguzman',
        password: bcrypt.hashSync('pass', 8),
        name: 'Jadon Guzman',
        cohort: 'Web26',
        email: 'jguzman@fakeemail.com',
       },
       {
        username: 'matthewbedard',
        password: bcrypt.hashSync('pass', 8),
        name: 'Matthew Bedard',
        cohort: 'Web26',
        email: 'mbedard@fakeemail.com',
       },
       {
        username: 'dessagoodlet',
        password: bcrypt.hashSync('pass', 8),
        name: 'Dessa Goodlett',
        cohort: 'Web26',
        email: 'dgoodlett@fakeemail.com',
       },
       {
        username: 'lydiecherilus',
        password: bcrypt.hashSync('pass', 8),
        name: 'Lydie Cherilus',
        cohort: 'Web26',
        email: 'lcherilus@fakeemail.com',
      },
      {
         username: 'chrisengel',
         password: bcrypt.hashSync('pass', 8),
         name: 'Chris Engel',
         cohort: 'Web26',
         email: 'cengel@fakeemail.com',
      },
      {
         username: 'wwsulinski',
         password: bcrypt.hashSync('pass', 8),
         name: 'William Sulinski',
         cohort: 'WEB25',
         email: 'w@williamsulinski.com',
      },
      {
        username: 'jcochran',
        password: bcrypt.hashSync('pass', 8),
        name: 'Jevon Cochran',
        cohort: 'WEB25',
        email: 'jcochran@fakeemail.com'
      },
      {
        username: 'crussell',
        password: bcrypt.hashSync('pass', 8),
        name: 'Cody Russell',
        cohort: 'WEB25',
        email: 'crussell@fakeemail.com',
      },
      {
        username: 'mweidner',
        password: bcrypt.hashSync('pass', 8),
        name: 'Matthew Weidner ',
        cohort: 'WEB25',
        email: 'mweidner@fakeemail.com',
      },
      {
        username: 'smcguire',
        password: bcrypt.hashSync('pass', 8),
        name: 'Spencer McGuire',
        cohort: 'WEB25',
        email: 'smcguire@fakeemail.com',
      },
      {
        username: 'alynes',
        password: bcrypt.hashSync('pass', 8),
        name: 'Austin Lynes',
        cohort: 'Web PT7',     
        email: 'alynes@fakeemail.com',
      },
      {
        username: 'admin',
        password: bcrypt.hashSync('pass', 8),
        name: 'jordan',
        cohort: 'WEB24',
        email: 'admin@lambdadevdesk.now.sh',
      },     
      ], 'id');
};
