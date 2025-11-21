import mysql from "mysql2/promise";

/* const getData = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "companydb",
  });
  const [res] = await connection.query(`SELECT * FROM employee where id=${id}`);
  console.log(res);
};
getData(5); */

/* const getData = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "companydb",
    multipleStatements: true,
  });
  const [res] = await connection.query(`SELECT * FROM employee where id=${id}`);
  console.log(res);
};
getData(`null;  delete from employee where id=1`); */

/* const getData = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "companydb",
    multipleStatements: true,
  });
  const [res] = await connection.query(`SELECT * FROM employee where id=?`, [
    id,
  ]);
  console.log(res);
};
getData(`3;  delete from employee where id=2`); */

/* const getData = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "companydb",
    multipleStatements: true,
  });
  const [res] = await connection.execute(`SELECT * FROM employee where id=?`, [
    id,
  ]);
  console.log(res);
};
getData(`3;  delete from employee where id=2`); */

const getData = async (name) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "companydb",
    multipleStatements: true,
  });
  const [res] = await connection.execute(
    `SELECT * FROM employee where name like concat('%',?,'%')`,
    [name]
  );
  console.log(res);
};
getData("ab");
