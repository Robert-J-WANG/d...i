import { s } from "../schemas/primitives";

const schema = s.utcDateSchema;
console.log(schema.parse(true));
