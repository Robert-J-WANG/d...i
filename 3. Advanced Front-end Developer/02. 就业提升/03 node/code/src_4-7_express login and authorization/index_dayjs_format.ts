import dayjs from "dayjs";

/* ------ 获取与格式化 (Get & Format) ----- */

/* ------ 1. 格式化输出 (.format()) ------ */
const now = dayjs();
console.log(now.format());
console.log(now.format("MM/DD/YYYY"));
console.log(now.format("MM/DD/YYYY hh:mm:ss"));
console.log(now.format("MM/DD/YYYY dd hh:mm:ss"));
console.log(now.format("MM/DD/YYYY hh:mm:ss A"));

console.log(now.format("YYYY-MM-DD"));
console.log(now.format("YYYY年MM月DD日 星期dd HH:mm:ss A"));

/* ---------- 2.获取时间戳和原生对象 ---------- */
console.log(now.unix()); //获取 Unix 秒级时间戳
console.log(now.valueOf()); //获取 Unix 毫秒级时间戳
console.log(now.toDate()); //转换为原生的 JavaScript Date 对象
console.log(now.toString()); //转换为普通字符串
console.log(now.toISOString()); //转换为 UTC ISO 8601 字符串 (用于数据库)
