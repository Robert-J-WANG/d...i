import mysql from "mysql2/promise";

const connecttionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "companydb",
  multipleStatements: true,
});

const getEmployee = async (id) => {
  const [res] = await connecttionPool.execute(
    `SELECT * FROM employee where id=?`,
    [id]
  );
  console.log(res);
};

const getCompany = async (id) => {
  const [res] = await connecttionPool.execute(
    `SELECT * FROM company where id=?`,
    [id]
  );
  console.log(res);
};
getEmployee(10);
getCompany(1);
