import { sequelize } from "./models/sync";
async function main() {
  await sequelize.sync({ alter: true });
  console.log("model sync done");
}

main();
