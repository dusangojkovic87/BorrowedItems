const knex = require("../dbConnection/db");

module.exports = function createTableOfItemsIfNotExists() {
  knex.schema.hasTable("items").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("items", function (t) {
        t.increments("id").primary();
        t.string("name", 100);
        t.string("surname", 100);
        t.string("item", 100);
        t.string("dateBorrowed", 100);
        t.string("location", 100);
        t.string("contact", 100);
        t.string("itemImage").notNullable().defaultTo("images/default.png");
        t.boolean("isReturned").notNullable().defaultTo(false);
      });
    }
  });
};
