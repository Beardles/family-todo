import {
  Context,
  Controller,
  ControllerMethodArgs,
  Get,
  Post,
} from "@dklab/oak-routing-ctrl";
import { z, ZodSchema } from "zod";

import { eta } from "../eta.config.ts";
import { getFormData, getStatusText } from "../utils.ts";
import { NewTodoDTO } from "../dto/todo/NewTodoDTO.ts";
import { TodoService } from "../services/todo.service.ts";
import { TodoStatus } from "../db/schema.ts";

type NewTodoFormData = {
  assignedTo: string;
  description: string | null;
  id: number;
  status: TodoStatus;
  title: string;
};

// There seems to be a bug with oak-routing-ctrl where, if I set this to "/todos",
// all routes will 404. Setting it here and explicitly adding "/todos" to the methods
// seems to resolve this issue.
// TODO: Look into this more
@Controller("/")
export class TodosController {
  private readonly todoService: TodoService = new TodoService();
  // TODO: Move this to the services?
  private readonly newTodoInputSchema: ZodSchema = z.object({
    assignedTo: z.nullable(z.number()),
    description: z.nullable(z.string()),
    title: z.string().trim().min(1, "Title is required."),
  });

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
    const formData = getFormData(body) as NewTodoFormData;

    try {
      this.newTodoInputSchema.parse({
        assignedTo: parseInt(formData.assignedTo),
        description: formData.description,
        title: formData.title,
      });
      // const _newTodoDTO = new NewTodoDTO(body);
      ctx.response.redirect("/todos");
    } catch (e) {
      if (e.name === "ZodError") {
        ctx.response.status = 400;
        return eta.render("todos/new", {
          errors: e.format(),
          prevData: body,
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
