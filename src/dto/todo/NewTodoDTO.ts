import { z } from "zod";

import { TodoStatus } from "../../db/schema.ts";
import { getFormData } from "../../utils.ts";
import { ZodSchema } from "zod";

export class NewTodoDTO {
  private readonly schema: ZodSchema = z.object({
    assignedTo: z.nullable(z.number()),
    description: z.nullable(z.string()),
    title: z.string(),
  });

  assignedTo: number | null;
  description: string | null;
  id: number;
  status: TodoStatus;
  title: string;

  constructor(requestData: URLSearchParams) {
    const formData = getFormData(requestData);

    this.assignedTo = formData.assignedTo as number | null;
    this.description = formData.description as string | null;
    this.id = formData.id as number;
    this.status = TodoStatus.TODO;
    this.title = formData.title as string;
  }

  validate() {
    this.schema.parse(this);
  }
}
