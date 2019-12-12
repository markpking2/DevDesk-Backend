const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      return knex('units').insert([
        //     {
        //         id: 1,
        //         number: 1,
        //         course_id: 1,
        //         name: 'Web Fundamentals',
        //     },
        //     {
        //         id: 2,
        //         number: 2,
        //         course_id: 1,
        //         name: 'Web Applications I',
        //     },
        //     {
        //         id: 3,
        //         number: 3,
        //         course_id: 1,
        //         name: 'Web Applications II',
        //     },
        //     {
        //         id: 4,
        //         number: 4,
        //         course_id: 1,
        //         name: 'Web API: Node',
        //     },
        //     {
        //         id: 5,
        //         number: 5,
        //         course_id: 1,
        //         name: 'Web API: Java',
        //     },
        ]
    )
};