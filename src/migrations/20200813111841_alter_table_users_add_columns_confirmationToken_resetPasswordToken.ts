import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('users', table => {
        table.string('confirmationToken').unique();
        table.string('resetPasswordToken').unique();
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('users', table => {
        table.dropColumn('confirmationToken');
        table.dropColumn('resetPasswordToken');
    })
};
