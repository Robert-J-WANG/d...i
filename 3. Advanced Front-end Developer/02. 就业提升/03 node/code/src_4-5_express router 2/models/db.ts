import { Sequelize } from "sequelize";
import { sqlLogger } from "../utils/logger";

const sequelize = new Sequelize("schooldb", "root", "123456", {
  host: "localhost",
  dialect: "mysql",

  logging: (msg) => {
    sqlLogger.debug(msg); // 使用自定义的sqlLogger记录日志
  },
});

export default sequelize;
