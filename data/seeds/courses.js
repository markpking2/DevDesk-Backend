const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      return knex('courses').insert([
            {
                id: 1,
                name: 'Full Stack Web Development',
                description: 'Intensive computer science and software engineering training. Learn computers, software engineering and web development top to bottom.',
                url: 'https://learn.lambdaschool.com/course/cs-fsw',
            },
            // {
            //     id: 1,
            //     name: '',
            //     description: '',
            //     url: '',
            // },
            // {
            //     id: 1,
            //     name: '',
            //     description: '',
            //     url: '',
            // },
            // {
            //     id: 1,
            //     name: '',
            //     description: '',
            //     url: '',
            // },
        ]
    )
};