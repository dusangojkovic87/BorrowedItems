const knex = require("../dbConnection/db");

module.exports = {
  getItemsFromDb: () => {
    return knex.select().table("items");
  },
};
