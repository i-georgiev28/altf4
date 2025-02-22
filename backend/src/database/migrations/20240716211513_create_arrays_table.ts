import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('arrays', function(table) {
        table.increments();
        table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('name').notNullable();
        table.text('location').notNullable();
        table.integer('output').notNullable();
        table.integer('capacity').notNullable();
        table.text('data').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('arrays');
}
