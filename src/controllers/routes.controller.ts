import {
  Context,
  Controller,
  ControllerMethodArgs,
  Get,
  Post,
} from "@dklab/oak-routing-ctrl";

import { eta } from "../eta.config.ts";
import { TodoService } from "../services/todo.service.ts";
import { getStatusText } from "../utils.ts";
import { NewTodoDTO } from "../dto/todo/NewTodoDTO.ts";
import { NewTodoSchema } from "../validators/todos/new-todo.validator.ts";
import { ZodIssue } from "zod";

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
    return eta.render("todos/index", {
      getStatusText,
      todos,
    });
  }

  @Post("/todos")
  @ControllerMethodArgs("body")
  create(body: URLSearchParams, ctx: Context) {
    const newTodoDTO = new NewTodoDTO(body);

    try {
      NewTodoSchema.parse(newTodoDTO);

      ctx.response.redirect("/todos");
    } catch (e) {
      if (e.name === "ZodError") {
        const errors = e.issues.map((issue: ZodIssue) => ({
          field: issue.path[0],
          code: issue.code,
        }));
        ctx.response.status = 500;
        return eta.render("todos/new", {
          errors,
          prevData: newTodoDTO,
          useAppShell: true,
        });
      }
    }
  }

  @Get("/todos/new")
  newTodo() {
    return eta.render("todos/new", {});
  }

  @Get("/tobuys")
  tobuys() {
    return eta.render("tobuys", {});
  }
}
