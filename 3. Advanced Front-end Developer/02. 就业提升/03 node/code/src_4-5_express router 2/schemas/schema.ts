import { z } from "zod";
import { s } from "./primitives";

const studentSchema = z.object({
  /* 
  name: z.string().min(1).max(20),
  dob: z.date(),
  sex: z.boolean(),
  mobile: z.string().regex(/02[1-8]{1}-[0-9]{7}/),
  ClassId: z.int(), 
  */
  name: z.string().trim().min(1).max(20),
  dob: s.utcDateSchema,
  sex: s.booleanSchema,
  mobile: z
    .string()
    .trim()
    .regex(/02[1-8]{1}-[0-9]{7}/),
  ClassId: s.intSchema.positive(),
});

type Istudent = z.infer<typeof studentSchema>;

export { studentSchema, Istudent };
