import {
  Context,
  Controller,
  ControllerMethodArgs,
  Get,
  Post,
} from "@dklab/oak-routing-ctrl";
import { ZodIssue } from "zod";

import { eta } from "../eta.config.ts";
import { getStatusText } from "../utils.ts";
import { NewTodoDTO } from "../dto/todo/NewTodoDTO.ts";
import { TodoService } from "../services/todo.service.ts";

// There seems to be a bug with oak-routing-ctrl where, if I set this to "/todos",
// all routes will 404. Setting it here and explicitly adding "/todos" to the methods
// seems to resolve this issue.
// TODO: Look into this more
@Controller("/")
export class TodosController {
  private readonly todoService: TodoService = new TodoService();

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
      newTodoDTO.validate();
      ctx.response.redirect("/todos");
    } catch (e) {
      if (e.name === "ZodError") {
        const errors = e.issues.map((issue: ZodIssue) => ({
          field: issue.path[0],
          code: issue.code,
        }));
        ctx.response.status = 400;
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
    return eta.render("todos/new", {
      errors: null,
      prevData: null,
      useAppShell: false,
    });
  }
}
