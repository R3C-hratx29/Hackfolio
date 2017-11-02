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
      table.string('github');
      table.string('linked_in');
      table.string('twitter');
      table.string('facebook');
      table.string('resume');
    }),
    knex.schema.createTable('projects', (table) => {
      table.increments('id').primary();
      table.integer('profile_id')
        .references('id')
        .inTable('profiles');
      table.integer('order');
      table.string('title');
      table.string('description');
      table.string('github_link');
      table.string('website_link');
      table.string('stack');
      table.string('images', 100000);
      table.timestamp('created_at')
        .defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('notifications', (table) => {
      table.increments('id').primary();
      table.integer('conversation_id')
        .references('conversation_id')
        .inTable('conversations');
      table.integer('user_id')
        .references('uid')
        .inTable('users');
      table.string('message');
      table.timestamp('created_at')
        .defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('bounties', (table) => {
      table.increments('bounty_id').primary();
      table.string('title');
      table.integer('owner_id')
        .references('uid')
        .inTable('users');
      table.string('description');
      table.decimal('price', 14, 2);
      table.string('github');
      table.string('stack');
      table.string('images', 100000);
      table.timestamp('created_at')
        .defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('messages', (table) => {
      table.increments('message_id').primary();
      table.string('receiver');
      table.string('sender');
      table.string('message', 100000);
      table.integer('conversation_id')
        .references('conversation_id')
        .inTable('conversations');
      table.timestamp('created_at')
        .defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('conversations', (table) => {
      table.increments('conversation_id').primary();
      table.string('name');
      table.integer('bounty_id')
        .references('bounty_id')
        .inTable('bounties');
      table.integer('bounty_hunter')
        .references('uid')
        .inTable('users');
      table.integer('owner_id')
        .references('uid')
        .inTable('users');
    }),
    knex.schema.createTable('favorites', (table) => {
      table.increments('favorite_id').primary();
      table.integer('bounty_id')
        .references('bounty_id')
        .inTable('bounties');
      table.integer('user_id')
        .references('uid')
        .inTable('users');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('notifications'),
    knex.schema.dropTable('messages'),
    knex.schema.dropTable('conversations'),
    knex.schema.dropTable('favorites'),
    knex.schema.dropTable('bounties'),
    knex.schema.dropTable('projects'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('users')
  ]);
};
