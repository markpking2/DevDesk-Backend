const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      return knex('weeks').insert([
            {
                id: 1,
                number: 1,
                unit_id: 1,
                name: 'Web Fundamentals',
                description: 'The goal of this sprint is to build user interfaces and introduce git into our work flow. Concepts covered: Semantic HTML, box model, display types, layout techniques, flex box, basic terminal use, basic git use.',
                url: 'https://learn.lambdaschool.com/web1/sprint/recfwZvI7QhMa7xbG',
            },
            {
                id: 2,
                number: 2,
                unit_id: 1,
                name: 'Advanced CSS',
                description: 'Responsive design pushes our basic CSS styling forward into thousands of devices. A growing trend in today’s markets continue to be mobile devices that range from large tablets to small screens. You need to be able to correctly deliver content to all of these mediums.',
                url: 'https://learn.lambdaschool.com/web1/sprint/recIXiQgpgMdJ81ms',
            },
            {
                id: 3,
                number: 3,
                unit_id: 1,
                name: 'JavaScript Fundamentals',
                description: 'One of the most powerful web languages is JavaScript. Without it, there is no web. All web browsers use JavaScript in some fashion to power rich user experiences for those interacting with a web page or application.',
                url: 'https://learn.lambdaschool.com/web1/sprint/recclZwJxMU8kUngT',
            },
            {
                id: 4,
                number: 1,
                unit_id: 2,
                name: '',
                description: '',
                url: '',
            },
            {
                id: 5,
                number: 2,
                unit_id: 2,
                name: '',
                description: '',
                url: '',
            },
            {
                id: 6,
                number: 3,
                unit_id: 2,
                name: '',
                description: '',
                url: '',
            },
            {
                id: 7,
                number: 1,
                unit_id: 3,
                name: '',
                description: '',
                url: '',
            },
            {
                id: 8,
                number: 2,
                unit_id: 3,
                name: '',
                description: '',
                url: '',
            },
            {
                id: 9,
                number: 3,
                unit_id: 3,
                name: '',
                description: '',
                url: '',
            },
        ]
    )
};