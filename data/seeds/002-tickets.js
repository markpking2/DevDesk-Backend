
exports.seed = function(knex) {
      return knex('tickets').insert([
        {
          category: 'health',
          title: 'I burned my foot',
          description: 'I burned my foot on my George Foreman grill.',
        },
        {
          category: 'lost cousin',
          title: 'Where is he?',
          description: 'I cannot find Mose',
        },
        {
          category: 'money',
          title: 'I am broke.',
          description: 'I declare bankruptcy!',
        },
        {
          category: 'animals',
          title: 'Cats',
          description: 'I have too many cats.',
        },
        {
          category: 'beds',
          title: 'King-size sheets',
          description: 'Are king-size sheets called presidential-size in England? I should really have a tweeter account.',
        },
        {
          category: 'prison',
          title: 'Dementors',
          description: 'The worst thing about prison was.. was the Dementors',
        },
        {
          category: 'bears',
          title: 'beats',
          description: 'Battlestar Galactica',
        },
        {
          category: 'food',
          title: 'I am hungry',
          description: 'I need pretzels',
        },
        {
          category: 'sentences',
          title: 'Sometimes...',
          description: "Sometimes I'll start a sentence and I don't even know where it's going.  I just hope I find it along the way.",
        },
        {
          category: 'food',
          title: 'Cake',
          description: "If I don't have some cake soon, I might die."
        },
        {
          category: 'resolved1',
          title: 'resolved1',
          description: "resolved1"
        },
        {
          category: 'resolved2',
          title: 'resolved2',
          description: "resolved2"
        },
        {
          category: 'resolved3',
          title: 'resolved3',
          description: "resolved3"
        },
        {
          category: 'resolved4',
          title: 'resolved4',
          description: "resolved4"
        },
        {
          category: 'resolved5',
          title: 'resolved5',
          description: "resolved5"
        },
        {
          category: 'resolved6',
          title: 'resolved6',
          description: "resolved6"
        },
        {
          category: 'resolved7',
          title: 'resolved7',
          description: "resolved7"
        },
        {
          category: 'resolved8',
          title: 'resolved8',
          description: "resolved8"
        },
        {
          category: 'resolved9',
          title: 'resolved9',
          description: "resolved9"
        },
        {
          category: 'resolved10',
          title: 'resolved10',
          description: "resolved10"
        },
      ]);
};
