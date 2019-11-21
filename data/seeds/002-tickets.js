
exports.seed = function(knex) {
      return knex('tickets').insert([
        {
          id: 1,         
          category: 'health',
          title: 'I burned my foot',
          description: 'I burned my foot on my George Foreman grill.',
        },
        {
          id: 2,
          category: 'lost cousin',
          title: 'Where is he?',
          description: 'I cannot find Mose',
        },
        {
          id: 3,
          category: 'money',
          title: 'I am broke.',
          description: 'I declare bankruptcy!',
        },
        {
          id: 4,
          category: 'animals',
          title: 'Cats',
          description: 'I have too many cats.',
        },
        {
          id: 5,
          category: 'beds',
          title: 'King-size sheets',
          description: 'Are king-size sheets called presidential-size in England? I should really have a tweeter account.',
        },
        {
          id: 6,
          category: 'prison',
          title: 'Dementors',
          description: 'The worst thing about prison was.. was the Dementors',
        },
        {
          id: 7,
          category: 'bears',
          title: 'beats',
          description: 'Battlestar Galactica',
        },
        {
          id: 8,
          category: 'food',
          title: 'I am hungry',
          description: 'I need pretzels',
        },
        {
          id: 9,
          category: 'sentences',
          title: 'Sometimes...',
          description: "Sometimes I'll start a sentence and I don't even know where it's going.  I just hope I find it along the way.",
        },
        {
          id: 10,
          category: 'food',
          title: 'Cake',
          description: "If I don't have some cake soon, I might die."
        },
        {
          id: 11,
          category: 'resolved1',
          title: 'resolved1',
          description: "resolved1"
        },
        {
          id: 12,
          category: 'resolved2',
          title: 'resolved2',
          description: "resolved2"
        },
        {
          id: 13,
          category: 'resolved3',
          title: 'resolved3',
          description: "resolved3"
        },
        {
          id: 14,
          category: 'resolved4',
          title: 'resolved4',
          description: "resolved4"
        },
        {
          id: 15,
          category: 'resolved5',
          title: 'resolved5',
          description: "resolved5"
        },
        {
          id: 16,
          category: 'resolved6',
          title: 'resolved6',
          description: "resolved6"
        },
        {
          id: 17,
          category: 'resolved7',
          title: 'resolved7',
          description: "resolved7"
        },
        {
          id: 18,
          category: 'resolved8',
          title: 'resolved8',
          description: "resolved8"
        },
        {
          id: 19,
          category: 'resolved9',
          title: 'resolved9',
          description: "resolved9"
        },
        {
          id: 20,
          category: 'resolved10',
          title: 'resolved10',
          description: "resolved10"
        },
        
      ]);
};
