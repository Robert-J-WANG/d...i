import { faker } from "@faker-js/faker";
import { Student } from "../models/sync";

export const students = faker.helpers.multiple(
  () => {
    return {
      name: faker.person.fullName(),
      dob: faker.date.birthdate({ mode: "age", min: 18, max: 35 }),
      sex: faker.datatype.boolean(),
      mobile: faker.helpers.fromRegExp(/02[1-8]{1}-[0-9]{7}/),
      ClassId: faker.number.int({
        min: 1,
        max: 40,
      }),
    };
  },
  {
    count: 500,
  }
);
console.log(students);

Student.bulkCreate(students);
