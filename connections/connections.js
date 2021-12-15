require("dotenv").config();
const mysql = require("mysql");

let config = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
};

var pool = mysql.createPool(config);

pool.on("acquire", function (connection) {
  console.log("***");
  console.log("Connection %d acquired", connection.threadId);
});

pool.on("release", function (connection) {
  console.log("Connection %d released", connection.threadId);
});

let connections = {
  save: (location) =>
    new Promise((resolve, reject) => {
      var check = validator.validate(location, locationSchema);

      if (check.errors.length === 0) {
        var sql =
          "insert into locations (latitude, longitude) values (" +
          pool.escape(location.lat) +
          ", " +
          pool.escape(location.lon) +
          ")";
        pool.query(sql, (err, locations) => {
          if (err) {
            reject("Something went wrong with saving, please try again");
          } else {
            resolve("SAVE SUCCESFUL, FINALLY!");
          }
        });
      } else {
        reject(check.errors);
      }
    }),
  findAll: () =>
    new Promise((resolve, reject) => {
      pool.query("select * from fin_eng", (err, locations) => {
        if (err) {
          reject("Something went wrong with fetching data, please try again");
        } else {
          resolve(locations);
        }
      });
    }),
  deleteById: (id) =>
    new Promise((resolve, reject) => {
      pool.query(
        "delete from locations where id = " + pool.escape(id),
        (err, location) => {
          if (err) {
            reject("data can't be deleted for some reason, please try again");
          }
          if (location.affectedRows == 0) {
            reject("No such id: " + id);
          } else {
            resolve("Deleted id: " + id + " succesfully");
          }
        }
      );
    }),

  findById: (id) =>
    new Promise((resolve, reject) => {
      pool.query(
        "select * from locations where id = " + pool.escape(id),
        (err, location) => {
          if (err) {
            reject("can't find location with the id " + id);
          } else {
            resolve(location);
          }
        }
      );
    }),
  sortBy: (keyword, order) =>
    new Promise((resolve, reject) => {
      if (
        (keyword == "latitude" || keyword == "longitude") &&
        (order == "asc" || order == "desc")
      ) {
        pool.query(
          `select * from locations order by ${keyword} ${order}`,
          [keyword, order],

          (err, location) => {
            if (err) {
              reject("something went wrong with sorting");
            } else {
              resolve(location);
            }
          }
        );
      } else {
        reject(
          `check your input for sorting: use "latitude" or "longitude" for keyword and "asc" or "desc" for order `
        );
      }
    }),
};

module.exports = connections;
