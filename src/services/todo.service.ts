import { db } from "../db/index.ts";
import { SelectTodo, todosTable } from "../db/schema.ts";
import { TodoDTO } from "../dto/todo/TodoDTO.ts";

export class TodoService {
  async getTodos() {
    const results = await db.select().from(todosTable);

    return results.map((todoDb: SelectTodo) => new TodoDTO(todoDb));
  }
}
