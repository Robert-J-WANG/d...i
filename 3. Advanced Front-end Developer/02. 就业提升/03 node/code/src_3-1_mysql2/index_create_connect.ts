import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "companydb",
});

connection.query("SELECT * FROM company", (err, res) => console.log(res));

connection.end();
