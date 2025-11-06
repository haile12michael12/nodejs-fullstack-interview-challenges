exports.up = function(knex) {
  return knex.schema
    .createTable('email_templates', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('subject').notNullable();
      table.text('body').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('emails', function(table) {
      table.increments('id').primary();
      table.integer('template_id').unsigned().references('id').inTable('email_templates');
      table.string('recipient').notNullable();
      table.string('subject').notNullable();
      table.text('body').notNullable();
      table.enu('status', ['pending', 'sent', 'failed']).defaultTo('pending');
      table.text('error_message');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('sent_at');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('emails')
    .dropTableIfExists('email_templates');
};