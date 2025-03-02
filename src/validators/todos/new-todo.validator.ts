import { z } from "zod";

// TODO: Consolidate this nonsense, too many separate files with the same things
export const NewTodoSchema = z.object({
  assignedTo: z.nullable(z.number()),
  description: z.nullable(z.string()),
  title: z.string(),
});
