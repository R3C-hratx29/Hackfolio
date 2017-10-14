exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('uid').primary();
      table.string('username');
      table.string('password');
      table.string('email');
    }),
    knex.schema.createTable('profiles', (table) => {
      table.increments('id').primary();
      table.integer('user_id')
        .references('uid')
        .inTable('users');
      table.string('bio');
      table.string('profile_pic');
      table.string('profession');
      table.string('name');
      table.specificType('links', 'jsonb[]');
    }),
    knex.schema.createTable('projects', (table) => {
      table.increments('id').primary();
      table.integer('user_id')
        .references('uid')
        .inTable('users');
      table.string('title');
      table.string('description');
      table.string('github_link');
      table.string('website_link');
      table.specificType('stack', 'jsonb[]');
      table.specificType('images', 'jsonb[]');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('projects')
  ]);
};
