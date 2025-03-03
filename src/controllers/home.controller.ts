import { Controller, Get } from "@dklab/oak-routing-ctrl";

import { eta } from "../eta.config.ts";
import { TodoService } from "../services/todo.service.ts";

@Controller("/")
export class HomeController {
  private readonly todoService: TodoService = new TodoService();

  @Get("/")
  async index() {
    const todos = await this.todoService.getTodos();

    return eta.render("index", {
      todos,
    });
  }
}
