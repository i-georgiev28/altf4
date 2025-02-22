import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('username', 16).notNullable().unique();
        table.string('email', 32).notNullable();
        table.string('hashedPassword').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}
