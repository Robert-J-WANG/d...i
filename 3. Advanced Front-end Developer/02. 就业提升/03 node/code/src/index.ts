import dayjs from "dayjs";

/* ---------- 时区、UTC 与本地时间 ---------- */

/* ---------- 1. 时区与 UTC 插件 --------- */
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc); // 使用utc插件
dayjs.extend(timezone); // 使用时区插件

/* ----------- 2. UTC 时间处理 ---------- */
const formatRule = "YYYY-MM-DD hh:mm:ss A";
/* ----------- 创建一个utc时间对象 ---------- */
const now_utc = dayjs.utc();
console.log(now_utc.format());

/* --------- 将现有实例转换为 UTC 时间 -------- */
const now = dayjs();
console.log(now.format());
console.log(now.utc().format());

/* --------- 将 UTC 实例转换本地时间 --------- */
console.log(now_utc.local().format());

/* --------- 检查实例是否是 UTC 时间 --------- */
console.log(now.isUTC());
console.log(now_utc.isUTC());

/* ------- 输出 UTC 格式的 ISO 字符串 ------- */
/* ---------- 数据库存储的通用标准。 ---------- */
console.log(now.toISOString());
console.log(dayjs("2025-11-11").toISOString());
