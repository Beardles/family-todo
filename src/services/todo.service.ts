import { db } from "../db/index.ts";
import { todosTable } from "../db/schema.ts";

export class TodoService {
  async getTodos() {
    // TODO: Use a DTO here
    return await db.select().from(todosTable);
  }
}
