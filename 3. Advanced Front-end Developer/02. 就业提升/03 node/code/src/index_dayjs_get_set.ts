import dayjs from "dayjs";

/* ---------- 获取日期部分 (.get() / .set()) --------- */

const now = dayjs();

console.log(now.year());
console.log(now.month()); //月 - 0-11
console.log(now.date()); // 日
console.log(now.hour());
console.log(now.minute());
console.log(now.second());
console.log(now.millisecond());
console.log(now.day()); // 星期 - 0代表周日，6代表周六
console.log(now.unix()); // 时间戳

//自定义日期，比如2026年
console.log(now.set("year", 2026).format());
