import { z } from "zod";

/* ---------schema 基础类型和验证规则 --------- */

/**
 * 封装一个显示zod schema 验证结果的辅助函数
 * @param schema zod schema
 * @param data 需要验证的数据
 */
const printResult = (schema, data) => {
  const res = schema.safeParse(data);
  if (res.success) {
    console.log(res);
  } else {
    const result = res.error?.issues.map((i) => i.message);
    console.log(result);
  }
};

/* ------------ 1. string ----------- */
printResult(z.string(), 123);
printResult(z.string().length(7), "123");
printResult(z.string().min(5).max(10).startsWith("a").uppercase(), "aabd");

/* ------------- 2. 常用字符 ------------ */

/* printResult(z.email(), "abc@gmail.com");
printResult(z.email(), "123");

printResult(z.url(), "localhost://zod.dev/api");
printResult(z.httpUrl(), "localhost://zod.dev/api");

printResult(z.iso.date(), "2019-09-07");
printResult(z.iso.time(), "15:50:00");
printResult(z.iso.datetime(), "2019-09-07T15:50:00Z");
printResult(z.iso.datetime(), "2019-09-07 15:50:00"); */

/* -------------- 3. 数字 ------------- */
/* printResult(z.number(), 3.14);
printResult(z.number(), NaN);
printResult(z.number(), Infinity);

printResult(z.number().gt(10), 1);
printResult(z.number().gte(10), 10);
printResult(z.number().lt(10), 1);
printResult(z.number().lte(10), 10);

printResult(z.number().positive(), 0);
printResult(z.number().nonpositive(), 0);
printResult(z.number().negative(), 0);
printResult(z.number().nonnegative(), 0);
printResult(z.number().multipleOf(111), 222); */

/* -------------- 4.整数 -------------- */
/* printResult(z.int(), 222);
printResult(z.int(), 222.2);

printResult(z.int32(), 2222);
printResult(z.int32(), 22222222222); */

/* -------------- 5.布尔 -------------- */
/* printResult(z.boolean(), 0);
printResult(z.boolean(), true); */

/* -------------- 6.日期 -------------- */
printResult(z.date(), "2025-01-01");
printResult(z.date(), "2022-01-12T06:15:00.000Z");
printResult(z.date(), new Date());
