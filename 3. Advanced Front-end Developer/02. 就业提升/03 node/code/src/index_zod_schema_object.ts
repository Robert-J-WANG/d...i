import { email, z } from "zod";
import { required } from "../node_modules/zod/src/v4/core/util";

/* ---------schema 组合类型 --------- */

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

/* -------------- 1. 对象 ------------- */

/* printResult(
  z.object({
    name: z.string().nonempty(),
    age: z.int().min(18).max(100),
    email: z.email(),
    isMale: z.boolean(),
    mobile: z.string().regex(/^02[0-8]\d{7,8}$/),
  }),
  {
    name: "robert",
    age: 20,
    email: "rb@gmail.com",
    isMale: false,
    mobile: "0231234567",
  }
);
 */

/* --------------- 可选和必须 --------------- */
/* printResult(
  z
    .object({
      name: z.string().nonempty(),
      age: z.int().min(18).max(100).optional(), //可选
      email: z.email(),
      isMale: z.boolean(),
      mobile: z.string().regex(/^02[0-8]\d{7,8}$/),
    })
    .required({
      //必须
      name: true,
      email: true,
    }),
  {
    name: "robert",
    // age: 20,
    email: "rb@gmail.com",
    isMale: false,
    mobile: "0231234567",
  }
); */

/* ------------- 指定某些属性 ------------- */

/* printResult(
  z
    .object({
      name: z.string().nonempty(),
      age: z.int().min(18).max(100).optional(), //可选
      email: z.email(),
      isMale: z.boolean(),
      mobile: z.string().regex(/^02[0-8]\d{7,8}$/),
    })
    .pick({
      name: true,
      mobile: true,
    }),
  {
    name: "robert",
    // age: 20,
    email: "rb@gmail.com",
    isMale: false,
    mobile: "0231234567",
  }
); */

/* ------------ 忽略某些数据验证 ------------ */

/* printResult(
  z
    .object({
      name: z.string().nonempty(),
      age: z.int().min(18).max(100).optional(), //可选
      email: z.email(),
      isMale: z.boolean(),
      mobile: z.string().regex(/^02[0-8]\d{7,8}$/),
    })
    .omit({
      name: true,
      mobile: true,
    }),
  {
    name: "robert",
    age: 20,
    email: "rb@gmail.com",
    isMale: false,
    mobile: "0231234567",
  }
); */

/* ------------- 选择部分数据 ------------- */

printResult(
  z
    .object({
      name: z.string().nonempty(),
      age: z.int().min(18).max(100).optional(), //可选
      email: z.email(),
      isMale: z.boolean(),
      mobile: z.string().regex(/^02[0-8]\d{7,8}$/),
    })
    .partial(),
  {
    name: "robert",
    age: 20,
  }
);

/* -------------- 2.数组 -------------- */
printResult(z.array(z.string()), ["fasdf", "fsadf"]);
