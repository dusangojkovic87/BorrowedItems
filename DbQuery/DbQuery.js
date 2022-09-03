const knex = require("../dbConnection/db");
module.exports = {
  insertItemToDb: (data) => {
    return knex("items").insert({
      name: data.name,
      surname: data.surname,
      item: data.item,
      location: data.location,
      dateBorrowed: data.dateBorrowed,
    });
  },
  deleteItemFromDb(id) {
    return knex("items").where({ id: id }).del();
  },
  updateReturnedStatusInDb: (id, value) => {
    return knex("items").where({ id: id }).update({ isReturned: value });
  },
};
