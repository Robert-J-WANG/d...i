import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "companydb",
});

// 增
/* const queryAdd =
  "INSERT INTO department (`name`, companyId, buildDate) VALUES ('New Dept', 7, '2025-04-01')";
connection.query(queryAdd, (err, res) => console.log(res)); */

// 改

const queryUpdate =
  "update department set `name`='Office', buildDate='2025-12-31' where id=14";
connection.query(queryUpdate, (err, res) => console.log(res));

//删
const queryDelete = "delete from department  where id in (12,13)";
connection.query(queryDelete, (err, res) => console.log(res));

// 查 - view

const queryView =
  "SELECT * FROM einfo_of_company AS v WHERE V.salary > 8000 AND V.eName LIKE '%E%'";
connection.query(queryView, (err, res) => console.log(res));
