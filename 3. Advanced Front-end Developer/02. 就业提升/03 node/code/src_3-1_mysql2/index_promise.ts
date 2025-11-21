import mysql from "mysql2/promise";

const getData = async (queryStr) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "companydb",
  });
  const [res] = await connection.query(queryStr);
  console.log(res);
};
getData("SELECT * FROM company");
