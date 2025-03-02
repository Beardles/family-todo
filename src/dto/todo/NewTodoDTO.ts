import { TodoStatus } from "../../db/schema.ts";

export type NewTodoDTOParams = {
  assignedTo: string;
  description: string | null;
  title: string;
};

export class NewTodoDTO {
  assignedTo: number | null;
  description: string | null;
  status: TodoStatus;
  title: string;

  constructor(params: NewTodoDTOParams) {
    this.assignedTo = parseInt(params.assignedTo);
    this.description = params.description;
    this.status = TodoStatus.TODO;
    this.title = params.title;
  }
}
