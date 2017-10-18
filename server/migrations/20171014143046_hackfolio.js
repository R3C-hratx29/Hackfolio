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
    }),
    knex.schema.createTable('projects', (table) => {
      table.increments('id').primary();
      table.integer('profile_id')
        .references('id')
        .inTable('profiles');
      table.string('title');
      table.string('description');
      table.string('github_link');
      table.string('website_link');
    }),
    knex.schema.createTable('links', (table) => {
      table.increments('id').primary();
      table.integer('profile_id')
        .references('id')
        .inTable('profiles');
      table.string('title');
      table.string('link');
      table.string('icon');
    }),
    knex.schema.createTable('stacks', (table) => {
      table.increments('id').primary();
      table.integer('project_id')
        .references('id')
        .inTable('projects');
      table.string('tech');
    }),
    knex.schema.createTable('images', (table) => {
      table.increments('id').primary();
      table.integer('project_id')
        .references('id')
        .inTable('projects');
      table.string('link');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('stacks'),
    knex.schema.dropTable('images'),
    knex.schema.dropTable('links'),
    knex.schema.dropTable('projects'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('users')
  ]);
};
