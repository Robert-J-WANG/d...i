import dayjs from "dayjs";

/* ---------- 比较与查询 (Query) --------- */

/* ------------- 1. 比较 ------------ */
const now = dayjs();
const someDay = dayjs("2011-01-01 11:11:11");

console.log(now.isSame(someDay, "day"));
console.log(now.isBefore(someDay, "day"));
console.log(now.isAfter(someDay, "day"));

/* ----------- 2. 计算时间差 (`.diff()`)----------- */
console.log(now.diff(someDay, "day"));
console.log(now.diff(someDay, "month"));
console.log(now.diff(someDay, "week"));
