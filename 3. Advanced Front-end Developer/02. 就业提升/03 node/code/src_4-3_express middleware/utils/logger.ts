/* ------------- 1. 模块导入 ------------ */
import log4js from "log4js";
import path from "path";

/* -------------- 2. 配置 ------------- */
log4js.configure({
  // 配置出口
  appenders: {
    // sql类的配置
    sql: {
      type: "dateFile", //dateFile - 文件名中包含日期
      filename: path.resolve(__dirname, "../logs", "sql", "logging.log"),
      layout: {
        type: "pattern",
        pattern: "%c [%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p]  - %m%n",
      },
      maxLogSize: 1024, // 单个文件的大小
      keepFileExt: true, // 是否保留后缀名
      numBackups: 5, // 保留文件的个数， 默认是1
    },
    default: {
      type: "stdout",
      // filename: path.resolve(__dirname, "logs", "default", "logging.log"),
    },
  },
  // 配置类别
  categories: {
    sql: {
      appenders: ["sql"], // 使用sql的出口配置写入日志
      level: "all", // log的级别
    },
    default: {
      appenders: ["default"],
      level: "all",
    },
  },
});

process.on("exit", () => {
  log4js.shutdown(); //当程序退出时，确保所有日志写入文件、套接字关闭等操作完成。
});

/* -------------- 3.使用 -------------- */

const sqlLogger = log4js.getLogger("sql");
const defaultLogger = log4js.getLogger("default");

export { sqlLogger, defaultLogger };
