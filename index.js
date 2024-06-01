const express = require("express");
const mysql = require("mysql");
const app = express();
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } = process.env;
const port = 5000;
const errors = {
  DB_SERVER:
    "Ughh! Database server not up properly. Please re-try! (Can use readme file for reference from step 1)",
  DB_DUMP:
    "Ughh! Database not up properly. Please re-try! (Can use readme file for reference from step 2)",
  DB_TABLE:
    "Ughh! Looks like database table not setup properly. Please re-try! (Can use readme file for reference step 2.5)",
};

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
  });

  connection.connect((err) => {
    if (err) {
      res.render("index", { users: [], error: errors["DB_SERVER"] });
      connection.end();
    } else {
      queryDb(connection, res);
    }
  });
});

app.get("/upscale/:number", (req, res) => {
  try {
    function fibo(n) {
      if (n < 2) {
        return 1;
      }
      return fibo(n - 1) + fibo(n - 2);
    }
    const result = fibo(req.params.number);
    res.render("index", { users: [], error: `Result is - ${result}` });
  } catch (error) {
    console.log("error", error);
    res.render("index", { users: [], error });
  }
});

function queryDb(connection, res) {
  const connect_db = `USE ${MYSQL_DB};`;
  connection.query(connect_db, (err) => {
    if (err) {
      res.render("index", { users: [], error: errors["DB_DUMP"] });
      connection.end();
    } else {
      queryTable(connection, res);
    }
  });
}

function queryTable(connection, res) {
  const get_users_query = "SELECT * from user_data;";
  connection.query(get_users_query, (err, result) => {
    if (err) {
      res.render("index", { users: [], error: errors["DB_TABLE"] });
      connection.end();
    } else {
      res.render("index", { users: result, error: false });
    }
  });
}

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
