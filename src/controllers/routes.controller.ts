import { Controller, Get } from "@dklab/oak-routing-ctrl";

import { eta } from "../eta.config.ts";
import { TodoService } from "../services/todo.service.ts";
import { getStatusText } from "../utils.ts";

@Controller("/")
export class RoutesController {
  private readonly todoService: TodoService = new TodoService();

  @Get("/")
  async index() {
    const todos = await this.todoService.getTodos();
    return eta.render("index", {
      todos,
    });
  }

  @Get("/todos")
  async todos() {
    const todos = await this.todoService.getTodos();
    return eta.render("todos", {
      getStatusText,
      todos,
    });
  }

  @Get("/tobuys")
  tobuys() {
    return eta.render("tobuys", {});
  }
}
