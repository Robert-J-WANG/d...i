import { Sequelize } from "sequelize";

const sequelize = new Sequelize("schooldb", "root", "123456", {
  host: "localhost",
  dialect: "mysql",

  logging: false, // 不显示sql详情日志
});

export default sequelize;
