import { z, ZodSchema } from "zod";

import { SelectTodo, TodoStatus } from "../../db/schema.ts";

export class TodoDTO {
  private readonly schema: ZodSchema = z.object({
    assignedTo: z.nullable(z.number()),
    id: z.number(),
    description: z.nullable(z.string()),
    status: z.nativeEnum(TodoStatus),
    title: z.string(),
  });

  assignedTo: number | null;
  description: string | null;
  id: number;
  status: TodoStatus;
  title: string;

  constructor(todoDb: SelectTodo) {
    this.assignedTo = todoDb.assigned_to as number | null;
    this.description = todoDb.description as string | null;
    this.id = todoDb.id as number;
    this.status = todoDb.status as TodoStatus;
    this.title = todoDb.title as string;

    console.log({ todo: this });
  }

  validate() {
    this.schema.parse(this);
  }
}
