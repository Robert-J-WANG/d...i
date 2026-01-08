// ESM
import { faker } from "@faker-js/faker";
import { Admin } from "../models/sync";

export const admins = faker.helpers.multiple(
  () => {
    return {
      loginID: faker.string.uuid(),
      loginPwd: faker.internet.password(),
      name: faker.internet.username(),
    };
  },
  {
    count: 5,
  }
);

Admin.bulkCreate(admins);
