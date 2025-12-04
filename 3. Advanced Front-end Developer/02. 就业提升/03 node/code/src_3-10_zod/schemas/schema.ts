import { z } from "zod";

const studentSchema = z.object({
  name: z.string().min(1).max(20),
  dob: z.iso.date().nonempty(),
  sex: z.boolean(),
  mobile: z.string().regex(/02[1-8]{1}-[0-9]{7}/),
  ClassId: z.int(),
});

type Istudent = z.infer<typeof studentSchema>;

export { studentSchema, Istudent };
