// ESM
import { faker } from "@faker-js/faker";
import { Class } from "../models/sync";

function randomClassName() {
  const subjects = ["前端", "Java", "UI", "产品", "测试", "大数据", "AI"];
  const num = faker.number.int({ min: 1, max: 20 });
  return `${faker.helpers.arrayElement(subjects)} 第${num}期`;
}

export const classes = faker.helpers.multiple(
  () => {
    return {
      name: randomClassName(),
      openDate: faker.date.between({
        from: "2023-11-11",
        to: "2025-12-12",
      }),
    };
  },
  {
    count: 20,
  }
);
console.log(classes);

Class.bulkCreate(classes);
