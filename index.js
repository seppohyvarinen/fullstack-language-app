require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");

const port = 8080;

var cors = require("cors");
app.use(cors());
app.use(express.static("frontend/build"));

let config = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
};

var pool = mysql.createPool(config);
app.get("/alltranslations", (req, res) => {
  pool.query("SELECT * from fin_eng", (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.send(results);
    }
  });
});

pool.on("acquire", function (connection) {
  console.log("***");
  console.log("Connection %d acquired", connection.threadId);
});

pool.on("release", function (connection) {
  console.log("Connection %d released", connection.threadId);
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
