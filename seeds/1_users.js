exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          name: "Lisa",
          points: 1000
        },
        {
          name: "Craag",
          points: 2
        },
        {
          name: "Del",
          points: 500
        },
        {
          name: "Megan",
          points: 501
        }
      ]);
    });
};
