// command to generate migrations
//  npx knex migrate:make init --migrations-directory migrations

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('article', function(table) {
        table.increments('id');
        table.string('heading',255).defaultTo("Untitled article");
        table.string('content',10000);
        table.timestamp('created_at').defaultTo(knex.fn.now()).nullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).nullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('article')
};
