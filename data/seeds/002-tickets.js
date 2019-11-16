
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tickets').truncate()
    .then(function () {
      // Inserts seed entries
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
      ]);
    });
};
