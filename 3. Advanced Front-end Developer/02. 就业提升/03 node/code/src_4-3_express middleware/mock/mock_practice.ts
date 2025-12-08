import { faker } from "@faker-js/faker";

const users = faker.helpers.multiple(
  () => {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      gender: faker.datatype.boolean(),
      email: faker.internet.email(),
      phone: faker.helpers.fromRegExp(/02[1-8]{1}-[0-9]{7}/), // 'BS4G-485H'
      address: faker.location.city(),
      birthday: faker.date.birthdate({ mode: "age", min: 18, max: 65 }),
      bio: faker.lorem.sentence(),
    };
  },
  {
    count: 5,
  }
);
console.log(users);
