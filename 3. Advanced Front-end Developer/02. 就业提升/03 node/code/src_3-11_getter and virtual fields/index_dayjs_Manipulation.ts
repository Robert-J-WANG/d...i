import dayjs from "dayjs";

/* ------- 日期操作 (Manipulation) ------ */

/* ------------- 1. 增减时间 ------------ */
const now = dayjs();
const formatRule = "YYYY-MM-DD hh:mm:ss A";
console.log(now.format(formatRule));
console.log(now.add(10, "day").format(formatRule));
console.log(now.subtract(6, "month").format(formatRule));

/* ----------- 2. 设为开始/结束 ----------- */
console.log(now.startOf("year").format(formatRule));
console.log(now.startOf("month").format(formatRule));

console.log(now.endOf("year").format(formatRule));
console.log(now.endOf("day").format(formatRule));
