const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./items.sqlite",
  },
  useNullAsDefault: true,
});

module.exports = knex;
