/* ------------ 使用对称加密算法 ------------ */
// aes-128-cbc 128位（16子节）
// 使用node内置的库crypto
import crypto from "crypto";

// const result = crypto.getCiphers();
// console.log(result);

// 随机生成密钥
/* const secret = Buffer.from(Math.random().toString(36).slice(-8)); // 36进制（10个数字+26个字母），取后8个
//随机生成向量 */

const secret = Buffer.from("4yraitjz8nkjzfpa");

/* const iv = Math.random().toString(36).slice(-8); // 36进制（10个数字+26个字母），取后8个 */

const iv = Buffer.from("8nkjzfpa4yraitjz");

const encrypt = (str: string) => {
  // 创建加密函数
  const cryp = crypto.createCipheriv("aes-128-cbc", secret, iv);
  // 执行加密
  let result = cryp.update(str, "utf-8", "hex");
  result += cryp.final("hex");
  return result;
};

const decrypt = (str: string) => {
  // 创建解密函数
  const decryp = crypto.createDecipheriv("aes-128-cbc", secret, iv);
  // 执行解密
  let result = decryp.update(str, "hex", "utf-8");
  result += decryp.final("utf-8");
  return result;
};

export { encrypt, decrypt };
