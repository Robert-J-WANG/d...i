import { z } from "zod";
// import type { Infer } from "zod";

/* ------------- zod基础用法 ------------ */

/* ---------- 1.创建schema对象 ---------- */
const schema = z.string().min(5);

/* ------------- 2. 验证数据 ------------ */
// 使用 parse
/* try {
  const res = schema.parse("ddddd");
  console.log(res);
} catch (err) {
  throw err.issues;
}
// 验证数据 - 验证失败
try {
  const res = schema.parse("d");
  console.log(res);
} catch (err) {
  throw err.issues;
} */

// 使用 safeParse
console.log(schema.safeParse("dddddd"));
console.log(schema.safeParse("d"));

/* ------------- 3. 类型推断 ------------ */
type myType = z.infer<typeof schema>;
// const name: myType = 123;
const name: myType = "123";
