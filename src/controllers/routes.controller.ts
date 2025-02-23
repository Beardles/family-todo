import { Controller, Get } from "@dklab/oak-routing-ctrl";

import { eta } from "../eta.config.ts";

@Controller("/")
export class RoutesController {
  @Get("/")
  index() {
    return eta.render("index", {});
  }

  @Get("/todos")
  todos() {
    return eta.render("todos", {});
  }

  @Get("/tobuys")
  tobuys() {
    return eta.render("tobuys", {});
  }
}
