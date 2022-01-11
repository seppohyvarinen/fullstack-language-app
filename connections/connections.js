require("dotenv").config();
const mysql = require("mysql");

const Validator = require("jsonschema").Validator;

const validator = new Validator();

const translationSchema = {
  properties: {
    finnish: {
      type: "string",
      pattern: ".*",
      minLength: 1,
    },
    english: {
      type: "string",
      minLength: 1,
    },

    tag: {
      type: "string",
      minLength: 1,
    },
  },
};

const tagSchema = {
  properties: {
    tag: {
      type: "string",
    },
  },
};

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
  save: (translation) =>
    new Promise((resolve, reject) => {
      var check = validator.validate(translation, translationSchema);
      if (check.errors.length === 0) {
        console.log("inside sql query");
        var sql =
          "insert into fin_eng (finnish, english, tag) values (" +
          pool.escape(translation.finnish) +
          ", " +
          pool.escape(translation.english) +
          ", " +
          pool.escape(translation.tag) +
          ")";
        pool.query(sql, (err) => {
          if (err) {
            reject("Something went wrong with saving, please try again");
          } else {
            resolve("SAVED SUCCESFULLY: ");
          }
        });
      } else {
        reject(check.errors);
      }
    }),
  saveTag: (tag) =>
    new Promise((resolve, reject) => {
      var check = validator.validate(tag, tagSchema);
      if (check.errors.length === 0) {
        var sql =
          "insert into tags (tag) values (" + pool.escape(tag.tag) + ")";
        pool.query(sql, (err) => {
          if (err) {
            reject(
              "Something went wrong with saving the tag, please try again"
            );
          } else {
            resolve("SAVED SUCCESFULLY: ");
          }
        });
      } else {
        reject(check.errors);
      }
    }),
  findAll: () =>
    new Promise((resolve, reject) => {
      pool.query("select * from fin_eng order by finnish", (err, words) => {
        if (err) {
          reject("Something went wrong with fetching data, please try again");
        } else {
          resolve(words);
        }
      });
    }),
  findTags: () =>
    new Promise((resolve, reject) => {
      pool.query("select * from tags", (err, locations) => {
        if (err) {
          reject("Something went wrong with fetching tags, please try again");
        } else {
          resolve(locations);
        }
      });
    }),
  deleteWord: (word) =>
    new Promise((resolve, reject) => {
      pool.query(
        "delete from fin_eng where finnish = " +
          pool.escape(word.finnish.f) +
          " and english = " +
          pool.escape(word.english.e),
        (err, fin_eng) => {
          if (err) {
            reject("data can't be deleted for some reason, please try again");
          }
          if (fin_eng.affectedRows == 0) {
            reject("No such word");
          } else {
            resolve("Deleted word succesfully");
          }
        }
      );
    }),

  authenticate: (body) =>
    new Promise((resolve, reject) => {
      pool.query(
        "select * from trans_app where username = " +
          pool.escape(body.username),
        +" and password = " + pool.escape(body.password),
        (err, result) => {
          if (err) {
            reject(false);
          } else {
            resolve(result);
          }
        }
      );
    }),
  editWord: (word) =>
    new Promise((resolve, reject) => {
      pool.query(
        "update fin_eng set finnish = " +
          pool.escape(word.newFinnish) +
          ", english = " +
          pool.escape(word.newEnglish) +
          "where finnish = " +
          pool.escape(word.finnish) +
          " and english = " +
          pool.escape(word.english),
        (err, fin_eng) => {
          if (err) {
            reject("data can't be edited for some reason, please try again");
          }
          if (fin_eng.affectedRows == 0) {
            reject("No such word");
          } else {
            resolve("Edited word succesfully");
          }
        }
      );
    }),

  findByTag: (tag) =>
    new Promise((resolve, reject) => {
      pool.query(
        "select * from fin_eng where tag = " +
          pool.escape(tag) +
          " order by finnish",
        (err, words) => {
          if (err) {
            reject("can't find words with the tag " + tag);
          } else {
            resolve(words);
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
