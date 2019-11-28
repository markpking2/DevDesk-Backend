
exports.seed = function(knex) {
      return knex('tickets_pictures').insert([
        {
          ticket_id: 11,
          url: 'https://files.slack.com/files-pri/T4JUEB3ME-FQGLQ3VU3/annotation_2019-11-21_104719.png'
        },
        {
          ticket_id: 6,
          url: 'https://files.slack.com/files-pri/T4JUEB3ME-FQWMDJAKY/thisissue.png'
        },
        {
          ticket_id: 4,
          url: 'https://files.slack.com/files-pri/T4JUEB3ME-FQACZTYLA/bw_error.png'
        },
        {
          ticket_id: 9,
          url: 'https://files.slack.com/files-pri/T4JUEB3ME-FQE32UA9G/error.png'
        },
        {
          ticket_id: 10,
          url: 'https://files.slack.com/files-pri/T4JUEB3ME-FQT9D2H1S/image.png'
        }
      ]);
};
